"use client";

import Image from "next/image";
import { siteConfig } from "@/config/site.config";
import { useLanguage } from "@/hooks/useLanguage";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { FounderChapters } from "@/components/sections/FounderChapters";

const { about } = siteConfig;

export function AboutSplit() {
  const { t } = useLanguage();

  return (
    <Section
      id="about"
      className="bg-primary text-white"
      topDivider={<WaveDivider className="fill-primary" />}
    >
      <div className="grid items-center gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-14">
        <Reveal className="relative mx-auto w-full max-w-[300px] md:max-w-sm">
          <span
            aria-hidden
            className="absolute -inset-3 rounded-t-full rounded-b-3xl border border-white/20"
          />
          <div className="img-shimmer relative aspect-[4/5] w-full overflow-hidden rounded-t-full rounded-b-3xl">
            {about.image && (
              <Image
                src={about.image}
                alt={about.imageAlt ? t(about.imageAlt) : t(about.title)}
                fill
                sizes="(max-width: 768px) 80vw, 380px"
                className="object-cover object-top"
              />
            )}
          </div>
          <span
            aria-hidden
            className="absolute -bottom-3 -right-3 h-16 w-16 rounded-full border-[6px] border-primary bg-secondary"
          />
        </Reveal>

        <Reveal delay={0.05}>
          <SectionHeading eyebrow={about.eyebrow} title={about.title} subtitle={about.subtitle} tone="onColor" />
          <div className="mt-5 space-y-3">
            {t(about.body).map((paragraph) => (
              <p key={paragraph} className="max-w-xl text-base leading-relaxed text-accent/90">
                {paragraph}
              </p>
            ))}
          </div>
          {about.chapters && <FounderChapters chapters={about.chapters} />}
        </Reveal>
      </div>
    </Section>
  );
}
