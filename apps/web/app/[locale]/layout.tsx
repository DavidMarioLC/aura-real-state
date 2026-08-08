import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { getSiteChrome } from "@/cms/global";
import { getHomeContent } from "@/cms/home";
import { metadataFromSeo } from "@/i18n/metadata";
import { toLocale } from "@/i18n/params";
import { HTML_LANG, OG_LOCALE, routing } from "@/i18n/routing";
import { SITE_NAME, SITE_URL } from "../site-config";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  // This layout carries the home page's own metadata plus the OG/Twitter
  // defaults every route inherits, so it reads the home's `seo` block.
  const { seo } = await getHomeContent(locale);
  const base = metadataFromSeo(seo, "/", locale);

  return {
    ...base,
    metadataBase: new URL(SITE_URL),
    title: {
      default: seo.title,
      template: `%s · ${SITE_NAME}`,
    },
    openGraph: {
      ...base.openGraph,
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale],
      type: "website",
      images: [{ url: "/placeholder.svg", width: 1200, height: 1200 }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.ogTitle,
      description: seo.ogDescription,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);

  setRequestLocale(locale);

  const { siteName, nav, footer } = await getSiteChrome(locale);

  return (
    <html
      lang={HTML_LANG[locale]}
      className={`${cormorant.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#f6f2ea] font-[family-name:var(--font-manrope)] text-[#201f1c]">
        <NextIntlClientProvider>
          <Nav siteName={siteName} nav={nav} />
          <main className="flex-1">{children}</main>
          <Footer siteName={siteName} footer={footer} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
