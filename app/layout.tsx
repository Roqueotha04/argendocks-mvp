import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site.config";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { JsonLd } from "@/components/seo/JsonLd";

// Keep these imports in sync with brand.headingFont / brand.bodyFont in site.config.ts
const headingFont = Geist({
  subsets: ["latin"],
  variable: "--font-heading-face",
  display: "swap",
});

const bodyFont = Geist({
  subsets: ["latin"],
  variable: "--font-body-face",
  display: "swap",
});

const { site, business, seo } = siteConfig;
const locale = site.defaultLocale;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: seo.title[locale],
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
    <html lang={locale} suppressHydrationWarning className={`${headingFont.variable} ${bodyFont.variable} h-full antialiased`}>
      <body className="min-h-full font-body">
        <JsonLd />
        <MotionProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
