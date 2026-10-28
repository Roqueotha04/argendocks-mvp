"use client";

import { ui } from "@/config/i18n";
import type { Puerto } from "@/config/port.types";
import { useLanguage } from "@/hooks/useLanguage";
import { formatDate, formatMeters } from "@/lib/format";
import { summarizePort } from "@/lib/ports";

export function PortKeyFigures({ port }: { port: Puerto }) {
  const { t, locale } = useLanguage();
  const summary = summarizePort(port);
  const noData = t(ui.portDetail.noData);

  const figures = [
    { label: ui.portDetail.maxDraft, value: formatMeters(summary.maxDraft, locale) ?? noData },
    { label: ui.portDetail.totalBerth, value: formatMeters(summary.totalBerth, locale) ?? noData },
    { label: ui.portDetail.terminalsTitle, value: `${summary.operationalTerminals}/${port.terminales.length}` },
    { label: ui.portDetail.lastUpdate, value: formatDate(summary.lastUpdate, locale) },
  ];

  return (
    <section aria-labelledby="key-figures-title">
      <h2 id="key-figures-title" className="sr-only">
        {t(ui.portDetail.keyFigures)}
      </h2>
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
        {figures.map(({ label, value }) => (
          <div key={label.es} className="bg-white p-4 md:p-5">
            <dt className="text-xs text-primary/60">{t(label)}</dt>
            <dd className="mt-1 font-data text-xl font-medium text-primary">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
