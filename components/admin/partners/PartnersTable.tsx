import { ADMIN_LOCALE, adminUi } from "@/config/admin.ui";
import type { Partner, PartnerTier } from "@/config/admin.types";
import { formatDate, formatNumber } from "@/lib/format";
import { AdminTable, adminCellClassName } from "@/components/admin/ui/AdminTable";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { PencilIcon, TrashIcon } from "@/components/ui/icons";

interface PartnersTableProps {
  partners: Partner[];
  onEdit: (partner: Partner) => void;
  onRemove: (partner: Partner) => void;
}

const labels = adminUi.partners;

const tierClasses: Record<PartnerTier, string> = {
  fundador: "bg-primary text-white",
  premium: "bg-secondary text-white",
  estandar: "bg-accent text-primary",
};

export function PartnersTable({ partners, onEdit, onRemove }: PartnersTableProps) {
  return (
    <AdminTable columns={Object.values(labels.columns)} minWidth="64rem">
      {partners.map((partner) => (
        <tr key={partner.id} className="transition-colors hover:bg-accent/30">
          <td className={adminCellClassName}>
            <p className="font-semibold text-primary">{partner.nombre}</p>
            <a
              href={`https://${partner.sitio}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-secondary hover:underline"
            >
              {partner.sitio}
            </a>
          </td>
          <td className={`${adminCellClassName} text-primary/80`}>
            {labels.categories[partner.categoria]}
          </td>
          <td className={adminCellClassName}>
            <span
              className={`rounded-full px-2.5 py-0.5 font-data text-[10px] uppercase tracking-widest ${tierClasses[partner.nivel]}`}
            >
              {labels.tiers[partner.nivel]}
            </span>
          </td>
          <td
            className={`${adminCellClassName} whitespace-nowrap font-data text-xs text-primary/70`}
          >
            {formatDate(partner.desde, ADMIN_LOCALE)}
          </td>
          <td className={`${adminCellClassName} text-primary/80`}>{partner.contacto}</td>
          <td className={`${adminCellClassName} font-data text-primary`}>
            {formatNumber(partner.clicsMes, ADMIN_LOCALE)}
          </td>
          <td className={adminCellClassName}>
            <StatusBadge
              tone={partner.activo ? "success" : "neutral"}
              label={partner.activo ? labels.active : labels.paused}
            />
          </td>
          <td className={adminCellClassName}>
            <div className="flex gap-1.5">
              <AdminButton variant="outline" size="sm" onClick={() => onEdit(partner)}>
                <PencilIcon className="h-3.5 w-3.5" />
                {adminUi.common.edit}
              </AdminButton>
              <AdminButton
                variant="danger"
                size="sm"
                onClick={() => onRemove(partner)}
                ariaLabel={`${adminUi.common.remove} ${partner.nombre}`}
              >
                <TrashIcon className="h-3.5 w-3.5" />
              </AdminButton>
            </div>
          </td>
        </tr>
      ))}
    </AdminTable>
  );
}
