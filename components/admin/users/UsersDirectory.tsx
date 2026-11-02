"use client";

import { useState } from "react";
import { adminUi } from "@/config/admin.ui";
import type { AdminUser, UserStatus } from "@/config/admin.types";
import { useAdminData } from "@/hooks/useAdminData";
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { AdminPanel } from "@/components/admin/ui/AdminPanel";
import { FilterTabs } from "@/components/admin/ui/FilterTabs";
import { SearchField } from "@/components/admin/ui/SearchField";
import { EmptyState } from "@/components/admin/ui/EmptyState";
import { UsersTable } from "@/components/admin/users/UsersTable";

type StatusFilter = UserStatus | "all";

const labels = adminUi.users;
const statuses = Object.keys(labels.status) as UserStatus[];

function matchesQuery(user: AdminUser, query: string): boolean {
  const normalizedQuery = query.trim().toLowerCase();
  return [user.nombre, user.email, user.empresa].some((field) =>
    field.toLowerCase().includes(normalizedQuery),
  );
}

export function UsersDirectory() {
  const { data, setUserStatus } = useAdminData();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const visibleUsers = data.users.filter(
    (user) => matchesQuery(user, query) && (statusFilter === "all" || user.estado === statusFilter),
  );

  return (
    <>
      <AdminPageHeader title={labels.title} subtitle={labels.subtitle} />

      <AdminPanel>
        <div className="flex flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between">
          <FilterTabs
            label={labels.columns.status}
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { value: "all", label: adminUi.common.allMasculine, count: data.users.length },
              ...statuses.map((status) => ({
                value: status,
                label: labels.status[status],
                count: data.users.filter((user) => user.estado === status).length,
              })),
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
        {visibleUsers.length === 0 ? (
          <EmptyState message={adminUi.common.noResults} />
        ) : (
          <UsersTable users={visibleUsers} onChangeStatus={setUserStatus} />
        )}
      </AdminPanel>
    </>
  );
}
