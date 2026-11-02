import { adminUi } from "@/config/admin.ui";
import type { Administration, Terminal } from "@/config/port.types";
import { administrationLabel } from "@/lib/admin/port-labels";
import { parseOptionalNumber } from "@/lib/admin/port-draft";
import { Field, fieldInputClassName } from "@/components/ui/Field";
import { SelectField } from "@/components/ui/SelectField";
import { CargoPicker } from "@/components/admin/ports/CargoPicker";
import { TrashIcon } from "@/components/ui/icons";

interface TerminalFieldsProps {
  terminal: Terminal;
  onChange: (patch: Partial<Terminal>) => void;
  onRemove: () => void;
}

const labels = adminUi.portEditor;
const administrations: Administration[] = ["publico", "privado"];

export function TerminalFields({ terminal, onChange, onRemove }: TerminalFieldsProps) {
  return (
    <div className="rounded-2xl bg-accent/50 p-4">
      <div className="flex items-end gap-2">
        <Field label={labels.terminalName} className="flex-1">
          <input
            type="text"
            value={terminal.nombre}
            onChange={(event) => onChange({ nombre: event.target.value })}
            required
            className={fieldInputClassName}
          />
        </Field>
        <button
          type="button"
          onClick={onRemove}
          aria-label={labels.removeTerminal}
          className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full border border-line bg-white text-danger hover:border-danger/50"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <Field label={labels.administration}>
          <SelectField
            value={terminal.administracion}
            onChange={(value) => onChange({ administracion: value as Administration })}
          >
            {administrations.map((administration) => (
              <option key={administration} value={administration}>
                {administrationLabel(administration)}
              </option>
            ))}
          </SelectField>
        </Field>
        <Field label={labels.berth}>
          <input
            type="number"
            min={0}
            step="any"
            value={terminal.atraqueMetros ?? ""}
            onChange={(event) =>
              onChange({ atraqueMetros: parseOptionalNumber(event.target.value) })
            }
            className={fieldInputClassName}
          />
        </Field>
        <Field label={labels.draft}>
          <input
            type="number"
            min={0}
            step="any"
            value={terminal.caladoMetros ?? ""}
            onChange={(event) =>
              onChange({ caladoMetros: parseOptionalNumber(event.target.value) })
            }
            className={fieldInputClassName}
          />
        </Field>
      </div>

      <Field label={labels.source} className="mt-3">
        <input
          type="text"
          value={terminal.fuente}
          onChange={(event) => onChange({ fuente: event.target.value })}
          className={fieldInputClassName}
        />
      </Field>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-primary/80">{labels.cargo}</span>
          <CargoPicker value={terminal.cargas} onChange={(cargas) => onChange({ cargas })} />
        </div>
        <label className="inline-flex shrink-0 items-center gap-2 text-sm text-primary">
          <input
            type="checkbox"
            checked={terminal.operativa}
            onChange={(event) => onChange({ operativa: event.target.checked })}
            className="h-4 w-4 accent-[var(--success)]"
          />
          {labels.operational}
        </label>
      </div>
    </div>
  );
}
