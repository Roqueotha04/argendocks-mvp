"use client";

import { useState } from "react";
import { adminUi } from "@/config/admin.ui";
import type { AdminPort } from "@/config/admin.types";
import type { Terminal } from "@/config/port.types";
import { createEmptyTerminal } from "@/lib/admin/port-draft";
import { AdminDialog } from "@/components/admin/ui/AdminDialog";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { EditorSection } from "@/components/admin/ui/EditorSection";
import { PortDetailsFields } from "@/components/admin/ports/PortDetailsFields";
import { TerminalFields } from "@/components/admin/ports/TerminalFields";
import { PlusIcon } from "@/components/ui/icons";

interface PortEditorDialogProps {
  initialPort: AdminPort;
  isNew: boolean;
  onClose: () => void;
  onSave: (port: AdminPort) => void;
}

const labels = adminUi.portEditor;

export function PortEditorDialog({ initialPort, isNew, onClose, onSave }: PortEditorDialogProps) {
  const [draft, setDraft] = useState(initialPort);

  function update(patch: Partial<AdminPort>) {
    setDraft((current) => ({ ...current, ...patch }));
  }

  function updateTerminal(index: number, patch: Partial<Terminal>) {
    setDraft((current) => ({
      ...current,
      terminales: current.terminales.map((terminal, position) =>
        position === index ? { ...terminal, ...patch } : terminal,
      ),
    }));
  }

  function addTerminal() {
    setDraft((current) => ({
      ...current,
      terminales: [...current.terminales, createEmptyTerminal()],
    }));
  }

  function removeTerminal(index: number) {
    setDraft((current) => ({
      ...current,
      terminales: current.terminales.filter((_, position) => position !== index),
    }));
  }

  return (
    <AdminDialog
      onClose={onClose}
      onSubmit={() => onSave(draft)}
      title={isNew ? labels.createTitle : labels.editTitle}
      eyebrow={isNew ? undefined : `${initialPort.nombre} · ${initialPort.unLocode}`}
      submitLabel={isNew ? labels.create : adminUi.common.save}
      wide
    >
      <div className="flex flex-col gap-5">
        <PortDetailsFields port={draft} onChange={update} />

        <EditorSection
          title={labels.sections.terminals}
          action={
            <AdminButton variant="outline" size="sm" onClick={addTerminal}>
              <PlusIcon className="h-3.5 w-3.5" />
              {labels.addTerminal}
            </AdminButton>
          }
        >
          {draft.terminales.length === 0 ? (
            <p className="rounded-xl border border-dashed border-line px-4 py-6 text-center text-sm text-primary/60">
              {labels.noTerminals}
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {draft.terminales.map((terminal, index) => (
                <TerminalFields
                  key={index}
                  terminal={terminal}
                  onChange={(patch) => updateTerminal(index, patch)}
                  onRemove={() => removeTerminal(index)}
                />
              ))}
            </div>
          )}
        </EditorSection>
      </div>
    </AdminDialog>
  );
}
