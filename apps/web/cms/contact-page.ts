import { graphql } from "@/graphql";
import { strapi } from "@/graphql/client";
import type { Locale } from "@/i18n/routing";
import {
  type CmsImage,
  type CmsPageHeader,
  type CmsSeo,
  compact,
  toImage,
  toPageHeader,
  toSeo,
} from "./types";

/**
 * The `/contacto` single type. Beyond the header it holds the side column:
 * `infoBlocks` is an open, ordered list (office, direct contact, opening
 * hours today) whose `body` is plain multi-line text, the same idiom as the
 * footer columns. The form's own labels are interface strings and stay in the
 * message files.
 */
const ContactPageQuery = graphql(`
  query ContactPage($locale: I18NLocaleCode!) {
    contactPage(locale: $locale) {
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
      infoBlocks {
        title
        body
      }
      map {
        url
        width
        height
      }
      mapAlt
    }
  }
`);

export type ContactInfoBlock = { title: string; body: string };

export type ContactPageContent = {
  seo: CmsSeo;
  header: CmsPageHeader;
  /** May be empty — the column renders only the blocks the editor filled in. */
  infoBlocks: ContactInfoBlock[];
  map: CmsImage;
  mapAlt: string | null;
};

export async function getContactPage(
  locale: Locale,
): Promise<ContactPageContent> {
  const { contactPage } = await strapi(
    ContactPageQuery,
    { locale },
    { tags: ["contact-page"] },
  );

  if (!contactPage?.seo || !contactPage.header) {
    throw new Error(
      `Strapi has no published "Contact Page" entry for locale "${locale}".`,
    );
  }

  return {
    seo: toSeo(contactPage.seo),
    header: toPageHeader(contactPage.header),
    infoBlocks: compact(contactPage.infoBlocks),
    map: toImage(contactPage.map),
    mapAlt: contactPage.mapAlt ?? null,
  };
}
