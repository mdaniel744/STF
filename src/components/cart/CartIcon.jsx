import React from "react";
import { ShoppingBag } from "lucide-react";
import Link from "@/components/LocalizedLink";
import { useCart } from "@/lib/CartContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function CartIcon() {
  const { itemCount } = useCart();
  const { t } = useLanguage();

  return (
    <Link
      to="/cart"
      aria-label={`${t("cart.title")} (${itemCount})`}
      className="relative flex h-11 w-11 touch-manipulation items-center justify-center rounded-lg border border-gray-200 text-navy-800 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
    >
      <ShoppingBag className="w-5 h-5" />
      {itemCount > 0 && (
        <span
          aria-hidden="true"
          className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-navy-950"
        >
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      )}
    </Link>
  );
}
