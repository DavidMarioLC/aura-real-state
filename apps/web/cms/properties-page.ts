import { graphql } from "@/graphql";
import { strapi } from "@/graphql/client";
import type { Locale } from "@/i18n/routing";
import { type CmsPageHeader, type CmsSeo, toPageHeader, toSeo } from "./types";

/**
 * The `/propiedades` single type — the page's own copy, not the listing. The
 * properties themselves come from `cms/properties.ts`, and the filter controls
 * are interface strings, so they stay in the message files.
 */
const PropertiesPageQuery = graphql(`
  query PropertiesPage($locale: I18NLocaleCode!) {
    propertiesPage(locale: $locale) {
      seo {
        title
        description
        ogTitle
        ogDescription
      }
      header {
        eyebrow
        title
        intro
      }
    }
  }
`);

export type PropertiesPageContent = { seo: CmsSeo; header: CmsPageHeader };

export async function getPropertiesPage(
  locale: Locale,
): Promise<PropertiesPageContent> {
  const { propertiesPage } = await strapi(
    PropertiesPageQuery,
    { locale },
    { tags: ["properties-page"] },
  );

  // Same rule as the rest of the single types: a locale without a published
  // entry would render an untitled page, so fail the build instead.
  if (!propertiesPage?.seo || !propertiesPage.header) {
    throw new Error(
      `Strapi has no published "Properties Page" entry for locale "${locale}".`,
    );
  }

  return {
    seo: toSeo(propertiesPage.seo),
    header: toPageHeader(propertiesPage.header),
  };
}
