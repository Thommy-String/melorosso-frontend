import React from "react";
import styles from "./index.module.css";

const DEFAULT_REVIEWS = [
  {
    id: 1,
    company: "Centro Auto Sportive CLG",
message: "Prima ricevevo ogni giorno tante **email e chiamate ripetitive** con le stesse domande. Ora chi visita il sito ottiene **risposte subito dall’agente** e io ho più tempo per concentrarmi su altro. Ho provato altri chatbot, ma solo questo mi dà **l’analisi automatica delle conversazioni** con l’AI. Da quando lo uso ho avuto qualche **visita in negozio** da persone che prima avevano messaggiato con l’agente dal nostro sito. Un grazie a **Valerio** per il supporto sempre attento.",
    date: "2 mesi fa",
    plan: "Utente con Piano Plus",
    photo: "https://www.shutterstock.com/image-photo/close-photo-charming-guy-entrepreneur-260nw-1531460651.jpg",
    contact: "Marco R.",
    role: "Titolare",
    verified: true,
    usage: "In uso da +1 anno",
    impact: ["-32% email ripetitive", "+9% visite in negozio", "22 nuovi contatti generati"],
  },
  {
    id: 2,
    company: "Wellixir integratori",
    message:
      "Il **piano gratis** è veramente gratis. Non hanno mai insistito di passare a un piano a pagmaneto, apprezzo molto. Trovati su google all’inizio ero scettica, ma dopo un solo giorno me l'hanno subito **integrato sul mio sito**. Cercavo qualcosa che rispondesse via messaggi ai clienti che fanno domande dal sito quando sono occupata in magazzino o sono in pausa. Non potrei fare più senza! L'agente risponde benissimo perchè è stato fatto su misura e **conosce bene tutti i nostri integratori** e sa quali consigliare al cliente. Per me il piano gratis basta e avanza. Straconsiglio!",
    date: "1 mese fa",
    plan: "Utente con Piano Gratis",
    photo: "https://www.shutterstock.com/image-photo/young-irish-plus-size-girl-600nw-2150917201.jpg",
    contact: "Sara B.",
    role: "E-commerce Lead",
    verified: true,
    usage: "In uso da 4 mesi",
    impact: ["+12.7% vendite online", "+ tempo libero"],
  },
  {
    id: 3,
    company: "Studio Legale avv. Morra",
    message:
      "Ti fanno prima una **demo** così provi tu stesso a vedere come l'agente risponde ai clienti sul tuo sito. Ottima la funzione che **raccoglie i contatti** dei clienti interessati (nome, email e telefono). Produce davvero vendite: negli ultimi 3 mesi ho ottenuto **23 nuovi contatti** senza fare nulla, richiamati e gran parte trasformati in clienti.",
    date: "2 mesi fa",
    plan: "Utente con Piano Gratuito",
    photo: "https://imgv3.fotor.com/images/ai-headshot-generator/profile-picture-of-a-female-with-long-brown-hair-in-white-business-shirt-generated-by-Fotor-AI-LinkedIn-profile-picture-maker.jpg",
    contact: "Luca F.",
    role: "Founder",
    verified: true,
    usage: "In uso da 2 mesi",
    impact: ["+23 contatti generati"],
  },
];

