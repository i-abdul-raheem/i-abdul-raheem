import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const LanguageContext = createContext();
const STORAGE_KEY = 'portfolio-language';

function getInitialLocale() {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const storedLocale = window.localStorage.getItem(STORAGE_KEY);
  if (storedLocale === 'de' || storedLocale === 'en') {
    return storedLocale;
  }

  return window.navigator.language?.toLowerCase().startsWith('de') ? 'de' : 'en';
}

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState(getInitialLocale);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, locale);
    }
  }, [locale]);

  const value = useMemo(() => ({
    locale,
    setLocale,
    toggleLocale: () => setLocale((current) => (current === 'de' ? 'en' : 'de'))
  }), [locale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
