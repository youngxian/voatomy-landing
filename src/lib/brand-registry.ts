/**
 * Official brand icons via Simple Icons (https://simpleicons.org).
 * Used when a hand-rolled SVG is not in brand-icons.tsx — rendered from CDN.
 */
export type SimpleBrandMeta = {
  slug: string;
  hex: string;
  title: string;
};

/** Brands served from Simple Icons CDN (slug + official hex). */
export const SIMPLE_ICON_BRANDS: Record<string, SimpleBrandMeta> = {
  Notion: { slug: "notion", hex: "000000", title: "Notion" },
  Sentry: { slug: "sentry", hex: "362D59", title: "Sentry" },
  Grafana: { slug: "grafana", hex: "F46800", title: "Grafana" },
  Confluence: { slug: "confluence", hex: "172B4D", title: "Confluence" },
  Discord: { slug: "discord", hex: "5865F2", title: "Discord" },
  ClickUp: { slug: "clickup", hex: "7B68EE", title: "ClickUp" },
  Trello: { slug: "trello", hex: "0052CC", title: "Trello" },
  Pipedrive: { slug: "pipedrive", hex: "017737", title: "Pipedrive" },
  OpsGenie: { slug: "opsgenie", hex: "2684FF", title: "OpsGenie" },
  Sketch: { slug: "sketch", hex: "F7B500", title: "Sketch" },
};

export const SIMPLE_ICONS_CDN = "https://cdn.simpleicons.org";

export function getSimpleBrandMeta(name: string): SimpleBrandMeta | undefined {
  return SIMPLE_ICON_BRANDS[name];
}

export function getSimpleIconCdnUrl(name: string): string | undefined {
  const meta = getSimpleBrandMeta(name);
  if (!meta) return undefined;
  return `${SIMPLE_ICONS_CDN}/${meta.slug}/${meta.hex}`;
}

export function getBrandHexFromRegistry(name: string, fallback = "#888888"): string {
  const meta = getSimpleBrandMeta(name);
  if (meta) return `#${meta.hex}`;
  return fallback;
}
