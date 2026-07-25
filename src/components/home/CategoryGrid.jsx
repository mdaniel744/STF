import React from "react";
import Link from "@/components/LocalizedLink";
import { ArrowRight, Box, ArrowUpFromLine, DoorOpen, Building2, Archive, Snowflake } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function CategoryGrid() {
  const { t } = useLanguage();

  const categories = [
    { name: t("categoryGrid.standard"), description: t("categoryGrid.standardDesc"), icon: Box, image: "https://media.base44.com/images/public/6a5515cc1c02a52a32b121f4/cdb7cd47c_generated_21c9ca15.png", type: "Standard" },
    { name: t("categoryGrid.highCube"), description: t("categoryGrid.highCubeDesc"), icon: ArrowUpFromLine, image: "https://media.base44.com/images/public/6a5515cc1c02a52a32b121f4/b65c35fc9_generated_015e1e31.png", type: "High Cube" },
    { name: t("categoryGrid.openSide"), description: t("categoryGrid.openSideDesc"), icon: DoorOpen, image: "https://media.base44.com/images/public/6a5515cc1c02a52a32b121f4/fb9978839_generated_d67c1126.png", type: "Open Side" },
    { name: t("categoryGrid.office"), description: t("categoryGrid.officeDesc"), icon: Building2, image: "https://media.base44.com/images/public/6a5515cc1c02a52a32b121f4/5a0994820_generated_aae98e91.png", type: "Office" },
    { name: t("categoryGrid.storage"), description: t("categoryGrid.storageDesc"), icon: Archive, image: "https://media.base44.com/images/public/6a5515cc1c02a52a32b121f4/c0ffab549_generated_87a21f38.png", type: "Storage" },
    { name: t("categoryGrid.refrigerated"), description: t("categoryGrid.refrigeratedDesc"), icon: Snowflake, image: "https://media.base44.com/images/public/6a5515cc1c02a52a32b121f4/2e4a61026_generated_63092ea0.png", type: "Refrigerated" },
  ];

  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-12 h-px bg-orange-500" />
          <span className="font-technical text-xs text-orange-500 uppercase tracking-widest">{t("categoryGrid.label")}</span>
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-navy-800 mb-4">{t("categoryGrid.heading")}</h2>
        <p className="text-gray-500 max-w-2xl mb-12">{t("categoryGrid.description")}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/containers?type=${encodeURIComponent(cat.type)}`}
              className="group relative overflow-hidden rounded-lg aspect-[4/3]"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/45" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <cat.icon className="w-6 h-6 text-orange-400 mb-2" />
                <h3 className="text-xl font-bold text-white mb-1">{cat.name}</h3>
                <p className="text-sm text-white/60 mb-3">{cat.description}</p>
                <span className="flex items-center gap-1 text-sm font-medium text-orange-400 group-hover:gap-2 transition-all">
                  {t("categoryGrid.viewContainers")} <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}