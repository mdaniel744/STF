"use client";

import React from "react";
import PolicyPage from "@/components/PolicyPage";
import { getPolicyContent } from "@/data/policy-content";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function LocalizedPolicyPage({ page }) {
  const { language } = useLanguage();
  const content = getPolicyContent(page, language);

  return <PolicyPage {...content} />;
}
