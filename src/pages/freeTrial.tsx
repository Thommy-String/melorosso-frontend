import React from "react";
import { HashLink } from "react-router-hash-link";
import occhiolinoSalesman from "../images/occhiolinoSalesman.png"; // <-- aggiorna il path se serve
import "./FreeTrial.css";

const FreeTrial = () => (
  <section className="free-trial">
    <div className="free-trial-container">

      {/* Immagine piccola + titolo fianco a fianco */}
      <div className="free-trial-header">
        <div className="free-trial-image-wrapper">
          <img
            src={occhiolinoSalesman}
            alt="Prova gratis la demo"
            className="free-trial-image"
            loading="lazy"
            decoding="async"
          />
        </div>
        <h2 className="free-trial-title">Prova gratis.</h2>
      </div>

      {/* Frase sotto */}
      <p className="free-trial-subtitle">
        Nessuna carta. Nessun vincolo.
      </p>

      {/* Pulsanti */}
      <div className="free-trial-buttons">
        <HashLink smooth to="/#pricing" className="cta-button primary medium">
          Prova Gratis
        </HashLink>
        <a
          href="mailto:info@melorosso.it?subject=Richiesta%20informazioni&body=Ciao%20vorrei%20sapere%20di%20pi%C3%B9%20del%20vostro%20agente%20AI..."
          className="cta-button secondary medium"
        >
          Contattaci
        </a>
      </div>

      {/* Senza carta */}
      <div className="free-trial-no-card">
        <img
          className="no-card-image"
          src="https://static.thenounproject.com/png/2028787-200.png"
          alt=""
        />
        <p className="no-card-text">Senza carta.</p>
      </div>
    </div>
  </section>
);

export default FreeTrial;