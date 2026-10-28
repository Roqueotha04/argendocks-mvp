"use client";

import { siteConfig } from "@/config/site.config";
import { ui } from "@/config/i18n";
import { useLanguage } from "@/hooks/useLanguage";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";

interface WhatsAppButtonProps {
  label?: string;
  className?: string;
}

export function WhatsAppButton({ label, className }: WhatsAppButtonProps) {
  const { t } = useLanguage();
  const href = buildWhatsAppLink(
    siteConfig.business.whatsapp,
    t(siteConfig.contact.whatsappMessage),
  );

  return (
    <Button
      href={href}
      external
      ariaLabel={t(ui.whatsapp.aria)}
      className={className}
    >
      <WhatsAppIcon className="mr-2 h-5 w-5" />
      {label ?? t(ui.whatsapp.cta)}
    </Button>
  );
}
