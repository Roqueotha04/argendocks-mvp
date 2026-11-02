"use client";

import { adminUi } from "@/config/admin.ui";
import { useAdminData } from "@/hooks/useAdminData";
import { rankPublishedPorts } from "@/lib/admin/admin-insights";
import { RankedPanel } from "@/components/admin/analytics/RankedPanel";

const labels = adminUi.analytics;

export function AnalyticsBreakdown() {
  const { ports, metrics } = useAdminData().data;
  const topPorts = rankPublishedPorts(ports).map((port) => ({
    etiqueta: port.nombre,
    valor: port.visitas30d,
  }));

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <RankedPanel title={labels.sources} values={metrics.fuentesDeTrafico} />
      <RankedPanel title={labels.devices} values={metrics.dispositivos} />
      <RankedPanel
        title={labels.searches}
        subtitle={labels.searchesSubtitle}
        values={metrics.busquedas}
      />
      <RankedPanel title={labels.topPorts} values={topPorts} />
      <RankedPanel title={labels.exportsByFormat} values={metrics.exportaciones} />
    </div>
  );
}
