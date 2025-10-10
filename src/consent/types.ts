// src/consent/types.ts
export type ConsentCategories = {
  strictlyNecessary: true; // sempre true
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
};

export type ConsentRecord = {
  choices: ConsentCategories;
  updatedAt: string; // ISO
  policyVersion: string; // es. "2025-01"
  country?: string;
  userAgent?: string;
};