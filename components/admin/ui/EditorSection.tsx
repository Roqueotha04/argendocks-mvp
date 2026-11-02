import type { ReactNode } from "react";
import { Eyebrow } from "@/components/admin/ui/Eyebrow";

interface EditorSectionProps {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}

export function EditorSection({ title, action, children }: EditorSectionProps) {
  return (
    <section className="border-t border-line pt-5 first:border-t-0 first:pt-0">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3>
          <Eyebrow>{title}</Eyebrow>
        </h3>
        {action}
      </div>
      {children}
    </section>
  );
}
