import type { IntegrationKey, ProductKey, StartupIdeaTemplate } from "@/types";
import { PRODUCT_MODULES } from "@/lib/product-onboarding-config";

/** Primary integrations recommended during org onboarding (Tier 1). */
const TEMPLATE_INTEGRATIONS: Record<StartupIdeaTemplate, IntegrationKey[]> = {
  atlas: ["github", "jira", "slack"],
  signal: ["datadog", "pagerduty", "salesforce", "slack"],
  loop: ["jira", "salesforce", "gong", "zendesk"],
  drift: ["figma", "github"],
  phantom: ["github"],
  nexus: ["github", "jira", "salesforce", "slack"],
};

const PRODUCT_INTEGRATIONS: Record<ProductKey, IntegrationKey[]> = {
  atlas: ["github", "jira", "linear"],
  loop: ["salesforce", "hubspot", "gong", "zendesk"],
  signal: ["datadog", "pagerduty", "salesforce"],
  drift: ["figma", "github"],
  phantom: ["github", "gitlab"],
  nexus: ["github", "jira", "slack"],
};

export function getRecommendedIntegrationKeys(
  template: StartupIdeaTemplate | "",
  primaryProduct: ProductKey | "",
  licensedProducts: ProductKey[] = [],
): IntegrationKey[] {
  const fromTemplate = template ? TEMPLATE_INTEGRATIONS[template] ?? [] : [];
  const fromPrimary = primaryProduct ? PRODUCT_INTEGRATIONS[primaryProduct] ?? [] : [];
  const fromLicensed: IntegrationKey[] = [];
  for (const p of licensedProducts) {
    for (const key of PRODUCT_INTEGRATIONS[p] ?? []) {
      if (!fromLicensed.includes(key)) fromLicensed.push(key);
    }
  }
  const seen = new Set<IntegrationKey>();
  const result: IntegrationKey[] = [];
  for (const key of [...fromPrimary, ...fromTemplate, ...fromLicensed]) {
    if (!seen.has(key)) {
      seen.add(key);
      result.push(key);
    }
  }
  return result.slice(0, 3);
}

export function getPrimaryProductLabel(product: ProductKey): string {
  return PRODUCT_MODULES[product]?.label ?? product;
}
