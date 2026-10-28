"use client";

import { siteConfig } from "@/config/site.config";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { ProductCard } from "@/components/ui/ProductCard";
import { useDragScroll } from "@/hooks/useDragScroll";

const { offerings } = siteConfig;
const Card = offerings.kind === "products" ? ProductCard : ServiceCard;

export function OfferingsCarousel() {
  const scrollRef = useDragScroll<HTMLDivElement>();

  return (
    <Section id="offerings" className="bg-foreground/[0.02]">
      <div className="max-w-2xl">
        <SectionHeading title={offerings.title} subtitle={offerings.subtitle} />
      </div>

      <div
        ref={scrollRef}
        className="mt-12 -mx-6 flex snap-x snap-proximity scroll-px-6 gap-5 overflow-x-auto px-6 pb-4 select-none cursor-grab active:cursor-grabbing md:-mx-8 md:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {offerings.items.map((item, index) => (
          <Reveal key={item.name.es} delay={index * 0.04} className="w-72 shrink-0 snap-start">
            <Card item={item} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
