/** Static content for the Fynk-inspired pricing page */

export const PRICING_HERO = {
  title: "Fair pricing. Serious outcomes.",
  subtitle:
    "Start free, scale when you're ready. Every plan includes the core intelligence to turn your backlog into sprints your company can commit to — with no hidden fees or lock-in contracts.",
} as const;

export const PRICING_SECTIONS = {
  valueEyebrow: "Why Voatomy",
  valueTitle: "Everything you need.",
  valueTitleAccent: "Nothing you don't.",
  valueSubtitle: "Four reasons fast-growing companies choose Voatomy over duct-taping five other tools together.",
  beforeAfterTitle: "Before vs. after.",
  testimonialsTitle: "Teams that switched don't go back.",
  impactTitle: "Real impact. Every department.",
  impactSubtitle:
    "Voatomy pays for itself in the first sprint cycle. Here's what companies like yours achieve after switching.",
  comparisonTitle: "Plans and features",
  faqTitle: "Frequently asked questions.",
  ctaEyebrow: "Need help choosing?",
  ctaTitle: "Not sure which plan is",
  ctaTitleAccent: "right?",
  ctaSubtitle:
    "Tell us about your team size, stack, and goals. We'll recommend the plan that gets you to value fastest — zero pressure, zero sales theater.",
  ctaPrimary: "Talk to sales",
  ctaSecondary: "Start free",
  ctaFootnote: "Free plan forever. No credit card. Upgrade or cancel anytime.",
} as const;

export const PRICING_TRUST_LOGOS = [
  "Linear",
  "GitHub",
  "Jira",
  "Slack",
  "Notion",
  "Figma",
  "Vercel",
  "HubSpot",
  "Stripe",
  "Shopify",
  "Datadog",
  "Sentry",
  "Airbnb",
  "Asana",
] as const;

export const PRICING_VALUE_PILLARS = [
  {
    title: "No limits on what matters",
    description: "Unlimited teams, repos, and AI sprint plans on every paid tier — grow without hitting artificial walls.",
    icon: "infinity",
    accent: "#004838",
    light: "#e6fff0",
    stat: "∞",
    statLabel: "always included",
    chips: ["Teams", "Repos", "Sprint plans"],
  },
  {
    title: "Value on day one",
    description: "Connect GitHub in minutes. Your first defensible AI sprint plan in under 10 — no consultants required.",
    icon: "rocket",
    accent: "#0EA5E9",
    light: "#F0F9FF",
    stat: "<10",
    statLabel: "min to first plan",
    chips: ["GitHub OAuth", "Zero config"],
  },
  {
    title: "Enterprise-grade security",
    description: "SOC 2 aligned, TLS 1.3, AES-256 encryption. We analyze metadata only — your source code never leaves your repos.",
    icon: "shield",
    accent: "#073127",
    light: "#EBEDE8",
    stat: "256",
    statLabel: "bit encryption",
    chips: ["SOC 2", "TLS 1.3", "No code storage"],
  },
  {
    title: "Scales with your company",
    description: "From 2 seats to 2,000 — one platform, predictable pricing, no renegotiation every time you hire.",
    icon: "growth",
    accent: "#F05A28",
    light: "#FFF4EF",
    stat: "2K",
    statLabel: "seats, one plan",
    chips: ["No re-platforming", "Flat pricing"],
  },
] as const;

export const PRICING_SECURITY_FEATURES = [
  {
    title: "Built for engineering trust.",
    description:
      "Read-only API access, metadata-only analysis. Your codebase stays in your repos — always.",
    icon: "eu",
    side: "left" as const,
  },
  {
    title: "Securely stored.",
    description:
      "Data encrypted at rest and in transit. Monitored around the clock with automated alerting.",
    icon: "lock",
    side: "left" as const,
  },
  {
    title: "Access on your terms.",
    description:
      "SSO, SAML, and SCIM on Enterprise. RBAC, audit logs, and two-factor authentication.",
    icon: "key",
    side: "right" as const,
  },
  {
    title: "Compliance embedded.",
    description:
      "SOC 2 aligned controls, GDPR-ready data handling, and regular external security audits.",
    icon: "gdpr",
    side: "right" as const,
  },
] as const;

export const PRICING_BEFORE = {
  label: "WITHOUT VOATOMY",
  title: "Every team uses a different tool — and no one agrees on priorities.",
  subtitle: "Spreadsheets, Slack threads, and gut-feel estimates cost you sprints, not just meetings.",
  items: [
    "No single source of truth for the sprint",
    "Hours lost switching between apps",
    "Decisions buried in chat history",
    "Estimates nobody trusts at commit time",
  ],
} as const;

export const PRICING_AFTER = {
  label: "WITH VOATOMY",
  title: "One intelligence layer from code to customer revenue.",
  subtitle: "Every stakeholder sees the same plan — backed by data, not opinions.",
  items: ["One platform", "Predictable pricing", "Secure by default", "Leave anytime — your data comes with you"],
} as const;

