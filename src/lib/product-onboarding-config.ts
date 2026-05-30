import type { ProductKey, Purpose, StartupIdeaTemplate } from "@/types";

/** Per-product onboarding module — composable sub-journey (Atlassian / HubSpot PLG pattern). */
export interface ProductOnboardingModule {
  key: ProductKey;
  label: string;
  tagline: string;
  icon: string;
  /** Workspace purpose values tied to this product */
  purposes: Purpose[];
  /** Show sprint cadence + atlas-style AI toggles in org customize step */
  showSprintSettings: boolean;
  /** Show board/project picker after connect */
  showBoardPicker: boolean;
  launchCta: string;
  welcomeSummary: string;
  connectBlurb: string;
  customizeBlurb: string;
  notificationBlurb: string;
}

export const PRODUCT_MODULES: Record<ProductKey, ProductOnboardingModule> = {
  atlas: {
    key: "atlas",
    label: "Atlas",
    tagline: "AI Sprint Planner",
    icon: "🗺️",
    purposes: ["sprint-planning", "project-management", "capacity-planning"],
    showSprintSettings: true,
    showBoardPicker: true,
    launchCta: "Open Atlas",
    welcomeSummary: "Plan sprints with AI from your board and repos",
    connectBlurb: "Connect your project board and repo — deeper setup continues in Atlas.",
    customizeBlurb: "Sprint alerts, AI assistant mode, and dashboard preferences",
    notificationBlurb: "Sprint updates, AI insights, and standup reminders",
  },
  signal: {
    key: "signal",
    label: "Signal",
    tagline: "Incident Intelligence",
    icon: "📡",
    purposes: ["incident-management"],
    showSprintSettings: false,
    showBoardPicker: false,
    launchCta: "Open Signal",
    welcomeSummary: "Revenue-aware incident response and impact routing",
    connectBlurb: "Connect observability and CRM — service catalog setup continues in Signal.",
    customizeBlurb: "Incident alerts and executive notification preferences",
    notificationBlurb: "Incident escalations, revenue impact alerts, and SLA breaches",
  },
  loop: {
    key: "loop",
    label: "Loop",
    tagline: "Product-Revenue Feedback",
    icon: "🔄",
    purposes: ["revenue-intelligence"],
    showSprintSettings: false,
    showBoardPicker: false,
    launchCta: "Open Loop",
    welcomeSummary: "Align backlog with customer demand and pipeline",
    connectBlurb: "Connect CRM and support tools — pipeline mapping continues in Loop.",
    customizeBlurb: "Revenue signal digests and GTM notification preferences",
    notificationBlurb: "Customer demand signals, pipeline shifts, and feature ship alerts",
  },
  drift: {
    key: "drift",
    label: "Drift",
    tagline: "Design System Guardian",
    icon: "🎨",
    purposes: ["design-governance"],
    showSprintSettings: false,
    showBoardPicker: false,
    launchCta: "Open Drift",
    welcomeSummary: "Detect design-code drift and UX regressions",
    connectBlurb: "Connect Figma and your repo — drift scans continue in Drift.",
    customizeBlurb: "Design drift alerts and governance notifications",
    notificationBlurb: "Design-code drift reports and component health alerts",
  },
  phantom: {
    key: "phantom",
    label: "Phantom",
    tagline: "Technical Debt Radar",
    icon: "👻",
    purposes: ["tech-debt-tracking"],
    showSprintSettings: false,
    showBoardPicker: false,
    launchCta: "Open Phantom",
    welcomeSummary: "Find debt hotspots with cost and risk scoring",
    connectBlurb: "Connect your repo — debt analysis continues in Phantom.",
    customizeBlurb: "Tech debt digest and refactor ROI notifications",
    notificationBlurb: "Debt hotspot alerts and refactor opportunity digests",
  },
  nexus: {
    key: "nexus",
    label: "Nexus",
    tagline: "Org Nerve Center",
    icon: "⚡",
    purposes: ["cross-team-alignment"],
    showSprintSettings: false,
    showBoardPicker: false,
    launchCta: "Open Nexus",
    welcomeSummary: "Cross-product intelligence for leadership",
    connectBlurb: "Broad integrations unlock deeper org intelligence in Nexus.",
    customizeBlurb: "Executive briefings and cross-product alert preferences",
    notificationBlurb: "Org health scores and cross-functional insight digests",
  },
};

export const IDEA_TEMPLATE_OPTIONS = (Object.keys(PRODUCT_MODULES) as ProductKey[])
  .filter((k) => k !== "nexus")
  .map((key) => ({
    key: key as StartupIdeaTemplate,
    title: PRODUCT_MODULES[key].tagline,
    summary: PRODUCT_MODULES[key].welcomeSummary,
    hint: PRODUCT_MODULES[key].label,
    icon: PRODUCT_MODULES[key].icon,
  }));

/** Entitlement-first primary product: paid/licensed products win over idea template. */
export function resolvePrimaryProduct(
  licensedProducts: ProductKey[],
  template: StartupIdeaTemplate | "",
  storedPrimary?: ProductKey | "",
): ProductKey {
  if (storedPrimary && licensedProducts.includes(storedPrimary)) {
    return storedPrimary;
  }
  if (template && licensedProducts.includes(template)) {
    return template;
  }
  const nonNexus = licensedProducts.filter((p) => p !== "nexus");
  if (nonNexus.length > 0) return nonNexus[0];
  return licensedProducts[0] ?? "atlas";
}

export function filterLicensedTemplates(
  licensedProducts: ProductKey[],
): typeof IDEA_TEMPLATE_OPTIONS {
  const licensed = new Set(licensedProducts.filter((p) => p !== "nexus"));
  return IDEA_TEMPLATE_OPTIONS.filter((t) => licensedProducts.includes(t.key));
}

export function purposesForLicensedProducts(licensedProducts: ProductKey[]): Purpose[] {
  const seen = new Set<Purpose>();
  for (const p of licensedProducts) {
    for (const purpose of PRODUCT_MODULES[p].purposes) {
      seen.add(purpose);
    }
  }
  return Array.from(seen);
}

export interface ResolvedProductOnboarding {
  licensedProducts: ProductKey[];
  primaryProduct: ProductKey;
  primaryModule: ProductOnboardingModule;
  /** Union of modules for all licensed products */
  showSprintSettings: boolean;
  showBoardPicker: boolean;
  singleProductMode: boolean;
  availableTemplates: typeof IDEA_TEMPLATE_OPTIONS;
}

export function resolveProductOnboarding(
  licensedProducts: ProductKey[],
  template: StartupIdeaTemplate | "",
  storedPrimary?: ProductKey | "",
): ResolvedProductOnboarding {
  const primaryProduct = resolvePrimaryProduct(licensedProducts, template, storedPrimary);
  const primaryModule = PRODUCT_MODULES[primaryProduct];
  const availableTemplates = filterLicensedTemplates(licensedProducts);
  const singleProductMode = licensedProducts.filter((p) => p !== "nexus").length === 1;

  return {
    licensedProducts,
    primaryProduct,
    primaryModule,
    showSprintSettings: licensedProducts.some((p) => PRODUCT_MODULES[p].showSprintSettings),
    showBoardPicker: primaryModule.showBoardPicker,
    singleProductMode,
    availableTemplates,
  };
}

export function getProductLabel(product: ProductKey): string {
  return PRODUCT_MODULES[product]?.label ?? product;
}
