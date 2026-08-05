import { graphql } from "@/graphql";
import { strapi } from "@/graphql/client";
import type { Locale } from "@/i18n/routing";

/**
 * Site chrome — the wordmark, the nav and the footer. `siteName` is shared
 * across locales; `navigation` and `footer` are localized in Strapi.
 */
const GlobalQuery = graphql(`
  query Global($locale: I18NLocaleCode!) {
    global(locale: $locale) {
      siteName
      navigation {
        items {
          label
          href
        }
        cta {
          label
          href
        }
      }
      footer {
        tagline
        columns {
          title
          body
          links {
            label
            href
          }
        }
        legal
      }
    }
  }
`);

/** A link authored in the CMS: a site path (`/equipo`), a `mailto:` or a URL. */
export type CmsLink = { label: string; href: string };

export type FooterColumn = {
  title: string;
  /** Plain text for columns that are an address rather than a list of links. */
  body: string | null;
  links: CmsLink[];
};

export type SiteChrome = {
  siteName: string;
  nav: { items: CmsLink[]; cta: CmsLink | null };
  footer: {
    tagline: string | null;
    columns: FooterColumn[];
    legal: string | null;
  };
};

/** Strapi types every component list as nullable, entries included. */
function compact<T>(list: readonly (T | null)[] | null | undefined): T[] {
  return list?.filter((item): item is T => item !== null) ?? [];
}

/**
 * Reads the chrome for one locale. Strapi's nullability is absorbed here so
 * components get a plain, fully-populated shape.
 */
export async function getSiteChrome(locale: Locale): Promise<SiteChrome> {
  const { global } = await strapi(
    GlobalQuery,
    { locale },
    { tags: ["global"] },
  );

  // A single type has one entry per locale. A missing one would render the
  // chrome half-translated, so fail the build instead of shipping that.
  if (!global?.navigation || !global.footer) {
    throw new Error(
      `Strapi has no published "Global" entry with navigation and footer for locale "${locale}".`,
    );
  }

  return {
    siteName: global.siteName,
    nav: {
      items: compact(global.navigation.items),
      cta: global.navigation.cta ?? null,
    },
    footer: {
      tagline: global.footer.tagline ?? null,
      legal: global.footer.legal ?? null,
      columns: compact(global.footer.columns).map((column) => ({
        title: column.title,
        body: column.body ?? null,
        links: compact(column.links),
      })),
    },
  };
}
