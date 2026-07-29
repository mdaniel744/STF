"use client";

import React from "react";
import Link from "@/components/LocalizedLink";
import {
  BarChart3,
  Check,
  ChevronRight,
  Clock3,
  Cookie,
  Languages,
  LockKeyhole,
  Mail,
  MapPin,
  Megaphone,
  Phone,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import { getCookiePolicyContent } from "@/data/cookie-policy-content";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const EMAIL = "contact@stfcontainer.com";
const PHONE_DISPLAY = "+31 545465 65";
const summaryIcons = [ShieldCheck, BarChart3, SlidersHorizontal];
const categoryIcons = [LockKeyhole, Languages, BarChart3, Megaphone];

function PolicySection({ number, id, title, children }) {
  return (
    <section id={id} className="scroll-mt-28 border-b border-gray-200 pb-10 last:border-b-0 last:pb-0">
      <div className="mb-5 flex items-start gap-4">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-navy-800 text-sm font-bold text-white">
          {number}
        </span>
        <h2 className="min-w-0 pt-0.5 text-xl font-bold text-navy-800 sm:text-2xl">{title}</h2>
      </div>
      <div className="space-y-4 text-[15px] leading-7 text-gray-700 sm:text-base">{children}</div>
    </section>
  );
}

function Paragraphs({ items }) {
  return items.map((paragraph) => <p key={paragraph}>{paragraph}</p>);
}

function BulletList({ items, label }) {
  return (
    <ul aria-label={label} className="grid gap-2 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex min-w-0 items-start gap-2.5">
          <Check className="mt-1 h-4 w-4 shrink-0 text-orange-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function CompanyDetails({ copy, compact = false }) {
  if (compact) {
    return (
      <address className="space-y-2 text-sm not-italic">
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
        <a
          href={`mailto:${EMAIL}`}
          className="flex min-w-0 items-center gap-3 font-medium text-navy-800 hover:text-orange-600"
        >
          <Mail className="h-5 w-5 shrink-0 text-orange-500" />
          <span className="min-w-0 break-all">{EMAIL}</span>
        </a>
        <a href="tel:+3154546565" className="flex items-center gap-3 font-medium text-navy-800 hover:text-orange-600">
          <Phone className="h-5 w-5 shrink-0 text-orange-500" />
          {PHONE_DISPLAY}
        </a>
      </address>
    );
  }

  const details = [
    [copy.labels.address, `Rembrandtlaan 49, 3723 BG Bilthoven, ${copy.country}`],
    [copy.labels.email, EMAIL],
    [copy.labels.phone, PHONE_DISPLAY],
    [copy.labels.vat, "NL 867872020B01"],
    [copy.labels.chamber, "97008370"],
  ];

  return (
    <div className="overflow-hidden rounded border border-gray-200 bg-gray-50">
      <div className="border-b border-gray-200 px-5 py-4 sm:px-6">
        <h3 className="font-bold text-navy-800">STF Container B.V.</h3>
      </div>
      <dl className="divide-y divide-gray-200">
        {details.map(([term, value]) => (
          <div key={term} className="grid gap-1 px-5 py-3 sm:grid-cols-[190px_minmax(0,1fr)] sm:gap-5 sm:px-6">
            <dt className="font-semibold text-navy-800">{term}</dt>
            <dd className="min-w-0 break-words text-gray-600">
              {term === copy.labels.email ? (
                <a href={`mailto:${EMAIL}`} className="break-all font-medium text-navy-800 underline">
                  {value}
                </a>
              ) : term === copy.labels.phone ? (
                <a href="tel:+3154546565" className="font-medium text-navy-800 underline">
                  {value}
                </a>
              ) : (
                value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function CookieCategories({ copy }) {
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded border border-gray-200">
      {copy.categories.items.map((category, index) => {
        const Icon = categoryIcons[index];
        const required = category.status === "required";

        return (
          <section key={category.title} className="bg-white px-5 py-6 sm:px-6">
            <div className="flex items-start gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-gray-100">
                <Icon className="h-5 w-5 text-navy-800" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-bold text-navy-800 sm:text-lg">
                    {index + 1}. {category.title}
                  </h3>
                  <span
                    className={`border px-2.5 py-1 text-xs font-semibold ${
                      required
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-orange-200 bg-orange-50 text-orange-700"
                    }`}
                  >
                    {required ? copy.labels.required : copy.labels.consent}
                  </span>
                </div>
                <p className="mt-3">{category.description}</p>
                <p className="mb-2 mt-4 text-sm font-bold uppercase text-navy-800">{copy.labels.examples}</p>
                <BulletList items={category.examples} label={`${copy.labels.examples}: ${category.title}`} />
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

function Notice({ children }) {
  return (
    <div className="border-l-4 border-orange-500 bg-orange-50 px-5 py-4 font-semibold text-navy-800">
      {children}
    </div>
  );
}

export default function Cookies() {
  const { language, t } = useLanguage();
  const copy = getCookiePolicyContent(language);

  return (
    <div className="min-h-screen bg-white pt-20 lg:pt-24">
      <header className="bg-navy-800 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label={copy.breadcrumbLabel} className="mb-5 flex items-center gap-2 text-sm text-white/60">
            <Link to="/" className="transition-colors hover:text-white">
              {t("policy.home")}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <span className="min-w-0 text-white">{copy.title}</span>
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
                <div className="min-w-0">
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
              <CompanyDetails copy={copy} compact />
            </div>
          </div>
        </aside>

        <article className="min-w-0 space-y-10">
          <PolicySection number={1} id="over-dit-beleid" title={copy.overview.title}>
            <Paragraphs items={copy.overview.paragraphs} />
          </PolicySection>

          <PolicySection number={2} id="bedrijfsgegevens" title={copy.company.title}>
            <p>{copy.company.intro}</p>
            <CompanyDetails copy={copy} />
          </PolicySection>

          <PolicySection number={3} id="wat-zijn-cookies" title={copy.definition.title}>
            <Paragraphs items={copy.definition.paragraphs} />
          </PolicySection>

          <PolicySection number={4} id="cookiecategorieen" title={copy.categories.title}>
            <p>{copy.categories.intro}</p>
            <CookieCategories copy={copy} />
          </PolicySection>

          <PolicySection number={5} id="derden" title={copy.thirdParty.title}>
            <Paragraphs items={copy.thirdParty.paragraphs} />
            <BulletList items={copy.thirdParty.services} label={copy.thirdParty.title} />
          </PolicySection>

          <PolicySection number={6} id="toestemming" title={copy.consent.title}>
            <Paragraphs items={copy.consent.paragraphs} />
            <BulletList items={copy.consent.choices} label={copy.consent.title} />
            <Notice>{copy.consent.notice}</Notice>
          </PolicySection>

          <PolicySection number={7} id="cookies-beheren" title={copy.deletion.title}>
            <Paragraphs items={copy.deletion.paragraphs} />
          </PolicySection>

          <PolicySection number={8} id="bewaartermijn" title={copy.retention.title}>
            <p>{copy.retention.paragraphs[0]}</p>
            <div className="flex items-start gap-3 border border-gray-200 bg-gray-50 px-5 py-4">
              <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
              <p>{copy.retention.paragraphs[1]}</p>
            </div>
          </PolicySection>

          <PolicySection number={9} id="google-diensten" title={copy.google.title}>
            <Paragraphs items={copy.google.paragraphs} />
            <BulletList items={copy.google.services} label={copy.google.title} />
          </PolicySection>

          <PolicySection number={10} id="wijzigingen-contact" title={copy.changes.title}>
            <Paragraphs items={copy.changes.paragraphs} />
          </PolicySection>

          <PolicySection number={11} title={copy.contact.title}>
            <Paragraphs items={copy.contact.paragraphs} />
            <div className="border border-gray-200 bg-gray-50 px-5 py-6 sm:px-6">
              <div className="mb-5 flex items-center gap-3">
                <Cookie className="h-6 w-6 shrink-0 text-orange-500" />
                <h3 className="font-bold text-navy-800">STF Container B.V.</h3>
              </div>
              <CompanyDetails copy={copy} compact />
            </div>
          </PolicySection>
        </article>
      </div>
    </div>
  );
}
