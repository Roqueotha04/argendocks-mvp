"use client";

import { siteConfig } from "@/config/site.config";
import { useLanguage } from "@/hooks/useLanguage";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { HorizontalScroller, scrollerItemClassName } from "@/components/ui/HorizontalScroller";

const { platform } = siteConfig;

export function Platform() {
  const { t } = useLanguage();

  if (!platform) return null;

  return (
    <Section id="platform" stacked className="z-10 bg-accent">
      <SectionHeading eyebrow={platform.eyebrow} title={platform.title} subtitle={platform.subtitle} />

      <HorizontalScroller desktopGridClassName="md:grid-cols-4 md:gap-4" className="mt-10 md:items-start">
        {platform.features.map((feature, index) => (
          <Reveal
            key={feature.title.es}
            delay={index * 0.05}
            className={`${scrollerItemClassName} h-full ${index % 2 === 1 ? "md:mt-10" : ""}`}
          >
            <article className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-[0_1px_0_rgba(19,48,90,0.08)]">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-2.5 py-1 font-data text-[10px] uppercase tracking-[0.18em] text-white">
                <span aria-hidden className="h-1 w-1 rounded-full bg-secondary" />
                {t(feature.label)}
              </span>
              <h3 className="mt-6 font-heading text-lg font-semibold leading-tight text-primary">
                {t(feature.title)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-primary/75">{t(feature.description)}</p>
            </article>
          </Reveal>
        ))}
      </HorizontalScroller>
    </Section>
  );
}
