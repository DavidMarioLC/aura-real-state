import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { alternatesFor } from "@/i18n/metadata";
import { toLocale } from "@/i18n/params";
import { getTeam } from "../../data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: "Metadata.team" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: alternatesFor("/equipo", locale),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `/${locale}/equipo`,
    },
  };
}

export default async function TeamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  setRequestLocale(locale);

  const t = await getTranslations("Team");
  const team = getTeam(locale);

  return (
    <div>
      <div className="mx-auto max-w-[1400px] px-8 pt-20 pb-15 lg:px-16">
        <p className="mb-4 text-[13px] font-bold tracking-[2px] text-[#a9834f] uppercase">
          {t("eyebrow")}
        </p>
        <h1 className="mb-3 font-[family-name:var(--font-cormorant)] text-[44px] font-medium">
          {t("title")}
        </h1>
        <p className="max-w-[620px] text-base text-[#4a473f]">{t("intro")}</p>
      </div>
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-8 pb-30 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:px-16">
        {team.map((m) => (
          <div key={m.id}>
            <div className="relative mb-5 h-[320px] w-full">
              <Image
                src="/placeholder.svg"
                alt={t("photoAlt", { name: m.name, role: m.role })}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <h2 className="mb-1 font-[family-name:var(--font-cormorant)] text-2xl font-medium">
              {m.name}
            </h2>
            <p className="mb-3 text-[13px] font-bold tracking-[1px] text-[#a9834f] uppercase">
              {m.role}
            </p>
            <p className="mb-3.5 text-[15px] leading-relaxed text-[#4a473f]">
              {m.bio}
            </p>
            <a
              href={`mailto:${m.email}`}
              className="border-b-2 border-[#a9834f] pb-0.5 text-[13px] font-bold"
            >
              {m.email}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
