import { adminUi } from "@/config/admin.ui";
import type { SuggestionStatus } from "@/config/admin.types";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { CheckIcon, CloseIcon } from "@/components/ui/icons";

interface SuggestionActionsProps {
  status: SuggestionStatus;
  onChange: (status: SuggestionStatus) => void;
}

const labels = adminUi.suggestions;

export function SuggestionActions({ status, onChange }: SuggestionActionsProps) {
  if (status !== "pendiente") {
    return (
      <AdminButton variant="ghost" size="sm" onClick={() => onChange("pendiente")}>
        {labels.reopen}
      </AdminButton>
    );
  }

  return (
    <div className="flex gap-1.5">
      <AdminButton variant="signal" size="sm" onClick={() => onChange("aprobada")}>
        <CheckIcon className="h-3.5 w-3.5" />
        {labels.approve}
      </AdminButton>
      <AdminButton variant="danger" size="sm" onClick={() => onChange("rechazada")}>
        <CloseIcon className="h-3.5 w-3.5" />
        {labels.reject}
      </AdminButton>
    </div>
  );
}
