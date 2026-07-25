import { useState, useEffect, useMemo } from 'react';
import { base44 } from '@/api/base44Client';
import { appParams } from '@/lib/app-params';

/**
 * Translates an object of key→text pairs into the current language.
 * Uses the backend translateContent function with caching.
 * Falls back to original text if translation fails or language is English.
 *
 * @param {Object} textMap - { key: "text to translate", ... }
 * @param {string} language - target language code
 * @returns {{ translated: Object, loading: boolean }}
 */
export function useTranslations(textMap, language) {
  const [translated, setTranslated] = useState({});
  const [loading, setLoading] = useState(false);

  const validTexts = useMemo(() => {
    const result = {};
    Object.entries(textMap).forEach(([key, text]) => {
      if (text && typeof text === 'string' && text.trim()) {
        result[key] = text;
      }
    });
    return result;
  }, [JSON.stringify(textMap)]);

  const textValues = Object.values(validTexts);
  const textsKey = JSON.stringify(textValues);

  useEffect(() => {
    if (language === 'en' || !appParams.appId || textValues.length === 0) {
      setTranslated({});
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    base44.functions.invoke('translateContent', {
      texts: textValues,
      target_language: language,
    }).then(res => {
      if (!cancelled) {
        const result = {};
        const apiTranslations = res.data?.translations || {};
        Object.keys(validTexts).forEach((key, i) => {
          if (apiTranslations[i]) {
            result[key] = apiTranslations[i];
          }
        });
        setTranslated(result);
      }
    }).catch(() => {}).finally(() => {
      if (!cancelled) setLoading(false);
    });

    return () => { cancelled = true; };
  }, [language, textsKey]);

  const merged = {};
  Object.keys(textMap).forEach(key => {
    merged[key] = translated[key] || textMap[key];
  });

  return { translated: merged, loading };
}
