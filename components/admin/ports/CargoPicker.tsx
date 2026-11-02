import { ui } from "@/config/i18n";
import type { Cargo } from "@/config/port.types";
import { cargoLabel } from "@/lib/admin/port-labels";

interface CargoPickerProps {
  value: Cargo[];
  onChange: (cargos: Cargo[]) => void;
}

const allCargos = Object.keys(ui.ports.cargo) as Cargo[];

export function CargoPicker({ value, onChange }: CargoPickerProps) {
  function toggle(cargo: Cargo) {
    onChange(value.includes(cargo) ? value.filter((item) => item !== cargo) : [...value, cargo]);
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {allCargos.map((cargo) => (
        <button
          key={cargo}
          type="button"
          onClick={() => toggle(cargo)}
          aria-pressed={value.includes(cargo)}
          className="rounded-full border border-line px-3 py-1 text-xs text-primary/75 transition-colors hover:border-secondary aria-pressed:border-secondary aria-pressed:bg-secondary aria-pressed:text-white"
        >
          {cargoLabel(cargo)}
        </button>
      ))}
    </div>
  );
}
