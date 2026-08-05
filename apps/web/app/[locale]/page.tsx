import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { getHomeContent } from "@/cms/home";
import { toLocale } from "@/i18n/params";
import { getProperties } from "../data";
import ContentLink from "./components/ContentLink";
import PropertyCard from "./components/PropertyCard";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  setRequestLocale(locale);

  const { hero, philosophy, stats, featuredHeading, cta } =
    await getHomeContent(locale);
  // Still static: the featured cards move to the CMS with the rest of the
  // property routes, so their links keep matching /propiedades/[id].
  const featured = getProperties(locale).slice(0, 3);

  return (
    <div>
      {/* HERO */}
      <div className="relative h-[88vh] min-h-[560px] w-full">
        <Image
          src={hero.image?.url ?? "/placeholder.svg"}
          alt={hero.imageAlt ?? ""}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 to-black/55" />
        <div className="absolute inset-0 flex flex-col items-start justify-end px-8 pb-18 md:px-16">
          {hero.eyebrow && (
            <p className="mb-4.5 font-[family-name:var(--font-cormorant)] text-xl text-[#e8dfce] italic tracking-[2px]">
              {hero.eyebrow}
            </p>
          )}
          <h1 className="max-w-[900px] font-[family-name:var(--font-cormorant)] text-[44px] leading-[1.02] font-medium text-white sm:text-[64px] lg:text-[84px]">
            {hero.title}
          </h1>
          {hero.subtitle && (
            <p className="mt-5.5 max-w-[520px] text-[17px] leading-relaxed text-[#e8dfce]">
              {hero.subtitle}
            </p>
          )}
          {hero.cta && (
            <ContentLink
              href={hero.cta.href}
              className="mt-9.5 bg-[#f6f2ea] px-8 py-4 text-sm font-bold tracking-[0.5px] text-[#201f1c]"
            >
              {hero.cta.label}
            </ContentLink>
          )}
        </div>
      </div>

      {/* PHILOSOPHY */}
      {philosophy && (
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-stretch lg:grid-cols-2">
          <div className="flex flex-col justify-center px-8 py-24 lg:px-16">
            {philosophy.eyebrow && (
              <p className="mb-5 text-[13px] font-bold tracking-[2px] text-[#a9834f] uppercase">
                {philosophy.eyebrow}
              </p>
            )}
            <h2 className="max-w-[520px] font-[family-name:var(--font-cormorant)] text-[38px] leading-tight font-medium">
              {philosophy.title}
            </h2>
            {philosophy.body && (
              <p className="mt-6 max-w-[480px] text-base leading-relaxed text-[#4a473f]">
                {philosophy.body}
              </p>
            )}
            {philosophy.link && (
              <ContentLink
                href={philosophy.link.href}
                className="mt-8 w-fit border-b-2 border-[#a9834f] pb-1 text-sm font-bold text-[#201f1c]"
              >
                {philosophy.link.label}
              </ContentLink>
            )}
          </div>
          <div className="relative h-[520px] w-full">
            <Image
              src={philosophy.image?.url ?? "/placeholder.svg"}
              alt={philosophy.imageAlt ?? ""}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* STATS */}
      {stats.length > 0 && (
        <div className="flex flex-wrap justify-center gap-24 bg-[#201f1c] px-12 py-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-[family-name:var(--font-cormorant)] text-[52px] font-medium text-[#f6f2ea]">
                {stat.value}
              </div>
              <div className="mt-2 text-[13px] tracking-[1px] text-[#a89f8c]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FEATURED */}
      <div className="mx-auto max-w-[1400px] px-8 py-28 lg:px-16">
        {featuredHeading && (
          <div className="mb-12 flex flex-wrap items-end justify-between gap-5">
            <div>
              {featuredHeading.eyebrow && (
                <p className="mb-4 text-[13px] font-bold tracking-[2px] text-[#a9834f] uppercase">
                  {featuredHeading.eyebrow}
                </p>
              )}
              <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-medium">
                {featuredHeading.title}
              </h2>
            </div>
            {featuredHeading.link && (
              <ContentLink
                href={featuredHeading.link.href}
                className="w-fit border-b-2 border-[#201f1c] pb-1 text-sm font-bold text-[#201f1c]"
              >
                {featuredHeading.link.label}
              </ContentLink>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </div>

      {/* CTA BAND */}
      {cta && (
        <div className="bg-[#e8dfce] px-8 py-22 text-center">
          <div className="mx-auto mb-7.5 max-w-[640px] font-[family-name:var(--font-cormorant)] text-[34px] leading-relaxed italic">
            {cta.quote}
          </div>
          {cta.link && (
            <ContentLink
              href={cta.link.href}
              className="inline-block bg-[#201f1c] px-9 py-4 text-sm font-bold tracking-[0.5px] text-[#f6f2ea]"
            >
              {cta.link.label}
            </ContentLink>
          )}
        </div>
      )}
    </div>
  );
}
