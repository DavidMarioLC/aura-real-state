import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  getProperties,
  getPropertyBySlug,
  getPropertySlugs,
} from "@/cms/properties";
import { alternatesFor } from "@/i18n/metadata";
import { Link } from "@/i18n/navigation";
import { toLocale } from "@/i18n/params";
import { routing } from "@/i18n/routing";
import { fmtPrice } from "../../../data";
import PropertyCard from "../../components/PropertyCard";

/** Slugs are translated, so each locale contributes its own list of pages. */
export async function generateStaticParams() {
  const perLocale = await Promise.all(
    routing.locales.map(async (locale) =>
      (await getPropertySlugs(locale)).map((slug) => ({ locale, slug })),
    ),
  );

  return perLocale.flat();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = toLocale(rawLocale);
  const property = await getPropertyBySlug(slug, locale);
  if (!property) return {};

  const t = await getTranslations({ locale, namespace: "Metadata.property" });
  const tType = await getTranslations({ locale, namespace: "PropertyType" });
  const values = { title: property.title, city: property.city };

  const specs = t("specs", {
    type: tType(property.type),
    beds: property.beds,
    baths: property.baths,
    sqm: property.sqm,
    price: fmtPrice(property.price),
  });
  const remaining = 157 - specs.length - 1;
  const teaser =
    property.description.length > remaining
      ? `${property.description.slice(0, remaining).replace(/\s+\S*$/, "")}…`
      : property.description;
  const description = `${specs} ${teaser}`;

  // The same document sits under a different slug in every locale, so hreflang
  // is built from the map rather than from this locale's pathname.
  const pathnames = Object.fromEntries(
    Object.entries(property.slugs).map(([l, s]) => [l, `/propiedades/${s}`]),
  );

  return {
    title: t("title", values),
    description,
    alternates: alternatesFor(pathnames, locale),
    openGraph: {
      title: t("ogTitle", values),
      description,
      url: `/${locale}/propiedades/${property.slug}`,
    },
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = toLocale(rawLocale);
  setRequestLocale(locale);

  const property = await getPropertyBySlug(slug, locale);
  if (!property) notFound();

  const t = await getTranslations("PropertyDetail");
  const tType = await getTranslations("PropertyType");
  const { agent } = property;
  // `property.image` is the first image already, or the placeholder when the
  // entry has none — the gallery beside it is whatever else was uploaded.
  const gallery = property.images.slice(1, 4);
  const related = (await getProperties(locale))
    .filter((p) => p.slug !== property.slug)
    .slice(0, 3);

  return (
    <div>
      <div className="mx-auto max-w-[1400px] px-8 pt-9 lg:px-16">
        <Link
          href="/propiedades"
          className="w-fit text-[13px] font-bold text-[#4a473f]"
        >
          {t("back")}
        </Link>
      </div>

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-3.5 px-8 pt-6 lg:grid-cols-[2fr_1fr] lg:px-16">
        <div className="relative h-[520px] w-full">
          <Image
            src={property.image.url}
            alt={t("mainImageAlt", { title: property.title })}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover"
          />
        </div>
        {gallery.length > 0 && (
          <div className="grid grid-rows-3 gap-3.5">
            {gallery.map((image, index) => (
              <div key={image.url} className="relative h-full w-full">
                <Image
                  src={image.url}
                  alt={t("galleryImageAlt", {
                    title: property.title,
                    index: index + 2,
                  })}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-8 pt-14 lg:grid-cols-[2fr_1fr] lg:px-16">
        <div>
          <p className="mb-3.5 text-[13px] font-bold tracking-[2px] text-[#a9834f] uppercase">
            {tType(property.type)} · {property.city}
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
              <div className="text-[13px] text-[#4a473f]">{t("beds")}</div>
            </div>
            <div>
              <div className="text-[22px] font-bold">{property.baths}</div>
              <div className="text-[13px] text-[#4a473f]">{t("baths")}</div>
            </div>
            <div>
              <div className="text-[22px] font-bold">{property.sqm} m²</div>
              <div className="text-[13px] text-[#4a473f]">{t("area")}</div>
            </div>
          </div>

          <h2 className="mb-3.5 font-[family-name:var(--font-cormorant)] text-[22px] font-medium">
            {t("descriptionHeading")}
          </h2>
          <p className="mb-9 text-base leading-loose text-[#4a473f]">
            {property.description}
          </p>

          {property.amenities.length > 0 && (
            <>
              <h2 className="mb-4 font-[family-name:var(--font-cormorant)] text-[22px] font-medium">
                {t("amenitiesHeading")}
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
            </>
          )}
        </div>

        {agent && (
          <div>
            <div className="sticky top-[120px] bg-[#efe8db] p-8">
              <p className="mb-4.5 text-xs font-bold tracking-[1px] text-[#a9834f] uppercase">
                {t("agentEyebrow")}
              </p>
              <div className="relative mb-4 h-[76px] w-[76px] overflow-hidden rounded-full bg-[#e8dfce]">
                <Image
                  src={agent.photo.url}
                  alt={t("agentPhotoAlt", { name: agent.name })}
                  fill
                  sizes="76px"
                  className="object-cover"
                />
              </div>
              <p className="font-[family-name:var(--font-cormorant)] text-[22px] font-medium">
                {agent.name}
              </p>
              {agent.role && (
                <p className="mb-5 text-[13px] text-[#4a473f]">{agent.role}</p>
              )}
              <Link
                href="/contacto"
                className="block bg-[#201f1c] py-3.5 text-center text-sm font-bold tracking-[0.5px] text-[#f6f2ea]"
              >
                {t("agentCta")}
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="mx-auto max-w-[1400px] px-8 pt-28 pb-30 lg:px-16">
        <h2 className="mb-9 font-[family-name:var(--font-cormorant)] text-[32px] font-medium">
          {t("relatedHeading")}
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <PropertyCard
              key={p.slug}
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
