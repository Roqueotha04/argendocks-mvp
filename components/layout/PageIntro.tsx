"use client";

import type { Localized } from "@/config/site.types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

interface PageIntroProps {
  eyebrow?: Localized;
  title: Localized;
  subtitle?: Localized;
}

export function PageIntro({ eyebrow, title, subtitle }: PageIntroProps) {
  return (
    <header className="relative overflow-hidden bg-deep pb-20 pt-12 md:pb-24 md:pt-16">
      <span
        aria-hidden
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-secondary/25 blur-3xl"
      />
      <Reveal className="relative mx-auto w-full max-w-6xl px-6 md:px-8">
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} subtitle={subtitle} tone="onColor" />
      </Reveal>
    </header>
  );
}
