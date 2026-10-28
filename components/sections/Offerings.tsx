"use client";

import { siteConfig } from "@/config/site.config";
import { useLanguage } from "@/hooks/useLanguage";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Carousel, carouselItemClassName } from "@/components/ui/Carousel";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

const { offerings } = siteConfig;

export function Offerings() {
  const { t } = useLanguage();

  return (
    <Section id="offerings" stacked className="bg-accent">
      <Carousel
        header={<SectionHeading eyebrow={offerings.eyebrow} title={offerings.title} subtitle={offerings.subtitle} />}
      >
        {offerings.items.map((item) => (
          <div key={item.name.es} className={carouselItemClassName}>
            <ServiceCard item={item} />
          </div>
        ))}
      </Carousel>
      {offerings.ctaText && (
        <WhatsAppButton label={t(offerings.ctaText)} variant="primary" className="mt-8" />
      )}
    </Section>
  );
}
