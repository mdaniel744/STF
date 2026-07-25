import React from "react";
import PolicyPage from "@/components/PolicyPage";

export default function Cookies() {
  return (
    <PolicyPage
      title="Cookiebeleid"
      lastUpdated="Juli 2026"
      sections={[
        { heading: "Wat zijn cookies?", content: ["Cookies zijn kleine tekstbestanden die op uw apparaat worden opgeslagen wanneer u een website bezoekt. Ze helpen de website acties en voorkeuren tijdelijk te onthouden."] },
        { heading: "Welke cookies wij gebruiken", content: ["Noodzakelijke cookies: deze zijn nodig voor het functioneren van de website en kunnen niet worden uitgeschakeld.", "Analytische cookies: deze helpen ons begrijpen hoe bezoekers de website gebruiken, zodat wij de site kunnen verbeteren.", "Functionele cookies: deze bewaren voorkeuren zoals geselecteerde filters."] },
        { heading: "Cookies beheren", content: ["U kunt cookies beheren en verwijderen via uw browserinstellingen. Het uitschakelen van bepaalde cookies kan invloed hebben op de werking van de website.", "Meer informatie vindt u in de helpsectie van uw browser."] },
        { heading: "Cookies van derden", content: ["Wij kunnen diensten van derden gebruiken, zoals Google Maps of analysetools, die eigen cookies plaatsen. Deze partijen beheren hun eigen cookiebeleid."] },
        { heading: "Contact", content: ["Heeft u vragen over ons cookiebeleid? Neem contact op via info@stfcontainer.nl."] },
      ]}
    />
  );
}
