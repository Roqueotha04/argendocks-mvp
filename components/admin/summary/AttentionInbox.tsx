"use client";

import { useState } from "react";
import Link from "next/link";
import { ADMIN_LOCALE, adminUi } from "@/config/admin.ui";
import { useAdminData } from "@/hooks/useAdminData";
import { listAttentionItems, type AttentionCategory } from "@/lib/admin/admin-insights";
import { formatMoment } from "@/lib/format";
import { fillTemplate } from "@/lib/template";
import { AdminPanel } from "@/components/admin/ui/AdminPanel";
import { FilterTabs, type FilterTabOption } from "@/components/admin/ui/FilterTabs";
import { EmptyState } from "@/components/admin/ui/EmptyState";
import { ArrowRightIcon, ChevronDownIcon } from "@/components/ui/icons";

type AttentionFilter = AttentionCategory | "all";

const PREVIEW_COUNT = 3;
const labels = adminUi.summary.attention;
const categories = Object.keys(labels.categories) as AttentionCategory[];

const dotClasses: Record<AttentionCategory, string> = {
  suggestions: "bg-secondary",
  users: "bg-primary",
  inquiries: "bg-success",
  stale: "bg-warning",
};

export function AttentionInbox() {
  const { data } = useAdminData();
  const [filter, setFilter] = useState<AttentionFilter>("all");
  const [isExpanded, setIsExpanded] = useState(false);

  const items = listAttentionItems(data, new Date());
  const filtered = filter === "all" ? items : items.filter((item) => item.category === filter);
  const visible = isExpanded ? filtered : filtered.slice(0, PREVIEW_COUNT);
  const hiddenCount = filtered.length - PREVIEW_COUNT;

  const options: FilterTabOption<AttentionFilter>[] = [
    { value: "all", label: adminUi.common.all, count: items.length },
    ...categories.map((category) => ({
      value: category,
      label: labels.categories[category],
      count: items.filter((item) => item.category === category).length,
    })),
  ];

  return (
    <AdminPanel
      title={labels.title}
      subtitle={labels.subtitle}
      action={
        <FilterTabs
          options={options}
          value={filter}
          onChange={(value) => {
            setFilter(value);
            setIsExpanded(false);
          }}
          label={labels.title}
        />
      }
    >
      {visible.length === 0 ? (
        <EmptyState message={labels.empty} />
      ) : (
        <ul className="mt-2">
          {visible.map((item) => (
            <li key={item.id} className="border-t border-line">
              <Link
                href={item.href}
                className="group flex items-start gap-3 px-4 py-3 transition-colors hover:bg-accent/30 md:px-5"
              >
                <span
                  aria-hidden
                  className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${dotClasses[item.category]}`}
                />
                <span className="min-w-0 flex-1">
                  <span className="line-clamp-2 text-[13px] leading-snug text-primary">
                    {item.text}
                  </span>
                  <span className="mt-1 flex gap-2 font-data text-[10px] uppercase tracking-widest text-primary/50">
                    <span className="text-secondary">{labels.categories[item.category]}</span>
                    {item.date && <span>{formatMoment(item.date, ADMIN_LOCALE)}</span>}
                  </span>
                </span>
                <ArrowRightIcon className="mt-1 h-3.5 w-3.5 shrink-0 text-secondary opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            </li>
          ))}
        </ul>
      )}

      {hiddenCount > 0 && (
        <button
          type="button"
          onClick={() => setIsExpanded((expanded) => !expanded)}
          aria-expanded={isExpanded}
          className="flex w-full items-center justify-center gap-1.5 border-t border-line py-2.5 text-xs font-semibold text-secondary transition-colors hover:bg-accent/30"
        >
          {isExpanded
            ? adminUi.common.seeLess
            : fillTemplate(adminUi.common.seeMore, { count: hiddenCount })}
          <ChevronDownIcon
            className={`h-3.5 w-3.5 transition-transform ${isExpanded ? "rotate-180" : ""}`}
          />
        </button>
      )}
    </AdminPanel>
  );
}
