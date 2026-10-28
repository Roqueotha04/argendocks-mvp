"use client";

import Link from "next/link";
import { ui } from "@/config/i18n";
import type { Puerto } from "@/config/port.types";
import { useLanguage } from "@/hooks/useLanguage";
import { formatDate, formatMeters } from "@/lib/format";
import { PORTS_PATH } from "@/lib/navigation";
import { summarizePort } from "@/lib/ports";
import { Reveal } from "@/components/ui/Reveal";
import { ExportActions } from "@/components/ports/ExportActions";
import { ArrowLeftIcon } from "@/components/ui/icons";

export function PortHeader({ port }: { port: Puerto }) {
  const { t, locale } = useLanguage();
  const summary = summarizePort(port);

  const stats = [
    { label: ui.portDetail.maxDraft, value: formatMeters(summary.maxDraft, locale) ?? t(ui.portDetail.noData) },
    { label: ui.portDetail.totalBerth, value: formatMeters(summary.totalBerth, locale) ?? t(ui.portDetail.noData) },
    {
      label: ui.portDetail.terminalsTitle,
      value: `${summary.operationalTerminals}/${port.terminales.length}`,
    },
    { label: ui.portDetail.lastUpdate, value: formatDate(summary.lastUpdate, locale) },
  ];

  return (
    <header className="relative overflow-hidden bg-deep pb-20 pt-10 text-white md:pb-24 md:pt-12">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-secondary/25 blur-3xl"
      />
      <div className="relative mx-auto w-full max-w-6xl px-6 md:px-8">
        <Link
          href={PORTS_PATH}
          className="inline-flex items-center gap-2 text-sm text-accent/80 transition-colors hover:text-white print:hidden"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          {t(ui.portDetail.back)}
        </Link>

        <Reveal className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-secondary px-3 py-1 font-data text-[11px] tracking-[0.2em]">
                {port.unLocode}
              </span>
              <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-accent">
                {t(ui.ports.kind[port.tipo])}
              </span>
            </div>
            <h1 className="mt-5 font-heading text-[2.4rem] font-semibold leading-[1] tracking-tight md:text-6xl">
              {port.nombre}
            </h1>
            <p className="mt-3 font-accent text-xl italic text-accent md:text-2xl">
              {port.localidad}, {port.provincia}
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-accent/85">{t(port.descripcion)}</p>
          </div>
          <ExportActions port={port} />
        </Reveal>

        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 md:grid-cols-4">
          {stats.map(({ label, value }) => (
            <div key={label.es} className="bg-deep p-4 md:p-5">
              <dt className="font-data text-[10px] uppercase tracking-[0.2em] text-accent/70">{t(label)}</dt>
              <dd className="mt-1.5 font-data text-lg font-medium text-white md:text-xl">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}
