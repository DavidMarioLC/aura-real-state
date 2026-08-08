import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { getContactPage } from "@/cms/contact-page";
import { metadataFromSeo } from "@/i18n/metadata";
import { toLocale } from "@/i18n/params";
import PageHeader from "../components/PageHeader";
import ContactForm from "./ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  const { seo } = await getContactPage(locale);

  return metadataFromSeo(seo, "/contacto", locale);
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  setRequestLocale(locale);

  const { header, infoBlocks, map, mapAlt } = await getContactPage(locale);

  return (
    <div>
      <PageHeader header={header} className="pb-15" />

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-8 pb-30 lg:grid-cols-[1.2fr_1fr] lg:px-16">
        <ContactForm />

        <div className="flex flex-col gap-8">
          <div className="relative h-[260px] w-full">
            <Image
              src={map.url}
              alt={mapAlt ?? ""}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
          {/* Editors decide how many blocks there are and in what order. */}
          {infoBlocks.map((block) => (
            <div key={block.title}>
              <div className="mb-2.5 text-xs font-bold tracking-[1px] text-[#a9834f] uppercase">
                {block.title}
              </div>
              <div className="text-base leading-relaxed whitespace-pre-line">
                {block.body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
