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
}

const toneClasses: Record<HeadingTone, { title: string; subtitle: string; eyebrow: string }> = {
  default: {
    title: "text-primary",
    subtitle: "text-foreground/75",
    eyebrow: "bg-primary/10 text-primary",
  },
  onColor: {
    title: "text-white",
    subtitle: "text-white/80",
    eyebrow: "bg-white/20 text-white",
  },
};

export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  tone = "default",
  align = "left",
}: SectionHeadingProps) {
  const { t } = useLanguage();
  const styles = toneClasses[tone];

  return (
    <div className={align === "center" ? "flex flex-col items-center text-center" : ""}>
      {eyebrow && (
        <span
          className={`mb-3 inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${styles.eyebrow}`}
        >
          {t(eyebrow)}
        </span>
      )}
      <h2
        className={`font-heading text-2xl font-bold tracking-tight md:text-3xl ${styles.title}`}
      >
        {t(title)}
      </h2>
      {subtitle && (
        <p className={`mt-3 max-w-xl text-base ${styles.subtitle}`}>{t(subtitle)}</p>
      )}
    </div>
  );
}
