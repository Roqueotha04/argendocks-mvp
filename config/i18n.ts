import type { Localized, SectionId } from "./site.types";
import type { Administration, Cargo, PortKind } from "./port.types";

interface UiStrings {
  nav: Record<SectionId, Localized>;
  portsPage: Localized;
  languageToggle: {
    label: Localized;
  };
  menu: {
    open: Localized;
    close: Localized;
  };
  whatsapp: {
    cta: Localized;
    aria: Localized;
  };
  contact: {
    phone: Localized;
    email: Localized;
    address: Localized;
    hours: Localized;
    nameLabel: Localized;
    emailLabel: Localized;
    companyLabel: Localized;
    messageLabel: Localized;
    messagePlaceholder: Localized;
    submit: Localized;
    or: Localized;
  };
  founder: {
    previous: Localized;
    next: Localized;
  };
  ports: {
    cargo: Record<Cargo, Localized>;
    kind: Record<PortKind, Localized>;
    administration: Record<Administration, Localized>;
  };
  explorer: {
    eyebrow: Localized;
    title: Localized;
    subtitle: Localized;
    searchLabel: Localized;
    searchPlaceholder: Localized;
    provinceLabel: Localized;
    allProvinces: Localized;
    kindLabel: Localized;
    allKinds: Localized;
    cargoLabel: Localized;
    clearFilters: Localized;
    results: Localized;
    emptyTitle: Localized;
    emptyBody: Localized;
    terminals: Localized;
    openRecord: Localized;
    mapLabel: Localized;
  };
  portDetail: {
    back: Localized;
    overview: Localized;
    province: Localized;
    locality: Localized;
    unLocode: Localized;
    kind: Localized;
    nauticalAccess: Localized;
    coordinates: Localized;
    terminalsTitle: Localized;
    terminalsSubtitle: Localized;
    berth: Localized;
    draft: Localized;
    cargo: Localized;
    status: Localized;
    administration: Localized;
    operational: Localized;
    notOperational: Localized;
    noData: Localized;
    updated: Localized;
    source: Localized;
    maxDraft: Localized;
    totalBerth: Localized;
    lastUpdate: Localized;
    relatedTitle: Localized;
    relatedSubtitle: Localized;
    locationTitle: Localized;
  };
  exportActions: {
    title: Localized;
    pdf: Localized;
    excel: Localized;
    share: Localized;
    copied: Localized;
  };
  suggestion: {
    eyebrow: Localized;
    title: Localized;
    subtitle: Localized;
    terminalLabel: Localized;
    wholePort: Localized;
    fieldLabel: Localized;
    fields: Localized[];
    valueLabel: Localized;
    valuePlaceholder: Localized;
    sourceLabel: Localized;
    sourcePlaceholder: Localized;
    nameLabel: Localized;
    emailLabel: Localized;
    submit: Localized;
    sentTitle: Localized;
    sentBody: Localized;
    sendAnother: Localized;
    mailSubject: Localized;
  };
  footer: {
    rights: Localized;
    sections: Localized;
    contact: Localized;
    tagline: Localized;
    designedBy: Localized;
  };
}

