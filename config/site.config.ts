import type { SiteConfig } from "./site.types";
import { validateConfig } from "@/lib/validate-config";

export const siteConfig: SiteConfig = validateConfig({
  site: {
    url: "https://argendocks.com",
    defaultLocale: "es",
  },
  business: {
    name: "ArgenDocks",
    legalName: "ArgenDocks — Red de Puertos Argentinos",
    logoText: "ArgenDocks",
    logo: "/logo.webp",
    phone: "+54 9 223 668-0996",
    whatsapp: "5492236680996",
    email: "contacto@argendocks.com",
    address: "Brown 855 1° B, Playa Varese, Mar del Plata, Buenos Aires",
    hours: {
      es: "Lunes a viernes, 9 a 18 h",
      en: "Monday to Friday, 9am to 6pm",
    },
  },
  brand: {
    headingFont: "Instrument Sans",
    bodyFont: "Instrument Sans",
  },
  sections: ["hero", "platform", "ports", "about", "offerings", "contact"],
  hero: {
    eyebrow: {
      es: "Plataforma del sistema portuario argentino",
      en: "The Argentine port system platform",
    },
    title: {
      es: "Todos los puertos en un solo lugar",
      en: "Every Argentine port in one place",
    },
    subtitle: {
      es: "Pensada y desarrollada por gente de puertos, para usuarios de puertos. Calados, terminales y cargas de cada muelle del país, al día y en un solo mapa.",
      en: "Built by port people, for port users. Draft, terminals and cargo for every quay in the country, up to date and on a single map.",
    },
    ctaText: {
      es: "Explorar puertos",
      en: "Explore ports",
    },
    secondaryCtaText: {
      es: "Solicitar demo",
      en: "Request a demo",
    },
    highlights: [
      { es: "102 puertos relevados", en: "102 ports surveyed" },
      { es: "Ficha por terminal", en: "Per-terminal records" },
      { es: "Datos exportables", en: "Exportable data" },
    ],
  },
  platform: {
    eyebrow: { es: "La plataforma", en: "The platform" },
    title: {
      es: "Información portuaria que se puede usar",
      en: "Port information you can actually use",
    },
    subtitle: {
      es: "Sin PDFs perdidos ni llamados para confirmar un calado.",
      en: "No lost PDFs, no phone calls to confirm a draft.",
    },
    features: [
      {
        label: { es: "Mapa", en: "Map" },
        title: { es: "Un mapa hecho para puertos", en: "A map built for ports" },
        description: {
          es: "Filtrá por provincia, tipo de puerto o carga y encontrá el muelle que necesitás en segundos.",
          en: "Filter by province, port type or cargo and find the quay you need in seconds.",
        },
      },
      {
        label: { es: "Ficha", en: "Record" },
        title: { es: "Una ficha por puerto", en: "One record per port" },
        description: {
          es: "Terminales, atraque, calado, administración y cargas, con la fecha y la fuente de cada dato.",
          en: "Terminals, berth length, draft, operator and cargo, with the date and source of every figure.",
        },
      },
      {
        label: { es: "Exportar", en: "Export" },
        title: { es: "Llevate los datos", en: "Take the data with you" },
        description: {
          es: "Descargá cualquier ficha en PDF o Excel para tu informe, cotización o presentación.",
          en: "Download any record as PDF or Excel for your report, quote or presentation.",
        },
      },
      {
        label: { es: "Comunidad", en: "Community" },
        title: { es: "Datos que mejora la comunidad", en: "Data the community keeps sharp" },
        description: {
          es: "Quien opera en un puerto puede sugerir una actualización. La revisamos y la publicamos.",
          en: "Anyone working at a port can suggest an update. We review it and publish it.",
        },
      },
    ],
  },
  portsPreview: {
    eyebrow: { es: "Puertos", en: "Ports" },
    title: { es: "Recorré la red de puertos", en: "Browse the port network" },
    subtitle: {
      es: "Del Paraná al Canal Beagle, cada puerto con su ficha propia.",
      en: "From the Paraná to the Beagle Channel, every port with its own record.",
    },
    ctaText: { es: "Ver todos los puertos", en: "See all ports" },
  },
  offerings: {
    kind: "services",
    eyebrow: { es: "Consultoría", en: "Consulting" },
    title: {
      es: "Asesoramiento de alguien que caminó los muelles",
      en: "Advice from someone who has walked the quays",
    },
    subtitle: {
      es: "Para puertos, terminales y empresas que operan en ellos.",
      en: "For ports, terminals and the companies that work in them.",
    },
    items: [
      {
        name: { es: "Gestión portuaria", en: "Port management" },
        description: {
          es: "Diagnóstico operativo y planes de gestión para administraciones públicas y privadas.",
          en: "Operational diagnosis and management plans for public and private port authorities.",
        },
      },
      {
        name: { es: "Desarrollo comercial", en: "Commercial development" },
        description: {
          es: "Estrategia para atraer cargas y líneas, con datos reales del sistema portuario.",
          en: "Strategy to attract cargo and shipping lines, backed by real port-system data.",
        },
      },
      {
        name: { es: "Vías navegables", en: "Waterways" },
        description: {
          es: "Análisis de accesos náuticos, calados y logística fluvial sobre la Hidrovía.",
          en: "Analysis of nautical access, drafts and river logistics on the Waterway.",
        },
      },
      {
        name: { es: "Relaciones institucionales", en: "Institutional relations" },
        description: {
          es: "Acompañamiento ante organismos nacionales, comisiones binacionales y la OEA.",
          en: "Support before national agencies, binational commissions and the OAS.",
        },
      },
    ],
  },
  about: {
    eyebrow: { es: "Quiénes somos", en: "About us" },
    title: { es: "Juan C. Donato", en: "Juan C. Donato" },
    subtitle: { es: "Founder de ArgenDocks", en: "Founder of ArgenDocks" },
    image: "/juan-donato.webp",
    imageAlt: {
      es: "Juan C. Donato, fundador de ArgenDocks, hablando en una conferencia sobre puertos",
      en: "Juan C. Donato, founder of ArgenDocks, speaking at a port conference",
    },
    body: {
      es: [
        "ArgenDocks nace de recorrer los 102 puertos del país y de comprobar que la información sobre ellos estaba dispersa, desactualizada o directamente no existía.",
      ],
      en: [
        "ArgenDocks was born from visiting the country's 102 ports and finding that information about them was scattered, outdated or simply missing.",
      ],
    },
    chapters: [
      {
        title: { es: "Formación y gestión", en: "Training and management" },
        body: {
          es: [
            "Mi formación se cimentó sobre una base técnica en administración portuaria y gestión en vías navegables (ITBA y UTN Mar del Plata), que me dio herramientas para entender los desafíos de la logística de comercio exterior e interior.",
            "En el sector público coordiné el sistema portuario nacional, lo que me permitió recorrer los muelles de la red de Puertos Argentinos, conocer sus realidades y formar equipos de gestión.",
          ],
          en: [
            "My training rests on a technical foundation in port administration and waterway management (ITBA and UTN Mar del Plata), which gave me the tools to understand the challenges of foreign and domestic trade logistics.",
            "In the public sector I coordinated the national port system, which let me walk the quays of the Argentine port network, learn their realities and build management teams.",
          ],
        },
      },
      {
        title: { es: "Experiencia internacional", en: "International experience" },
        body: {
          es: [
            "Asesoré operativa y comercialmente a los puertos de San Pedro (PBA) y Las Palmas (Chaco).",
            "Representé al país en tres Comisiones Binacionales de Navegación y Puertos —Colombia, Paraguay y Uruguay— y ante la Comisión Interamericana de Puertos de la OEA.",
          ],
          en: [
            "I advised the ports of San Pedro (Buenos Aires) and Las Palmas (Chaco) on operations and commercial strategy.",
            "I represented the country in three Binational Navigation and Port Commissions —Colombia, Paraguay and Uruguay— and before the OAS Inter-American Committee on Ports.",
          ],
        },
      },
      {
        title: { es: "La plataforma", en: "The platform" },
        body: {
          es: [
            "ArgenDocks es la herramienta que me hubiera gustado tener: todos los puertos, con datos verificables, en un mismo lugar.",
            "El objetivo es que, de a poco, los puertos argentinos estén cada vez más conectados entre sí y con quienes los usan todos los días.",
          ],
          en: [
            "ArgenDocks is the tool I wish I'd had: every port, with verifiable data, in one place.",
            "The goal is for Argentine ports to become steadily more connected — with each other and with the people who use them every day.",
          ],
        },
      },
    ],
  },
  contact: {
    eyebrow: { es: "Contacto", en: "Contact" },
    title: { es: "Hablemos", en: "Let's talk" },
    subtitle: {
      es: "Contanos qué necesitás. Respondemos desde Mar del Plata.",
      en: "Tell us what you need. We reply from Mar del Plata.",
    },
    whatsappMessage: {
      es: "¡Hola! Quiero saber más sobre ArgenDocks.",
      en: "Hi! I'd like to know more about ArgenDocks.",
    },
  },
  seo: {
    title: {
      es: "ArgenDocks — Red de Puertos Argentinos",
      en: "ArgenDocks — Argentine Port Network",
    },
    description: {
      es: "Todos los puertos de Argentina en un solo lugar: mapa interactivo, terminales, calados y cargas, con fichas exportables y consultoría portuaria.",
      en: "Every Argentine port in one place: interactive map, terminals, drafts and cargo, with exportable records and port consulting.",
    },
    keywords: ["puertos argentinos", "terminales portuarias", "calado", "hidrovía", "consultoría portuaria", "Argentina"],
    ogImage: "/logo.webp",
  },
});
