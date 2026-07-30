import React, { useState } from "react";
import Link from "@/components/LocalizedLink";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { localizeDefaultProduct } from "@/data/default-products";

const conditionColors = {
  "New": "bg-green-100 text-green-800",
  "Used": "bg-gray-100 text-gray-700",
  "One Trip": "bg-blue-100 text-blue-800",
  "WWT": "bg-amber-100 text-amber-800",
};

const availabilityColors = {
  "In Stock": "bg-green-500",
  "Out of Stock": "bg-red-500",
  "Pre-Order": "bg-amber-500",
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

function displayLabel(language, group, value) {
  return localizedLabels[language]?.[group]?.[value] || value;
}

export default function ProductCard({ product }) {
  const { t, language } = useLanguage();
  const displayProduct = localizeDefaultProduct(product, language);
  const images = [displayProduct.main_image, ...(displayProduct.gallery_images || [])].filter(Boolean);
  const [imgIndex, setImgIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(displayProduct.color);
  const colors = displayProduct.available_colors?.length ? displayProduct.available_colors : (displayProduct.color ? [displayProduct.color] : []);

  const nextImg = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIndex((i) => (i + 1) % images.length);
  };
  const prevImg = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIndex((i) => (i - 1 + images.length) % images.length);
  };

  return (
    <div className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:border-navy-200 transition-all duration-300 flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <Link to={`/containers/${displayProduct.slug || displayProduct.id}`} className="block w-full h-full">
          {images.length > 0 ? (
            <img
              src={images[imgIndex]}
              alt={displayProduct.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <span className="font-technical text-sm">{t("productCard.noImage")}</span>
            </div>
          )}
        </Link>

        {/* Carousel arrows */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label={t("productCard.previousImage")}
              onClick={prevImg}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-4 h-4 text-navy-800" />
            </button>
            <button
              type="button"
              aria-label={t("productCard.nextImage")}
              onClick={nextImg}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-4 h-4 text-navy-800" />
            </button>
            {/* Dots */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${i === imgIndex ? "bg-orange-500" : "bg-white/60"}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2 pointer-events-none">
          <Badge className={`${conditionColors[displayProduct.condition] || "bg-gray-100 text-gray-700"} text-xs font-medium border-0`}>
            {displayLabel(language, "condition", displayProduct.condition)}
          </Badge>
          {displayProduct.featured && (
            <Badge className="bg-orange-500 text-navy-950 text-xs font-medium border-0">
              {t("productCard.featured")}
            </Badge>
          )}
        </div>
        <div className="absolute top-3 right-3 pointer-events-none">
          <span className={`w-2.5 h-2.5 rounded-full inline-block ${availabilityColors[displayProduct.availability] || "bg-gray-400"}`} />
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-technical text-xs text-gray-500">{displayProduct.container_size}</span>
          <span className="text-gray-300">·</span>
          <span className="font-technical text-xs text-gray-500">{displayLabel(language, "type", displayProduct.container_type)}</span>
        </div>
        <Link to={`/containers/${displayProduct.slug || displayProduct.id}`}>
          <h3 className="font-semibold text-navy-800 mb-2 line-clamp-2 group-hover:text-navy-600 transition-colors">
            {displayProduct.name}
          </h3>
        </Link>
        {displayProduct.short_description && (
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">{displayProduct.short_description}</p>
        )}

        {/* Color swatches */}
        {colors.length > 0 && (
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-gray-400">{t("productCard.colors")}</span>
            <div className="flex gap-1.5">
              {colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-label={t("productCard.selectColor", {
                    color: displayLabel(language, "color", c),
                  })}
                  aria-pressed={selectedColor === c}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedColor(c);
                  }}
                  title={displayLabel(language, "color", c)}
                  className={`w-5 h-5 rounded-full border-2 transition-all ${selectedColor === c ? "border-orange-500 ring-1 ring-orange-500" : "border-gray-200"}`}
                  style={{ backgroundColor: colorHexMap[c] || "#ccc" }}
                />
              ))}
            </div>
          </div>
        )}

        <div className="flex items-end justify-between mt-auto pt-3 border-t border-gray-100">
          <div>
            <span className="text-2xl font-bold text-navy-800">
              €{displayProduct.price?.toLocaleString("nl-NL")}
            </span>
            <span className="text-xs text-gray-400 ml-1">{t("productCard.exclVat")}</span>
          </div>
          <Link
            to={`/containers/${displayProduct.slug || displayProduct.id}`}
            className="flex items-center gap-1 text-sm font-medium text-navy-800 hover:text-orange-500 transition-colors"
          >
            {t("productCard.details")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
