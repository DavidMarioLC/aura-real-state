import type { MetadataRoute } from "next";
import { getPropertySlugMaps } from "@/cms/properties";
import { getPathname } from "@/i18n/navigation";
import { type Locale, routing } from "@/i18n/routing";
import { SITE_URL } from "./site-config";

const STATIC_ROUTES = ["/", "/propiedades", "/equipo", "/contacto"];

function url(pathname: string, locale: Locale) {
  return `${SITE_URL}${getPathname({ href: pathname, locale })}`;
}

/**
 * One entry per locale, each pointing at every other locale via hreflang.
 * `paths` holds the pathname for each locale — the same string for the static
 * routes, a translated slug for a property.
 */
function entries(
  paths: Partial<Record<Locale, string>>,
  lastModified: Date,
): MetadataRoute.Sitemap {
  const languages: Partial<Record<Locale, string>> = {};
  for (const locale of routing.locales) {
    const path = paths[locale];
    if (path) languages[locale] = url(path, locale);
  }

  return Object.values(languages).map((loc) => ({
    url: loc,
    lastModified,
    alternates: { languages },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  // Every property is one document under a translated slug per locale, so the
  // maps come from the CMS rather than from a single shared pathname.
  const properties = await getPropertySlugMaps(routing.defaultLocale);

  return [
    ...STATIC_ROUTES.flatMap((pathname) =>
      entries(
        Object.fromEntries(routing.locales.map((l) => [l, pathname])),
        now,
      ),
    ),
    ...properties.flatMap((slugs) =>
      entries(
        Object.fromEntries(
          Object.entries(slugs).map(([l, s]) => [l, `/propiedades/${s}`]),
        ),
        now,
      ),
    ),
  ];
}
