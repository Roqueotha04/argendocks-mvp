import { SummaryHero } from "@/components/admin/summary/SummaryHero";
import { AttentionInbox } from "@/components/admin/summary/AttentionInbox";
import { VisitsPanel } from "@/components/admin/summary/VisitsPanel";
import { RecentActivity } from "@/components/admin/summary/RecentActivity";
import { PortRadar } from "@/components/admin/summary/PortRadar";

export default function AdminSummaryPage() {
  return (
    <>
      <SummaryHero />
      <AttentionInbox />
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <VisitsPanel />
        <RecentActivity />
      </div>
      <PortRadar />
    </>
  );
}
