import React from "react";
import Link from "@/components/LocalizedLink";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const HERO_IMAGE = "https://media.base44.com/images/public/6a5515cc1c02a52a32b121f4/e65de2135_generated_703e5466.png";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="40ft shipping container at a Dutch port"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="max-w-3xl bg-navy-950/85 backdrop-blur-sm rounded-xl p-8 lg:p-10 border-l-4 border-orange-500">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.05] mb-6 tracking-tight">
            {t("hero.titleLine1")}
            <br />
            <span className="text-[hsl(var(--background))]">{t("hero.titleLine2")}</span> {t("hero.titleLine3")}
            <br />
            {t("hero.titleLine4")}
          </h1>

          <p className="text-lg lg:text-xl text-white/80 max-w-2xl mb-10 leading-relaxed">
            {t("hero.description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/containers"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-500 text-navy-950 font-semibold rounded hover:bg-orange-400 transition-colors text-lg"
            >
              {t("hero.browse")}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded hover:bg-white/10 transition-colors text-lg"
            >
              {t("hero.requestQuote")}
            </Link>
          </div>
        </div>
      </div>

      <button
        type="button"
        aria-label={t("hero.scrollToContent")}
        onClick={() => window.scrollTo({ top: window.innerHeight * 0.85, behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors animate-bounce"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
}
