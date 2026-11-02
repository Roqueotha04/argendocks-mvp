"use client";

import { adminUi } from "@/config/admin.ui";
import { useAdminData } from "@/hooks/useAdminData";
import { AdminPanel } from "@/components/admin/ui/AdminPanel";
import { VisitsChart } from "@/components/admin/summary/VisitsChart";

const labels = adminUi.summary.visitsChart;

export function VisitsPanel() {
  const { data } = useAdminData();

  return (
    <AdminPanel title={labels.title} subtitle={labels.subtitle}>
      <VisitsChart days={data.metrics.visitasDiarias} />
    </AdminPanel>
  );
}
