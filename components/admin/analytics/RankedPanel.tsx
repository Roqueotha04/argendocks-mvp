import { ADMIN_LOCALE } from "@/config/admin.ui";
import type { RankedValue } from "@/config/admin.types";
import { formatNumber } from "@/lib/format";
import { AdminPanel } from "@/components/admin/ui/AdminPanel";
import { BarList } from "@/components/admin/ui/BarList";

interface RankedPanelProps {
  title: string;
  subtitle?: string;
  values: RankedValue[];
}

export function RankedPanel({ title, subtitle, values }: RankedPanelProps) {
  const items = values.map((value) => ({ label: value.etiqueta, value: value.valor }));

  return (
    <AdminPanel title={title} subtitle={subtitle}>
      <div className="px-4 pb-4 pt-3 md:px-5">
        <BarList items={items} formatValue={(value) => formatNumber(value, ADMIN_LOCALE)} />
      </div>
    </AdminPanel>
  );
}
