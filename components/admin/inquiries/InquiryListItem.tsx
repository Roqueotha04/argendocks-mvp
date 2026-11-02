import { ADMIN_LOCALE, adminUi } from "@/config/admin.ui";
import type { Inquiry } from "@/config/admin.types";
import { formatMoment } from "@/lib/format";

interface InquiryListItemProps {
  inquiry: Inquiry;
  isSelected: boolean;
  onSelect: () => void;
}

export function InquiryListItem({ inquiry, isSelected, onSelect }: InquiryListItemProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      className="flex w-full gap-3 border-b border-line px-4 py-3 text-left transition-colors hover:bg-accent/30 aria-pressed:bg-accent/60"
    >
      <span
        aria-hidden
        className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${inquiry.leida ? "bg-transparent" : "bg-secondary"}`}
      />
      <span className="min-w-0 flex-1">
        <span className="flex items-baseline justify-between gap-2">
          <span
            className={`truncate text-[13px] text-primary ${inquiry.leida ? "" : "font-semibold"}`}
          >
            {inquiry.nombre}
          </span>
          <span className="shrink-0 font-data text-[10px] text-primary/50">
            {formatMoment(inquiry.recibidaEn, ADMIN_LOCALE)}
          </span>
        </span>
        <span className="block text-xs text-secondary">
          {adminUi.inquiries.kinds[inquiry.tipo]}
        </span>
        <span className="mt-0.5 line-clamp-1 text-xs text-primary/65">{inquiry.mensaje}</span>
      </span>
    </button>
  );
}
