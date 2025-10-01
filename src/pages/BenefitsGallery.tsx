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
    title: string;
    body: string;
};

const ITEMS: FeatureItem[] = [
    {
        id: "ceramic-shield",
        image: chatting,
        imageAlt: "Chat dell’assistente che risponde subito",
        eyebrow: "Instancabile",
        title: "Sempre online.",
        body:
            "Risponde in pochi secondi, 24/7. Mai più clienti persi."
    },
    {
        id: "tasto-azione",
        image: lavagna,
        imageAlt: "Suggerimenti mirati con pulsante Acquista",
        eyebrow: "Su misura",
        title: "Addestrato sui tuoi prodotti e servizi.",
        body:
            "Non è un chatbot generico. Conosce i tuoi orari, documenti, prodotti e servizi. Risponde come un vero esperto del tuo staff interno."
    },
     {
        id: "clienti",
        image: catturaClienti,
        imageAlt: "",
        eyebrow: "Furbo",
        title: "Cattura clienti.",
        body: "Raccoglie nome, email automaticamente ai clienti che mostrano interesse e intenzione."
    },
    {
        id: "usb-c",
        image: strettaDiMano,
        imageAlt: "Lead inviati a CRM e email",
        eyebrow: "Eccellente venditore",
        title: "Vende per te.",
        body:
        "Propone il prodotto giusto a seconda delle domande del cliente. Suggerisce, convince, conclude. Automaticamente."
    },
    {
        id: "rapido",
        image: correre,
        imageAlt: "Assistente online anche di notte",
        eyebrow: "Veloce",
        title: "Risponde subito.",
        body: "Per i tuoi clienti, ogni secondo conta. Risponde 2,7 volte più veloce della concorrenza."
    },
    {
        id: "batteria",
        image: easyInstall,
        imageAlt: "Assistente online anche di notte",
        eyebrow: "Configurazione",
        title: "Te lo installiamo noi",
        body: "Ti forniamo noi un frammento di codice. Non devi fare nulla tu. Copia, incolla, fatto."
    },

    
];

const FeatureCard: React.FC<{ item: FeatureItem }> = ({ item }) => (
    <article className="ft-card" aria-labelledby={`${item.id}-title`}>
        <div className="ft-imageFrame">
            <img className="ft-image" src={item.image} alt={item.imageAlt} loading="lazy" />
        </div>

        <div className="ft-copy">
            <p className="ft-eyebrow">{item.eyebrow}</p>
            <h3 id={`${item.id}-title`} className="ft-title">
                {item.title}
            </h3>
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