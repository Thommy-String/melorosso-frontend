import './App.css';
import { useEffect, useRef, useState } from 'react';


import dashboardCliente from './images/dashboard-cliente.png'
import storicoChat from './images/storico-chat.png'
import gelato from './videos/neve-di-latte.mp4'
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import faqs from './images/faqs.png'
import analisi from './images/analisi.png'
import melorossoLogo from './images/melorosso-logo.png';
import occhiolinoSalesman from './images/occhiolinoSalesman.png';
import conosceAzienda from './images/conosceAzienda.png';
import salesmanScrive from './images/salesmanScrive.png';
import salesmanCervello from './images/salesmanCervello.png';
import salesmanRelaxed from './images/salesmanRelaxed.png';



import UseCaseShowcase from './pages/UseCaseShowcase';
import FeatureTriptych from './pages/BenefitsGallery';
import FreeTrial from './pages/freeTrial';


// --- Componenti Icona (SVG per pulizia e performance) ---
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;

const plansData = [
  {
    id: 'free',
    name: 'PIANO GRATIS',
    price: 0,
    quota: 30,
    description: 'Perfetto per testare la potenza del nostro AI sul tuo sito.',
    features: ['30 chat/mese', 'Dashboard analitica', 'Domande più frequenti', 'Analisi Conversazioni',],
    isPopular: false,
  },
  {
    id: 'plus',
    name: 'PIANO PLUS ⭐',
    price: 89,
    quota: 60,
    description: 'Per piccole e medie imprese.',
    features: ['60 chat/mese', 'Domande più frequenti', 'Analisi Conversazioni', 'Dashboard analitica'],
    isPopular: true,
  },
  {
    id: 'pro',
    name: 'PIANO PRO 💎',
    price: 119,
    quota: 100,
    description: 'Potenza e volumi per aziende più grandi.',
    features: ['100 chat/mese', 'Domande più frequenti', 'Analisi Conversazioni', 'Dashboard analitica', 'Supporto prioritario'],
    isPopular: false,
  },
];


