"use client";

import { siteConfig } from "@/config/site.config";
import { ports } from "@/config/ports";
import { useLanguage } from "@/hooks/useLanguage";
import { PORTS_PATH } from "@/lib/navigation";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { HorizontalScroller, scrollerItemClassName } from "@/components/ui/HorizontalScroller";
import { PortCard } from "@/components/ports/PortCard";
import { ArrowRightIcon } from "@/components/ui/icons";

const { portsPreview } = siteConfig;
const featuredPorts = ports.slice(0, 4);

export function PortsPreview() {
  const { t } = useLanguage();

  if (!portsPreview) return null;

  return (
    <Section id="ports" className="bg-background">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow={portsPreview.eyebrow}
          title={portsPreview.title}
          subtitle={portsPreview.subtitle}
        />
        <Button href={PORTS_PATH} variant="outline" className="w-fit shrink-0">
          {t(portsPreview.ctaText)}
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>

      <HorizontalScroller desktopGridClassName="md:grid-cols-2 lg:grid-cols-4 md:gap-4" className="mt-10">
        {featuredPorts.map((port, index) => (
          <Reveal key={port.slug} delay={index * 0.05} className={`${scrollerItemClassName} h-full`}>
            <PortCard port={port} />
          </Reveal>
        ))}
      </HorizontalScroller>
    </Section>
  );
}
