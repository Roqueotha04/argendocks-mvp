import type { AdminPort } from "@/config/admin.types";
import type { Terminal } from "@/config/port.types";
import { slugify } from "@/lib/slug";

export function createEmptyTerminal(): Terminal {
  return {
    nombre: "",
    administracion: "publico",
    atraqueMetros: null,
    caladoMetros: null,
    cargas: [],
    operativa: true,
    actualizadoEn: todayIso(),
    fuente: "",
  };
}

export function createEmptyPort(): AdminPort {
  return {
    slug: "",
    nombre: "",
    provincia: "",
    localidad: "",
    unLocode: "",
    tipo: "maritimo",
    descripcion: { es: "", en: "" },
    accesoNautico: { es: "", en: "" },
    coordenadas: { lat: -38, lng: -60 },
    foto: { src: "", credito: "" },
    terminales: [createEmptyTerminal()],
    estado: "borrador",
    visitas30d: 0,
  };
}

export function finalizePortDraft(
  draft: AdminPort,
  isNew: boolean,
  existingSlugs: string[],
): AdminPort {
  const updatedOn = todayIso();
  return {
    ...draft,
    slug: isNew ? uniqueSlug(slugify(draft.nombre), existingSlugs) : draft.slug,
    unLocode: draft.unLocode.toUpperCase(),
    terminales: draft.terminales.map((terminal) => ({ ...terminal, actualizadoEn: updatedOn })),
  };
}

export function parseOptionalNumber(value: string): number | null {
  return value.trim() === "" ? null : Number(value);
}

function uniqueSlug(base: string, existingSlugs: string[]): string {
  let candidate = base;
  let suffix = 2;
  while (existingSlugs.includes(candidate)) {
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
  return candidate;
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}
