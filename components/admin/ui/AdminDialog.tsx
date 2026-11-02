"use client";

import { useEffect, useId, useRef, type FormEvent, type ReactNode } from "react";
import { adminUi } from "@/config/admin.ui";
import { CloseIcon } from "@/components/ui/icons";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { Eyebrow } from "@/components/admin/ui/Eyebrow";

interface AdminDialogProps {
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  eyebrow?: string;
  submitLabel: string;
  wide?: boolean;
  children: ReactNode;
}

export function AdminDialog({
  onClose,
  onSubmit,
  title,
  eyebrow,
  submitLabel,
  wide = false,
  children,
}: AdminDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => event.target === dialogRef.current && onClose()}
      className={`m-auto max-h-[min(92dvh,56rem)] w-[min(100%-1.5rem,var(--dialog-width))] rounded-2xl bg-white p-0 text-primary shadow-2xl backdrop:bg-deep/60 backdrop:backdrop-blur-sm ${
        wide ? "[--dialog-width:52rem]" : "[--dialog-width:34rem]"
      }`}
    >
      <form onSubmit={handleSubmit} className="flex max-h-[inherit] flex-col">
        <header className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
          <div>
            {eyebrow && <Eyebrow className="mb-2">{eyebrow}</Eyebrow>}
            <h2 id={titleId} className="font-heading text-xl font-semibold tracking-tight">
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={adminUi.common.close}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line hover:border-primary"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>
        <footer className="flex justify-end gap-2 border-t border-line bg-background px-5 py-3">
          <AdminButton variant="ghost" onClick={onClose}>
            {adminUi.common.cancel}
          </AdminButton>
          <AdminButton type="submit">{submitLabel}</AdminButton>
        </footer>
      </form>
    </dialog>
  );
}
