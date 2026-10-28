"use client";

import { useRef, useState, type FormEvent } from "react";
import { siteConfig } from "@/config/site.config";
import { ui } from "@/config/i18n";
import type { Puerto } from "@/config/port.types";
import { useLanguage } from "@/hooks/useLanguage";
import { Field, fieldInputClassName } from "@/components/ui/Field";
import { SelectField } from "@/components/ui/SelectField";
import { CheckIcon, CloseIcon } from "@/components/ui/icons";

const labels = ui.suggestion;

const emptySuggestion = { terminal: "", field: "", value: "", source: "", name: "", email: "" };

type Suggestion = typeof emptySuggestion;

export function SuggestionDialog({ port }: { port: Puerto }) {
  const { t } = useLanguage();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [suggestion, setSuggestion] = useState<Suggestion>(emptySuggestion);
  const [isSent, setIsSent] = useState(false);

  function update(field: keyof Suggestion, value: string) {
    setSuggestion((current) => ({ ...current, [field]: value }));
  }

  function open() {
    setSuggestion(emptySuggestion);
    setIsSent(false);
    dialogRef.current?.showModal();
  }

  function close() {
    dialogRef.current?.close();
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

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="inline-flex h-10 items-center rounded-full bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary print:hidden"
      >
        {t(labels.open)}
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="suggestion-title"
        onClick={(event) => event.target === dialogRef.current && close()}
        className="m-auto w-[min(100%-2rem,34rem)] rounded-2xl bg-background p-0 text-primary shadow-2xl backdrop:bg-deep/60 backdrop:backdrop-blur-sm"
      >
        <div className="p-6 md:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-data text-[10px] uppercase tracking-[0.2em] text-secondary">
                {port.nombre} · {port.unLocode}
              </p>
              <h2 id="suggestion-title" className="mt-1 font-heading text-xl font-semibold">
                {t(labels.title)}
              </h2>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label={t(labels.close)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line hover:border-primary"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>

          {isSent ? (
            <div role="status" className="mt-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-white">
                <CheckIcon className="h-5 w-5" />
              </span>
              <p className="mt-4 font-heading text-lg font-semibold">{t(labels.sentTitle)}</p>
              <p className="mt-1 text-sm text-primary/75">{t(labels.sentBody)}</p>
              <button
                type="button"
                onClick={() => setIsSent(false)}
                className="mt-5 text-sm font-semibold text-secondary underline-offset-4 hover:underline"
              >
                {t(labels.sendAnother)}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-5 grid gap-4 sm:grid-cols-2">
              <p className="text-sm leading-relaxed text-primary/75 sm:col-span-2">{t(labels.subtitle)}</p>
              <Field label={t(labels.terminalLabel)}>
                <SelectField value={suggestion.terminal} onChange={(value) => update("terminal", value)}>
                  <option value="">{t(labels.wholePort)}</option>
                  {port.terminales.map((terminal) => (
                    <option key={terminal.nombre} value={terminal.nombre}>
                      {terminal.nombre}
                    </option>
                  ))}
                </SelectField>
              </Field>
              <Field label={t(labels.fieldLabel)}>
                <SelectField value={suggestion.field} onChange={(value) => update("field", value)} required>
                  <option value="" disabled />
                  {labels.fields.map((field) => (
                    <option key={field.es} value={t(field)}>
                      {t(field)}
                    </option>
                  ))}
                </SelectField>
              </Field>
              <Field label={t(labels.valueLabel)} className="sm:col-span-2">
                <textarea
                  value={suggestion.value}
                  onChange={(event) => update("value", event.target.value)}
                  placeholder={t(labels.valuePlaceholder)}
                  required
                  rows={3}
                  className={`${fieldInputClassName} resize-none`}
                />
              </Field>
              <Field label={t(labels.sourceLabel)} className="sm:col-span-2">
                <input
                  type="text"
                  value={suggestion.source}
                  onChange={(event) => update("source", event.target.value)}
                  placeholder={t(labels.sourcePlaceholder)}
                  required
                  className={fieldInputClassName}
                />
              </Field>
              <Field label={t(labels.nameLabel)}>
                <input
                  type="text"
                  value={suggestion.name}
                  onChange={(event) => update("name", event.target.value)}
                  autoComplete="name"
                  required
                  className={fieldInputClassName}
                />
              </Field>
              <Field label={t(labels.emailLabel)}>
                <input
                  type="email"
                  value={suggestion.email}
                  onChange={(event) => update("email", event.target.value)}
                  autoComplete="email"
                  required
                  className={fieldInputClassName}
                />
              </Field>
              <div className="flex justify-end gap-2 pt-2 sm:col-span-2">
                <button
                  type="button"
                  onClick={close}
                  className="inline-flex h-10 items-center rounded-full px-4 text-sm font-semibold text-primary/70 hover:text-primary"
                >
                  {t(labels.close)}
                </button>
                <button
                  type="submit"
                  className="inline-flex h-10 items-center rounded-full bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-deep"
                >
                  {t(labels.submit)}
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
