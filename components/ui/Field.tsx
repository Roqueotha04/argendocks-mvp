import type { ReactNode } from "react";

interface FieldProps {
  label: string;
  children: ReactNode;
  className?: string;
}

export const fieldInputClassName =
  "block w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-primary outline-none transition-colors placeholder:text-primary/40 focus:border-secondary focus:ring-2 focus:ring-secondary/20";

export function Field({ label, children, className = "" }: FieldProps) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-xs font-semibold text-primary/80">{label}</span>
      {children}
    </label>
  );
}
