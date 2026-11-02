import { ADMIN_LOCALE, adminUi } from "@/config/admin.ui";
import type { AdminUser, UserStatus } from "@/config/admin.types";
import { formatDate, formatMoment, formatNumber } from "@/lib/format";
import { AdminTable, adminCellClassName } from "@/components/admin/ui/AdminTable";
import { StatusBadge, type StatusTone } from "@/components/admin/ui/StatusBadge";
import { UserStatusActions } from "@/components/admin/users/UserStatusActions";

interface UsersTableProps {
  users: AdminUser[];
  onChangeStatus: (id: string, status: UserStatus) => void;
}

const labels = adminUi.users;

const statusTones: Record<UserStatus, StatusTone> = {
  activo: "success",
  pendiente: "warning",
  suspendido: "danger",
};

export function UsersTable({ users, onChangeStatus }: UsersTableProps) {
  return (
    <AdminTable columns={Object.values(labels.columns)} minWidth="68rem">
      {users.map((user) => (
        <tr key={user.id} className="transition-colors hover:bg-accent/30">
          <td className={adminCellClassName}>
            <p className="font-semibold text-primary">{user.nombre}</p>
            <p className="text-xs text-primary/65">{user.email}</p>
          </td>
          <td className={`${adminCellClassName} text-primary/80`}>{user.empresa}</td>
          <td className={`${adminCellClassName} text-primary/80`}>
            {labels.segments[user.segmento]}
          </td>
          <td className={adminCellClassName}>
            <span
              className={`rounded-full px-2.5 py-0.5 font-data text-[10px] uppercase tracking-widest ${
                user.plan === "pro" ? "bg-secondary text-white" : "bg-accent text-primary"
              }`}
            >
              {labels.plans[user.plan]}
            </span>
          </td>
          <td
            className={`${adminCellClassName} whitespace-nowrap font-data text-xs text-primary/70`}
          >
            {formatDate(user.registradoEn.slice(0, 10), ADMIN_LOCALE)}
          </td>
          <td
            className={`${adminCellClassName} whitespace-nowrap font-data text-xs text-primary/70`}
          >
            {formatMoment(user.ultimoIngreso, ADMIN_LOCALE)}
          </td>
          <td className={`${adminCellClassName} font-data text-primary`}>
            {formatNumber(user.exportaciones, ADMIN_LOCALE)}
          </td>
          <td className={adminCellClassName}>
            <StatusBadge tone={statusTones[user.estado]} label={labels.status[user.estado]} />
          </td>
          <td className={adminCellClassName}>
            <UserStatusActions
              status={user.estado}
              onChange={(status) => onChangeStatus(user.id, status)}
            />
          </td>
        </tr>
      ))}
    </AdminTable>
  );
}
