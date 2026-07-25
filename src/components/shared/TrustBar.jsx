import React from "react";
import { Clock, Truck, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function TrustBar({ variant = "light" }) {
  const { t } = useLanguage();
  const isDark = variant === "dark";

  const items = [
    { icon: Clock, label: t("trustbar.available") },
    { icon: Truck, label: t("trustbar.craneDelivery") },
    { icon: ShieldCheck, label: t("trustbar.delivered") },
  ];

  return (
    <div className={`flex flex-wrap items-center justify-center gap-6 sm:gap-10 py-3 px-4 text-sm font-medium ${
      isDark ? "bg-navy-900 text-white/80" : "bg-gray-50 text-gray-600 border-y border-gray-100"
    }`}>
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <item.icon className="w-4 h-4 text-orange-500" />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}