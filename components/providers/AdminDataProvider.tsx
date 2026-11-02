"use client";

import { createContext, useMemo, useReducer, type ReactNode } from "react";
import { adminMockData } from "@/config/admin.mock";
import type {
  AdminData,
  AdminPort,
  Partner,
  PublicationStatus,
  SuggestionStatus,
  UserStatus,
} from "@/config/admin.types";
import { adminReducer } from "@/lib/admin/admin-store";

export interface AdminDataContextValue {
  data: AdminData;
  savePort: (port: AdminPort, isNew: boolean) => void;
  setPortStatus: (slug: string, status: PublicationStatus) => void;
  setSuggestionStatus: (id: string, status: SuggestionStatus) => void;
  savePartner: (partner: Partner) => void;
  removePartner: (id: string) => void;
  setUserStatus: (id: string, status: UserStatus) => void;
  markInquiryRead: (id: string) => void;
}

export const AdminDataContext = createContext<AdminDataContextValue | null>(null);

function now(): string {
  return new Date().toISOString();
}

export function AdminDataProvider({ children }: { children: ReactNode }) {
  const [data, dispatch] = useReducer(adminReducer, adminMockData);

  const value = useMemo<AdminDataContextValue>(
    () => ({
      data,
      savePort: (port, isNew) => dispatch({ type: "port/save", port, isNew, at: now() }),
      setPortStatus: (slug, status) =>
        dispatch({ type: "port/setStatus", slug, status, at: now() }),
      setSuggestionStatus: (id, status) =>
        dispatch({ type: "suggestion/setStatus", id, status, at: now() }),
      savePartner: (partner) => dispatch({ type: "partner/save", partner, at: now() }),
      removePartner: (id) => dispatch({ type: "partner/remove", id, at: now() }),
      setUserStatus: (id, status) => dispatch({ type: "user/setStatus", id, status, at: now() }),
      markInquiryRead: (id) => dispatch({ type: "inquiry/markRead", id }),
    }),
    [data],
  );

  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>;
}
