import type { Metadata } from "next";
import Image from "next/image";
import { TEAM } from "../data";

export const metadata: Metadata = {
  title: "Equipo",
  description:
    "Conoce al equipo de asesores de Aura: un grupo pequeño y especializado dedicado a acompañar cada transacción inmobiliaria con discreción y cercanía.",
  alternates: { canonical: "/equipo" },
  openGraph: {
    title: "Equipo — Aura",
    description: "Conoce al equipo de asesores de Aura.",
    url: "/equipo",
  },
};

export default function TeamPage() {
  return (
    <div>
      <div className="mx-auto max-w-[1400px] px-8 pt-20 pb-15 lg:px-16">
        <p className="mb-4 text-[13px] font-bold tracking-[2px] text-[#a9834f] uppercase">
          Quiénes somos
        </p>
        <h1 className="mb-3 font-[family-name:var(--font-cormorant)] text-[44px] font-medium">
          Nuestro equipo
        </h1>
        <p className="max-w-[620px] text-base text-[#4a473f]">
          Un grupo pequeño y especializado de asesores dedicados a acompañar
          cada transacción con discreción y cercanía.
        </p>
      </div>
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-8 pb-30 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:px-16">
        {TEAM.map((m) => (
          <div key={m.id}>
            <div className="relative mb-5 h-[320px] w-full">
              <Image
                src="/placeholder.svg"
                alt={`Foto de ${m.name}, ${m.role} en Aura`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <h2 className="mb-1 font-[family-name:var(--font-cormorant)] text-2xl font-medium">
              {m.name}
            </h2>
            <p className="mb-3 text-[13px] font-bold tracking-[1px] text-[#a9834f] uppercase">
              {m.role}
            </p>
            <p className="mb-3.5 text-[15px] leading-relaxed text-[#4a473f]">
              {m.bio}
            </p>
            <a
              href={`mailto:${m.email}`}
              className="border-b-2 border-[#a9834f] pb-0.5 text-[13px] font-bold"
            >
              {m.email}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
