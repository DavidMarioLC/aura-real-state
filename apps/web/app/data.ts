import type { Locale } from "@/i18n/routing";

export type Property = {
  id: string;
  title: string;
  city: string;
  type: string;
  price: number;
  beds: number;
  baths: number;
  sqm: number;
  description: string;
  amenities: string[];
  agent: number;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  email: string;
};

/** The fields that change with the locale; the rest is shared across locales. */
type PropertyContent = Pick<
  Property,
  "title" | "city" | "type" | "description" | "amenities"
>;
type TeamMemberContent = Pick<TeamMember, "role" | "bio">;

type Translated<T, C> = Omit<T, keyof C> & { content: Record<Locale, C> };

export const ACCENT_COLOR = "#a9834f";
export const CURRENCY = "USD" as const;

const PROPERTY_RECORDS: Translated<Property, PropertyContent>[] = [
  {
    id: "p1",
    price: 1250000,
    beds: 4,
    baths: 4,
    sqm: 380,
    agent: 0,
    content: {
      es: {
        title: "Residencia Los Encinos",
        city: "Ciudad de México",
        type: "Casa",
        description:
          "Casa contemporánea en Bosques de las Lomas con doble altura, terraza ajardinada y acabados de mármol travertino en toda la planta baja.",
        amenities: [
          "Jardín privado",
          "Alberca climatizada",
          "Cocina de autor",
          "Seguridad 24/7",
        ],
      },
      en: {
        title: "Los Encinos Residence",
        city: "Mexico City",
        type: "House",
        description:
          "Contemporary house in Bosques de las Lomas with double-height ceilings, a landscaped terrace and travertine marble finishes throughout the ground floor.",
        amenities: [
          "Private garden",
          "Heated pool",
          "Designer kitchen",
          "24/7 security",
        ],
      },
    },
  },
  {
    id: "p2",
    price: 980000,
    beds: 5,
    baths: 5,
    sqm: 420,
    agent: 1,
    content: {
      es: {
        title: "Villa Arboleda",
        city: "Guadalajara",
        type: "Villa",
        description:
          "Villa de una planta en Puerta de Hierro, diseñada alrededor de un patio central con alberca y pérgola de madera certificada.",
        amenities: ["Patio central", "Alberca", "Cava", "Estudio anexo"],
      },
      en: {
        title: "Villa Arboleda",
        city: "Guadalajara",
        type: "Villa",
        description:
          "Single-storey villa in Puerta de Hierro, designed around a central courtyard with a pool and a certified-timber pergola.",
        amenities: [
          "Central courtyard",
          "Pool",
          "Wine cellar",
          "Detached study",
        ],
      },
    },
  },
  {
    id: "p3",
    price: 2100000,
    beds: 3,
    baths: 3,
    sqm: 260,
    agent: 2,
    content: {
      es: {
        title: "Penthouse Marea",
        city: "Cancún",
        type: "Penthouse",
        description:
          "Penthouse frente al mar con terraza envolvente de 90 m², jacuzzi privado y vista panorámica a la Zona Hotelera.",
        amenities: [
          "Terraza con jacuzzi",
          "Vista al mar",
          "Roof garden",
          "Elevador privado",
        ],
      },
      en: {
        title: "Marea Penthouse",
        city: "Cancún",
        type: "Penthouse",
        description:
          "Beachfront penthouse with a 90 m² wraparound terrace, private jacuzzi and panoramic views over the Hotel Zone.",
        amenities: [
          "Terrace with jacuzzi",
          "Sea view",
          "Roof garden",
          "Private lift",
        ],
      },
    },
  },
  {
    id: "p4",
    price: 1650000,
    beds: 4,
    baths: 3,
    sqm: 340,
    agent: 3,
    content: {
      es: {
        title: "Casa del Lago",
        city: "Valle de Bravo",
        type: "Casa",
        description:
          "Casa de piedra y madera a orillas del lago, con muelle privado, chimenea central y ventanales de piso a techo.",
        amenities: [
          "Muelle privado",
          "Chimenea",
          "Vista al lago",
          "Cuarto de huéspedes",
        ],
      },
      en: {
        title: "Casa del Lago",
        city: "Valle de Bravo",
        type: "House",
        description:
          "Stone and timber house on the lakeshore, with a private dock, central fireplace and floor-to-ceiling windows.",
        amenities: ["Private dock", "Fireplace", "Lake view", "Guest room"],
      },
    },
  },
  {
    id: "p5",
    price: 720000,
    beds: 2,
    baths: 2,
    sqm: 150,
    agent: 4,
    content: {
      es: {
        title: "Loft Obsidiana",
        city: "Monterrey",
        type: "Departamento",
        description:
          "Departamento tipo loft en San Pedro con concreto aparente, doble altura en sala y balcón hacia la Sierra Madre.",
        amenities: [
          "Balcón panorámico",
          "Gimnasio en edificio",
          "Concierge",
          "Estacionamiento doble",
        ],
      },
      en: {
        title: "Obsidiana Loft",
        city: "Monterrey",
        type: "Apartment",
        description:
          "Loft-style apartment in San Pedro with exposed concrete, a double-height living room and a balcony facing the Sierra Madre.",
        amenities: [
          "Panoramic balcony",
          "Building gym",
          "Concierge",
          "Double parking",
        ],
      },
    },
  },
  {
    id: "p6",
    price: 1890000,
    beds: 5,
    baths: 5,
    sqm: 480,
    agent: 5,
    content: {
      es: {
        title: "Hacienda Santa Inés",
        city: "San Miguel de Allende",
        type: "Villa",
        description:
          "Antigua hacienda restaurada con cantera local, capilla privada, huerto y alberca de borde infinito frente al valle.",
        amenities: [
          "Alberca infinity",
          "Huerto orgánico",
          "Capilla privada",
          "Bodega de vinos",
        ],
      },
      en: {
        title: "Hacienda Santa Inés",
        city: "San Miguel de Allende",
        type: "Villa",
        description:
          "Restored colonial hacienda in local quarry stone, with a private chapel, orchard and infinity pool overlooking the valley.",
        amenities: [
          "Infinity pool",
          "Organic orchard",
          "Private chapel",
          "Wine cellar",
        ],
      },
    },
  },
  {
    id: "p7",
    price: 2650000,
    beds: 3,
    baths: 3,
    sqm: 290,
    agent: 0,
    content: {
      es: {
        title: "Torre Cielo Penthouse",
        city: "Ciudad de México",
        type: "Penthouse",
        description:
          "Penthouse dúplex en Polanco con biblioteca de doble altura, terraza con asador y vista despejada al Bosque de Chapultepec.",
        amenities: [
          "Terraza con asador",
          "Biblioteca",
          "Home cinema",
          "Dos cajones de estacionamiento",
        ],
      },
      en: {
        title: "Torre Cielo Penthouse",
        city: "Mexico City",
        type: "Penthouse",
        description:
          "Duplex penthouse in Polanco with a double-height library, a terrace with grill and unobstructed views over Chapultepec Park.",
        amenities: [
          "Terrace with grill",
          "Library",
          "Home cinema",
          "Two parking spaces",
        ],
      },
    },
  },
  {
    id: "p8",
    price: 890000,
    beds: 3,
    baths: 3,
    sqm: 260,
    agent: 1,
    content: {
      es: {
        title: "Casa Cantera",
        city: "Puebla",
        type: "Casa",
        description:
          "Casa de una planta en Angelópolis con patio interior de cantera, cocina abierta y estudio con vista al jardín.",
        amenities: [
          "Patio interior",
          "Estudio",
          "Jardín trasero",
          "Cuarto de servicio",
        ],
      },
      en: {
        title: "Casa Cantera",
        city: "Puebla",
        type: "House",
        description:
          "Single-storey house in Angelópolis with a quarry-stone inner courtyard, open kitchen and a study overlooking the garden.",
        amenities: ["Inner courtyard", "Study", "Back garden", "Utility room"],
      },
    },
  },
  {
    id: "p9",
    price: 1050000,
    beds: 3,
    baths: 2,
    sqm: 210,
    agent: 2,
    content: {
      es: {
        title: "Departamento Coral",
        city: "Cancún",
        type: "Departamento",
        description:
          "Departamento en primera línea de playa en Puerto Cancún, con acabados en madera clara y alberca compartida frente al mar.",
        amenities: [
          "Alberca frente al mar",
          "Marina cercana",
          "Balcón",
          "Seguridad privada",
        ],
      },
      en: {
        title: "Coral Apartment",
        city: "Cancún",
        type: "Apartment",
        description:
          "Beachfront apartment in Puerto Cancún, with pale-wood finishes and a shared pool facing the sea.",
        amenities: [
          "Beachfront pool",
          "Marina nearby",
          "Balcony",
          "Private security",
        ],
      },
    },
  },
];

