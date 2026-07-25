import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { MapPin, Phone, Mail, Clock, MessageCircle, Loader2, Send, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ customer_name: "", email: "", telephone: "", message: "" });

  const update = (key, value) => setForm({ ...form, [key]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await base44.entities.QuoteRequest.create({
        ...form,
        country: "Nederland",
        transport_required: "No",
        quantity: 1,
      });
      setSubmitted(true);
      toast({ title: t("contact.toastTitle"), description: t("contact.toastDesc") });
    } catch {
      toast({ title: t("contact.errorTitle"), description: t("contact.errorDesc"), variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-20 lg:pt-24">
      <section className="py-16 lg:py-20 bg-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-12 h-px bg-orange-500" />
            <span className="font-technical text-xs text-orange-400 uppercase tracking-widest">{t("contact.label")}</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">{t("contact.heading")}</h1>
          <p className="text-white/60 max-w-2xl">
            {t("contact.description")}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Company Info */}
            <div>
              <h2 className="text-2xl font-bold text-navy-800 mb-6">{t("contact.companyInfo")}</h2>
              <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-navy-800" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-800 mb-1">{t("contact.address")}</h3>
                    <p className="text-sm text-gray-500">
                      {t("contact.addressLine1")}<br />
                      {t("contact.addressLine2")}<br />
                      {t("contact.addressLine3")}<br />
                      {t("contact.addressLine4")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-navy-800" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-800 mb-1">{t("contact.telephone")}</h3>
                    <a href="tel:+31301234567" className="text-sm text-gray-500 hover:text-orange-500">+31 30 123 4567</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-navy-800" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-800 mb-1">{t("contact.email")}</h3>
                    <a href="mailto:info@stfcontainer.nl" className="text-sm text-gray-500 hover:text-orange-500">info@stfcontainer.nl</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-navy-800" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-800 mb-1">{t("contact.openingHours")}</h3>
                    <p className="text-sm text-gray-500">{t("contact.hoursWeekday")}<br />{t("contact.hoursWeekend")}</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs text-gray-400 font-technical uppercase">{t("contact.vatNumber")}</span>
                      <p className="text-sm font-medium text-navy-800">NL867872020B01</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 font-technical uppercase">{t("contact.kvk")}</span>
                      <p className="text-sm font-medium text-navy-800">97008370</p>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="https://wa.me/31301234567"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-3 px-6 py-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                {t("contact.whatsapp")}
              </a>

              {/* Google Map */}
              <div className="mt-4 rounded-lg overflow-hidden border border-gray-200 h-64">
                <iframe
                  title="STF Container B.V. Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2450.123!2d5.2041!3d52.1389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDA4JzIwLjAiTiA1wrAxMicyMTQuOCJF!5e0!3m2!1sen!2snl!4v1700000000000!5m2!1sen!2snl"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-navy-800 mb-6">{t("contact.sendMessage")}</h2>
              {submitted ? (
                <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-navy-800 mb-2">{t("contact.messageSent")}</h3>
                  <p className="text-gray-500">{t("contact.messageSentDesc")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6 space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t("contact.name")}</label>
                    <input
                      type="text"
                      required
                      value={form.customer_name}
                      onChange={(e) => update("customer_name", e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-navy-400 focus:ring-1 focus:ring-navy-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t("contact.emailLabel")}</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-navy-400 focus:ring-1 focus:ring-navy-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t("contact.telephoneLabel")}</label>
                    <input
                      type="tel"
                      value={form.telephone}
                      onChange={(e) => update("telephone", e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-navy-400 focus:ring-1 focus:ring-navy-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t("contact.message")}</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      placeholder={t("contact.messagePlaceholder")}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-navy-400 focus:ring-1 focus:ring-navy-400 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-orange-500 text-navy-950 font-semibold rounded-lg hover:bg-orange-400 transition-colors disabled:opacity-60"
                  >
                    {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                    {submitting ? t("contact.sending") : t("contact.send")}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
