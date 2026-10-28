"use client";

import type { Localized } from "@/config/site.types";
import { useLanguage } from "@/hooks/useLanguage";

type HeadingTone = "default" | "onColor";

interface SectionHeadingProps {
  title: Localized;
  subtitle?: Localized;
  eyebrow?: Localized;
  tone?: HeadingTone;
  align?: "left" | "center";
  as?: "h1" | "h2";
}

const toneClasses: Record<HeadingTone, { title: string; subtitle: string; eyebrow: string }> = {
  default: {
    title: "text-primary",
    subtitle: "text-secondary",
    eyebrow: "text-primary/70",
  },
  onColor: {
    title: "text-white",
    subtitle: "text-accent",
    eyebrow: "text-accent/80",
  },
};

export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  tone = "default",
  align = "left",
  as: HeadingTag = "h2",
}: SectionHeadingProps) {
  const { t } = useLanguage();
  const styles = toneClasses[tone];

  return (
    <div className={align === "center" ? "flex flex-col items-center text-center" : ""}>
      {eyebrow && (
        <span
          className={`mb-4 inline-flex items-center gap-2 font-data text-[11px] font-medium uppercase tracking-[0.22em] ${styles.eyebrow}`}
        >
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-secondary" />
          {t(eyebrow)}
        </span>
      )}
      <HeadingTag
        className={`max-w-2xl font-heading text-3xl font-semibold leading-[1.05] tracking-tight text-balance md:text-[2.6rem] ${styles.title}`}
      >
        {t(title)}
      </HeadingTag>
      {subtitle && (
        <p className={`mt-3 max-w-xl font-accent text-xl italic leading-snug md:text-2xl ${styles.subtitle}`}>
          {t(subtitle)}
        </p>
      )}
    </div>
  );
}
