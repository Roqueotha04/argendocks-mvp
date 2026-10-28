import type { Metadata } from "next";
import { siteConfig } from "@/config/site.config";
import { ui } from "@/config/i18n";
import { PageShell } from "@/components/layout/PageShell";
import { PageIntro } from "@/components/layout/PageIntro";
import { PortExplorer } from "@/components/ports/PortExplorer";

const locale = siteConfig.site.defaultLocale;

export const metadata: Metadata = {
  title: ui.explorer.title[locale],
  description: ui.explorer.subtitle[locale],
};

export default function PortsPage() {
  return (
    <PageShell>
      <PageIntro eyebrow={ui.explorer.eyebrow} title={ui.explorer.title} subtitle={ui.explorer.subtitle} />
      <PortExplorer />
    </PageShell>
  );
}
