"use client";

import { ui } from "@/config/i18n";
import { ports } from "@/config/ports";
import type { Puerto } from "@/config/port.types";
import { useLanguage } from "@/hooks/useLanguage";
import { formatCoordinates } from "@/lib/format";
import { PortMap } from "@/components/map/PortMap";

export function PortOverview({ port }: { port: Puerto }) {
  const { t } = useLanguage();

  const facts = [
    { label: ui.portDetail.province, value: port.provincia },
    { label: ui.portDetail.locality, value: port.localidad },
    { label: ui.portDetail.unLocode, value: port.unLocode },
    { label: ui.portDetail.kind, value: t(ui.ports.kind[port.tipo]) },
    { label: ui.portDetail.nauticalAccess, value: t(port.accesoNautico) },
    { label: ui.portDetail.coordinates, value: formatCoordinates(port.coordenadas) },
  ];
  const otherSlugs = ports.filter((other) => other.slug !== port.slug).map((other) => other.slug);

  return (
    <aside className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
      <div className="rounded-2xl bg-white p-5 md:p-6">
        <h2 className="font-heading text-lg font-semibold text-primary">{t(ui.portDetail.overview)}</h2>
        <dl className="mt-4 divide-y divide-line">
          {facts.map(({ label, value }) => (
            <div key={label.es} className="grid grid-cols-[7.5rem_1fr] gap-3 py-2.5">
              <dt className="font-data text-[10px] uppercase leading-5 tracking-[0.18em] text-primary/55">{t(label)}</dt>
              <dd className="text-sm text-primary">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="rounded-2xl bg-deep p-5 print:hidden">
        <h2 className="font-data text-[10px] uppercase tracking-[0.2em] text-accent/70">
          {t(ui.portDetail.locationTitle)}
        </h2>
        <PortMap
          ports={ports}
          label={t(ui.explorer.mapLabel)}
          activeSlug={port.slug}
          mutedSlugs={otherSlugs}
          showGuides={false}
          className="mx-auto mt-4 w-[150px]"
        />
      </div>
    </aside>
  );
}
