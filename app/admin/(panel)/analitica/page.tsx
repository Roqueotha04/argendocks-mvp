import { adminUi } from "@/config/admin.ui";
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { AnalyticsStats } from "@/components/admin/analytics/AnalyticsStats";
import { AnalyticsBreakdown } from "@/components/admin/analytics/AnalyticsBreakdown";
import { VisitsPanel } from "@/components/admin/summary/VisitsPanel";

export default function AdminAnalyticsPage() {
  return (
    <>
      <AdminPageHeader title={adminUi.analytics.title} subtitle={adminUi.analytics.subtitle} />
      <AnalyticsStats />
      <VisitsPanel />
      <AnalyticsBreakdown />
    </>
  );
}
