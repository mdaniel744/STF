import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { displayProductLabel } from "@/lib/i18n/productLabels";
import { Warehouse, Truck, Building2, Snowflake, HardHat, ArrowLeft, CheckCircle2 } from "lucide-react";

const steps = [
  {
    questionKey: "finder.questionUse",
    key: "use",
    options: [
      { value: "Storage", labelKey: "finder.storage", icon: Warehouse, type: "Storage" },
      { value: "Transport", labelKey: "finder.transport", icon: Truck, type: "Standard" },
      { value: "Office", labelKey: "finder.office", icon: Building2, type: "Office" },
      { value: "Cold Storage", labelKey: "finder.coldStorage", icon: Snowflake, type: "Refrigerated" },
      { value: "Construction", labelKey: "finder.construction", icon: HardHat, type: "Standard" },
    ],
  },
  {
    questionKey: "finder.questionSize",
    key: "size",
    options: [
      { value: "10ft", label: "10ft" },
      { value: "20ft", label: "20ft" },
      { value: "40ft", label: "40ft" },
    ],
  },
  {
    questionKey: "finder.questionCondition",
    key: "condition",
    options: [
      { value: "New", label: "New" },
      { value: "Used", label: "Used" },
      { value: "One Trip", label: "One Trip" },
      { value: "WWT", labelKey: "finder.wwt" },
    ],
  },
];

export default function ContainerFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const { language, localeNavigate, t } = useLanguage();

  const handleSelect = (key, value) => {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);

    if (step < steps.length - 1) {
      setTimeout(() => setStep(step + 1), 200);
    } else {
      const useOption = steps[0].options.find((o) => o.value === updated.use);
      const params = new URLSearchParams();
      if (useOption?.type) params.set("type", useOption.type);
      if (updated.size) params.set("size", updated.size);
      if (updated.condition) params.set("condition", updated.condition);
      localeNavigate(`/containers?${params.toString()}`);
    }
  };

  const current = steps[step];
  const getOptionLabel = (option) => {
    if (current.key === "condition") return displayProductLabel(language, "condition", option.value);
    if (option.labelKey) return t(option.labelKey);
    return option.label;
  };

  return (
    <section className="py-20 lg:py-28 bg-navy-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-12 h-px bg-orange-500" />
            <span className="font-technical text-xs text-orange-400 uppercase tracking-widest">{t("finder.label")}</span>
            <span className="w-12 h-px bg-orange-500" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {t("finder.heading")}
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            {t("finder.description")}
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {steps.map((s, i) => (
            <React.Fragment key={s.key}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  i < step ? "bg-orange-500 text-navy-950" : i === step ? "bg-white text-navy-800" : "bg-white/10 text-white/40"
                }`}
              >
                {i < step ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className={`w-16 h-0.5 ${i < step ? "bg-orange-500" : "bg-white/10"}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="text-center mb-8">
          <h3 className="text-xl font-semibold text-white">{t(current.questionKey)}</h3>
        </div>

        <div className={`grid gap-4 ${current.options.length <= 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"}`}>
          {current.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(current.key, option.value)}
              className={`group flex flex-col items-center gap-3 p-6 rounded-lg border-2 transition-all duration-200 ${
                answers[current.key] === option.value
                  ? "border-orange-500 bg-orange-500/10"
                  : "border-white/10 hover:border-white/30 hover:bg-white/5"
              }`}
            >
              {option.icon && <option.icon className="w-8 h-8 text-orange-400" />}
              <span className="font-semibold text-white">{getOptionLabel(option)}</span>
            </button>
          ))}
        </div>

        {step > 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setStep(step - 1)}
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> {t("finder.back")}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
