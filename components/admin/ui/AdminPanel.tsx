import type { ReactNode } from "react";

interface AdminPanelProps {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}

export function AdminPanel({ title, subtitle, action, className = "", children }: AdminPanelProps) {
  return (
    <section className={`overflow-hidden rounded-2xl border border-line bg-white ${className}`}>
      {title && (
        <header className="flex flex-wrap items-center justify-between gap-3 px-4 pb-1 pt-4 md:px-5">
          <div>
            <h2 className="font-heading text-base font-semibold leading-tight text-primary">
              {title}
            </h2>
            {subtitle && (
              <p className="font-accent text-[15px] italic leading-snug text-secondary">
                {subtitle}
              </p>
            )}
          </div>
          {action}
        </header>
      )}
      {children}
    </section>
  );
}
