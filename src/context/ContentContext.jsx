import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import enStatic from '../locales/en.json';
import deStatic from '../locales/de.json';
import { apiUrl } from '../lib/api';
const ContentContext = createContext(null);
const AUTH_KEY = 'portfolio-admin-token';

const defaultContent = { en: enStatic, de: deStatic };

export function ContentProvider({ children }) {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [error, setError] = useState(null);

  const loadContent = useCallback(async () => {
    setLoading(true);
    setError(null);

    const maxAttempts = 5;

    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      try {
        const response = await fetch(apiUrl('/api/content'));
        if (!response.ok) throw new Error('Could not load content');
        const data = await response.json();
        setContent({ en: data.en, de: data.de });
        setLoading(false);
        return;
      } catch (err) {
        if (attempt === maxAttempts) {
          setError('Could not reach API. Using bundled content.');
          setContent(defaultContent);
          setLoading(false);
          return;
        }

        await new Promise((resolve) => setTimeout(resolve, 500 * attempt));
      }
    }
  }, []);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  const updateLocale = useCallback((locale, updater) => {
    setContent((current) => ({
      ...current,
      [locale]: typeof updater === 'function' ? updater(current[locale]) : updater
    }));
  }, []);

  const saveContent = useCallback(async () => {
    const token = sessionStorage.getItem(AUTH_KEY);
    if (!token) throw new Error('Not authenticated');

    setSaving(true);
    setError(null);

    try {
      const response = await fetch(apiUrl('/api/content'), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(content)
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error || 'Save failed');
      }

      setLastSaved(new Date());
      await loadContent();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setSaving(false);
    }
  }, [content, loadContent]);

  const value = useMemo(() => ({
    content,
    loading,
    saving,
    lastSaved,
    error,
    updateLocale,
    saveContent,
    reloadContent: loadContent
  }), [content, loading, saving, lastSaved, error, updateLocale, saveContent, loadContent]);

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) throw new Error('useContent must be used within ContentProvider');
  return context;
}

export function getAuthToken() {
  return sessionStorage.getItem(AUTH_KEY);
}

export function setAuthToken(token) {
  sessionStorage.setItem(AUTH_KEY, token);
}

export function clearAuthToken() {
  sessionStorage.removeItem(AUTH_KEY);
}

export { AUTH_KEY };