export const ui: UiStrings = {
  nav: {
    hero: { es: "Inicio", en: "Home" },
    platform: { es: "Plataforma", en: "Platform" },
    ports: { es: "Puertos", en: "Ports" },
    offerings: { es: "Consultoría", en: "Consulting" },
    about: { es: "Quiénes somos", en: "About" },
    contact: { es: "Contacto", en: "Contact" },
    testimonials: { es: "Testimonios", en: "Testimonials" },
    gallery: { es: "Galería", en: "Gallery" },
    faq: { es: "Preguntas frecuentes", en: "FAQ" },
  },
  portsPage: { es: "Puertos argentinos", en: "Argentine ports" },
  languageToggle: {
    label: { es: "Cambiar idioma", en: "Switch language" },
  },
  menu: {
    open: { es: "Abrir menú", en: "Open menu" },
    close: { es: "Cerrar menú", en: "Close menu" },
  },
  whatsapp: {
    cta: { es: "Escribinos por WhatsApp", en: "Message us on WhatsApp" },
    aria: { es: "Abrir chat de WhatsApp", en: "Open WhatsApp chat" },
  },
  contact: {
    phone: { es: "Teléfono", en: "Phone" },
    email: { es: "Email", en: "Email" },
    address: { es: "Oficina", en: "Office" },
    hours: { es: "Horario", en: "Hours" },
    nameLabel: { es: "Nombre y apellido", en: "Full name" },
    emailLabel: { es: "Correo", en: "Email" },
    companyLabel: { es: "Empresa o puerto", en: "Company or port" },
    messageLabel: { es: "Mensaje", en: "Message" },
    messagePlaceholder: {
      es: "Contanos en qué podemos ayudarte",
      en: "Tell us how we can help",
    },
    submit: { es: "Enviar por WhatsApp", en: "Send via WhatsApp" },
    or: { es: "o escribinos directo", en: "or message us directly" },
  },
  founder: {
    previous: { es: "Capítulo anterior", en: "Previous chapter" },
    next: { es: "Capítulo siguiente", en: "Next chapter" },
  },
  ports: {
    cargo: {
      contenedores: { es: "Contenedores", en: "Containers" },
      granos: { es: "Granos", en: "Grain" },
      "carga-general": { es: "Carga general", en: "General cargo" },
      pesca: { es: "Pesca", en: "Fishing" },
      combustibles: { es: "Combustibles", en: "Fuel" },
      cruceros: { es: "Cruceros", en: "Cruises" },
      minerales: { es: "Minerales", en: "Minerals" },
    },
    kind: {
      maritimo: { es: "Marítimo", en: "Sea port" },
      fluvial: { es: "Fluvial", en: "River port" },
    },
    administration: {
      publico: { es: "Pública", en: "Public" },
      privado: { es: "Privada", en: "Private" },
    },
  },
  explorer: {
    eyebrow: { es: "Mapa de puertos", en: "Port map" },
    title: { es: "Puertos argentinos", en: "Argentine ports" },
    subtitle: {
      es: "Elegí un puerto en el mapa o filtrá la lista para abrir su ficha.",
      en: "Pick a port on the map or filter the list to open its record.",
    },
    searchLabel: { es: "Buscar", en: "Search" },
    searchPlaceholder: {
      es: "Puerto, ciudad o UN/LOCODE",
      en: "Port, city or UN/LOCODE",
    },
    provinceLabel: { es: "Provincia", en: "Province" },
    allProvinces: { es: "Todas las provincias", en: "All provinces" },
    kindLabel: { es: "Tipo", en: "Type" },
    allKinds: { es: "Todos", en: "All" },
    cargoLabel: { es: "Cargas", en: "Cargo" },
    clearFilters: { es: "Limpiar filtros", en: "Clear filters" },
    results: { es: "puertos", en: "ports" },
    emptyTitle: {
      es: "Ningún puerto coincide con esos filtros",
      en: "No port matches those filters",
    },
    emptyBody: {
      es: "Probá con otra provincia o quitá alguna carga.",
      en: "Try another province or remove a cargo type.",
    },
    terminals: { es: "terminales", en: "terminals" },
    openRecord: { es: "Abrir ficha", en: "Open record" },
    mapLabel: {
      es: "Mapa de Argentina con la ubicación de cada puerto",
      en: "Map of Argentina showing each port's location",
    },
  },
  portDetail: {
    back: { es: "Todos los puertos", en: "All ports" },
    overview: { es: "Información general", en: "Overview" },
    province: { es: "Provincia", en: "Province" },
    locality: { es: "Localidad", en: "Town" },
    unLocode: { es: "UN/LOCODE", en: "UN/LOCODE" },
    kind: { es: "Tipo", en: "Type" },
    nauticalAccess: { es: "Acceso náutico", en: "Nautical access" },
    coordinates: { es: "Coordenadas", en: "Coordinates" },
    terminalsTitle: { es: "Terminales", en: "Terminals" },
    terminalsSubtitle: {
      es: "Cada dato muestra cuándo se actualizó y de dónde salió.",
      en: "Every figure shows when it was updated and where it came from.",
    },
    berth: { es: "Atraque", en: "Berth" },
    draft: { es: "Calado", en: "Draft" },
    cargo: { es: "Cargas", en: "Cargo" },
    status: { es: "Estado", en: "Status" },
    administration: { es: "Administración", en: "Operator" },
    operational: { es: "Operativa", en: "Operational" },
    notOperational: { es: "Sin operación", en: "Not operating" },
    noData: { es: "Sin datos", en: "No data" },
    updated: { es: "Actualizado", en: "Updated" },
    source: { es: "Fuente", en: "Source" },
    maxDraft: { es: "Calado máximo", en: "Max draft" },
    totalBerth: { es: "Frente de atraque", en: "Total berth" },
    lastUpdate: { es: "Última actualización", en: "Last update" },
    relatedTitle: { es: "Puertos relacionados", en: "Related ports" },
    relatedSubtitle: {
      es: "Cercanos o con cargas en común.",
      en: "Nearby or handling similar cargo.",
    },
    locationTitle: { es: "Ubicación", en: "Location" },
  },
  exportActions: {
    title: { es: "Exportar ficha", en: "Export record" },
    pdf: { es: "PDF", en: "PDF" },
    excel: { es: "Excel", en: "Excel" },
    share: { es: "Copiar enlace", en: "Copy link" },
    copied: { es: "Enlace copiado", en: "Link copied" },
  },
  suggestion: {
    eyebrow: { es: "¿Ves algo desactualizado?", en: "Spotted something outdated?" },
    title: { es: "Sugerí una actualización", en: "Suggest an update" },
    subtitle: {
      es: "Si trabajás en este puerto, tu dato vale. Lo revisamos y, si se confirma, lo publicamos con tu fuente.",
      en: "If you work at this port, your data matters. We review it and, once confirmed, publish it with your source.",
    },
    terminalLabel: { es: "Terminal", en: "Terminal" },
    wholePort: { es: "Puerto en general", en: "Whole port" },
    fieldLabel: { es: "Dato a corregir", en: "Field to correct" },
    fields: [
      { es: "Calado", en: "Draft" },
      { es: "Atraque", en: "Berth" },
      { es: "Cargas", en: "Cargo" },
      { es: "Estado operativo", en: "Operating status" },
      { es: "Otro", en: "Other" },
    ],
    valueLabel: { es: "Dato correcto", en: "Correct value" },
    valuePlaceholder: {
      es: "Ej: el calado pasó a 7,2 m tras el dragado de septiembre",
      en: "E.g. draft is now 7.2 m after the September dredging",
    },
    sourceLabel: { es: "Fuente", en: "Source" },
    sourcePlaceholder: {
      es: "Ej: aviso a navegantes, administración del puerto",
      en: "E.g. notice to mariners, port authority",
    },
    nameLabel: { es: "Tu nombre", en: "Your name" },
    emailLabel: { es: "Tu correo", en: "Your email" },
    submit: { es: "Enviar sugerencia", en: "Send suggestion" },
    sentTitle: { es: "Sugerencia enviada", en: "Suggestion sent" },
    sentBody: {
      es: "Gracias. La revisamos con la fuente que nos pasaste y te avisamos por correo.",
      en: "Thanks. We'll check it against your source and let you know by email.",
    },
    sendAnother: { es: "Enviar otra sugerencia", en: "Send another suggestion" },
    mailSubject: { es: "Sugerencia de actualización", en: "Update suggestion" },
  },
  footer: {
    rights: { es: "Todos los derechos reservados.", en: "All rights reserved." },
    sections: { es: "Navegación", en: "Navigation" },
    contact: { es: "Contacto", en: "Contact" },
    tagline: {
      es: "Información, conexión y visibilidad para el ecosistema portuario argentino.",
      en: "Information, connection and visibility for the Argentine port ecosystem.",
    },
    designedBy: { es: "Diseñado por", en: "Designed by" },
  },
};
