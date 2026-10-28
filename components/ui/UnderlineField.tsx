import type { ReactNode } from "react";

interface UnderlineFieldProps {
  label: string;
  children: ReactNode;
  className?: string;
}

export const underlineInputClassName =
  "w-full border-0 border-b border-primary/25 bg-transparent px-0 py-2.5 text-base text-primary outline-none transition-colors placeholder:text-primary/40 focus:border-secondary";

export function UnderlineField({ label, children, className = "" }: UnderlineFieldProps) {
  return (
    <label className={`block ${className}`}>
      <span className="font-data text-[11px] uppercase tracking-[0.2em] text-primary/60">{label}</span>
      {children}
    </label>
  );
}
