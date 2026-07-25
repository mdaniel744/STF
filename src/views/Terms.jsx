import React from "react";
import PolicyPage from "@/components/PolicyPage";

export default function Terms() {
  return (
    <PolicyPage
      title="Algemene voorwaarden"
      lastUpdated="Juli 2026"
      sections={[
        { heading: "Inleiding", content: ["Deze algemene voorwaarden gelden voor het gebruik van de website van STF Container B.V. en voor alle offerteaanvragen die via de website worden ingediend.", "Door deze website te gebruiken gaat u akkoord met deze voorwaarden."] },
        { heading: "Bedrijfsgegevens", content: ["STF Container B.V. staat ingeschreven bij de Kamer van Koophandel onder nummer 97008370. Ons btw-nummer is NL867872020B01. Ons adres is Rembrandtlaan 49, 3723 BG Bilthoven, Nederland."] },
        { heading: "Offertes", content: ["Alle offertes van STF Container B.V. zijn 30 dagen geldig vanaf de offertedatum, tenzij anders vermeld.", "Offertes zijn gebaseerd op de door de klant aangeleverde informatie. STF Container B.V. mag offertes aanpassen wanneer gegevens onvolledig of onjuist zijn.", "Een offerte is geen bindend aanbod. Een overeenkomst ontstaat pas na schriftelijke bevestiging en aanvaarding van een bestelling door STF Container B.V."] },
        { heading: "Prijzen", content: ["Alle prijzen worden vermeld in euro (EUR) en zijn exclusief btw (21%), tenzij anders aangegeven.", "Prijzen kunnen wijzigen. Voor uw bestelling geldt de prijs uit de bevestigde offerte."] },
        { heading: "Levering", content: ["Levertijden zijn schattingen en hangen af van beschikbaarheid en logistiek. STF Container B.V. is niet aansprakelijk voor vertragingen buiten onze redelijke invloed.", "Levering vindt plaats op het door de klant opgegeven adres. De klant zorgt ervoor dat de afleverlocatie bereikbaar is."] },
        { heading: "Betaling", content: ["Betalingsvoorwaarden staan in uw offerte. Tenzij anders overeengekomen, is betaling verschuldigd binnen 14 dagen na factuurdatum.", "De goederen blijven eigendom van STF Container B.V. totdat volledige betaling is ontvangen."] },
        { heading: "Garantie", content: ["Nieuwe containers vallen onder de fabrieksgarantie. Gebruikte containers worden verkocht in de staat die op het moment van de offerte is beschreven, bijvoorbeeld WWT of One Trip.", "Garantieclaims moeten binnen 7 dagen na levering schriftelijk worden ingediend."] },
        { heading: "Aansprakelijkheid", content: ["STF Container B.V. is niet aansprakelijk voor indirecte schade of gevolgschade die voortvloeit uit het gebruik van containers.", "Onze totale aansprakelijkheid is beperkt tot de factuurwaarde van de geleverde goederen."] },
        { heading: "Toepasselijk recht", content: ["Op deze algemene voorwaarden is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter in Nederland."] },
      ]}
    />
  );
}
