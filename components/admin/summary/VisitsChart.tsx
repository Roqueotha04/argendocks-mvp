import { ADMIN_LOCALE, adminUi } from "@/config/admin.ui";
import type { DailyVisits } from "@/config/admin.types";
import { formatDayMonth, formatNumber } from "@/lib/format";

interface VisitsChartProps {
  days: DailyVisits[];
}

const BAR_SLOT = 10;
const BAR_WIDTH = 6.4;
const CHART_HEIGHT = 100;
const labels = adminUi.summary.visitsChart;

function isWeekend(isoDate: string): boolean {
  const weekday = new Date(`${isoDate}T00:00:00Z`).getUTCDay();
  return weekday === 0 || weekday === 6;
}

export function VisitsChart({ days }: VisitsChartProps) {
  const values = days.map((day) => day.visitas);
  const peak = Math.max(...values);
  const average = Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
  const scale = (value: number) => (value / peak) * (CHART_HEIGHT - 6);
  const averageY = CHART_HEIGHT - scale(average);
  const tickIndexes = [0, Math.floor(days.length / 2), days.length - 1];

  return (
    <div className="px-4 pb-4 pt-3 md:px-5">
      <dl className="flex gap-6">
        <div>
          <dt className="font-data text-[10px] uppercase tracking-widest text-primary/50">
            {labels.peak}
          </dt>
          <dd className="font-data text-base text-primary">{formatNumber(peak, ADMIN_LOCALE)}</dd>
        </div>
        <div>
          <dt className="font-data text-[10px] uppercase tracking-widest text-primary/50">
            {labels.average}
          </dt>
          <dd className="font-data text-base text-secondary">
            {formatNumber(average, ADMIN_LOCALE)}
          </dd>
        </div>
      </dl>

      <svg
        viewBox={`0 0 ${days.length * BAR_SLOT} ${CHART_HEIGHT}`}
        preserveAspectRatio="none"
        role="img"
        aria-label={`${labels.title}: ${labels.peak} ${peak}, ${labels.average} ${average}`}
        className="mt-3 h-28 w-full"
      >
        {days.map((day, index) => {
          const height = scale(day.visitas);
          return (
            <rect
              key={day.fecha}
              x={index * BAR_SLOT + (BAR_SLOT - BAR_WIDTH) / 2}
              y={CHART_HEIGHT - height}
              width={BAR_WIDTH}
              height={height}
              rx={1.5}
              className={`transition-opacity hover:opacity-70 ${isWeekend(day.fecha) ? "fill-accent" : "fill-secondary"}`}
            >
              <title>{`${formatDayMonth(day.fecha, ADMIN_LOCALE)} · ${formatNumber(day.visitas, ADMIN_LOCALE)}`}</title>
            </rect>
          );
        })}
        <line
          x1={0}
          x2={days.length * BAR_SLOT}
          y1={averageY}
          y2={averageY}
          strokeDasharray="4 4"
          vectorEffect="non-scaling-stroke"
          className="stroke-primary/50"
        />
      </svg>

      <div className="mt-2 flex justify-between font-data text-[10px] text-primary/50">
        {tickIndexes.map((index) => (
          <span key={index}>{formatDayMonth(days[index].fecha, ADMIN_LOCALE)}</span>
        ))}
      </div>
    </div>
  );
}
