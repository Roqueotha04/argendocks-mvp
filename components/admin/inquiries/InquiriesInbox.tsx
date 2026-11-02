"use client";

import { useState } from "react";
import { adminUi } from "@/config/admin.ui";
import { useAdminData } from "@/hooks/useAdminData";
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { FilterTabs } from "@/components/admin/ui/FilterTabs";
import { EmptyState } from "@/components/admin/ui/EmptyState";
import { InquiryListItem } from "@/components/admin/inquiries/InquiryListItem";
import { InquiryDetail } from "@/components/admin/inquiries/InquiryDetail";

type ReadFilter = "all" | "unread" | "read";

const labels = adminUi.inquiries;

export function InquiriesInbox() {
  const { data, markInquiryRead } = useAdminData();
  const [filter, setFilter] = useState<ReadFilter>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const unreadCount = data.inquiries.filter((inquiry) => !inquiry.leida).length;
  const visible = data.inquiries.filter((inquiry) => {
    if (filter === "unread") return !inquiry.leida;
    if (filter === "read") return inquiry.leida;
    return true;
  });
  const selected = data.inquiries.find((inquiry) => inquiry.id === selectedId);

  function select(id: string) {
    setSelectedId(id);
    markInquiryRead(id);
  }

  return (
    <>
      <AdminPageHeader title={labels.title} subtitle={labels.subtitle} />

      <div className="grid overflow-hidden rounded-2xl border border-line bg-white lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)]">
        <div className="border-b border-line lg:border-b-0 lg:border-r">
          <div className="border-b border-line px-3 py-2.5">
            <FilterTabs
              label={labels.title}
              value={filter}
              onChange={setFilter}
              options={[
                { value: "all", label: adminUi.common.all, count: data.inquiries.length },
                { value: "unread", label: labels.unread, count: unreadCount },
                { value: "read", label: labels.read, count: data.inquiries.length - unreadCount },
              ]}
            />
          </div>
          {visible.length === 0 ? (
            <EmptyState message={labels.empty} />
          ) : (
            <ul className="max-h-[28rem] overflow-y-auto lg:max-h-[36rem]">
              {visible.map((inquiry) => (
                <li key={inquiry.id}>
                  <InquiryListItem
                    inquiry={inquiry}
                    isSelected={inquiry.id === selectedId}
                    onSelect={() => select(inquiry.id)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="min-h-[18rem]">
          {selected ? (
            <InquiryDetail inquiry={selected} />
          ) : (
            <div className="flex h-full items-center justify-center">
              <EmptyState message={labels.selectPrompt} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
