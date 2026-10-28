"use client";

import { ui } from "@/config/i18n";
import type { Terminal } from "@/config/port.types";
import { useLanguage } from "@/hooks/useLanguage";
import { formatDate, formatMeters } from "@/lib/format";
import { CargoTags } from "@/components/ports/CargoTags";

const metricLabelClassName = "font-data text-[10px] uppercase tracking-[0.2em] text-primary/55";

export function TerminalCard({ terminal }: { terminal: Terminal }) {
  const { t, locale } = useLanguage();
  const noData = t(ui.portDetail.noData);

  return (
    <article className="break-inside-avoid rounded-2xl border border-line bg-white p-5 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-heading text-lg font-semibold leading-tight text-primary">{terminal.nombre}</h3>
          <p className="mt-1 text-sm text-primary/65">
            {t(ui.portDetail.administration)} {t(ui.ports.administration[terminal.administracion]).toLowerCase()}
          </p>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
            terminal.operativa ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary/70"
          }`}
        >
          <span
            aria-hidden
            className={`h-1.5 w-1.5 rounded-full ${terminal.operativa ? "bg-secondary" : "bg-primary/50"}`}
          />
          {t(terminal.operativa ? ui.portDetail.operational : ui.portDetail.notOperational)}
        </span>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-[auto_auto_1fr]">
        <div>
          <dt className={metricLabelClassName}>{t(ui.portDetail.berth)}</dt>
          <dd className="mt-1 font-data text-lg text-primary">{formatMeters(terminal.atraqueMetros, locale) ?? noData}</dd>
        </div>
        <div className="sm:pl-6">
          <dt className={metricLabelClassName}>{t(ui.portDetail.draft)}</dt>
          <dd className="mt-1 font-data text-lg text-primary">{formatMeters(terminal.caladoMetros, locale) ?? noData}</dd>
        </div>
        <div className="col-span-2 sm:col-span-1 sm:pl-6">
          <dt className={`${metricLabelClassName} mb-1.5`}>{t(ui.portDetail.cargo)}</dt>
          <dd>
            <CargoTags cargos={terminal.cargas} />
          </dd>
        </div>
      </dl>

      <p className="mt-5 border-t border-line pt-3 text-xs text-primary/60">
        {t(ui.portDetail.updated)} {formatDate(terminal.actualizadoEn, locale)} · {t(ui.portDetail.source)}:{" "}
        {terminal.fuente}
      </p>
    </article>
  );
}
