import React, { useRef } from "react";
import "./BenefitsGallery.css";

import strettaDiMano from '../images/strettaDiMano.png';
import catturaClienti from '../images/catturaCliente.png'
import lavagna from '../images/salesmanLavagna.png'
import correre from '../images/correre.png'
import easyInstall from '../images/easyInstall.png'
import occhiolinoSalesman from '../images/occhiolinoSalesman.png'
import attivo247 from '../videos/agente247.mov';

type FeatureItem = {
    id: string;
    image?: string;
    video?: string;
    imageAlt: string;
    eyebrow: string;
    
    body: string;
};

const ITEMS: FeatureItem[] = [
     {
        id: "gratis",
        image: occhiolinoSalesman,
        imageAlt: "Agente AI Gratis. Per sempre. Senza vincoli. Senza carta",
        eyebrow: "Gratis. Per sempre",
        
        body: "Nessuna carta, nessun abbonamento, nessun limite di tempo."
    },
    {
        id: "attivo",
        video: attivo247,
        imageAlt: "Chat dell’assistente che risponde subito",
        eyebrow: "Attivo 24/7 sul tuo sito",
        
        body:
            "Accoglie i visitatori, risponde e vende anche quando non ci sei. Non si ferma mai."
    },
    {
        id: "usb-c",
        image: strettaDiMano,
        imageAlt: "Lead inviati a CRM e email",
        eyebrow: "Aiuta i visitatori a decidere",
       
        body:
        "Propone il prodotto giusto a seconda delle domande del cliente. Suggerisce, convince, conclude."
    },
    {
        id: "tasto-azione",
        image: lavagna,
        imageAlt: "Suggerimenti mirati con pulsante Acquista",
        eyebrow: "Conosce il tuo business",
       
        body:
            "Non dà risposte generiche. Conosce i tuoi orari, prodotti e servizi. Fa sembrare il tuo sito più professionale."
    },
     {
        id: "clienti",
        image: catturaClienti,
        imageAlt: "",
        eyebrow: "Cattura contatti",
        
        body: "Ogni volta che un visitatore mostra interesse, il tuo agente salva nome, email e richiesta."
    },
    {
        id: "rapido",
        image: correre,
        imageAlt: "Assistente online anche di notte",
        eyebrow: "Risposte Istantanee",
        
        body: "Nessun cliente aspetta. Risponde 2,7 volte più veloce rispetto ad altri chatbot."
    },
    {
        id: "batteria",
        image: easyInstall,
        imageAlt: "Assistente online anche di notte",
        eyebrow: "Te lo creiamo noi",
        
        body: "Ti forniamo noi tutto, dalla demo all'installazione. Non devi alzare un dito."
    },
   

    
];

const FeatureCard: React.FC<{ item: FeatureItem }> = ({ item }) => (
    <article className="ft-card" aria-labelledby={`${item.id}-title`}>
        <div className="ft-imageFrame">
            {item.video ? (
                <video
                    className="ft-image"
                    src={item.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                />
            ) : (
                <img
                    className="ft-image"
                    src={item.image}
                    alt={item.imageAlt}
                    loading="lazy"
                />
            )}
        </div>

        <div className="ft-copy">
            <p className="ft-eyebrow">{item.eyebrow}</p>
            
            <p className="ft-body">{item.body}</p>
        </div>
    </article>
);

const FeatureTriptych: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Scorre alla card successiva/precedente in modo "intelligente":
    // mostra la prossima card completamente, lascia intravedere un po' la precedente,
    // e parecchio spazio della card successiva a destra.
    const PEEK_PREV = 16; // px di card precedente da mantenere visibile a sinistra

    const scrollToCard = (direction: 1 | -1) => {
  const scroller = scrollRef.current;
  if (!scroller) return;

  const cards = Array.from(scroller.querySelectorAll<HTMLElement>(".ft-card"));
  if (cards.length === 0) return;

  const currentLeft = scroller.scrollLeft;

  // Trova la card più vicina alla posizione attuale
  let currentIndex = 0;
  let minDiff = Infinity;
  for (let i = 0; i < cards.length; i++) {
    const diff = Math.abs(cards[i].offsetLeft - currentLeft);
    if (diff < minDiff) {
      minDiff = diff;
      currentIndex = i;
    }
  }

  let targetIndex = currentIndex + direction;
  if (targetIndex < 0) targetIndex = 0;
  if (targetIndex > cards.length - 1) targetIndex = cards.length - 1;

  const targetLeft = Math.max(0, cards[targetIndex].offsetLeft - PEEK_PREV);
  scroller.scrollTo({ left: targetLeft, behavior: "smooth" });
};

    return (
        <section className="ft-section" aria-label="Punti di forza">
            <div className="ft-container">
                <div className="ft-grid" ref={scrollRef}>
                    {ITEMS.map((it) => (
                        <FeatureCard key={it.id} item={it} />
                    ))}
                </div>
                <div className="ft-controls">
                    <button
                        className="ft-nav ft-nav-prev"
                        aria-label="Scorri indietro"
                        onClick={() => scrollToCard(-1)}
                    >
                        ◀
                    </button>
                    <button
                        className="ft-nav ft-nav-next"
                        aria-label="Scorri avanti"
                        onClick={() => scrollToCard(1)}
                    >
                        ▶
                    </button>
                </div>
            </div>
            <div className='no-card-required-container'>
          <img className='no-card-image' src="https://static.thenounproject.com/png/2028787-200.png" alt="" />
          <p className="no-card-text">Senza carta. Senza impegno.</p>
        </div>
        </section>
    );
};

export default FeatureTriptych;