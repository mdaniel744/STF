"use client";

import React, { useState, useRef, useEffect } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const languages = [
  { code: "nl", label: "Nederlands", flag: "https://flagcdn.com/w80/nl.png", flagName: "Netherlands" },
  { code: "en", label: "English", flag: "https://flagcdn.com/w80/gb.png", flagName: "United Kingdom" },
  { code: "de", label: "Deutsch", flag: "https://flagcdn.com/w80/de.png", flagName: "Germany" },
  { code: "fr", label: "Français", flag: "https://flagcdn.com/w80/fr.png", flagName: "France" },
  { code: "es", label: "Español", flag: "https://flagcdn.com/w80/es.png", flagName: "Spain" },
];

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const current = languages.find((l) => l.code === language) || languages[0];
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors border-gray-200 text-navy-800 hover:bg-gray-50"
      >
        <img src={current.flag} alt={current.flagName} className="w-6 h-4 rounded-sm object-cover" />
        <span className="text-sm font-medium hidden sm:block text-[hsl(var(--foreground))]">{current.code.toUpperCase()}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-[60]"
          >
            <div className="px-3 py-2 border-b border-gray-100 flex items-center gap-2">
              <Globe className="w-4 h-4 text-navy-600" />
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("language.label")}</span>
            </div>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${
                  current.code === lang.code ? "bg-orange-50" : ""
                }`}
              >
                <img src={lang.flag} alt={lang.flagName} className="w-7 h-5 rounded-sm object-cover" />
                <span className={`text-sm font-medium ${current.code === lang.code ? "text-orange-600" : "text-gray-700"}`}>
                  {lang.label}
                </span>
                {current.code === lang.code && <Check className="w-4 h-4 text-orange-500 ml-auto" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
