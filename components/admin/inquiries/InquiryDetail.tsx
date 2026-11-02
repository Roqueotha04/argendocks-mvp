import { ADMIN_LOCALE, adminUi } from "@/config/admin.ui";
import type { Inquiry } from "@/config/admin.types";
import { formatMoment } from "@/lib/format";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { MailIcon } from "@/components/ui/icons";

const labels = adminUi.inquiries;

export function InquiryDetail({ inquiry }: { inquiry: Inquiry }) {
  const replyHref = `mailto:${inquiry.email}?subject=${encodeURIComponent(labels.replySubject)}`;

  return (
    <article className="flex h-full flex-col p-5">
      <p className="font-data text-[10px] uppercase tracking-[0.2em] text-secondary">
        {labels.kinds[inquiry.tipo]}
      </p>
      <h2 className="mt-1 font-heading text-lg font-semibold text-primary">{inquiry.nombre}</h2>
      <p className="font-accent text-[15px] italic text-secondary">
        {inquiry.empresa} · {inquiry.email}
      </p>
      <p className="mt-1 font-data text-[10px] uppercase tracking-widest text-primary/50">
        {formatMoment(inquiry.recibidaEn, ADMIN_LOCALE)}
      </p>

      <p className="mt-4 flex-1 whitespace-pre-line rounded-2xl bg-accent/50 p-4 text-[13px] leading-relaxed text-primary">
        {inquiry.mensaje}
      </p>

      <div className="mt-4 flex justify-end">
        <AdminButton href={replyHref} external>
          <MailIcon className="h-4 w-4" />
          {labels.reply}
        </AdminButton>
      </div>
    </article>
  );
}
