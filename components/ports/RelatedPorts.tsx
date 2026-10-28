"use client";

import { ui } from "@/config/i18n";
import type { Puerto } from "@/config/port.types";
import { findRelatedPorts } from "@/lib/ports";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { HorizontalScroller, scrollerItemClassName } from "@/components/ui/HorizontalScroller";
import { PortCard } from "@/components/ports/PortCard";

export function RelatedPorts({ port }: { port: Puerto }) {
  const relatedPorts = findRelatedPorts(port);

  return (
    <Section stacked className="bg-accent print:hidden">
      <SectionHeading title={ui.portDetail.relatedTitle} subtitle={ui.portDetail.relatedSubtitle} />
      <HorizontalScroller desktopGridClassName="md:grid-cols-3 md:gap-4" className="mt-8">
        {relatedPorts.map((related, index) => (
          <Reveal key={related.slug} delay={index * 0.05} className={`${scrollerItemClassName} h-full`}>
            <PortCard port={related} />
          </Reveal>
        ))}
      </HorizontalScroller>
    </Section>
  );
}
