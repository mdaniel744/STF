import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from "./config.js";
import { PRODUCT_PERMALINKS as GENERATED_PRODUCT_PERMALINKS } from "./product-permalinks.generated.js";

const UNLOCALIZED_PATHS = ["/admin", "/login", "/register", "/forgot-password", "/reset-password"];

export const LOCALIZED_ROUTE_SEGMENTS = {
  containers: {
    nl: "containers",
    en: "containers",
    de: "container",
    fr: "conteneurs",
    es: "contenedores",
  },
  about: {
    nl: "over-ons",
    en: "about-us",
    de: "ueber-uns",
    fr: "a-propos",
    es: "sobre-nosotros",
  },
  faq: {
    nl: "veelgestelde-vragen",
    en: "faq",
    de: "haeufige-fragen",
    fr: "questions-frequentes",
    es: "preguntas-frecuentes",
  },
  contact: {
    nl: "contact",
    en: "contact",
    de: "kontakt",
    fr: "contact",
    es: "contacto",
  },
  cart: {
    nl: "winkelwagen",
    en: "cart",
    de: "warenkorb",
    fr: "panier",
    es: "carrito",
  },
  checkout: {
    nl: "afrekenen",
    en: "checkout",
    de: "kasse",
    fr: "paiement",
    es: "finalizar-compra",
  },
  privacy: {
    nl: "privacybeleid",
    en: "privacy-policy",
    de: "datenschutz",
    fr: "politique-de-confidentialite",
    es: "politica-de-privacidad",
  },
  terms: {
    nl: "algemene-voorwaarden",
    en: "terms-and-conditions",
    de: "allgemeine-geschaeftsbedingungen",
    fr: "conditions-generales",
    es: "terminos-y-condiciones",
  },
  cookies: {
    nl: "cookiebeleid",
    en: "cookie-policy",
    de: "cookie-richtlinie",
    fr: "politique-de-cookies",
    es: "politica-de-cookies",
  },
  "shipping-policy": {
    nl: "verzendbeleid",
    en: "shipping-policy",
    de: "versandrichtlinie",
    fr: "politique-de-livraison",
    es: "politica-de-envios",
  },
  "refund-policy": {
    nl: "retourbeleid",
    en: "refund-policy",
    de: "rueckgaberichtlinie",
    fr: "politique-de-remboursement",
    es: "politica-de-reembolso",
  },
  disclaimer: {
    nl: "disclaimer",
    en: "disclaimer",
    de: "haftungsausschluss",
    fr: "clause-de-non-responsabilite",
    es: "aviso-legal",
  },
};

// Generated at build time from live product/translation data - see
// scripts/generate-product-permalinks.mjs. Falls back to an empty array
// (handled gracefully by findProductPermalink below) if Supabase wasn't
// configured when the generator last ran.
export const PRODUCT_PERMALINKS = GENERATED_PRODUCT_PERMALINKS;

function splitPathSuffix(path) {
  const match = path.match(/^([^?#]*)(.*)$/);
  return {
    pathname: match?.[1] || "/",
    suffix: match?.[2] || "",
  };
}

function findProductPermalink(slugOrId) {
  return PRODUCT_PERMALINKS.find(
    (product) => product.id === slugOrId || Object.values(product.slugs).includes(slugOrId)
  );
}

function findRouteKey(segment) {
  if (segment in LOCALIZED_ROUTE_SEGMENTS) return segment;
  return Object.entries(LOCALIZED_ROUTE_SEGMENTS).find(([, localized]) =>
    Object.values(localized).includes(segment)
  )?.[0];
}

export function getLocalizedRouteKey(segment, language) {
  if (!segment || !SUPPORTED_LANGUAGES.includes(language)) return null;
  return Object.entries(LOCALIZED_ROUTE_SEGMENTS).find(
    ([, localized]) => localized[language] === segment
  )?.[0] || null;
}

export function hasLocalePrefix(path) {
  if (!path || typeof path !== "string") return false;
  const { pathname } = splitPathSuffix(path);
  const firstSegment = pathname.split("/").filter(Boolean)[0];
  return SUPPORTED_LANGUAGES.includes(firstSegment);
}

export function isUnlocalizedPath(path) {
  if (!path || typeof path !== "string") return false;
  const { pathname } = splitPathSuffix(path);
  return UNLOCALIZED_PATHS.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export function getLocalizedProductSlug(slugOrId, language) {
  if (!slugOrId) return slugOrId;
  const product = findProductPermalink(slugOrId);
  return product?.slugs[language] || product?.slugs[DEFAULT_LANGUAGE] || slugOrId;
}

export function getCanonicalProductSlug(slugOrId) {
  return getLocalizedProductSlug(slugOrId, DEFAULT_LANGUAGE);
}

export function localizePublicPath(path, targetLanguage) {
  if (!path || typeof path !== "string" || !path.startsWith("/")) return path;
  if (isUnlocalizedPath(path)) return path;

  const language = SUPPORTED_LANGUAGES.includes(targetLanguage)
    ? targetLanguage
    : DEFAULT_LANGUAGE;
  const { pathname, suffix } = splitPathSuffix(path);
  const segments = pathname.split("/").filter(Boolean);

  if (SUPPORTED_LANGUAGES.includes(segments[0])) {
    segments.shift();
  }

  if (segments.length === 0) {
    return `/${language}${suffix}`;
  }

  const routeKey = findRouteKey(segments[0]);
  if (routeKey) {
    segments[0] = LOCALIZED_ROUTE_SEGMENTS[routeKey][language];
    if (routeKey === "containers" && segments[1]) {
      segments[1] = getLocalizedProductSlug(segments[1], language);
    }
  }

  return `/${language}/${segments.join("/")}${suffix}`;
}

export function buildLegacyPermalinkRedirects() {
  const redirects = [];
  const seenSources = new Set();

  const addRedirect = (source, destination) => {
    if (source === destination || seenSources.has(source)) return;
    seenSources.add(source);
    redirects.push({ source, destination, permanent: true });
  };

  for (const language of SUPPORTED_LANGUAGES) {
    const containerSegment = LOCALIZED_ROUTE_SEGMENTS.containers[language];

    for (const product of PRODUCT_PERMALINKS) {
      const canonicalPath = `/${language}/${containerSegment}/${product.slugs[language]}`;
      const slugAliases = new Set([product.id, ...Object.values(product.slugs)]);
      const containerAliases = new Set(["containers", containerSegment]);

      for (const containerAlias of containerAliases) {
        for (const slugAlias of slugAliases) {
          addRedirect(`/${language}/${containerAlias}/${slugAlias}`, canonicalPath);
        }
      }
    }
  }

  for (const language of SUPPORTED_LANGUAGES) {
    for (const [routeKey, localized] of Object.entries(LOCALIZED_ROUTE_SEGMENTS)) {
      const localizedSegment = localized[language];
      if (localizedSegment === routeKey) continue;

      addRedirect(`/${language}/${routeKey}`, `/${language}/${localizedSegment}`);
      addRedirect(
        `/${language}/${routeKey}/:path*`,
        `/${language}/${localizedSegment}/:path*`
      );
    }
  }

  return redirects;
}
