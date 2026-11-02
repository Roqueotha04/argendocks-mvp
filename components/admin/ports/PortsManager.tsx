"use client";

import { useState } from "react";
import { adminUi } from "@/config/admin.ui";
import type { AdminPort, PublicationStatus } from "@/config/admin.types";
import { useAdminData } from "@/hooks/useAdminData";
import { createEmptyPort, finalizePortDraft } from "@/lib/admin/port-draft";
import { emptyPortFilters, filterPorts } from "@/lib/ports";
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { AdminPanel } from "@/components/admin/ui/AdminPanel";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { FilterTabs } from "@/components/admin/ui/FilterTabs";
import { SearchField } from "@/components/admin/ui/SearchField";
import { EmptyState } from "@/components/admin/ui/EmptyState";
import { PortsTable } from "@/components/admin/ports/PortsTable";
import { PortEditorDialog } from "@/components/admin/ports/PortEditorDialog";
import { PlusIcon } from "@/components/ui/icons";

type StatusFilter = PublicationStatus | "all";

type EditorState = {
  session: number;
  port: AdminPort;
  isNew: boolean;
};

const labels = adminUi.ports;

export function PortsManager() {
  const { data, savePort, setPortStatus } = useAdminData();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [editor, setEditor] = useState<EditorState | null>(null);

  const matchingSlugs = filterPorts({ ...emptyPortFilters, query }, data.ports).map(
    (port) => port.slug,
  );
  const visiblePorts = data.ports.filter(
    (port) =>
      matchingSlugs.includes(port.slug) && (statusFilter === "all" || port.estado === statusFilter),
  );

  function openEditor(port: AdminPort, isNew: boolean) {
    setEditor({ session: Date.now(), port, isNew });
  }

  function handleSave(draft: AdminPort) {
    if (!editor) return;
    const existingSlugs = data.ports.map((port) => port.slug);
    savePort(finalizePortDraft(draft, editor.isNew, existingSlugs), editor.isNew);
    setEditor(null);
  }

  function countByStatus(status: PublicationStatus) {
    return data.ports.filter((port) => port.estado === status).length;
  }

  return (
    <>
      <AdminPageHeader
        title={labels.title}
        subtitle={labels.subtitle}
        actions={
          <AdminButton onClick={() => openEditor(createEmptyPort(), true)}>
            <PlusIcon className="h-4 w-4" />
            {labels.create}
          </AdminButton>
        }
      />

      <AdminPanel>
        <div className="flex flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between">
          <FilterTabs
            label={labels.columns.status}
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { value: "all", label: adminUi.common.allMasculine, count: data.ports.length },
              {
                value: "publicado",
                label: labels.status.publicado,
                count: countByStatus("publicado"),
              },
              {
                value: "borrador",
                label: labels.status.borrador,
                count: countByStatus("borrador"),
              },
            ]}
          />
          <SearchField
            value={query}
            onChange={setQuery}
            label={adminUi.common.search}
            placeholder={labels.searchPlaceholder}
            className="md:w-72"
          />
        </div>
        {visiblePorts.length === 0 ? (
          <EmptyState message={adminUi.common.noResults} />
        ) : (
          <PortsTable
            ports={visiblePorts}
            onEdit={(port) => openEditor(port, false)}
            onChangeStatus={setPortStatus}
          />
        )}
      </AdminPanel>

      {editor && (
        <PortEditorDialog
          key={editor.session}
          initialPort={editor.port}
          isNew={editor.isNew}
          onClose={() => setEditor(null)}
          onSave={handleSave}
        />
      )}
    </>
  );
}
