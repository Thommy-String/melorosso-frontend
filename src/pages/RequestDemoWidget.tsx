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
        description: "Lo analizziamo per capire i tuoi prodotti e servizi, così da preparare un agente con risposte intelligenti e su misura per te.",
        largeImage: null,
        mediaType: 'image',
        titleIcon: salesmanLaptop,
    },
    {
        title: "Ottieni la demo gratis.",
        description: "In giornata ti invieremo un link privato per accedere alla tua demo. Potrai messaggiare con l'agente fingendoti un vero cliente. Considerala una base di partenza. Il suo vero potenziale si sbloccherà quando lo perfezioneremo insieme, con le tue informazioni specifiche.",
        largeImage: DemoAgenteAi,
        mediaType: 'video',
        titleIcon: salesmanLettera,
    },
    {
        title: "Usa o ignora.",
        description: "Dopo aver provato la l'agente, decidi se miglioralo e attivalo gratis sul tuo sito, o ignorare e lasciar perdere. Nessuna pressione, non verrai ricontattato. Non ci piace lo spam.",
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!siteUrl.trim()) return;

        setLoading(true);
        setCompletedStep(0);
        setSubmittedSiteUrl(siteUrl);

        try {
            console.log("Submitting:", { siteUrl, source });
            await new Promise(resolve => setTimeout(resolve, 1000));

            setView('processing');
            setLoading(false);

        } catch (err) {
            console.error("request-demo error", err);
            setView('error');
            setLoading(false);
        }
    };

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

                                    {/* NUOVO: Contenitore per impilare titolo e stato */}
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


                                                <div className="mr-status-text">
                                                    Demo {getDomainFromUrl(submittedSiteUrl)} in costruzione...
                                                </div>
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
        </div>
    );
};

export default RequestDemoWidget;