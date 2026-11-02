import Link from "next/link";
import { adminUi } from "@/config/admin.ui";
import { Logo } from "@/components/layout/Logo";
import { Eyebrow } from "@/components/admin/ui/Eyebrow";
import { ArrowLeftIcon } from "@/components/ui/icons";

const labels = adminUi.login;

export function LoginIntro() {
  return (
    <header className="bg-deep px-6 pb-28 pt-6 md:pt-8">
      <div className="mx-auto w-full max-w-md">
        <div className="flex items-center justify-between gap-4">
          <Logo className="h-6" />
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-xs text-white/75 transition-colors hover:border-white/50 hover:text-white"
          >
            <ArrowLeftIcon className="h-3.5 w-3.5" />
            {labels.backToSite}
          </Link>
        </div>
        <div className="mt-12">
          <Eyebrow tone="onColor">{labels.eyebrow}</Eyebrow>
          <h1 className="mt-4 font-heading text-3xl font-semibold leading-[1.05] tracking-tight text-white">
            {labels.title}
          </h1>
          <p className="mt-2 font-accent text-xl italic leading-snug text-accent">
            {labels.subtitle}
          </p>
        </div>
      </div>
    </header>
  );
}
