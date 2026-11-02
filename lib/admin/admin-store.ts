import { adminUi } from "@/config/admin.ui";
import type {
  ActivityEntry,
  AdminData,
  AdminPort,
  Partner,
  PublicationStatus,
  SuggestionStatus,
  UserStatus,
} from "@/config/admin.types";
import { fillTemplate } from "@/lib/template";

export type AdminAction =
  | { type: "port/save"; port: AdminPort; isNew: boolean; at: string }
  | { type: "port/setStatus"; slug: string; status: PublicationStatus; at: string }
  | { type: "suggestion/setStatus"; id: string; status: SuggestionStatus; at: string }
  | { type: "partner/save"; partner: Partner; at: string }
  | { type: "partner/remove"; id: string; at: string }
  | { type: "user/setStatus"; id: string; status: UserStatus; at: string }
  | { type: "inquiry/markRead"; id: string };

const log = adminUi.activityLog;

const suggestionLogs: Record<SuggestionStatus, string> = {
  aprobada: log.suggestionApproved,
  rechazada: log.suggestionRejected,
  pendiente: log.suggestionReopened,
};

export function adminReducer(state: AdminData, action: AdminAction): AdminData {
  switch (action.type) {
    case "port/save": {
      const ports = action.isNew
        ? [action.port, ...state.ports]
        : state.ports.map((port) => (port.slug === action.port.slug ? action.port : port));
      const template = action.isNew ? log.portCreated : log.portUpdated;
      return withActivity(
        { ...state, ports },
        fillTemplate(template, { port: action.port.nombre }),
        action.at,
      );
    }
    case "port/setStatus": {
      const ports = state.ports.map((port) =>
        port.slug === action.slug ? { ...port, estado: action.status } : port,
      );
      const template = action.status === "publicado" ? log.portPublished : log.portUnpublished;
      return withActivity(
        { ...state, ports },
        fillTemplate(template, { port: portName(state, action.slug) }),
        action.at,
      );
    }
    case "suggestion/setStatus": {
      const suggestion = state.suggestions.find((item) => item.id === action.id);
      if (!suggestion) return state;
      const suggestions = state.suggestions.map((item) =>
        item.id === action.id ? { ...item, estado: action.status } : item,
      );
      const text = fillTemplate(suggestionLogs[action.status], {
        author: suggestion.autor,
        port: portName(state, suggestion.portSlug),
      });
      return withActivity({ ...state, suggestions }, text, action.at);
    }
    case "partner/save": {
      const exists = state.partners.some((partner) => partner.id === action.partner.id);
      const partners = exists
        ? state.partners.map((partner) =>
            partner.id === action.partner.id ? action.partner : partner,
          )
        : [...state.partners, action.partner];
      return withActivity(
        { ...state, partners },
        fillTemplate(log.partnerSaved, { name: action.partner.nombre }),
        action.at,
      );
    }
    case "partner/remove": {
      const removed = state.partners.find((partner) => partner.id === action.id);
      if (!removed) return state;
      const partners = state.partners.filter((partner) => partner.id !== action.id);
      return withActivity(
        { ...state, partners },
        fillTemplate(log.partnerRemoved, { name: removed.nombre }),
        action.at,
      );
    }
    case "user/setStatus": {
      const user = state.users.find((item) => item.id === action.id);
      if (!user) return state;
      const users = state.users.map((item) =>
        item.id === action.id ? { ...item, estado: action.status } : item,
      );
      return withActivity(
        { ...state, users },
        fillTemplate(userLogTemplate(user.estado, action.status), { name: user.nombre }),
        action.at,
      );
    }
    case "inquiry/markRead": {
      const inquiries = state.inquiries.map((inquiry) =>
        inquiry.id === action.id ? { ...inquiry, leida: true } : inquiry,
      );
      return { ...state, inquiries };
    }
  }
}

function withActivity(state: AdminData, texto: string, fecha: string): AdminData {
  const entry: ActivityEntry = { id: `act-${fecha}-${state.activity.length}`, texto, fecha };
  return { ...state, activity: [entry, ...state.activity] };
}

function userLogTemplate(previous: UserStatus, next: UserStatus): string {
  if (next === "suspendido") return log.userSuspended;
  return previous === "suspendido" ? log.userReactivated : log.userApproved;
}

function portName(state: AdminData, slug: string): string {
  return state.ports.find((port) => port.slug === slug)?.nombre ?? slug;
}
