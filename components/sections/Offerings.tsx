"use client";

import { siteConfig } from "@/config/site.config";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { HorizontalScroller, scrollerItemClassName } from "@/components/ui/HorizontalScroller";

const { offerings } = siteConfig;

export function Offerings() {
  return (
    <Section id="offerings" stacked className="bg-accent">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow={offerings.eyebrow} title={offerings.title} subtitle={offerings.subtitle} />
          <WhatsAppButton variant="primary" className="mt-8" />
        </div>

        <HorizontalScroller desktopGridClassName="md:grid-cols-2 md:gap-4">
          {offerings.items.map((item, index) => (
            <Reveal key={item.name.es} delay={index * 0.05} className={`${scrollerItemClassName} h-full`}>
              <ServiceCard item={item} />
            </Reveal>
          ))}
        </HorizontalScroller>
      </div>
    </Section>
  );
}
