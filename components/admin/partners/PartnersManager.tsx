"use client";

import { useState } from "react";
import { adminUi } from "@/config/admin.ui";
import type { Partner } from "@/config/admin.types";
import { useAdminData } from "@/hooks/useAdminData";
import { fillTemplate } from "@/lib/template";
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminPanel } from "@/components/admin/ui/AdminPanel";
import { PartnersTable } from "@/components/admin/partners/PartnersTable";
import { PartnerEditorDialog } from "@/components/admin/partners/PartnerEditorDialog";
import { PlusIcon } from "@/components/ui/icons";

type EditorState = {
  partner: Partner;
  isNew: boolean;
};

const labels = adminUi.partners;

function createEmptyPartner(): Partner {
  return {
    id: crypto.randomUUID(),
    nombre: "",
    categoria: "puerto",
    nivel: "estandar",
    activo: true,
    desde: new Date().toISOString().slice(0, 10),
    sitio: "",
    contacto: "",
    clicsMes: 0,
  };
}

export function PartnersManager() {
  const { data, savePartner, removePartner } = useAdminData();
  const [editor, setEditor] = useState<EditorState | null>(null);

  function handleRemove(partner: Partner) {
    if (window.confirm(fillTemplate(labels.confirmRemove, { name: partner.nombre }))) {
      removePartner(partner.id);
    }
  }

  function handleSave(partner: Partner) {
    savePartner(partner);
    setEditor(null);
  }

  return (
    <>
      <AdminPageHeader
        title={labels.title}
        subtitle={labels.subtitle}
        actions={
          <AdminButton onClick={() => setEditor({ partner: createEmptyPartner(), isNew: true })}>
            <PlusIcon className="h-4 w-4" />
            {labels.create}
          </AdminButton>
        }
      />

      <AdminPanel>
        <PartnersTable
          partners={data.partners}
          onEdit={(partner) => setEditor({ partner, isNew: false })}
          onRemove={handleRemove}
        />
      </AdminPanel>

      {editor && (
        <PartnerEditorDialog
          key={editor.partner.id}
          initialPartner={editor.partner}
          isNew={editor.isNew}
          onClose={() => setEditor(null)}
          onSave={handleSave}
        />
      )}
    </>
  );
}
