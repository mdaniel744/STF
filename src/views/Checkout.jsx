import React, { useEffect, useState } from "react";
import Link from "@/components/LocalizedLink";
import { useCart } from "@/lib/CartContext";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { localizeCartItem } from "@/lib/i18n/cartDisplay";
import { Loader2, CheckCircle2, ArrowRight, Copy, Landmark } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const BANK_DETAILS = {
  iban: "NL24 INGB 0001 2345 67",
  bic: "INGBNL2A",
  accountHolder: "STF Container B.V.",
  city: "Bilthoven",
};

const countryByLanguage = {
  en: "Netherlands",
  nl: "Nederland",
  de: "Niederlande",
  fr: "Pays-Bas",
  es: "Países Bajos",
};

export default function Checkout() {
  const { items, subtotal, taxAmount, taxRate, total, clearCart } = useCart();
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const defaultCountry = countryByLanguage[language] || countryByLanguage.nl;
  const [submitting, setSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [countryTouched, setCountryTouched] = useState(false);
  const [form, setForm] = useState({
    customer_name: "",
    company: "",
    email: "",
    telephone: "",
    country: defaultCountry,
    delivery_address: "",
    postal_code: "",
    city: "",
    notes: "",
  });

  const update = (key, value) => setForm((p) => ({ ...p, [key]: value }));

  useEffect(() => {
    if (!countryTouched) {
      setForm((p) => (p.country === defaultCountry ? p : { ...p, country: defaultCountry }));
    }
  }, [countryTouched, defaultCountry]);

  const generateOrderNumber = () => {
    const date = new Date();
    const ymd = date.toISOString().slice(0, 10).replace(/-/g, "");
    const random = Math.floor(Math.random() * 9000 + 1000);
    return `STF-${ymd}-${random}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const orderNumber = generateOrderNumber();
      const orderItems = items.map((i) => ({
        product_id: i.product_id,
        product_name: i.product_name,
        slug: i.slug,
        price: i.price,
        quantity: i.quantity,
        color: i.color,
        container_size: i.container_size,
        container_type: i.container_type,
        condition: i.condition,
        line_total: i.price * i.quantity,
      }));

      const order = await base44.entities.Order.create({
        order_number: orderNumber,
        ...form,
        items: orderItems,
        subtotal,
        tax_rate: taxRate,
        tax_amount: taxAmount,
        total,
        currency: "EUR",
        payment_method: "Bank Transfer",
        payment_status: "Pending",
        order_status: "New",
        notes: form.notes,
      });

      setCompletedOrder({
        orderNumber,
        orderId: order.id,
        total,
      });
      clearCart();
    } catch {
      toast({
        title: t("checkout.errorTitle"),
        description: t("checkout.errorDesc"),
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast({ title: t("checkout.copied") });
  };

  // Confirmation screen
  if (completedOrder) {
    return (
      <div className="pt-20 lg:pt-24 min-h-screen bg-gray-50">
        <SEOHead title={`${t("checkout.orderConfirmed")} — STF Container B.V.`} description={t("checkout.orderConfirmed")} />
        <section className="py-16 lg:py-24">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center mb-6">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-2xl lg:text-3xl font-bold text-navy-800 mb-2">
                {t("checkout.orderConfirmed")}
              </h1>
              <p className="text-gray-500 mb-6">{t("checkout.orderConfirmedDesc")}</p>

              <div className="bg-navy-50 rounded-lg p-4 mb-6">
                <div className="text-sm text-gray-500 mb-1">{t("checkout.orderNumber")}</div>
                <div className="text-2xl font-bold text-navy-800 font-technical">
                  {completedOrder.orderNumber}
                </div>
              </div>

              <div className="text-sm text-gray-500 mb-1">{t("checkout.totalToPay")}</div>
              <div className="text-3xl font-bold text-navy-800 mb-6">
                €{completedOrder.total.toLocaleString("nl-NL", { minimumFractionDigits: 2 })}
              </div>
            </div>

            {/* Bank transfer instructions */}
            <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center">
                  <Landmark className="w-5 h-5 text-navy-800" />
                </div>
                <div>
                  <h2 className="font-bold text-navy-800">{t("checkout.bankTransferTitle")}</h2>
                  <p className="text-sm text-gray-500">{t("checkout.bankTransferDesc")}</p>
                </div>
              </div>

              <div className="space-y-3">
                <BankRow
                  label={t("checkout.accountHolder")}
                  value={BANK_DETAILS.accountHolder}
                  onCopy={() => copyToClipboard(BANK_DETAILS.accountHolder)}
                  copyLabel={t("checkout.copy")}
                />
                <BankRow
                  label="IBAN"
                  value={BANK_DETAILS.iban}
                  onCopy={() => copyToClipboard(BANK_DETAILS.iban)}
                  copyLabel={t("checkout.copy")}
                  highlight
                />
                <BankRow
                  label="BIC"
                  value={BANK_DETAILS.bic}
                  onCopy={() => copyToClipboard(BANK_DETAILS.bic)}
                  copyLabel={t("checkout.copy")}
                />
                <BankRow
                  label={t("checkout.reference")}
                  value={completedOrder.orderNumber}
                  onCopy={() => copyToClipboard(completedOrder.orderNumber)}
                  copyLabel={t("checkout.copy")}
                  highlight
                />
              </div>

              <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-sm text-navy-800">
                  <strong>{t("checkout.importantTitle")}</strong> {t("checkout.importantDesc")}
                </p>
              </div>
            </div>

            <div className="text-center">
              <Link
                to="/containers"
                className="inline-flex items-center gap-2 px-6 py-3 bg-navy-800 text-white font-semibold rounded-lg hover:bg-navy-700 transition-colors"
              >
                {t("checkout.backToShop")} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Empty cart guard
  if (items.length === 0) {
    return (
      <div className="pt-20 lg:pt-24 min-h-screen bg-gray-50">
        <section className="py-16 lg:py-24">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl font-bold text-navy-800 mb-2">{t("checkout.emptyCart")}</h1>
            <p className="text-gray-500 mb-8">{t("checkout.emptyCartDesc")}</p>
            <Link
              to="/containers"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-navy-950 font-semibold rounded-lg hover:bg-orange-400 transition-colors"
            >
              {t("cart.continueShopping")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-gray-50">
      <SEOHead title={`${t("checkout.title")} — STF Container B.V.`} description={t("checkout.title")} />
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-navy-800 mb-8">{t("checkout.title")}</h1>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Customer Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="font-bold text-navy-800 mb-4 text-lg">{t("checkout.customerInfo")}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    label={`${t("checkout.name")} *`}
                    value={form.customer_name}
                    onChange={(v) => update("customer_name", v)}
                    required
                  />
                  <FormField
                    label={t("checkout.company")}
                    value={form.company}
                    onChange={(v) => update("company", v)}
                  />
                  <FormField
                    label={`${t("checkout.email")} *`}
                    type="email"
                    value={form.email}
                    onChange={(v) => update("email", v)}
                    required
                  />
                  <FormField
                    label={`${t("checkout.telephone")} *`}
                    type="tel"
                    value={form.telephone}
                    onChange={(v) => update("telephone", v)}
                    required
                  />
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="font-bold text-navy-800 mb-4 text-lg">{t("checkout.deliveryAddress")}</h2>
                <div className="space-y-4">
                  <FormField
                    label={t("checkout.address")}
                    value={form.delivery_address}
                    onChange={(v) => update("delivery_address", v)}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <FormField
                      label={t("checkout.postalCode")}
                      value={form.postal_code}
                      onChange={(v) => update("postal_code", v)}
                    />
                    <FormField
                      label={t("checkout.city")}
                      value={form.city}
                      onChange={(v) => update("city", v)}
                    />
                    <FormField
                      label={t("checkout.country")}
                      value={form.country}
                      onChange={(v) => {
                        setCountryTouched(true);
                        update("country", v);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="font-bold text-navy-800 mb-4 text-lg">{t("checkout.paymentMethod")}</h2>
                <div className="flex items-center gap-3 p-4 border-2 border-navy-800 rounded-lg bg-navy-50">
                  <Landmark className="w-6 h-6 text-navy-800" />
                  <div>
                    <div className="font-semibold text-navy-800">{t("checkout.bankTransfer")}</div>
                    <div className="text-sm text-gray-500">{t("checkout.bankTransferDesc")}</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("checkout.notes")}</label>
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  placeholder={t("checkout.notesPlaceholder")}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-navy-400 focus:ring-1 focus:ring-navy-400 resize-none"
                />
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-28">
                <h2 className="font-bold text-navy-800 mb-4 text-lg">{t("cart.orderSummary")}</h2>

                {/* Items */}
                <div className="space-y-3 pb-4 border-b border-gray-100">
                  {items.map((item) => {
                    const displayItem = localizeCartItem(item, language);

                    return (
                      <div key={item.cartKey} className="flex gap-3">
                      <div className="flex-shrink-0 w-12 h-12 rounded overflow-hidden bg-gray-100">
                        {displayItem.displayImage ? (
                          <img
                            src={displayItem.displayImage}
                            alt={displayItem.displayName}
                            className="w-full h-full object-cover"
                          />
                        ) : null}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-navy-800 line-clamp-1">
                          {displayItem.displayName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {t("cart.qty")}: {item.quantity}
                          {item.color && ` · ${displayItem.displayColor}`}
                        </div>
                      </div>
                      <div className="text-sm font-medium text-navy-800 whitespace-nowrap">
                        €{(item.price * item.quantity).toLocaleString("nl-NL")}
                      </div>
                      </div>
                    );
                  })}
                </div>

                {/* Totals */}
                <div className="space-y-2 py-4 border-b border-gray-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{t("cart.subtotal")} ({t("cart.exclVat")})</span>
                    <span className="font-medium text-navy-800">€{subtotal.toLocaleString("nl-NL")}</span>
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

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-orange-500 text-navy-950 font-semibold rounded-lg hover:bg-orange-400 transition-colors disabled:opacity-60 text-lg"
                >
                  {submitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Landmark className="w-5 h-5" />
                  )}
                  {submitting ? t("checkout.placingOrder") : t("checkout.placeOrder")}
                </button>

                <p className="text-xs text-gray-400 mt-3 text-center">
                  {t("checkout.securePaymentDesc")}
                </p>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

function FormField({ label, value, onChange, type = "text", required }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-navy-400 focus:ring-1 focus:ring-navy-400"
      />
    </div>
  );
}

function BankRow({ label, value, onCopy, copyLabel, highlight = false }) {
  return (
    <div
      className={`flex items-center justify-between p-3 rounded-lg ${
        highlight ? "bg-orange-50 border border-orange-200" : "bg-gray-50"
      }`}
    >
      <div>
        <div className="text-xs text-gray-500">{label}</div>
        <div className={`font-technical ${highlight ? "text-navy-800 font-bold" : "text-navy-700"}`}>
          {value}
        </div>
      </div>
      <button
        onClick={onCopy}
        className="flex items-center gap-1 text-xs font-medium text-navy-600 hover:text-orange-500 transition-colors px-2 py-1"
      >
        <Copy className="w-3.5 h-3.5" />
        {copyLabel}
      </button>
    </div>
  );
}
