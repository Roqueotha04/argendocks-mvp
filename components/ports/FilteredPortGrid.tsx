"use client";

import { ui } from "@/config/i18n";
import type { Puerto } from "@/config/port.types";
import { useLanguage } from "@/hooks/useLanguage";
import { PortCard } from "@/components/ports/PortCard";

interface FilteredPortGridProps {
  ports: Puerto[];
  activeSlug: string | null;
  onHighlight: (slug: string | null) => void;
}

export function FilteredPortGrid({ ports, activeSlug, onHighlight }: FilteredPortGridProps) {
  const { t } = useLanguage();

  if (ports.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-primary/25 p-8 text-center">
        <p className="font-heading text-lg font-semibold text-primary">{t(ui.explorer.emptyTitle)}</p>
        <p className="mt-1 text-sm text-primary/70">{t(ui.explorer.emptyBody)}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {ports.map((port) => (
        <PortCard key={port.slug} port={port} isActive={port.slug === activeSlug} onHighlight={onHighlight} />
      ))}
    </div>
  );
}
