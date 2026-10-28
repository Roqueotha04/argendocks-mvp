"use client";

import Image from "next/image";
import { siteConfig } from "@/config/site.config";
import { useLanguage } from "@/hooks/useLanguage";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { HeartIcon } from "@/components/ui/icons";

const { about } = siteConfig;

export function AboutSplit() {
  const { t } = useLanguage();

  return (
    <Section id="about" stacked className="overflow-hidden bg-accent">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-20 top-10 h-64 w-64 rounded-full bg-primary/10 blur-2xl"
      />

      <div className="relative grid items-center gap-10 md:grid-cols-2">
        <Reveal delay={0.05} className="order-last md:order-first">
          <div className="relative mx-auto w-full max-w-md">
            <span
              aria-hidden
              className="absolute inset-0 -rotate-3 rounded-[2.5rem] bg-primary/15"
            />
            <div className="img-shimmer relative aspect-[4/5] w-full rotate-2 overflow-hidden rounded-[2.5rem] border-[6px] border-white shadow-2xl">
              {about.image && (
                <Image
                  src={about.image}
                  alt={t(about.title)}
                  fill
                  sizes="(max-width: 768px) 90vw, 45vw"
                  className="object-cover"
                />
              )}
            </div>
            <span
              aria-hidden
              className="absolute -bottom-4 -right-4 flex h-16 w-16 rotate-12 items-center justify-center rounded-full bg-primary shadow-lg"
            >
              <HeartIcon className="h-8 w-8 text-white" />
            </span>
          </div>
        </Reveal>

        <Reveal>
          <SectionHeading eyebrow={about.eyebrow} title={about.title} />
          <div className="mt-5 space-y-4">
            {t(about.body).map((paragraph, index) => (
              <p
                key={index}
                className="text-base leading-relaxed text-foreground/80 md:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {about.highlights && about.highlights.length > 0 && (
            <dl className="mt-8 grid grid-cols-3 gap-3">
              {about.highlights.map((highlight) => (
                <div
                  key={highlight.value}
                  className="rounded-2xl bg-white p-3 text-center shadow-sm"
                >
                  <dt className="font-heading text-xl font-bold text-primary">
                    {highlight.value}
                  </dt>
                  <dd className="mt-0.5 text-xs text-foreground/70">
                    {t(highlight.label)}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </Reveal>
      </div>
    </Section>
  );
}
