import { HashLink } from "react-router-hash-link";
import { Link } from 'react-router-dom';
import salesmanPointsToRight from "../images/salesmanPointsToRight.png"; 
import "./FreeTrial.css";
import SocialProof from "./SocialProof";

// Icone minimal per la card (SVG inline)
const ChatIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8z"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const DashboardIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
);
const FaqIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 20h9"/><path d="M19 20V8a7 7 0 1 0-14 0v12"/><path d="M9 9a3 3 0 1 1 6 0c0 2-3 2-3 4"/><circle cx="12" cy="17" r="1"/>
  </svg>
);
const AnalysisIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="3 17 9 11 13 15 21 7"/><polyline points="14 7 21 7 21 14"/>
  </svg>
);

const freePlan = {
  id: 'free',
  name: 'PIANO GRATIS',
  price: 0,
  quota: 30,
  description: 'È l’agente completo, gratis per sempre.',
  features: [
    { text: '30 chat/mese', icon: <ChatIcon /> },
    { text: 'Nessun limite di tempo. Nessun costo.', icon: <AnalysisIcon /> },
    { text: 'Integrazione gratis sul tuo sito web', icon: <CheckIcon /> },
    { text: 'Dashboard analitica', icon: <DashboardIcon /> },
    { text: 'Report domande più frequenti', icon: <FaqIcon /> },
    { text: 'Analisi Conversazioni', icon: <AnalysisIcon /> },
  ],
};

const FreeTrial = () => (
  <section className="free-trial">
    <div className="free-trial-container">

      {/* Immagine piccola + titolo fianco a fianco */}
      <div className="free-trial-header">
        <div className="free-trial-image-wrapper">
          <img
            src={salesmanPointsToRight}
            alt="Prova gratis la demo"
            className="free-trial-image"
            loading="lazy"
            decoding="async"
          />
        </div>
        <h2 className="free-trial-title">Gratis. Per sempre.</h2>
        
      </div>

     
    <SocialProof
                    /* avatars is optional; you can add local images later */
                    rating={5}
                    text="92.7% di aziende 🇮🇹 soddisfatte."
                  />
      {/* Card piano gratuito */}
      <div className="pricing-grid" style={{ marginTop: 24 }}>
        <div className="pricing-card">
          <h3 className="pricing-plan-name">{freePlan.name}</h3>
          <p className="pricing-plan-description">{freePlan.description}</p>
          <p className="pricing-plan-price">€{freePlan.price}</p>
          <ul className="pricing-features-list">
            {freePlan.features.map((f, i) => (
              <li key={i}>
                {f.icon} {f.text}
              </li>
            ))}
          </ul>
          
          <Link
            to={`/contact?plan=${encodeURIComponent(freePlan.name)}`}
            className="cta-button primary full-width"
          >
            Richiedi una demo
          </Link>
          

          {/* Senza carta */}
      <div className="free-trial-no-card">
        <img
          className="no-card-image"
          src="https://static.thenounproject.com/png/2028787-200.png"
          alt=""
        />
        <p className="no-card-text">Senza carta. Senza impegno.</p>
      </div>
      <p style={{ fontSize: '0.9rem', color: 'var(--c-text-secondary)', marginTop: 8, textAlign: 'center' }}>
            Ti contattiamo noi. Ti prepariamo in giornata una demo su misura del tuo agente, senza impegno. Avrai un link privato per testare come risponderebbe il tuo agente ai clienti sul sito.
          </p>
        </div>
      </div>

    
    </div>
  </section>
);

export default FreeTrial;