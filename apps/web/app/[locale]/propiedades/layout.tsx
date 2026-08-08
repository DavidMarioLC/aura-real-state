import type { Metadata } from "next";
import { getPropertiesPage } from "@/cms/properties-page";
import { metadataFromSeo } from "@/i18n/metadata";
import { toLocale } from "@/i18n/params";
import { SITE_NAME } from "../../site-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  const { seo } = await getPropertiesPage(locale);

  return {
    ...metadataFromSeo(seo, "/propiedades", locale),
    // The detail pages nest under this segment and set their own title, so the
    // listing's title has to be a template rather than a plain string.
    title: { default: seo.title, template: `%s · ${SITE_NAME}` },
  };
}

export default function PropertiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
