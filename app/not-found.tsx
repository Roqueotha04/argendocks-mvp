import Link from "next/link";
import { siteConfig } from "@/config/site.config";

const locale = siteConfig.site.defaultLocale;

const content = {
  es: {
    title: "Página no encontrada",
    description: "La página que buscás no existe o fue movida.",
    cta: "Volver al inicio",
  },
  en: {
    title: "Page not found",
    description: "The page you're looking for doesn't exist or has been moved.",
    cta: "Back to home",
  },
};

export default function NotFound() {
  const t = content[locale];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-heading text-7xl font-bold text-primary">404</p>
      <h1 className="mt-4 font-heading text-2xl font-bold tracking-tight text-foreground">
        {t.title}
      </h1>
      <p className="mt-2 max-w-md text-base text-foreground/70">{t.description}</p>
      <Link
        href="/"
        className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
      >
        {t.cta}
      </Link>
    </main>
  );
}
