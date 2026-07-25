import React from "react";
import Link from "@/components/LocalizedLink";
import { ArrowRight, Ruler } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function SizeCards() {
  const { t } = useLanguage();

  const sizes = [
    {
      size: "10ft",
      dimensions: "2.99m × 2.44m × 2.59m",
      volume: "15.9 m³",
      ideal: t("sizeCards.ideal10"),
    },
    {
      size: "20ft",
      dimensions: "6.06m × 2.44m × 2.59m",
      volume: "33.2 m³",
      ideal: t("sizeCards.ideal20"),
    },
    {
      size: "40ft",
      dimensions: "12.19m × 2.44m × 2.59m",
      volume: "67.7 m³",
      ideal: t("sizeCards.ideal40"),
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-12 h-px bg-orange-500" />
          <span className="font-technical text-xs text-orange-500 uppercase tracking-widest">{t("sizeCards.label")}</span>
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-navy-800 mb-4">{t("sizeCards.heading")}</h2>
        <p className="text-gray-500 max-w-2xl mb-12">{t("sizeCards.description")}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sizes.map((item) => (
            <Link
              key={item.size}
              to={`/containers?size=${encodeURIComponent(item.size)}`}
              className="group relative bg-gray-50 border border-gray-200 rounded-lg p-8 hover:border-navy-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-5xl font-bold text-navy-800 group-hover:text-orange-500 transition-colors">
                  {item.size}
                </span>
                <Ruler className="w-6 h-6 text-gray-400 group-hover:text-navy-600 transition-colors" />
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{t("sizeCards.dimensions")}</span>
                  <span className="font-technical text-navy-800">{item.dimensions}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{t("sizeCards.volume")}</span>
                  <span className="font-technical text-navy-800">{item.volume}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{t("sizeCards.idealFor")}</span>
                  <span className="text-navy-800">{item.ideal}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-navy-800 group-hover:text-orange-500 transition-colors">
                {t("sizeCards.view", { size: item.size })} <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}