// --- Componenti di Sezione ---

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY || window.pageYOffset;

      // Always visible at the very top
      if (currentY <= 0) {
        setShowHeader(true);
        lastScrollY.current = 0;
        return;
      }

      // Keep visible if the mobile menu is open
      if (isMenuOpen) {
        setShowHeader(true);
        lastScrollY.current = currentY;
        return;
      }

      // Scroll direction detection with small threshold
      if (currentY > lastScrollY.current + 5) {
        setShowHeader(false); // scrolling down → hide
      } else if (currentY < lastScrollY.current - 5) {
        setShowHeader(true); // scrolling up → show
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((v) => !v);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className="site-header"
      style={{
        transform: showHeader ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 200ms ease',
        willChange: 'transform',
      }}
    >
      <div className="container header-container">
        {/* Logo */}
        <a href="#" className="logo" onClick={closeMenu}>
          <img
            src={melorossoLogo}
            alt="Logo Melorosso"
            className="logo-img"
            width={40}
            height="auto"
          />
          <span className="logo-text">melorosso</span>
        </a>

        {/* Nav desktop */}
        <nav className="main-nav">
          <HashLink smooth to="/#features">Funzionalità</HashLink>
          <HashLink smooth to="/#pricing">Prezzi</HashLink>
        </nav>

        {/* CTA + Hamburger (hamburger visibile solo su mobile via CSS) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <a
            href="https://ai-frontend-melorosso.pages.dev/#/login"
            className="cta-button secondary large"
          >
            Accedi
          </a>
          <button
            type="button"
            aria-label={isMenuOpen ? 'Chiudi menu' : 'Apri menu'}
            onClick={toggleMenu}
            className="hamburger-btn"
            style={{
              background: 'transparent',
              border: '1px solid transparent',
              padding: 8,
              borderRadius: 8,
              cursor: 'pointer',
            }}
          >
            {isMenuOpen ? (
              // Icona X
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              // Icona hamburger
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Drawer mobile */}
      {isMenuOpen && (
        <div
          className="mobile-drawer"
          style={{
            borderTop: '1px solid var(--c-border)',
            background: 'var(--c-surface)',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <div className="container" style={{ padding: '12px 0', display: 'flex', gap: 16 }}>
            <HashLink onClick={closeMenu} smooth to="/#features">Funzionalità</HashLink>
            <HashLink onClick={closeMenu} smooth to="/#pricing">Prezzi</HashLink>
          </div>
        </div>
      )}
    </header>
  );
};

const HeroSection = () => (
  <section className="hero-section">
    <div className="container">
      <h2 className="section-title">
        Agente AI che {" "}
        <span
          style={{
            background: "linear-gradient(90deg,rgb(85, 0, 255), rgba(255, 89, 0, 0.97))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "inherit",
          }}
        >
          risponde e vende
        </span>{" "}
         sul tuo sito 24/7
      </h2>

      <p className="section-subtitle">
        Un assistente virtuale che risponde ai visitatori, consiglia i prodotti giusti e aumenta le vendite.
       
      </p>

      <div className="hero-buttons">
        <HashLink smooth to="/#pricing" className="cta-button primary large">Prova Gratis</HashLink>
      </div>
      <div className='no-card-required-container'>
      <img className='no-card-image' src="https://static.thenounproject.com/png/2028787-200.png" alt="" />
      <p className="no-card-text">Senza carta.</p>
      </div>

      
    </div>
  </section>
);

const FinalCTA = () => (
  // Sezione finale: immagine sopra, testo sotto (layout a una colonna gestito da CSS)
  <section className="final-cta">
    <div className="">

      {/* IMMAGINE IN ALTO */}
      <div className="final-cta-image-wrapper">
        <img
          src={occhiolinoSalesman}
          alt="Prova gratis la demo"
          className="final-cta-image"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* CONTENUTO SOTTO */}
      <div className="final-cta-content">
        <h1 className="section-title" style={{ marginTop: 8 }}>Prova gratis.</h1>
        <p className="section-subtitle">Nessuna carta di credito. Nessun vincolo contrattuale.</p>
        
        <div className="hero-buttons" style={{ marginTop: 16 }}>
          <HashLink smooth to="/#pricing" className="cta-button primary large">Inizia Subito</HashLink>
          <a
            href="mailto:info@melorosso.it?subject=Richiesta%20informazioni&body=Ciao%20vorrei%20sapere%20di%20pi%C3%B9%20del%20vostro%20agente%20AI..."
            className="cta-button secondary large"
          >
            Contattaci
          </a>
        </div>
        <div className='no-card-required-container'>
      <img className='no-card-image' src="https://static.thenounproject.com/png/2028787-200.png" alt="" />
      <p className="no-card-text">Senza carta.</p>
      </div>
      </div>

    </div>
  </section>
);

