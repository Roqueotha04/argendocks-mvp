import type { ReactNode } from "react";
import { Eyebrow } from "@/components/admin/ui/Eyebrow";

interface AdminPageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

export function AdminPageHeader({ eyebrow, title, subtitle, actions }: AdminPageHeaderProps) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
        <h1 className="font-heading text-2xl font-semibold leading-[1.05] tracking-tight text-primary md:text-[1.75rem]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1.5 font-accent text-lg italic leading-snug text-secondary first-letter:uppercase">
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </header>
  );
}
