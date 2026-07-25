import React from "react";
import Link from "@/components/LocalizedLink";
import { MapPin, Truck, Shield, Headphones, Package, Award, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const ABOUT_IMAGE = "https://media.base44.com/images/public/6a5515cc1c02a52a32b121f4/427a323bb_generated_6cd1725f.png";

export default function About() {
  const { t } = useLanguage();

  const highlights = [
    { icon: MapPin, title: t("about.nationwideTitle"), description: t("about.nationwideDesc") },
    { icon: Package, title: t("about.qualityTitle"), description: t("about.qualityDesc") },
    { icon: Headphones, title: t("about.adviceTitle"), description: t("about.adviceDesc") },
    { icon: Truck, title: t("about.logisticsTitle"), description: t("about.logisticsDesc") },
    { icon: Shield, title: t("about.satisfactionTitle"), description: t("about.satisfactionDesc") },
    { icon: Award, title: t("about.experiencedTitle"), description: t("about.experiencedDesc") },
  ];

  return (
    <div className="pt-20 lg:pt-24">
      <section className="relative py-20 lg:py-32 bg-navy-800 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={ABOUT_IMAGE} alt="Container storage yard" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-px bg-orange-500" />
              <span className="font-technical text-xs text-orange-400 uppercase tracking-widest">{t("about.label")}</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              {t("about.heading")}
            </h1>
            <p className="text-lg text-white/70 leading-relaxed">
              {t("about.description")}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-12 h-px bg-orange-500" />
                <span className="font-technical text-xs text-orange-500 uppercase tracking-widest">{t("about.storyLabel")}</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-navy-800 mb-6">
                {t("about.storyHeading")}
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>{t("about.storyP1")}</p>
                <p>{t("about.storyP2")}</p>
                <p>{t("about.storyP3")}</p>
              </div>
              <Link
                to="/containers"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-navy-800 text-white font-semibold rounded-lg hover:bg-navy-700 transition-colors"
              >
                {t("about.browseContainers")} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <img src={ABOUT_IMAGE} alt="STF Container storage yard" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-12 h-px bg-orange-500" />
              <span className="font-technical text-xs text-orange-500 uppercase tracking-widest">{t("about.whatSetsApart")}</span>
              <span className="w-12 h-px bg-orange-500" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-navy-800 mb-4">
              {t("about.whyChoose")}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {highlights.map((item) => (
              <div key={item.title} className="bg-white p-8 rounded-lg border border-gray-100">
                <div className="w-12 h-12 bg-navy-50 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-navy-800" />
                </div>
                <h3 className="font-semibold text-navy-800 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-navy-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {t("about.ctaHeading")}
          </h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            {t("about.ctaDesc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/containers" className="px-8 py-4 bg-orange-500 text-navy-950 font-semibold rounded-lg hover:bg-orange-400 transition-colors">
              {t("about.browse")}
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