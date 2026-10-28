"use client";

import Image from "next/image";
import { siteConfig } from "@/config/site.config";
import { useLanguage } from "@/hooks/useLanguage";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { useDragScroll } from "@/hooks/useDragScroll";

export function Testimonials() {
  const { t } = useLanguage();
  const scrollRef = useDragScroll<HTMLDivElement>();
  const testimonials = siteConfig.testimonials;

  if (!testimonials) return null;

  return (
    <Section id="testimonials">
      <SectionHeading title={testimonials.title} subtitle={testimonials.subtitle} />

      <div
        ref={scrollRef}
        className="mt-8 -mx-6 flex snap-x snap-proximity scroll-px-6 gap-6 overflow-x-auto px-6 pb-4 select-none md:mx-auto md:grid md:max-w-4xl md:grid-cols-3 md:gap-8 md:overflow-visible md:px-0 md:pb-0 cursor-grab active:cursor-grabbing md:cursor-auto md:select-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {testimonials.items.map((item, index) => (
          <Reveal
            key={item.name}
            delay={index * 0.04}
            className="w-[75vw] shrink-0 snap-start sm:w-[45vw] md:w-auto"
          >
            <blockquote className="flex h-full flex-col rounded-2xl border border-foreground/10 p-5">
              <p className="flex-1 text-sm leading-relaxed text-foreground/75 before:content-['“'] after:content-['”']">
                {t(item.quote)}
              </p>
              <footer className="mt-4 flex items-center gap-3 border-t border-foreground/5 pt-4">
                {item.avatar && (
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                )}
                <div>
                  <cite className="block text-sm font-semibold not-italic text-foreground">
                    {item.name}
                  </cite>
                  {item.role && (
                    <span className="text-xs text-foreground/60">{t(item.role)}</span>
                  )}
                </div>
              </footer>
            </blockquote>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
