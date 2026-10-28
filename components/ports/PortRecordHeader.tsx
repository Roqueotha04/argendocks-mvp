"use client";

import Link from "next/link";
import { ui } from "@/config/i18n";
import type { Puerto } from "@/config/port.types";
import { useLanguage } from "@/hooks/useLanguage";
import { PORTS_PATH } from "@/lib/navigation";
import { ExportActions } from "@/components/ports/ExportActions";
import { SuggestionDialog } from "@/components/ports/SuggestionDialog";

export function PortRecordHeader({ port }: { port: Puerto }) {
  const { t } = useLanguage();

  return (
    <header>
      <nav aria-label={t(ui.portDetail.breadcrumb)} className="font-data text-[11px] uppercase tracking-[0.18em] text-primary/55 print:hidden">
        <Link href={PORTS_PATH} className="hover:text-secondary">
          {t(ui.portDetail.breadcrumb)}
        </Link>
        <span aria-hidden className="mx-2">/</span>
        <span>{port.provincia}</span>
      </nav>

      <div className="mt-6 flex flex-col gap-6 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-data text-xs tracking-[0.2em] text-secondary">
            {port.unLocode} · {t(ui.ports.kind[port.tipo])}
          </p>
          <h1 className="mt-2 font-heading text-4xl font-semibold leading-none tracking-tight text-primary md:text-5xl">
            {port.nombre}
          </h1>
          <p className="mt-3 text-base text-primary/70">
            {port.localidad}, {port.provincia}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 print:hidden">
          <ExportActions port={port} />
          <SuggestionDialog port={port} />
        </div>
      </div>
    </header>
  );
}
