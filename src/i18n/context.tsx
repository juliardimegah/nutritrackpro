'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { en } from './locales/en';
import { id } from './locales/id';

type Locale = 'en' | 'id';

const translations = { en, id };

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');

  const t = useCallback((key: string, params?: Record<string, string | number>) => {
    let lang = translations[locale];
    // @ts-ignore
    let translation = lang[key];

    if (!translation) {
      // Fallback to English if translation is missing
      lang = translations['en'];
      // @ts-ignore
      translation = lang[key];
    }
    
    if (typeof translation === 'string' && params) {
        Object.entries(params).forEach(([paramKey, paramValue]) => {
            translation = translation.replace(`{${paramKey}}`, String(paramValue));
        });
    }

    return translation || key;
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}

export function useTranslation() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LocaleProvider');
  }
  return { t: context.t };
}
