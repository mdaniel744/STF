import React, { useState, useEffect } from "react";
import Link from "@/components/LocalizedLink";
import { base44 } from "@/api/base44Client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronRight, Loader2, HelpCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useTranslations } from "@/hooks/useTranslations";

export default function FAQPage() {
  const { t, language } = useLanguage();
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.FAQ.list("display_order", 100)
      .then(setFaqs)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = [...new Set(faqs.map((f) => f.category))];

  const textMap = {};
  faqs.forEach((faq) => {
    textMap['q_' + faq.id] = faq.question;
    textMap['a_' + faq.id] = faq.answer;
  });
  const { translated } = useTranslations(textMap, language);

  return (
    <div className="pt-20 lg:pt-24">
      <section className="py-16 lg:py-20 bg-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-12 h-px bg-orange-500" />
            <span className="font-technical text-xs text-orange-400 uppercase tracking-widest">{t("faq.label")}</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">{t("faq.heading")}</h1>
          <p className="text-white/60 max-w-2xl">
            {t("faq.description")}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link to="/" className="hover:text-navy-800">{t("faq.home")}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-navy-800 font-medium">{t("faq.faq")}</span>
          </nav>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-navy-800" />
            </div>
          ) : faqs.length === 0 ? (
            <div className="text-center py-20">
              <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">{t("faq.empty")}</p>
            </div>
          ) : (
            <div className="space-y-10">
              {categories.map((category) => (
                <div key={category}>
                  <h2 className="text-xl font-bold text-navy-800 mb-4 pb-2 border-b border-gray-200">{category}</h2>
                  <Accordion type="single" collapsible className="space-y-3">
                    {faqs.filter((f) => f.category === category).map((faq) => (
                      <AccordionItem key={faq.id} value={faq.id} className="bg-white border border-gray-200 rounded-lg px-4">
                        <AccordionTrigger className="text-left font-medium text-navy-800 hover:no-underline">
                          {translated['q_' + faq.id]}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 leading-relaxed">
                          {translated['a_' + faq.id]}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 text-center bg-white rounded-lg p-8 border border-gray-200">
            <h3 className="font-semibold text-navy-800 mb-2">{t("faq.stillHave")}</h3>
            <p className="text-gray-500 mb-4">{t("faq.teamHelp")}</p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-navy-950 font-semibold rounded-lg hover:bg-orange-400 transition-colors">
              {t("faq.contactUs")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}