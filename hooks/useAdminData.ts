import { useContext } from "react";
import {
  AdminDataContext,
  type AdminDataContextValue,
} from "@/components/providers/AdminDataProvider";

export function useAdminData(): AdminDataContextValue {
  const context = useContext(AdminDataContext);
  if (context === null) {
    throw new Error("useAdminData must be used within an AdminDataProvider");
  }
  return context;
}
