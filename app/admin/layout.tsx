import type { Metadata } from "next";
import type { ReactNode } from "react";
import { adminUi } from "@/config/admin.ui";

export const metadata: Metadata = {
  title: adminUi.meta.title,
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return children;
}
