import type { Coordinates } from "@/config/port.types";

type LngLat = [number, number];

const WEST = -74;
const EAST = -53;
const NORTH = -21.5;
const SOUTH = -55.5;
const SCALE = 10;
const LONGITUDE_FACTOR = Math.cos((38.5 * Math.PI) / 180);
const DOT_SPACING = 4;

export const MAP_WIDTH = round((EAST - WEST) * LONGITUDE_FACTOR * SCALE);
export const MAP_HEIGHT = round((NORTH - SOUTH) * SCALE);

const mainland: LngLat[] = [
  [-67.2, -22.8], [-66.2, -21.8], [-65.0, -22.1], [-64.3, -22.8], [-63.9, -22.0],
  [-62.8, -22.0], [-62.6, -22.3], [-61.0, -23.8], [-59.5, -24.4], [-57.6, -25.4],
  [-58.2, -26.6], [-58.6, -27.3], [-57.0, -27.5], [-55.9, -27.4], [-55.3, -27.0],
  [-54.7, -26.0], [-54.6, -25.6], [-54.0, -25.6], [-53.6, -26.2], [-53.8, -27.15],
  [-55.6, -28.1], [-56.8, -29.4], [-57.6, -30.2], [-58.0, -31.4], [-58.15, -32.3],
  [-58.4, -33.1], [-58.4, -33.9], [-58.5, -34.4], [-58.35, -34.6], [-57.9, -34.85],
  [-57.3, -35.3], [-57.4, -35.9], [-56.7, -36.4], [-56.85, -37.1], [-57.5, -38.05],
  [-58.0, -38.4], [-58.75, -38.6], [-60.0, -38.9], [-61.3, -39.0], [-62.3, -38.85],
  [-62.3, -39.4], [-62.1, -40.0], [-62.3, -40.6], [-62.8, -41.05], [-64.0, -40.9],
  [-65.0, -40.8], [-65.1, -41.4], [-65.0, -41.9], [-64.1, -42.2], [-63.6, -42.6],
  [-63.75, -42.85], [-64.5, -42.6], [-65.0, -42.75], [-64.4, -43.0], [-65.05, -43.3],
  [-65.3, -44.0], [-65.7, -44.8], [-66.6, -45.0], [-67.5, -45.85], [-67.5, -46.45],
  [-66.8, -46.95], [-65.8, -47.1], [-65.9, -47.75], [-66.0, -48.3], [-67.0, -48.6],
  [-67.7, -49.3], [-68.4, -50.1], [-69.0, -51.0], [-69.2, -51.6], [-68.35, -52.35],
  [-70.0, -52.0], [-71.9, -52.0], [-72.4, -51.5], [-73.2, -50.6], [-73.5, -49.5],
  [-72.6, -48.4], [-72.3, -47.6], [-71.9, -46.8], [-71.7, -45.9], [-71.8, -44.0],
  [-71.8, -43.1], [-71.9, -42.0], [-71.7, -41.0], [-71.7, -40.0], [-71.4, -39.0],
  [-71.0, -38.2], [-71.1, -37.3], [-70.6, -36.3], [-70.4, -35.2], [-70.0, -34.2],
  [-70.0, -33.0], [-70.1, -32.5], [-69.9, -30.2], [-69.2, -28.6], [-68.6, -27.6],
  [-68.4, -26.9], [-68.5, -25.3], [-68.3, -24.4], [-67.1, -23.5], [-67.0, -22.9],
];

const tierraDelFuego: LngLat[] = [
  [-68.6, -52.65], [-68.2, -53.1], [-67.7, -53.8], [-66.4, -54.45], [-65.2, -54.65],
  [-66.5, -54.9], [-67.3, -54.9], [-68.3, -54.85], [-68.6, -54.88],
];

const malvinas: LngLat[] = [
  [-61.4, -51.4], [-60.0, -51.25], [-58.4, -51.3], [-57.7, -51.55], [-58.4, -52.0],
  [-59.3, -52.3], [-60.3, -52.2], [-61.2, -51.9],
];

const landmasses = [mainland, tierraDelFuego, malvinas];

export type MapPoint = { x: number; y: number };

export function project({ lat, lng }: Coordinates): MapPoint {
  return {
    x: round((lng - WEST) * LONGITUDE_FACTOR * SCALE),
    y: round((NORTH - lat) * SCALE),
  };
}

export function toMapPercent(coordinates: Coordinates): MapPoint {
  const { x, y } = project(coordinates);
  return { x: (x / MAP_WIDTH) * 100, y: (y / MAP_HEIGHT) * 100 };
}

export const latitudeGuides = [-25, -30, -35, -40, -45, -50, -55].map((lat) => ({
  lat,
  y: project({ lat, lng: WEST }).y,
}));

export const landDots: MapPoint[] = buildLandDots();

function buildLandDots(): MapPoint[] {
  const dots: MapPoint[] = [];
  for (let y = DOT_SPACING / 2; y < MAP_HEIGHT; y += DOT_SPACING) {
    for (let x = DOT_SPACING / 2; x < MAP_WIDTH; x += DOT_SPACING) {
      const point: LngLat = [
        WEST + x / (LONGITUDE_FACTOR * SCALE),
        NORTH - y / SCALE,
      ];
      if (landmasses.some((polygon) => isInsidePolygon(point, polygon))) {
        dots.push({ x: round(x), y: round(y) });
      }
    }
  }
  return dots;
}

function isInsidePolygon([lng, lat]: LngLat, polygon: LngLat[]): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [lngI, latI] = polygon[i];
    const [lngJ, latJ] = polygon[j];
    const crosses =
      latI > lat !== latJ > lat &&
      lng < ((lngJ - lngI) * (lat - latI)) / (latJ - latI) + lngI;
    if (crosses) inside = !inside;
  }
  return inside;
}

export function distanceInKm(from: Coordinates, to: Coordinates): number {
  const earthRadiusKm = 6371;
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
  const deltaLat = toRadians(to.lat - from.lat);
  const deltaLng = toRadians(to.lng - from.lng);
  const haversine =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(toRadians(from.lat)) * Math.cos(toRadians(to.lat)) * Math.sin(deltaLng / 2) ** 2;
  return 2 * earthRadiusKm * Math.asin(Math.sqrt(haversine));
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}
