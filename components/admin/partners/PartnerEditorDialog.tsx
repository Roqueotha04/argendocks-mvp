"use client";

import { useState } from "react";
import { adminUi } from "@/config/admin.ui";
import type { Partner, PartnerCategory, PartnerTier } from "@/config/admin.types";
import { Field, fieldInputClassName } from "@/components/ui/Field";
import { SelectField } from "@/components/ui/SelectField";
import { AdminDialog } from "@/components/admin/ui/AdminDialog";

interface PartnerEditorDialogProps {
  initialPartner: Partner;
  isNew: boolean;
  onClose: () => void;
  onSave: (partner: Partner) => void;
}

const labels = adminUi.partners;
const categories = Object.keys(labels.categories) as PartnerCategory[];
const tiers = Object.keys(labels.tiers) as PartnerTier[];

export function PartnerEditorDialog({
  initialPartner,
  isNew,
  onClose,
  onSave,
}: PartnerEditorDialogProps) {
  const [draft, setDraft] = useState(initialPartner);

  function update(patch: Partial<Partner>) {
    setDraft((current) => ({ ...current, ...patch }));
  }

  return (
    <AdminDialog
      onClose={onClose}
      onSubmit={() => onSave(draft)}
      title={isNew ? labels.createTitle : labels.editTitle}
      submitLabel={adminUi.common.save}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={labels.name} className="sm:col-span-2">
          <input
            type="text"
            value={draft.nombre}
            onChange={(event) => update({ nombre: event.target.value })}
            required
            className={fieldInputClassName}
          />
        </Field>
        <Field label={labels.category}>
          <SelectField
            value={draft.categoria}
            onChange={(value) => update({ categoria: value as PartnerCategory })}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {labels.categories[category]}
              </option>
            ))}
          </SelectField>
        </Field>
        <Field label={labels.tier}>
          <SelectField
            value={draft.nivel}
            onChange={(value) => update({ nivel: value as PartnerTier })}
          >
            {tiers.map((tier) => (
              <option key={tier} value={tier}>
                {labels.tiers[tier]}
              </option>
            ))}
          </SelectField>
        </Field>
        <Field label={labels.website}>
          <input
            type="text"
            value={draft.sitio}
            onChange={(event) => update({ sitio: event.target.value })}
            placeholder="empresa.com.ar"
            required
            className={fieldInputClassName}
          />
        </Field>
        <Field label={labels.contactName}>
          <input
            type="text"
            value={draft.contacto}
            onChange={(event) => update({ contacto: event.target.value })}
            className={fieldInputClassName}
          />
        </Field>
        <Field label={labels.sinceDate}>
          <input
            type="date"
            value={draft.desde}
            onChange={(event) => update({ desde: event.target.value })}
            required
            className={`${fieldInputClassName} font-data`}
          />
        </Field>
        <label className="flex items-center gap-2 self-end pb-2.5 text-sm text-primary">
          <input
            type="checkbox"
            checked={draft.activo}
            onChange={(event) => update({ activo: event.target.checked })}
            className="h-4 w-4 accent-[var(--success)]"
          />
          {labels.isActive}
        </label>
      </div>
    </AdminDialog>
  );
}
