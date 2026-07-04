import { useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { setDictionaries } from '../locales';

function ContentSync() {
  const { content } = useContent();

  useEffect(() => {
    setDictionaries(content);
  }, [content]);

  return null;
}

export default ContentSync;
