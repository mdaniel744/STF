"use client";

import React from "react";
import NextLink from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { hasLocalePrefix, localizePublicPath } from "@/lib/i18n/permalinks";

export default function Link({ to = null, href = null, ...props }) {
  const { language } = useLanguage();
  const target = href ?? to;

  let localizedTo = target;
  if (typeof target === "string" && !hasLocalePrefix(target)) {
    localizedTo = localizePublicPath(target, language);
  } else if (
    target &&
    typeof target === "object" &&
    target.pathname &&
    !hasLocalePrefix(target.pathname)
  ) {
    localizedTo = {
      ...target,
      pathname: localizePublicPath(target.pathname, language),
    };
  }

  return <NextLink href={localizedTo} {...props} />;
}
