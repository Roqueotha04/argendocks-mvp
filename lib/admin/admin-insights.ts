import { ADMIN_LOCALE, adminUi } from "@/config/admin.ui";
import type {
  AdminData,
  AdminPort,
  AdminUser,
  Inquiry,
  SiteMetrics,
  Suggestion,
} from "@/config/admin.types";
import type { AdminBadgeSource } from "@/config/admin.ui";
import { formatDate } from "@/lib/format";
import { fillTemplate } from "@/lib/template";

const STALE_AFTER_DAYS = 120;
const DAY_IN_MS = 86_400_000;
const PREVIEW_LENGTH = 90;

export type AttentionCategory = "suggestions" | "users" | "inquiries" | "stale";

export type AttentionItem = {
  id: string;
  category: AttentionCategory;
  text: string;
  date: string;
  href: string;
};

export type VisitsSummary = {
  total: number;
  average: number;
  peak: number;
  deltaRatio: number;
};

const texts = adminUi.summary.attention;

export function countPending(data: AdminData): Record<AdminBadgeSource, number> {
  return {
    suggestions: data.suggestions.filter((suggestion) => suggestion.estado === "pendiente").length,
    users: data.users.filter((user) => user.estado === "pendiente").length,
    inquiries: data.inquiries.filter((inquiry) => !inquiry.leida).length,
  };
}

export function listAttentionItems(data: AdminData, now: Date): AttentionItem[] {
  const items = [
    ...data.suggestions
      .filter((suggestion) => suggestion.estado === "pendiente")
      .map((suggestion) => suggestionItem(suggestion, data.ports)),
    ...data.users.filter((user) => user.estado === "pendiente").map(userItem),
    ...data.inquiries.filter((inquiry) => !inquiry.leida).map(inquiryItem),
    ...staleItems(data.ports, now),
  ];
  return items.sort((a, b) => b.date.localeCompare(a.date));
}

export function summarizeVisits(metrics: SiteMetrics): VisitsSummary {
  const values = metrics.visitasDiarias.map((day) => day.visitas);
  const total = values.reduce((sum, value) => sum + value, 0);
  return {
    total,
    average: Math.round(total / values.length),
    peak: Math.max(...values),
    deltaRatio: (total - metrics.visitasPeriodoAnterior) / metrics.visitasPeriodoAnterior,
  };
}

export function rankPublishedPorts(ports: AdminPort[]): AdminPort[] {
  return ports
    .filter((port) => port.estado === "publicado")
    .sort((a, b) => b.visitas30d - a.visitas30d);
}

export function sumValues(values: { valor: number }[]): number {
  return values.reduce((sum, item) => sum + item.valor, 0);
}

export function lastPortUpdate(port: AdminPort): string | null {
  const dates = port.terminales.map((terminal) => terminal.actualizadoEn).sort();
  return dates.at(-1) ?? null;
}

export function greetingFor(date: Date): string {
  const hour = date.getHours();
  const { greetings } = adminUi.shell;
  if (hour < 13) return greetings.morning;
  if (hour < 20) return greetings.afternoon;
  return greetings.evening;
}

function suggestionItem(suggestion: Suggestion, ports: AdminPort[]): AttentionItem {
  const port = ports.find((candidate) => candidate.slug === suggestion.portSlug);
  return {
    id: suggestion.id,
    category: "suggestions",
    text: fillTemplate(texts.suggestion, {
      author: suggestion.autor,
      field: suggestion.campo.toLowerCase(),
      port: suggestion.terminal ?? port?.nombre ?? suggestion.portSlug,
      value: suggestion.valorSugerido,
    }),
    date: suggestion.creadaEn,
    href: "/admin/sugerencias",
  };
}

function userItem(user: AdminUser): AttentionItem {
  return {
    id: user.id,
    category: "users",
    text: fillTemplate(texts.user, {
      name: user.nombre,
      company: user.empresa,
      plan: adminUi.users.plans[user.plan],
    }),
    date: user.registradoEn,
    href: "/admin/usuarios",
  };
}

function inquiryItem(inquiry: Inquiry): AttentionItem {
  return {
    id: inquiry.id,
    category: "inquiries",
    text: fillTemplate(texts.inquiry, {
      name: inquiry.nombre,
      company: inquiry.empresa,
      message: truncate(inquiry.mensaje, PREVIEW_LENGTH),
    }),
    date: inquiry.recibidaEn,
    href: "/admin/consultas",
  };
}

function staleItems(ports: AdminPort[], now: Date): AttentionItem[] {
  const threshold = new Date(now.getTime() - STALE_AFTER_DAYS * DAY_IN_MS)
    .toISOString()
    .slice(0, 10);

  return ports.flatMap((port) => {
    if (port.estado === "borrador") {
      return [
        {
          id: `draft-${port.slug}`,
          category: "stale" as const,
          text: fillTemplate(texts.draft, { port: port.nombre }),
          date: lastPortUpdate(port) ?? "",
          href: "/admin/puertos",
        },
      ];
    }
    return port.terminales
      .filter((terminal) => terminal.actualizadoEn < threshold)
      .map((terminal) => ({
        id: `stale-${port.slug}-${terminal.nombre}`,
        category: "stale" as const,
        text: fillTemplate(texts.stale, {
          port: port.nombre,
          terminal: terminal.nombre,
          date: formatDate(terminal.actualizadoEn, ADMIN_LOCALE),
        }),
        date: terminal.actualizadoEn,
        href: "/admin/puertos",
      }));
  });
}

function truncate(value: string, maxLength: number): string {
  return value.length > maxLength ? `${value.slice(0, maxLength).trimEnd()}…` : value;
}
