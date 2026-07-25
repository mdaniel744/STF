import React from "react";
import PolicyPage from "@/components/PolicyPage";

export default function RefundPolicy() {
  return (
    <PolicyPage
      title="Retour- en restitutiebeleid"
      lastUpdated="Juli 2026"
      sections={[
        { heading: "Retourtermijn", content: ["Omdat zeecontainers grote industriele goederen zijn, beoordelen wij retouren per geval. Elke retour moet binnen 7 dagen na levering schriftelijk met STF Container B.V. worden overeengekomen."] },
        { heading: "Staat van retourgoederen", content: ["Containers moeten in dezelfde staat worden geretourneerd als waarin zij zijn geleverd. De klant betaalt de kosten van retourtransport, tenzij de retour het gevolg is van een gebrek dat onder garantie valt."] },
        { heading: "Restituties", content: ["Goedgekeurde restituties worden binnen 14 werkdagen na ontvangst van de geretourneerde container in acceptabele staat verwerkt via de oorspronkelijke betaalmethode.", "Op restituties kan een herbevoorradingsvergoeding van maximaal 15% van de aankoopprijs van toepassing zijn."] },
        { heading: "Beschadigde of gebrekkige goederen", content: ["Als een container beschadigd of niet zoals beschreven wordt geleverd, neem dan binnen 48 uur na levering contact met ons op. Wij regelen een controle en passende oplossing, zoals reparatie, vervanging of restitutie."] },
        { heading: "Annuleringen", content: ["Bestellingen kunnen kosteloos worden geannuleerd voordat verzending heeft plaatsgevonden. Zodra een container is verzonden, kunnen transport- en behandelingskosten in rekening worden gebracht."] },
        { heading: "Contact", content: ["Voor retour- of restitutieverzoeken kunt u contact opnemen via info@stfcontainer.nl of +31 30 123 4567."] },
      ]}
    />
  );
}
