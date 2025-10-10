// src/consent/ConsentContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { loadConsent, saveConsent } from "./storage";
import type { ConsentCategories, ConsentRecord } from "./types";
import Banner from "./Banner";
import Preferences from "./Preferences";

const DEFAULT: ConsentCategories = {
  strictlyNecessary: true,
  analytics: false,
  marketing: false,
  functional: false,
};

type Ctx = {
  consent: ConsentCategories;
  setConsent: (c: ConsentCategories) => void;
  openPrefs: () => void;
};
const ConsentCtx = createContext<Ctx | null>(null);
export const useConsent = () => useContext(ConsentCtx)!;

const POLICY_VERSION = "2025-10";

declare global {
  interface Window { dataLayer?: any[]; gtag?: (...args:any[])=>void; }
}

function applyGcm(consent: ConsentCategories) {
  // Google Consent Mode v2 – default deny all (first paint)
  if (!window.gtag) return;
  window.gtag("consent", "update", {
    ad_user_data: consent.marketing ? "granted" : "denied",
    ad_personalization: consent.marketing ? "granted" : "denied",
    ad_storage: consent.marketing ? "granted" : "denied",
    analytics_storage: consent.analytics ? "granted" : "denied",
    functionality_storage: consent.functional ? "granted" : "denied",
    security_storage: "granted", // per strictly necessary
  });
}

export const ConsentProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const stored = loadConsent();
  const [consent, setConsentState] = useState<ConsentCategories>(stored?.choices || DEFAULT);
  const [showBanner, setShowBanner] = useState(!stored);

  // Alla prima load, imposta Consent Mode su "denied" per tutto tranne security
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function(){ window.dataLayer!.push(arguments); };
    // default: deny finché non c'è consenso salvato
    applyGcm(stored?.choices || DEFAULT);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setConsent = (c: ConsentCategories) => {
    setConsentState(c);
    applyGcm(c);
    saveConsent({
      choices: c,
      updatedAt: new Date().toISOString(),
      policyVersion: POLICY_VERSION,
      userAgent: navigator.userAgent,
    } as ConsentRecord);
  };

  const [prefsOpen, setPrefsOpen] = useState(false);
  const openPrefs = () => setPrefsOpen(true);

  return (
    <ConsentCtx.Provider value={{ consent, setConsent, openPrefs }}>
      {showBanner && (
        <Banner
          onAcceptAll={() => { setConsent({ ...DEFAULT, analytics:true, marketing:true, functional:true }); setShowBanner(false); }}
          onRejectAll={() => { setConsent(DEFAULT); setShowBanner(false); }}
          onManage={() => setPrefsOpen(true)}
        />
      )}
      {prefsOpen && (
        <Preferences
          value={consent}
          onClose={() => setPrefsOpen(false)}
          onSave={(c: ConsentCategories)=>{ setConsent(c); setShowBanner(false); setPrefsOpen(false); }}
        />
      )}
      {children}
    </ConsentCtx.Provider>
  );
};