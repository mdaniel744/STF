"use client";

import React from "react";
import Link from "@/components/LocalizedLink";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  const containerLinks = [
    { label: t("footer.standardContainers"), type: "Standard" },
    { label: t("footer.highCubeContainers"), type: "High Cube" },
    { label: t("footer.openSideContainers"), type: "Open Side" },
    { label: t("footer.officeContainers"), type: "Office" },
    { label: t("footer.storageContainers"), type: "Storage" },
    { label: t("footer.refrigeratedContainers"), type: "Refrigerated" },
  ];

  const companyLinks = [
    { label: t("footer.aboutUs"), path: "/about" },
    { label: t("footer.faq"), path: "/faq" },
    { label: t("footer.contactLink"), path: "/contact" },
    { label: t("footer.privacyPolicy"), path: "/privacy" },
    { label: t("footer.termsConditions"), path: "/terms" },
    { label: t("footer.cookiePolicy"), path: "/cookies" },
    { label: t("footer.shippingPolicy"), path: "/shipping-policy" },
    { label: t("footer.refundPolicy"), path: "/refund-policy" },
  ];

  const bottomLinks = [
    { label: t("footer.privacy"), path: "/privacy" },
    { label: t("footer.terms"), path: "/terms" },
    { label: t("footer.cookies"), path: "/cookies" },
    { label: t("footer.disclaimer"), path: "/disclaimer" },
  ];

  return (
    <footer className="bg-navy-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div>
            <img
              src="https://media.base44.com/images/public/6a5515cc1c02a52a32b121f4/2a58e8d36_whitelogo.png"
              alt="STF Containers"
              className="h-24 w-auto mb-6"
            />
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              {t("footer.description")}
            </p>
            <div className="space-y-2 text-sm text-white/50 font-technical">
              <p>{t("footer.kvk")} 97008370</p>
              <p>{t("footer.vat")} NL867872020B01</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-6 text-white/90">{t("footer.containers")}</h4>
            <ul className="space-y-3">
              {containerLinks.map((item) => (
                <li key={item.type}>
                  <Link to={`/containers?type=${encodeURIComponent(item.type)}`} className="text-sm text-white/60 hover:text-orange-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-6 text-white/90">{t("footer.company")}</h4>
            <ul className="space-y-3">
              {companyLinks.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="text-sm text-white/60 hover:text-orange-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-6 text-white/90">{t("footer.contact")}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-orange-400 flex-shrink-0" />
                <span className="text-sm text-white/70">
                  Rembrandtlaan 49<br />
                  3723 BG Bilthoven<br />
                  {t("contact.addressLine4")}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span className="text-sm text-white/70">{t("footer.openingHours")}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <a href="tel:+31301234567" className="text-sm text-white/70 hover:text-orange-400 transition-colors">
                  +31 30 123 4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <a href="mailto:info@stfcontainer.nl" className="text-sm text-white/70 hover:text-orange-400 transition-colors">
                  info@stfcontainer.nl
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </p>
          <div className="flex items-center gap-6">
            {bottomLinks.map((item) => (
              <Link key={item.path} to={item.path} className="text-xs text-white/40 hover:text-white/70 transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
