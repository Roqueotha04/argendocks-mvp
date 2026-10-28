"use client";

import { siteConfig } from "@/config/site.config";
import { ui } from "@/config/i18n";
import { useLanguage } from "@/hooks/useLanguage";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";

type WhatsAppButtonVariant = "signal" | "primary" | "outlineOnColor";

interface WhatsAppButtonProps {
  label?: string;
  variant?: WhatsAppButtonVariant;
  className?: string;
}

export function WhatsAppButton({ label, variant = "signal", className }: WhatsAppButtonProps) {
  const { t } = useLanguage();
  const href = buildWhatsAppLink(
    siteConfig.business.whatsapp,
    t(siteConfig.contact.whatsappMessage),
  );

  return (
    <Button
      href={href}
      external
      variant={variant}
      ariaLabel={t(ui.whatsapp.aria)}
      className={className}
    >
      <WhatsAppIcon className="h-4 w-4" />
      {label ?? t(ui.whatsapp.cta)}
    </Button>
  );
}
