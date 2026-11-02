import type { Puerto } from "./port.types";

export type PublicationStatus = "publicado" | "borrador";

export type AdminPort = Puerto & {
  estado: PublicationStatus;
  visitas30d: number;
};

export type SuggestionStatus = "pendiente" | "aprobada" | "rechazada";

export type Suggestion = {
  id: string;
  portSlug: string;
  terminal: string | null;
  campo: string;
  valorActual: string;
  valorSugerido: string;
  fuente: string;
  autor: string;
  email: string;
  creadaEn: string;
  estado: SuggestionStatus;
};

export type PartnerCategory = "puerto" | "naviera" | "agencia" | "institucional" | "sponsor";

export type PartnerTier = "fundador" | "premium" | "estandar";

export type Partner = {
  id: string;
  nombre: string;
  categoria: PartnerCategory;
  nivel: PartnerTier;
  activo: boolean;
  desde: string;
  sitio: string;
  contacto: string;
  clicsMes: number;
};

export type UserSegment =
  "puerto" | "naviera" | "exportador" | "organismo" | "comunidad" | "prensa";

export type UserStatus = "activo" | "pendiente" | "suspendido";

export type UserPlan = "gratis" | "pro";

export type AdminUser = {
  id: string;
  nombre: string;
  email: string;
  empresa: string;
  segmento: UserSegment;
  plan: UserPlan;
  estado: UserStatus;
  registradoEn: string;
  ultimoIngreso: string;
  exportaciones: number;
};

export type InquiryKind = "demo" | "contacto" | "sumar-puerto";

export type Inquiry = {
  id: string;
  nombre: string;
  email: string;
  empresa: string;
  tipo: InquiryKind;
  mensaje: string;
  recibidaEn: string;
  leida: boolean;
};

export type ActivityEntry = {
  id: string;
  texto: string;
  fecha: string;
};

export type DailyVisits = {
  fecha: string;
  visitas: number;
};

export type RankedValue = {
  etiqueta: string;
  valor: number;
};

export type SiteMetrics = {
  visitasDiarias: DailyVisits[];
  visitasPeriodoAnterior: number;
  visitantesUnicos30d: number;
  tiempoPromedioSegundos: number;
  fuentesDeTrafico: RankedValue[];
  dispositivos: RankedValue[];
  busquedas: RankedValue[];
  exportaciones: RankedValue[];
};

export type AdminData = {
  ports: AdminPort[];
  suggestions: Suggestion[];
  partners: Partner[];
  users: AdminUser[];
  inquiries: Inquiry[];
  activity: ActivityEntry[];
  metrics: SiteMetrics;
};
