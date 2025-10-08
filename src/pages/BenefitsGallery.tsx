import React, { useRef } from "react";
import "./BenefitsGallery.css";

import strettaDiMano from '../images/strettaDiMano.png';
import catturaClienti from '../images/catturaCliente.png'
import lavagna from '../images/salesmanLavagna.png'
import chatting from '../images/salesmanChatting.png'
import correre from '../images/correre.png'
import easyInstall from '../images/easyInstall.png'

type FeatureItem = {
    id: string;
    image: string;
    imageAlt: string;
    eyebrow: string;
    
    body: string;
};

const ITEMS: FeatureItem[] = [
    {
        id: "ceramic-shield",
        image: chatting,
        imageAlt: "Chat dell’assistente che risponde subito",
        eyebrow: "Online 24/7 sul tuo sito",
       
        body:
            "Non si ferma mai. Accoglie, risponde e vende anche quando non ci sei. Mai più clienti persi dal tuo sito."
    },
    {
        id: "tasto-azione",
        image: lavagna,
        imageAlt: "Suggerimenti mirati con pulsante Acquista",
        eyebrow: "Su misura.",
       
        body:
            "Non dà risposte generiche. Conosce i tuoi orari, prodotti e servizi. Fa sembrare il tuo sito più professionale."
    },
     {
        id: "clienti",
        image: catturaClienti,
        imageAlt: "",
        eyebrow: "Cattura clienti",
        
        body: "Raccoglie i dati dei clienti che mostrano interesse. Li vedrai nella tuo pannello di controllo."
    },
    {
        id: "usb-c",
        image: strettaDiMano,
        imageAlt: "Lead inviati a CRM e email",
        eyebrow: "Eccellente venditore",
       
        body:
        "Propone il prodotto giusto a seconda delle domande del cliente. Suggerisce, convince, conclude."
    },
    {
        id: "rapido",
        image: correre,
        imageAlt: "Assistente online anche di notte",
        eyebrow: "Veloce",
        
        body: "Nessun cliente aspetta. Risponde 2,7 volte più veloce rispetto ad altri chatbot."
    },
    {
        id: "batteria",
        image: easyInstall,
        imageAlt: "Assistente online anche di notte",
        eyebrow: "Installazione",
        
        body: "Ti forniamo noi tutto, dalla demo all'installazione. Non devi fare nulla tu."
    },

    
];

const FeatureCard: React.FC<{ item: FeatureItem }> = ({ item }) => (
    <article className="ft-card" aria-labelledby={`${item.id}-title`}>
        <div className="ft-imageFrame">
            <img className="ft-image" src={item.image} alt={item.imageAlt} loading="lazy" />
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
        </section>
    );
};

export default FeatureTriptych;