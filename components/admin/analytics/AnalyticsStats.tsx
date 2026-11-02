"use client";

import { ADMIN_LOCALE, adminUi } from "@/config/admin.ui";
import { useAdminData } from "@/hooks/useAdminData";
import { sumValues, summarizeVisits } from "@/lib/admin/admin-insights";
import { formatDuration, formatNumber } from "@/lib/format";
import { StatGrid } from "@/components/admin/ui/StatGrid";
import { StatTile } from "@/components/admin/ui/StatTile";

const labels = adminUi.analytics.stats;

export function AnalyticsStats() {
  const { metrics } = useAdminData().data;
  const visits = summarizeVisits(metrics);

  return (
    <StatGrid>
      <StatTile label={labels.visits} value={formatNumber(visits.total, ADMIN_LOCALE)} />
      <StatTile
        label={labels.unique}
        value={formatNumber(metrics.visitantesUnicos30d, ADMIN_LOCALE)}
      />
      <StatTile label={labels.avgTime} value={formatDuration(metrics.tiempoPromedioSegundos)} />
      <StatTile
        label={labels.exports}
        value={formatNumber(sumValues(metrics.exportaciones), ADMIN_LOCALE)}
      />
    </StatGrid>
  );
}
