import React, { useState, useEffect } from "react";
import Link from "@/components/LocalizedLink";
import { filterProducts } from "@/api/products";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import ProductCard from "@/components/containers/ProductCard";
import { ArrowRight, Loader2 } from "lucide-react";

export default function FeaturedProducts() {
  const { t } = useLanguage();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    filterProducts({ featured: true }, "-created_date", 6)
      .then(setProducts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-navy-800" />
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-12 h-px bg-orange-500" />
              <span className="font-technical text-xs text-orange-500 uppercase tracking-widest">{t("featured.label")}</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-navy-800">{t("featured.heading")}</h2>
          </div>
          <Link
            to="/containers"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-navy-800 hover:text-orange-500 transition-colors"
          >
            {t("featured.viewAll")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="sm:hidden mt-8 text-center">
          <Link
            to="/containers"
            className="inline-flex items-center gap-2 px-6 py-3 bg-navy-800 text-white rounded font-medium"
          >
            {t("featured.viewAll")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
