import React, { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function AddToCartButton({ product, quantity = 1, selectedColor = null }) {
  const { addItem } = useCart();
  const { t } = useLanguage();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addItem(product, quantity, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full flex items-center justify-center gap-2 px-6 py-4 font-semibold rounded-lg transition-colors text-lg ${
        added
          ? "bg-green-500 text-white"
          : "bg-navy-800 text-white hover:bg-navy-700"
      }`}
    >
      {added ? (
        <>
          <Check className="w-5 h-5" />
          {t("cart.addedToCart")}
        </>
      ) : (
        <>
          <ShoppingBag className="w-5 h-5" />
          {t("cart.addToCart")}
        </>
      )}
    </button>
  );
}