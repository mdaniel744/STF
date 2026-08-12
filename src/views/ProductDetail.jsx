import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "@/components/LocalizedLink";
import { base44 } from "@/api/base44Client";
import { filterProducts, findProductBySlugOrId, hasConfiguredBase44App } from "@/api/products";
import { localizeDefaultProduct } from "@/data/default-products";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import QuoteForm from "@/components/containers/QuoteForm";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useTranslations } from "@/hooks/useTranslations";
import AddToCartButton from "@/components/cart/AddToCartButton";
import ProductCard from "@/components/containers/ProductCard";
import DimensionDiagram from "@/components/containers/DimensionDiagram";
import TrustBar from "@/components/shared/TrustBar";
import RichText from "@/components/shared/RichText";
import { stripHtmlToText } from "@/lib/richText";
import { useLocalizedList } from "@/hooks/useLocalizedEntities";
import {
  ChevronRight, Loader2, Truck, Shield, MapPin,
  Minus, Plus, Info, Calculator, ChevronLeft, ChevronRight as ChevronRightIcon,
} from "lucide-react";

const conditionColors = {
  "New": "bg-green-100 text-green-800",
  "Used": "bg-gray-100 text-gray-700",
  "One Trip": "bg-blue-100 text-blue-800",
  "WWT": "bg-amber-100 text-amber-800",
};

const colorHexMap = {
  "Blue": "#1e4478",
  "Grey": "#9ca3af",
  "Green": "#4a7c3a",
  "White": "#f3f4f6",
  "Red": "#b91c1c",
  "Brown": "#8b5e3c",
};

const localizedLabels = {
  nl: {
    condition: {
      New: "Nieuw",
      Used: "Gebruikt",
      "One Trip": "One Trip",
      WWT: "Wind- en waterdicht",
    },
    availability: {
      "In Stock": "Op voorraad",
      "Out of Stock": "Niet op voorraad",
      "On Request": "Op aanvraag",
      "Pre-Order": "Pre-order",
    },
    color: {
      Blue: "Blauw",
      Grey: "Grijs",
      Green: "Groen",
      White: "Wit",
      Red: "Rood",
      Brown: "Bruin",
    },
    type: {
      Standard: "Standaard",
      "High Cube": "High Cube",
      "Open Side": "Open Side",
      Office: "Kantoor",
      Storage: "Opslag",
      Refrigerated: "Gekoeld",
    },
  },
  fr: {
    condition: {
      New: "Neuf",
      Used: "Occasion",
      "One Trip": "One Trip",
      WWT: "Étanche au vent et à l'eau",
    },
    availability: {
      "In Stock": "En stock",
      "Out of Stock": "Rupture de stock",
      "On Request": "Sur demande",
      "Pre-Order": "Précommande",
    },
    color: {
      Blue: "Bleu",
      Grey: "Gris",
      Green: "Vert",
      White: "Blanc",
      Red: "Rouge",
      Brown: "Marron",
    },
    type: {
      Standard: "Standard",
      "High Cube": "High Cube",
      "Open Side": "Ouverture latérale",
      Office: "Bureau",
      Storage: "Stockage",
      Refrigerated: "Réfrigéré",
    },
  },
  de: {
    condition: {
      New: "Neu",
      Used: "Gebraucht",
      "One Trip": "One Trip",
      WWT: "Wind- & Wasserdicht",
    },
    availability: {
      "In Stock": "Auf Lager",
      "Out of Stock": "Nicht auf Lager",
      "On Request": "Auf Anfrage",
    },
    color: {
      Blue: "Blau",
      Grey: "Grau",
      Green: "Grün",
      White: "Weiß",
      Red: "Rot",
      Brown: "Braun",
    },
    type: {
      Standard: "Standard",
      "High Cube": "High Cube",
      "Open Side": "Open Side",
      Office: "Büro",
      Storage: "Lager",
      Refrigerated: "Kühlcontainer",
    },
  },
  es: {
    condition: {
      New: "Nuevo",
      Used: "Usado",
      "One Trip": "One Trip",
      WWT: "Hermético al viento y al agua",
    },
    availability: {
      "In Stock": "En stock",
      "Out of Stock": "Sin stock",
      "On Request": "A pedido",
      "Pre-Order": "Prepedido",
    },
    color: {
      Blue: "Azul",
      Grey: "Gris",
      Green: "Verde",
      White: "Blanco",
      Red: "Rojo",
      Brown: "Marrón",
    },
    type: {
      Standard: "Estándar",
      "High Cube": "High Cube",
      "Open Side": "Apertura lateral",
      Office: "Oficina",
      Storage: "Almacenamiento",
      Refrigerated: "Refrigerado",
    },
  },
};

