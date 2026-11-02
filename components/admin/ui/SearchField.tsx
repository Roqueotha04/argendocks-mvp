import { SearchIcon } from "@/components/ui/icons";

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder: string;
  className?: string;
}

export function SearchField({
  value,
  onChange,
  label,
  placeholder,
  className = "",
}: SearchFieldProps) {
  return (
    <label className={`relative block ${className}`}>
      <span className="sr-only">{label}</span>
      <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/45" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-9 w-full rounded-full border border-line bg-white pl-10 pr-4 text-sm text-primary outline-none transition-colors placeholder:text-primary/40 focus:border-secondary focus:ring-2 focus:ring-secondary/20"
      />
    </label>
  );
}