export default function Reviews({ reviews = DEFAULT_REVIEWS }) {
  return (
    <section className={styles.wrapper} aria-label="Recensioni clienti">
      <div className={styles.grid}>
        {reviews.map((r) => (
          <article key={r.id} className={styles.card}>
            <header className={styles.header}>
              <div className={styles.headerMeta}>
                <div className={styles.companyRow}>
                  <h4 className={styles.company}>
                    <span className={styles.companyAvatar}>
                      <Avatar src={r.photo} name={r.company} size={20} />
                    </span>
                    {r.company}
                    {r.verified && (
                      <span className={styles.verified} title="Recensione verificata">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="14" height="14" aria-hidden="true">
                          <polygon fill="#42a5f5" points="29.62,3 33.053,8.308 39.367,8.624 39.686,14.937 44.997,18.367 42.116,23.995 45,29.62 39.692,33.053 39.376,39.367 33.063,39.686 29.633,44.997 24.005,42.116 18.38,45 14.947,39.692 8.633,39.376 8.314,33.063 3.003,29.633 5.884,24.005 3,18.38 8.308,14.947 8.624,8.633 14.937,8.314 18.367,3.003 23.995,5.884"></polygon>
                          <polygon fill="#fff" points="21.396,31.255 14.899,24.76 17.021,22.639 21.428,27.046 30.996,17.772 33.084,19.926"></polygon>
                        </svg>
                      </span>
                    )}
                  </h4>
                </div>
                <div className={styles.ratingRow}>
                  <Stars rating={5} />
                </div>
              </div>
            </header>


            <p className={styles.message}>{renderWithBold(r.message)}</p>
            {r.date && <p className={styles.date}>{r.date}</p>}


            {Array.isArray(r.impact) && r.impact.length > 0 && (
              <div className={styles.impactRow}>
                {r.impact.map((m, i) => (
                  <span key={i} className={styles.impactChip}>
                    {impactIcon(m)}
                    {m}
                  </span>
                ))}
              </div>
            )}

            <footer className={styles.footer}>
              <strong className={`${styles.planLabel} ${planTone(r.plan)}`}>
                {normalizePlan(r.plan)}
              </strong>
              {r.usage && <span className={styles.usageInline}>{r.usage}</span>}
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}

function badgeClass(plan) {
  const p = (plan || "").toLowerCase();
  if (p.includes("pro")) return styles.badgePro;
  if (p.includes("plus")) return styles.badgePlus;
  return styles.badgeFree; // Gratis / Free
}

function normalizePlan(plan) {
  const p = (plan || "").toLowerCase();
  if (p.includes("pro")) return "Piano Pro";
  if (p.includes("plus")) return "Piano Plus";
  return "Piano Gratis";
}

function planTone(plan) {
  const p = (plan || "").toLowerCase();
  if (p.includes("pro")) return styles.planPro;
  if (p.includes("plus")) return styles.planPlus;
  return styles.planFree;
}

function Avatar({ src, name, size = 40 }) {
  if (!src) {
    const initials = (name || "?")
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
    return (
      <div
        className={styles.avatarFallback}
        style={{ width: size, height: size, fontSize: Math.max(10, size / 2) }}
      >
        {initials}
      </div>
    );
  }
  return (
    <img
      className={styles.avatar}
      src={src}
      alt={name ? `Logo ${name}` : "Logo azienda"}
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
    />
  );
}

function Stars({ rating = 5 }) {
  const rounded = Math.round(rating);
  return (
    <div className={styles.stars} role="img" aria-label={`${rounded} su 5 stelle`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} filled={i < rounded} />
      ))}
    </div>
  );
}

function Star({ filled }) {
  return (
    <svg
      className={filled ? `${styles.star} ${styles.filled}` : styles.star}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path d="M10 1.5l2.8 5.67 6.26.91-4.53 4.41 1.07 6.24L10 15.9 4.4 18.73l1.07-6.24L.94 8.08l6.26-.91L10 1.5z" />
    </svg>
  );
}

function impactIcon(text = "") {
  const t = (text || "").toLowerCase();

  // Keyword buckets
  const isPositive = t.includes("+") ||
    t.includes("conversion") || t.includes("conver") ||
    t.includes("lead") || t.includes("preventivi") ||
    t.includes("vendite") || t.includes("fatturato") || t.includes("ricavi") ||
    t.includes("migliora") || t.includes("aument");

  const isNegative = t.includes("-") || t.includes("riduz") || t.includes("dimin") || t.includes("abbass");

  const hasEmail = t.includes("email") || t.includes("mail");
  const hasRequests = t.includes("richies") || t.includes("ticket");
  const hasTime = t.includes("tempo") || t.includes("tempi") || t.includes("attese") || t.includes("attesa");
  const hasSales = t.includes("vendite") || t.includes("carrello") || t.includes("ordine") || t.includes("checkout");
  const hasQuote = t.includes("preventiv");
  const hasConversion = t.includes("conversion");
  const hasLead = t.includes("lead");
  const hasCost = t.includes("costi") || t.includes("spese");
  const hasSatisfaction = t.includes("soddisf");

  // 1) Specific domain icons first
  if (hasConversion) {
    // Target / bullseye
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
        <path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
      </svg>
    );
  }
  if (hasSales) {
    // Shopping cart
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
        <path fill="currentColor" d="M7 18a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm10 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM5 5h1l1.6 8.2A2 2 0 0 0 9.6 15H17a2 2 0 0 0 2-1.6L20 8H8.4l-.3-2H5Z"/>
      </svg>
    );
  }
  if (hasLead) {
    // User plus
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
        <path fill="currentColor" d="M15 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm-4 6c-3.3 0-6 2.7-6 6h2a4 4 0 0 1 8 0h2c0-3.3-2.7-6-6-6Zm7-5v2h2v2h-2v2h-2v-2h-2v-2h2V9h2Z"/>
      </svg>
    );
  }
  if (hasQuote) {
    // Document/text
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
        <path fill="currentColor" d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm8 6h4l-4-4v4Zm-8 3h10v2H6v-2Zm0 4h10v2H6v-2Z"/>
      </svg>
    );
  }
  if (hasEmail) {
    // Envelope
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
        <path fill="currentColor" d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v.2l-10 6-10-6V6Zm0 2.8V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8.8l-9.4 5.6a2 2 0 0 1-2.2 0L2 8.8Z"/>
      </svg>
    );
  }
  if (hasRequests) {
    // Chat bubble
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
        <path fill="currentColor" d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"/>
      </svg>
    );
  }
  if (hasTime) {
    // Clock
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
        <path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 5h-2v6l5 3 .9-1.5-3.9-2.3V7Z"/>
      </svg>
    );
  }
  if (hasCost) {
    // Price tag
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
        <path fill="currentColor" d="M3 12l9-9 9 9-9 9-9-9Zm9-5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/>
      </svg>
    );
  }
  if (hasSatisfaction) {
    // Smile
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
        <path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-4 9h2v2H8v-2Zm6 0h2v2h-2v-2Zm-6.5 5a6 6 0 0 0 9 0l-1.6-1.2a4 4 0 0 1-5.8 0L5.5 16Z"/>
      </svg>
    );
  }

  // 2) Generic trends if prefixed with + / - or generic improvement/reduction
  if (isPositive) {
    // Trending up
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
        <path fill="currentColor" d="M3 17h18v2H1V5h2v10Zm4-4 3 3 5-6 4 4 2-2-6-6-5 6-3-3-3 3 3 3Z"/>
      </svg>
    );
  }
  if (isNegative) {
    // Trending down
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
        <path fill="currentColor" d="M3 5h18v2H1v14h2V5Zm4 6 3 3 5-6 4 4 2-2-6-6-5 6-3-3-3 3 3 3Z" transform="scale(1,-1) translate(0,-24)"/>
      </svg>
    );
  }

  // 3) Fallback: check circle
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
      <path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-2 11.2-2.5-2.5 1.4-1.4L10 10.6l5.1-5.1 1.4 1.4L10 13.2Z"/>
    </svg>
  );
}
function renderWithBold(text = "") {
  const parts = String(text).split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}