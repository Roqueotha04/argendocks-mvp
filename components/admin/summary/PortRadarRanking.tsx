import { ADMIN_LOCALE } from "@/config/admin.ui";
import type { AdminPort } from "@/config/admin.types";
import { formatNumber } from "@/lib/format";

interface PortRadarRankingProps {
  ports: AdminPort[];
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
}

export function PortRadarRanking({ ports, selectedSlug, onSelect }: PortRadarRankingProps) {
  const max = Math.max(...ports.map((port) => port.visitas30d), 1);

  return (
    <ol className="mt-2 flex flex-col">
      {ports.map((port) => (
        <li key={port.slug}>
          <button
            type="button"
            onClick={() => onSelect(port.slug)}
            aria-pressed={port.slug === selectedSlug}
            className="group grid w-full grid-cols-[minmax(0,1fr)_4rem_auto] items-center gap-3 rounded-full px-2.5 py-1.5 text-left transition-colors hover:bg-white/10 aria-pressed:bg-white/15"
          >
            <span className="truncate text-xs text-white/85">{port.nombre}</span>
            <span className="h-1 overflow-hidden rounded-full bg-white/15">
              <span
                aria-hidden
                className="block h-full rounded-full bg-secondary"
                style={{ width: `${(port.visitas30d / max) * 100}%` }}
              />
            </span>
            <span className="w-12 text-right font-data text-[11px] text-white/70">
              {formatNumber(port.visitas30d, ADMIN_LOCALE)}
            </span>
          </button>
        </li>
      ))}
    </ol>
  );
}
