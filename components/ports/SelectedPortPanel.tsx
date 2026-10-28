"use client";

import Link from "next/link";
import { ui } from "@/config/i18n";
import type { Puerto } from "@/config/port.types";
import { useLanguage } from "@/hooks/useLanguage";
import { portPath } from "@/lib/navigation";
import { ArrowRightIcon } from "@/components/ui/icons";

export function SelectedPortPanel({ port }: { port: Puerto | null }) {
  const { t } = useLanguage();

  if (!port) {
    return <p className="font-accent text-lg italic leading-snug text-accent/80">{t(ui.explorer.subtitle)}</p>;
  }

  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-white p-4">
      <div className="min-w-0">
        <span className="font-data text-[10px] tracking-[0.2em] text-secondary">{port.unLocode}</span>
        <p className="truncate font-heading text-base font-semibold text-primary">{port.nombre}</p>
        <p className="truncate text-xs text-primary/65">
          {port.terminales.length} {t(ui.explorer.terminals)} · {port.provincia}
        </p>
      </div>
      <Link
        href={portPath(port.slug)}
        className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-secondary px-4 text-sm font-semibold text-white transition-colors hover:bg-primary"
      >
        {t(ui.explorer.openRecord)}
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </div>
  );
}
