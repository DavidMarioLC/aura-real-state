import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { alternatesFor } from "@/i18n/metadata";
import { toLocale } from "@/i18n/params";
import { SITE_NAME } from "../../site-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: "Metadata.properties" });

  return {
    title: { default: t("title"), template: `%s · ${SITE_NAME}` },
    description: t("description"),
    alternates: alternatesFor("/propiedades", locale),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `/${locale}/propiedades`,
    },
  };
}

export default function PropertiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
