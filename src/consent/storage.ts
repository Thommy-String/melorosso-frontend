// src/consent/storage.ts

import type { ConsentRecord } from "./types";
const KEY = "mr_consent_v1";
export function loadConsent(): ConsentRecord | null {
  try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch { return null; }
}
export function saveConsent(r: ConsentRecord) {
  localStorage.setItem(KEY, JSON.stringify(r));
}
export function hasConsented(): boolean {
  const r = loadConsent();
  return !!r && !!r.updatedAt;
}