import test from "node:test";
import assert from "node:assert/strict";
import {
  buildLegacyPermalinkRedirects,
  getCanonicalProductSlug,
  getLocalizedProductSlug,
  getLocalizedRouteKey,
  localizePublicPath,
} from "../src/lib/i18n/permalinks.js";

test("localizes public page routes and retains URL state", () => {
  assert.equal(localizePublicPath("/faq", "nl"), "/nl/veelgestelde-vragen");
  assert.equal(localizePublicPath("/nl/veelgestelde-vragen", "de"), "/de/haeufige-fragen");
  assert.equal(localizePublicPath("/en/about-us", "fr"), "/fr/a-propos");
  assert.equal(
    localizePublicPath("/nl/containers?size=20ft#products", "es"),
    "/es/contenedores?size=20ft#products"
  );
});

test("localizes known product slugs in both directions", () => {
  const dutchSlug = "20ft-standaard-zeecontainer-nieuw";
  const englishSlug = "20ft-standard-shipping-container";
  const germanSlug = "20-fu-standard-frachtcontainer";

  assert.equal(getLocalizedProductSlug(dutchSlug, "en"), englishSlug);
  assert.equal(getLocalizedProductSlug(englishSlug, "de"), germanSlug);
  assert.equal(getCanonicalProductSlug(germanSlug), dutchSlug);
  assert.equal(
    localizePublicPath(`/nl/containers/${dutchSlug}`, "fr"),
    "/fr/conteneurs/conteneur-d-exp-dition-standard-de-20-pieds"
  );
});

test("leaves unknown product slugs stable while translating the section", () => {
  assert.equal(
    localizePublicPath("/en/containers/customer-defined-product", "de"),
    "/de/container/customer-defined-product"
  );
});

test("resolves localized route handlers and redirects legacy URLs", () => {
  const redirects = buildLegacyPermalinkRedirects();

  assert.equal(getLocalizedRouteKey("conteneurs", "fr"), "containers");
  assert.equal(getLocalizedRouteKey("preguntas-frecuentes", "es"), "faq");
  assert.equal(getLocalizedRouteKey("preguntas-frecuentes", "de"), null);
  assert.ok(
    redirects.some(
      ({ source, destination, permanent }) =>
        source === "/de/containers/20ft-standaard-zeecontainer-nieuw" &&
        destination === "/de/container/20-fu-standard-frachtcontainer" &&
        permanent
    )
  );
  assert.ok(
    redirects.some(
      ({ source, destination }) =>
        source === "/nl/faq" && destination === "/nl/veelgestelde-vragen"
    )
  );
});
