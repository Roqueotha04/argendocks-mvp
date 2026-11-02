"use client";

import { ADMIN_LOCALE, adminUi } from "@/config/admin.ui";
import { useAdminData } from "@/hooks/useAdminData";
import { formatMoment } from "@/lib/format";
import { AdminPanel } from "@/components/admin/ui/AdminPanel";
import { AdminButton } from "@/components/admin/ui/AdminButton";

const VISIBLE_ENTRIES = 4;
const labels = adminUi.summary.activity;

export function RecentActivity() {
  const { data } = useAdminData();

  return (
    <AdminPanel
      title={labels.title}
      action={
        <AdminButton href="/admin/analitica" variant="ghost" size="sm">
          {labels.viewAll}
        </AdminButton>
      }
    >
      <ol className="px-4 pb-3 pt-2 md:px-5">
        {data.activity.slice(0, VISIBLE_ENTRIES).map((entry) => (
          <li key={entry.id} className="relative border-l border-line py-2 pl-4">
            <span
              aria-hidden
              className="absolute -left-[3.5px] top-3.5 h-1.5 w-1.5 rounded-full bg-secondary ring-4 ring-white"
            />
            <p className="font-data text-[10px] uppercase tracking-widest text-primary/50">
              {formatMoment(entry.fecha, ADMIN_LOCALE)}
            </p>
            <p className="mt-0.5 text-[13px] leading-snug text-primary">{entry.texto}</p>
          </li>
        ))}
      </ol>
    </AdminPanel>
  );
}
