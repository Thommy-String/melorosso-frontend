
import './App.css';
import galaxyVideo from './videos/galaxy.mp4'
import abstractSearch from './videos/abstractSearch.mp4'
import chatbotVideo from './videos/chatbotVideo.mp4'
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import faqs from './images/faqs.png'
import analisi from './images/analisi.png'

// --- Componenti Icona (SVG per pulizia e performance) ---
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;

const plansData = [
  {
    id: 'free',
    name: 'PIANO GRATIS PER SEMPRE',
    price: 0,
    quota: 30,
    description: 'Perfetto per testare la potenza del nostro AI sul tuo sito.',
    features: ['30 chat/mese', 'Addestramento base', 'Dashboard analitica'],
    isPopular: false,
  },
  {
    id: 'plus',
    name: 'PIANO PLUS',
    price: 59,
    quota: 60,
    description: 'La soluzione ideale per piccole e medie imprese in crescita.',
    features: ['60 chat/mese', 'Addestramento standard', 'Dashboard analitica', 'Supporto via email'],
    isPopular: true,
  },
  {
    id: 'pro',
    name: 'PIANO PRO',
    price: 89,
    quota: 100,
    description: 'Potenza e volumi per aziende che vogliono il massimo dal loro assistente.',
    features: ['100 chat/mese', 'Domande più frequenti', 'Analisi Conversazioni', 'Dashboard analitica', 'Supporto prioritario'],
    isPopular: false,
  },
];


// --- Componenti di Sezione ---

const Header = () => (
  <header className="site-header">
    <div className="container header-container">
      <a href="#" className="logo">Melorosso AI</a>
      <nav className="main-nav">
        {/* Assicurati che questi siano <a> e non <Link> */}
        <HashLink smooth to="/#features">Caratteristiche</HashLink>
        <HashLink smooth to="/#pricing">Piani</HashLink>
        <HashLink smooth to="/#contact">Contatti</HashLink>
      </nav>
      <a href="https://ai-frontend-melorosso.pages.dev/#/login" className="cta-button secondary large">
        Accedi
      </a>
    </div>
  </header>
);

const Hero = () => (
  <section className="hero-section">
    <div className="container hero-container">
      <div className="hero-content">
        <div className="media-container">
          <video src={chatbotVideo} autoPlay muted loop playsInline></video>
        </div>
        <h1 className="hero-title">Chatbot I.A. per siti web</h1>
        <p className="hero-subtitle">Conosce i tuoi prodotti e servizi. Risponde ai clienti come faresti tu.</p>
        <div className="hero-buttons">
          <HashLink smooth to="/#pricing" className="cta-button primary large">Piano Gratis per sempre</HashLink>
          <HashLink smooth to="/#features" className="cta-button secondary large">Scopri come funziona</HashLink>        </div>
      </div>

    </div>
  </section>
);

const Features = () => (
  <section id="features" className="features-section">
    <div className="container">

      <div className="section-header">
        <h2 className="section-title">🧠 Super-intelligente.</h2>
        <p className="section-subtitle">Basato sull'ultima versione più potente di ChatGPT.</p>

       
        <div className="media-container">
          <video src={abstractSearch} autoPlay muted loop playsInline></video>
        </div>
      </div>

      <div className="section-header">
        <h2 className="section-title">Velocissimo. ⚡Supersonico.</h2>
        <p className="section-subtitle">Risponde in meno di 1.8 secondi in media.</p>

        {/* MODIFICA: Video avvolto nel nuovo contenitore */}
        <div className="media-container">
          <video src={galaxyVideo} autoPlay muted loop playsInline></video>
        </div>
      </div>

      <div className="section-header">
        <span className="section-tag">NOVITÀ 2025</span>
        <h2 className="section-title">🔎 Analizza tutto. Ogni conversazione.</h2>
        <p className="section-subtitle">Il nostro AI scansiona ogni conversazione, individua comportamenti e suggerimenti.</p>

        {/* MODIFICA: Immagine avvolta nel nuovo contenitore */}
        <div className="media-container">
          <img src={analisi}></img>
        </div>
      </div>

      <div className="section-header">
        <span className="section-tag">NOVITÀ 2025</span>
        <h2 className="section-title">✍🏼 Cattura le domande più frequenti.</h2>
        <p className="section-subtitle">Registra automaticamente le domande più frequenti. Non perdi più nemmeno una curiosità dei clienti.</p>

        {/* MODIFICA: Immagine avvolta nel nuovo contenitore */}
        <div className="media-container">
          <img src={faqs} alt="sezione che mostra le domande più frequenti" />
        </div>
      </div>

      {/* La griglia sottostante è stata rimossa per semplicità, come da tuo esempio.
          Se vuoi tenerla, puoi farlo, ma le sezioni sopra sono quelle che hai modificato. */}

    </div>
  </section>
);

