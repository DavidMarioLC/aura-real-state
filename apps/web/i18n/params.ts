import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { type Locale, routing } from "./routing";

/**
 * Next types route params as plain strings, so every page narrows the segment
 * here. An unknown locale can only come from a hand-typed URL — 404 it.
 */
export function toLocale(locale: string): Locale {
  if (!hasLocale(routing.locales, locale)) notFound();
  return locale;
}
