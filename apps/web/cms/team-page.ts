import { graphql } from "@/graphql";
import { strapi } from "@/graphql/client";
import type { Locale } from "@/i18n/routing";
import { type CmsPageHeader, type CmsSeo, toPageHeader, toSeo } from "./types";

/**
 * The `/equipo` single type — the page's copy. The advisors themselves are a
 * collection, read by `getTeam` in `cms/agents.ts`.
 */
const TeamPageQuery = graphql(`
  query TeamPage($locale: I18NLocaleCode!) {
    teamPage(locale: $locale) {
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

export type TeamPageContent = { seo: CmsSeo; header: CmsPageHeader };

export async function getTeamPage(locale: Locale): Promise<TeamPageContent> {
  const { teamPage } = await strapi(
    TeamPageQuery,
    { locale },
    { tags: ["team-page"] },
  );

  if (!teamPage?.seo || !teamPage.header) {
    throw new Error(
      `Strapi has no published "Team Page" entry for locale "${locale}".`,
    );
  }

  return {
    seo: toSeo(teamPage.seo),
    header: toPageHeader(teamPage.header),
  };
}
