"use client";

import { useEffect, useState } from "react";
import { fetchTranslations, overlayTranslation } from "@/api/translations";
import { DEFAULT_LANGUAGE } from "@/lib/i18n/config";

export function useLocalizedList(entityType, items, language, fields) {
  const [translationsMap, setTranslationsMap] = useState({});
  const ids = items?.map((item) => item.id).filter(Boolean) || [];
  const idsKey = ids.join(",");

  useEffect(() => {
    if (language === DEFAULT_LANGUAGE || ids.length === 0) {
      setTranslationsMap({});
      return;
    }

    let cancelled = false;
    fetchTranslations(entityType, ids, language).then((map) => {
      if (!cancelled) setTranslationsMap(map);
    });

    return () => {
      cancelled = true;
    };
  }, [entityType, language, idsKey]);

  if (language === DEFAULT_LANGUAGE || !items) return items || [];
  return items.map((item) => overlayTranslation(item, translationsMap, fields));
}
