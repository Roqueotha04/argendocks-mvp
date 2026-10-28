"use client";

import type { Puerto } from "@/config/port.types";
import { MAP_HEIGHT, MAP_WIDTH } from "@/lib/geo";
import { ArgentinaDots } from "@/components/map/ArgentinaDots";
import { PortBeacon } from "@/components/map/PortBeacon";

interface PortMapProps {
  ports: Puerto[];
  label: string;
  activeSlug?: string | null;
  mutedSlugs?: string[];
  onSelect?: (slug: string) => void;
  showGuides?: boolean;
  className?: string;
}

export function PortMap({
  ports,
  label,
  activeSlug = null,
  mutedSlugs = [],
  onSelect,
  showGuides = true,
  className = "",
}: PortMapProps) {
  function beaconState(port: Puerto) {
    if (port.slug === activeSlug) return "active";
    if (mutedSlugs.includes(port.slug)) return "muted";
    return "default";
  }

  return (
    <div
      role="group"
      aria-label={label}
      className={`relative ${className}`}
      style={{ aspectRatio: `${MAP_WIDTH} / ${MAP_HEIGHT}` }}
    >
      <ArgentinaDots showGuides={showGuides} />
      {ports.map((port) => (
        <PortBeacon key={port.slug} port={port} state={beaconState(port)} onSelect={onSelect} />
      ))}
    </div>
  );
}
