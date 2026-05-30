/** Curved path + organic node positions for teamwork-graph illustrations (0–100 space). */

export const GRAPH_HUB = { x: 50, y: 48 };

export function graphCurvePath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  bend = 0.18,
): string {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const cx = mx - (dy / len) * len * bend;
  const cy = my + (dx / len) * len * bend;
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}

/** Product nodes — organic layout (reference: Teamwork Graph) */
export const PRODUCT_GRAPH_POSITIONS: Record<string, { x: number; y: number }> = {
  atlas: { x: 50, y: 13 },
  loop: { x: 13, y: 36 },
  signal: { x: 87, y: 30 },
  phantom: { x: 16, y: 74 },
  drift: { x: 84, y: 70 },
};

/** Six ATLAS signals — evenly spread with vertical emphasis */
export const SIGNAL_GRAPH_POSITIONS = [
  { x: 50, y: 11 },
  { x: 84, y: 24 },
  { x: 90, y: 52 },
  { x: 72, y: 82 },
  { x: 28, y: 82 },
  { x: 10, y: 52 },
] as const;

/** Integration tools — 8-node organic ring */
export const INTEGRATION_GRAPH_POSITIONS = [
  { x: 50, y: 10 },
  { x: 82, y: 22 },
  { x: 92, y: 48 },
  { x: 78, y: 78 },
  { x: 50, y: 90 },
  { x: 22, y: 78 },
  { x: 8, y: 48 },
  { x: 18, y: 22 },
] as const;
