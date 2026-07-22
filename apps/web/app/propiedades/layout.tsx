import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Propiedades", template: "%s · Aura" },
  description:
    "Explora nuestro portafolio vigente de residencias, villas, penthouses y departamentos, filtrado por ubicación, tipo, precio y habitaciones.",
  alternates: { canonical: "/propiedades" },
  openGraph: {
    title: "Propiedades — Aura",
    description:
      "Explora nuestro portafolio vigente de residencias, villas, penthouses y departamentos.",
    url: "/propiedades",
  },
};

export default function PropertiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
