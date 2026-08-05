import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { type Locale, routing } from "@/i18n/routing";
import { PROPERTY_IDS } from "./data";
import { SITE_URL } from "./site-config";

const STATIC_ROUTES = ["/", "/propiedades", "/equipo", "/contacto"];

function url(pathname: string, locale: Locale) {
  return `${SITE_URL}${getPathname({ href: pathname, locale })}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pathnames = [
    ...STATIC_ROUTES,
    ...PROPERTY_IDS.map((id) => `/propiedades/${id}`),
  ];

  // One entry per locale, each pointing at every other locale via hreflang.
  return pathnames.flatMap((pathname) =>
    routing.locales.map((locale) => ({
      url: url(pathname, locale),
      lastModified: now,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, url(pathname, l)]),
        ),
      },
    })),
  );
}
