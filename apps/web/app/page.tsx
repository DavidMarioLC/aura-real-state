import Image from "next/image";
import Link from "next/link";
import PropertyCard from "./components/PropertyCard";
import { PROPERTIES } from "./data";

export default function Home() {
  const featured = PROPERTIES.slice(0, 3);

  return (
    <div>
      {/* HERO */}
      <div className="relative h-[88vh] min-h-[560px] w-full">
        <Image
          src="/placeholder.svg"
          alt="Fotografía de fachada o interior insignia"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 to-black/55" />
        <div className="absolute inset-0 flex flex-col items-start justify-end px-8 pb-18 md:px-16">
          <p className="mb-4.5 font-[family-name:var(--font-cormorant)] text-xl text-[#e8dfce] italic tracking-[2px]">
            Bienes raíces de autor
          </p>
          <h1 className="max-w-[900px] font-[family-name:var(--font-cormorant)] text-[44px] leading-[1.02] font-medium text-white sm:text-[64px] lg:text-[84px]">
            Propiedades que se sienten como un lugar propio
          </h1>
          <p className="mt-5.5 max-w-[520px] text-[17px] leading-relaxed text-[#e8dfce]">
            Un portafolio curado de residencias, villas y penthouses
            seleccionados con criterio, para quienes no negocian el buen gusto.
          </p>
          <Link
            href="/propiedades"
            className="mt-9.5 bg-[#f6f2ea] px-8 py-4 text-sm font-bold tracking-[0.5px] text-[#201f1c]"
          >
            Ver propiedades
          </Link>
        </div>
      </div>

      {/* PHILOSOPHY */}
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-stretch lg:grid-cols-2">
        <div className="flex flex-col justify-center px-8 py-24 lg:px-16">
          <p className="mb-5 text-[13px] font-bold tracking-[2px] text-[#a9834f] uppercase">
            Nuestra filosofía
          </p>
          <h2 className="max-w-[520px] font-[family-name:var(--font-cormorant)] text-[38px] leading-tight font-medium">
            Creemos que una casa excepcional se reconoce por el detalle, no por
            el tamaño.
          </h2>
          <p className="mt-6 max-w-[480px] text-base leading-relaxed text-[#4a473f]">
            En Aura acompañamos a cada cliente con una mirada curatorial:
            seleccionamos, verificamos y presentamos únicamente propiedades que
            superan nuestro propio estándar de diseño, ubicación y construcción.
          </p>
          <Link
            href="/equipo"
            className="mt-8 w-fit border-b-2 border-[#a9834f] pb-1 text-sm font-bold text-[#201f1c]"
          >
            Conoce al equipo →
          </Link>
        </div>
        <div className="relative h-[520px] w-full">
          <Image
            src="/placeholder.svg"
            alt="Interior editorial, luz natural"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* STATS */}
      <div className="flex flex-wrap justify-center gap-24 bg-[#201f1c] px-12 py-16">
        <div className="text-center">
          <div className="font-[family-name:var(--font-cormorant)] text-[52px] font-medium text-[#f6f2ea]">
            18
          </div>
          <div className="mt-2 text-[13px] tracking-[1px] text-[#a89f8c]">
            Años de trayectoria
          </div>
        </div>
        <div className="text-center">
          <div className="font-[family-name:var(--font-cormorant)] text-[52px] font-medium text-[#f6f2ea]">
            240+
          </div>
          <div className="mt-2 text-[13px] tracking-[1px] text-[#a89f8c]">
            Propiedades colocadas
          </div>
        </div>
        <div className="text-center">
          <div className="font-[family-name:var(--font-cormorant)] text-[52px] font-medium text-[#f6f2ea]">
            7
          </div>
          <div className="mt-2 text-[13px] tracking-[1px] text-[#a89f8c]">
            Ciudades
          </div>
        </div>
      </div>

      {/* FEATURED */}
      <div className="mx-auto max-w-[1400px] px-8 py-28 lg:px-16">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="mb-4 text-[13px] font-bold tracking-[2px] text-[#a9834f] uppercase">
              Selección actual
            </p>
            <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-medium">
              Propiedades destacadas
            </h2>
          </div>
          <Link
            href="/propiedades"
            className="w-fit border-b-2 border-[#201f1c] pb-1 text-sm font-bold text-[#201f1c]"
          >
            Ver todas las propiedades →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </div>

      {/* CTA BAND */}
      <div className="bg-[#e8dfce] px-8 py-22 text-center">
        <div className="mx-auto mb-7.5 max-w-[640px] font-[family-name:var(--font-cormorant)] text-[34px] leading-relaxed italic">
          "Cada propiedad cuenta una historia. Ayudémosle a encontrar la suya."
        </div>
        <Link
          href="/contacto"
          className="inline-block bg-[#201f1c] px-9 py-4 text-sm font-bold tracking-[0.5px] text-[#f6f2ea]"
        >
          Hablemos hoy
        </Link>
      </div>
    </div>
  );
}
