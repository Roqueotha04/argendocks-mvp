import { ports } from "@/config/ports";
import type { Cargo, PortKind, Puerto } from "@/config/port.types";
import { distanceInKm } from "@/lib/geo";

export type PortFilters = {
  query: string;
  province: string | null;
  kind: PortKind | null;
  cargos: Cargo[];
};

export const emptyPortFilters: PortFilters = {
  query: "",
  province: null,
  kind: null,
  cargos: [],
};

export type PortSummary = {
  cargos: Cargo[];
  maxDraft: number | null;
  totalBerth: number | null;
  lastUpdate: string;
  operationalTerminals: number;
};

export function findPortBySlug(slug: string): Puerto | undefined {
  return ports.find((port) => port.slug === slug);
}

export function listProvinces(): string[] {
  return [...new Set(ports.map((port) => port.provincia))].sort((a, b) =>
    a.localeCompare(b, "es"),
  );
}

export function listCargos(): Cargo[] {
  return [...new Set(ports.flatMap(portCargos))];
}

export function portCargos(port: Puerto): Cargo[] {
  return [...new Set(port.terminales.flatMap((terminal) => terminal.cargas))];
}

export function summarizePort(port: Puerto): PortSummary {
  const drafts = port.terminales.map((terminal) => terminal.caladoMetros).filter(isNumber);
  const berths = port.terminales.map((terminal) => terminal.atraqueMetros).filter(isNumber);
  const updates = port.terminales.map((terminal) => terminal.actualizadoEn).sort();

  return {
    cargos: portCargos(port),
    maxDraft: drafts.length > 0 ? Math.max(...drafts) : null,
    totalBerth: berths.length > 0 ? berths.reduce((sum, berth) => sum + berth, 0) : null,
    lastUpdate: updates[updates.length - 1],
    operationalTerminals: port.terminales.filter((terminal) => terminal.operativa).length,
  };
}

export function filterPorts(filters: PortFilters): Puerto[] {
  const query = normalize(filters.query);

  return ports.filter((port) => {
    const matchesQuery =
      query === "" ||
      [port.nombre, port.localidad, port.provincia, port.unLocode].some((field) =>
        normalize(field).includes(query),
      );
    const matchesProvince = filters.province === null || port.provincia === filters.province;
    const matchesKind = filters.kind === null || port.tipo === filters.kind;
    const cargos = portCargos(port);
    const matchesCargos = filters.cargos.every((cargo) => cargos.includes(cargo));

    return matchesQuery && matchesProvince && matchesKind && matchesCargos;
  });
}

export function findRelatedPorts(port: Puerto, limit = 3): Puerto[] {
  const cargos = portCargos(port);

  return ports
    .filter((candidate) => candidate.slug !== port.slug)
    .map((candidate) => {
      const sharedCargos = portCargos(candidate).filter((cargo) => cargos.includes(cargo)).length;
      const sameProvince = candidate.provincia === port.provincia ? 2 : 0;
      const proximity = 1000 / (distanceInKm(port.coordenadas, candidate.coordenadas) + 100);
      return { candidate, score: sharedCargos + sameProvince + proximity };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

function isNumber(value: number | null): value is number {
  return value !== null;
}

export type ProvinceGroup = { province: string; ports: Puerto[] };

export function groupPortsByProvince(): ProvinceGroup[] {
  return listProvinces().map((province) => ({
    province,
    ports: ports.filter((port) => port.provincia === province),
  }));
}

export function hasActiveFilters(filters: PortFilters): boolean {
  return (
    filters.query !== "" || filters.province !== null || filters.kind !== null || filters.cargos.length > 0
  );
}