export const PRICING_TESTIMONIALS = [
  {
    quote:
      "Voatomy is a **game-changer** for our engineering org. Sprint accuracy went from guesswork to **87% in three sprints**.",
    author: "Sarah K.",
    role: "CTO, Series B SaaS",
    rating: "5/5",
    bg: "#FEF9C3",
    highlight: "#FDE047",
  },
  {
    quote:
      "We cut planning from **2 hours to 20 minutes**. The team actually trusts the estimates now.",
    author: "Marcus T.",
    role: "Engineering Manager",
    rating: "5/5",
    bg: "#FCE7F3",
    highlight: "#F9A8D4",
  },
  {
    quote:
      "Finally a tool that **gets our codebase**. No more story-point theater.",
    author: "Priya S.",
    role: "Product Manager",
    rating: "5/5",
    bg: "#FFEDD5",
    highlight: "#FDBA74",
  },
  {
    quote:
      "The **flexible licensing** was the biggest unlock. Two seats, full platform — low-risk entry.",
    author: "James L.",
    role: "Tech Lead",
    rating: "5/5",
    bg: "#DBEAFE",
    highlight: "#93C5FD",
  },
  {
    quote:
      "Shipping quality improved immediately. **Dependencies and risks** are visible before blockers.",
    author: "Elena R.",
    role: "VP Engineering",
    rating: "5/5",
    bg: "#D1FAE5",
    highlight: "#6EE7B7",
  },
  {
    quote:
      "Voatomy pricing and velocity are **hard to beat**. We run sprints with confidence every week.",
    author: "Adam J.",
    role: "Senior Engineer",
    rating: "5/5",
    bg: "#EDE9FE",
    highlight: "#C4B5FD",
  },
] as const;

export const PRICING_IMPACT_CARDS = [
  { dept: "LEADERSHIP", stat: "30%", detail: "fewer planning bottlenecks", color: "#2563EB" },
  { dept: "ENGINEERING", stat: "80%", detail: "less time in estimation meetings", color: "#CA8A04" },
  { dept: "PRODUCT", stat: "25%", detail: "faster priority decisions", color: "#F05A28" },
  { dept: "REVOPS", stat: "15%", detail: "more revenue-weighted backlog", color: "#15803D" },
  { dept: "OPERATIONS", stat: "2×", detail: "faster team onboarding", color: "#DB2777" },
  { dept: "PLATFORM", stat: "2×", detail: "faster cross-team approvals", color: "#0284C7" },
] as const;

export const PRICING_FEATURED_QUOTE = {
  quote:
    "The biggest advantage of Voatomy for us was the flexible licensing model. We were able to start with just two licenses while still connecting more than 2,000 tickets and setting up the system. This saved us significant costs and enabled a low-risk entry.",
  highlight: "just two licenses while still connecting more than 2,000 tickets",
  author: "Peter Schmalfuß",
  role: "Head of Engineering · StreamView GmbH",
  company: "StreamView",
} as const;

export const PRICING_FAQS = [
  {
    question: "What pricing plans do you offer?",
    answer:
      "We offer Starter (free), Pro, Business, and Enterprise. Starter includes ATLAS with limited AI sprint plans. Pro unlocks unlimited planning for growing teams. Business adds cross-team visibility, CRM integrations, and API access. Enterprise includes full NEXUS, SSO/SAML, and custom SLAs.",
  },
  {
    question: "Is there a free trial available, and how does it work?",
    answer:
      "Yes. Pro and Business include a 14-day free trial with full feature access — no credit card required. Starter is free forever with generous limits. Upgrade anytime; your data carries over instantly.",
  },
  {
    question: "Can I change my plan later?",
    answer:
      "Absolutely. Upgrades take effect immediately with prorated billing. Downgrades apply at the end of your billing cycle. No cancellation fees, no lock-in contracts.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "Visa, Mastercard, Amex, and ACH for annual plans. Enterprise customers can pay via invoice with NET-30 terms. All payments are processed securely through Stripe.",
  },
  {
    question: "Is there a discount for annual versus monthly billing?",
    answer:
      "Yes — pay yearly and save 20% on Pro and Business. Toggle \"Pay yearly\" at the top of this page to see annual pricing.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Cancel anytime from your account settings. Monthly plans end at the current period. Annual plans keep access through the end of your paid year. We export all your data on request.",
  },
  {
    question: "How do you handle data security and privacy?",
    answer:
      "TLS 1.3 in transit, AES-256 at rest. Read-only repo access — we never store source code. SOC 2 aligned controls, GDPR-ready processing, and audit logs on Business and Enterprise.",
  },
] as const;

