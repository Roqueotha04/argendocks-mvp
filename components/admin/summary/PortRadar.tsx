"use client";

import { useState } from "react";
import Link from "next/link";
import { ADMIN_LOCALE, adminUi } from "@/config/admin.ui";
import { useAdminData } from "@/hooks/useAdminData";
import { rankPublishedPorts } from "@/lib/admin/admin-insights";
import { formatNumber, formatPercent } from "@/lib/format";
import { portPath } from "@/lib/navigation";
import { fillTemplate } from "@/lib/template";
import { PortMap } from "@/components/map/PortMap";
import { Eyebrow } from "@/components/admin/ui/Eyebrow";
import { PortRadarRanking } from "@/components/admin/summary/PortRadarRanking";
import { ArrowRightIcon } from "@/components/ui/icons";

const labels = adminUi.summary.radar;

export function PortRadar() {
  const { data } = useAdminData();
  const ranked = rankPublishedPorts(data.ports);
  const [selectedSlug, setSelectedSlug] = useState(ranked[0]?.slug ?? null);

  const totalVisits = ranked.reduce((sum, port) => sum + port.visitas30d, 0);
  const selectedIndex = ranked.findIndex((port) => port.slug === selectedSlug);
  const selected = ranked[selectedIndex];

  return (
    <section className="grid gap-5 rounded-2xl bg-primary p-4 text-white sm:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] md:gap-8 md:p-5">
      <PortMap
        ports={ranked}
        label={labels.mapLabel}
        activeSlug={selectedSlug}
        onSelect={setSelectedSlug}
        showGuides={false}
        className="mx-auto w-full max-w-[11rem]"
      />

      <div className="flex min-w-0 flex-col">
        <Eyebrow tone="onColor">{labels.eyebrow}</Eyebrow>
        <h2 className="mt-2 font-heading text-base font-semibold leading-tight">{labels.title}</h2>
        <p className="font-accent text-[15px] italic text-accent">{labels.subtitle}</p>

        {selected && (
          <div className="mt-4 flex items-end justify-between gap-3 border-b border-white/15 pb-3">
            <div className="min-w-0">
              <p className="font-data text-[10px] tracking-[0.2em] text-secondary">
                {selected.unLocode}
              </p>
              <p className="truncate text-sm font-semibold">{selected.nombre}</p>
              <Link
                href={portPath(selected.slug)}
                target="_blank"
                className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-accent/80 hover:text-white"
              >
                {labels.openRecord}
                <ArrowRightIcon className="h-3 w-3" />
              </Link>
            </div>
            <div className="shrink-0 text-right">
              <p className="font-data text-2xl leading-none">
                {formatNumber(selected.visitas30d, ADMIN_LOCALE)}
              </p>
              <p className="mt-1 text-[11px] text-accent/80">
                {formatPercent(selected.visitas30d / totalVisits, ADMIN_LOCALE)} {labels.share}
              </p>
              <p className="text-[11px] text-accent/60">
                {fillTemplate(labels.rank, { rank: selectedIndex + 1, total: ranked.length })}
              </p>
            </div>
          </div>
        )}

        <PortRadarRanking ports={ranked} selectedSlug={selectedSlug} onSelect={setSelectedSlug} />
      </div>
    </section>
  );
}
