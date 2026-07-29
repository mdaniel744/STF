"use client";

import React from "react";
import Link from "@/components/LocalizedLink";
import { getPrivacyPolicyContent } from "@/data/privacy-policy-content";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const EMAIL = "contact@stfcontainer.com";
const PHONE_DISPLAY = "+31 545465 65";

function LinkedText({ children }) {
  if (typeof children !== "string" || !children.includes(EMAIL)) return children;
  const parts = children.split(EMAIL);
  return parts.map((part, index) => (
    <React.Fragment key={`${part}-${index}`}>
      {index > 0 && (
        <a href={`mailto:${EMAIL}`} className="font-medium text-navy-800 underline">
          {EMAIL}
        </a>
      )}
      {part}
    </React.Fragment>
  ));
}

function CompanyDetails({ copy }) {
  const details = [
    [copy.labels.email, EMAIL],
    [copy.labels.phone, PHONE_DISPLAY],
    [copy.labels.vat, "NL 867872020B01"],
    [copy.labels.chamber, "97008370"],
  ];

  return (
    <div className="border-y border-gray-300 py-5">
      <p className="font-semibold text-navy-800">STF Container B.V.</p>
      <address className="mt-2 not-italic text-gray-700">
        Rembrandtlaan 49
        <br />
        3723 BG Bilthoven
        <br />
        {copy.country}
      </address>
      <dl className="mt-5 grid gap-x-6 gap-y-2 sm:grid-cols-[190px_minmax(0,1fr)]">
        {details.map(([term, value]) => (
          <React.Fragment key={term}>
            <dt className="font-semibold text-navy-800">{term}</dt>
            <dd className="min-w-0 break-words">
              {term === copy.labels.email ? (
                <a href={`mailto:${EMAIL}`} className="break-all text-navy-800 underline">
                  {value}
                </a>
              ) : term === copy.labels.phone ? (
                <a href="tel:+3154546565" className="text-navy-800 underline">
                  {value}
                </a>
              ) : (
                value
              )}
            </dd>
          </React.Fragment>
        ))}
      </dl>
    </div>
  );
}

function PolicyBlock({ block, copy }) {
  const [type, value] = block;

  if (type === "p") return <p><LinkedText>{value}</LinkedText></p>;
  if (type === "heading") return <h3 className="pt-2 text-base font-bold text-navy-800 sm:text-lg">{value}</h3>;
  if (type === "basis") {
    return (
      <p className="border-l-2 border-orange-500 bg-gray-50 px-4 py-3">
        <span className="font-semibold text-navy-800">{copy.labels.legalBasis}: </span>
        <LinkedText>{value}</LinkedText>
      </p>
    );
  }
  if (type === "list") {
    return (
      <ul className="ml-5 list-disc space-y-2 pl-1 marker:text-gray-500">
        {value.map((item) => <li key={item}><LinkedText>{item}</LinkedText></li>)}
      </ul>
    );
  }
  if (type === "company") return <CompanyDetails copy={copy} />;
  return null;
}

export default function Privacy() {
  const { language, t } = useLanguage();
  const copy = getPrivacyPolicyContent(language);

  return (
    <div className="min-h-screen bg-white pt-20 lg:pt-24">
      <header className="bg-navy-800 py-12 lg:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <nav aria-label={copy.breadcrumbLabel} className="mb-5 text-sm text-white/60">
            <Link to="/" className="hover:text-white">{t("policy.home")}</Link>
            <span aria-hidden="true" className="mx-2">/</span>
            <span className="text-white">{copy.title}</span>
          </nav>
          <p className="mb-3 text-sm font-semibold uppercase text-orange-400">{copy.eyebrow}</p>
          <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{copy.title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-white/75 sm:text-lg">{copy.lead}</p>
          <p className="mt-4 text-sm text-white/50">{t("policy.lastUpdated", { date: copy.lastUpdated })}</p>
        </div>
      </header>

      <main>
        <section className="border-b border-gray-200 bg-white py-10">
          <div className="mx-auto max-w-3xl space-y-4 px-4 text-[15px] leading-7 text-gray-700 sm:px-6 sm:text-base lg:px-8">
            {copy.introduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>

        <section className="border-b border-gray-200 bg-gray-50 py-10" aria-labelledby="privacy-contents">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 id="privacy-contents" className="text-lg font-bold text-navy-800">{copy.contentsTitle}</h2>
            <nav aria-label={copy.contentsLabel} className="mt-5">
              <ol className="grid gap-x-10 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
                {copy.sections.map((item, index) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="group flex gap-2 py-1 text-gray-600 hover:text-navy-800">
                      <span className="w-6 shrink-0 tabular-nums text-gray-400 group-hover:text-orange-600">
                        {index + 1}.
                      </span>
                      <span>{item.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </section>

        <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          {copy.sections.map((item, index) => (
            <section
              key={item.id}
              id={item.id}
              className="scroll-mt-28 border-t border-gray-300 py-9 first:border-t-0 first:pt-0"
            >
              <p className="text-sm font-semibold uppercase text-orange-600">
                {copy.sectionLabel} {index + 1}
              </p>
              <h2 className="mt-1 text-xl font-bold text-navy-800 sm:text-2xl">{item.title}</h2>
              <div className="mt-5 space-y-4 text-[15px] leading-7 text-gray-700 sm:text-base">
                {item.blocks.map((block, blockIndex) => (
                  <PolicyBlock key={`${block[0]}-${blockIndex}`} block={block} copy={copy} />
                ))}
              </div>
            </section>
          ))}
        </article>
      </main>
    </div>
  );
}
