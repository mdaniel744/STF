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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="https://media.base44.com/images/public/6a5515cc1c02a52a32b121f4/40b715def_greenlogo.png"
                alt="STF Containers"
                className="h-16 lg:h-20 w-auto"
              />
            </Link>

            <div className="flex items-center gap-3">
              <LanguageSwitcher scrolled={scrolled} />
              <CartIcon />
              <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-colors bg-navy-800 text-white hover:bg-navy-700"
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-navy-800"
          >
            <div className="flex items-center justify-between p-4">
              <Link to="/" className="flex items-center gap-2">
                <img
                  src="https://media.base44.com/images/public/6a5515cc1c02a52a32b121f4/2a58e8d36_whitelogo.png"
                  alt="STF Containers"
                  className="h-16 w-auto"
                />
              </Link>
              <button onClick={() => setOpen(false)} className="text-white p-2">
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
