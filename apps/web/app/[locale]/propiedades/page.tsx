import { getTranslations, setRequestLocale } from "next-intl/server";
import { getProperties } from "@/cms/properties";
import { toLocale } from "@/i18n/params";
import PropertiesBrowser from "./PropertiesBrowser";

export default async function PropertiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  setRequestLocale(locale);

  const t = await getTranslations("Properties");
  const properties = await getProperties(locale);

  return (
    <div>
      <div className="mx-auto max-w-[1400px] px-8 pt-20 pb-10 lg:px-16">
        <p className="mb-4 text-[13px] font-bold tracking-[2px] text-[#a9834f] uppercase">
          {t("eyebrow")}
        </p>
        <h1 className="mb-3 font-[family-name:var(--font-cormorant)] text-[44px] font-medium">
          {t("title")}
        </h1>
        <p className="max-w-[600px] text-base text-[#4a473f]">{t("intro")}</p>
      </div>

      <PropertiesBrowser properties={properties} />
    </div>
  );
}
