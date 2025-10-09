import React, { useState } from "react";
import "./RequestDemoWidget.css";
import { SendHorizontal } from "lucide-react";

// Immagini e Video
import salesmanLaptop from '../images/salesmanLaptop.png';
import salesmanLettera from '../images/salesmanLetter.png';
import occhiolinoSalesman from '../images/occhiolinoSalesman.png';
import DemoAgenteAi from '../videos/Demo-AgenteAi.mp4';

// --- Icone e Componenti ---
const CheckIcon = () => (
    <svg className="success-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

//Componente per il testo animato
const StatusText = () => (
    <div className="mr-status-text">
        In preparazione...
    </div>
);

// --- Props ---
interface RequestDemoProps {
    source?: string;
    className?: string;
}

// --- Dati per gli Step (con copy aggiornato) ---
const stepsData = [
    {
        title: "Inserisci il tuo sito.",
        description: "Lo analizziamo per capire cosa vendi e preparare un agente su misura per te.",
        largeImage: null,
        mediaType: 'image',
        titleIcon: salesmanLaptop,
    },
    {
        title: "Ottieni la demo gratis.",
        description: "Analizziamo il tuo sito per creare un agente che risponde come un vero esperto del tuo staff interno. In giornata riceverai un link per testare l'agente fingendoti un cliente. Considerala una solida base di partenza. Il suo vero potenziale si sbloccherà quando lo perfezioneremo insieme.",
        largeImage: DemoAgenteAi,
        mediaType: 'video',
        titleIcon: salesmanLettera,
    },
    {
        title: "Usalo gratis o ignora.",
        description: "Dopo aver provato l'agente decidi se migliorarlo e attivarlo gratis sul tuo sito, o ignoraci. Nessuna pressione, non verrai ricontattato. Non ci piace lo spam.",
        mediaType: 'image',
        titleIcon: occhiolinoSalesman,
    },
];

const RequestDemoWidget: React.FC<RequestDemoProps> = ({ source = "hero", className }) => {
    const [view, setView] = useState<'form' | 'processing' | 'error'>('form');
    const [completedStep, setCompletedStep] = useState(-1);
    const [siteUrl, setSiteUrl] = useState("");
    const [submittedSiteUrl, setSubmittedSiteUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const getDomainFromUrl = (url: string) => {
        try {
            const normalizedUrl = url.startsWith('http') ? url : `https://${url}`;
            return new URL(normalizedUrl).hostname.replace('www.', '');
        } catch (e) {
            return url.split('/')[0].replace('www.', '');
        }
    };



// In RequestDemoWidget.tsx

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!siteUrl.trim()) return;

    // 1. Mostra subito lo stato di caricamento e passa alla vista "processing"
    setLoading(true);
    setCompletedStep(0);
    setSubmittedSiteUrl(siteUrl);
    setView('processing'); 

    // Prepariamo i dati da inviare al backend
    const formData = {
        siteUrl: siteUrl,
        source: source,
    };

    try {
        // 2. Ora, "dietro le quinte", contatta il server mentre l'utente vede la schermata "In preparazione"
        const apiEndpoint = 'https://melorosso-contact-email.onrender.com/api/request-demo';

        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        // Se il server risponde con un errore (dopo essersi svegliato), lo gestiamo
        if (!response.ok) {
            // Se fallisce, l'utente verrà mandato alla schermata di errore
            throw new Error('La richiesta al server è fallita');
        }
        
        // Se tutto va a buon fine, la richiesta è completata e l'utente ha già visto la schermata corretta.
        // Il pulsante di loading si disattiverà nel blocco 'finally'.

    } catch (err) {
        console.error("request-demo error", err);
        setView('error'); // Se c'è un errore, l'utente lo vedrà
    } finally {
        // Questa parte non è più strettamente necessaria se il form scompare,
        // ma la lasciamo per sicurezza.
        setLoading(false);
    }
};
    // ========= FINE MODIFICA =========

    const handleReset = () => {
        setView('form');
        setCompletedStep(-1);
        setSubmittedSiteUrl('');
    };

    if (view === "error") {
        return (
            <div className={`mr-demo-widget ${className || ""}`}>
                <p>Qualcosa è andato storto. Riprova più tardi.</p>
            </div>
        );
    }

    const currentStepIndex = view === 'form' ? 0 : 1;

    return (
        
        <div className={`mr-demo-widget ${className || ""}`}>
            <div className="mr-steps-container">
                {stepsData.map((s, index) => {
                    const isCompleted = completedStep >= index;
                    const isCurrent = currentStepIndex === index && !isCompleted;

                    return (
                        <div key={index} className={`mr-step ${isCompleted ? "active" : ""} ${isCurrent ? "current" : ""}`}>
                            <div className="mr-step-icon">{index + 1}</div>

                            <div className="mr-step-content">
                                <div className="mr-title-wrapper">
                                    <img src={s.titleIcon} alt="" className="mr-title-icon" />

                                    <div className="mr-title-stack">
                                        <h3 className="mr-step-title">{s.title}</h3>
                                        {index === 1 && view === 'processing' && <StatusText />}
                                    </div>
                                </div>

                                <p className="mr-step-description">{s.description}</p>

                                {index === 0 && (
                                    <div className="mr-dynamic-content">
                                        {view === 'form' ? (
                                            <form className="mr-row" onSubmit={handleSubmit}>
                                                <input type="text" inputMode="url" autoComplete="url" placeholder="Il tuo sito (es. azienda.it)" className="mr-input" value={siteUrl} onChange={(e) => setSiteUrl(e.target.value)} required disabled={loading} />
                                                <button className="mr-btn" type="submit" aria-label="Crea la mia demo" disabled={loading}>
                                                    {loading ? 'Invio...' : (
                                                        <>
                                                            <SendHorizontal size={18} />
                                                        </>
                                                    )}
                                                </button>
                                            </form>
                                        ) : (
                                            <div className="mr-processing-card">
                                                <h4 className="main-title">
                                                    <CheckIcon />
                                                    <span className="site-name">{getDomainFromUrl(submittedSiteUrl)}</span>
                                                </h4>
                                                <p className="primary-text">
                                                    Sito ricevuto! Lo stiamo analizzando per capire di cosa ti occupi e per preparare l'agente.
                                                </p>
                                                <p className="secondary-text">
                                                    Lo facciamo da zero su misura per te, potrebbe volerci qualche ora. Riceverai un link privato per testare l'agente come se fossi un cliente. Considerala una base intelligente che potremo poi perfezionare insieme.
                                                </p>
                                                <button onClick={handleReset} className="reset-link">
                                                    Sbagliato a scrivere? Correggi.
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {s.largeImage && (
                                    s.mediaType === 'video' ? (
                                        <video
                                            src={s.largeImage}
                                            className="mr-step-video"
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            aria-label={s.title}
                                        />
                                    ) : (
                                        <img
                                            src={s.largeImage}
                                            alt={s.title}
                                            className="mr-step-image"
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    );
                })}
                
            </div>
            <div className='no-card-required-container'>
        <img className='no-card-image' src="https://static.thenounproject.com/png/2028787-200.png" alt="" />
        <p className="no-card-text">Senza carta. Senza limiti di tempo.</p>
      </div>
        </div>
    );
};

export default RequestDemoWidget;