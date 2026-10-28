import type { Localized } from "./site.types";

export type Cargo =
  | "contenedores"
  | "granos"
  | "carga-general"
  | "pesca"
  | "combustibles"
  | "cruceros"
  | "minerales";

export type PortKind = "maritimo" | "fluvial";

export type Administration = "publico" | "privado";

export type Terminal = {
  nombre: string;
  administracion: Administration;
  atraqueMetros: number | null;
  caladoMetros: number | null;
  cargas: Cargo[];
  operativa: boolean;
  actualizadoEn: string;
  fuente: string;
};

export type PortPhoto = {
  src: string;
  credito: string;
};

export type Coordinates = { lat: number; lng: number };

export type Puerto = {
  slug: string;
  nombre: string;
  provincia: string;
  localidad: string;
  unLocode: string;
  tipo: PortKind;
  descripcion: Localized;
  accesoNautico: Localized;
  coordenadas: Coordinates;
  foto: PortPhoto;
  terminales: Terminal[];
};
