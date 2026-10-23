// Isometric projection for the ControlMesh city map.
// The world is a 40 x 40 tile grid drawn on a 2560 x 1500 px canvas.
// i runs down-right, j runs down-left, h lifts a point straight up (in px).

export const WORLD_W = 2560;
export const WORLD_H = 1500;

const A = 32; // half tile width
const B = 16; // half tile height
const OX = 1280;
const OY = 120;

export type Pt = [number, number];

export function P(i: number, j: number, h = 0): Pt {
  return [Math.round(OX + (i - j) * A), Math.round(OY + (i + j) * B - h)];
}

export function pts(...ps: Pt[]): string {
  return ps.map(([x, y]) => `${x},${y}`).join(" ");
}

/** Flat diamond covering tiles i0..i1 x j0..j1, lifted by h. */
export function quad(i0: number, i1: number, j0: number, j1: number, h = 0): string {
  return pts(P(i0, j0, h), P(i1, j0, h), P(i1, j1, h), P(i0, j1, h));
}

/** SVG / CSS motion path through a list of tiles, h px above the ground. */
export function routeThrough(tiles: [number, number][], h = 10): string {
  return "M" + tiles.map(([i, j]) => P(i, j, h).join(" ")).join(" L");
}
