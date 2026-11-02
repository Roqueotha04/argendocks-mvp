import { toneTextClasses, type StatusTone } from "@/components/admin/ui/StatusBadge";

interface StatTileProps {
  label: string;
  value: string;
  hint?: string;
  hintTone?: StatusTone;
}

export function StatTile({ label, value, hint, hintTone = "neutral" }: StatTileProps) {
  return (
    <div className="flex min-w-[11.5rem] snap-start flex-col rounded-2xl bg-white px-4 py-3.5 shadow-[0_1px_0_rgba(19,48,90,0.08)] md:min-w-0">
      <p className="font-data text-[10px] uppercase tracking-widest text-primary/55">{label}</p>
      <p className="mt-1.5 font-data text-2xl font-medium tracking-tight text-primary">{value}</p>
      {hint && <p className={`mt-0.5 text-xs ${toneTextClasses[hintTone]}`}>{hint}</p>}
    </div>
  );
}
