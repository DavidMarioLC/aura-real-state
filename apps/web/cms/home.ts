import { graphql } from "@/graphql";
import { strapi } from "@/graphql/client";
import type { Locale } from "@/i18n/routing";
import { type CmsImage, type CmsLink, compact } from "./types";

/**
 * The home page single type. Every section is localized; `hero` is the only
 * one Strapi requires, so the rest render only when an editor filled them in.
 */
const HomePageQuery = graphql(`
  query HomePage($locale: I18NLocaleCode!) {
    homePage(locale: $locale) {
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
  image: CmsImage | null;
  imageAlt: string | null;
};

type Philosophy = {
  eyebrow: string | null;
  title: string;
  body: string | null;
  link: CmsLink | null;
  image: CmsImage | null;
  imageAlt: string | null;
};

export type HomeContent = {
  hero: Hero;
  philosophy: Philosophy | null;
  stats: { value: string; label: string }[];
  featuredHeading: {
    eyebrow: string | null;
    title: string;
    link: CmsLink | null;
  } | null;
  cta: { quote: string; link: CmsLink | null } | null;
};

export async function getHomeContent(locale: Locale): Promise<HomeContent> {
  const { homePage } = await strapi(
    HomePageQuery,
    { locale },
    { tags: ["home-page"] },
  );

  // Same rule as the site chrome: a locale without a published entry would
  // render an empty home page, so fail the build instead.
  if (!homePage?.hero) {
    throw new Error(
      `Strapi has no published "Home Page" entry with a hero for locale "${locale}".`,
    );
  }

  const { hero, philosophy, featuredHeading, cta } = homePage;

  return {
    hero: {
      eyebrow: hero.eyebrow ?? null,
      title: hero.title,
      subtitle: hero.subtitle ?? null,
      cta: hero.cta ?? null,
      image: hero.image ?? null,
      imageAlt: hero.imageAlt ?? null,
    },
    philosophy: philosophy
      ? {
          eyebrow: philosophy.eyebrow ?? null,
          title: philosophy.title,
          body: philosophy.body ?? null,
          link: philosophy.link ?? null,
          image: philosophy.image ?? null,
          imageAlt: philosophy.imageAlt ?? null,
        }
      : null,
    stats: compact(homePage.stats),
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
