"use client";

import { ui } from "@/config/i18n";
import { useLanguage } from "@/hooks/useLanguage";

export function LanguageToggle() {
  const { locale, toggleLocale, t } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={t(ui.languageToggle.label)}
      className="rounded-full border border-foreground/20 px-3 py-1.5 text-xs font-semibold tracking-wide text-foreground transition-colors hover:bg-foreground/5"
    >
      {locale === "es" ? "EN" : "ES"}
    </button>
  );
}
