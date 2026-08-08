import { graphql } from "@/graphql";
import { strapi } from "@/graphql/client";
import type { Locale } from "@/i18n/routing";
import { type PropertySummary, toSummary } from "./properties";
import {
  type CmsImage,
  type CmsLink,
  type CmsSeo,
  compact,
  toImage,
  toSeo,
} from "./types";

/**
 * The home page single type. Every section is localized; `hero` is the only
 * one Strapi requires, so the rest render only when an editor filled them in.
 *
 * `featuredProperties` is the one relation: Strapi does not localize it (the
 * editorial selection is the same in both locales), but it resolves each entry
 * in the locale asked of the parent, so the cards come out already translated.
 */
const HomePageQuery = graphql(`
  query HomePage($locale: I18NLocaleCode!) {
    homePage(locale: $locale) {
      seo {
        title
        description
        ogTitle
        ogDescription
      }
      hero {
        eyebrow
        title
        subtitle
        cta {
          label
          href
        }
        image {
          url
          width
          height
        }
        imageAlt
      }
      philosophy {
        eyebrow
        title
        body
        link {
          label
          href
        }
        image {
          url
          width
          height
        }
        imageAlt
      }
      stats {
        value
        label
      }
      featuredHeading {
        eyebrow
        title
        link {
          label
          href
        }
      }
      featuredProperties {
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
      cta {
        quote
        link {
          label
          href
        }
      }
    }
  }
`);

type Hero = {
  eyebrow: string | null;
  title: string;
  subtitle: string | null;
  cta: CmsLink | null;
  image: CmsImage;
  imageAlt: string | null;
};

type Philosophy = {
  eyebrow: string | null;
  title: string;
  body: string | null;
  link: CmsLink | null;
  image: CmsImage;
  imageAlt: string | null;
};

export type HomeContent = {
  seo: CmsSeo;
  hero: Hero;
  philosophy: Philosophy | null;
  stats: { value: string; label: string }[];
  featuredHeading: {
    eyebrow: string | null;
    title: string;
    link: CmsLink | null;
  } | null;
  /** The editor's selection, in the order they arranged it. May be empty. */
  featuredProperties: PropertySummary[];
  cta: { quote: string; link: CmsLink | null } | null;
};

export async function getHomeContent(locale: Locale): Promise<HomeContent> {
  const { homePage } = await strapi(
    HomePageQuery,
    { locale },
    // Tagged `property` as well: the featured cards embed property fields, so
    // editing one of them has to drop this entry from the cache too.
    { tags: ["home-page", "property"] },
  );

  // Same rule as the site chrome: a locale without a published entry would
  // render an empty home page, so fail the build instead.
  if (!homePage?.hero || !homePage.seo) {
    throw new Error(
      `Strapi has no published "Home Page" entry with a hero for locale "${locale}".`,
    );
  }

  const { hero, philosophy, featuredHeading, cta } = homePage;

  return {
    seo: toSeo(homePage.seo),
    hero: {
      eyebrow: hero.eyebrow ?? null,
      title: hero.title,
      subtitle: hero.subtitle ?? null,
      cta: hero.cta ?? null,
      image: toImage(hero.image),
      imageAlt: hero.imageAlt ?? null,
    },
    philosophy: philosophy
      ? {
          eyebrow: philosophy.eyebrow ?? null,
          title: philosophy.title,
          body: philosophy.body ?? null,
          link: philosophy.link ?? null,
          image: toImage(philosophy.image),
          imageAlt: philosophy.imageAlt ?? null,
        }
      : null,
    stats: compact(homePage.stats),
    featuredProperties: compact(homePage.featuredProperties).map(toSummary),
    featuredHeading: featuredHeading
      ? {
          eyebrow: featuredHeading.eyebrow ?? null,
          title: featuredHeading.title,
          link: featuredHeading.link ?? null,
        }
      : null,
    cta: cta ? { quote: cta.quote, link: cta.link ?? null } : null,
  };
}
