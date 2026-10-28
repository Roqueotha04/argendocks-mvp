"use client";

import { ui } from "@/config/i18n";
import type { Cargo } from "@/config/port.types";
import { useLanguage } from "@/hooks/useLanguage";

interface CargoTagsProps {
  cargos: Cargo[];
  limit?: number;
}

export function CargoTags({ cargos, limit = cargos.length }: CargoTagsProps) {
  const { t } = useLanguage();
  const visible = cargos.slice(0, limit);
  const hiddenCount = cargos.length - visible.length;

  return (
    <ul className="flex flex-wrap gap-1.5">
      {visible.map((cargo) => (
        <li key={cargo} className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-primary">
          {t(ui.ports.cargo[cargo])}
        </li>
      ))}
      {hiddenCount > 0 && (
        <li className="rounded-full px-1.5 py-1 font-data text-xs text-primary/60">+{hiddenCount}</li>
      )}
    </ul>
  );
}
