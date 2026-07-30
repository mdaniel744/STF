import React from "react";
import Link from "@/components/LocalizedLink";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, ChevronRight, Mail, Phone } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { getFaqContent } from "@/data/faq-content";

const contactEmail = "contact@stfcontainer.com";

function Answer({ children }) {
  const parts = children.split(contactEmail);

  return parts.map((part, index) => (
    <React.Fragment key={`${part}-${index}`}>
      {part}
      {index < parts.length - 1 && (
        <a
          href={`mailto:${contactEmail}`}
          className="font-medium text-navy-800 underline decoration-orange-500 underline-offset-4 hover:text-orange-600"
        >
          {contactEmail}
        </a>
      )}
    </React.Fragment>
  ));
}

export default function FAQPage() {
  const { language } = useLanguage();
  const copy = getFaqContent(language);

  return (
    <div className="pt-20 lg:pt-24">
      <section className="bg-navy-800 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-12 bg-orange-500" />
            <span className="font-technical text-xs uppercase tracking-widest text-orange-400">
              {copy.label}
            </span>
          </div>
          <h1 className="mb-4 max-w-4xl text-4xl font-bold text-white lg:text-5xl">
            {copy.title}
          </h1>
          <p className="max-w-2xl text-white/70">{copy.description}</p>
        </div>
      </section>

      <div className="bg-gray-50 py-12 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="mb-10 flex items-center gap-2 text-sm text-gray-500"
          >
            <Link to="/" className="transition-colors hover:text-navy-800">
              {copy.home}
            </Link>
            <ChevronRight aria-hidden="true" className="h-3 w-3 shrink-0" />
            <span className="font-medium text-navy-800">{copy.breadcrumb}</span>
          </nav>

          <div className="space-y-12">
            {copy.groups.map((group, groupIndex) => (
              <section key={group.title} aria-labelledby={`faq-group-${groupIndex}`}>
                <div className="mb-5 flex items-end justify-between gap-4 border-b border-gray-200 pb-3">
                  <h2
                    id={`faq-group-${groupIndex}`}
                    className="text-xl font-bold text-navy-800 sm:text-2xl"
                  >
                    {group.title}
                  </h2>
                  <span className="shrink-0 font-technical text-xs text-gray-500">
                    {String(group.items.length).padStart(2, "0")}
                  </span>
                </div>

                <Accordion type="single" collapsible className="space-y-3">
                  {group.items.map(([question, answer], itemIndex) => (
                    <AccordionItem
                      key={question}
                      value={`${groupIndex}-${itemIndex}`}
                      className="rounded-md border border-gray-200 bg-white px-4 shadow-sm sm:px-5"
                    >
                      <AccordionTrigger className="gap-4 py-5 text-left text-base font-semibold leading-snug text-navy-800 hover:no-underline">
                        {question}
                      </AccordionTrigger>
                      <AccordionContent className="max-w-3xl pb-5 pr-7 text-[15px] leading-7 text-gray-600">
                        <Answer>{answer}</Answer>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            ))}
          </div>
        </div>

        <section className="mt-16 border-y border-navy-700 bg-navy-800">
          <div className="mx-auto flex max-w-7xl flex-col gap-7 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-12">
            <div className="max-w-2xl">
              <h2 className="mb-2 text-2xl font-bold text-white">
                {copy.contactTitle}
              </h2>
              <p className="leading-relaxed text-white/70">{copy.contactText}</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
              <Link
                to="/contact"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-orange-500 px-5 py-3 font-semibold text-navy-950 transition-colors hover:bg-orange-400"
              >
                {copy.contactButton}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <a
                href={`mailto:${contactEmail}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/25 px-5 py-3 font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/10"
              >
                <Mail aria-hidden="true" className="h-4 w-4" />
                {copy.emailButton}
              </a>
              <a
                href="tel:+3154546565"
                aria-label="+31 545465 65"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/25 px-5 py-3 font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/10"
              >
                <Phone aria-hidden="true" className="h-4 w-4" />
                +31 545465 65
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
