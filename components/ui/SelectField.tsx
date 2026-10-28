import type { ReactNode } from "react";
import { fieldInputClassName } from "@/components/ui/Field";
import { ChevronDownIcon } from "@/components/ui/icons";

interface SelectFieldProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  children: ReactNode;
}

export function SelectField({ value, onChange, required = false, children }: SelectFieldProps) {
  return (
    <span className="relative block">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        className={`${fieldInputClassName} cursor-pointer appearance-none pr-10`}
      >
        {children}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/60" />
    </span>
  );
}
