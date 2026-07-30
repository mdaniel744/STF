import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from "./config.js";

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

export const PRODUCT_PERMALINKS = [
  {
    id: "default-20ft-standard-new",
    slugs: {
      nl: "20ft-standaard-zeecontainer-nieuw",
      en: "20ft-standard-shipping-container-new",
      de: "20ft-standard-seecontainer-neu",
      fr: "conteneur-maritime-standard-20ft-neuf",
      es: "contenedor-maritimo-estandar-20ft-nuevo",
    },
  },
  {
    id: "default-40ft-standard-used",
    slugs: {
      nl: "40ft-standaard-container-gebruikt",
      en: "40ft-standard-container-used",
      de: "40ft-standard-container-gebraucht",
      fr: "conteneur-standard-40ft-occasion",
      es: "contenedor-estandar-40ft-usado",
    },
  },
  {
    id: "default-40ft-high-cube-one-trip",
    slugs: {
      nl: "40ft-high-cube-one-trip-container",
      en: "40ft-high-cube-one-trip-container",
      de: "40ft-high-cube-one-trip-container",
      fr: "conteneur-high-cube-40ft-one-trip",
      es: "contenedor-high-cube-40ft-one-trip",
    },
  },
  {
    id: "default-20ft-open-side-one-trip",
    slugs: {
      nl: "20ft-open-side-container-one-trip",
      en: "20ft-open-side-container-one-trip",
      de: "20ft-open-side-container-one-trip",
      fr: "conteneur-open-side-20ft-one-trip",
      es: "contenedor-open-side-20ft-one-trip",
    },
  },
  {
    id: "default-20ft-office-container",
    slugs: {
      nl: "20ft-kantoorcontainer-instapklaar",
      en: "20ft-office-container-ready-to-use",
      de: "20ft-buerocontainer-einsatzbereit",
      fr: "conteneur-bureau-20ft-pret-a-emploi",
      es: "contenedor-oficina-20ft-listo-para-usar",
    },
  },
  {
    id: "default-10ft-storage-container",
    slugs: {
      nl: "10ft-opslagcontainer-compact",
      en: "10ft-compact-storage-container",
      de: "10ft-kompakter-lagercontainer",
      fr: "conteneur-de-stockage-compact-10ft",
      es: "contenedor-de-almacenamiento-compacto-10ft",
    },
  },
  {
    id: "default-20ft-refrigerated-container",
    slugs: {
      nl: "20ft-koelcontainer-gebruikt",
      en: "20ft-used-refrigerated-container",
      de: "20ft-gebrauchter-kuehlcontainer",
      fr: "conteneur-frigorifique-20ft-occasion",
      es: "contenedor-refrigerado-20ft-usado",
    },
  },
  {
    id: "default-40ft-storage-wwt",
    slugs: {
      nl: "40ft-opslagcontainer-wwt",
      en: "40ft-wwt-storage-container",
      de: "40ft-wwt-lagercontainer",
      fr: "conteneur-de-stockage-wwt-40ft",
      es: "contenedor-de-almacenamiento-wwt-40ft",
    },
  },
];

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
