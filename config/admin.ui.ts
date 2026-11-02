import type { Locale } from "./site.types";
import type {
  InquiryKind,
  PartnerCategory,
  PartnerTier,
  PublicationStatus,
  SuggestionStatus,
  UserPlan,
  UserSegment,
  UserStatus,
} from "./admin.types";

export type AdminIconName =
  "summary" | "analytics" | "ports" | "suggestions" | "partners" | "users" | "inquiries";

export type AdminBadgeSource = "suggestions" | "users" | "inquiries";

export type AdminNavLink = {
  label: string;
  href: string;
  icon: AdminIconName;
  badge?: AdminBadgeSource;
};

export type AdminNavGroup = {
  title: string;
  links: AdminNavLink[];
};

export const ADMIN_LOCALE: Locale = "es";

export const ADMIN_HOME_PATH = "/admin";
export const ADMIN_LOGIN_PATH = "/admin/login";

export const adminNav: AdminNavGroup[] = [
  {
    title: "Operación",
    links: [
      { label: "Resumen", href: "/admin", icon: "summary" },
      { label: "Analítica", href: "/admin/analitica", icon: "analytics" },
    ],
  },
  {
    title: "Contenido",
    links: [
      { label: "Puertos", href: "/admin/puertos", icon: "ports" },
      {
        label: "Sugerencias",
        href: "/admin/sugerencias",
        icon: "suggestions",
        badge: "suggestions",
      },
      { label: "Partners", href: "/admin/partners", icon: "partners" },
    ],
  },
  {
    title: "Comunidad",
    links: [
      { label: "Usuarios", href: "/admin/usuarios", icon: "users", badge: "users" },
      { label: "Consultas", href: "/admin/consultas", icon: "inquiries", badge: "inquiries" },
    ],
  },
];

