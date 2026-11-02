import { adminUi } from "@/config/admin.ui";
import { Logo } from "@/components/layout/Logo";

export function AdminBrand() {
  return (
    <div className="flex items-center gap-2.5">
      <Logo className="h-6" />
      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 font-data text-[9px] uppercase tracking-[0.18em] text-white">
        <span aria-hidden className="h-1 w-1 rounded-full bg-secondary" />
        {adminUi.shell.badge}
      </span>
    </div>
  );
}
