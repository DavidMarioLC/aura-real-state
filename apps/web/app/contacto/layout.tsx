import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contáctanos",
  description:
    "Escríbenos y un asesor de Aura te contactará en menos de 24 horas. Oficina en Polanco, Ciudad de México.",
  alternates: { canonical: "/contacto" },
  openGraph: {
    title: "Contáctanos — Aura",
    description:
      "Escríbenos y un asesor de Aura te contactará en menos de 24 horas.",
    url: "/contacto",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
