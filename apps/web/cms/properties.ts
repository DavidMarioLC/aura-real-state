import { hasLocale } from "next-intl";
import { graphql } from "@/graphql";
import { strapi } from "@/graphql/client";
import { type Locale, routing } from "@/i18n/routing";
import { type CmsImage, compact, toImage } from "./types";

/**
 * Strapi stores the type as an enum key, not as a label — the same entry reads
 * `villa` under both locales. `PropertyType.*` in the message files turns it
 * into copy, which keeps the filter values locale-independent.
 */
export type PropertyType = "house" | "villa" | "apartment" | "penthouse";

/** What a card needs: no description, no amenities, one image. */
export type PropertySummary = {
  slug: string;
  title: string;
  city: string;
  type: PropertyType;
  price: number;
  beds: number;
  baths: number;
  sqm: number;
  image: CmsImage;
};

export type PropertyAgent = {
  name: string;
  role: string | null;
  email: string;
  photo: CmsImage;
};

export type Property = PropertySummary & {
  description: string;
  amenities: string[];
  images: CmsImage[];
  /** Optional in Strapi: a property can be listed before an advisor takes it. */
  agent: PropertyAgent | null;
  /**
   * The slug under every locale that has a published version, for hreflang.
   * A locale missing here has no page to point at, so it is left out.
   */
  slugs: Partial<Record<Locale, string>>;
};

// The `limit: 100` below is `maxLimit` from the CMS's `config/api.ts` — the
// portfolio is small enough to fetch whole, which is what the client-side
// filters on `/propiedades` assume.
const PropertiesQuery = graphql(`
  query Properties($locale: I18NLocaleCode!) {
    properties(
      locale: $locale
      pagination: { limit: 100 }
      sort: ["createdAt:asc"]
    ) {
      slug
      title
      city
      type
      price
      beds
      baths
      sqm
      images(pagination: { limit: 1 }) {
        url
        width
        height
      }
    }
  }
`);

const PropertyQuery = graphql(`
  query Property($slug: String!, $locale: I18NLocaleCode!) {
    properties(
      locale: $locale
      filters: { slug: { eq: $slug } }
      pagination: { limit: 1 }
    ) {
      slug
      title
      city
      type
      price
      beds
      baths
      sqm
      description
      amenities {
        label
      }
      images {
        url
        width
        height
      }
      agent {
        name
        role
        email
        photo {
          url
          width
          height
        }
      }
      localizations {
        locale
        slug
      }
    }
  }
`);

const PropertySlugsQuery = graphql(`
  query PropertySlugs($locale: I18NLocaleCode!) {
    properties(
      locale: $locale
      pagination: { limit: 100 }
      sort: ["createdAt:asc"]
    ) {
      slug
      localizations {
        locale
        slug
      }
    }
  }
`);

/**
 * Strapi returns the *other* locales under `localizations`, so the entry's own
 * slug is added back in. `locale` is a plain string there and an entry could
 * outlive a locale being dropped from `routing`, so narrow before trusting it.
 */
function toSlugMap(
  entry: {
    slug: string;
    localizations: ({ locale?: string | null } & { slug: string })[];
  },
  locale: Locale,
): Partial<Record<Locale, string>> {
  const slugs: Partial<Record<Locale, string>> = { [locale]: entry.slug };
  for (const translation of entry.localizations) {
    if (translation.locale && hasLocale(routing.locales, translation.locale)) {
      slugs[translation.locale] = translation.slug;
    }
  }
  return slugs;
}

/** The card fields any query can select — the home page's featured relation too. */
export type SummaryFields = {
  slug: string;
  title: string;
  city: string;
  type: PropertyType;
  price: number;
  beds: number;
  baths: number;
  sqm: number;
  images: ({
    url: string;
    width?: number | null;
    height?: number | null;
  } | null)[];
};

export function toSummary(property: SummaryFields): PropertySummary {
  const { images, ...fields } = property;
  return { ...fields, image: toImage(images[0]) };
}

/** Every property in one locale, in the order they were entered. */
export async function getProperties(
  locale: Locale,
): Promise<PropertySummary[]> {
  const { properties } = await strapi(
    PropertiesQuery,
    { locale },
    { tags: ["property"] },
  );

  return compact(properties).map(toSummary);
}

/** The slugs `generateStaticParams` needs — one list per locale. */
export async function getPropertySlugs(locale: Locale): Promise<string[]> {
  const { properties } = await strapi(
    PropertySlugsQuery,
    { locale },
    { tags: ["property"] },
  );

  return compact(properties).map((property) => property.slug);
}

/**
 * One slug map per property, for the sitemap: each entry is a single document
 * under several URLs, and every URL has to list the others as alternates.
 */
export async function getPropertySlugMaps(
  locale: Locale,
): Promise<Partial<Record<Locale, string>>[]> {
  const { properties } = await strapi(
    PropertySlugsQuery,
    { locale },
    { tags: ["property"] },
  );

  return compact(properties).map((property) =>
    toSlugMap(
      { ...property, localizations: compact(property.localizations) },
      locale,
    ),
  );
}

/** `null` when the slug belongs to another locale, or to nothing at all. */
export async function getPropertyBySlug(
  slug: string,
  locale: Locale,
): Promise<Property | null> {
  const { properties } = await strapi(
    PropertyQuery,
    { slug, locale },
    { tags: ["property"] },
  );

  const property = compact(properties)[0];
  if (!property) return null;

  const { images, amenities, agent, localizations, description, ...fields } =
    property;

  return {
    ...toSummary({ ...fields, images }),
    slugs: toSlugMap(
      { slug: property.slug, localizations: compact(localizations) },
      locale,
    ),
    description,
    images: compact(images).map((image) => toImage(image)),
    amenities: compact(amenities)
      .map((amenity) => amenity.label)
      .filter((label): label is string => label !== null),
    agent: agent
      ? {
          name: agent.name,
          role: agent.role ?? null,
          email: agent.email,
          photo: toImage(agent.photo),
        }
      : null,
  };
}
