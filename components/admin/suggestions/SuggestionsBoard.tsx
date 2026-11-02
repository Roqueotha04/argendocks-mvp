"use client";

import { useState } from "react";
import { adminUi } from "@/config/admin.ui";
import type { SuggestionStatus } from "@/config/admin.types";
import { useAdminData } from "@/hooks/useAdminData";
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { AdminPanel } from "@/components/admin/ui/AdminPanel";
import { FilterTabs } from "@/components/admin/ui/FilterTabs";
import { EmptyState } from "@/components/admin/ui/EmptyState";
import { SuggestionsTable } from "@/components/admin/suggestions/SuggestionsTable";

const labels = adminUi.suggestions;
const statuses = Object.keys(labels.status) as SuggestionStatus[];

export function SuggestionsBoard() {
  const { data, setSuggestionStatus } = useAdminData();
  const [statusFilter, setStatusFilter] = useState<SuggestionStatus>("pendiente");

  const visible = data.suggestions.filter((suggestion) => suggestion.estado === statusFilter);
  const portNames = new Map(data.ports.map((port) => [port.slug, port.nombre]));

  return (
    <>
      <AdminPageHeader title={labels.title} subtitle={labels.subtitle} />

      <AdminPanel>
        <div className="px-4 py-3">
          <FilterTabs
            label={labels.title}
            value={statusFilter}
            onChange={setStatusFilter}
            options={statuses.map((status) => ({
              value: status,
              label: labels.status[status],
              count: data.suggestions.filter((suggestion) => suggestion.estado === status).length,
            }))}
          />
        </div>
        {visible.length === 0 ? (
          <EmptyState message={labels.empty} />
        ) : (
          <SuggestionsTable
            suggestions={visible}
            portNames={portNames}
            onChangeStatus={setSuggestionStatus}
          />
        )}
      </AdminPanel>
    </>
  );
}
