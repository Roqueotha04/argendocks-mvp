import { ui } from "@/config/i18n";
import { ADMIN_LOCALE } from "@/config/admin.ui";
import type { Administration, Cargo, PortKind } from "@/config/port.types";

export function cargoLabel(cargo: Cargo): string {
  return ui.ports.cargo[cargo][ADMIN_LOCALE];
}

export function kindLabel(kind: PortKind): string {
  return ui.ports.kind[kind][ADMIN_LOCALE];
}

export function administrationLabel(administration: Administration): string {
  return ui.ports.administration[administration][ADMIN_LOCALE];
}
