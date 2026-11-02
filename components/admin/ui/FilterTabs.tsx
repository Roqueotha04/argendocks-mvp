export type FilterTabOption<T extends string> = {
  value: T;
  label: string;
  count?: number;
};

interface FilterTabsProps<T extends string> {
  options: FilterTabOption<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string;
}

export function FilterTabs<T extends string>({
  options,
  value,
  onChange,
  label,
}: FilterTabsProps<T>) {
  return (
    <div
      role="group"
      aria-label={label}
      className="flex w-fit max-w-full gap-0.5 overflow-x-auto rounded-full bg-accent p-1"
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          aria-pressed={option.value === value}
          className="inline-flex h-7 shrink-0 items-center gap-1.5 rounded-full px-3 text-xs text-primary/70 transition-colors hover:text-primary aria-pressed:bg-white aria-pressed:text-primary aria-pressed:shadow-[0_1px_2px_rgba(19,48,90,0.12)]"
        >
          {option.label}
          {option.count !== undefined && (
            <span className="font-data text-[10px] text-secondary">{option.count}</span>
          )}
        </button>
      ))}
    </div>
  );
}
