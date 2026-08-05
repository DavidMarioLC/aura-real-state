"use client";

import { useLocale, useTranslations } from "next-intl";
import type { SiteChrome } from "@/cms/global";
import { Link, usePathname } from "@/i18n/navigation";
import { LOCALE_LABELS, type Locale, routing } from "@/i18n/routing";
import ContentLink from "./ContentLink";

type Props = { siteName: string; nav: SiteChrome["nav"] };

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export default function Nav({ siteName, nav }: Props) {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const activeLocale = useLocale() as Locale;

  return (
    <div className="sticky top-0 z-[100] flex items-center justify-between border-b border-[#201f1c]/10 bg-[#f6f2ea] px-12 py-5">
      <Link
        href="/"
        className="font-[family-name:var(--font-cormorant)] text-[30px] font-semibold tracking-[4px] text-[#201f1c] uppercase"
      >
        {siteName}
      </Link>
      <div className="hidden items-center gap-10 md:flex">
        {nav.items.map((item) => (
          <ContentLink
            key={item.href}
            href={item.href}
            className={`border-b-2 pb-1 text-sm font-semibold tracking-[0.5px] ${
              isActive(pathname, item.href)
                ? "border-[#a9834f] text-[#201f1c]"
                : "border-transparent text-[#4a473f]"
            }`}
          >
            {item.label}
          </ContentLink>
        ))}
        <nav
          aria-label={t("languageLabel")}
          className="flex items-center gap-2"
        >
          {routing.locales.map((locale) => (
            <Link
              key={locale}
              href={pathname}
              locale={locale}
              hrefLang={locale}
              aria-current={locale === activeLocale ? "true" : undefined}
              className={`text-[13px] font-semibold tracking-[1px] ${
                locale === activeLocale ? "text-[#201f1c]" : "text-[#4a473f]/60"
              }`}
            >
              {LOCALE_LABELS[locale]}
            </Link>
          ))}
        </nav>
        {nav.cta && (
          <ContentLink
            href={nav.cta.href}
            className="bg-[#201f1c] px-6 py-3 text-[13px] font-semibold tracking-[0.5px] text-[#f6f2ea]"
          >
            {nav.cta.label}
          </ContentLink>
        )}
      </div>
    </div>
  );
}
