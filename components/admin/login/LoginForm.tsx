"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ADMIN_HOME_PATH, adminUi } from "@/config/admin.ui";
import { useAdminSession } from "@/hooks/useAdminSession";
import { Field, fieldInputClassName } from "@/components/ui/Field";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { ArrowRightIcon } from "@/components/ui/icons";

const labels = adminUi.login;

export function LoginForm() {
  const router = useRouter();
  const { isReady, email: sessionEmail, signIn } = useAdminSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (isReady && sessionEmail !== null) router.replace(ADMIN_HOME_PATH);
  }, [isReady, sessionEmail, router]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setHasError(!signIn(email, password));
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto -mt-16 w-full max-w-md rounded-[1.75rem] bg-white p-6 shadow-[0_18px_40px_-24px_rgba(19,48,90,0.45)] md:p-7"
    >
      <div className="flex flex-col gap-4">
        <Field label={labels.emailLabel}>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="username"
            required
            className={fieldInputClassName}
          />
        </Field>
        <Field label={labels.passwordLabel}>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
            className={fieldInputClassName}
          />
        </Field>
      </div>

      {hasError && (
        <p role="alert" className="mt-4 rounded-xl bg-danger/10 px-3 py-2 text-sm text-danger">
          {labels.invalidCredentials}
        </p>
      )}

      <AdminButton type="submit" className="mt-6 w-full">
        {labels.submit}
        <ArrowRightIcon className="h-4 w-4" />
      </AdminButton>
    </form>
  );
}
