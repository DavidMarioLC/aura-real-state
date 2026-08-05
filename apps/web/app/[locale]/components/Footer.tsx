import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");

  return (
    <div className="bg-[#201f1c] px-12 pt-16 pb-8">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="mb-3.5 font-[family-name:var(--font-cormorant)] text-[26px] tracking-[3px] text-[#f6f2ea]">
            AURA
          </div>
          <div className="max-w-[280px] text-sm leading-relaxed text-[#a89f8c]">
            {t("tagline")}
          </div>
        </div>
        <div>
          <div className="mb-4 text-xs font-bold tracking-[1px] text-[#a9834f] uppercase">
            {t("navigation")}
          </div>
          <div className="flex flex-col gap-2.5 text-sm text-[#e8dfce]">
            <Link href="/">{tNav("home")}</Link>
            <Link href="/propiedades">{tNav("properties")}</Link>
            <Link href="/equipo">{tNav("team")}</Link>
            <Link href="/contacto">{tNav("contact")}</Link>
          </div>
        </div>
        <div>
          <div className="mb-4 text-xs font-bold tracking-[1px] text-[#a9834f] uppercase">
            {t("contact")}
          </div>
          <div className="flex flex-col gap-2.5 text-sm text-[#e8dfce]">
            <div>hola@aura.mx</div>
            <div>+52 55 4321 0000</div>
          </div>
        </div>
        <div>
          <div className="mb-4 text-xs font-bold tracking-[1px] text-[#a9834f] uppercase">
            {t("office")}
          </div>
          <div className="text-sm leading-relaxed text-[#e8dfce]">
            Av. Presidente Masaryk 111
            <br />
            Polanco, CDMX
          </div>
        </div>
      </div>
      <div className="mx-auto mt-14 max-w-[1400px] border-t border-[#f6f2ea]/12 pt-6 text-xs text-[#a89f8c]">
        {/* String, not a number — ICU would format the year as "2,026". */}
        {t("rights", { year: "2026" })}
      </div>
    </div>
  );
}
