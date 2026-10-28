import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site.config";
import { offeringSlug, findOfferingBySlug } from "@/lib/slug";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { OfferingDetail } from "@/components/sections/OfferingDetail";

export const dynamicParams = false;

export function generateStaticParams() {
  return siteConfig.offerings.items.map((item) => ({ slug: offeringSlug(item) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = findOfferingBySlug(slug);
  if (!item) return {};
  const locale = siteConfig.site.defaultLocale;
  return {
    title: `${item.name[locale]} — ${siteConfig.business.name}`,
    description: item.description[locale],
  };
}

export default async function OfferingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = findOfferingBySlug(slug);
  if (!item) notFound();

  return (
    <>
      <Navbar />
      <main>
        <OfferingDetail item={item} kind={siteConfig.offerings.kind} />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
