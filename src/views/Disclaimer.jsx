import React from "react";
import PolicyPage from "@/components/PolicyPage";

export default function Disclaimer() {
  return (
    <PolicyPage
      title="Disclaimer"
      lastUpdated="Juli 2026"
      sections={[
        { heading: "Website-informatie", content: ["De informatie op deze website is bedoeld voor algemene informatiedoeleinden. STF Container B.V. doet haar best om informatie correct en actueel te houden, maar geeft geen garantie op volledigheid, juistheid of betrouwbaarheid."] },
        { heading: "Productinformatie", content: ["Containerspecificaties, afmetingen en gewichten worden als benaderingen vermeld en kunnen afwijken. Werkelijke specificaties kunnen verschillen per fabrikant en productiebatch.", "De beschikbaarheid van containers kan veranderen. Neem contact met ons op om actuele voorraad te bevestigen voordat u bestelt."] },
        { heading: "Foto's", content: ["Productafbeeldingen op deze website zijn representatief en tonen mogelijk niet exact de container die u ontvangt. Kleur, staat en uiterlijk kunnen afwijken."] },
        { heading: "Externe links", content: ["Deze website kan links naar externe websites bevatten. STF Container B.V. is niet verantwoordelijk voor de inhoud of privacypraktijken van deze externe websites."] },
        { heading: "Aansprakelijkheid", content: ["STF Container B.V. is niet aansprakelijk voor directe, indirecte, incidentele of gevolgschade die voortvloeit uit het gebruik van deze website of de daarin opgenomen informatie."] },
        { heading: "Contact", content: ["Heeft u vragen over deze disclaimer? Neem contact op via info@stfcontainer.nl."] },
      ]}
    />
  );
}
