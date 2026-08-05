import type { Metadata } from "next";
import { getPathname } from "./navigation";
import { type Locale, routing } from "./routing";

/**
 * Canonical + hreflang for a locale-agnostic pathname (e.g. `/propiedades`).
 * Paths are relative and resolved against `metadataBase` from the root layout.
 */
export function alternatesFor(
  pathname: string,
  locale: Locale,
): Metadata["alternates"] {
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, getPathname({ href: pathname, locale: l })]),
  );

  return {
    canonical: getPathname({ href: pathname, locale }),
    languages: {
      ...languages,
      "x-default": getPathname({
        href: pathname,
        locale: routing.defaultLocale,
      }),
    },
  };
}
