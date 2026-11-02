"use client";

import { ADMIN_LOCALE, adminUi } from "@/config/admin.ui";
import { useAdminData } from "@/hooks/useAdminData";
import { countPending, summarizeVisits } from "@/lib/admin/admin-insights";
import { formatNumber, formatPercent } from "@/lib/format";
import { fillTemplate } from "@/lib/template";
import { StatGrid } from "@/components/admin/ui/StatGrid";
import { StatTile } from "@/components/admin/ui/StatTile";

const labels = adminUi.summary.stats;

export function SummaryStats() {
  const { data } = useAdminData();
  const visits = summarizeVisits(data.metrics);
  const pending = countPending(data);
  const publishedCount = data.ports.filter((port) => port.estado === "publicado").length;
  const draftCount = data.ports.length - publishedCount;
  const delta = `${visits.deltaRatio >= 0 ? "+" : ""}${formatPercent(visits.deltaRatio, ADMIN_LOCALE)}`;

  return (
    <StatGrid>
      <StatTile
        label={labels.visits}
        value={formatNumber(visits.total, ADMIN_LOCALE)}
        hint={fillTemplate(labels.visitsDelta, { delta })}
        hintTone={visits.deltaRatio >= 0 ? "success" : "danger"}
      />
      <StatTile
        label={labels.users}
        value={formatNumber(data.users.length, ADMIN_LOCALE)}
        hint={fillTemplate(labels.usersPending, { count: pending.users })}
        hintTone={pending.users > 0 ? "warning" : "neutral"}
      />
      <StatTile
        label={labels.suggestions}
        value={String(pending.suggestions)}
        hint={labels.suggestionsHint}
      />
      <StatTile
        label={labels.ports}
        value={String(publishedCount)}
        hint={fillTemplate(labels.portsDrafts, { count: draftCount })}
        hintTone="info"
      />
    </StatGrid>
  );
}
