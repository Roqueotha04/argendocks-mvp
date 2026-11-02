import { SummaryHeader } from "@/components/admin/summary/SummaryHeader";
import { SummaryStats } from "@/components/admin/summary/SummaryStats";

export function SummaryHero() {
  return (
    <section className="flex flex-col gap-5 rounded-[1.75rem] bg-accent px-4 py-5 md:px-6 md:py-6">
      <SummaryHeader />
      <SummaryStats />
    </section>
  );
}
