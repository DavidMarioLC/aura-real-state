import { graphql } from "@/graphql";
import { strapi } from "@/graphql/client";
import type { Locale } from "@/i18n/routing";
import { type CmsImage, compact, toImage } from "./types";

/** An advisor as `/equipo` renders them. `photo` falls back to the placeholder. */
export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  email: string;
  photo: CmsImage;
};

// Strapi localizes only `role` and `bio` — an advisor's name, email and photo
// are the same person in either locale, so they are shared across them.
const AgentsQuery = graphql(`
  query Agents($locale: I18NLocaleCode!) {
    agents(
      locale: $locale
      pagination: { limit: 100 }
      sort: ["createdAt:asc"]
    ) {
      documentId
      name
      role
      bio
      email
      photo {
        url
        width
        height
      }
    }
  }
`);

/** The whole team in one locale, in the order they were entered. */
export async function getTeam(locale: Locale): Promise<TeamMember[]> {
  const { agents } = await strapi(AgentsQuery, { locale }, { tags: ["agent"] });

  return compact(agents).map(({ documentId, photo, ...fields }) => ({
    ...fields,
    id: documentId,
    photo: toImage(photo),
  }));
}
