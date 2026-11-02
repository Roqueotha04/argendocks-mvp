import type { ReactNode } from "react";

type EyebrowTone = "default" | "onColor";

interface EyebrowProps {
  tone?: EyebrowTone;
  className?: string;
  children: ReactNode;
}

const toneClasses: Record<EyebrowTone, string> = {
  default: "text-primary/70",
  onColor: "text-accent/80",
};

export function Eyebrow({ tone = "default", className = "", children }: EyebrowProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-data text-[10px] font-medium uppercase tracking-[0.22em] ${toneClasses[tone]} ${className}`}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-secondary" />
      {children}
    </span>
  );
}
