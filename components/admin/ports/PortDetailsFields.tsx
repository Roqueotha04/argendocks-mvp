import { adminUi } from "@/config/admin.ui";
import type { AdminPort, PublicationStatus } from "@/config/admin.types";
import type { PortKind } from "@/config/port.types";
import { listProvinces } from "@/lib/ports";
import { kindLabel } from "@/lib/admin/port-labels";
import { Field, fieldInputClassName } from "@/components/ui/Field";
import { SelectField } from "@/components/ui/SelectField";
import { EditorSection } from "@/components/admin/ui/EditorSection";

interface PortDetailsFieldsProps {
  port: AdminPort;
  onChange: (patch: Partial<AdminPort>) => void;
}

const labels = adminUi.portEditor;
const kinds: PortKind[] = ["maritimo", "fluvial"];
const statuses: PublicationStatus[] = ["publicado", "borrador"];
const PROVINCE_LIST_ID = "admin-province-options";

export function PortDetailsFields({ port, onChange }: PortDetailsFieldsProps) {
  return (
    <>
      <EditorSection title={labels.sections.identity}>
        <div className="grid gap-3 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <Field label={labels.name}>
            <input
              type="text"
              value={port.nombre}
              onChange={(event) => onChange({ nombre: event.target.value })}
              required
              className={fieldInputClassName}
            />
          </Field>
          <Field label={labels.unLocode}>
            <input
              type="text"
              value={port.unLocode}
              onChange={(event) => onChange({ unLocode: event.target.value })}
              required
              maxLength={5}
              className={`${fieldInputClassName} font-data uppercase`}
            />
          </Field>
          <Field label={labels.kind}>
            <SelectField
              value={port.tipo}
              onChange={(value) => onChange({ tipo: value as PortKind })}
            >
              {kinds.map((kind) => (
                <option key={kind} value={kind}>
                  {kindLabel(kind)}
                </option>
              ))}
            </SelectField>
          </Field>
          <Field label={labels.status}>
            <SelectField
              value={port.estado}
              onChange={(value) => onChange({ estado: value as PublicationStatus })}
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {adminUi.ports.status[status]}
                </option>
              ))}
            </SelectField>
          </Field>
        </div>
      </EditorSection>

      <EditorSection title={labels.sections.location}>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label={labels.province}>
            <input
              type="text"
              list={PROVINCE_LIST_ID}
              value={port.provincia}
              onChange={(event) => onChange({ provincia: event.target.value })}
              required
              className={fieldInputClassName}
            />
            <datalist id={PROVINCE_LIST_ID}>
              {listProvinces().map((province) => (
                <option key={province} value={province} />
              ))}
            </datalist>
          </Field>
          <Field label={labels.locality}>
            <input
              type="text"
              value={port.localidad}
              onChange={(event) => onChange({ localidad: event.target.value })}
              required
              className={fieldInputClassName}
            />
          </Field>
          <Field label={labels.latitude}>
            <input
              type="number"
              step="any"
              min={-56}
              max={-21}
              value={port.coordenadas.lat}
              onChange={(event) =>
                onChange({ coordenadas: { ...port.coordenadas, lat: Number(event.target.value) } })
              }
              required
              className={`${fieldInputClassName} font-data`}
            />
          </Field>
          <Field label={labels.longitude}>
            <input
              type="number"
              step="any"
              min={-74}
              max={-53}
              value={port.coordenadas.lng}
              onChange={(event) =>
                onChange({ coordenadas: { ...port.coordenadas, lng: Number(event.target.value) } })
              }
              required
              className={`${fieldInputClassName} font-data`}
            />
          </Field>
        </div>
      </EditorSection>

      <EditorSection title={labels.sections.content}>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label={labels.descriptionEs}>
            <textarea
              rows={3}
              value={port.descripcion.es}
              onChange={(event) =>
                onChange({ descripcion: { ...port.descripcion, es: event.target.value } })
              }
              required
              className={`${fieldInputClassName} resize-none`}
            />
          </Field>
          <Field label={labels.descriptionEn}>
            <textarea
              rows={3}
              value={port.descripcion.en}
              onChange={(event) =>
                onChange({ descripcion: { ...port.descripcion, en: event.target.value } })
              }
              className={`${fieldInputClassName} resize-none`}
            />
          </Field>
          <Field label={labels.accessEs}>
            <input
              type="text"
              value={port.accesoNautico.es}
              onChange={(event) =>
                onChange({ accesoNautico: { ...port.accesoNautico, es: event.target.value } })
              }
              className={fieldInputClassName}
            />
          </Field>
          <Field label={labels.accessEn}>
            <input
              type="text"
              value={port.accesoNautico.en}
              onChange={(event) =>
                onChange({ accesoNautico: { ...port.accesoNautico, en: event.target.value } })
              }
              className={fieldInputClassName}
            />
          </Field>
          <Field label={labels.photo}>
            <input
              type="text"
              value={port.foto.src}
              onChange={(event) => onChange({ foto: { ...port.foto, src: event.target.value } })}
              placeholder="/puertos/mi-puerto.jpg"
              className={`${fieldInputClassName} font-data`}
            />
          </Field>
          <Field label={labels.photoCredit}>
            <input
              type="text"
              value={port.foto.credito}
              onChange={(event) =>
                onChange({ foto: { ...port.foto, credito: event.target.value } })
              }
              className={fieldInputClassName}
            />
          </Field>
        </div>
      </EditorSection>
    </>
  );
}
