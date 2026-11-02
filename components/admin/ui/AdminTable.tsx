import type { ReactNode } from "react";

interface AdminTableProps {
  columns: string[];
  minWidth?: string;
  children: ReactNode;
}

export const adminCellClassName = "border-t border-line px-4 py-2.5 align-middle text-[13px]";

export function AdminTable({ columns, minWidth = "48rem", children }: AdminTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left" style={{ minWidth }}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                scope="col"
                className="whitespace-nowrap px-4 py-2.5 font-data text-[10px] font-medium uppercase tracking-widest text-primary/50"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
