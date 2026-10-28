import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "signal" | "outline" | "outlineOnColor";

interface ButtonProps {
  href: string;
  variant?: ButtonVariant;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-deep",
  signal: "bg-secondary text-white hover:bg-[color-mix(in_srgb,var(--secondary),black_15%)]",
  outline: "border border-primary/25 text-primary hover:border-primary hover:bg-primary/5",
  outlineOnColor: "border border-white/30 text-white hover:border-white hover:bg-white/10",
};

const baseClasses =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary";

export function Button({
  href,
  variant = "primary",
  external = false,
  className = "",
  ariaLabel,
  children,
}: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} aria-label={ariaLabel} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} aria-label={ariaLabel} className={classes}>
      {children}
    </Link>
  );
}
