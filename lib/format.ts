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

export function formatNumber(value: number, locale: Locale): string {
  return value.toLocaleString(numberLocales[locale]);
}

export function formatPercent(ratio: number, locale: Locale): string {
  return ratio.toLocaleString(numberLocales[locale], {
    style: "percent",
    maximumFractionDigits: 1,
  });
}

export function formatDateTime(isoDateTime: string, locale: Locale): string {
  return new Intl.DateTimeFormat(numberLocales[locale], {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(isoDateTime));
}

export function formatLongDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(numberLocales[locale], {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);
}

export function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes} min ${String(seconds).padStart(2, "0")} s`;
}

export function formatDayMonth(isoDate: string, locale: Locale): string {
  return new Intl.DateTimeFormat(numberLocales[locale], {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}

export function formatMoment(isoValue: string, locale: Locale): string {
  return isoValue.includes("T")
    ? formatDateTime(isoValue, locale)
    : formatDayMonth(isoValue, locale);
}
