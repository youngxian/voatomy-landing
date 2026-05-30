import type { ProductKey, Purpose, StartupIdeaTemplate, OnboardingStep } from "@/types";

/** Per-product onboarding module — composable sub-journey (Atlassian / HubSpot PLG pattern). */
export interface ProductOnboardingModule {
  key: ProductKey;
  label: string;
  tagline: string;
  icon: string;
  color: string;
  /** Workspace purpose values tied to this product */
  purposes: Purpose[];
  /** Product-specific steps injected between workspace and team */
  steps: OnboardingStep[];
  /** Show sprint cadence + atlas-style AI toggles in org customize step */
  showSprintSettings: boolean;
  /** Show board/project picker after connect */
  showBoardPicker: boolean;
  launchCta: string;
  welcomeSummary: string;
  /** 3 bullet points shown on the product context card during welcome */
  setupBullets: string[];
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
    color: "#F05A28",
    purposes: ["sprint-planning", "project-management", "capacity-planning"],
    steps: ["atlas-connect", "atlas-board", "atlas-sprint"],
    showSprintSettings: true,
    showBoardPicker: true,
    launchCta: "Open Atlas",
    welcomeSummary: "Plan sprints with AI from your board and repos",
    setupBullets: [
      "Connect your code repo and project board",
      "Pick your active project and sprint cadence",
      "Atlas AI learns your team's velocity automatically",
    ],
    connectBlurb: "Connect your project board and repo — deeper setup continues in Atlas.",
    customizeBlurb: "Sprint alerts, AI assistant mode, and dashboard preferences",
    notificationBlurb: "Sprint updates, AI insights, and standup reminders",
  },
  signal: {
    key: "signal",
    label: "Signal",
    tagline: "Incident Intelligence",
    icon: "📡",
    color: "#EF4444",
    purposes: ["incident-management"],
    steps: ["signal-connect", "signal-catalog", "signal-routing"],
    showSprintSettings: false,
    showBoardPicker: false,
    launchCta: "Open Signal",
    welcomeSummary: "Revenue-aware incident response and impact routing",
    setupBullets: [
      "Connect observability and alerting tools",
      "Define your service catalog and SLA tiers",
      "Configure revenue-aware escalation routing",
    ],
    connectBlurb: "Connect observability and CRM — service catalog setup continues in Signal.",
    customizeBlurb: "Incident alerts and executive notification preferences",
    notificationBlurb: "Incident escalations, revenue impact alerts, and SLA breaches",
  },
  loop: {
    key: "loop",
    label: "Loop",
    tagline: "Product-Revenue Feedback",
    icon: "🔄",
    color: "#8B5CF6",
    purposes: ["revenue-intelligence"],
    steps: ["loop-connect", "loop-signals"],
    showSprintSettings: false,
    showBoardPicker: false,
    launchCta: "Open Loop",
    welcomeSummary: "Align backlog with customer demand and pipeline",
    setupBullets: [
      "Connect your CRM and customer support tools",
      "Select the revenue signals that matter to you",
      "Loop maps demand signals directly to your backlog",
    ],
    connectBlurb: "Connect CRM and support tools — pipeline mapping continues in Loop.",
    customizeBlurb: "Revenue signal digests and GTM notification preferences",
    notificationBlurb: "Customer demand signals, pipeline shifts, and feature ship alerts",
  },
  drift: {
    key: "drift",
    label: "Drift",
    tagline: "Design System Guardian",
    icon: "🎨",
    color: "#EC4899",
    purposes: ["design-governance"],
    steps: ["drift-connect", "drift-config"],
    showSprintSettings: false,
    showBoardPicker: false,
    launchCta: "Open Drift",
    welcomeSummary: "Detect design-code drift and UX regressions",
    setupBullets: [
      "Connect Figma and your code repository",
      "Set scan frequency and drift severity thresholds",
      "Drift monitors every commit against your design system",
    ],
    connectBlurb: "Connect Figma and your repo — drift scans continue in Drift.",
    customizeBlurb: "Design drift alerts and governance notifications",
    notificationBlurb: "Design-code drift reports and component health alerts",
  },
  phantom: {
    key: "phantom",
    label: "Phantom",
    tagline: "Technical Debt Radar",
    icon: "👻",
    color: "#6366F1",
    purposes: ["tech-debt-tracking"],
    steps: ["phantom-connect", "phantom-config"],
    showSprintSettings: false,
    showBoardPicker: false,
    launchCta: "Open Phantom",
    welcomeSummary: "Find debt hotspots with cost and risk scoring",
    setupBullets: [
      "Connect your code repository",
      "Choose debt categories and scoring weights",
      "Phantom surfaces hotspots with cost and risk estimates",
    ],
    connectBlurb: "Connect your repo — debt analysis continues in Phantom.",
    customizeBlurb: "Tech debt digest and refactor ROI notifications",
    notificationBlurb: "Debt hotspot alerts and refactor opportunity digests",
  },
  nexus: {
    key: "nexus",
    label: "Nexus",
    tagline: "Org Nerve Center",
    icon: "⚡",
    color: "#0EA5E9",
    purposes: ["cross-team-alignment"],
    steps: ["nexus-connect", "nexus-products", "customize"],
    showSprintSettings: false,
    showBoardPicker: false,
    launchCta: "Open Nexus",
    welcomeSummary: "Cross-product intelligence for leadership",
    setupBullets: [
      "Connect all your tools across teams",
      "Choose which products feed the Nexus graph",
      "Configure your executive briefing and alert preferences",
    ],
    connectBlurb: "Broad integrations unlock deeper org intelligence in Nexus.",
    customizeBlurb: "Executive briefings and cross-product alert preferences",
    notificationBlurb: "Org health scores and cross-functional insight digests",
  },
};

/** Steps injected between workspace and team for each product. */
export const PRODUCT_STEP_MAP: Record<ProductKey, OnboardingStep[]> = Object.fromEntries(
  (Object.keys(PRODUCT_MODULES) as ProductKey[]).map((k) => [k, PRODUCT_MODULES[k].steps]),
) as Record<ProductKey, OnboardingStep[]>;

/** Compute the full step order for a given primary product. */
export function computeStepOrder(primaryProduct: string): OnboardingStep[] {
  const productSteps = PRODUCT_STEP_MAP[primaryProduct as ProductKey] ?? ["connect", "customize"];
  return ["welcome", "workspace", ...productSteps, "team", "launch"];
}

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
