import { adminUi } from "@/config/admin.ui";

export function AdminLoader() {
  return (
    <div
      role="status"
      className="flex min-h-dvh flex-col items-center justify-center gap-3 bg-background"
    >
      <span
        aria-hidden
        className="h-6 w-6 animate-spin rounded-full border-2 border-secondary/25 border-t-secondary motion-reduce:animate-none"
      />
      <p className="text-sm text-primary/70">{adminUi.login.checking}</p>
    </div>
  );
}
