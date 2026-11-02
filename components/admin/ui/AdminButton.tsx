import Link from "next/link";
import type { ReactNode } from "react";

type AdminButtonVariant = "primary" | "signal" | "outline" | "ghost" | "danger";
type AdminButtonSize = "sm" | "md";

interface AdminButtonProps {
  variant?: AdminButtonVariant;
  size?: AdminButtonSize;
  href?: string;
  external?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
  ariaLabel?: string;
  className?: string;
  children: ReactNode;
}

const variantClasses: Record<AdminButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-deep",
  signal: "bg-secondary text-white hover:bg-[color-mix(in_srgb,var(--secondary),black_15%)]",
  outline: "border border-primary/25 text-primary hover:border-primary hover:bg-primary/5",
  ghost: "text-secondary hover:bg-accent/70",
  danger: "border border-danger/30 text-danger hover:border-danger hover:bg-danger/5",
};

const sizeClasses: Record<AdminButtonSize, string> = {
  sm: "h-8 gap-1.5 px-3.5 text-xs",
  md: "h-10 gap-2 px-5 text-sm",
};

const baseClasses =
  "inline-flex shrink-0 items-center justify-center rounded-full font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary";

export function AdminButton({
  variant = "primary",
  size = "md",
  href,
  external = false,
  type = "button",
  onClick,
  ariaLabel,
  className = "",
  children,
}: AdminButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href && external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className={classes}
      >
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} aria-label={ariaLabel} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} aria-label={ariaLabel} className={classes}>
      {children}
    </button>
  );
}
