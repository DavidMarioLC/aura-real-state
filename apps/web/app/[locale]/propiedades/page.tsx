import { setRequestLocale } from "next-intl/server";
import { getProperties } from "@/cms/properties";
import { getPropertiesPage } from "@/cms/properties-page";
import { toLocale } from "@/i18n/params";
import PageHeader from "../components/PageHeader";
import PropertiesBrowser from "./PropertiesBrowser";

export default async function PropertiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  setRequestLocale(locale);

  const [{ header }, properties] = await Promise.all([
    getPropertiesPage(locale),
    getProperties(locale),
  ]);

  return (
    <div>
      <PageHeader header={header} className="pb-10" />

      <PropertiesBrowser properties={properties} />
    </div>
  );
}
