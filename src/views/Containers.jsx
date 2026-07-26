import React, { useState, useEffect, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "@/components/LocalizedLink";
import { filterProducts, listProducts } from "@/api/products";
import { findCategoryBySlug } from "@/api/categories";
import ProductCard from "@/components/containers/ProductCard";
import SEOSection from "@/components/containers/SEOSection";
import { Search, SlidersHorizontal, X, Loader2, ChevronRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TrustBar from "@/components/shared/TrustBar";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { localizeDefaultProduct } from "@/data/default-products";
import { displayProductLabel } from "@/lib/i18n/productLabels";
import { useLocalizedList } from "@/hooks/useLocalizedEntities";

const SIZES = ["10ft", "20ft", "40ft"];
const TYPES = ["Standard", "High Cube", "Open Side", "Office", "Storage", "Refrigerated"];
const CONDITIONS = ["New", "Used", "One Trip", "WWT"];
const COLORS = ["Blue", "Grey", "Green", "White", "Red", "Brown"];

export default function Containers() {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filters = {
    size: searchParams.get("size") || "",
    type: searchParams.get("type") || "",
    condition: searchParams.get("condition") || "",
    color: searchParams.get("color") || "",
    availability: searchParams.get("availability") || "",
    sort: searchParams.get("sort") || "newest",
  };
  const categorySlug = searchParams.get("category") || "";
  const [categoryId, setCategoryId] = useState(null);
  const [categoryResolved, setCategoryResolved] = useState(!categorySlug);

  const pushParams = (params) => {
    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  const setFilter = (key, value) => {
    const p = new URLSearchParams(searchParams.toString());
    if (value) p.set(key, value);
    else p.delete(key);
    pushParams(p);
  };

  const clearFilters = () => router.push(pathname);

  const activeFilterCount = [filters.size, filters.type, filters.condition, filters.color, filters.availability, categorySlug].filter(Boolean).length;

  useEffect(() => {
    if (!categorySlug) {
      setCategoryId(null);
      setCategoryResolved(true);
      return;
    }
    setCategoryResolved(false);
    let cancelled = false;
    findCategoryBySlug(categorySlug).then((cat) => {
      if (cancelled) return;
      setCategoryId(cat?.id || null);
      setCategoryResolved(true);
    });
    return () => {
      cancelled = true;
    };
  }, [categorySlug]);

  useEffect(() => {
    if (!categoryResolved) return;

    setLoading(true);
    const query = {};
    if (filters.size) query.container_size = filters.size;
    if (filters.type) query.container_type = filters.type;
    if (filters.condition) query.condition = filters.condition;
    if (filters.color) query.color = filters.color;
    if (filters.availability) query.availability = filters.availability;
    if (categoryId) query.category_id = categoryId;

    const sortMap = { newest: "-created_date", price_asc: "price", price_desc: "-price" };
    const sortValue = sortMap[filters.sort] || "-created_date";

    const fetcher = Object.keys(query).length > 0
      ? filterProducts(query, sortValue, 100)
      : listProducts(sortValue, 100);

    fetcher.then(setProducts).catch(() => {}).finally(() => setLoading(false));
  }, [filters.size, filters.type, filters.condition, filters.color, filters.availability, filters.sort, categoryId, categoryResolved]);

  const localizedProducts = useLocalizedList("product", products, language, ["name", "short_description", "description"]);

  const filtered = useMemo(() => {
    if (!search.trim()) return localizedProducts;
    const q = search.toLowerCase();
    return localizedProducts.filter((p) => {
      const displayProduct = localizeDefaultProduct(p, language);
      const values = [
        displayProduct.name,
        displayProduct.short_description,
        displayProduct.container_size,
        displayProduct.container_type,
        displayProduct.condition,
        displayProduct.color,
        displayProductLabel(language, "type", displayProduct.container_type),
        displayProductLabel(language, "condition", displayProduct.condition),
        displayProductLabel(language, "color", displayProduct.color),
      ];

      return values.some((value) => value?.toLowerCase().includes(q));
    });
  }, [localizedProducts, search, language]);

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-gray-50">
      <TrustBar />
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-navy-800 transition-colors">{t("containers.home")}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-navy-800 font-medium">{t("containers.containers")}</span>
        </nav>
      </div>

      {/* Header */}
      <div className="bg-navy-800 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">{t("containers.heading")}</h1>
          <p className="text-white/60">{t("containers.description")}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Command Bar */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={t("containers.searchPlaceholder")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-navy-400 focus:ring-1 focus:ring-navy-400"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`lg:hidden flex items-center gap-2 px-4 py-2.5 border rounded-lg text-sm font-medium transition-colors ${
                  showFilters ? "border-navy-800 bg-navy-800 text-white" : "border-gray-200 text-gray-700"
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                {t("containers.filters")} {activeFilterCount > 0 && `(${activeFilterCount})`}
              </button>

              {/* Desktop Filters */}
              <div className="hidden lg:flex items-center gap-3">
                <FilterSelect label={t("containers.size")} allLabel={t("containers.allSizes")} value={filters.size} options={SIZES} onChange={(v) => setFilter("size", v)} />
                <FilterSelect label={t("containers.type")} allLabel={t("containers.allTypes")} value={filters.type} options={TYPES} labelGroup="type" language={language} onChange={(v) => setFilter("type", v)} />
                <FilterSelect label={t("containers.condition")} allLabel={t("containers.allConditions")} value={filters.condition} options={CONDITIONS} labelGroup="condition" language={language} onChange={(v) => setFilter("condition", v)} />
                <FilterSelect label={t("containers.color")} allLabel={t("containers.allColors")} value={filters.color} options={COLORS} labelGroup="color" language={language} onChange={(v) => setFilter("color", v)} />
              </div>

              <Select value={filters.sort} onValueChange={(v) => setFilter("sort", v)}>
                <SelectTrigger className="w-40 text-sm">
                  <SelectValue placeholder={t("containers.sortBy")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">{t("containers.newest")}</SelectItem>
                  <SelectItem value="price_asc">{t("containers.priceAsc")}</SelectItem>
                  <SelectItem value="price_desc">{t("containers.priceDesc")}</SelectItem>
                </SelectContent>
              </Select>

              {activeFilterCount > 0 && (
                <button onClick={clearFilters} className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700">
                  <X className="w-4 h-4" /> {t("containers.clear")}
                </button>
              )}
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-100">
              <FilterSelect label={t("containers.size")} allLabel={t("containers.allSizes")} value={filters.size} options={SIZES} onChange={(v) => setFilter("size", v)} />
              <FilterSelect label={t("containers.type")} allLabel={t("containers.allTypes")} value={filters.type} options={TYPES} labelGroup="type" language={language} onChange={(v) => setFilter("type", v)} />
              <FilterSelect label={t("containers.condition")} allLabel={t("containers.allConditions")} value={filters.condition} options={CONDITIONS} labelGroup="condition" language={language} onChange={(v) => setFilter("condition", v)} />
              <FilterSelect label={t("containers.color")} allLabel={t("containers.allColors")} value={filters.color} options={COLORS} labelGroup="color" language={language} onChange={(v) => setFilter("color", v)} />
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-4 text-sm text-gray-500">
          {loading ? t("containers.loading") : filtered.length === 1 ? t("containers.oneResult") : t("containers.resultsFound", { count: filtered.length })}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-navy-800" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg mb-4">{t("containers.noResults")}</p>
            <button onClick={clearFilters} className="text-navy-800 font-medium hover:text-orange-500 transition-colors">
              {t("containers.clearAll")}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <SEOSection type={filters.type} size={filters.size} />
      </div>
    </div>
  );
}

function FilterSelect({ label, allLabel, value, options, labelGroup, language, onChange }) {
  return (
    <Select value={value || "all"} onValueChange={(v) => onChange(v === "all" ? "" : v)}>
      <SelectTrigger className="w-full lg:w-44 text-sm">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">{allLabel}</SelectItem>
        {options.map((opt) => (
          <SelectItem key={opt} value={opt}>
            {labelGroup ? displayProductLabel(language, labelGroup, opt) : opt}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
