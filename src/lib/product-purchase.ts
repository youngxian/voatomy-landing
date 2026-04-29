/**
 * Canonical checkout URLs for Voatomy product marketing pages.
 * All CTAs that represent “buy on the site” should use {@link buildProductCheckoutUrl}.
 */

export const PURCHASABLE_PRODUCT_KEYS = [
  "atlas",
  "loop",
  "signal",
  "drift",
  "phantom",
  "nexus",
] as const;

export type PurchasableProductKey = (typeof PURCHASABLE_PRODUCT_KEYS)[number];

/**
 * @param product - Base product to preselect on checkout (ATLAS = platform; others = paid add-ons on top of plan).
 * @param plan - Defaults to Pro; NEXUS defaults to Business (cross-team layer).
 * @param trial - Defaults to true (14-day trial before charge).
 */
export function buildProductCheckoutUrl(options: {
  product: PurchasableProductKey;
  plan?: "pro" | "business";
  trial?: boolean;
  seats?: number;
}): string {
  const plan = options.plan ?? (options.product === "nexus" ? "business" : "pro");
  const trial = options.trial ?? true;
  const params = new URLSearchParams();
  params.set("plan", plan);
  if (trial) {
    params.set("trial", "true");
  }
  if (options.seats && options.seats > 0) {
    params.set("seats", String(options.seats));
  }
  if (options.product === "atlas") {
    params.set("product", "atlas");
  } else {
    params.set("addons", options.product);
  }
  return `/pricing/checkout?${params.toString()}`;
}

export function isPurchasableProductKey(key: string): key is PurchasableProductKey {
  return (PURCHASABLE_PRODUCT_KEYS as readonly string[]).includes(key);
}
