"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ADMIN_LOGIN_PATH } from "@/config/admin.ui";
import { useAdminSession } from "@/hooks/useAdminSession";
import { AdminLoader } from "@/components/admin/layout/AdminLoader";

export function AdminGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isReady, email } = useAdminSession();
  const isSignedIn = isReady && email !== null;

  useEffect(() => {
    if (isReady && email === null) router.replace(ADMIN_LOGIN_PATH);
  }, [isReady, email, router]);

  return isSignedIn ? children : <AdminLoader />;
}
