import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEOHead from "@/components/SEOHead";
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from "@/lib/i18n/config";
import { translations } from "@/lib/i18n/translations";

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const activeLang = SUPPORTED_LANGUAGES.includes(lang) ? lang : DEFAULT_LANGUAGE;
  const t = translations[activeLang] || translations[DEFAULT_LANGUAGE];

  return {
    title: "STF Container B.V.",
    description: t.hero.description,
  };
}

export default async function LocaleLayout({ children, params }) {
  const { lang } = await params;
  if (!SUPPORTED_LANGUAGES.includes(lang)) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