export const adminUi = {
  meta: {
    title: "Panel de administración",
  },
  login: {
    eyebrow: "Panel ArgenDocks",
    title: "Ingresá al panel",
    subtitle: "La red portuaria, desde adentro",
    emailLabel: "Correo",
    passwordLabel: "Contraseña",
    submit: "Ingresar",
    invalidCredentials: "El correo o la contraseña no coinciden. Revisalos e intentá de nuevo.",
    backToSite: "Volver al sitio",
    checking: "Verificando acceso…",
  },
  shell: {
    badge: "Admin",
    role: "Administración",
    viewSite: "Ver sitio",
    signOut: "Cerrar sesión",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    greetings: {
      morning: "Buen día",
      afternoon: "Buenas tardes",
      evening: "Buenas noches",
    },
  },
  common: {
    cancel: "Cancelar",
    save: "Guardar cambios",
    close: "Cerrar",
    edit: "Editar",
    remove: "Eliminar",
    search: "Buscar",
    all: "Todas",
    allMasculine: "Todos",
    seeMore: "Ver {count} más",
    seeLess: "Ver menos",
    noResults: "No hay resultados con ese filtro.",
    visits: "visitas",
  },
  summary: {
    title: "Resumen",
    goToPorts: "Cargar puerto",
    stats: {
      visits: "Visitas · 30 días",
      visitsDelta: "{delta} vs. período anterior",
      users: "Usuarios registrados",
      usersPending: "{count} esperando aprobación",
      suggestions: "Sugerencias pendientes",
      suggestionsHint: "Datos enviados por la comunidad",
      ports: "Puertos publicados",
      portsDrafts: "{count} en borrador",
    },
    visitsChart: {
      title: "Visitas diarias",
      subtitle: "Últimos 30 días",
      peak: "Pico",
      average: "Promedio",
    },
    attention: {
      title: "Requiere atención",
      subtitle: "Lo que conviene revisar hoy",
      empty: "Todo al día. No hay nada pendiente de revisar.",
      categories: {
        suggestions: "Sugerencias",
        users: "Registros",
        inquiries: "Consultas",
        stale: "Fichas",
      },
      suggestion: "{author} sugiere cambiar {field} en {port}: {value}",
      user: "{name} ({company}) pidió acceso con plan {plan}",
      inquiry: "{name} de {company} escribió: {message}",
      stale: "{port} · {terminal} no se actualiza desde {date}",
      draft: "{port} sigue en borrador",
    },
    radar: {
      eyebrow: "Radar de la red",
      title: "Qué puertos se miran",
      subtitle: "Tocá un puerto para ver su tráfico",
      mapLabel: "Mapa de visitas por puerto",
      rank: "Puesto {rank} de {total}",
      share: "del tráfico de fichas",
      openRecord: "Ver ficha pública",
    },
    activity: {
      title: "Actividad reciente",
      viewAll: "Ver analítica",
    },
  },
  analytics: {
    title: "Analítica",
    subtitle: "Cómo llega y qué hace la gente en ArgenDocks",
    stats: {
      visits: "Visitas · 30 días",
      unique: "Visitantes únicos",
      avgTime: "Tiempo promedio",
      exports: "Fichas exportadas",
    },
    sources: "De dónde llegan",
    devices: "Desde qué dispositivo",
    searches: "Lo más buscado",
    searchesSubtitle: "Términos escritos en el buscador de puertos",
    exportsByFormat: "Exportaciones por formato",
    topPorts: "Fichas más vistas",
  },
  ports: {
    title: "Puertos",
    subtitle: "Fichas publicadas en el mapa y borradores en preparación",
    create: "Nuevo puerto",
    searchPlaceholder: "Nombre, provincia o UN/LOCODE",
    columns: {
      port: "Puerto",
      province: "Provincia",
      kind: "Tipo",
      terminals: "Terminales",
      visits: "Visitas 30 d",
      updated: "Actualizado",
      status: "Estado",
      actions: "Acciones",
    },
    publish: "Publicar",
    unpublish: "Pasar a borrador",
    noPhoto: "Sin foto",
    status: {
      publicado: "Publicado",
      borrador: "Borrador",
    } satisfies Record<PublicationStatus, string>,
  },
  portEditor: {
    createTitle: "Nuevo puerto",
    editTitle: "Editar ficha",
    sections: {
      identity: "Identificación",
      location: "Ubicación",
      content: "Contenido de la ficha",
      terminals: "Terminales",
    },
    name: "Nombre",
    unLocode: "UN/LOCODE",
    province: "Provincia",
    locality: "Localidad",
    kind: "Tipo",
    status: "Estado",
    latitude: "Latitud",
    longitude: "Longitud",
    photo: "Foto (ruta o URL)",
    photoCredit: "Crédito de la foto",
    descriptionEs: "Descripción (español)",
    descriptionEn: "Descripción (inglés)",
    accessEs: "Acceso náutico (español)",
    accessEn: "Acceso náutico (inglés)",
    addTerminal: "Agregar terminal",
    removeTerminal: "Quitar terminal",
    terminalName: "Nombre de la terminal",
    administration: "Administración",
    berth: "Atraque (m)",
    draft: "Calado (m)",
    source: "Fuente del dato",
    cargo: "Cargas",
    operational: "Operativa",
    noTerminals: "Todavía no hay terminales. Agregá al menos una para publicar la ficha.",
    create: "Crear puerto",
  },
  suggestions: {
    title: "Sugerencias",
    subtitle: "Correcciones que manda la comunidad portuaria, con su fuente",
    columns: {
      port: "Puerto",
      field: "Dato",
      change: "Cambio propuesto",
      source: "Fuente",
      author: "Enviada por",
      status: "Estado",
      actions: "Acciones",
    },
    wholePort: "Puerto en general",
    approve: "Aprobar",
    reject: "Rechazar",
    reopen: "Volver a pendiente",
    empty: "No hay sugerencias en este estado.",
    status: {
      pendiente: "Pendiente",
      aprobada: "Aprobada",
      rechazada: "Rechazada",
    } satisfies Record<SuggestionStatus, string>,
  },
  partners: {
    title: "Partners",
    subtitle: "Puertos, empresas e instituciones que acompañan la plataforma",
    columns: {
      partner: "Partner",
      category: "Categoría",
      tier: "Nivel",
      since: "Desde",
      contact: "Contacto",
      clicks: "Clics del mes",
      status: "Estado",
      actions: "Acciones",
    },
    create: "Nuevo partner",
    createTitle: "Nuevo partner",
    editTitle: "Editar partner",
    active: "Activo",
    paused: "Pausado",
    name: "Nombre",
    category: "Categoría",
    tier: "Nivel",
    website: "Sitio web",
    contactName: "Persona de contacto",
    sinceDate: "Fecha de alta",
    isActive: "Visible en el sitio",
    confirmRemove: "¿Eliminar a {name}? Se deja de mostrar en el sitio.",
    categories: {
      puerto: "Puerto o terminal",
      naviera: "Naviera",
      agencia: "Agencia marítima",
      institucional: "Institucional",
      sponsor: "Sponsor",
    } satisfies Record<PartnerCategory, string>,
    tiers: {
      fundador: "Fundador",
      premium: "Premium",
      estandar: "Estándar",
    } satisfies Record<PartnerTier, string>,
  },
  users: {
    title: "Usuarios",
    subtitle: "Cuentas registradas en la plataforma",
    searchPlaceholder: "Nombre, correo o empresa",
    columns: {
      user: "Usuario",
      company: "Empresa",
      segment: "Perfil",
      plan: "Plan",
      registered: "Alta",
      lastSeen: "Último ingreso",
      exports: "Exportaciones",
      status: "Estado",
      actions: "Acciones",
    },
    approve: "Aprobar",
    suspend: "Suspender",
    reactivate: "Reactivar",
    status: {
      activo: "Activo",
      pendiente: "Pendiente",
      suspendido: "Suspendido",
    } satisfies Record<UserStatus, string>,
    plans: {
      gratis: "Gratis",
      pro: "Pro",
    } satisfies Record<UserPlan, string>,
    segments: {
      puerto: "Puerto",
      naviera: "Naviera",
      exportador: "Exportador",
      organismo: "Organismo público",
      comunidad: "Comunidad portuaria",
      prensa: "Investigación y prensa",
    } satisfies Record<UserSegment, string>,
  },
  inquiries: {
    title: "Consultas",
    subtitle: "Mensajes que llegan desde el formulario de contacto",
    unread: "Sin leer",
    read: "Leídas",
    reply: "Responder por correo",
    empty: "No hay consultas en esta bandeja.",
    selectPrompt: "Elegí una consulta para leerla completa.",
    replySubject: "Re: tu consulta a ArgenDocks",
    kinds: {
      demo: "Pedido de demo",
      contacto: "Contacto",
      "sumar-puerto": "Sumar un puerto",
    } satisfies Record<InquiryKind, string>,
  },
  activityLog: {
    portCreated: "Se creó la ficha de {port}",
    portUpdated: "Se actualizó la ficha de {port}",
    portPublished: "Se publicó {port}",
    portUnpublished: "{port} pasó a borrador",
    suggestionApproved: "Se aprobó la sugerencia de {author} para {port}",
    suggestionRejected: "Se rechazó la sugerencia de {author} para {port}",
    suggestionReopened: "La sugerencia de {author} volvió a pendiente",
    partnerSaved: "Se guardó el partner {name}",
    partnerRemoved: "Se eliminó el partner {name}",
    userApproved: "Se aprobó la cuenta de {name}",
    userSuspended: "Se suspendió la cuenta de {name}",
    userReactivated: "Se reactivó la cuenta de {name}",
  },
};
