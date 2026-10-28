"use client";

import { siteConfig } from "@/config/site.config";
import { ui } from "@/config/i18n";
import { useLanguage } from "@/hooks/useLanguage";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { ProductCard } from "@/components/ui/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { useDragScroll } from "@/hooks/useDragScroll";

const { offerings } = siteConfig;
const Card = offerings.kind === "products" ? ProductCard : ServiceCard;

export function Offerings() {
  const { t } = useLanguage();
  const scrollRef = useDragScroll<HTMLDivElement>();

  return (
    <Section
      id="offerings"
      className="bg-neutral-200"
      topDivider={<WaveDivider className="fill-neutral-200" />}
    >
      <SectionHeading title={offerings.title} subtitle={offerings.subtitle} />

      <div
        ref={scrollRef}
        className="mt-8 -mx-6 flex snap-x snap-proximity scroll-px-6 gap-8 overflow-x-auto px-6 pb-4 select-none md:mx-auto md:grid md:max-w-[58rem] md:grid-cols-3 md:gap-12 md:overflow-visible md:px-0 md:pb-0 md:scroll-px-0 md:cursor-auto md:select-auto cursor-grab active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {offerings.items.map((item, index) => (
          <Reveal
            key={item.name.es}
            delay={index * 0.04}
            className="h-full w-[52vw] shrink-0 snap-start sm:w-[32vw] md:w-auto"
          >
            <Card item={item} />
          </Reveal>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-primary/30 px-6 py-2.5 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          {t(ui.offerings.viewAll)}
        </button>
      </div>
    </Section>
  );
}
