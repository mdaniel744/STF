"use client";

import React, { useEffect, useState } from "react";
import Link from "@/components/LocalizedLink";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { listFeaturedCategories } from "@/api/categories";
import { getCategoryIcon } from "@/lib/categoryIcons";
import { useLocalizedList } from "@/hooks/useLocalizedEntities";
import { stripHtmlToText } from "@/lib/richText";

export default function CategoryGrid() {
  const { t, language } = useLanguage();
  const [rawCategories, setRawCategories] = useState([]);

  useEffect(() => {
    listFeaturedCategories().then(setRawCategories);
  }, []);

  const categories = useLocalizedList("category", rawCategories, language, ["name", "description"]);

  if (categories.length === 0) return null;

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
          {categories.map((cat) => {
            const Icon = getCategoryIcon(cat.slug || cat.name);
            return (
              <Link
                key={cat.id}
                to={`/containers?category=${encodeURIComponent(cat.slug)}`}
                className="group relative overflow-hidden rounded-lg aspect-[4/3]"
              >
                <img
                  src={cat.image_url}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/45" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <Icon className="w-6 h-6 text-orange-400 mb-2" />
                  <h3 className="text-xl font-bold text-white mb-1">{cat.name}</h3>
                  {cat.description && <p className="text-sm text-white/60 mb-3">{stripHtmlToText(cat.description)}</p>}
                  <span className="flex items-center gap-1 text-sm font-medium text-orange-400 group-hover:gap-2 transition-all">
                    {t("categoryGrid.viewContainers")} <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
