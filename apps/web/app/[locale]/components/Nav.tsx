"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LOCALE_LABELS, type Locale, routing } from "@/i18n/routing";

const LINKS = [
  { href: "/", key: "home" },
  { href: "/propiedades", key: "properties" },
  { href: "/equipo", key: "team" },
  { href: "/contacto", key: "contact" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export default function Nav() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const activeLocale = useLocale() as Locale;

  return (
    <div className="sticky top-0 z-[100] flex items-center justify-between border-b border-[#201f1c]/10 bg-[#f6f2ea] px-12 py-5">
      <Link
        href="/"
        className="font-[family-name:var(--font-cormorant)] text-[30px] font-semibold tracking-[4px] text-[#201f1c]"
      >
        AURA
      </Link>
      <div className="hidden items-center gap-10 md:flex">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`border-b-2 pb-1 text-sm font-semibold tracking-[0.5px] ${
              isActive(pathname, link.href)
                ? "border-[#a9834f] text-[#201f1c]"
                : "border-transparent text-[#4a473f]"
            }`}
          >
            {t(link.key)}
          </Link>
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
        <Link
          href="/contacto"
          className="bg-[#201f1c] px-6 py-3 text-[13px] font-semibold tracking-[0.5px] text-[#f6f2ea]"
        >
          {t("cta")}
        </Link>
      </div>
    </div>
  );
}
