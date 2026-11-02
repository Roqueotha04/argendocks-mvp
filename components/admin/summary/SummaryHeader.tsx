"use client";

import { ADMIN_LOCALE, adminUi } from "@/config/admin.ui";
import { greetingFor } from "@/lib/admin/admin-insights";
import { formatLongDate } from "@/lib/format";
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { PlusIcon } from "@/components/ui/icons";

const labels = adminUi.summary;

export function SummaryHeader() {
  const now = new Date();

  return (
    <AdminPageHeader
      eyebrow={greetingFor(now)}
      title={labels.title}
      subtitle={formatLongDate(now, ADMIN_LOCALE)}
      actions={
        <AdminButton href="/admin/puertos">
          <PlusIcon className="h-4 w-4" />
          {labels.goToPorts}
        </AdminButton>
      }
    />
  );
}
