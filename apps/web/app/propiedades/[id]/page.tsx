import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PropertyCard from "../../components/PropertyCard";
import { fmtPrice, getAgent, getPropertyById, PROPERTIES } from "../../data";

export function generateStaticParams() {
  return PROPERTIES.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const property = getPropertyById(id);
  if (!property) return {};

  const title = `${property.title} en ${property.city}`;
  const specs = `${property.type} · ${property.beds} hab · ${property.baths} baños · ${property.sqm} m² · ${fmtPrice(property.price)}.`;
  const remaining = 157 - specs.length - 1;
  const teaser =
    property.description.length > remaining
      ? `${property.description.slice(0, remaining).replace(/\s+\S*$/, "")}…`
      : property.description;
  const description = `${specs} ${teaser}`;

  return {
    title,
    description,
    alternates: { canonical: `/propiedades/${property.id}` },
    openGraph: {
      title: `${title} — Aura`,
      description,
      url: `/propiedades/${property.id}`,
    },
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = getPropertyById(id);
  if (!property) notFound();

  const agent = getAgent(property);
  const related = PROPERTIES.filter((p) => p.id !== property.id).slice(0, 3);

  return (
    <div>
      <div className="mx-auto max-w-[1400px] px-8 pt-9 lg:px-16">
        <Link
          href="/propiedades"
          className="w-fit text-[13px] font-bold text-[#4a473f]"
        >
          ← Volver a propiedades
        </Link>
      </div>

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-3.5 px-8 pt-6 lg:grid-cols-[2fr_1fr] lg:px-16">
        <div className="relative h-[520px] w-full">
          <Image
            src="/placeholder.svg"
            alt={`Fachada o interior de ${property.title}`}
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover"
          />
        </div>
        <div className="grid grid-rows-3 gap-3.5">
          <div className="relative h-full w-full">
            <Image
              src="/placeholder.svg"
              alt={`Detalle interior de ${property.title}`}
              fill
              sizes="(max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="relative h-full w-full">
            <Image
              src="/placeholder.svg"
              alt={`Exterior y jardín de ${property.title}`}
              fill
              sizes="(max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="relative h-full w-full">
            <Image
              src="/placeholder.svg"
              alt={`Vista adicional de ${property.title}`}
              fill
              sizes="(max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-8 pt-14 lg:grid-cols-[2fr_1fr] lg:px-16">
        <div>
          <p className="mb-3.5 text-[13px] font-bold tracking-[2px] text-[#a9834f] uppercase">
            {property.type} · {property.city}
          </p>
          <h1 className="mb-4 font-[family-name:var(--font-cormorant)] text-4xl font-medium">
            {property.title}
          </h1>
          <p className="mb-8 text-[26px] font-bold">
            {fmtPrice(property.price)}
          </p>

          <div className="mb-8 flex gap-10 border-t border-b border-[#201f1c]/12 py-6">
            <div>
              <div className="text-[22px] font-bold">{property.beds}</div>
              <div className="text-[13px] text-[#4a473f]">Habitaciones</div>
            </div>
            <div>
              <div className="text-[22px] font-bold">{property.baths}</div>
              <div className="text-[13px] text-[#4a473f]">Baños</div>
            </div>
            <div>
              <div className="text-[22px] font-bold">{property.sqm} m²</div>
              <div className="text-[13px] text-[#4a473f]">Superficie</div>
            </div>
          </div>

          <h2 className="mb-3.5 font-[family-name:var(--font-cormorant)] text-[22px] font-medium">
            Descripción
          </h2>
          <p className="mb-9 text-base leading-loose text-[#4a473f]">
            {property.description}
          </p>

          <h2 className="mb-4 font-[family-name:var(--font-cormorant)] text-[22px] font-medium">
            Amenidades
          </h2>
          <div className="mb-5 flex flex-wrap gap-3">
            {property.amenities.map((am) => (
              <div
                key={am}
                className="border border-[#201f1c]/20 px-4.5 py-2.5 text-[13px]"
              >
                {am}
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="sticky top-[120px] bg-[#efe8db] p-8">
            <p className="mb-4.5 text-xs font-bold tracking-[1px] text-[#a9834f] uppercase">
              Asesor a cargo
            </p>
            <div className="relative mb-4 h-[76px] w-[76px] overflow-hidden rounded-full bg-[#e8dfce]">
              <Image
                src="/placeholder.svg"
                alt={`Foto de ${agent.name}`}
                fill
                sizes="76px"
                className="object-cover"
              />
            </div>
            <p className="font-[family-name:var(--font-cormorant)] text-[22px] font-medium">
              {agent.name}
            </p>
            <p className="mb-5 text-[13px] text-[#4a473f]">{agent.role}</p>
            <Link
              href="/contacto"
              className="block bg-[#201f1c] py-3.5 text-center text-sm font-bold tracking-[0.5px] text-[#f6f2ea]"
            >
              Solicitar información
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-8 pt-28 pb-30 lg:px-16">
        <h2 className="mb-9 font-[family-name:var(--font-cormorant)] text-[32px] font-medium">
          Propiedades relacionadas
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <PropertyCard
              key={p.id}
              property={p}
              imageHeight={220}
              titleSize="text-[21px]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
