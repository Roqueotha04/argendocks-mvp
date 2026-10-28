"use client";

import { useMemo, useState } from "react";
import { ui } from "@/config/i18n";
import { ports } from "@/config/ports";
import { useLanguage } from "@/hooks/useLanguage";
import { emptyPortFilters, filterPorts, findPortBySlug, type PortFilters as Filters } from "@/lib/ports";
import { PortMap } from "@/components/map/PortMap";
import { PortFilters } from "@/components/ports/PortFilters";
import { PortCard } from "@/components/ports/PortCard";
import { SelectedPortPanel } from "@/components/ports/SelectedPortPanel";
import { HorizontalScroller, scrollerItemClassName } from "@/components/ui/HorizontalScroller";
import { Section } from "@/components/ui/Section";

export function PortExplorer() {
  const { t } = useLanguage();
  const [filters, setFilters] = useState<Filters>(emptyPortFilters);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const visiblePorts = useMemo(() => filterPorts(filters), [filters]);
  const mutedSlugs = ports.filter((port) => !visiblePorts.includes(port)).map((port) => port.slug);
  const activePort = activeSlug ? (findPortBySlug(activeSlug) ?? null) : null;
  const hasActiveFilters =
    filters.query !== "" || filters.province !== null || filters.kind !== null || filters.cargos.length > 0;

  return (
    <Section stacked className="z-10 bg-accent">
      <PortFilters filters={filters} onChange={setFilters} />

      <div className="mt-6 grid gap-6 lg:grid-cols-[340px_1fr] lg:items-start">
        <div className="rounded-3xl bg-deep p-6 lg:sticky lg:top-24">
          <PortMap
            ports={ports}
            label={t(ui.explorer.mapLabel)}
            activeSlug={activeSlug}
            mutedSlugs={mutedSlugs}
            onSelect={setActiveSlug}
            className="mx-auto w-[min(100%,220px)] lg:w-[250px]"
          />
          <div className="mt-6">
            <SelectedPortPanel port={activePort} />
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="font-data text-xs uppercase tracking-[0.2em] text-primary/70">
              <span className="text-base font-medium text-primary">{visiblePorts.length}</span>{" "}
              {t(ui.explorer.results)}
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={() => setFilters(emptyPortFilters)}
                className="text-sm font-semibold text-secondary underline-offset-4 hover:underline"
              >
                {t(ui.explorer.clearFilters)}
              </button>
            )}
          </div>

          {visiblePorts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-primary/25 p-8 text-center">
              <p className="font-heading text-lg font-semibold text-primary">{t(ui.explorer.emptyTitle)}</p>
              <p className="mt-1 text-sm text-primary/70">{t(ui.explorer.emptyBody)}</p>
            </div>
          ) : (
            <HorizontalScroller desktopGridClassName="md:grid-cols-2 md:gap-4">
              {visiblePorts.map((port) => (
                <div key={port.slug} className={`${scrollerItemClassName} h-full`}>
                  <PortCard port={port} isActive={port.slug === activeSlug} onHighlight={setActiveSlug} />
                </div>
              ))}
            </HorizontalScroller>
          )}
        </div>
      </div>
    </Section>
  );
}
