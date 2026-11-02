import { ADMIN_LOCALE, adminUi } from "@/config/admin.ui";
import type { Suggestion, SuggestionStatus } from "@/config/admin.types";
import { formatMoment } from "@/lib/format";
import { AdminTable, adminCellClassName } from "@/components/admin/ui/AdminTable";
import { StatusBadge, type StatusTone } from "@/components/admin/ui/StatusBadge";
import { SuggestionActions } from "@/components/admin/suggestions/SuggestionActions";
import { ArrowRightIcon } from "@/components/ui/icons";

interface SuggestionsTableProps {
  suggestions: Suggestion[];
  portNames: Map<string, string>;
  onChangeStatus: (id: string, status: SuggestionStatus) => void;
}

const labels = adminUi.suggestions;

const statusTones: Record<SuggestionStatus, StatusTone> = {
  pendiente: "warning",
  aprobada: "success",
  rechazada: "danger",
};

export function SuggestionsTable({
  suggestions,
  portNames,
  onChangeStatus,
}: SuggestionsTableProps) {
  return (
    <AdminTable columns={Object.values(labels.columns)} minWidth="72rem">
      {suggestions.map((suggestion) => (
        <tr key={suggestion.id} className="transition-colors hover:bg-accent/30">
          <td className={adminCellClassName}>
            <p className="font-semibold text-primary">
              {portNames.get(suggestion.portSlug) ?? suggestion.portSlug}
            </p>
            <p className="text-xs text-primary/65">{suggestion.terminal ?? labels.wholePort}</p>
          </td>
          <td className={`${adminCellClassName} whitespace-nowrap text-primary`}>
            {suggestion.campo}
          </td>
          <td className={adminCellClassName}>
            <div className="flex items-center gap-2">
              <span className="text-primary/60 line-through decoration-danger/50">
                {suggestion.valorActual}
              </span>
              <ArrowRightIcon className="h-3.5 w-3.5 shrink-0 text-secondary" />
              <span className="rounded-full bg-accent px-2.5 py-0.5 font-semibold text-primary">
                {suggestion.valorSugerido}
              </span>
            </div>
          </td>
          <td className={`${adminCellClassName} max-w-[14rem] text-xs text-primary/75`}>
            {suggestion.fuente}
          </td>
          <td className={adminCellClassName}>
            <p className="text-primary">{suggestion.autor}</p>
            <p className="font-data text-[10px] uppercase tracking-widest text-primary/50">
              {formatMoment(suggestion.creadaEn, ADMIN_LOCALE)}
            </p>
          </td>
          <td className={adminCellClassName}>
            <StatusBadge
              tone={statusTones[suggestion.estado]}
              label={labels.status[suggestion.estado]}
            />
          </td>
          <td className={adminCellClassName}>
            <SuggestionActions
              status={suggestion.estado}
              onChange={(status) => onChangeStatus(suggestion.id, status)}
            />
          </td>
        </tr>
      ))}
    </AdminTable>
  );
}
