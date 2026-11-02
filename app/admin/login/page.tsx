import { LoginIntro } from "@/components/admin/login/LoginIntro";
import { LoginForm } from "@/components/admin/login/LoginForm";

export default function AdminLoginPage() {
  return (
    <main className="min-h-dvh bg-background pb-16">
      <LoginIntro />
      <div className="px-4">
        <LoginForm />
      </div>
    </main>
  );
}
