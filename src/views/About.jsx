import React from "react";
import Link from "@/components/LocalizedLink";
import { ArrowRight, Check } from "lucide-react";
import { ABOUT_CONTENT } from "@/data/about-content";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const ABOUT_IMAGE = "/images/about-stf-container-yard.jpg";

export default function About() {
  const { t, language } = useLanguage();
  const content = ABOUT_CONTENT[language] || ABOUT_CONTENT.nl;

  return (
    <div className="pt-20 lg:pt-24">
      <section className="relative min-h-[430px] lg:min-h-[520px] flex items-end overflow-hidden bg-navy-900">
        <img
          src={ABOUT_IMAGE}
          alt={content.imageAlt}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-navy-950/65" aria-hidden="true" />
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-px bg-orange-500" />
              <span className="font-technical text-xs text-orange-400 uppercase tracking-widest">
                {content.label}
              </span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">{content.heading}</h1>
            <p className="text-lg lg:text-xl text-white/85 leading-relaxed max-w-2xl">
              {content.intro}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl lg:text-4xl font-bold text-navy-800 mb-8">
              {content.overviewHeading}
            </h2>
            <div className="space-y-5 text-gray-600 text-base lg:text-lg leading-relaxed">
              {content.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-navy-800 mb-10">
            {content.whyHeading}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
            {content.reasons.map((reason) => (
              <div key={reason} className="flex items-start gap-3 border-b border-gray-200 pb-5">
                <span className="mt-0.5 w-6 h-6 flex-shrink-0 rounded-full bg-orange-500 flex items-center justify-center">
                  <Check className="w-4 h-4 text-navy-950" aria-hidden="true" />
                </span>
                <p className="font-medium text-navy-800 leading-relaxed">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)] gap-12 lg:gap-20 items-start">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-navy-800 mb-8">
                {content.approachHeading}
              </h2>
              <div className="space-y-5 text-gray-600 text-base lg:text-lg leading-relaxed">
                {content.approach.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <aside className="border-l-4 border-orange-500 bg-gray-50 p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-navy-800 mb-6">{content.companyHeading}</h2>
              <dl className="space-y-5 text-sm">
                <div>
                  <dt className="font-semibold text-navy-800 mb-1">{content.addressLabel}</dt>
                  <dd className="text-gray-600">
                    <address className="not-italic leading-relaxed">
                      <strong className="text-navy-800">STF Container B.V.</strong><br />
                      Rembrandtlaan 49<br />
                      3723 BG Bilthoven<br />
                      {language === "nl" ? "Nederland" : language === "de" ? "Niederlande" : language === "fr" ? "Pays-Bas" : language === "es" ? "Países Bajos" : "The Netherlands"}
                    </address>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-navy-800 mb-1">{content.emailLabel}</dt>
                  <dd>
                    <a className="text-navy-700 hover:text-orange-500" href="mailto:contact@stfcontainer.com">
                      contact@stfcontainer.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-navy-800 mb-1">{content.phoneLabel}</dt>
                  <dd>
                    <a className="text-navy-700 hover:text-orange-500" href="tel:+3154546565">
                      +31 545465 65
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-navy-800 mb-1">{content.vatLabel}</dt>
                  <dd className="text-gray-600">NL 867872020B01</dd>
                </div>
                <div>
                  <dt className="font-semibold text-navy-800 mb-1">{content.chamberLabel}</dt>
                  <dd className="text-gray-600">97008370</dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-navy-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {t("about.ctaHeading")}
          </h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            {t("about.ctaDesc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/containers" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-500 text-navy-950 font-semibold rounded-lg hover:bg-orange-400 transition-colors">
              {t("about.browse")} <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link to="/contact" className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
              {t("about.contactUs")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
