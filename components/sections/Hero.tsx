"use client";

import { useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config/site.config";
import { ports } from "@/config/ports";
import { ui } from "@/config/i18n";
import { useLanguage } from "@/hooks/useLanguage";
import { useCycle } from "@/hooks/useCycle";
import { PORTS_PATH } from "@/lib/navigation";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Reveal } from "@/components/ui/Reveal";
import { PortMap } from "@/components/map/PortMap";
import { ArrowRightIcon } from "@/components/ui/icons";

const { hero } = siteConfig;

export function Hero() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const activeIndex = useCycle(ports.length, 2600, !reduceMotion);

  return (
    <section id="hero" className="relative scroll-mt-20 overflow-hidden bg-deep pb-20 text-white md:pb-24">
      <span
        aria-hidden
        className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-secondary/25 blur-3xl"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_100%]"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pt-12 md:grid-cols-[1.2fr_0.8fr] md:px-8 md:pt-16">
        <Reveal>
          {hero.eyebrow && (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-data text-[11px] uppercase tracking-[0.18em] text-accent">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-secondary" />
              {t(hero.eyebrow)}
            </span>
          )}
          <h1 className="mt-6 max-w-xl font-heading text-[2.6rem] font-semibold leading-[0.98] tracking-tight text-balance md:text-6xl">
            {t(hero.title)}
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-accent/85 md:text-lg">
            {t(hero.subtitle)}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={PORTS_PATH} variant="signal">
              {t(hero.ctaText)}
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
            <WhatsAppButton
              label={t(hero.secondaryCtaText ?? ui.whatsapp.cta)}
              variant="outlineOnColor"
            />
          </div>

          {hero.highlights && (
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-5">
              {hero.highlights.map((highlight) => (
                <li key={highlight.es} className="flex items-center gap-2 font-data text-xs text-accent/80">
                  <span aria-hidden className="h-px w-3 bg-secondary" />
                  {t(highlight)}
                </li>
              ))}
            </ul>
          )}
        </Reveal>

        <Reveal delay={0.1} className="relative mx-auto w-full max-w-[250px] sm:max-w-[280px] md:max-w-[300px]">
          <span
            aria-hidden
            className="absolute -inset-6 rounded-[2.5rem] border border-white/10 bg-primary/30"
          />
          <PortMap
            ports={ports}
            label={t(ui.explorer.mapLabel)}
            activeSlug={ports[activeIndex].slug}
          />
        </Reveal>
      </div>
    </section>
  );
}
