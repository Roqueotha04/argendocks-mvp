import type { ReactNode } from "react";
import { AdminDataProvider } from "@/components/providers/AdminDataProvider";
import { AdminGuard } from "@/components/admin/layout/AdminGuard";
import { AdminShell } from "@/components/admin/layout/AdminShell";

export default function AdminPanelLayout({ children }: { children: ReactNode }) {
  return (
    <AdminGuard>
      <AdminDataProvider>
        <AdminShell>{children}</AdminShell>
      </AdminDataProvider>
    </AdminGuard>
  );
}
