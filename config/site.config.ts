import type { SiteConfig } from "./site.types";
import { validateConfig } from "@/lib/validate-config";

export const siteConfig: SiteConfig = validateConfig({
  site: {
    url: "https://example.com",
    defaultLocale: "es",
  },
  business: {
    name: "Nombre del Negocio",
    legalName: "Nombre del Negocio",
    logoText: "Negocio",
    phone: "+54 223 555-1234",
    whatsapp: "542235551234",
    email: "hola@example.com",
    address: "Av. Colón 1234, Mar del Plata",
    mapUrl: "https://maps.google.com/?q=Av.+Colón+1234+Mar+del+Plata",
    instagram: "negocio",
    hours: {
      es: "Lun a Sáb de 9 a 19 hs",
      en: "Mon to Sat, 9am to 7pm",
    },
  },
  brand: {
    headingFont: "Geist",
    bodyFont: "Geist",
  },
  sections: ["hero", "offerings", "about", "contact"],
  hero: {
    title: {
      es: "Tu mejor versión empieza acá",
      en: "Your best self starts here",
    },
    subtitle: {
      es: "Una frase corta que explique qué hacés y por qué elegirte.",
      en: "A short line explaining what you do and why to choose you.",
    },
    ctaText: {
      es: "Escribinos",
      en: "Message us",
    },
  },
  offerings: {
    kind: "services",
    title: {
      es: "Servicios",
      en: "Services",
    },
    subtitle: {
      es: "Lo que hacemos por vos.",
      en: "What we do for you.",
    },
    items: [
      {
        name: { es: "Servicio uno", en: "Service one" },
        description: {
          es: "Una descripción breve orientada al beneficio del cliente.",
          en: "A short, benefit-focused description.",
        },
      },
      {
        name: { es: "Servicio dos", en: "Service two" },
        description: {
          es: "Una descripción breve orientada al beneficio del cliente.",
          en: "A short, benefit-focused description.",
        },
      },
      {
        name: { es: "Servicio tres", en: "Service three" },
        description: {
          es: "Una descripción breve orientada al beneficio del cliente.",
          en: "A short, benefit-focused description.",
        },
      },
    ],
  },
  about: {
    eyebrow: {
      es: "Nuestra historia",
      en: "Our story",
    },
    title: {
      es: "Sobre nosotros",
      en: "About us",
    },
    body: {
      es: [
        "Primer párrafo: el origen o el porqué del negocio. Que suene humano, no corporativo.",
        "Segundo párrafo: la promesa o el valor que ofrecés al cliente, en tono cercano.",
      ],
      en: [
        "First paragraph: the origin or the why behind the business. Human, not corporate.",
        "Second paragraph: the promise or value you offer the customer, in a warm tone.",
      ],
    },
    highlights: [
      { value: "10+", label: { es: "Años de experiencia", en: "Years of experience" } },
      { value: "500+", label: { es: "Clientes felices", en: "Happy clients" } },
      { value: "100%", label: { es: "Compromiso", en: "Commitment" } },
    ],
  },
  contact: {
    title: {
      es: "Contacto",
      en: "Contact",
    },
    subtitle: {
      es: "Escribinos por WhatsApp y te respondemos al toque.",
      en: "Message us on WhatsApp and we'll reply right away.",
    },
    whatsappMessage: {
      es: "¡Hola! Quiero hacer una consulta.",
      en: "Hi! I'd like to make an inquiry.",
    },
  },
  seo: {
    title: {
      es: "Nombre del Negocio — Rubro en Ciudad",
      en: "Business Name — Category in City",
    },
    description: {
      es: "Descripción del negocio para buscadores. 140-160 caracteres, con la propuesta de valor y la ubicación.",
      en: "Business description for search engines. 140-160 characters, value proposition and location.",
    },
    keywords: ["rubro", "ciudad", "negocio"],
  },
});
