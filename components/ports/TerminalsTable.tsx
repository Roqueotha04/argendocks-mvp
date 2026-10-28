"use client";

import { ui } from "@/config/i18n";
import type { Terminal } from "@/config/port.types";
import { useLanguage } from "@/hooks/useLanguage";
import { formatDate, formatMeters } from "@/lib/format";

const labels = ui.portDetail;
const headerCellClassName = "px-4 py-3 text-left text-xs font-semibold text-primary/60";
const cellClassName = "px-4 py-3.5 align-top text-sm text-primary";

export function TerminalsTable({ terminals }: { terminals: Terminal[] }) {
  const { t, locale } = useLanguage();
  const noData = t(labels.noData);

  function cargoList(terminal: Terminal) {
    return terminal.cargas.map((cargo) => t(ui.ports.cargo[cargo])).join(", ");
  }

  function statusLabel(terminal: Terminal) {
    return t(terminal.operativa ? labels.operational : labels.notOperational);
  }

  return (
    <section aria-labelledby="terminals-title">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="terminals-title" className="font-heading text-xl font-semibold text-primary">
          {t(labels.terminalsTitle)}
        </h2>
        <p className="text-xs text-primary/55">{t(labels.terminalsSubtitle)}</p>
      </div>

      <div className="mt-4 hidden overflow-hidden rounded-2xl border border-line bg-white md:block">
        <table className="w-full border-collapse">
          <thead className="bg-accent/50">
            <tr>
              <th scope="col" className={headerCellClassName}>{t(labels.terminalsTitle)}</th>
              <th scope="col" className={headerCellClassName}>{t(labels.berth)}</th>
              <th scope="col" className={headerCellClassName}>{t(labels.draft)}</th>
              <th scope="col" className={headerCellClassName}>{t(labels.cargo)}</th>
              <th scope="col" className={headerCellClassName}>{t(labels.status)}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {terminals.map((terminal) => (
              <tr key={terminal.nombre}>
                <th scope="row" className={`${cellClassName} font-normal`}>
                  <span className="block font-semibold">{terminal.nombre}</span>
                  <span className="mt-0.5 block text-xs text-primary/55">
                    {t(ui.ports.administration[terminal.administracion])} · {terminal.fuente} ·{" "}
                    {formatDate(terminal.actualizadoEn, locale)}
                  </span>
                </th>
                <td className={`${cellClassName} font-data whitespace-nowrap`}>
                  {formatMeters(terminal.atraqueMetros, locale) ?? noData}
                </td>
                <td className={`${cellClassName} font-data whitespace-nowrap`}>
                  {formatMeters(terminal.caladoMetros, locale) ?? noData}
                </td>
                <td className={cellClassName}>{cargoList(terminal)}</td>
                <td className={`${cellClassName} whitespace-nowrap`}>
                  <StatusDot isOperational={terminal.operativa} />
                  {statusLabel(terminal)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="mt-4 divide-y divide-line rounded-2xl border border-line bg-white md:hidden">
        {terminals.map((terminal) => (
          <li key={terminal.nombre} className="p-4">
            <p className="font-semibold text-primary">{terminal.nombre}</p>
            <p className="mt-0.5 text-xs text-primary/55">
              {t(ui.ports.administration[terminal.administracion])} · {terminal.fuente}
            </p>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <dt className="text-primary/60">{t(labels.berth)}</dt>
              <dd className="font-data text-primary">{formatMeters(terminal.atraqueMetros, locale) ?? noData}</dd>
              <dt className="text-primary/60">{t(labels.draft)}</dt>
              <dd className="font-data text-primary">{formatMeters(terminal.caladoMetros, locale) ?? noData}</dd>
              <dt className="text-primary/60">{t(labels.cargo)}</dt>
              <dd className="text-primary">{cargoList(terminal)}</dd>
              <dt className="text-primary/60">{t(labels.status)}</dt>
              <dd className="text-primary">
                <StatusDot isOperational={terminal.operativa} />
                {statusLabel(terminal)}
              </dd>
              <dt className="text-primary/60">{t(labels.updated)}</dt>
              <dd className="text-primary">{formatDate(terminal.actualizadoEn, locale)}</dd>
            </dl>
          </li>
        ))}
      </ul>
    </section>
  );
}

function StatusDot({ isOperational }: { isOperational: boolean }) {
  return (
    <span
      aria-hidden
      className={`mr-2 inline-block h-2 w-2 rounded-full align-middle ${isOperational ? "bg-secondary" : "bg-primary/30"}`}
    />
  );
}