const Pricing = () => (
  <section id="pricing" className="apple-section">
    <div className="apple-container text-center">
      <div className="section-header small-margin">
        <span className="section-tag">OFFERTE e ABBONAMENTI</span>
        <h2 className="section-title">Inizia semplice. <br></br> Fai una prova.</h2>
        <p className="section-subtitle">Nessun costo di installazione. Nessun vincolo. Cancella quando vuoi senza spiegazioni.</p>
      </div>

      <div className="pricing-grid-apple">
        {/* Mappatura dinamica dei piani */}
        {plansData.map(plan => (
          <div key={plan.id} className={`pricing-card-apple ${plan.isPopular ? 'popular' : ''}`}>
            {plan.isPopular && <span className="popular-badge">Più Scelto</span>}
            <h3 className="pricing-plan-name">{plan.name}</h3>
            <p className="pricing-plan-description">{plan.description}</p>
            <p className="pricing-plan-price">
              €{plan.price}
              {plan.price > 0 && <span className="price-period"> / mese</span>}
            </p>
            <ul className="pricing-features-list">
              {plan.features.map(feature => (
                <li key={feature}><CheckIcon /> {feature}</li>
              ))}
            </ul>
            {/* MODIFICA QUI: Usa <Link> invece di <a> per navigare alla pagina di contatto */}
            <Link
              to={`/contact?plan=${encodeURIComponent(plan.name)}`}
              className={`cta-button-apple ${plan.isPopular ? 'primary' : 'secondary'} full-width`}
            >
              {plan.price === 0 ? 'Inizia Gratis' : 'Scegli Piano'}
            </Link>
          </div>
        ))}

        {/* Card per il piano Sartoriale/Enterprise */}
        <div className="pricing-card-apple enterprise">
          <h3 className="pricing-plan-name">Piano Sartoriale</h3>
          <p className="pricing-plan-description">
            Hai esigenze specifiche o volumi di traffico molto elevati? Creiamo una soluzione su misura per te.
          </p>
          <ul className="pricing-features-list">
            <li><CheckIcon /> Chat personalizzate</li>
            <li><CheckIcon /> Integrazioni dedicate</li>
            <li><CheckIcon /> Account Manager</li>
            <li><CheckIcon /> E molto altro...</li>
          </ul>
          {/* MODIFICA QUI: Usa Link invece di <a> per navigare alla pagina di contatto */}
          <Link to="/contact?plan=Sartoriale" className="cta-button-apple secondary full-width">
            Contattaci
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const FinalCTA = () => (
  <section id="contact" className="cta-section">
    <div className="container cta-container">
      <h2>Pronto a catturare di cosa parlano i tuoi clienti sul sito?</h2>
      <Link to="/contact?plan=Piano%20Gratis" className="cta-button primary large">Prova gratis</Link>
    </div>
  </section>
);

const Footer = () => (
  <footer className="site-footer">
    <div className="container footer-container">
      <p>&copy; {new Date().getFullYear()} Melorosso AI. Tutti i diritti riservati.</p>
      <nav className="footer-nav">
        <a href="#">Privacy Policy</a>
        <a href="#">Termini di Servizio</a>
        <a href="mailto:info@melorosso.it?subject=Richiesta%20informazioni&body=Ciao%2C%20vorrei%20sapere%20di%20pi%C3%B9...">
  info@melorosso.it
</a>
      </nav>
    </div>
  </footer>
);


function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

export default App;