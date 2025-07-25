import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import './Contact.css';

const API_URL = 'https://melorosso-contact-email.onrender.com';

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const plan = searchParams.get('plan') || 'Generica';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    message: '',
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setResponseMessage('');

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, plan }),
      });
      
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Si è verificato un errore.');
      }

      setStatus('success');
      setResponseMessage('Grazie! La tua richiesta è stata inviata. Ti risponderemo al più presto.');
      setFormData({ name: '', email: '', company: '', website: '', message: '' });

    } catch (error: any) {
      setStatus('error');
      setResponseMessage(error.message || 'Impossibile inviare il messaggio. Riprova più tardi.');
    }
  };

  if (status === 'success') {
    return (
      <div className="contact-page success-message">
        <h2>{responseMessage}</h2>
        <Link to="/" className="back-to-home-link">Torna alla Home</Link>
      </div>
    );
  }

  return (
    <div className="contact-page">
      <div className="contact-container">
        <Link to="/" className="back-to-home-link">Torna alla Home</Link>
        <h1 className="section-headline">Richiesta <br></br> {plan}</h1>
        <p className="section-subheadline">Risponderemo in circa 8 minuti.</p>
        
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Il tuo nome</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">La tua email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="company">Nome azienda</label>
              <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="website">Sito web (opzionale)</label>
              {/* MODIFICA QUI: type="url" è diventato type="text" */}
              <input type="text" id="website" name="website" value={formData.website} onChange={handleChange} placeholder="www.esempio.com" />
            </div>
          </div>
          <div className="form-group full-width">
            <label htmlFor="message">Parlaci del tuo progetto (opzionale)</label>
            <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={5}></textarea>
          </div>
          <div className="form-footer">
            {status === 'error' && <p className="error-message">{responseMessage}</p>}
            <button type="submit" className="cta-button primary large" disabled={status === 'loading'}>
              {status === 'loading' ? 'Invio in corso...' : 'Invia Richiesta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}