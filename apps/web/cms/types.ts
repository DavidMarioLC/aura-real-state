/** A link authored in the CMS: a site path (`/equipo`), a `mailto:` or a URL. */
export type CmsLink = { label: string; href: string };

/** An uploaded image. Alt text lives in a sibling field, not on the media. */
export type CmsImage = { url: string; width: number; height: number };

/**
 * The `shared.seo` component every page-level single type carries. Strapi
 * requires `title` and `description`; the Open Graph pair is optional and
 * falls back to them, so `generateMetadata` never has to branch.
 */
export type CmsSeo = {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
};

export function toSeo(seo: {
  title: string;
  description: string;
  ogTitle?: string | null;
  ogDescription?: string | null;
}): CmsSeo {
  return {
    title: seo.title,
    description: seo.description,
    ogTitle: seo.ogTitle || seo.title,
    ogDescription: seo.ogDescription || seo.description,
  };
}

/** The `sections.page-header` component: the eyebrow/title/intro block. */
export type CmsPageHeader = {
  eyebrow: string | null;
  title: string;
  intro: string | null;
};

export function toPageHeader(header: {
  eyebrow?: string | null;
  title: string;
  intro?: string | null;
}): CmsPageHeader {
  return {
    eyebrow: header.eyebrow ?? null,
    title: header.title,
    intro: header.intro ?? null,
  };
}

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
