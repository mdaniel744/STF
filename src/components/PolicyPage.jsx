import React from "react";
import Link from "@/components/LocalizedLink";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function PolicyPage({ title, lastUpdated, sections }) {
  const { t } = useLanguage();
  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-gray-50">
      <section className="py-12 lg:py-16 bg-navy-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-4">
            <Link to="/" className="hover:text-white">{t("policy.home")}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">{title}</span>
          </nav>
          <h1 className="text-3xl lg:text-4xl font-bold text-white">{title}</h1>
          {lastUpdated && <p className="text-white/50 text-sm mt-2">{t("policy.lastUpdated", { date: lastUpdated })}</p>}
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg border border-gray-200 p-8 lg:p-12 space-y-8">
            {sections.map((section, i) => (
              <div key={i}>
                <h2 className="text-xl font-bold text-navy-800 mb-3">{section.heading}</h2>
                <div className="text-gray-600 leading-relaxed space-y-3">
                  {section.content.map((para, j) => (
                    <p key={j}>{para}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}