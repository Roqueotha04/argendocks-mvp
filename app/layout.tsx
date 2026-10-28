import type { Metadata } from "next";
import { IBM_Plex_Mono, Instrument_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site.config";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { JsonLd } from "@/components/seo/JsonLd";

const sansFont = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-heading-face",
  display: "swap",
});

const accentFont = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-accent-face",
  display: "swap",
});

const dataFont = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-data-face",
  display: "swap",
});

const { site, business, seo } = siteConfig;
const locale = site.defaultLocale;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: seo.title[locale],
    template: `%s — ${business.name}`,
  },
  description: seo.description[locale],
  keywords: seo.keywords,
  openGraph: {
    title: seo.title[locale],
    description: seo.description[locale],
    url: site.url,
    siteName: business.name,
    locale,
    type: "website",
    ...(seo.ogImage && { images: [{ url: seo.ogImage }] }),
  },
  alternates: {
    canonical: site.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${sansFont.variable} ${accentFont.variable} ${dataFont.variable} h-full antialiased`}
    >
      <body className="min-h-full font-body">
        <JsonLd />
        <MotionProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
