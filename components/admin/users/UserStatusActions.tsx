import { adminUi } from "@/config/admin.ui";
import type { UserStatus } from "@/config/admin.types";
import { AdminButton } from "@/components/admin/ui/AdminButton";

interface UserStatusActionsProps {
  status: UserStatus;
  onChange: (status: UserStatus) => void;
}

const labels = adminUi.users;

export function UserStatusActions({ status, onChange }: UserStatusActionsProps) {
  if (status === "pendiente") {
    return (
      <div className="flex gap-1.5">
        <AdminButton variant="signal" size="sm" onClick={() => onChange("activo")}>
          {labels.approve}
        </AdminButton>
        <AdminButton variant="danger" size="sm" onClick={() => onChange("suspendido")}>
          {labels.suspend}
        </AdminButton>
      </div>
    );
  }

  if (status === "suspendido") {
    return (
      <AdminButton variant="outline" size="sm" onClick={() => onChange("activo")}>
        {labels.reactivate}
      </AdminButton>
    );
  }

  return (
    <AdminButton variant="ghost" size="sm" onClick={() => onChange("suspendido")}>
      {labels.suspend}
    </AdminButton>
  );
}
