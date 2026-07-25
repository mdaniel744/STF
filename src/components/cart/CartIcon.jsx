import React from "react";
import { ShoppingBag } from "lucide-react";
import Link from "@/components/LocalizedLink";
import { useCart } from "@/lib/CartContext";

export default function CartIcon() {
  const { itemCount } = useCart();

  return (
    <Link
      to="/cart"
      className="relative flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 text-navy-800 hover:bg-gray-50 transition-colors"
    >
      <ShoppingBag className="w-5 h-5" />
      {itemCount > 0 && (
        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-orange-500 text-navy-950 text-xs font-bold rounded-full flex items-center justify-center">
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      )}
    </Link>
  );
}