import type { Coordinates } from "@/config/port.types";
import type { Locale } from "@/config/site.types";

const numberLocales: Record<Locale, string> = { es: "es-AR", en: "en-US" };

export function formatMeters(value: number | null, locale: Locale): string | null {
  if (value === null) return null;
  return `${value.toLocaleString(numberLocales[locale], { maximumFractionDigits: 1 })} m`;
}

export function formatDate(isoDate: string, locale: Locale): string {
  return new Intl.DateTimeFormat(numberLocales[locale], {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}

export function formatCoordinates({ lat, lng }: Coordinates): string {
  return `${toDegreesMinutes(lat, "S", "N")} ${toDegreesMinutes(lng, "W", "E")}`;
}

function toDegreesMinutes(value: number, negative: string, positive: string): string {
  const totalMinutes = Math.round(Math.abs(value) * 60);
  const degrees = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${degrees}°${String(minutes).padStart(2, "0")}′${value < 0 ? negative : positive}`;
}
