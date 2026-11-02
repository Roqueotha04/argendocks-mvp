import { useCallback } from "react";
import { adminAccess } from "@/config/admin.access";
import { useIsClient } from "@/hooks/useIsClient";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export type AdminSession = {
  isReady: boolean;
  email: string | null;
  signIn: (email: string, password: string) => boolean;
  signOut: () => void;
};

export function useAdminSession(): AdminSession {
  const isReady = useIsClient();
  const [email, setEmail] = useLocalStorage<string | null>(adminAccess.sessionKey, null);

  const signIn = useCallback(
    (candidateEmail: string, password: string) => {
      const normalizedEmail = candidateEmail.trim().toLowerCase();
      const isValid = normalizedEmail === adminAccess.email && password === adminAccess.password;
      if (isValid) setEmail(normalizedEmail);
      return isValid;
    },
    [setEmail],
  );

  const signOut = useCallback(() => setEmail(null), [setEmail]);

  return { isReady, email, signIn, signOut };
}