const TEAM_RECORDS: Translated<TeamMember, TeamMemberContent>[] = [
  {
    id: "t1",
    name: "Renata Solórzano",
    email: "renata@aura.mx",
    content: {
      es: {
        role: "Fundadora & CEO",
        bio: "Dos décadas conectando familias con residencias que trascienden generaciones.",
      },
      en: {
        role: "Founder & CEO",
        bio: "Two decades connecting families with residences that outlast generations.",
      },
    },
  },
  {
    id: "t2",
    name: "Mariano Duarte",
    email: "mariano@aura.mx",
    content: {
      es: {
        role: "Director de Ventas",
        bio: "Especialista en propiedades de playa y desarrollo turístico de alto nivel.",
      },
      en: {
        role: "Head of Sales",
        bio: "Specialist in beachfront property and high-end resort development.",
      },
    },
  },
  {
    id: "t3",
    name: "Camila Restrepo",
    email: "camila@aura.mx",
    content: {
      es: {
        role: "Asesora Senior",
        bio: "Enfocada en residencias históricas y proyectos de restauración patrimonial.",
      },
      en: {
        role: "Senior Advisor",
        bio: "Focused on historic residences and heritage restoration projects.",
      },
    },
  },
  {
    id: "t4",
    name: "Diego Farías",
    email: "diego@aura.mx",
    content: {
      es: {
        role: "Asesor de Propiedades",
        bio: "Acompaña a inversionistas en la búsqueda de residencias con potencial de plusvalía.",
      },
      en: {
        role: "Property Advisor",
        bio: "Guides investors towards residences with strong appreciation potential.",
      },
    },
  },
  {
    id: "t5",
    name: "Valentina Roy",
    email: "valentina@aura.mx",
    content: {
      es: {
        role: "Gerente de Marketing",
        bio: "Diseña cada presentación de propiedad como una pieza editorial propia.",
      },
      en: {
        role: "Marketing Manager",
        bio: "Designs every property presentation as an editorial piece in its own right.",
      },
    },
  },
  {
    id: "t6",
    name: "Ignacio Prieto",
    email: "ignacio@aura.mx",
    content: {
      es: {
        role: "Asesor Legal",
        bio: "Garantiza que cada transacción sea impecable, transparente y sin sorpresas.",
      },
      en: {
        role: "Legal Counsel",
        bio: "Makes sure every transaction is flawless, transparent and free of surprises.",
      },
    },
  },
];

