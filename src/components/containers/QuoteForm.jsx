import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, CheckCircle2, Send } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const countryByLanguage = {
  en: "Netherlands",
  nl: "Nederland",
  de: "Niederlande",
  fr: "Pays-Bas",
  es: "Países Bajos",
};

const quoteEmailCopy = {
  en: {
    subject: "Quote request received - STF Container B.V.",
    greeting: "Dear",
    thanks: "Thank you for your quote request",
    forProduct: "for",
    received: "We have received your request and will contact you within 24 business hours with a suitable quote.",
    closing: "Kind regards",
  },
  nl: {
    subject: "Offerteaanvraag ontvangen - STF Container B.V.",
    greeting: "Beste",
    thanks: "Bedankt voor uw offerteaanvraag",
    forProduct: "voor",
    received: "Wij hebben uw aanvraag ontvangen en nemen binnen 24 werkuren contact met u op met een passende offerte.",
    closing: "Met vriendelijke groet",
  },
  de: {
    subject: "Angebotsanfrage erhalten - STF Container B.V.",
    greeting: "Guten Tag",
    thanks: "Vielen Dank für Ihre Angebotsanfrage",
    forProduct: "für",
    received: "Wir haben Ihre Anfrage erhalten und melden uns innerhalb von 24 Geschäftsstunden mit einem passenden Angebot bei Ihnen.",
    closing: "Mit freundlichen Grüßen",
  },
  fr: {
    subject: "Demande de devis reçue - STF Container B.V.",
    greeting: "Bonjour",
    thanks: "Merci pour votre demande de devis",
    forProduct: "pour",
    received: "Nous avons reçu votre demande et vous contacterons sous 24 heures ouvrées avec un devis adapté.",
    closing: "Cordialement",
  },
  es: {
    subject: "Solicitud de presupuesto recibida - STF Container B.V.",
    greeting: "Hola",
    thanks: "Gracias por su solicitud de presupuesto",
    forProduct: "para",
    received: "Hemos recibido su solicitud y nos pondremos en contacto con usted en un plazo de 24 horas laborables con un presupuesto adecuado.",
    closing: "Un cordial saludo",
  },
};

export default function QuoteForm({ productId, productName, onSuccess, initialQuantity = 1 }) {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const defaultCountry = countryByLanguage[language] || countryByLanguage.nl;
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    customer_name: "",
    company: "",
    email: "",
    telephone: "",
    country: defaultCountry,
    delivery_address: "",
    postal_code: "",
    quantity: initialQuantity,
    preferred_delivery_date: "",
    transport_required: "Yes",
    message: "",
  });

  const update = (key, value) => setForm({ ...form, [key]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const emailCopy = quoteEmailCopy[language] || quoteEmailCopy.nl;
    const productLine = productName ? ` ${emailCopy.forProduct} ${productName}` : "";

    try {
      await base44.entities.QuoteRequest.create({
        ...form,
        product_id: productId || "",
        product_name: productName || "",
      });

      try {
        await base44.integrations.Core.SendEmail({
          to: form.email,
          subject: emailCopy.subject,
          body: `${emailCopy.greeting} ${form.customer_name},\n\n${emailCopy.thanks}${productLine}.\n\n${emailCopy.received}\n\n${emailCopy.closing}\nSTF Container B.V.\nRembrandtlaan 49, 3723 BG Bilthoven\n${defaultCountry}`,
        });
      } catch {}

      setSubmitted(true);
      onSuccess?.();
      toast({ title: t("quoteForm.toastTitle"), description: t("quoteForm.toastDesc") });
    } catch {
      toast({ title: t("quoteForm.errorTitle"), description: t("quoteForm.errorDesc"), variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-navy-800 mb-2">{t("quoteForm.submitted")}</h3>
        <p className="text-gray-500">{t("quoteForm.submittedDesc")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label={t("quoteForm.name")} value={form.customer_name} onChange={(v) => update("customer_name", v)} required />
        <Field label={t("quoteForm.company")} value={form.company} onChange={(v) => update("company", v)} />
        <Field label={t("quoteForm.email")} type="email" value={form.email} onChange={(v) => update("email", v)} required />
        <Field label={t("quoteForm.telephone")} type="tel" value={form.telephone} onChange={(v) => update("telephone", v)} required />
        <Field label={t("quoteForm.country")} value={form.country} onChange={(v) => update("country", v)} />
        <Field label={t("quoteForm.postalCode")} value={form.postal_code} onChange={(v) => update("postal_code", v)} />
      </div>
      <Field label={t("quoteForm.deliveryAddress")} value={form.delivery_address} onChange={(v) => update("delivery_address", v)} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t("quoteForm.quantity")}</label>
          <input
            type="number"
            min="1"
            value={form.quantity}
            onChange={(e) => update("quantity", parseInt(e.target.value) || 1)}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-navy-400 focus:ring-1 focus:ring-navy-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t("quoteForm.preferredDate")}</label>
          <input
            type="date"
            value={form.preferred_delivery_date}
            onChange={(e) => update("preferred_delivery_date", e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-navy-400 focus:ring-1 focus:ring-navy-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t("quoteForm.transportRequired")}</label>
          <select
            value={form.transport_required}
            onChange={(e) => update("transport_required", e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-navy-400 focus:ring-1 focus:ring-navy-400"
          >
            <option value="Yes">{t("quoteForm.yes")}</option>
            <option value="No">{t("quoteForm.noPickup")}</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t("quoteForm.message")}</label>
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder={t("quoteForm.messagePlaceholder")}
          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-navy-400 focus:ring-1 focus:ring-navy-400 resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-orange-500 text-navy-950 font-semibold rounded-lg hover:bg-orange-400 transition-colors disabled:opacity-60"
      >
        {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
        {submitting ? t("quoteForm.submitting") : t("quoteForm.requestQuote")}
      </button>
    </form>
  );
}

function Field({ label, value, onChange, type = "text", required }) {
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
