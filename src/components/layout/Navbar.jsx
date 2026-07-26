"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "@/components/LocalizedLink";
import { Menu, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import CartIcon from "@/components/cart/CartIcon";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const navLinks = [
  { labelKey: "nav.home", path: "/" },
  { labelKey: "nav.containers", path: "/containers" },
  { labelKey: "nav.about", path: "/about" },
  { labelKey: "nav.faq", path: "/faq" },
  { labelKey: "nav.contact", path: "/contact" },
];

export default function Navbar() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <nav
        aria-label={t("nav.primaryNavigation")}
        className="fixed inset-x-0 top-0 z-[80] isolate bg-white shadow-sm lg:bg-white/95 lg:backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex min-w-0 items-center gap-2">
              <img
                src="https://media.base44.com/images/public/6a5515cc1c02a52a32b121f4/40b715def_greenlogo.png"
                alt="STF Containers"
                className="h-16 w-auto max-w-[86px] object-contain sm:max-w-none lg:h-20"
              />
            </Link>

            <div className="relative z-10 flex shrink-0 items-center gap-2 sm:gap-3">
              <LanguageSwitcher />
              <CartIcon />
              <button
                type="button"
                aria-label={t("nav.openMenu")}
                aria-controls="site-navigation-drawer"
                aria-expanded={open}
                onClick={() => setOpen((current) => !current)}
                className="relative z-10 flex h-11 w-11 touch-manipulation items-center justify-center rounded-lg bg-navy-800 text-white transition-colors hover:bg-navy-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 sm:w-auto sm:gap-2 sm:px-4"
              >
                <Menu className="w-6 h-6" />
                <span className="text-sm hidden sm:block">{t("nav.menu")}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label={t("nav.primaryNavigation")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] overflow-y-auto bg-navy-800"
          >
            <div className="flex items-center justify-between p-4">
              <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
                <img
                  src="https://media.base44.com/images/public/6a5515cc1c02a52a32b121f4/2a58e8d36_whitelogo.png"
                  alt="STF Containers"
                  className="h-16 w-auto"
                />
              </Link>
              <button
                type="button"
                aria-label={t("nav.closeMenu")}
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 touch-manipulation items-center justify-center rounded-lg text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="px-6 py-12 space-y-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-4 border-b border-white/10 text-white text-2xl font-semibold hover:text-orange-400 transition-colors"
                  >
                    {t(link.labelKey)}
                    <ChevronRight className="w-5 h-5 opacity-40" />
                  </Link>
                </motion.div>
              ))}
              <div className="pt-8">
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="block w-full text-center py-4 bg-orange-500 text-navy-950 font-bold text-lg rounded"
                >
                  {t("nav.requestQuote")}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
