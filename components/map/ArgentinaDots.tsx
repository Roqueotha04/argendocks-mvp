import { MAP_HEIGHT, MAP_WIDTH, landDots, latitudeGuides } from "@/lib/geo";

interface ArgentinaDotsProps {
  showGuides?: boolean;
}

export function ArgentinaDots({ showGuides = true }: ArgentinaDotsProps) {
  return (
    <svg
      viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
      aria-hidden
      className="absolute inset-0 h-full w-full overflow-visible"
    >
      {showGuides &&
        latitudeGuides.map(({ lat, y }) => (
          <g key={lat}>
            <line
              x1={0}
              x2={MAP_WIDTH}
              y1={y}
              y2={y}
              strokeDasharray="1 3"
              strokeWidth={0.4}
              className="stroke-white/15"
            />
            <text x={1} y={y - 1.5} className="fill-white/35 font-data" fontSize={4.2}>
              {Math.abs(lat)}°S
            </text>
          </g>
        ))}
      {landDots.map(({ x, y }) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={1.05} className="fill-accent/30" />
      ))}
    </svg>
  );
}
