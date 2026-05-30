/** Shared polar coordinates for hub-and-spoke illustrations (0–100 space). */

export const ORBIT_CENTER = 50;

export function getOrbitPosition(index: number, total: number, radius = 36) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  return {
    x: ORBIT_CENTER + Math.cos(angle) * radius,
    y: ORBIT_CENTER + Math.sin(angle) * radius,
  };
}

export function orbitPoints<T extends object>(
  items: readonly T[],
  radius = 36,
): (T & { x: number; y: number })[] {
  return items.map((item, i) => ({
    ...item,
    ...getOrbitPosition(i, items.length, radius),
  }));
}
