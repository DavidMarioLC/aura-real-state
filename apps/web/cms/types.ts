/** A link authored in the CMS: a site path (`/equipo`), a `mailto:` or a URL. */
export type CmsLink = { label: string; href: string };

/** An uploaded image. Alt text lives in a sibling field, not on the media. */
export type CmsImage = { url: string; width: number; height: number };

/** The `public/placeholder.svg` shipped with the app, at its real size. */
const PLACEHOLDER: CmsImage = {
  url: "/placeholder.svg",
  width: 1200,
  height: 1200,
};

/**
 * Strapi leaves media fields empty and types `width`/`height` as nullable
 * (it cannot measure every format), so fall back to the placeholder rather
 * than making every component handle an image it cannot size.
 */
export function toImage(
  image?: {
    url: string;
    width?: number | null;
    height?: number | null;
  } | null,
): CmsImage {
  if (!image?.width || !image.height) return PLACEHOLDER;
  return { url: image.url, width: image.width, height: image.height };
}

/** Strapi types every component list as nullable, entries included. */
export function compact<T>(
  list: readonly (T | null)[] | null | undefined,
): T[] {
  return list?.filter((item): item is T => item !== null) ?? [];
}
