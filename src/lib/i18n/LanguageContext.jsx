"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DEFAULT_LANGUAGE, FALLBACK_LANGUAGE, SUPPORTED_LANGUAGES } from "./config";
import { hasLocalePrefix, localizePublicPath } from "./permalinks";
import { translations } from "./translations";

const LanguageContext = createContext();
const LANGUAGE_KEY = "stf_language";

export function LanguageProvider({ children }) {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchString = searchParams?.toString() || "";

  const language = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    const lang = segments[0];
    return SUPPORTED_LANGUAGES.includes(lang) ? lang : DEFAULT_LANGUAGE;
  }, [pathname]);

  const setLanguage = useCallback((lang) => {
    if (!SUPPORTED_LANGUAGES.includes(lang)) return;

    if (typeof window !== "undefined") {
      localStorage.setItem(LANGUAGE_KEY, lang);
      document.documentElement.lang = lang;
    }

    const currentPath = `${pathname}${searchString ? `?${searchString}` : ""}`;
    router.push(localizePublicPath(currentPath, lang));
  }, [pathname, router, searchString]);

  const localePath = useCallback((path) => {
    if (!path || typeof path !== "string" || !path.startsWith("/")) return path;
    if (hasLocalePrefix(path)) return path;
    return localizePublicPath(path, language);
  }, [language]);

  const localeNavigate = useCallback((path, options) => {
    const target = localePath(path);
    if (options?.replace) router.replace(target);
    else router.push(target);
  }, [router, localePath]);

  useEffect(() => {
    document.documentElement.lang = language;
    if (typeof window !== "undefined") {
      localStorage.setItem(LANGUAGE_KEY, language);
    }
  }, [language]);

  const t = useCallback((key, params) => {
    const lookup = (lang) => {
      const keys = key.split(".");
      let value = translations[lang];
      if (!value) return undefined;
      for (const k of keys) {
        if (value && typeof value === "object" && k in value) {
          value = value[k];
        } else {
          return undefined;
        }
      }
      return value;
    };

    let result = lookup(language);
    if (result === undefined && language !== FALLBACK_LANGUAGE) {
      result = lookup(FALLBACK_LANGUAGE);
    }
    if (result === undefined && FALLBACK_LANGUAGE !== "en") {
      result = lookup("en");
    }
    if (result === undefined) return key;

    if (typeof result === "string" && params) {
      return result.replace(/\{(\w+)\}/g, (_, match) => params[match] ?? "");
    }
    return result;
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        supportedLanguages: SUPPORTED_LANGUAGES,
        localePath,
        localeNavigate,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export { DEFAULT_LANGUAGE, FALLBACK_LANGUAGE, SUPPORTED_LANGUAGES };

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
