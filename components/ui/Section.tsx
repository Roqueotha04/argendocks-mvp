import type { ReactNode } from "react";
import type { SectionId } from "@/config/site.types";

interface SectionProps {
  id: SectionId;
  className?: string;
  children: ReactNode;
  stacked?: boolean;
  topDivider?: ReactNode;
}

export function Section({
  id,
  className = "",
  children,
  stacked = false,
  topDivider,
}: SectionProps) {
  const shape = stacked
    ? "-mt-8 rounded-t-[2.5rem] pb-14 pt-16 shadow-[0_-10px_30px_-18px_rgba(0,0,0,0.25)] md:-mt-10 md:pb-20 md:pt-24"
    : "py-14 md:py-20";

  return (
    <section id={id} className={`relative scroll-mt-16 ${shape} ${className}`}>
      {topDivider}
      <div className="mx-auto w-full max-w-6xl px-6 md:px-8">{children}</div>
    </section>
  );
}
