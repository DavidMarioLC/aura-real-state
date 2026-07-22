import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "./site-config";

const DESCRIPTION =
  "Un portafolio curado de residencias, villas y penthouses seleccionados con criterio, para quienes no negocian el buen gusto.";

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Aura — Bienes raíces de autor",
    template: `%s · ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Aura — Bienes raíces de autor",
    description: DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    locale: "es_MX",
    type: "website",
    images: [{ url: "/placeholder.svg", width: 1200, height: 1200 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aura — Bienes raíces de autor",
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#f6f2ea] font-[family-name:var(--font-manrope)] text-[#201f1c]">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
