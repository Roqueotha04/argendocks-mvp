import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site.config";
import { ports } from "@/config/ports";
import { findPortBySlug } from "@/lib/ports";
import { PageShell } from "@/components/layout/PageShell";
import { PortRecord } from "@/components/ports/PortRecord";

export const dynamicParams = false;

export function generateStaticParams() {
  return ports.map((port) => ({ slug: port.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const port = findPortBySlug(slug);
  if (!port) return {};
  return {
    title: `${port.nombre} (${port.unLocode})`,
    description: port.descripcion[siteConfig.site.defaultLocale],
    openGraph: { images: [{ url: port.foto.src }] },
  };
}

export default async function PortPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const port = findPortBySlug(slug);
  if (!port) notFound();

  return (
    <PageShell>
      <PortRecord port={port} />
    </PageShell>
  );
}
