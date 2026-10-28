"use client";

import Link from "next/link";
import type { Puerto } from "@/config/port.types";
import { toMapPercent } from "@/lib/geo";

type BeaconState = "default" | "active" | "muted";

interface PortBeaconProps {
  port: Puerto;
  state: BeaconState;
  onSelect?: (slug: string) => void;
}

const dotClasses: Record<BeaconState, string> = {
  default: "h-2.5 w-2.5 bg-secondary ring-2 ring-white/80",
  active: "h-3.5 w-3.5 bg-white ring-[3px] ring-secondary",
  muted: "h-2 w-2 bg-accent/50 ring-1 ring-white/30",
};

export function PortBeacon({ port, state, onSelect }: PortBeaconProps) {
  const { x, y } = toMapPercent(port.coordenadas);
  const labelOnLeft = x > 62;
  const isLabelVisible = state === "active";

  const content = (
    <>
      {state !== "muted" && (
        <span aria-hidden className="beacon-pulse absolute h-2.5 w-2.5 rounded-full bg-secondary" />
      )}
      <span aria-hidden className={`relative rounded-full transition-all ${dotClasses[state]}`} />
      <span
        className={`pointer-events-none absolute top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-white px-2 py-1 text-left text-[11px] leading-tight text-primary shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 ${
          labelOnLeft ? "right-5" : "left-5"
        } ${isLabelVisible ? "opacity-100" : "opacity-0"}`}
      >
        <span className="block font-data text-[9px] tracking-widest text-secondary">
          {port.unLocode}
        </span>
        <span className="font-semibold">{port.nombre}</span>
      </span>
    </>
  );

  const sharedClasses =
    "group absolute z-10 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-white";
  const position = { left: `${x}%`, top: `${y}%`, zIndex: state === "active" ? 20 : undefined };

  if (onSelect) {
    return (
      <button
        type="button"
        onClick={() => onSelect(port.slug)}
        aria-label={port.nombre}
        aria-pressed={state === "active"}
        className={sharedClasses}
        style={position}
      >
        {content}
      </button>
    );
  }

  return (
    <Link href={`/puertos/${port.slug}`} aria-label={port.nombre} className={sharedClasses} style={position}>
      {content}
    </Link>
  );
}
