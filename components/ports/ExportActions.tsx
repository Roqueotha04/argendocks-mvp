"use client";

import { useState } from "react";
import { ui } from "@/config/i18n";
import type { Puerto } from "@/config/port.types";
import { useLanguage } from "@/hooks/useLanguage";
import { buildPortSpreadsheet, downloadTextFile } from "@/lib/port-export";
import { CheckIcon, FileTextIcon, LinkIcon, TableIcon } from "@/components/ui/icons";

const COPIED_FEEDBACK_MS = 2000;

const actionClassName =
  "inline-flex h-10 items-center gap-2 rounded-full border border-line bg-white px-4 text-sm text-primary transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary";

export function ExportActions({ port }: { port: Puerto }) {
  const { t, locale } = useLanguage();
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  function downloadSpreadsheet() {
    downloadTextFile(`${port.slug}.csv`, buildPortSpreadsheet(port, locale), "text/csv;charset=utf-8");
  }

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
    setIsLinkCopied(true);
    window.setTimeout(() => setIsLinkCopied(false), COPIED_FEEDBACK_MS);
  }

  return (
    <div role="group" aria-label={t(ui.exportActions.title)} className="flex flex-wrap gap-2">
      <button type="button" onClick={() => window.print()} className={actionClassName}>
        <FileTextIcon className="h-4 w-4 text-secondary" />
        {t(ui.exportActions.pdf)}
      </button>
      <button type="button" onClick={downloadSpreadsheet} className={actionClassName}>
        <TableIcon className="h-4 w-4 text-secondary" />
        {t(ui.exportActions.excel)}
      </button>
      <button type="button" onClick={copyLink} className={actionClassName} aria-live="polite">
        {isLinkCopied ? (
          <CheckIcon className="h-4 w-4 text-secondary" />
        ) : (
          <LinkIcon className="h-4 w-4 text-secondary" />
        )}
        {t(isLinkCopied ? ui.exportActions.copied : ui.exportActions.share)}
      </button>
    </div>
  );
}
