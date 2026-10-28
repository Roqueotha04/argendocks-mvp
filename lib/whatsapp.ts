export function buildWhatsAppLink(whatsappNumber: string, message?: string): string {
  const digits = whatsappNumber.replace(/\D/g, "");
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
