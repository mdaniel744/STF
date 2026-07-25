import React from "react";
import PolicyPage from "@/components/PolicyPage";

export default function ShippingPolicy() {
  return (
    <PolicyPage
      title="Leveringsbeleid"
      lastUpdated="Juli 2026"
      sections={[
        { heading: "Leveringsgebied", content: ["STF Container B.V. levert zeecontainers in heel Nederland. Leveringen buiten Nederland zijn op aanvraag mogelijk."] },
        { heading: "Leveringsmethode", content: ["Containers worden geleverd met gespecialiseerd containertransport, zoals kiepwagen- of zijladersystemen.", "De klant moet zorgen dat de afleverlocatie bereikbaar is voor zwaar transport en voldoende ruimte biedt om te lossen."] },
        { heading: "Levertijden", content: ["Standaardlevering binnen Nederland vindt doorgaans plaats binnen 5-10 werkdagen na opdrachtbevestiging.", "Spoedlevering kan op aanvraag en tegen meerprijs beschikbaar zijn."] },
        { heading: "Leveringskosten", content: ["Leveringskosten worden berekend op basis van afleverlocatie, containergrootte en eventuele speciale losvereisten.", "De leveringskosten staan in uw offerte. Geef bij uw aanvraag aan wanneer u zelf transport wilt regelen."] },
        { heading: "Locatievereisten", content: ["De afleverlocatie moet een stevige, vlakke ondergrond hebben die het gewicht van de container en het voertuig kan dragen.", "Obstakels boven de plaatsingslocatie, zoals kabels of takken, moeten verwijderd zijn. De klant is verantwoordelijk voor voorbereiding van de locatie."] },
        { heading: "Controle bij levering", content: ["Wij vragen klanten de container bij levering te controleren. Zichtbare schade moet aan de chauffeur worden gemeld en voor ondertekening op de leveringsdocumenten worden genoteerd."] },
        { heading: "Contact", content: ["Heeft u vragen over levering? Neem contact op via info@stfcontainer.nl of +31 30 123 4567."] },
      ]}
    />
  );
}
