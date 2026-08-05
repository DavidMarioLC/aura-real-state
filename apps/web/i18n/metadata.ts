import type { Metadata } from "next";
import { getPathname } from "./navigation";
import { type Locale, routing } from "./routing";

/**
 * Canonical + hreflang for a pathname. Pass a single string when the path is
 * the same in every locale (`/propiedades`), or one path per locale when it is
 * not — property slugs are translated, so `/en/propiedades/marina-view-villa`
 * and `/es/propiedades/villa-vista-marina` are the same document. A locale
 * absent from the map has no page, so it is left out of the alternates.
 *
 * Paths are relative and resolved against `metadataBase` from the root layout.
 */
export function alternatesFor(
  pathname: string | Partial<Record<Locale, string>>,
  locale: Locale,
): Metadata["alternates"] {
  const languages: Partial<Record<Locale, string>> = {};
  for (const l of routing.locales) {
    const href = typeof pathname === "string" ? pathname : pathname[l];
    if (href) languages[l] = getPathname({ href, locale: l });
  }

  const canonical = languages[locale];

  return {
    canonical,
    languages: {
      ...languages,
      "x-default": languages[routing.defaultLocale] ?? canonical,
    },
  };
}
