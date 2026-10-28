"use client";

import { ui } from "@/config/i18n";
import { ports } from "@/config/ports";
import type { Puerto } from "@/config/port.types";
import { useLanguage } from "@/hooks/useLanguage";
import { formatCoordinates } from "@/lib/format";
import { PortMap } from "@/components/map/PortMap";

export function PortFacts({ port }: { port: Puerto }) {
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
    <aside className="space-y-4">
      <section aria-labelledby="overview-title" className="rounded-2xl border border-line bg-white p-5">
        <h2 id="overview-title" className="font-heading text-base font-semibold text-primary">
          {t(ui.portDetail.overview)}
        </h2>
        <dl className="mt-3 divide-y divide-line text-sm">
          {facts.map(({ label, value }) => (
            <div key={label.es} className="flex justify-between gap-4 py-2.5">
              <dt className="shrink-0 text-primary/60">{t(label)}</dt>
              <dd className="text-right text-primary">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="location-title" className="rounded-2xl bg-deep p-5 print:hidden">
        <h2 id="location-title" className="text-xs font-semibold text-accent/80">
          {t(ui.portDetail.locationTitle)}
        </h2>
        <PortMap
          ports={ports}
          label={t(ui.explorer.mapLabel)}
          activeSlug={port.slug}
          mutedSlugs={otherSlugs}
          showGuides={false}
          className="mx-auto mt-3 w-[140px]"
        />
      </section>
    </aside>
  );
}
