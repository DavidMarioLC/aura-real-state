/** A link authored in the CMS: a site path (`/equipo`), a `mailto:` or a URL. */
export type CmsLink = { label: string; href: string };

/** An uploaded image. Alt text lives in a sibling field, not on the media. */
export type CmsImage = { url: string };

/** Strapi types every component list as nullable, entries included. */
export function compact<T>(
  list: readonly (T | null)[] | null | undefined,
): T[] {
  return list?.filter((item): item is T => item !== null) ?? [];
}
