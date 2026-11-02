"use client";

import { adminUi } from "@/config/admin.ui";
import { useAdminSession } from "@/hooks/useAdminSession";
import { AdminBrand } from "@/components/admin/layout/AdminBrand";
import { AdminNavLinks } from "@/components/admin/layout/AdminNavLinks";
import { ExternalLinkIcon, LogOutIcon } from "@/components/ui/icons";

interface AdminSidebarProps {
  onNavigate?: () => void;
}

const labels = adminUi.shell;

const footerLinkClassName =
  "flex h-8 items-center justify-center gap-1.5 rounded-full border border-line text-xs text-primary/75 transition-colors hover:border-primary hover:text-primary";

export function AdminSidebar({ onNavigate }: AdminSidebarProps) {
  const { email, signOut } = useAdminSession();
  const initial = email?.charAt(0).toUpperCase() ?? "A";

  return (
    <div className="flex h-full flex-col border-r border-line bg-white">
      <div className="px-4 py-4">
        <AdminBrand />
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        <AdminNavLinks onNavigate={onNavigate} />
      </div>

      <div className="border-t border-line p-3">
        <div className="flex items-center gap-2.5 rounded-2xl bg-accent/60 p-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
            {initial}
          </span>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold text-primary">{email}</p>
            <p className="font-accent text-sm italic leading-none text-secondary">{labels.role}</p>
          </div>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-1.5">
          <a href="/" target="_blank" rel="noopener noreferrer" className={footerLinkClassName}>
            <ExternalLinkIcon className="h-3.5 w-3.5" />
            {labels.viewSite}
          </a>
          <button type="button" onClick={signOut} className={footerLinkClassName}>
            <LogOutIcon className="h-3.5 w-3.5" />
            {labels.signOut}
          </button>
        </div>
      </div>
    </div>
  );
}
