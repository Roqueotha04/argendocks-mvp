"use client";

import Link from "next/link";
import { ui } from "@/config/i18n";
import type { Puerto } from "@/config/port.types";
import { useLanguage } from "@/hooks/useLanguage";
import { formatMeters } from "@/lib/format";
import { portPath } from "@/lib/navigation";
import { summarizePort } from "@/lib/ports";
import { CargoTags } from "@/components/ports/CargoTags";
import { ArrowRightIcon } from "@/components/ui/icons";

interface PortCardProps {
  port: Puerto;
  isActive?: boolean;
  onHighlight?: (slug: string | null) => void;
}

export function PortCard({ port, isActive = false, onHighlight }: PortCardProps) {
  const { t, locale } = useLanguage();
  const summary = summarizePort(port);

  return (
    <Link
      href={portPath(port.slug)}
      onMouseEnter={() => onHighlight?.(port.slug)}
      onFocus={() => onHighlight?.(port.slug)}
      className={`group flex h-full flex-col rounded-2xl border bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-secondary hover:shadow-[0_18px_40px_-24px_rgba(19,48,90,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary ${
        isActive ? "border-secondary shadow-[0_18px_40px_-24px_rgba(19,48,90,0.45)]" : "border-line"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-data text-[11px] tracking-[0.2em] text-secondary">{port.unLocode}</span>
        <span className="rounded-full border border-line px-2 py-0.5 text-[11px] text-primary/70">
          {t(ui.ports.kind[port.tipo])}
        </span>
      </div>

      <h3 className="mt-4 font-heading text-lg font-semibold leading-tight text-primary">{port.nombre}</h3>
      <p className="mt-1 text-sm text-primary/65">
        {port.localidad} · {port.provincia}
      </p>

      <div className="mt-4 flex-1">
        <CargoTags cargos={summary.cargos} limit={3} />
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-line pt-4">
        <div>
          <dt className="font-data text-[10px] uppercase tracking-widest text-primary/50">
            {t(ui.portDetail.maxDraft)}
          </dt>
          <dd className="mt-0.5 font-data text-sm font-medium text-primary">
            {formatMeters(summary.maxDraft, locale) ?? t(ui.portDetail.noData)}
          </dd>
        </div>
        <div>
          <dt className="font-data text-[10px] uppercase tracking-widest text-primary/50">
            {t(ui.portDetail.terminalsTitle)}
          </dt>
          <dd className="mt-0.5 flex items-center justify-between font-data text-sm font-medium text-primary">
            {port.terminales.length}
            <ArrowRightIcon className="h-4 w-4 text-secondary transition-transform group-hover:translate-x-1" />
          </dd>
        </div>
      </dl>
    </Link>
  );
}
