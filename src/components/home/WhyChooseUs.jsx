import React from "react";
import { DollarSign, Shield, Truck, Headphones, Package, Award } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function WhyChooseUs() {
  const { t } = useLanguage();

  const reasons = [
    { icon: DollarSign, title: t("whyChooseUs.pricing"), description: t("whyChooseUs.pricingDesc") },
    { icon: Shield, title: t("whyChooseUs.quality"), description: t("whyChooseUs.qualityDesc") },
    { icon: Truck, title: t("whyChooseUs.delivery"), description: t("whyChooseUs.deliveryDesc") },
    { icon: Headphones, title: t("whyChooseUs.support"), description: t("whyChooseUs.supportDesc") },
    { icon: Package, title: t("whyChooseUs.stock"), description: t("whyChooseUs.stockDesc") },
    { icon: Award, title: t("whyChooseUs.experience"), description: t("whyChooseUs.experienceDesc") },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-12 h-px bg-orange-500" />
            <span className="font-technical text-xs text-orange-500 uppercase tracking-widest">{t("whyChooseUs.label")}</span>
            <span className="w-12 h-px bg-orange-500" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-navy-800 mb-4">
            {t("whyChooseUs.heading")}
          </h2>
          <p className="text-gray-500">
            {t("whyChooseUs.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((item) => (
            <div key={item.title} className="group p-6 rounded-lg border border-gray-100 hover:border-navy-200 hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 bg-navy-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-navy-800 transition-colors">
                <item.icon className="w-6 h-6 text-navy-800 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-semibold text-navy-800 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}