function flatten<T, C>(record: Translated<T, C>, locale: Locale): T {
  const { content, ...shared } = record;
  return { ...shared, ...content[locale] } as T;
}

export function getProperties(locale: Locale): Property[] {
  return PROPERTY_RECORDS.map((p) => flatten(p, locale));
}

export function getTeam(locale: Locale): TeamMember[] {
  return TEAM_RECORDS.map((m) => flatten(m, locale));
}

/** Ids are locale-independent, so `generateStaticParams` can use them directly. */
export const PROPERTY_IDS = PROPERTY_RECORDS.map((p) => p.id);

export function fmtPrice(n: number, currency: string = CURRENCY): string {
  if (currency === "MXN") {
    const v = Math.round(n * 18.5);
    return `MX$${v.toLocaleString("es-MX")}`;
  }
  return `$${n.toLocaleString("en-US")} USD`;
}

export function bucketOf(price: number): "b1" | "b2" | "b3" | "b4" {
  if (price <= 900000) return "b1";
  if (price <= 1500000) return "b2";
  if (price <= 2500000) return "b3";
  return "b4";
}

export function getPropertyById(
  id: string,
  locale: Locale,
): Property | undefined {
  const record = PROPERTY_RECORDS.find((p) => p.id === id);
  return record && flatten(record, locale);
}

export function getAgent(property: Property, locale: Locale): TeamMember {
  return flatten(TEAM_RECORDS[property.agent], locale);
}
