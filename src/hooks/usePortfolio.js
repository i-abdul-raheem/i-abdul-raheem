import { useLanguage } from '../language';
import { useContent } from '../context/ContentContext';

export function usePortfolio() {
  const { locale } = useLanguage();
  const { content, loading, saving, lastSaved, error, updateLocale, saveContent } = useContent();
  const dict = content[locale] ?? content.en;

  return {
    locale,
    dict,
    content,
    loading,
    saving,
    lastSaved,
    error,
    updateLocale,
    saveContent
  };
}
