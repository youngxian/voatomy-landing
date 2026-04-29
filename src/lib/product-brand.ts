/**
 * Per-product color systems. Informed by common *category* patterns in SaaS
 * marketing (not third-party brand copies): e.g. planning tools (warm + status
 * teal), revenue intelligence (indigo), quality gates (violet), incident
 * ops (red/amber on neutral), code health (cyan on deep base), multi-product
 * suites (emerald "control plane").
 */
export const productBrand = {
  /** ATLAS — sprint / planning: Voatomy orange + “healthy” teal (Jira/Linear category) */
  atlas: {
    accent: "#F16E2C",
    support: "#0F766E",
    accentLight: "rgba(241, 110, 44, 0.12)",
    heroGradient: `radial-gradient(ellipse, #F16E2C, transparent 72%)`,
    heroGradientSecondary: `radial-gradient(ellipse, #0F766E, transparent 68%)`,
  },
  /**
   * LOOP — customer ↔ engineering feedback (Gong/Intercom/HubSpot category
   * often uses deep blue/indigo, not the same as generic “dev purple”)
   */
  loop: {
    accent: "#4F46E5",
    secondary: "#7C3AED",
    accentLight: "rgba(79, 70, 229, 0.12)",
    borderSoft: "rgba(79, 70, 229, 0.3)",
    heroGradient: "radial-gradient(ellipse, #4F46E5, transparent 70%)",
    heroGradientSecondary: "radial-gradient(ellipse, #7C3AED, transparent 70%)",
  },
  /**
   * DRIFT — design–code quality (Snyk/Notion category: strong violet, audit feel)
   */
  drift: {
    accent: "#6D28D9",
    secondary: "#A78BFA",
    accentLight: "rgba(109, 40, 217, 0.12)",
    accentBorder: "rgba(109, 40, 217, 0.25)",
    heroGradient: "radial-gradient(ellipse, #6D28D9, transparent 70%)",
    heroGradientSecondary: "radial-gradient(ellipse, #A78BFA, transparent 70%)",
  },
  /**
   * SIGNAL — incidents / SRE (PagerDuty/Datadog category: crimson + ops amber, not “error pink”)
   */
  signal: {
    accent: "#DC2626",
    secondary: "#EA580C",
    accentLight: "rgba(220, 38, 38, 0.12)",
    accentGlow: "rgba(220, 38, 38, 0.25)",
    heroGradient: "radial-gradient(ellipse, #DC2626, transparent 70%)",
    heroGradientSecondary: "radial-gradient(ellipse, #EA580C, transparent 68%)",
  },
  /**
   * PHANTOM — tech debt / static analysis (Sonar/Code Climate category: analytical cyan, dark base)
   */
  phantom: {
    accent: "#22D3EE",
    deep: "#0E7490",
    dim: "rgba(14, 116, 144, 0.18)",
    glow: "rgba(34, 211, 238, 0.2)",
    heroGradient: "radial-gradient(ellipse, #0E7490, transparent 72%)",
    heroGradientSecondary: "radial-gradient(ellipse, #22D3EE, transparent 70%)",
  },
  /**
   * NEXUS — unified org suite (iPaaS/enterprise “single pane” category: confident emerald)
   */
  nexus: {
    accent: "#10B981",
    deep: "#047857",
    secondary: "#34D399",
    heroGradient: "radial-gradient(ellipse, #047857, transparent 72%)",
    heroGradientSecondary: "radial-gradient(ellipse, #10B981, transparent 70%)",
  },
} as const;

export type ProductBrandKey = keyof typeof productBrand;

/**
 * Blurred orbs + vertical wash for `ProductHeroAtmosphere` (Tailwind class strings).
 * Each product has a different silhouette + motion pairing in the component.
 */
export const productHeroAtmosphere = {
  atlas: {
    orbs: [
      "from-[#F16E2C]/30 via-[#F16E2C]/12 to-transparent",
      "from-[#0F766E]/22 via-[#0F766E]/8 to-transparent",
      "from-amber-400/12 to-transparent",
    ] as const,
    wash: "from-theme/82 via-[#F16E2C]/[0.04] to-theme",
  },
  loop: {
    orbs: [
      "from-[#4F46E5]/28 via-[#6366F1]/10 to-transparent",
      "from-[#7C3AED]/18 to-transparent",
      "from-sky-400/8 to-transparent",
    ] as const,
    wash: "from-theme/88 via-[#4F46E5]/[0.05] to-theme",
  },
  drift: {
    orbs: [
      "from-[#6D28D9]/26 via-[#7C3AED]/10 to-transparent",
      "from-fuchsia-500/12 to-transparent",
      "from-violet-400/8 to-transparent",
    ] as const,
    wash: "from-theme/90 via-[#6D28D9]/[0.05] to-theme",
  },
  signal: {
    orbs: [
      "from-[#DC2626]/24 via-[#F97316]/10 to-transparent",
      "from-amber-500/10 to-transparent",
      "from-rose-500/8 to-transparent",
    ] as const,
    wash: "from-theme/90 via-red-500/[0.04] to-theme",
  },
  phantom: {
    orbs: [
      "from-[#0E7490]/20 via-cyan-500/10 to-transparent",
      "from-[#22D3EE]/10 to-transparent",
      "from-slate-500/5 to-transparent",
    ] as const,
    wash: "from-slate-950/45 via-cyan-950/12 to-[#0b1120]",
  },
  nexus: {
    orbs: [
      "from-[#047857]/18 via-[#10B981]/10 to-transparent",
      "from-[#F97316]/8 to-transparent",
      "from-[#6366F1]/6 to-transparent",
    ] as const,
    wash: "from-[#050807] via-[#060a08]/80 to-[#050807]",
  },
} as const;
