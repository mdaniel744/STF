export const productLabelMaps = {
  nl: {
    condition: {
      New: "Nieuw",
      Used: "Gebruikt",
      "One Trip": "One Trip",
      WWT: "Wind- en waterdicht",
    },
    availability: {
      "In Stock": "Op voorraad",
      "Out of Stock": "Niet op voorraad",
      "On Request": "Op aanvraag",
      "Pre-Order": "Pre-order",
    },
    color: {
      Blue: "Blauw",
      Grey: "Grijs",
      Green: "Groen",
      White: "Wit",
      Red: "Rood",
      Brown: "Bruin",
    },
    type: {
      Standard: "Standaard",
      "High Cube": "High Cube",
      "Open Side": "Open Side",
      Office: "Kantoor",
      Storage: "Opslag",
      Refrigerated: "Gekoeld",
    },
  },
  en: {
    condition: {
      New: "New",
      Used: "Used",
      "One Trip": "One Trip",
      WWT: "Wind and watertight",
    },
    availability: {
      "In Stock": "In Stock",
      "Out of Stock": "Out of Stock",
      "On Request": "On Request",
      "Pre-Order": "Pre-Order",
    },
    color: {
      Blue: "Blue",
      Grey: "Grey",
      Green: "Green",
      White: "White",
      Red: "Red",
      Brown: "Brown",
    },
    type: {
      Standard: "Standard",
      "High Cube": "High Cube",
      "Open Side": "Open Side",
      Office: "Office",
      Storage: "Storage",
      Refrigerated: "Refrigerated",
    },
  },
  fr: {
    condition: {
      New: "Neuf",
      Used: "Occasion",
      "One Trip": "One Trip",
      WWT: "Étanche au vent et à l'eau",
    },
    availability: {
      "In Stock": "En stock",
      "Out of Stock": "Rupture de stock",
      "On Request": "Sur demande",
      "Pre-Order": "Précommande",
    },
    color: {
      Blue: "Bleu",
      Grey: "Gris",
      Green: "Vert",
      White: "Blanc",
      Red: "Rouge",
      Brown: "Marron",
    },
    type: {
      Standard: "Standard",
      "High Cube": "High Cube",
      "Open Side": "Ouverture latérale",
      Office: "Bureau",
      Storage: "Stockage",
      Refrigerated: "Réfrigéré",
    },
  },
  de: {
    condition: {
      New: "Neu",
      Used: "Gebraucht",
      "One Trip": "One Trip",
      WWT: "Wind- & Wasserdicht",
    },
    availability: {
      "In Stock": "Auf Lager",
      "Out of Stock": "Nicht auf Lager",
      "On Request": "Auf Anfrage",
      "Pre-Order": "Vorbestellung",
    },
    color: {
      Blue: "Blau",
      Grey: "Grau",
      Green: "Grün",
      White: "Weiß",
      Red: "Rot",
      Brown: "Braun",
    },
    type: {
      Standard: "Standard",
      "High Cube": "High Cube",
      "Open Side": "Open Side",
      Office: "Büro",
      Storage: "Lager",
      Refrigerated: "Kühlcontainer",
    },
  },
  es: {
    condition: {
      New: "Nuevo",
      Used: "Usado",
      "One Trip": "One Trip",
      WWT: "Hermético al viento y al agua",
    },
    availability: {
      "In Stock": "En stock",
      "Out of Stock": "Sin stock",
      "On Request": "A pedido",
      "Pre-Order": "Prepedido",
    },
    color: {
      Blue: "Azul",
      Grey: "Gris",
      Green: "Verde",
      White: "Blanco",
      Red: "Rojo",
      Brown: "Marrón",
    },
    type: {
      Standard: "Estándar",
      "High Cube": "High Cube",
      "Open Side": "Apertura lateral",
      Office: "Oficina",
      Storage: "Almacenamiento",
      Refrigerated: "Refrigerado",
    },
  },
};

export function displayProductLabel(language, group, value) {
  return productLabelMaps[language]?.[group]?.[value] || value;
}