export const TIER_VISUALS: Record<
  string,
  { gradient: string; iconBg: string; doodle: "spark" | "bolt" | "trophy" | "crown" }
> = {
  Starter: { gradient: "from-blue-50 to-white", iconBg: "#DBEAFE", doodle: "spark" },
  Pro: { gradient: "from-orange-50 to-white", iconBg: "#FFEDD5", doodle: "bolt" },
  Business: { gradient: "from-amber-50 to-white", iconBg: "#FEF3C7", doodle: "trophy" },
  Enterprise: { gradient: "from-violet-50 to-white", iconBg: "#EDE9FE", doodle: "crown" },
};

export type ComparisonTierKey = "starter" | "pro" | "business" | "enterprise";

export interface PricingComparisonGroup {
  group: string;
  tagColor: string;
  tagBg: string;
  icon: string;
  rows: { feature: string; starter: string; pro: string; business: string; enterprise: string }[];
}

export const PRICING_COMPARISON_GROUPS: PricingComparisonGroup[] = [
  {
    group: "Sprint Planning (ATLAS)",
    tagColor: "#2563EB",
    tagBg: "#DBEAFE",
    icon: "🎯",
    rows: [
      { feature: "AI sprint plans", starter: "2/month", pro: "Unlimited", business: "Unlimited", enterprise: "Unlimited" },
      { feature: "Teams & repos", starter: "1 each", pro: "Unlimited", business: "Unlimited", enterprise: "Unlimited" },
      { feature: "Code complexity analysis", starter: "✓", pro: "✓", business: "✓", enterprise: "✓" },
      { feature: "Team capacity modeling", starter: "—", pro: "✓", business: "✓", enterprise: "✓" },
      { feature: "Accuracy tracking", starter: "Basic", pro: "Advanced", business: "Advanced", enterprise: "Custom" },
    ],
  },
  {
    group: "Integrations",
    tagColor: "#7C3AED",
    tagBg: "#EDE9FE",
    icon: "🔗",
    rows: [
      { feature: "GitHub, GitLab, Bitbucket", starter: "✓", pro: "✓", business: "✓", enterprise: "✓" },
      { feature: "Jira, Linear, Asana", starter: "—", pro: "✓", business: "✓", enterprise: "✓" },
      { feature: "Slack & Microsoft Teams", starter: "—", pro: "✓", business: "✓", enterprise: "✓" },
      { feature: "Salesforce & HubSpot", starter: "—", pro: "—", business: "✓", enterprise: "✓" },
      { feature: "API, webhooks & SDKs", starter: "—", pro: "—", business: "✓", enterprise: "✓" },
    ],
  },
  {
    group: "Workflow & Collaboration",
    tagColor: "#DB2777",
    tagBg: "#FCE7F3",
    icon: "👥",
    rows: [
      { feature: "Users", starter: "Up to 8", pro: "Up to 50", business: "Up to 500", enterprise: "Unlimited" },
      { feature: "Cross-team dependencies", starter: "—", pro: "—", business: "✓", enterprise: "✓" },
      { feature: "Multi-team dashboards", starter: "—", pro: "—", business: "✓", enterprise: "✓" },
      { feature: "Custom workflows", starter: "—", pro: "Basic", business: "Advanced", enterprise: "Full" },
      { feature: "Guest access", starter: "—", pro: "—", business: "5 seats", enterprise: "Unlimited" },
    ],
  },
  {
    group: "Security & Compliance",
    tagColor: "#059669",
    tagBg: "#D1FAE5",
    icon: "🔒",
    rows: [
      { feature: "TLS 1.3 + AES-256 encryption", starter: "✓", pro: "✓", business: "✓", enterprise: "✓" },
      { feature: "SSO / SAML / SCIM", starter: "—", pro: "—", business: "—", enterprise: "✓" },
      { feature: "RBAC & audit logs", starter: "—", pro: "—", business: "Basic", enterprise: "Full" },
      { feature: "SOC 2 compliance package", starter: "—", pro: "—", business: "—", enterprise: "✓" },
      { feature: "VPC / on-prem deployment", starter: "—", pro: "—", business: "—", enterprise: "✓" },
    ],
  },
  {
    group: "Support",
    tagColor: "#0284C7",
    tagBg: "#E0F2FE",
    icon: "💬",
    rows: [
      { feature: "Community (Discord)", starter: "✓", pro: "✓", business: "✓", enterprise: "✓" },
      { feature: "Email support", starter: "—", pro: "24h", business: "4h", enterprise: "1h" },
      { feature: "Priority support", starter: "—", pro: "—", business: "✓", enterprise: "✓" },
      { feature: "Dedicated CSM & SLA", starter: "—", pro: "—", business: "—", enterprise: "✓" },
      { feature: "Executive business reviews", starter: "—", pro: "—", business: "—", enterprise: "Quarterly" },
    ],
  },
];