const VAT_RATE = 0.21;
const MAX_ONLINE = 6;

const typeToFaqCategory = {
  "Standard": "Container Sizes",
  "High Cube": "High Cube",
  "Open Side": "Open Side",
  "Refrigerated": "Refrigerated",
  "Office": "Container Sizes",
  "Storage": "Container Sizes",
};

function calculateShipping(postalCode) {
  const digits = parseInt((postalCode || "").replace(/\D/g, "").slice(0, 4));
  if (isNaN(digits) || digits < 1000 || digits > 9999) return null;
  // Bilthoven ~3723; rough distance proxy from postal code digits
  const distance = Math.abs(digits - 3723);
  const baseCost = 175;
  const cost = Math.round(baseCost + distance * 0.12);
  const days = distance > 800 ? 5 : 3;
  return { cost, days };
}

function displayLabel(language, group, value) {
  return localizedLabels[language]?.[group]?.[value] || value;
}

export default function ProductDetail({ slug: slugOverride = null }) {
  const params = useParams();
  const slug = slugOverride || params.slug;
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showQuote, setShowQuote] = useState(false);
  const [vatMode, setVatMode] = useState("excl");
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [postalCode, setPostalCode] = useState("");
  const [shippingResult, setShippingResult] = useState(null);

  const { t, language } = useLanguage();
  const fallbackLocalized = useMemo(() => localizeDefaultProduct(product, language), [product, language]);
  const overlaidList = useLocalizedList(
    "product",
    fallbackLocalized ? [fallbackLocalized] : [],
    language,
    ["name", "short_description", "description"]
  );
  const localizedProduct = overlaidList[0] || null;

  const textMap = {};
  if (localizedProduct) {
    textMap.name = localizedProduct.name;
    textMap.short_description = localizedProduct.short_description;
    textMap.description = localizedProduct.description;
    textMap.features = localizedProduct.features;
    textMap.applications = localizedProduct.applications;
    textMap.delivery_info = localizedProduct.delivery_info;
  }
  faqs.forEach((faq) => {
    textMap['q_' + faq.id] = faq.question;
    textMap['a_' + faq.id] = faq.answer;
  });
  const { translated } = useTranslations(textMap, language);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setSelectedImage(0);
    setShowQuote(false);
    setShippingResult(null);
    setPostalCode("");

    findProductBySlugOrId(slug)
      .then((found) => {
        if (cancelled) return null;
        if (!found) {
          setProduct(null);
          setRelated([]);
          setFaqs([]);
          return null;
        }

        setProduct(found);
        setSelectedColor(found.color);
        const faqCat = typeToFaqCategory[found.container_type];

        return Promise.all([
          filterProducts({ container_type: found.container_type }, "-created_date", 4),
          hasConfiguredBase44App
            ? base44.entities.FAQ.filter({ category: faqCat }, "display_order", 10).catch(() => [])
            : Promise.resolve([]),
        ]).then(([rel, f]) => {
          if (cancelled) return;
          setRelated(rel?.filter((x) => x.id !== found.id)?.slice(0, 3) || []);
          setFaqs(f || []);
        });
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  // Images don't change per language, but the gallery position (from
  // clicking through photos) shouldn't carry over when switching language -
  // always land back on the primary photo, not whatever angle was last viewed.
  useEffect(() => {
    setSelectedImage(0);
  }, [language]);

  if (loading) {
    return (
      <div className="pt-32 flex justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-navy-800" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-32 text-center min-h-screen">
        <h2 className="text-2xl font-bold text-navy-800 mb-4">{t("productDetail.notFound")}</h2>
        <Link to="/containers" className="text-orange-500 font-medium">{t("productDetail.browseAll")}</Link>
      </div>
    );
  }

  const displayProduct = localizedProduct || product;
  const photoImages = [displayProduct.main_image, ...(displayProduct.gallery_images || [])].filter(Boolean);
  const hasDiagram = displayProduct.specs_length || displayProduct.specs_width || displayProduct.specs_height;
  // Gallery: photos + dimension diagram (diagram is last, rendered as special slide)
  const galleryCount = photoImages.length + (hasDiagram ? 1 : 0);
  const isDiagramSlide = selectedImage === photoImages.length && hasDiagram;

  const priceExcl = displayProduct.price || 0;
  const priceIncl = Math.round(priceExcl * (1 + VAT_RATE));
  const displayPrice = vatMode === "excl" ? priceExcl : priceIncl;
  const totalPrice = displayPrice * quantity;
  const colors = displayProduct.available_colors?.length ? displayProduct.available_colors : (displayProduct.color ? [displayProduct.color] : []);
  const availability = displayProduct.availability || "In Stock";

  const specs = [
    { label: t("productDetail.specLength"), value: displayProduct.specs_length },
    { label: t("productDetail.specWidth"), value: displayProduct.specs_width },
    { label: t("productDetail.specHeight"), value: displayProduct.specs_height },
    { label: t("productDetail.specWeight"), value: displayProduct.specs_weight },
    { label: t("productDetail.specVolume"), value: displayProduct.specs_volume },
    { label: t("productDetail.specPayload"), value: displayProduct.specs_payload },
    { label: t("productDetail.specFloorType"), value: displayProduct.specs_floor_type },
    { label: t("productDetail.specDoorType"), value: displayProduct.specs_door_type },
  ].filter((s) => s.value);

  const handleShippingCalc = () => {
    const result = calculateShipping(postalCode);
    setShippingResult(result);
  };

  const navImage = (dir) => {
    setSelectedImage((i) => (i + dir + galleryCount) % galleryCount);
  };

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-white">
      <TrustBar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-navy-800">{t("productDetail.home")}</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/containers" className="hover:text-navy-800">{t("productDetail.containers")}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-navy-800 font-medium line-clamp-1">{translated.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Gallery — 3 cols */}
          <div className="lg:col-span-3">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 mb-4">
              {isDiagramSlide ? (
                <DimensionDiagram product={displayProduct} />
              ) : photoImages.length > 0 ? (
                <img
                  src={photoImages[selectedImage]}
                  alt={displayProduct.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 font-technical">
                  {t("productDetail.noImage")}
                </div>
              )}

              {galleryCount > 1 && (
                <>
                  <button
                    type="button"
                    aria-label={t("productDetail.previousImage")}
                    onClick={() => navImage(-1)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-sm transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-navy-800" />
                  </button>
                  <button
                    type="button"
                    aria-label={t("productDetail.nextImage")}
                    onClick={() => navImage(1)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-sm transition-colors"
                  >
                    <ChevronRightIcon className="w-5 h-5 text-navy-800" />
                  </button>
                </>
              )}
            </div>

            {galleryCount > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {photoImages.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={t("productDetail.selectImage", { number: i + 1 })}
                    aria-pressed={i === selectedImage}
                    onClick={() => setSelectedImage(i)}
                    className={`flex-shrink-0 w-20 h-20 rounded overflow-hidden border-2 transition-colors ${
                      i === selectedImage ? "border-navy-800" : "border-transparent"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
                {hasDiagram && (
                  <button
                    type="button"
                    aria-label={t("productDetail.dimensionDiagram")}
                    aria-pressed={isDiagramSlide}
                    onClick={() => setSelectedImage(photoImages.length)}
                    className={`flex-shrink-0 w-20 h-20 rounded overflow-hidden border-2 flex items-center justify-center bg-gray-50 transition-colors ${
                      isDiagramSlide ? "border-navy-800" : "border-transparent"
                    }`}
                  >
                    <span className="font-technical text-[10px] text-navy-600 text-center px-1">{t("productDetail.dims")}</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Info — 2 cols */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center gap-2 mb-3">
                <Badge className={`${conditionColors[displayProduct.condition]} text-xs font-medium border-0`}>
                  {displayLabel(language, "condition", displayProduct.condition)}
                </Badge>
                <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                  availability === "In Stock" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}>
                  {displayLabel(language, "availability", availability)}
                </span>
              </div>

              <div className="font-technical text-xs text-gray-500 mb-2">
                {displayProduct.container_size} · {displayLabel(language, "type", displayProduct.container_type)}
              </div>

              <h1 className="text-2xl lg:text-3xl font-bold text-navy-800 mb-4">{translated.name}</h1>

              {/* Price with VAT toggle */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold text-navy-800">
                    €{displayPrice.toLocaleString("nl-NL")}
                  </span>
                  <span className="text-sm text-gray-400">
                    {vatMode === "excl" ? t("productDetail.exclVat") : t("productDetail.inclVat")}
                  </span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  <button
                    type="button"
                    aria-pressed={vatMode === "excl"}
                    onClick={() => setVatMode("excl")}
                    className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                      vatMode === "excl" ? "bg-orange-500 text-navy-950" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {t("productDetail.exclVat")}
                  </button>
                  <button
                    type="button"
                    aria-pressed={vatMode === "incl"}
                    onClick={() => setVatMode("incl")}
                    className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                      vatMode === "incl" ? "bg-orange-500 text-navy-950" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {t("productDetail.inclVat")}
                  </button>
                </div>
                {quantity > 1 && (
                  <div className="text-sm text-gray-500">
                    {t("productDetail.total")} <span className="font-semibold text-navy-800">€{totalPrice.toLocaleString("nl-NL")}</span> ({vatMode === "excl" ? t("productDetail.exclVat") : t("productDetail.inclVat")})
                  </div>
                )}
              </div>

              {translated.short_description && (
                <p className="text-gray-600 mb-6 leading-relaxed">{stripHtmlToText(translated.short_description)}</p>
              )}

              {/* Color selector */}
              {colors.length > 0 && (
                <div className="mb-6">
                  <div className="text-sm font-medium text-gray-700 mb-2">
                    {t("productDetail.color")} <span className="text-navy-800">{displayLabel(language, "color", selectedColor)}</span>
                  </div>
                  <div className="flex gap-2">
                    {colors.map((c) => (
                      <button
                        key={c}
                        type="button"
                        aria-label={t("productDetail.selectColor", {
                          color: displayLabel(language, "color", c),
                        })}
                        aria-pressed={selectedColor === c}
                        onClick={() => setSelectedColor(c)}
                        title={displayLabel(language, "color", c)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          selectedColor === c ? "border-orange-500 ring-2 ring-orange-200" : "border-gray-200"
                        }`}
                        style={{ backgroundColor: colorHexMap[c] || "#ccc" }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity stepper */}
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-700 mb-2">{t("productDetail.amount")}</div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button
                      type="button"
                      aria-label={t("productDetail.decreaseQuantity")}
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-navy-800 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-semibold text-navy-800">{quantity}</span>
                    <button
                      type="button"
                      aria-label={t("productDetail.increaseQuantity")}
                      onClick={() => setQuantity((q) => Math.min(MAX_ONLINE, q + 1))}
                      className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-navy-800 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  {quantity >= MAX_ONLINE && (
                    <span className="text-xs text-amber-600 font-medium">{t("productDetail.maxPerType", { max: MAX_ONLINE })}</span>
                  )}
                </div>
                {quantity >= MAX_ONLINE && (
                  <p className="text-xs text-gray-400 mt-1">{t("productDetail.needMore", { max: MAX_ONLINE })}</p>
                )}
              </div>

              {/* Shipping calculator */}
              <div className="mb-6 bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Calculator className="w-4 h-4 text-navy-600" />
                  <span className="text-sm font-medium text-gray-700">{t("productDetail.deliveryPickup")}</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder={t("productDetail.postalPlaceholder")}
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-navy-400 focus:ring-1 focus:ring-navy-400"
                  />
                  <button
                    type="button"
                    onClick={handleShippingCalc}
                    className="px-4 py-2 bg-navy-800 text-white text-sm font-medium rounded-lg hover:bg-navy-700 transition-colors"
                  >
                    {t("productDetail.calculate")}
                  </button>
                </div>
                {shippingResult && (
                  <div className="mt-3 flex items-start gap-2 text-sm">
                    <Info className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-700">
                        {t("productDetail.deliveryCost")} <span className="font-semibold text-navy-800">€{shippingResult.cost}</span>
                      </p>
                      <p className="text-gray-500 text-xs">{t("productDetail.deliveredWithin", { days: shippingResult.days })}</p>
                    </div>
                  </div>
                )}
                {shippingResult === null && postalCode && postalCode.length >= 4 && (
                  <p className="mt-2 text-xs text-gray-400">{t("productDetail.enterValidPostal")}</p>
                )}
              </div>

              {/* Add to Cart */}
              <AddToCartButton
                product={displayProduct}
                quantity={quantity}
                selectedColor={selectedColor}
              />

              {/* CTA */}
              <button
                type="button"
                aria-expanded={showQuote}
                onClick={() => setShowQuote(!showQuote)}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-orange-500 text-navy-950 font-semibold rounded-lg hover:bg-orange-400 transition-colors text-lg mb-4 mt-4"
              >
                {t("productDetail.requestQuote")}{quantity > 1 ? ` (${quantity})` : ""}
              </button>

              {showQuote && (
                <div className="border border-gray-200 rounded-lg p-6 mt-4 mb-6">
                  <h3 className="font-semibold text-navy-800 mb-4">{t("productDetail.requestQuoteFor", { name: translated.name })}</h3>
                  <QuoteForm
                    productId={displayProduct.id}
                    productName={displayProduct.name}
                    initialQuantity={quantity}
                  />
                </div>
              )}

              <div className="space-y-3 py-6 border-t border-gray-100">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Truck className="w-5 h-5 text-navy-600" />
                  <span>{t("productDetail.nationwideDelivery")}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield className="w-5 h-5 text-navy-600" />
                  <span>{t("productDetail.qualityInspected")}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <MapPin className="w-5 h-5 text-navy-600" />
                  <span>{t("productDetail.pickupBilthoven")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specs, Description, Features below */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {specs.length > 0 && (
            <div className="lg:col-span-1">
              <h2 className="text-xl font-bold text-navy-800 mb-4">{t("productDetail.techSpecs")}</h2>
              <div className="bg-gray-50 rounded-lg overflow-hidden">
                {specs.map((spec, i) => (
                  <div key={spec.label} className={`flex justify-between px-4 py-3 text-sm ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                    <span className="text-gray-500">{spec.label}</span>
                    <span className="font-technical text-navy-800">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className={specs.length > 0 ? "lg:col-span-2" : "lg:col-span-3"}>
            {translated.description && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-navy-800 mb-4">{t("productDetail.description")}</h2>
                <RichText html={translated.description} />
              </div>
            )}
            {translated.features && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-navy-800 mb-4">{t("productDetail.features")}</h2>
                <div className="text-gray-600 leading-relaxed whitespace-pre-line">{translated.features}</div>
              </div>
            )}
            {translated.applications && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-navy-800 mb-4">{t("productDetail.applications")}</h2>
                <div className="text-gray-600 leading-relaxed whitespace-pre-line">{translated.applications}</div>
              </div>
            )}
            {translated.delivery_info && (
              <div>
                <h2 className="text-xl font-bold text-navy-800 mb-4">{t("productDetail.deliveryInfo")}</h2>
                <div className="text-gray-600 leading-relaxed whitespace-pre-line">{translated.delivery_info}</div>
              </div>
            )}
          </div>
        </div>

        {/* Inline FAQ */}
        {faqs.length > 0 && (
          <div className="mt-12 pt-12 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-navy-800 mb-6">{t("productDetail.faq")}</h2>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={faq.id || i} value={`item-${i}`} className="border border-gray-200 rounded-lg px-4">
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
        )}

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16 pt-12 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-navy-800 mb-8">{t("productDetail.related")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
