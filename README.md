# Estudio Ve — Landing Template

Template config-driven para armar landing pages de negocios locales. Se edita un solo archivo de configuracion (`config/site.config.ts`), y el template genera toda la web: hero, servicios o productos, sobre nosotros, contacto con WhatsApp, SEO completo y export estatico listo para deploy.

Bilingue espanol/ingles de fabrica, mobile-first, con 4 presets visuales, sistema de variantes por seccion, validacion del config en build time y paginas de detalle por offering.

## Stack

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · TypeScript · Framer Motion 12 (LazyMotion) · Zod · pnpm.

Export estatico (`output: 'export'`). Cero servidor, deploy en cualquier hosting estatico.

## Inicio rapido

```bash
# Opcion A: clonar y usar el script de inicializacion
git clone https://github.com/Roqueotha04/landing-template.git nombre-del-cliente
cd nombre-del-cliente
pnpm install
pnpm new-client "Nombre del Negocio"

# Opcion B: clonar y configurar manualmente
git clone https://github.com/Roqueotha04/landing-template.git nombre-del-cliente
cd nombre-del-cliente
pnpm install
```

`pnpm new-client` resetea el historial git, limpia `assets-cliente/` y actualiza el `package.json`. Despues de ejecutarlo:

1. **`config/site.config.ts`** — todo el contenido del negocio. Es el unico archivo de contenido.
2. **`app/globals.css`** — colores del tema en `:root`. O copiar un preset de `config/presets/`.
3. **`app/layout.tsx`** — imports de fuentes (`next/font/google`), en sync con `brand` del config.

Verificar con `pnpm build`. Si falta un campo obligatorio, Zod tira un error claro.

## Estructura

```
config/
  site.config.ts       ← Unico archivo editable por cliente
  site.types.ts        ← Tipos (no editar)
  i18n.ts              ← Strings de UI (labels, aria, menu)
  presets/             ← Variables CSS listas para copiar (futuristic, minimalist, elegant, fresh)

app/
  layout.tsx           ← Fuentes, metadata, providers (Language + Motion)
  page.tsx             ← Renderiza secciones segun config + variantes
  not-found.tsx        ← 404 estilizada con el tema del cliente
  globals.css          ← Tema via CSS custom properties + shimmer placeholder
  oferta/[slug]/       ← Detalle por offering (generateStaticParams)
  sitemap.ts / robots.ts ← SEO automatico (home + offerings)

components/
  sections/            ← Hero, Offerings(Carousel), About(Split), Contact(Centered), FAQ, Testimonials, Gallery
  layout/              ← Navbar (menu mobile animado + cierre al click afuera), Footer (legal configurable)
  ui/                  ← Section, Button, Reveal, Cards, SectionHeading, Carousel, icons...
  providers/           ← LanguageProvider, MotionProvider (LazyMotion)
  seo/                 ← JSON-LD (con escape contra inyeccion)

hooks/                 ← useLanguage, useLocalStorage (useSyncExternalStore), useDragScroll
lib/                   ← translate(), buildWhatsAppLink(), slugify(), validateConfig()
scripts/               ← new-client.mjs
```

Las rutas en `app/` solo componen. Nunca contienen markup. La logica vive en `components/`, `hooks/` y `lib/`.

## Como funciona

**Config → Secciones:** `app/page.tsx` lee `siteConfig.sections` (un array de IDs) y renderiza cada seccion desde un registro de variantes. Activar, desactivar o reordenar secciones = editar ese array.

**Variantes:** el config tiene un campo opcional `variants` que elige la version de cada seccion sin tocar componentes:

```ts
variants: {
  about: "split",      // "split" (default) | "simple"
  contact: "full",     // "full" (default) | "centered"
  offerings: "grid",   // "grid" (default) | "carousel"
}
```

**Secciones disponibles:** `hero`, `offerings`, `about`, `contact`, `faq`, `testimonials`, `gallery`. Las ultimas 3 son opcionales y requieren su contenido en el config (`faq`, `testimonials`, `gallery`).

**Validacion:** `site.config.ts` pasa por un schema Zod al importarse. Si falta un campo obligatorio o un `Localized` esta incompleto, el build falla con un error descriptivo.

**i18n:** todo texto visible es `Localized<T>` = `{ es, en }`. El `LanguageProvider` expone `useLanguage()` → `{ locale, t, toggleLocale }`. Persistido en localStorage.

**Tema:** colores en `:root` de `globals.css`, mapeados a Tailwind via `@theme inline`. Los 4 presets estan en `config/presets/` listos para copiar.

**Fuentes:** `layout.tsx` importa heading y body como variables CSS separadas (`--font-heading-face`, `--font-body-face`).

**Performance:** Framer Motion carga via `LazyMotion` con `domAnimation` (bundle reducido). Las imagenes tienen shimmer placeholder CSS mientras cargan.

**SEO:** metadata, Open Graph, JSON-LD de negocio local (con escape contra inyeccion), sitemap con home + detalle de offerings, robots.txt.

## Presets de estilo

Archivos CSS listos en `config/presets/`. Copiar las variables en `:root` de `globals.css` y cambiar los imports de fuente en `layout.tsx`.

| Preset | Descripcion | Fuente |
|---|---|---|
| Futuristic | Oscuro, acento neon puntual, gradientes sutiles, glass | Space Grotesk |
| Minimalist | Pastel, mucho blanco, sin sombras | DM Sans |
| Elegant | Negro y dorado, headings serif | Playfair Display |
| Fresh | Verde, bordes redondeados, amigable | Nunito |

## Secciones

| Seccion | Descripcion | Variantes |
|---|---|---|
| `hero` | Titulo, subtitulo, CTA, imagen opcional | — |
| `offerings` | Grid/carrusel de servicios o productos con pagina de detalle | `grid` / `carousel` |
| `about` | Sobre nosotros con imagen, highlights y eyebrow | `split` / `simple` |
| `contact` | Formulario a WhatsApp + datos de contacto | `full` / `centered` |
| `faq` | Acordeon de preguntas frecuentes | — |
| `testimonials` | Carrusel mobile, grid desktop, con avatar y rol | — |
| `gallery` | Grid de imagenes con lightbox y navegacion por teclado | — |

## Tipos de web

- **Servicios** (`offerings.kind: "services"`) — tarjetas sin precio.
- **Productos** (`offerings.kind: "products"`) — tarjetas con precio e imagen.
- **Promocional** — composicion visual con imagenes y texto, sin grid ni cards.

## Comandos

```bash
pnpm install              # Dependencias
pnpm dev                  # Dev server en localhost:3000
pnpm build                # Build de produccion (export estatico a /out)
pnpm lint                 # ESLint
pnpm new-client "Nombre"  # Inicializar template para un nuevo cliente
```

## Documentacion

- [BRIEF.md](BRIEF.md) — Template de brief para completar por cliente.
- [AGENTS.md](AGENTS.md) — Reglas de arquitectura, clean code y especificaciones para agentes de IA.
