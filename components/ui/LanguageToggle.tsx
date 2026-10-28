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
      className="flex h-9 items-center gap-1 rounded-full border border-white/20 px-3 font-data text-[11px] tracking-widest text-white/60 transition-colors hover:border-white/50"
    >
      <span className={locale === "es" ? "text-white" : ""}>ES</span>
      <span aria-hidden className="text-white/30">/</span>
      <span className={locale === "en" ? "text-white" : ""}>EN</span>
    </button>
  );
}
