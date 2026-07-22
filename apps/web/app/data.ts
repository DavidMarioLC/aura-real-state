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

export const ACCENT_COLOR = "#a9834f";
export const CURRENCY = "USD" as const;

export const PROPERTIES: Property[] = [
  {
    id: "p1",
    title: "Residencia Los Encinos",
    city: "Ciudad de México",
    type: "Casa",
    price: 1250000,
    beds: 4,
    baths: 4,
    sqm: 380,
    description:
      "Casa contemporánea en Bosques de las Lomas con doble altura, terraza ajardinada y acabados de mármol travertino en toda la planta baja.",
    amenities: [
      "Jardín privado",
      "Alberca climatizada",
      "Cocina de autor",
      "Seguridad 24/7",
    ],
    agent: 0,
  },
  {
    id: "p2",
    title: "Villa Arboleda",
    city: "Guadalajara",
    type: "Villa",
    price: 980000,
    beds: 5,
    baths: 5,
    sqm: 420,
    description:
      "Villa de una planta en Puerta de Hierro, diseñada alrededor de un patio central con alberca y pérgola de madera certificada.",
    amenities: ["Patio central", "Alberca", "Cava", "Estudio anexo"],
    agent: 1,
  },
  {
    id: "p3",
    title: "Penthouse Marea",
    city: "Cancún",
    type: "Penthouse",
    price: 2100000,
    beds: 3,
    baths: 3,
    sqm: 260,
    description:
      "Penthouse frente al mar con terraza envolvente de 90 m², jacuzzi privado y vista panorámica a la Zona Hotelera.",
    amenities: [
      "Terraza con jacuzzi",
      "Vista al mar",
      "Roof garden",
      "Elevador privado",
    ],
    agent: 2,
  },
  {
    id: "p4",
    title: "Casa del Lago",
    city: "Valle de Bravo",
    type: "Casa",
    price: 1650000,
    beds: 4,
    baths: 3,
    sqm: 340,
    description:
      "Casa de piedra y madera a orillas del lago, con muelle privado, chimenea central y ventanales de piso a techo.",
    amenities: [
      "Muelle privado",
      "Chimenea",
      "Vista al lago",
      "Cuarto de huéspedes",
    ],
    agent: 3,
  },
  {
    id: "p5",
    title: "Loft Obsidiana",
    city: "Monterrey",
    type: "Departamento",
    price: 720000,
    beds: 2,
    baths: 2,
    sqm: 150,
    description:
      "Departamento tipo loft en San Pedro con concreto aparente, doble altura en sala y balcón hacia la Sierra Madre.",
    amenities: [
      "Balcón panorámico",
      "Gimnasio en edificio",
      "Concierge",
      "Estacionamiento doble",
    ],
    agent: 4,
  },
  {
    id: "p6",
    title: "Hacienda Santa Inés",
    city: "San Miguel de Allende",
    type: "Villa",
    price: 1890000,
    beds: 5,
    baths: 5,
    sqm: 480,
    description:
      "Antigua hacienda restaurada con cantera local, capilla privada, huerto y alberca de borde infinito frente al valle.",
    amenities: [
      "Alberca infinity",
      "Huerto orgánico",
      "Capilla privada",
      "Bodega de vinos",
    ],
    agent: 5,
  },
  {
    id: "p7",
    title: "Torre Cielo Penthouse",
    city: "Ciudad de México",
    type: "Penthouse",
    price: 2650000,
    beds: 3,
    baths: 3,
    sqm: 290,
    description:
      "Penthouse dúplex en Polanco con biblioteca de doble altura, terraza con asador y vista despejada al Bosque de Chapultepec.",
    amenities: [
      "Terraza con asador",
      "Biblioteca",
      "Home cinema",
      "Dos cajones de estacionamiento",
    ],
    agent: 0,
  },
  {
    id: "p8",
    title: "Casa Cantera",
    city: "Puebla",
    type: "Casa",
    price: 890000,
    beds: 3,
    baths: 3,
    sqm: 260,
    description:
      "Casa de una planta en Angelópolis con patio interior de cantera, cocina abierta y estudio con vista al jardín.",
    amenities: [
      "Patio interior",
      "Estudio",
      "Jardín trasero",
      "Cuarto de servicio",
    ],
    agent: 1,
  },
  {
    id: "p9",
    title: "Departamento Coral",
    city: "Cancún",
    type: "Departamento",
    price: 1050000,
    beds: 3,
    baths: 2,
    sqm: 210,
    description:
      "Departamento en primera línea de playa en Puerto Cancún, con acabados en madera clara y alberca compartida frente al mar.",
    amenities: [
      "Alberca frente al mar",
      "Marina cercana",
      "Balcón",
      "Seguridad privada",
    ],
    agent: 2,
  },
];

export const TEAM: TeamMember[] = [
  {
    id: "t1",
    name: "Renata Solórzano",
    role: "Fundadora & CEO",
    bio: "Dos décadas conectando familias con residencias que trascienden generaciones.",
    email: "renata@aura.mx",
  },
  {
    id: "t2",
    name: "Mariano Duarte",
    role: "Director de Ventas",
    bio: "Especialista en propiedades de playa y desarrollo turístico de alto nivel.",
    email: "mariano@aura.mx",
  },
  {
    id: "t3",
    name: "Camila Restrepo",
    role: "Asesora Senior",
    bio: "Enfocada en residencias históricas y proyectos de restauración patrimonial.",
    email: "camila@aura.mx",
  },
  {
    id: "t4",
    name: "Diego Farías",
    role: "Asesor de Propiedades",
    bio: "Acompaña a inversionistas en la búsqueda de residencias con potencial de plusvalía.",
    email: "diego@aura.mx",
  },
  {
    id: "t5",
    name: "Valentina Roy",
    role: "Gerente de Marketing",
    bio: "Diseña cada presentación de propiedad como una pieza editorial propia.",
    email: "valentina@aura.mx",
  },
  {
    id: "t6",
    name: "Ignacio Prieto",
    role: "Asesor Legal",
    bio: "Garantiza que cada transacción sea impecable, transparente y sin sorpresas.",
    email: "ignacio@aura.mx",
  },
];

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

export function getPropertyById(id: string): Property | undefined {
  return PROPERTIES.find((p) => p.id === id);
}

export function getAgent(property: Property): TeamMember {
  return TEAM[property.agent];
}
