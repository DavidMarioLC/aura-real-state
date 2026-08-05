import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "en",
  // Every URL carries its locale (`/en/propiedades`, `/es/propiedades`), so
  // canonicals and hreflang stay unambiguous and no route is served twice.
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  es: "ES",
};

/** BCP 47 tags used for `<html lang>` and OpenGraph. */
export const HTML_LANG: Record<Locale, string> = {
  en: "en",
  es: "es-MX",
};

export const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  es: "es_MX",
};
