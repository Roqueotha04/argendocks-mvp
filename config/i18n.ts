import type { Localized, SectionId } from "./site.types";

interface UiStrings {
  nav: Record<SectionId, Localized>;
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
  offerings: {
    viewAll: Localized;
  };
  offeringDetail: {
    back: Localized;
    addToCart: Localized;
    requestService: Localized;
    whatsappIntro: Localized;
  };
  contact: {
    phone: Localized;
    email: Localized;
    address: Localized;
    hours: Localized;
    detailsTitle: Localized;
    formTitle: Localized;
    nameLabel: Localized;
    namePlaceholder: Localized;
    messageLabel: Localized;
    messagePlaceholder: Localized;
    submit: Localized;
  };
  footer: {
    rights: Localized;
    follow: Localized;
    sections: Localized;
    legal: Localized;
    designedBy: Localized;
    agencyTagline: Localized;
  };
}

export const ui: UiStrings = {
  nav: {
    hero: { es: "Inicio", en: "Home" },
    offerings: { es: "Servicios", en: "Services" },
    about: { es: "Nosotros", en: "About" },
    contact: { es: "Contacto", en: "Contact" },
    testimonials: { es: "Testimonios", en: "Testimonials" },
    gallery: { es: "Galería", en: "Gallery" },
    faq: { es: "Preguntas frecuentes", en: "FAQ" },
  },
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
  offerings: {
    viewAll: { es: "Ver todos", en: "View all" },
  },
  offeringDetail: {
    back: { es: "Volver", en: "Back" },
    addToCart: { es: "Agregar al carrito", en: "Add to cart" },
    requestService: { es: "Solicitar servicio", en: "Request service" },
    whatsappIntro: { es: "¡Hola! Me interesa:", en: "Hi! I'm interested in:" },
  },
  contact: {
    phone: { es: "Teléfono", en: "Phone" },
    email: { es: "Email", en: "Email" },
    address: { es: "Dirección", en: "Address" },
    hours: { es: "Horarios", en: "Hours" },
    detailsTitle: { es: "Hablemos", en: "Let's talk" },
    formTitle: { es: "Dejanos tu mensaje", en: "Leave us a message" },
    nameLabel: { es: "Nombre", en: "Name" },
    namePlaceholder: { es: "¿Cómo te llamás?", en: "What's your name?" },
    messageLabel: { es: "Mensaje", en: "Message" },
    messagePlaceholder: {
      es: "Contanos qué querés pedir…",
      en: "Tell us what you'd like to order…",
    },
    submit: { es: "Enviar por WhatsApp", en: "Send via WhatsApp" },
  },
  footer: {
    rights: { es: "Todos los derechos reservados.", en: "All rights reserved." },
    follow: { es: "Seguinos", en: "Follow us" },
    sections: { es: "Secciones", en: "Sections" },
    legal: { es: "Legal", en: "Legal" },
    designedBy: { es: "Diseñado por", en: "Designed by" },
    agencyTagline: {
      es: "Agencia de Desarrollo de Software",
      en: "Software Development Agency",
    },
  },
};