const Features: React.FC<{ backgroundColor?: string }> = ({ backgroundColor }) => (
  <section
    id="features"
    className="features-section"
    style={{ backgroundColor }}
  >
    <div className="container">

      <div className="section-header" style={{ backgroundColor: 'rgb(228,219,211,.8)' }}>
        <img src={salesmanCervello} alt=""  style={{ width: '100px', height: '100px', borderRadius: '50%'}}/>
        <h2 className="section-title">Conosce la tua azienda.</h2>
        <p className="section-subtitle">Impara direttamente dai tuoi prodotti, servizi e documenti. Risponde ai visitatori come un esperto della tua azienda guidando verso l’acquisto.</p>


        <div className="media-container">
          <video src={gelato} autoPlay muted loop playsInline></video>
        </div>
      </div>



      <div className="section-header" style={{ backgroundColor: '#fff' }}>
        <span className="section-tag">NOVITÀ 2025</span>
        <img src={salesmanScrive} alt=""  style={{ width: '100px', height: '100px', borderRadius: '50%'}}/>

        <h2 className="section-title">Raccoglie le domande frequenti dei clienti.</h2>
        <p className="section-subtitle">L'agente registra automaticamente le domande ricorrenti e le mostra nella tua dashboard, così sai sempre cosa chiedono di più i clienti.</p>

        {/* MODIFICA: Immagine avvolta nel nuovo contenitore */}
        <div className="media-container">
          <img src={faqs} alt="sezione che mostra le domande più frequenti" />
        </div>
      </div>




      <div className="section-header" style={{ backgroundColor: 'rgb(255,243,205,.6)' }}>
        <span className="section-tag">NOVITÀ 2025</span>
        <img src={conosceAzienda} alt=""  style={{ width: '100px', height: '100px', borderRadius: '50%'}}/>

        <h2 className="section-title">Analizza ogni conversazione.</h2>
        <p className="section-subtitle">L’AI esamina automaticamente ogni conversazione con i clienti e ti mostra insight pratici nella dashboard: cosa funziona, dove migliorare, e come rendere l’esperienza ancora più efficace.</p>

        {/* MODIFICA: Immagine avvolta nel nuovo contenitore */}
        <div className="media-container">
          <img src={analisi}></img>
        </div>
      </div>


    </div>

    <div className="section-header" style={{ backgroundColor: '#fff' }}>
              <img src={salesmanRelaxed} alt=""  style={{ width: '100px', height: '100px', borderRadius: '50%'}}/>

      <h2 className="section-title">Gestione chiara. Senza sforzo. </h2>
      <p className="section-subtitle">Controlla messaggi, contatti e dati raccolti in un’unica dashboard semplice e intuitiva. Così hai sempre tutto sotto controllo, senza complessità.</p>

      {/* MODIFICA: Video avvolto nel nuovo contenitore */}
      <div className="media-container">
        <img src={dashboardCliente}></img>
      </div>

      <div className="media-container">
        <img src={storicoChat}></img>
      </div>
    </div>
  </section>
);

const Pricing = () => (
  <section id="pricing" className="pricing-section">
    <div className="container text-center">
      <div className="section-header small-margin">
        <span className="section-tag">PREZZI</span>
        <h2 className="section-title">Inizia qui.</h2>
        <p className="section-subtitle">Zero costi di installazione. Nessun vincolo. Cancella quando vuoi.</p>
      </div>

      <div className="pricing-grid">
        {/* Mappatura dinamica dei piani */}
        {plansData.map(plan => (
          <div key={plan.id} className={`pricing-card ${plan.isPopular ? 'popular' : ''}`}>
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
              className={`cta-button ${plan.isPopular ? 'primary' : 'secondary'} full-width`}
            >
              {plan.price === 0 ? 'Inizia Gratis' : 'Scegli Piano'}
            </Link>
          </div>
        ))}

        {/* Card per il piano Sartoriale/Enterprise (CORRETTA) */}
        <div className="pricing-card enterprise">
          {/* NUOVO CONTENITORE per il blocco di testo */}
          <div className="enterprise-text-content">
            <h3 className="pricing-plan-name">Piano Sartoriale</h3>
            <p className="pricing-plan-description">
              Hai esigenze specifiche o volumi di traffico molto elevati? Creiamo una soluzione su misura per te.
            </p>
          </div>

          {/* Bottone a destra (ho usato le classi standard per coerenza) */}
          <Link to="/contact?plan=Sartoriale" className="cta-button secondary large">
            Contattaci
          </Link>
        </div>
      </div>
    </div>
  </section>
);


const Footer = () => (
  <footer className="site-footer">
    <div className="container footer-container">
      <p>&copy; {new Date().getFullYear()} Melorosso. Tutti i diritti riservati.</p>
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
      <HeroSection />
      
      <main>
        <FeatureTriptych></FeatureTriptych>
        <UseCaseShowcase></UseCaseShowcase>
         <FreeTrial></FreeTrial>
        <Features backgroundColor="#f9f9f9" />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

export default App;