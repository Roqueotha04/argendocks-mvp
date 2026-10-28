"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/config/site.config";
import { ui } from "@/config/i18n";
import type { Puerto } from "@/config/port.types";
import { useLanguage } from "@/hooks/useLanguage";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { UnderlineField, underlineInputClassName } from "@/components/ui/UnderlineField";
import { ChevronDownIcon, CheckIcon } from "@/components/ui/icons";

const labels = ui.suggestion;

const emptySuggestion = { terminal: "", field: "", value: "", source: "", name: "", email: "" };

type Suggestion = typeof emptySuggestion;

export function SuggestionForm({ port }: { port: Puerto }) {
  const { t } = useLanguage();
  const [suggestion, setSuggestion] = useState<Suggestion>(emptySuggestion);
  const [isSent, setIsSent] = useState(false);

  function update(field: keyof Suggestion, value: string) {
    setSuggestion((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = `${t(labels.mailSubject)} — ${port.nombre} (${port.unLocode})`;
    const body = [
      `${t(labels.terminalLabel)}: ${suggestion.terminal || t(labels.wholePort)}`,
      `${t(labels.fieldLabel)}: ${suggestion.field}`,
      `${t(labels.valueLabel)}: ${suggestion.value}`,
      `${t(labels.sourceLabel)}: ${suggestion.source}`,
      `${t(labels.nameLabel)}: ${suggestion.name} <${suggestion.email}>`,
    ].join("\n");
    window.location.href = `mailto:${siteConfig.business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setIsSent(true);
  }

  function reset() {
    setSuggestion(emptySuggestion);
    setIsSent(false);
  }

  return (
    <Section className="bg-background print:hidden">
      <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
        <SectionHeading eyebrow={labels.eyebrow} title={labels.title} subtitle={labels.subtitle} />

        <Reveal delay={0.05}>
          {isSent ? (
            <div role="status" className="rounded-2xl border border-secondary/30 bg-secondary/5 p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-white">
                <CheckIcon className="h-5 w-5" />
              </span>
              <p className="mt-4 font-heading text-lg font-semibold text-primary">{t(labels.sentTitle)}</p>
              <p className="mt-1 text-sm text-primary/75">{t(labels.sentBody)}</p>
              <button
                type="button"
                onClick={reset}
                className="mt-5 text-sm font-semibold text-secondary underline-offset-4 hover:underline"
              >
                {t(labels.sendAnother)}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-7 sm:grid-cols-2">
              <UnderlineField label={t(labels.terminalLabel)}>
                <span className="relative block">
                  <select
                    value={suggestion.terminal}
                    onChange={(event) => update("terminal", event.target.value)}
                    className={`${underlineInputClassName} cursor-pointer appearance-none pr-8`}
                  >
                    <option value="">{t(labels.wholePort)}</option>
                    {port.terminales.map((terminal) => (
                      <option key={terminal.nombre} value={terminal.nombre}>
                        {terminal.nombre}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/60" />
                </span>
              </UnderlineField>
              <UnderlineField label={t(labels.fieldLabel)}>
                <span className="relative block">
                  <select
                    value={suggestion.field}
                    onChange={(event) => update("field", event.target.value)}
                    required
                    className={`${underlineInputClassName} cursor-pointer appearance-none pr-8`}
                  >
                    <option value="" disabled>
                      —
                    </option>
                    {labels.fields.map((field) => (
                      <option key={field.es} value={t(field)}>
                        {t(field)}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/60" />
                </span>
              </UnderlineField>
              <UnderlineField label={t(labels.valueLabel)} className="sm:col-span-2">
                <textarea
                  value={suggestion.value}
                  onChange={(event) => update("value", event.target.value)}
                  placeholder={t(labels.valuePlaceholder)}
                  required
                  rows={3}
                  className={`${underlineInputClassName} resize-none`}
                />
              </UnderlineField>
              <UnderlineField label={t(labels.sourceLabel)} className="sm:col-span-2">
                <input
                  type="text"
                  value={suggestion.source}
                  onChange={(event) => update("source", event.target.value)}
                  placeholder={t(labels.sourcePlaceholder)}
                  required
                  className={underlineInputClassName}
                />
              </UnderlineField>
              <UnderlineField label={t(labels.nameLabel)}>
                <input
                  type="text"
                  value={suggestion.name}
                  onChange={(event) => update("name", event.target.value)}
                  autoComplete="name"
                  required
                  className={underlineInputClassName}
                />
              </UnderlineField>
              <UnderlineField label={t(labels.emailLabel)}>
                <input
                  type="email"
                  value={suggestion.email}
                  onChange={(event) => update("email", event.target.value)}
                  autoComplete="email"
                  required
                  className={underlineInputClassName}
                />
              </UnderlineField>
              <button
                type="submit"
                className="inline-flex h-12 w-fit items-center justify-center rounded-full bg-primary px-7 text-sm font-semibold text-white transition-colors hover:bg-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
              >
                {t(labels.submit)}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </Section>
  );
}
