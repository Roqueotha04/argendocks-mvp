export type BarListItem = {
  label: string;
  value: number;
};

interface BarListProps {
  items: BarListItem[];
  formatValue: (value: number) => string;
}

export function BarList({ items, formatValue }: BarListProps) {
  const max = Math.max(...items.map((item) => item.value), 1);

  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item) => (
        <li key={item.label}>
          <div className="flex items-baseline justify-between gap-4">
            <span className="truncate text-[13px] text-primary">{item.label}</span>
            <span className="font-data text-xs text-primary/70">{formatValue(item.value)}</span>
          </div>
          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-accent">
            <span
              aria-hidden
              className="block h-full rounded-full bg-secondary"
              style={{ width: `${(item.value / max) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
