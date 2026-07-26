"use client";

import { useEffect, useState } from "react";
import { supabase, hasSupabaseConfig, STORE_ID } from "@/lib/supabaseClient";
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from "@/lib/i18n/config";

export function useEnabledLocales() {
  const [locales, setLocales] = useState(SUPPORTED_LANGUAGES);

  useEffect(() => {
    if (!hasSupabaseConfig) return;

    let cancelled = false;

    supabase
      .from("stores")
      .select("enabled_locales")
      .eq("id", STORE_ID)
      .single()
      .then(({ data, error }) => {
        if (cancelled || error || !data) return;
        const enabled = Array.isArray(data.enabled_locales) ? data.enabled_locales : [];
        const allowed = SUPPORTED_LANGUAGES.filter(
          (code) => code === DEFAULT_LANGUAGE || enabled.includes(code)
        );
        setLocales(allowed.length ? allowed : [DEFAULT_LANGUAGE]);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return locales;
}
