import type { SiteChrome } from "@/cms/global";
import { Link } from "@/i18n/navigation";
import ContentLink from "./ContentLink";

type Props = { siteName: string; footer: SiteChrome["footer"] };

export default function Footer({ siteName, footer }: Props) {
  return (
    <div className="bg-[#201f1c] px-12 pt-16 pb-8">
      {/* Editors control how many columns there are, so the row wraps. */}
      <div className="mx-auto flex max-w-[1400px] flex-wrap gap-10">
        <div className="min-w-[280px] flex-[1.4]">
          <Link
            href="/"
            className="mb-3.5 block font-[family-name:var(--font-cormorant)] text-[26px] tracking-[3px] text-[#f6f2ea] uppercase"
          >
            {siteName}
          </Link>
          {footer.tagline && (
            <div className="max-w-[280px] text-sm leading-relaxed text-[#a89f8c]">
              {footer.tagline}
            </div>
          )}
        </div>
        {footer.columns.map((column) => (
          <div key={column.title} className="min-w-[160px] flex-1">
            <div className="mb-4 text-xs font-bold tracking-[1px] text-[#a9834f] uppercase">
              {column.title}
            </div>
            {column.body && (
              <div className="text-sm leading-relaxed whitespace-pre-line text-[#e8dfce]">
                {column.body}
              </div>
            )}
            {column.links.length > 0 && (
              <div className="flex flex-col gap-2.5 text-sm text-[#e8dfce]">
                {column.links.map((link) => (
                  <ContentLink key={link.href} href={link.href}>
                    {link.label}
                  </ContentLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {footer.legal && (
        <div className="mx-auto mt-14 max-w-[1400px] border-t border-[#f6f2ea]/12 pt-6 text-xs text-[#a89f8c]">
          {footer.legal}
        </div>
      )}
    </div>
  );
}
