"use client";

import { siteConfig } from "@/config/site.config";
import { useLanguage } from "@/hooks/useLanguage";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const { about } = siteConfig;

export function About() {
  const { t } = useLanguage();

  return (
    <Section id="about">
      <Reveal className="max-w-2xl">
        <SectionHeading title={about.title} />
        <div className="mt-6 space-y-4">
          {t(about.body).map((paragraph, index) => (
            <p
              key={index}
              className="text-lg leading-relaxed text-foreground/70"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
