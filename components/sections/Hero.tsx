"use client";

import Image from "next/image";
import { siteConfig } from "@/config/site.config";
import { useLanguage } from "@/hooks/useLanguage";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Reveal } from "@/components/ui/Reveal";
import { HeartIcon } from "@/components/ui/icons";

const { hero } = siteConfig;

export function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className="relative scroll-mt-16 overflow-hidden bg-accent"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-secondary/30 blur-2xl"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-primary/20 blur-3xl"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-6 py-14 md:grid-cols-[1.1fr_0.9fr] md:px-8 md:py-20">
        <Reveal>
          {hero.eyebrow && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-white shadow-sm">
              <HeartIcon className="h-3.5 w-3.5" />
              {t(hero.eyebrow)}
            </span>
          )}
          <h1 className="mt-4 font-heading text-4xl font-bold leading-[1.02] tracking-tight text-primary md:text-6xl">
            {t(hero.title)}
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-foreground/75 md:text-lg">
            {t(hero.subtitle)}
          </p>
          <div className="mt-7">
            <WhatsAppButton label={t(hero.ctaText)} />
          </div>
        </Reveal>

        {hero.backgroundImage && (
          <Reveal
            delay={0.1}
            className="relative mx-auto w-full max-w-[280px] sm:max-w-[320px]"
          >
            <span
              aria-hidden
              className="absolute inset-0 -rotate-6 rounded-[2.5rem] bg-secondary/25"
            />
            <div className="img-shimmer relative aspect-square w-full rotate-3 overflow-hidden rounded-[2.5rem] border-[6px] border-background shadow-2xl">
              <Image
                src={hero.backgroundImage}
                alt={t(hero.title)}
                fill
                priority
                sizes="(max-width: 768px) 80vw, 320px"
                className="object-cover"
              />
            </div>
            <span
              aria-hidden
              className="absolute -left-4 -top-4 flex h-16 w-16 -rotate-12 items-center justify-center rounded-full bg-background shadow-lg"
            >
              <HeartIcon className="h-8 w-8 text-secondary" />
            </span>
          </Reveal>
        )}
      </div>
    </section>
  );
}
