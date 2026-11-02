import type { ReactNode } from "react";
import { AdminMobileBar } from "@/components/admin/layout/AdminMobileBar";
import { AdminSidebar } from "@/components/admin/layout/AdminSidebar";

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-background lg:grid lg:grid-cols-[15rem_minmax(0,1fr)]">
      <aside className="sticky top-0 hidden h-dvh lg:block">
        <AdminSidebar />
      </aside>
      <AdminMobileBar />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-6 md:px-8 md:py-8">
        {children}
      </main>
    </div>
  );
}
