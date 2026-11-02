"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_HOME_PATH, adminNav } from "@/config/admin.ui";
import { useAdminData } from "@/hooks/useAdminData";
import { countPending } from "@/lib/admin/admin-insights";
import { AdminIcon } from "@/components/admin/layout/AdminIcon";
import { Eyebrow } from "@/components/admin/ui/Eyebrow";

interface AdminNavLinksProps {
  onNavigate?: () => void;
}

export function AdminNavLinks({ onNavigate }: AdminNavLinksProps) {
  const pathname = usePathname();
  const { data } = useAdminData();
  const pending = countPending(data);

  function isCurrent(href: string) {
    const current = pathname.replace(/\/$/, "") || "/";
    return href === ADMIN_HOME_PATH ? current === href : current.startsWith(href);
  }

  return (
    <nav className="flex flex-col gap-5">
      {adminNav.map((group) => (
        <div key={group.title}>
          <Eyebrow className="px-3">{group.title}</Eyebrow>
          <ul className="mt-2 flex flex-col gap-0.5">
            {group.links.map((link) => {
              const badgeCount = link.badge ? pending[link.badge] : 0;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onNavigate}
                    aria-current={isCurrent(link.href) ? "page" : undefined}
                    className="group flex items-center gap-2.5 rounded-full px-3 py-2 text-sm text-primary/75 transition-colors hover:bg-accent/70 hover:text-primary aria-[current=page]:bg-primary aria-[current=page]:text-white"
                  >
                    <AdminIcon
                      name={link.icon}
                      className="h-4 w-4 text-primary/45 group-hover:text-primary group-aria-[current=page]:text-secondary"
                    />
                    <span className="flex-1">{link.label}</span>
                    {badgeCount > 0 && (
                      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-secondary px-1.5 font-data text-[10px] text-white">
                        {badgeCount}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
