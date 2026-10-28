"use client";

import { ui } from "@/config/i18n";
import type { Cargo, PortKind } from "@/config/port.types";
import { useLanguage } from "@/hooks/useLanguage";
import { listCargos, listProvinces, type PortFilters as Filters } from "@/lib/ports";
import { ChevronDownIcon, SearchIcon } from "@/components/ui/icons";

interface PortFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const provinces = listProvinces();
const cargos = listCargos();
const kinds: (PortKind | null)[] = [null, "maritimo", "fluvial"];

const filterLabelClassName = "mb-2 block font-data text-[10px] uppercase tracking-[0.2em] text-primary/60";

export function PortFilters({ filters, onChange }: PortFiltersProps) {
  const { t } = useLanguage();

  function toggleCargo(cargo: Cargo) {
    const nextCargos = filters.cargos.includes(cargo)
      ? filters.cargos.filter((selected) => selected !== cargo)
      : [...filters.cargos, cargo];
    onChange({ ...filters, cargos: nextCargos });
  }

  return (
    <div className="grid gap-5 rounded-3xl bg-white p-5 shadow-[0_20px_50px_-30px_rgba(10,24,48,0.5)] md:p-6 lg:grid-cols-[1.3fr_1fr_auto]">
      <label className="block">
        <span className={filterLabelClassName}>{t(ui.explorer.searchLabel)}</span>
        <span className="flex h-11 items-center gap-2 rounded-full bg-accent/60 px-4 focus-within:ring-2 focus-within:ring-secondary">
          <SearchIcon className="h-4 w-4 shrink-0 text-primary/60" />
          <input
            type="search"
            value={filters.query}
            onChange={(event) => onChange({ ...filters, query: event.target.value })}
            placeholder={t(ui.explorer.searchPlaceholder)}
            className="w-full bg-transparent text-sm text-primary outline-none placeholder:text-primary/45"
          />
        </span>
      </label>

      <label className="block">
        <span className={filterLabelClassName}>{t(ui.explorer.provinceLabel)}</span>
        <span className="relative flex h-11 items-center rounded-full bg-accent/60 focus-within:ring-2 focus-within:ring-secondary">
          <select
            value={filters.province ?? ""}
            onChange={(event) => onChange({ ...filters, province: event.target.value || null })}
            className="h-full w-full cursor-pointer appearance-none rounded-full bg-transparent pl-4 pr-10 text-sm text-primary outline-none"
          >
            <option value="">{t(ui.explorer.allProvinces)}</option>
            {provinces.map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="pointer-events-none absolute right-4 h-4 w-4 text-primary/60" />
        </span>
      </label>

      <fieldset>
        <legend className={filterLabelClassName}>{t(ui.explorer.kindLabel)}</legend>
        <div className="flex h-11 rounded-full bg-accent/60 p-1">
          {kinds.map((kind) => (
            <button
              key={kind ?? "all"}
              type="button"
              aria-pressed={filters.kind === kind}
              onClick={() => onChange({ ...filters, kind })}
              className="flex-1 rounded-full px-4 text-sm whitespace-nowrap text-primary/70 transition-colors hover:text-primary aria-pressed:bg-primary aria-pressed:text-white"
            >
              {kind ? t(ui.ports.kind[kind]) : t(ui.explorer.allKinds)}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="min-w-0 lg:col-span-3">
        <legend className={filterLabelClassName}>{t(ui.explorer.cargoLabel)}</legend>
        <div className="-mx-5 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:flex-wrap md:px-0">
          {cargos.map((cargo) => (
            <button
              key={cargo}
              type="button"
              aria-pressed={filters.cargos.includes(cargo)}
              onClick={() => toggleCargo(cargo)}
              className="shrink-0 rounded-full border border-line px-3.5 py-1.5 text-sm text-primary transition-colors hover:border-secondary aria-pressed:border-secondary aria-pressed:bg-secondary aria-pressed:text-white"
            >
              {t(ui.ports.cargo[cargo])}
            </button>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
