import { ui } from "@/config/i18n";
import type { Puerto } from "@/config/port.types";
import type { Locale } from "@/config/site.types";
import { formatCoordinates } from "@/lib/format";

const CSV_SEPARATOR = ";";
const UTF8_BOM = String.fromCharCode(0xfeff);

export function buildPortSpreadsheet(port: Puerto, locale: Locale): string {
  const labels = ui.portDetail;
  const header = [
    labels.terminalsTitle,
    labels.status,
    labels.administration,
    labels.berth,
    labels.draft,
    labels.cargo,
    labels.updated,
    labels.source,
  ].map((label) => label[locale]);

  const overviewRows = [
    [port.nombre],
    [labels.province[locale], port.provincia],
    [labels.locality[locale], port.localidad],
    [labels.unLocode[locale], port.unLocode],
    [labels.kind[locale], ui.ports.kind[port.tipo][locale]],
    [labels.nauticalAccess[locale], port.accesoNautico[locale]],
    [labels.coordinates[locale], formatCoordinates(port.coordenadas)],
    [],
  ];

  const terminalRows = port.terminales.map((terminal) => [
    terminal.nombre,
    (terminal.operativa ? labels.operational : labels.notOperational)[locale],
    ui.ports.administration[terminal.administracion][locale],
    formatNumber(terminal.atraqueMetros, locale),
    formatNumber(terminal.caladoMetros, locale),
    terminal.cargas.map((cargo) => ui.ports.cargo[cargo][locale]).join(", "),
    terminal.actualizadoEn,
    terminal.fuente,
  ]);

  const rows = [...overviewRows, header, ...terminalRows];
  return UTF8_BOM + rows.map((row) => row.map(escapeCell).join(CSV_SEPARATOR)).join("\r\n");
}

export function downloadTextFile(fileName: string, content: string, mimeType: string): void {
  const url = URL.createObjectURL(new Blob([content], { type: mimeType }));
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

function formatNumber(value: number | null, locale: Locale): string {
  if (value === null) return ui.portDetail.noData[locale];
  return locale === "es" ? String(value).replace(".", ",") : String(value);
}

function escapeCell(value: string): string {
  return /[";\r\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}
