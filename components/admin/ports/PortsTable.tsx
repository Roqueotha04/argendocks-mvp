import { ADMIN_LOCALE, adminUi } from "@/config/admin.ui";
import type { AdminPort, PublicationStatus } from "@/config/admin.types";
import { lastPortUpdate } from "@/lib/admin/admin-insights";
import { kindLabel } from "@/lib/admin/port-labels";
import { formatDate, formatNumber } from "@/lib/format";
import { AdminTable, adminCellClassName } from "@/components/admin/ui/AdminTable";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { PortThumbnail } from "@/components/admin/ports/PortThumbnail";
import { PencilIcon } from "@/components/ui/icons";

interface PortsTableProps {
  ports: AdminPort[];
  onEdit: (port: AdminPort) => void;
  onChangeStatus: (slug: string, status: PublicationStatus) => void;
}

const labels = adminUi.ports;

export function PortsTable({ ports, onEdit, onChangeStatus }: PortsTableProps) {
  const columns = Object.values(labels.columns);

  return (
    <AdminTable columns={columns} minWidth="62rem">
      {ports.map((port) => {
        const updatedOn = lastPortUpdate(port);
        const isPublished = port.estado === "publicado";
        return (
          <tr key={port.slug} className="transition-colors hover:bg-accent/30">
            <td className={adminCellClassName}>
              <div className="flex items-center gap-3">
                <PortThumbnail src={port.foto.src} alt={port.nombre} />
                <div className="min-w-0">
                  <p className="truncate font-semibold text-primary">{port.nombre}</p>
                  <p className="font-data text-[11px] tracking-widest text-secondary">
                    {port.unLocode}
                  </p>
                </div>
              </div>
            </td>
            <td className={`${adminCellClassName} text-primary/80`}>{port.provincia}</td>
            <td className={`${adminCellClassName} text-primary/80`}>{kindLabel(port.tipo)}</td>
            <td className={`${adminCellClassName} font-data text-primary`}>
              {port.terminales.length}
            </td>
            <td className={`${adminCellClassName} font-data text-primary`}>
              {formatNumber(port.visitas30d, ADMIN_LOCALE)}
            </td>
            <td
              className={`${adminCellClassName} whitespace-nowrap font-data text-xs text-primary/70`}
            >
              {updatedOn ? formatDate(updatedOn, ADMIN_LOCALE) : "—"}
            </td>
            <td className={adminCellClassName}>
              <StatusBadge
                tone={isPublished ? "success" : "warning"}
                label={labels.status[port.estado]}
              />
            </td>
            <td className={adminCellClassName}>
              <div className="flex gap-1.5">
                <AdminButton variant="outline" size="sm" onClick={() => onEdit(port)}>
                  <PencilIcon className="h-3.5 w-3.5" />
                  {adminUi.common.edit}
                </AdminButton>
                <AdminButton
                  variant={isPublished ? "ghost" : "signal"}
                  size="sm"
                  onClick={() => onChangeStatus(port.slug, isPublished ? "borrador" : "publicado")}
                >
                  {isPublished ? labels.unpublish : labels.publish}
                </AdminButton>
              </div>
            </td>
          </tr>
        );
      })}
    </AdminTable>
  );
}
