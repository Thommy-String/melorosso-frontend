import React, { useState } from 'react';
import './UseCaseShowcase.css';
// MODIFICA: Import corretti da framer-motion
import { motion, AnimatePresence } from 'framer-motion';

// ... tutti i tuoi import di video e immagini...
import fiori from '../images/fiori.png';
import ristorante from '../images/ristorante.png'
import agenziaImage from '../images/agenzia-viaggi.png'
import bar from '../images/bar.png'
import noleggio from '../images/noleggio.png'
import officina from '../images/officina.png'
import studioLegale from '../images/studioLegale.png'
import estetista from '../images/estetista.png'
import dentista from '../images/dentista.png'
import palestra from '../images/palestra.png'
import edilizia from '../images/edilizia.png'
import hotel from '../images/hotel.png'


interface UseCase {
  id: string;
  label: string;
  media: string;
}

const useCasesData: UseCase[] = [
  { id: 'ristorante', label: 'Ristoranti', media: ristorante },
  { id: 'e-commerce', label: 'Negozi online', media: fiori },
  { id: 'agenzie', label: 'Agenzie', media: agenziaImage },
  { id: 'bar', label: 'Bar', media: bar },
  { id: 'noleggio', label: 'Autonoleggio', media: noleggio },
  { id: 'officina', label: 'Officine', media: officina },
  { id: 'avvocato', label: 'Studi Legali', media: studioLegale },
  { id: 'centriestetici', label: 'Centri Estetici', media: estetista },
  { id: 'dentista', label: 'Dentisti', media: dentista },
  { id: 'palestra', label: 'Palestre', media: palestra },
  { id: 'edilizia', label: 'Edilizia', media: edilizia },
  { id: 'hotel', label: 'Hotel - B&B', media: hotel },
];

const UseCaseShowcase: React.FC = () => {
  const [activeUseCase, setActiveUseCase] = useState<UseCase>(useCasesData[0]);

  // Il controllo di sicurezza non è più strettamente necessario
  // se inizializziamo lo stato con un valore certo come useCasesData[0]
  // if (!activeUseCase) { return null; }

  const middleIndex = Math.ceil(useCasesData.length / 2);
  const firstRowData = useCasesData.slice(0, middleIndex);
  const secondRowData = useCasesData.slice(middleIndex);

  // Calcoliamo se il media ATTIVO è un video.
  const isVideo = ['.mp4', '.webm', '.mov'].some(ext =>
    activeUseCase.media.toLowerCase().endsWith(ext)
  );

  return (
    <section className="use-case-showcase-container">
      <h2 className="section-title">
         Esempi
      </h2>
              <p className="section-subtitle">Design coerente con il tuo brand e risposte fondate sul tuo catalogo e servizi.</p>

      <nav className="chips-nav">
        {/* Riga 1: Scorre verso sinistra */}
        <div className="chips-scroller">
          <div className="chips-track">
            {[...firstRowData, ...firstRowData].map((useCase, index) => (
              <button
                key={`${useCase.id}-${index}`}
                className={`chip ${activeUseCase.id === useCase.id ? 'active' : ''}`}
                // MODIFICA: Ottimizzazione del click
                onClick={() => setActiveUseCase(useCase)}
                role="tab"
                aria-selected={activeUseCase.id === useCase.id}
              >
                {useCase.label}
              </button>
            ))}
          </div>
        </div>

        {/* Riga 2: Scorre verso destra */}
        <div className="chips-scroller">
          <div className="chips-track chips-track--reverse">
            {[...secondRowData, ...secondRowData].map((useCase, index) => (
              <button
                key={`${useCase.id}-${index}`}
                className={`chip ${activeUseCase.id === useCase.id ? 'active' : ''}`}
                // MODIFICA: Ottimizzazione del click
                onClick={() => setActiveUseCase(useCase)}
                role="tab"
                aria-selected={activeUseCase.id === useCase.id}
              >
                {useCase.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="video-player-wrapper">
        {/* MODIFICA: Implementazione di AnimatePresence per il crossfade */}
        <AnimatePresence mode="wait">
          {isVideo ? (
            <motion.video
              key={activeUseCase.id}
              src={activeUseCase.media}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1, ease: "easeInOut" }}
              autoPlay
              muted
              loop
              playsInline
            >
              Il tuo browser non supporta il tag video.
            </motion.video>
          ) : (
            <motion.img
              key={activeUseCase.id}
              src={activeUseCase.media}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              alt={`Showcase per ${activeUseCase.label}`}
            />
          )}
        </AnimatePresence>
      </div>

    
    </section>
  );
};

export default UseCaseShowcase;