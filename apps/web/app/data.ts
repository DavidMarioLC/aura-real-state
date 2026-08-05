import type { Locale } from "@/i18n/routing";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  email: string;
};

/** The fields that change with the locale; the rest is shared across locales. */
type TeamMemberContent = Pick<TeamMember, "role" | "bio">;

type Translated<T, C> = Omit<T, keyof C> & { content: Record<Locale, C> };

export const ACCENT_COLOR = "#a9834f";
export const CURRENCY = "USD" as const;

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

export function getTeam(locale: Locale): TeamMember[] {
  return TEAM_RECORDS.map((m) => flatten(m, locale));
}

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
