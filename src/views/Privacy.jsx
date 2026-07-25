import React from "react";
import PolicyPage from "@/components/PolicyPage";

export default function Privacy() {
  return (
    <PolicyPage
      title="Privacyverklaring"
      lastUpdated="Juli 2026"
      sections={[
        { heading: "Inleiding", content: ["STF Container B.V. (KvK: 97008370), gevestigd aan Rembrandtlaan 49, 3723 BG Bilthoven, Nederland, respecteert uw privacy en beschermt persoonsgegevens volgens de Algemene verordening gegevensbescherming (AVG).", "Deze privacyverklaring legt uit welke persoonsgegevens wij verzamelen, gebruiken, bewaren en beveiligen wanneer u onze website bezoekt of een offerte aanvraagt."] },
        { heading: "Welke gegevens wij verzamelen", content: ["Wanneer u een offerteaanvraag of contactformulier verstuurt, verzamelen wij uw naam, bedrijfsnaam, e-mailadres, telefoonnummer, afleveradres, postcode en het bericht dat u opgeeft.", "Daarnaast kunnen wij technische gegevens verzamelen, zoals IP-adres, browsertype en bezochte pagina's via cookies en vergelijkbare technologieen."] },
        { heading: "Hoe wij uw gegevens gebruiken", content: ["Wij gebruiken persoonsgegevens om offerteaanvragen te verwerken, klantenservice te bieden, containerleveringen te organiseren, met u te communiceren over uw aanvraag en te voldoen aan wettelijke verplichtingen.", "Wij verkopen uw persoonsgegevens niet aan derden."] },
        { heading: "Rechtsgrond", content: ["Wij verwerken persoonsgegevens op basis van toestemming, uitvoering van een overeenkomst of precontractuele maatregelen, wettelijke verplichtingen en onze gerechtvaardigde bedrijfsbelangen."] },
        { heading: "Bewaartermijn", content: ["Wij bewaren persoonsgegevens niet langer dan nodig is voor de genoemde doelen en volgens wettelijke bewaarplichten. Offerteaanvragen bewaren wij doorgaans tot 24 maanden na het laatste contact."] },
        { heading: "Uw rechten", content: ["U heeft recht op inzage, correctie, verwijdering, beperking van verwerking, overdraagbaarheid van gegevens, bezwaar tegen verwerking en intrekking van toestemming.", "Neem voor het uitoefenen van deze rechten contact met ons op via info@stfcontainer.nl."] },
        { heading: "Gegevensbeveiliging", content: ["Wij nemen passende technische en organisatorische maatregelen om persoonsgegevens te beschermen tegen ongeoorloofde toegang, verlies of vernietiging."] },
        { heading: "Contact", content: ["Heeft u vragen over deze privacyverklaring of over uw persoonsgegevens? Neem contact op via info@stfcontainer.nl of +31 30 123 4567."] },
      ]}
    />
  );
}
