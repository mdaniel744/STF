"use client";

import React from "react";
import Link from "@/components/LocalizedLink";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  Mail,
  MapPin,
  Phone,
  RotateCcw,
  Truck,
} from "lucide-react";
import { getRefundPolicyContent } from "@/data/refund-policy-content";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const EMAIL = "contact@stfcontainer.com";
const PHONE_DISPLAY = "+31 30 123 4567";
const summaryIcons = [Clock3, Truck, ClipboardCheck];

function PolicySection({ number, id, title, children }) {
  return (
    <section id={id} className="scroll-mt-28 border-b border-gray-200 pb-10 last:border-b-0 last:pb-0">
      <div className="mb-5 flex items-start gap-4">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-navy-800 text-sm font-bold text-white">
          {number}
        </span>
        <h2 className="pt-0.5 text-xl font-bold text-navy-800 sm:text-2xl">{title}</h2>
      </div>
      <div className="space-y-4 text-[15px] leading-7 text-gray-700 sm:text-base">{children}</div>
    </section>
  );
}

function DetailList({ items, label }) {
  return (
    <div className="overflow-hidden rounded border border-gray-200" role="group" aria-label={label}>
      <dl className="divide-y divide-gray-200">
        {items.map(([term, description]) => (
          <div key={term} className="grid gap-1 bg-white px-4 py-3 sm:grid-cols-[190px_1fr] sm:gap-5 sm:px-5">
            <dt className="font-semibold text-navy-800">{term}</dt>
            <dd className="text-gray-600">{description}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function ContactDetails({ copy, compact = false }) {
  return (
    <address className={`not-italic ${compact ? "space-y-2 text-sm" : "space-y-3"}`}>
      <div className="flex items-start gap-3">
        <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
        <span>
          STF Container B.V.
          <br />
          Rembrandtlaan 49
          <br />
          3723 BG Bilthoven
          <br />
          {copy.country}
        </span>
      </div>
      <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 font-medium text-navy-800 hover:text-orange-600">
        <Mail className="h-5 w-5 shrink-0 text-orange-500" />
        {EMAIL}
      </a>
      <a href="tel:+31301234567" className="flex items-center gap-3 font-medium text-navy-800 hover:text-orange-600">
        <Phone className="h-5 w-5 shrink-0 text-orange-500" />
        {PHONE_DISPLAY}
      </a>
    </address>
  );
}

function Notice({ tone, text, email = false }) {
  const styles = {
    info: {
      wrapper: "border-orange-500 bg-orange-50",
      icon: null,
      text: "text-navy-800",
    },
    warning: {
      wrapper: "border-amber-500 bg-amber-50",
      icon: AlertTriangle,
      text: "text-gray-700",
    },
    success: {
      wrapper: "border-emerald-500 bg-emerald-50",
      icon: CheckCircle2,
      text: "text-navy-800",
    },
  };
  const style = styles[tone] || styles.info;
  const Icon = style.icon;

  return (
    <div className={`flex gap-3 border-l-4 px-5 py-4 ${style.wrapper}`}>
      {Icon && <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${tone === "warning" ? "text-amber-600" : "text-emerald-600"}`} />}
      <p className={`font-semibold ${style.text}`}>
        {text}
        {email && (
          <>
            {" "}
            <a href={`mailto:${EMAIL}`} className="underline">
              {EMAIL}
            </a>
            .
          </>
        )}
      </p>
    </div>
  );
}

function PolicyBlock({ block, copy }) {
  const [type, first, second, third] = block;

  if (type === "p") return <p>{first}</p>;
  if (type === "strong") return <p className="font-semibold text-navy-800">{first}</p>;
  if (type === "contact") return <ContactDetails copy={copy} />;
  if (type === "details") return <DetailList label={first} items={second} />;
  if (type === "notice") return <Notice tone={first} text={second} />;
  if (type === "emailNotice") return <Notice tone={first} text={second} email />;

  if (type === "email") {
    return (
      <p>
        {first}{" "}
        <a href={`mailto:${EMAIL}`} className="font-semibold text-navy-800 underline">
          {EMAIL}
        </a>
        .
      </p>
    );
  }

  if (type === "contactCard") {
    return (
      <div className="border border-gray-200 bg-gray-50 px-5 py-6 sm:px-6">
        <div className="mb-5 flex items-center gap-3">
          <RotateCcw className="h-6 w-6 text-orange-500" />
          <h3 className="font-bold text-navy-800">{copy.returnTeam}</h3>
        </div>
        <ContactDetails copy={copy} />
      </div>
    );
  }

  return third ? <p>{third}</p> : null;
}

export default function RefundPolicy() {
  const { language, t } = useLanguage();
  const copy = getRefundPolicyContent(language);

  return (
    <div className="min-h-screen bg-white pt-20 lg:pt-24">
      <header className="bg-navy-800 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label={copy.breadcrumbLabel} className="mb-5 flex items-center gap-2 text-sm text-white/60">
            <Link to="/" className="transition-colors hover:text-white">
              {t("policy.home")}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">{copy.title}</span>
          </nav>
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase text-orange-400">{copy.eyebrow}</p>
            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{copy.title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">{copy.lead}</p>
            <p className="mt-4 text-sm text-white/50">{t("policy.lastUpdated", { date: copy.lastUpdated })}</p>
          </div>
        </div>
      </header>

      <section aria-label={copy.highlightsLabel} className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto grid max-w-7xl gap-px bg-gray-200 sm:grid-cols-3">
          {copy.summary.map(([title, text], index) => {
            const Icon = summaryIcons[index];
            return (
              <div key={title} className="flex gap-4 bg-gray-50 px-5 py-6 sm:px-6">
                <Icon className="mt-0.5 h-6 w-6 shrink-0 text-orange-500" />
                <div>
                  <h2 className="font-bold text-navy-800">{title}</h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">{text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:grid lg:grid-cols-[240px_minmax(0,760px)] lg:justify-between lg:gap-16 lg:px-8 lg:py-16">
        <aside className="mb-10 lg:mb-0">
          <div className="border-b border-gray-200 pb-6 lg:sticky lg:top-28 lg:border-b-0 lg:pb-0">
            <h2 className="text-sm font-bold uppercase text-navy-800">{copy.contentsTitle}</h2>
            <nav aria-label={copy.contentsLabel} className="mt-4 grid gap-1 sm:grid-cols-2 lg:grid-cols-1">
              {copy.toc.map(([id, label]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="border-l-2 border-transparent py-2 pl-3 text-sm font-medium text-gray-600 transition-colors hover:border-orange-500 hover:text-navy-800"
                >
                  {label}
                </a>
              ))}
            </nav>
            <div className="mt-7 hidden border-t border-gray-200 pt-6 lg:block">
              <p className="mb-4 text-sm font-semibold text-navy-800">{copy.needHelp}</p>
              <ContactDetails copy={copy} compact />
            </div>
          </div>
        </aside>

        <article className="min-w-0 space-y-10">
          {copy.sections.map((section, index) => (
            <PolicySection key={`${section.id || "section"}-${index}`} number={index + 1} id={section.id} title={section.title}>
              {section.blocks.map((block, blockIndex) => (
                <PolicyBlock key={`${block[0]}-${blockIndex}`} block={block} copy={copy} />
              ))}
            </PolicySection>
          ))}
        </article>
      </div>
    </div>
  );
}
