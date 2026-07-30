"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, useLanguage } from "@/lib/i18n/LanguageContext";
import { localizePublicPath } from "@/lib/i18n/permalinks";

export default function SEOHead({ title = null, description = null }) {
  const pathname = usePathname() || "/";
  const { language } = useLanguage();

  useEffect(() => {
    const origin = window.location.origin;
    const buildUrl = (lang) => `${origin}${localizePublicPath(pathname, lang)}`;
    const createdNodes = [];

    const canonical = document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = buildUrl(language);
    canonical.dataset.stfSeo = "canonical";
    document.head.appendChild(canonical);
    createdNodes.push(canonical);

    SUPPORTED_LANGUAGES.forEach((lang) => {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = lang;
      link.href = buildUrl(lang);
      link.dataset.stfSeo = "alternate";
      document.head.appendChild(link);
      createdNodes.push(link);
    });

    const xDefault = document.createElement("link");
    xDefault.rel = "alternate";
    xDefault.hreflang = "x-default";
    xDefault.href = buildUrl(DEFAULT_LANGUAGE);
    xDefault.dataset.stfSeo = "alternate";
    document.head.appendChild(xDefault);
    createdNodes.push(xDefault);

    if (title) document.title = title;

    if (description) {
      /** @type {HTMLMetaElement | null} */
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.name = "description";
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = description;
    }

    document.documentElement.lang = language;

    return () => {
      createdNodes.forEach((node) => node.remove());
    };
  }, [pathname, language, title, description]);

  return null;
}
