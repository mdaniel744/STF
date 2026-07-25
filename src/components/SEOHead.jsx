"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, useLanguage } from "@/lib/i18n/LanguageContext";

export default function SEOHead({ title, description }) {
  const pathname = usePathname() || "/";
  const { language } = useLanguage();

  useEffect(() => {
    const origin = window.location.origin;
    const languagePattern = new RegExp(`^/(${SUPPORTED_LANGUAGES.join("|")})(?=/|$)`);
    const pathWithoutLang = pathname.replace(languagePattern, "") || "/";
    const suffix = pathWithoutLang === "/" ? "" : pathWithoutLang;
    const buildUrl = (lang) => `${origin}/${lang}${suffix}`;

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = buildUrl(language);

    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());

    SUPPORTED_LANGUAGES.forEach((lang) => {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = lang;
      link.href = buildUrl(lang);
      document.head.appendChild(link);
    });

    const xDefault = document.createElement("link");
    xDefault.rel = "alternate";
    xDefault.hreflang = "x-default";
    xDefault.href = buildUrl(DEFAULT_LANGUAGE);
    document.head.appendChild(xDefault);

    if (title) document.title = title;

    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.name = "description";
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = description;
    }

    document.documentElement.lang = language;
  }, [pathname, language, title, description]);

  return null;
}
