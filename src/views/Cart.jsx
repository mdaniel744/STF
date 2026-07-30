import React from "react";
import Link from "@/components/LocalizedLink";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { localizeCartItem } from "@/lib/i18n/cartDisplay";

export default function Cart() {
  const { items, updateQuantity, removeItem, subtotal, taxAmount, taxRate, total, itemCount } = useCart();
  const { t, language } = useLanguage();

  const colorHexMap = {
    Blue: "#1e4478",
    Grey: "#9ca3af",
    Green: "#4a7c3a",
    White: "#f3f4f6",
    Red: "#b91c1c",
    Brown: "#8b5e3c",
  };

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-gray-50">
      <section className="py-12 lg:py-16 bg-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white">
            {t("cart.title")}
          </h1>
          <p className="text-white/60 mt-2">
            {itemCount > 0
              ? `${itemCount} ${itemCount === 1 ? t("cart.item") : t("cart.items")}`
              : t("cart.empty")}
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-6" />
              <h2 className="text-xl font-semibold text-navy-800 mb-2">{t("cart.empty")}</h2>
              <p className="text-gray-500 mb-8">{t("cart.emptyDesc")}</p>
              <Link
                to="/containers"
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-navy-950 font-semibold rounded-lg hover:bg-orange-400 transition-colors"
              >
                {t("cart.continueShopping")} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => {
                  const displayItem = localizeCartItem(item, language);

                  return (
                  <div
                    key={item.cartKey}
                    className="bg-white rounded-lg border border-gray-200 p-4 flex gap-4"
                  >
                    <Link
                      to={`/containers/${displayItem.displaySlug}`}
                      className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-gray-100"
                    >
                      {displayItem.displayImage ? (
                        <img
                          src={displayItem.displayImage}
                          alt={displayItem.displayName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <ShoppingBag className="w-8 h-8" />
                        </div>
                      )}
                    </Link>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <Link
                            to={`/containers/${displayItem.displaySlug}`}
                            className="font-semibold text-navy-800 hover:text-orange-500 transition-colors line-clamp-1"
                          >
                            {displayItem.displayName}
                          </Link>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <span className="font-technical text-xs text-gray-500">
                              {item.container_size} · {displayItem.displayType}
                            </span>
                            <span className="text-gray-300">·</span>
                            <span className="text-xs text-gray-500">{displayItem.displayCondition}</span>
                            {item.color && (
                              <>
                                <span className="text-gray-300">·</span>
                                <span className="flex items-center gap-1 text-xs text-gray-500">
                                  <span
                                    className="w-3 h-3 rounded-full border border-gray-200"
                                    style={{ backgroundColor: colorHexMap[item.color] || "#ccc" }}
                                  />
                                  {displayItem.displayColor}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        <button
                          type="button"
                          aria-label={t("cart.removeItem", { name: displayItem.displayName })}
                          onClick={() => removeItem(item.cartKey)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity stepper */}
                        <div className="flex items-center border border-gray-200 rounded-lg">
                          <button
                            type="button"
                            aria-label={t("cart.decreaseQuantity")}
                            onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-navy-800 transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-10 text-center text-sm font-semibold text-navy-800">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            aria-label={t("cart.increaseQuantity")}
                            onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-navy-800 transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="text-lg font-bold text-navy-800">
                            €{(item.price * item.quantity).toLocaleString("nl-NL")}
                          </div>
                          <div className="text-xs text-gray-400">
                            €{item.price.toLocaleString("nl-NL")} {t("cart.perUnit")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  );
                })}

                <Link
                  to="/containers"
                  className="inline-flex items-center gap-2 text-sm font-medium text-navy-800 hover:text-orange-500 transition-colors"
                >
                  ← {t("cart.continueShopping")}
                </Link>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-28">
                  <h2 className="font-bold text-navy-800 mb-4 text-lg">{t("cart.orderSummary")}</h2>

                  <div className="space-y-3 pb-4 border-b border-gray-100">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">{t("cart.subtotal")} ({t("cart.exclVat")})</span>
                      <span className="font-medium text-navy-800">
                        €{subtotal.toLocaleString("nl-NL")}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">
                        {t("cart.vat")} ({(taxRate * 100).toFixed(0)}%)
                      </span>
                      <span className="font-medium text-navy-800">
                        €{taxAmount.toLocaleString("nl-NL", { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-baseline py-4">
                    <span className="font-bold text-navy-800">{t("cart.total")}</span>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-navy-800">
                        €{total.toLocaleString("nl-NL", { minimumFractionDigits: 2 })}
                      </span>
                      <div className="text-xs text-gray-400">{t("cart.inclVat")}</div>
                    </div>
                  </div>

                  <Link
                    to="/checkout"
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-orange-500 text-navy-950 font-semibold rounded-lg hover:bg-orange-400 transition-colors text-lg"
                  >
                    {t("cart.proceedToCheckout")} <ArrowRight className="w-5 h-5" />
                  </Link>

                  <p className="text-xs text-gray-400 mt-3 text-center">
                    {t("cart.securePayment")}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
