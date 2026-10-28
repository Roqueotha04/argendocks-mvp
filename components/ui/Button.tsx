import type { ReactNode } from "react";

type ButtonVariant = "primary" | "outline";

interface ButtonProps {
  href: string;
  variant?: ButtonVariant;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:opacity-90",
  outline: "border border-foreground/20 text-foreground hover:bg-foreground/5",
};

export function Button({
  href,
  variant = "primary",
  external = false,
  className = "",
  ariaLabel,
  children,
}: ButtonProps) {
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      {...externalProps}
      className={`inline-flex h-12 items-center justify-center rounded-full px-7 text-sm font-medium transition-colors ${variantClasses[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
