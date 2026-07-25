"use client";

import React from "react";
import NextLink from "next/link";
import { SUPPORTED_LANGUAGES, useLanguage } from "@/lib/i18n/LanguageContext";

const UNLOCALIZED_PATHS = ["/admin", "/login", "/register", "/forgot-password", "/reset-password"];

function needsLocale(path) {
  if (!path || typeof path !== "string" || !path.startsWith("/")) return false;
  if (UNLOCALIZED_PATHS.some((prefix) => path === prefix || path.startsWith(`${prefix}/`))) return false;
  return !SUPPORTED_LANGUAGES.some((l) => path.startsWith(`/${l}/`) || path === `/${l}`);
}

export default function Link({ to, href, ...props }) {
  const { language } = useLanguage();
  const target = href ?? to;

  let localizedTo = target;
  if (typeof target === "string" && needsLocale(target)) {
    localizedTo = `/${language}${target}`;
  } else if (target && typeof target === "object" && target.pathname && needsLocale(target.pathname)) {
    localizedTo = { ...target, pathname: `/${language}${target.pathname}` };
  }

  return <NextLink href={localizedTo} {...props} />;
}
