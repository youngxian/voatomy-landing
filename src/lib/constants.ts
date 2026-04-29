import type { Purpose } from "@/types";

export const SITE_CONFIG = {
  name: "Voatomy",
  tagline: "The AI Product Operating System",
  description:
    "Defensible sprint plans from code complexity, team capacity, tech-debt cost, and revenue weighting—so your team ships the right work, not the loudest work. ATLAS is the entry wedge into the full Voatomy platform.",
  url: "https://voatomy.global",
  ogImage: "/images/og.png",
} as const;

// ---------- PRODUCT IDENTITY ----------

export const PRODUCTS = [
  {
    key: "atlas",
    name: "ATLAS",
    tagline: "AI Sprint Planner",
    description:
      "Code-aware sprint plans that factor capacity, tech-debt cost, and revenue—so the plan matches reality.",
    icon: "🎯",
    color: "#f16e2c",
    status: "available" as const,
    statusLabel: "Available now",
    href: "/products/atlas",
  },
  {
    key: "loop",
    name: "LOOP",
    tagline: "Revenue Feedback Engine",
    description:
      "Close the loop between customer demand and engineering delivery.",
    icon: "🔄",
    color: "#6366F1",
    status: "coming-soon" as const,
    statusLabel: "Coming Q3 2026",
    href: "/products/loop",
  },
  {
    key: "signal",
    name: "SIGNAL",
    tagline: "Incident Intelligence",
    description:
      "Translate incidents into revenue impact for SRE/DevOps teams.",
    icon: "🚨",
    color: "#EF4444",
    status: "future" as const,
    statusLabel: "Coming 2027",
    href: "/products/signal",
  },
  {
    key: "drift",
    name: "DRIFT",
    tagline: "Design System Sync",
    description:
      "Keep Figma designs and code components in permanent sync.",
    icon: "🎨",
    color: "#8B5CF6",
    status: "coming-soon" as const,
    statusLabel: "Coming Q4 2026",
    href: "/products/drift",
  },
  {
    key: "phantom",
    name: "PHANTOM",
    tagline: "Tech Debt Radar",
    description:
      "Tech debt visible in dollars for leadership — not jargon.",
    icon: "👻",
    color: "#22D3EE",
    status: "coming-soon" as const,
    statusLabel: "Coming Q3 2026",
    href: "/products/phantom",
  },
  {
    key: "nexus",
    name: "NEXUS",
    tagline: "Full Platform",
    description:
      "All products unified into one AI organizational nerve center.",
    icon: "🧠",
    color: "url(#nexus-gradient)",
    status: "future" as const,
    statusLabel: "Coming 2027",
    href: "/products/nexus",
  },
] as const;

/** Interactive demo routes: each product's `/products/{slug}/demo` page. Used in nav and footer. */
export const PRODUCT_DEMO_LINKS: { key: string; label: string; href: string }[] = PRODUCTS.map(
  (p) => ({
    key: p.key,
    label: p.name,
    href: `${p.href}/demo`,
  }),
);

export const PLATFORM_DIFFERENTIATORS = [
  {
    icon: "🔗",
    title: "Connect all teams",
    description: "Engineering, design, product, sales — all in one loop.",
  },
  {
    icon: "🧠",
    title: "AI-native estimation",
    description: "Code complexity analysis powers every sprint plan.",
  },
  {
    icon: "📊",
    title: "Revenue-aware decisions",
    description: "Business priority informs every trade-off.",
  },
  {
    icon: "🔒",
    title: "Enterprise-grade security",
    description: "Never stores source code. SOC 2 ready.",
  },
] as const;

// ---------- NAVIGATION ----------

export const NAV_LINKS = {
  solutions: {
    byRole: [
      {
        icon: "👨‍💼",
        title: "Engineering Managers",
        description: "AI-driven sprint plans, accurate estimates, tech debt visibility",
        href: "/solutions/engineering-managers",
      },
      {
        icon: "📊",
        title: "Product Leaders",
        description: "Revenue-weighted backlogs, customer signal alignment",
        href: "/solutions/product-leaders",
      },
      {
        icon: "🏛",
        title: "CTO & VP Engineering",
        description: "Board-ready metrics, velocity justification, org-wide visibility",
        href: "/solutions/cto-vp-engineering",
      },
      {
        icon: "📈",
        title: "Sales Leaders",
        description: "Pipeline clarity, ship dates, and revenue-aligned enablement",
        href: "/solutions/sales-leaders",
      },
      {
        icon: "🤝",
        title: "Customer Success",
        description: "Proactive health signals, incidents, and retention intelligence",
        href: "/solutions/customer-success",
      },
      {
        icon: "🛠",
        title: "SRE / DevOps",
        description: "Revenue-aware incidents, alert intelligence",
        href: "/solutions/sre-devops",
      },
      {
        icon: "🎨",
        title: "Design Teams",
        description: "Design system governance, code sync, UX analytics",
        href: "/solutions/design-teams",
      },
    ],
    byUseCase: [
      {
        icon: "📋",
        title: "Sprint Planning",
        description: "Replace gut-feel with data-driven estimation",
        href: "/use-cases/sprint-planning",
      },
      {
        icon: "🔄",
        title: "Feedback to Roadmap",
        description: "Customer demand directly into sprint prioritization",
        href: "/use-cases/feedback-roadmap",
      },
      {
        icon: "🏢",
        title: "Cross-Team Alignment",
        description: "Connect engineering, design, product, sales",
        href: "/use-cases/cross-team",
      },
      {
        icon: "💰",
        title: "Revenue Intelligence",
        description: "Link customer feedback to business outcomes",
        href: "/use-cases/revenue-intelligence",
      },
      {
        icon: "🚨",
        title: "Incident Intelligence",
        description: "Revenue-aware triage, routing, and customer impact",
        href: "/use-cases/incident-intelligence",
      },
      {
        icon: "🎨",
        title: "Design System Health",
        description: "Figma-to-code drift monitoring and coverage",
        href: "/use-cases/design-system-health",
      },
      {
        icon: "👻",
        title: "Tech Debt Management",
        description: "Debt-to-dollar visibility and remediation planning",
        href: "/use-cases/tech-debt-management",
      },
    ],
    byIndustry: [
      {
        icon: "☁️",
        title: "SaaS",
        description: "Recurring releases, sprint cadence, and GTM alignment",
        href: "/industries/saas",
      },
      {
        icon: "🏦",
        title: "Fintech",
        description: "Compliance-aware delivery, incidents, and audit trails",
        href: "/industries/fintech",
      },
      {
        icon: "🏥",
        title: "HealthTech",
        description: "Trust, change control, and patient-aware severity",
        href: "/industries/healthtech",
      },
      {
        icon: "🏢",
        title: "Enterprise",
        description: "Portfolio visibility and cross-team coordination",
        href: "/industries/enterprise",
      },
      {
        icon: "🛒",
        title: "E‑Commerce",
        description: "Peak traffic, revenue-linked incidents, fast iteration",
        href: "/industries/ecommerce",
      },
      {
        icon: "🔧",
        title: "DevTools",
        description: "Code-centric roadmaps, debt, and platform quality",
        href: "/industries/devtools",
      },
      {
        icon: "🤖",
        title: "AI / ML",
        description: "Model shipping, eval debt, and product cadence",
        href: "/industries/ai-ml",
      },
    ],
  },
  resources: {
    learn: [
      { icon: "📝", title: "Blog", description: "Engineering insights and product updates", href: "/blog" },
      { icon: "📚", title: "Documentation", description: "Setup guides and API docs", href: "/docs" },
      { icon: "📋", title: "Changelog", description: "Latest updates and version history", href: "/changelog" },
      { icon: "🟢", title: "System Status", description: "Real-time service health", href: "/status" },
      { icon: "🔗", title: "Integrations", description: "All connected tools", href: "/integrations" },
    ],
    company: [
      { icon: "💼", title: "About Us", description: "Our story, team, mission", href: "/about" },
      { icon: "🤝", title: "Careers", description: "Join the team", href: "/careers" },
      { icon: "📰", title: "Press", description: "Brand kit, press releases", href: "/press" },
      { icon: "📞", title: "Contact", description: "Get in touch", href: "/contact" },
      { icon: "🔒", title: "Security", description: "Compliance, certifications", href: "/security" },
    ],
    legal: [
      { icon: "🔐", title: "Privacy Policy", description: "How we handle personal data", href: "/privacy" },
      { icon: "📜", title: "Terms of Service", description: "Terms for using Voatomy", href: "/terms" },
      { icon: "🍪", title: "Cookie Policy", description: "Cookies and preference controls", href: "/cookies" },
    ],
    featuredPost: {
      title: "The Story Point Delusion: Why Sprint Estimates Are Statistically Meaningless",
      href: "/blog/story-point-delusion",
    },
  },
  topLinks: [
    { label: "Platform", href: "#", hasMega: true },
    { label: "Solutions", href: "#", hasMega: true },
    { label: "Pricing", href: "/pricing", hasMega: false },
    { label: "Resources", href: "#", hasMega: true },
  ],
} as const;

// ---------- HERO ----------

export const HERO_CONTENT = {
  eyebrow: "ATLAS by Voatomy",
  /** Benefit-led headline — outcome for ICP in one scan (B2B SaaS CRO pattern) */
  headline: "Ship the right sprint—without the spreadsheet war.",
  subheadline:
    "Code-aware plans that blend complexity, team capacity, tech-debt cost, and revenue weighting so every sprint is defensible in standup and in the boardroom.",
  ctaPrimary: "Get Early Access",
  ctaSecondary: "Watch the 3-minute demo",
  /** Risk reducers under primary CTA — friction reduction, common on high-converting B2B pages */
  ctaRiskReducer: "No credit card · Join the waitlist in under a minute",
  /** Three proof-oriented chips — “comprehension before scroll” (problem → solution narrative) */
  valuePills: [
    { label: "Repo-aware scope", detail: "AST and dependencies, not story points in a vacuum" },
    { label: "Capacity you can trust", detail: "Velocity, PTO, and focus time in one model" },
    { label: "Revenue-weighted tradeoffs", detail: "Tie work to what actually drives the business" },
  ] as const,
  socialProof: "1,200+ on the waitlist · 4.8/5 from beta teams",
  statCards: [
    { type: "visual" as const, value: "", label: "" },
    { type: "teal" as const, value: "100+", label: "Integrations" },
    { type: "white" as const, value: "1951+", label: "Tickets planned" },
    { type: "lime" as const, value: "6+ Years", label: "of success" },
    { type: "teal" as const, value: "60", label: "Teams" },
  ] as const,
} as const;

// ---------- BENEFITS (key benefits section) ----------

export const BENEFITS_LIST = [
  { title: "Maximize productivity", desc: "Ship more with less planning overhead." },
  { title: "Real-time sprint data", desc: "Get live capacity, velocity, and accuracy metrics." },
  { title: "AI-driven estimation", desc: "Code-aware estimates, not gut feel." },
] as const;

// ---------- SERVICES (landing grid) ----------

export const SERVICES_GRID = [
  {
    title: "Sprint Planning",
    description: "AI-driven plans that balance capacity, priority, and complexity.",
    icon: "target",
  },
  {
    title: "AI Estimation",
    description: "Code-aware estimates from your actual codebase structure.",
    icon: "sparkles",
  },
  {
    title: "Capacity Analytics",
    description: "Real-time team load and velocity across all sprints.",
    icon: "users",
  },
  {
    title: "Quality Insights",
    description: "Tech debt visibility and code health metrics.",
    icon: "shield-check",
  },
  {
    title: "Integrations",
    description: "Connect Jira, Linear, GitHub, and 100+ tools in minutes.",
    icon: "plug",
  },
  {
    title: "Analytics & Reporting",
    description: "Accuracy trends, delivery metrics, and executive dashboards.",
    icon: "bar-chart",
  },
] as const;

// ---------- TRUST STRIP ----------

export const TEAM_LABELS = [
  { abbr: "ENG", label: "Engineering" },
  { abbr: "DES", label: "Design" },
  { abbr: "PM", label: "Product" },
  { abbr: "MKT", label: "Marketing" },
  { abbr: "SAL", label: "Sales" },
  { abbr: "SRE", label: "SRE/DevOps" },
  { abbr: "CS", label: "Customer Success" },
] as const;

// ---------- PROBLEM STATEMENT ----------

export const PROBLEM_STATS = [
  {
    stat: "60%",
    description: "of sprint tasks are misestimated",
    icon: "📉",
  },
  {
    stat: "2+ hrs",
    description: "per sprint wasted in planning meetings",
    icon: "⏰",
  },
  {
    stat: "40%+",
    description: "overruns caused by gut-feel estimates",
    icon: "📊",
  },
] as const;

export const PROBLEM_IMPACT = {
  stat: "$1 TRILLION+",
  description: "lost annually to cross-functional misalignment",
} as const;

// ---------- HOW ATLAS WORKS (6 SIGNALS) ----------

export const ATLAS_SIGNALS = [
  {
    icon: "{ }",
    title: "Code Complexity",
    description: "Cyclomatic complexity + dependency depth from your repo",
    color: "#f16e2c",
    details: ["File coupling analysis", "Change frequency mapping", "Dependency graph depth"],
  },
  {
    icon: "👥",
    title: "Team Capacity",
    description: "PTO, on-call, skill level, historical velocity",
    color: "#22C55E",
    details: ["Calendar integration", "Skill-task matching", "Velocity trending"],
  },
  {
    icon: "📊",
    title: "Customer Demand",
    description: "Support tickets, sales objections, churn signals",
    color: "#6366F1",
    details: ["NPS correlation", "Revenue-weighted requests", "Churn risk scoring"],
  },
  {
    icon: "⚠",
    title: "Tech Debt Awareness",
    description: "Maps debt hotspots that slow delivery",
    color: "#EAB308",
    details: ["Debt-to-velocity ratio", "Hotspot heatmap", "Refactor ROI estimates"],
  },
  {
    icon: "◈",
    title: "Design Scope",
    description: "Connected to Figma, estimates design effort",
    color: "#8B5CF6",
    details: ["Component complexity", "New vs existing patterns", "Responsive variants"],
  },
  {
    icon: "$",
    title: "Business Priority",
    description: "Revenue data from CRM weights every trade-off",
    color: "#EC4899",
    details: ["Pipeline impact", "Deal urgency scoring", "Revenue forecasting"],
  },
] as const;

// ---------- COMPARISON ----------

export const COMPARISON_CONTENT = {
  headline: "The old way vs. the ATLAS way",
  rows: [
    { old: "2-hr planning meetings", atlas: "Plan in minutes" },
    { old: "Story point debates", atlas: "Code-backed estimates" },
    { old: "PM guesses from ticket title", atlas: "AI reads the codebase" },
    { old: "Capacity = heads × days", atlas: "PTO, on-call, skills factored in" },
    { old: "Tech debt ignored", atlas: "Debt in every sprint estimate" },
    { old: "Mid-sprint surprises", atlas: "Risks flagged before sprint starts" },
    { old: "Priority disconnected from revenue", atlas: "Revenue-informed priorities" },
  ],
} as const;

// ---------- PLATFORM PRODUCT DETAIL CARDS ----------

export const PRODUCT_DETAILS = {
  atlas: {
    sections: [
      { title: "Sprint Composition", description: "AI-generated sprint plans with ticket-level estimates" },
      { title: "Accuracy Tracking", description: "Track estimation accuracy across sprints: 82% → 85% → 87%" },
    ],
    users: "EMs · Tech Leads · PMs",
    integrations: "GitHub · Jira · Linear · Figma",
    pricing: "Free tier available",
  },
  loop: {
    sections: [
      { title: "Inbound Intelligence", description: "Sales calls, support tickets, churn signals → revenue-weighted backlog" },
      { title: "Outbound Intelligence", description: "Feature ships → auto-generated sales briefs, marketing copy, CS talking points" },
    ],
    users: "PMs · Sales · Marketing · CS",
    integrations: "Gong · Zendesk · Salesforce · Slack",
    pricing: "From $39/user/mo",
  },
  signal: {
    sections: [
      { title: "Impact Assessment", description: "Instant business impact per incident: affected customers, ARR at risk" },
      { title: "Intelligent Routing", description: "SRE gets technical context, CS gets talking points, Sales gets deal-risk alerts" },
    ],
    users: "SRE/DevOps · VP Eng · CTO",
    integrations: "Datadog · PagerDuty · CloudWatch",
    pricing: "From $15/seat/mo",
  },
  drift: {
    sections: [
      { title: "Design-Code Sync", description: "Real-time drift detection between Figma tokens and code implementations" },
      { title: "Revenue-Aware Design", description: "AI suggests design changes backed by conversion data" },
    ],
    users: "Design · Frontend · Product",
    integrations: "Figma · GitHub · Amplitude",
    pricing: "From $19/user/mo",
  },
  phantom: {
    sections: [
      { title: "Debt Radar", description: "Continuous codebase scanning — debt hotspots mapped to dollar impact" },
      { title: "Executive Dashboard", description: "ROI projections and prioritized remediation plans" },
    ],
    users: "Eng Directors · VP Eng · CTO · CFO",
    integrations: "GitHub · Jira · Datadog",
    pricing: "From $12/dev/mo",
  },
} as const;

// ---------- SECURITY ----------

export const SECURITY_FEATURES = [
  {
    title: "Never stores source code",
    description:
      "Read-only API access. Retains only structural metadata like file size, complexity scores, and dependency maps.",
    icon: "🔒",
  },
  {
    title: "Encrypted everywhere",
    description:
      "TLS 1.3 in transit, AES-256 at rest. Your data is encrypted at every layer.",
    icon: "🔐",
  },
  {
    title: "Tenant isolation",
    description:
      "PostgreSQL RLS, scoped queries, per-tenant AI context. Your data never leaks across organizations.",
    icon: "🛡",
  },
  {
    title: "SOC 2 ready",
    description:
      "Audit logging, access controls, and compliance baseline from day one.",
    icon: "✓",
  },
  {
    title: "Ticket Vulnerability Scanner",
    description:
      "Like Snyk for your tickets. Automatically scans every ticket, description, and comment for PII, API keys, and sensitive data. AI classifies, suggests fixes, and executes remediation — toggle on per project.",
    icon: "🛡️",
  },
] as const;

// ---------- INTEGRATIONS ----------

export const INTEGRATIONS = [
  { name: "Google Drive", category: "Documents", icon: "GD" },
  { name: "Adobe Creative Cloud", category: "Design", icon: "AC" },
  { name: "Jira", category: "Project", icon: "JR" },
  { name: "Gmail", category: "Comms", icon: "GM" },
  { name: "Figma", category: "Design", icon: "FG" },
  { name: "Microsoft Outlook", category: "Comms", icon: "MO" },
  { name: "Slack", category: "Comms", icon: "SL" },
  { name: "Framer", category: "Design", icon: "FR" },
  { name: "Salesforce", category: "CRM", icon: "SF" },
  { name: "Freshdesk", category: "Support", icon: "FD" },
  { name: "HubSpot", category: "CRM", icon: "HS" },
  { name: "Intercom", category: "Support", icon: "IC" },
  { name: "Google Calendar", category: "Comms", icon: "GC" },
  { name: "Microsoft Teams", category: "Comms", icon: "TM" },
  { name: "GitHub", category: "Code", icon: "GH" },
  { name: "GitLab", category: "Code", icon: "GL" },
  { name: "Bitbucket", category: "Code", icon: "BB" },
  { name: "Linear", category: "Project", icon: "LN" },
  { name: "Asana", category: "Project", icon: "AS" },
  { name: "Datadog", category: "Ops", icon: "DD" },
  { name: "PagerDuty", category: "Ops", icon: "PD" },
  { name: "Zendesk", category: "Support", icon: "ZD" },
] as const;

// ---------- PRICING ----------

export const PRICING_TIERS = [
  {
    name: "Starter",
    monthlyPrice: 0,
    annualPrice: 0,
    period: "",
    description: "Get started with AI sprint planning",
    bestFor: "Solo devs & small teams exploring AI estimation",
    maxUsers: 8,
    features: [
      { text: "1 team (up to 8 members)", included: true },
      { text: "1 connected repo", included: true },
      { text: "2 AI sprint plans / month", included: true },
      { text: "GitHub or GitLab integration", included: true },
      { text: "Basic accuracy tracking", included: true },
      { text: "Community support", included: true },
    ],
    cta: "Start Free",
    ctaVariant: "secondary" as const,
    popular: false,
    badge: "",
  },
  {
    name: "Pro",
    monthlyPrice: 14,
    annualPrice: 11,
    period: "/user/mo",
    description: "Unlimited planning for growing teams",
    bestFor: "Growing teams that want unlimited AI-powered sprints",
    maxUsers: 50,
    features: [
      { text: "Unlimited teams & repos", included: true },
      { text: "Unlimited AI sprint plans", included: true },
      { text: "All code integrations", included: true },
      { text: "Figma + design sync", included: true },
      { text: "Customer demand signals", included: true },
      { text: "Advanced accuracy analytics", included: true },
      { text: "Slack & Teams notifications", included: true },
      { text: "Email support (24h response)", included: true },
    ],
    cta: "Start 14-day Trial",
    ctaVariant: "primary" as const,
    popular: true,
    badge: "MOST POPULAR",
  },
  {
    name: "Business",
    monthlyPrice: 28,
    annualPrice: 22,
    period: "/user/mo",
    description: "Cross-team visibility, CRM & analytics",
    bestFor: "Scaling organizations needing cross-team alignment",
    maxUsers: 500,
    features: [
      { text: "Everything in Pro", included: true },
      { text: "Cross-team dependency mapping", included: true },
      { text: "CRM integration (Salesforce, HubSpot)", included: true },
      { text: "Revenue-weighted backlog", included: true },
      { text: "Multi-team dashboards", included: true },
      { text: "Custom workflows & automations", included: true },
      { text: "API access", included: true },
      { text: "Priority support (4h response)", included: true },
      { text: "Dedicated onboarding specialist", included: true },
    ],
    cta: "Start 14-day Trial",
    ctaVariant: "secondary" as const,
    popular: false,
    badge: "BEST VALUE",
  },
  {
    name: "Enterprise",
    monthlyPrice: -1,
    annualPrice: -1,
    period: "",
    description: "Full NEXUS platform for large organizations",
    bestFor: "Large enterprises needing security, compliance & custom SLAs",
    maxUsers: -1,
    features: [
      { text: "Everything in Business", included: true },
      { text: "Full NEXUS platform access", included: true },
      { text: "SSO / SAML / SCIM", included: true },
      { text: "RBAC & audit logs", included: true },
      { text: "Dedicated support & SLA", included: true },
      { text: "Custom integrations & webhooks", included: true },
      { text: "VPC / on-prem deployment", included: true },
      { text: "Uptime SLA (99.99%)", included: true },
      { text: "Executive business reviews", included: true },
    ],
    cta: "Contact Sales",
    ctaVariant: "secondary" as const,
    popular: false,
    badge: "",
  },
] as const;

export const PRODUCT_ADD_ONS = [
  {
    key: "atlas" as const,
    name: "ATLAS",
    tagline: "AI Sprint Planner",
    icon: "🎯",
    monthlyPrice: 0,
    annualPrice: 0,
    note: "Included in every plan",
    color: "#f16e2c",
    included: true,
  },
  {
    key: "loop" as const,
    name: "LOOP",
    tagline: "Revenue Feedback Engine",
    icon: "🔄",
    monthlyPrice: 8,
    annualPrice: 6,
    note: "Per user / month",
    color: "#6366F1",
    included: false,
  },
  {
    key: "signal" as const,
    name: "SIGNAL",
    tagline: "Incident Intelligence",
    icon: "🚨",
    monthlyPrice: 6,
    annualPrice: 5,
    note: "Per user / month",
    color: "#EF4444",
    included: false,
  },
  {
    key: "drift" as const,
    name: "DRIFT",
    tagline: "Design System Sync",
    icon: "🎨",
    monthlyPrice: 5,
    annualPrice: 4,
    note: "Per user / month",
    color: "#8B5CF6",
    included: false,
  },
  {
    key: "phantom" as const,
    name: "PHANTOM",
    tagline: "Tech Debt Radar",
    icon: "👻",
    monthlyPrice: 5,
    annualPrice: 4,
    note: "Per user / month",
    color: "#22D3EE",
    included: false,
  },
  {
    key: "nexus" as const,
    name: "NEXUS",
    tagline: "Organizational Nerve Center",
    icon: "🧬",
    monthlyPrice: 10,
    annualPrice: 8,
    note: "Per user / month · Unifies all products",
    color: "#10B981",
    included: false,
  },
] as const;

export const PRICING_FEATURE_GROUPS = [
  {
    group: "AI Sprint Planning",
    icon: "🎯",
    features: [
      { name: "AI sprint plans", starter: "2/mo", pro: "Unlimited", business: "Unlimited", enterprise: "Unlimited" },
      { name: "Code complexity analysis", starter: "Basic", pro: "Advanced", business: "Advanced", enterprise: "Advanced + Custom" },
      { name: "Team capacity modeling", starter: "—", pro: "✓", business: "✓", enterprise: "✓" },
      { name: "Tech debt awareness", starter: "—", pro: "✓", business: "✓", enterprise: "✓" },
      { name: "Design scope estimation", starter: "—", pro: "✓", business: "✓", enterprise: "✓" },
      { name: "Accuracy tracking", starter: "Basic", pro: "Advanced", business: "Detailed", enterprise: "Custom" },
    ],
  },
  {
    group: "Integrations",
    icon: "🔗",
    features: [
      { name: "Code repos (GitHub, GitLab, etc.)", starter: "1", pro: "Unlimited", business: "Unlimited", enterprise: "Unlimited" },
      { name: "Project tools (Jira, Linear, etc.)", starter: "—", pro: "2", business: "Unlimited", enterprise: "Unlimited" },
      { name: "CRM (Salesforce, HubSpot)", starter: "—", pro: "—", business: "✓", enterprise: "✓" },
      { name: "Design tools (Figma)", starter: "—", pro: "✓", business: "✓", enterprise: "✓" },
      { name: "Communication (Slack, Teams)", starter: "—", pro: "✓", business: "✓", enterprise: "✓" },
      { name: "Monitoring (Datadog, PagerDuty)", starter: "—", pro: "—", business: "✓", enterprise: "✓" },
      { name: "Custom webhooks & API", starter: "—", pro: "—", business: "✓", enterprise: "✓" },
    ],
  },
  {
    group: "Teams & Collaboration",
    icon: "👥",
    features: [
      { name: "Teams", starter: "1", pro: "Unlimited", business: "Unlimited", enterprise: "Unlimited" },
      { name: "Members per team", starter: "8", pro: "50", business: "500", enterprise: "Unlimited" },
      { name: "Cross-team dependencies", starter: "—", pro: "—", business: "✓", enterprise: "✓" },
      { name: "Multi-team dashboards", starter: "—", pro: "—", business: "✓", enterprise: "✓" },
      { name: "Custom roles & permissions", starter: "—", pro: "Basic", business: "Advanced", enterprise: "Full RBAC" },
      { name: "Guest access", starter: "—", pro: "—", business: "5 seats", enterprise: "Unlimited" },
    ],
  },
  {
    group: "Security & Compliance",
    icon: "🔒",
    features: [
      { name: "Data encryption (transit & rest)", starter: "✓", pro: "✓", business: "✓", enterprise: "✓" },
      { name: "SSO / SAML", starter: "—", pro: "—", business: "—", enterprise: "✓" },
      { name: "SCIM provisioning", starter: "—", pro: "—", business: "—", enterprise: "✓" },
      { name: "Audit logs", starter: "—", pro: "—", business: "30 days", enterprise: "Unlimited" },
      { name: "SOC 2 compliance", starter: "✓", pro: "✓", business: "✓", enterprise: "✓" },
      { name: "VPC / on-prem deployment", starter: "—", pro: "—", business: "—", enterprise: "✓" },
    ],
  },
  {
    group: "Support",
    icon: "💬",
    features: [
      { name: "Community forum", starter: "✓", pro: "✓", business: "✓", enterprise: "✓" },
      { name: "Email support", starter: "—", pro: "24h response", business: "4h response", enterprise: "1h response" },
      { name: "Dedicated account manager", starter: "—", pro: "—", business: "—", enterprise: "✓" },
      { name: "Onboarding specialist", starter: "—", pro: "—", business: "✓", enterprise: "✓" },
      { name: "Custom SLA", starter: "—", pro: "—", business: "—", enterprise: "✓" },
      { name: "Executive business reviews", starter: "—", pro: "—", business: "—", enterprise: "Quarterly" },
    ],
  },
] as const;

export const TEAM_SIZE_PRESETS = [
  { value: 1, label: "1", description: "Solo" },
  { value: 5, label: "5", description: "Startup" },
  { value: 15, label: "15", description: "Growing" },
  { value: 50, label: "50", description: "Scale-up" },
  { value: 100, label: "100", description: "Mid-market" },
  { value: 250, label: "250", description: "Large" },
  { value: 500, label: "500+", description: "Enterprise" },
] as const;

export const VOLUME_DISCOUNTS = [
  { minUsers: 1, maxUsers: 10, discount: 0, label: "" },
  { minUsers: 11, maxUsers: 25, discount: 0, label: "" },
  { minUsers: 26, maxUsers: 50, discount: 5, label: "5% volume discount" },
  { minUsers: 51, maxUsers: 100, discount: 10, label: "10% volume discount" },
  { minUsers: 101, maxUsers: 250, discount: 15, label: "15% volume discount" },
  { minUsers: 251, maxUsers: 500, discount: 20, label: "20% volume discount" },
  { minUsers: 501, maxUsers: 99999, discount: 25, label: "25% volume discount" },
] as const;

export const IMPACT_METRICS = [
  { icon: "⏱", label: "Planning time saved", value: "80%", detail: "2+ hrs → 20 min per sprint" },
  { icon: "🎯", label: "Estimation accuracy", value: "87%", detail: "Up from industry avg of 42%" },
  { icon: "🚀", label: "Faster delivery", value: "34%", detail: "Less rework, fewer surprises" },
  { icon: "💰", label: "Avg ROI in 90 days", value: "340%", detail: "Based on early access cohort" },
] as const;

// ---------- AUDIENCE SEGMENTS ----------

export const AUDIENCES = [
  {
    title: "For Engineering Managers",
    description:
      "Stop guessing complexity. Let AI read the code and generate estimates backed by data — not debate.",
    bullets: [
      "Accurate code-backed estimates",
      "Team capacity intelligence",
      "Tech debt visibility in every sprint",
    ],
    cta: "Plan your sprint",
    ctaHref: "#hero",
    icon: "👨‍💼",
  },
  {
    title: "For Product Leaders",
    description:
      "Align every sprint with business outcomes. Know which features drive revenue and which are noise.",
    bullets: [
      "Revenue-weighted backlog",
      "Customer demand signals",
      "Cross-team visibility",
    ],
    cta: "See the demo",
    ctaHref: "#demo",
    icon: "📊",
  },
] as const;

// ---------- TESTIMONIALS ----------

export const TESTIMONIALS = [
  {
    text: "Sprint accuracy went from 42% to 87% in three sprints. The AI actually understands our codebase.",
    author: "Sarah K.",
    role: "CTO, Series B SaaS",
    stars: 5,
  },
  {
    text: "Finally a tool that gets it. Planning meetings went from 2 hours to 20 minutes.",
    author: "Marcus T.",
    role: "Engineering Manager",
    stars: 5,
  },
  {
    text: "Cut our planning from 2 hours to 20 minutes. The team actually trusts the estimates now.",
    author: "Priya S.",
    role: "Product Manager",
    stars: 5,
  },
  {
    text: "87% accuracy in 3 sprints. We stopped debating story points entirely.",
    author: "James L.",
    role: "Tech Lead",
    stars: 5,
  },
  {
    text: "The only sprint tool I need. Code complexity analysis is a game-changer.",
    author: "Elena R.",
    role: "VP Engineering",
    stars: 5,
  },
  {
    text: "We onboarded faster and made better decisions because every task links back to context.",
    author: "Adam J.",
    role: "Senior Engineer",
    stars: 5,
  },
  {
    text: "Shipping quality improved immediately. Dependencies and risks are visible before they become blockers.",
    author: "Brian G.",
    role: "Engineering Director",
    stars: 5,
  },
  {
    text: "The execution graph is exactly what we needed. It keeps teams aligned while moving fast.",
    author: "Ugur A.",
    role: "CTO",
    stars: 5,
  },
  {
    text: "Voatomy pricing and velocity are hard to beat. We now run sprints with confidence every week.",
    author: "Praveen R.",
    role: "Product Lead",
    stars: 5,
  },
  {
    text: "Even in trial, it was obvious this solved a real problem. We moved to paid immediately.",
    author: "Priyanka S.",
    role: "VP Product",
    stars: 5,
  },
] as const;

// ---------- FAQ ----------

export const FAQ_ITEMS = [
  {
    question: "How does ATLAS understand code complexity?",
    answer:
      "ATLAS connects to your Git repos via read-only API access and performs static analysis — mapping dependency graphs, measuring cyclomatic complexity, and tracking change frequency. It never stores your source code, only structural metadata.",
  },
  {
    question: "Does ATLAS replace sprint planning meetings?",
    answer:
      "It replaces the estimation part. Your team still decides priorities and scope. Most teams cut planning meetings from 2 hours to 20 minutes because the estimation debates disappear.",
  },
  {
    question: "What if we don't use story points?",
    answer:
      "ATLAS works with story points, t-shirt sizes, time-based estimates, or no formal estimation system at all. It adapts to your team's workflow.",
  },
  {
    question: "How accurate are the AI estimates?",
    answer:
      "Within 15% of actual delivery time for 80% of tasks. Accuracy improves with each sprint cycle as ATLAS learns your team's velocity and codebase patterns.",
  },
  {
    question: "Is our code safe?",
    answer:
      "ATLAS never stores source code. We use read-only API access and retain only structural metadata. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). SOC 2 compliance is in progress.",
  },
  {
    question: "What's the ATLAS to NEXUS product journey?",
    answer:
      "ATLAS is your entry point. As your needs grow, add LOOP (revenue feedback), SIGNAL (incident intelligence), DRIFT (design sync), or PHANTOM (tech debt). Each product layers on seamlessly — no rip-and-replace. Eventually, NEXUS unifies everything into one organizational nerve center.",
  },
  {
    question: "How much does it cost?",
    answer:
      "ATLAS is free to start with 1 team, 1 repo, and 2 AI sprint plans per month. Pro starts at $14/user/month (or $11/user/month billed annually) with unlimited teams and repos. Volume discounts kick in at 26+ users. You can customize your plan by adding products like LOOP, SIGNAL, DRIFT, and PHANTOM as needed.",
  },
  {
    question: "When does ATLAS launch?",
    answer:
      "Early access opens in Q2 2026. Waitlist members get priority access by signup date. Join now to secure your spot.",
  },
] as const;

// ---------- JOURNEY STEPS (9D) ----------

export const JOURNEY_STEPS = [
  {
    step: 1,
    title: "Connect",
    description: "Connect GitHub, Jira, and your team calendar",
    icon: "🔗",
  },
  {
    step: 2,
    title: "Plan",
    description: "Generate your first AI sprint plan in minutes",
    icon: "📋",
  },
  {
    step: 3,
    title: "Ship",
    description: "Execute with confidence. Risks flagged before they bite",
    icon: "🚀",
  },
  {
    step: 4,
    title: "Learn",
    description: "Track accuracy. AI improves with every sprint",
    icon: "📈",
  },
] as const;

// ---------- FOOTER ----------

export const FOOTER_PRODUCTS = [
  {
    label: "ATLAS",
    href: "/products/atlas",
    desc: "Sprint intelligence",
    color: "#F97316",
  },
  {
    label: "LOOP",
    href: "/products/loop",
    desc: "Revenue feedback",
    color: "#6366F1",
  },
  {
    label: "SIGNAL",
    href: "/products/signal",
    desc: "Incident intelligence",
    color: "#EF4444",
  },
  {
    label: "DRIFT",
    href: "/products/drift",
    desc: "Design-code sync",
    color: "#A855F7",
  },
  {
    label: "PHANTOM",
    href: "/products/phantom",
    desc: "Tech debt radar",
    color: "#06B6D4",
  },
  {
    label: "NEXUS",
    href: "/products/nexus",
    desc: "Unified platform",
    color: "#10B981",
  },
] as const;

export const FOOTER_COLUMNS = [
  {
    title: "Platform",
    links: [
      { label: "All Products", href: "/products/nexus" },
      { label: "Pricing", href: "/pricing" },
      { label: "Integrations", href: "/integrations" },
      { label: "Security", href: "/security" },
      { label: "Status", href: "/status" },
      { label: "Get Started", href: "/onboard" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Engineering Managers", href: "/solutions/engineering-managers" },
      { label: "Product Leaders", href: "/solutions/product-leaders" },
      { label: "CTO & VP Engineering", href: "/solutions/cto-vp-engineering" },
      { label: "Sales Leaders", href: "/solutions/sales-leaders" },
      { label: "Customer Success", href: "/solutions/customer-success" },
      { label: "SRE & DevOps", href: "/solutions/sre-devops" },
      { label: "Design Teams", href: "/solutions/design-teams" },
    ],
  },
  {
    title: "Use Cases",
    links: [
      { label: "Sprint Planning", href: "/use-cases/sprint-planning" },
      { label: "Revenue Intelligence", href: "/use-cases/revenue-intelligence" },
      { label: "Feedback → Roadmap", href: "/use-cases/feedback-roadmap" },
      { label: "Cross-Team Alignment", href: "/use-cases/cross-team" },
      { label: "Incident Intelligence", href: "/use-cases/incident-intelligence" },
      { label: "Design System Health", href: "/use-cases/design-system-health" },
      { label: "Tech Debt Management", href: "/use-cases/tech-debt-management" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Blog", href: "/blog" },
      { label: "Changelog", href: "/changelog" },
      { label: "Press & Media", href: "/press" },
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
] as const;

export const FOOTER_SOCIALS = [
  { label: "Twitter/X", href: "https://x.com/voatomy", icon: "x" },
  { label: "LinkedIn", href: "https://linkedin.com/company/voatomy", icon: "linkedin" },
  { label: "GitHub", href: "https://github.com/voatomy", icon: "github" },
  { label: "Discord", href: "https://discord.gg/voatomy", icon: "discord" },
  { label: "YouTube", href: "https://youtube.com/@voatomy", icon: "youtube" },
] as const;

// ---------- LEGACY EXPORTS (backward compat) ----------

export const WORKFLOW_STAGES = [
  "Discover",
  "Blueprint",
  "Build",
  "Validate",
  "Launch",
  "Grow",
] as const;

export const WORKFLOW_TABS = [
  "Product Delivery",
  "Go-to-Market",
  "Product + Engineering",
  "Operations",
  "Compliance",
  "Leadership",
] as const;

export const COMPARISON_ROWS = [
  "Planning speed",
  "Estimation method",
  "Codebase awareness",
  "Capacity modeling",
  "Tech debt visibility",
  "Risk detection",
  "Priority alignment",
] as const;

export const COMPARISON_DATA = {
  old: [
    "2-hr planning meetings",
    "Story point debates",
    "PM guesses from ticket title",
    "Capacity = heads × days",
    "Tech debt ignored",
    "Mid-sprint surprises",
    "Priority disconnected from revenue",
  ],
  atlas: [
    "Plan in minutes",
    "Code-backed estimates",
    "AI reads the codebase",
    "PTO, on-call, skills factored in",
    "Debt in every sprint estimate",
    "Risks flagged before sprint starts",
    "Revenue-informed priorities",
  ],
} as const;

// ---------- REGIONS & COUNTRIES ----------

export const REGIONS = [
  { value: "north-america" as const, label: "North America", icon: "🌎", timezone: "America/New_York" },
  { value: "europe" as const, label: "Europe", icon: "🌍", timezone: "Europe/London" },
  { value: "asia-pacific" as const, label: "Asia-Pacific", icon: "🌏", timezone: "Asia/Tokyo" },
  { value: "latin-america" as const, label: "Latin America", icon: "🌎", timezone: "America/Sao_Paulo" },
  { value: "africa" as const, label: "Africa", icon: "🌍", timezone: "Africa/Lagos" },
  { value: "middle-east" as const, label: "Middle East", icon: "🌍", timezone: "Asia/Dubai" },
] as const;

export const COUNTRIES_BY_REGION = {
  "north-america": [
    { code: "US", name: "United States" },
    { code: "CA", name: "Canada" },
    { code: "MX", name: "Mexico" },
  ],
  europe: [
    { code: "GB", name: "United Kingdom" },
    { code: "DE", name: "Germany" },
    { code: "FR", name: "France" },
    { code: "NL", name: "Netherlands" },
    { code: "SE", name: "Sweden" },
    { code: "ES", name: "Spain" },
    { code: "IT", name: "Italy" },
    { code: "IE", name: "Ireland" },
    { code: "CH", name: "Switzerland" },
    { code: "PL", name: "Poland" },
  ],
  "asia-pacific": [
    { code: "JP", name: "Japan" },
    { code: "AU", name: "Australia" },
    { code: "SG", name: "Singapore" },
    { code: "IN", name: "India" },
    { code: "KR", name: "South Korea" },
    { code: "NZ", name: "New Zealand" },
    { code: "HK", name: "Hong Kong" },
    { code: "ID", name: "Indonesia" },
  ],
  "latin-america": [
    { code: "BR", name: "Brazil" },
    { code: "AR", name: "Argentina" },
    { code: "CO", name: "Colombia" },
    { code: "CL", name: "Chile" },
    { code: "PE", name: "Peru" },
  ],
  africa: [
    { code: "NG", name: "Nigeria" },
    { code: "ZA", name: "South Africa" },
    { code: "KE", name: "Kenya" },
    { code: "GH", name: "Ghana" },
    { code: "EG", name: "Egypt" },
    { code: "RW", name: "Rwanda" },
  ],
  "middle-east": [
    { code: "AE", name: "United Arab Emirates" },
    { code: "SA", name: "Saudi Arabia" },
    { code: "IL", name: "Israel" },
    { code: "TR", name: "Turkey" },
    { code: "QA", name: "Qatar" },
  ],
} as const;

/** Providers recommended per region (provider id → region ids where recommended) */
export const REGION_PROVIDER_RECOMMENDATIONS: Record<string, string[]> = {
  // Code providers — universally available
  github: ["north-america", "europe", "asia-pacific", "latin-america", "africa", "middle-east"],
  gitlab: ["europe", "north-america", "asia-pacific"],
  bitbucket: ["north-america", "europe", "asia-pacific"],
  // Signal providers — regional availability
  gong: ["north-america", "europe"],
  salesforce: ["north-america", "europe", "asia-pacific", "latin-america", "middle-east"],
  hubspot: ["north-america", "europe", "latin-america"],
  zendesk: ["north-america", "europe", "asia-pacific", "latin-america", "africa", "middle-east"],
  intercom: ["north-america", "europe", "asia-pacific"],
  slack: ["north-america", "europe", "asia-pacific", "latin-america", "africa", "middle-east"],
  "google-drive": ["north-america", "europe", "asia-pacific", "latin-america", "africa", "middle-east"],
};

// ---------- ONBOARDING (new 7-step flow) ----------

export const ONBOARDING_STEPS = [
  { key: "welcome" as const, label: "Welcome", icon: "👋" },
  { key: "workspace" as const, label: "Workspace", icon: "🏢" },
  { key: "connect" as const, label: "Connect", icon: "🔗" },
  { key: "team" as const, label: "Team", icon: "👥" },
  { key: "products" as const, label: "Products", icon: "📦" },
  { key: "customize" as const, label: "Notify", icon: "🔔" },
  { key: "launch" as const, label: "Launch", icon: "🚀" },
] as const;

// Backward compat
export const ONBOARDING_STEPS_BASE = ONBOARDING_STEPS;
export const ONBOARDING_STEPS_ALL_PRODUCTS = ONBOARDING_STEPS;

export const ROLE_OPTIONS = [
  { value: "engineering-manager" as const, label: "Engineering Manager", icon: "👨‍💼" },
  { value: "tech-lead" as const, label: "Tech Lead", icon: "🛠" },
  { value: "product-manager" as const, label: "Product Manager", icon: "📊" },
  { value: "cto-vp" as const, label: "CTO / VP Engineering", icon: "🏛" },
  { value: "engineer" as const, label: "Software Engineer", icon: "💻" },
  { value: "designer" as const, label: "Designer", icon: "🎨" },
  { value: "founder" as const, label: "Founder / CEO", icon: "🚀" },
  { value: "operations" as const, label: "Operations", icon: "⚙️" },
  { value: "devops-sre" as const, label: "DevOps / SRE", icon: "🔧" },
  { value: "qa-engineer" as const, label: "QA Engineer", icon: "🧪" },
  { value: "data-engineer" as const, label: "Data Engineer", icon: "📈" },
  { value: "sales-leader" as const, label: "Sales Leader", icon: "💰" },
  { value: "cs-leader" as const, label: "Customer Success", icon: "🤝" },
  { value: "marketing" as const, label: "Marketing", icon: "📣" },
  { value: "other" as const, label: "Other", icon: "✨" },
] as const;

export const COMPANY_SIZE_OPTIONS = [
  { value: "solo" as const, label: "Just me", description: "Solo founder or freelancer" },
  { value: "2-10" as const, label: "2–10", description: "Small team" },
  { value: "11-50" as const, label: "11–50", description: "Growing startup" },
  { value: "51-200" as const, label: "51–200", description: "Scale-up" },
  { value: "201-1000" as const, label: "201–1000", description: "Mid-market" },
  { value: "1000+" as const, label: "1000+", description: "Enterprise" },
] as const;

export const CODE_PROVIDERS = [
  {
    id: "github" as const,
    name: "GitHub",
    icon: "github",
    recommended: true,
  },
  {
    id: "gitlab" as const,
    name: "GitLab",
    icon: "gitlab",
    recommended: false,
  },
  {
    id: "bitbucket" as const,
    name: "Bitbucket",
    icon: "bitbucket",
    recommended: false,
  },
] as const;

export const DATA_SOURCE_OPTIONS = [
  { id: "jira" as const, name: "Jira", icon: "trello", description: "Import boards & sprints" },
  { id: "linear" as const, name: "Linear", icon: "layers", description: "Import projects & cycles" },
  { id: "csv" as const, name: "CSV / Spreadsheet", icon: "table", description: "Upload task data" },
  { id: "notion" as const, name: "Notion", icon: "file-text", description: "Import databases" },
  { id: "scratch" as const, name: "Start from scratch", icon: "plus", description: "Build manually" },
] as const;

export const TRUST_BADGES = [
  { icon: "shield", text: "Never stores source code" },
  { icon: "lock", text: "Read-only API access" },
  { icon: "eye", text: "Retains only structural metadata" },
] as const;

// ---------- LOOP SIGNAL SOURCES ----------

export const LOOP_SIGNAL_PROVIDERS = [
  {
    id: "gong" as const,
    name: "Gong",
    icon: "mic",
    description: "Call recordings, deal intelligence & conversation insights",
    category: "Revenue Intelligence",
    recommended: true,
  },
  {
    id: "salesforce" as const,
    name: "Salesforce",
    icon: "cloud",
    description: "CRM pipeline, deal stages & account data",
    category: "CRM",
    recommended: true,
  },
  {
    id: "hubspot" as const,
    name: "HubSpot",
    icon: "hub",
    description: "CRM contacts, deals & marketing signals",
    category: "CRM",
    recommended: false,
  },
  {
    id: "zendesk" as const,
    name: "Zendesk",
    icon: "headphones",
    description: "Support tickets, CSAT scores & escalation patterns",
    category: "Support",
    recommended: true,
  },
  {
    id: "intercom" as const,
    name: "Intercom",
    icon: "message-circle",
    description: "Live chat, product tours & customer engagement",
    category: "Support",
    recommended: false,
  },
  {
    id: "slack" as const,
    name: "Slack",
    icon: "hash",
    description: "Team channels, deal discussions & customer mentions",
    category: "Communication",
    recommended: false,
  },
  {
    id: "google-drive" as const,
    name: "Google Drive",
    icon: "folder",
    description: "Meeting notes, proposals & competitive docs",
    category: "Documents",
    recommended: false,
  },
] as const;

export const LOOP_ROLE_OPTIONS = [
  { value: "product-manager" as const, label: "Product Manager", description: "Feature prioritization & roadmap" },
  { value: "sales-leader" as const, label: "Sales Leader", description: "Pipeline & deal intelligence" },
  { value: "cs-leader" as const, label: "CS Leader", description: "Churn prevention & expansion" },
  { value: "revenue-ops" as const, label: "Revenue Ops", description: "Forecasting & process optimization" },
  { value: "marketing" as const, label: "Marketing", description: "Competitive intel & positioning" },
  { value: "founder" as const, label: "Founder / CEO", description: "Full revenue visibility" },
] as const;

export const LOOP_SIGNAL_TYPE_OPTIONS = [
  { value: "deal-velocity" as const, label: "Deal Velocity", description: "Track deal progression speed & stall patterns", icon: "trending-up", recommended: true },
  { value: "churn-risk" as const, label: "Churn Risk", description: "Early warning signals from support & usage data", icon: "alert-triangle", recommended: true },
  { value: "competitive-mentions" as const, label: "Competitive Mentions", description: "Track competitor mentions in calls & tickets", icon: "shield", recommended: true },
  { value: "sentiment-shifts" as const, label: "Sentiment Shifts", description: "NPS, CSAT & conversation tone changes", icon: "heart", recommended: false },
  { value: "feature-requests" as const, label: "Feature Requests", description: "Aggregate & revenue-weight feature demand", icon: "lightbulb", recommended: true },
  { value: "support-escalations" as const, label: "Support Escalations", description: "Critical escalation paths & resolution patterns", icon: "arrow-up-circle", recommended: false },
  { value: "win-loss-patterns" as const, label: "Win/Loss Patterns", description: "Analyze why deals close or die", icon: "bar-chart", recommended: true },
  { value: "expansion-signals" as const, label: "Expansion Signals", description: "Upsell & cross-sell opportunity detection", icon: "plus-circle", recommended: false },
] as const;

export const LOOP_PIPELINE_STAGES = [
  { value: "discovery" as const, label: "Discovery", color: "#6366F1" },
  { value: "qualification" as const, label: "Qualification", color: "#8B5CF6" },
  { value: "demo" as const, label: "Demo / POC", color: "#A855F7" },
  { value: "proposal" as const, label: "Proposal", color: "#F59E0B" },
  { value: "negotiation" as const, label: "Negotiation", color: "#F97316" },
  { value: "closed-won" as const, label: "Closed Won", color: "#22C55E" },
  { value: "closed-lost" as const, label: "Closed Lost", color: "#EF4444" },
] as const;

export const LOOP_ANALYSIS_STEPS = [
  { label: "Connecting to signal sources", duration: 1500 },
  { label: "Mapping deal pipeline stages", duration: 2000 },
  { label: "Analyzing conversation patterns", duration: 2500 },
  { label: "Scoring churn risk signals", duration: 2000 },
  { label: "Generating revenue intelligence", duration: 3000 },
] as const;

export const LOOP_TRUST_BADGES = [
  { icon: "shield", text: "No raw call recordings stored" },
  { icon: "lock", text: "Read-only CRM access" },
  { icon: "eye", text: "Only signal metadata retained" },
] as const;

export const LOOP_SAMPLE_SIGNALS = [
  { id: "SIG-01", type: "churn-risk" as const, title: "Acme Corp health score dropped 23 points", confidence: 89, revenue: "$240K ARR", severity: "high" as const, source: "Zendesk + Salesforce" },
  { id: "SIG-02", type: "deal-velocity" as const, title: "TechStart deal stalled in Proposal for 18 days", confidence: 78, revenue: "$85K ARR", severity: "medium" as const, source: "Salesforce" },
  { id: "SIG-03", type: "competitive-mentions" as const, title: "3 prospects mentioned Competitor X in calls this week", confidence: 92, revenue: "$320K pipeline", severity: "high" as const, source: "Gong" },
  { id: "SIG-04", type: "feature-requests" as const, title: "SSO requested by 7 accounts ($1.2M combined ARR)", confidence: 95, revenue: "$1.2M ARR", severity: "high" as const, source: "Zendesk + Gong" },
  { id: "SIG-05", type: "expansion-signals" as const, title: "DataFlow Inc usage up 340% — upsell opportunity", confidence: 85, revenue: "$45K → $120K", severity: "medium" as const, source: "Product Analytics" },
  { id: "SIG-06", type: "win-loss-patterns" as const, title: "Enterprise deals with POC close 3.2× faster", confidence: 91, revenue: "Pattern insight", severity: "low" as const, source: "Gong + Salesforce" },
] as const;

export const MOCK_REPOS = [
  { id: "1", name: "frontend", owner: "acmecorp", language: "TypeScript", stars: 24, updatedAt: "2 days ago", isPrivate: false, defaultBranch: "main", environment: "production" as const, description: "Main customer-facing web application" },
  { id: "2", name: "backend-api", owner: "acmecorp", language: "Python", stars: 18, updatedAt: "1 day ago", isPrivate: false, defaultBranch: "main", environment: "production" as const, description: "Core REST API and business logic" },
  { id: "3", name: "mobile-app", owner: "acmecorp", language: "Swift", stars: 12, updatedAt: "1 week ago", isPrivate: false, defaultBranch: "develop", environment: "staging" as const, description: "iOS mobile application" },
  { id: "4", name: "infrastructure", owner: "acmecorp", language: "HCL", stars: 8, updatedAt: "3 days ago", isPrivate: true, defaultBranch: "main", environment: "production" as const, description: "Terraform infrastructure as code" },
  { id: "5", name: "design-system", owner: "acmecorp", language: "TypeScript", stars: 5, updatedAt: "2 weeks ago", isPrivate: false, defaultBranch: "main", environment: "development" as const, description: "Shared component library and design tokens" },
  { id: "6", name: "data-pipeline", owner: "acmecorp", language: "Python", stars: 3, updatedAt: "5 days ago", isPrivate: true, defaultBranch: "main", environment: "production" as const, description: "ETL and data processing pipeline" },
  { id: "7", name: "auth-service", owner: "acmecorp", language: "Go", stars: 15, updatedAt: "4 days ago", isPrivate: true, defaultBranch: "main", environment: "production" as const, description: "OAuth2 and authentication microservice" },
  { id: "8", name: "admin-dashboard", owner: "acmecorp", language: "TypeScript", stars: 6, updatedAt: "1 week ago", isPrivate: true, defaultBranch: "main", environment: "staging" as const, description: "Internal admin panel" },
  { id: "9", name: "ml-models", owner: "acmecorp", language: "Python", stars: 9, updatedAt: "3 days ago", isPrivate: true, defaultBranch: "main", environment: "development" as const, description: "Machine learning model training and serving" },
  { id: "10", name: "e2e-tests", owner: "acmecorp", language: "TypeScript", stars: 2, updatedAt: "6 days ago", isPrivate: false, defaultBranch: "main", environment: "testing" as const, description: "End-to-end test suite" },
] as const;

export const INVITEE_ROLE_OPTIONS = [
  { value: "admin" as const, label: "Admin", description: "Full workspace control" },
  { value: "manager" as const, label: "Manager", description: "Create plans, manage repos" },
  { value: "member" as const, label: "Member", description: "View & contribute to plans" },
  { value: "viewer" as const, label: "Viewer", description: "Read-only access" },
] as const;

// ---------- ORG & TEAM STRUCTURE ----------

export const ORG_STRUCTURE_OPTIONS = [
  {
    value: "flat" as const,
    label: "Flat",
    description: "Everyone is on one team — ideal for small startups",
    icon: "🏠",
    maxTeams: 1,
    recommended: ["solo", "2-10"] as const,
  },
  {
    value: "functional" as const,
    label: "Functional",
    description: "Teams grouped by discipline — engineering, product, design, etc.",
    icon: "🏢",
    maxTeams: 10,
    recommended: ["11-50", "51-200"] as const,
  },
  {
    value: "matrix" as const,
    label: "Matrix",
    description: "Cross-functional squads under departments — for complex orgs",
    icon: "🔀",
    maxTeams: 25,
    recommended: ["51-200", "201-1000"] as const,
  },
  {
    value: "divisional" as const,
    label: "Divisional",
    description: "Separate divisions with their own teams — for large enterprises",
    icon: "🏛",
    maxTeams: 50,
    recommended: ["201-1000", "1000+"] as const,
  },
] as const;

export const TEAM_TYPE_OPTIONS = [
  { value: "engineering" as const, label: "Engineering", icon: "💻", color: "#6366F1" },
  { value: "product" as const, label: "Product", icon: "📊", color: "#F59E0B" },
  { value: "design" as const, label: "Design", icon: "🎨", color: "#8B5CF6" },
  { value: "qa" as const, label: "QA / Testing", icon: "🧪", color: "#22D3EE" },
  { value: "devops-sre" as const, label: "DevOps / SRE", icon: "🔧", color: "#EF4444" },
  { value: "data" as const, label: "Data / Analytics", icon: "📈", color: "#14B8A6" },
  { value: "marketing" as const, label: "Marketing", icon: "📣", color: "#EC4899" },
  { value: "sales" as const, label: "Sales", icon: "💰", color: "#F97316" },
  { value: "customer-success" as const, label: "Customer Success", icon: "🤝", color: "#10B981" },
  { value: "operations" as const, label: "Operations", icon: "⚙️", color: "#64748B" },
  { value: "leadership" as const, label: "Leadership", icon: "🏛", color: "#A855F7" },
  { value: "other" as const, label: "Other", icon: "✨", color: "#78716C" },
] as const;

export const DEPARTMENT_TEMPLATES: Record<string, { name: string; description: string; color: string; defaultTeams: { name: string; type: typeof TEAM_TYPE_OPTIONS[number]["value"]; description: string }[] }[]> = {
  default: [
    {
      name: "Engineering",
      description: "Software development and infrastructure",
      color: "#6366F1",
      defaultTeams: [
        { name: "Backend", type: "engineering", description: "APIs, services, and core logic" },
        { name: "Frontend", type: "engineering", description: "Web and mobile UI" },
        { name: "Platform", type: "devops-sre", description: "Infrastructure and DevOps" },
      ],
    },
    {
      name: "Product & Design",
      description: "Product management and user experience",
      color: "#8B5CF6",
      defaultTeams: [
        { name: "Product", type: "product", description: "Roadmap and feature strategy" },
        { name: "UX/UI Design", type: "design", description: "User research and interface design" },
      ],
    },
    {
      name: "Go-to-Market",
      description: "Sales, marketing, and customer success",
      color: "#F59E0B",
      defaultTeams: [
        { name: "Sales", type: "sales", description: "Revenue generation and deals" },
        { name: "Marketing", type: "marketing", description: "Brand, content, and demand gen" },
        { name: "Customer Success", type: "customer-success", description: "Onboarding and retention" },
      ],
    },
  ],
  saas: [
    {
      name: "Engineering",
      description: "Core product development",
      color: "#6366F1",
      defaultTeams: [
        { name: "Backend", type: "engineering", description: "APIs and microservices" },
        { name: "Frontend", type: "engineering", description: "Web application UI" },
        { name: "Platform / SRE", type: "devops-sre", description: "Infrastructure and reliability" },
        { name: "QA", type: "qa", description: "Quality assurance and testing" },
      ],
    },
    {
      name: "Product & Design",
      description: "Product strategy and UX",
      color: "#8B5CF6",
      defaultTeams: [
        { name: "Product Management", type: "product", description: "Roadmap and prioritization" },
        { name: "Design", type: "design", description: "UX/UI design" },
        { name: "Data & Analytics", type: "data", description: "Product analytics and insights" },
      ],
    },
    {
      name: "Revenue",
      description: "Sales, marketing, and CS",
      color: "#F59E0B",
      defaultTeams: [
        { name: "Sales", type: "sales", description: "New business and expansion" },
        { name: "Customer Success", type: "customer-success", description: "Retention and growth" },
        { name: "Marketing", type: "marketing", description: "Demand gen and brand" },
      ],
    },
  ],
  fintech: [
    {
      name: "Engineering",
      description: "Financial platform development",
      color: "#6366F1",
      defaultTeams: [
        { name: "Core Banking", type: "engineering", description: "Payments and ledger systems" },
        { name: "Frontend", type: "engineering", description: "Web and mobile apps" },
        { name: "Security & Compliance", type: "devops-sre", description: "Infosec and regulatory compliance" },
      ],
    },
    {
      name: "Product",
      description: "Product and design",
      color: "#8B5CF6",
      defaultTeams: [
        { name: "Product", type: "product", description: "Financial product strategy" },
        { name: "Design", type: "design", description: "UX for financial services" },
      ],
    },
    {
      name: "Operations",
      description: "Risk, compliance, and support",
      color: "#F59E0B",
      defaultTeams: [
        { name: "Risk & Compliance", type: "operations", description: "Regulatory and risk management" },
        { name: "Customer Support", type: "customer-success", description: "Tier 1-3 support" },
      ],
    },
  ],
  agency: [
    {
      name: "Delivery",
      description: "Client project delivery",
      color: "#6366F1",
      defaultTeams: [
        { name: "Development", type: "engineering", description: "Full-stack development" },
        { name: "Design", type: "design", description: "Visual and UX design" },
        { name: "QA", type: "qa", description: "Quality assurance" },
      ],
    },
    {
      name: "Client Services",
      description: "Account management and growth",
      color: "#F59E0B",
      defaultTeams: [
        { name: "Account Management", type: "sales", description: "Client relationships" },
        { name: "Project Management", type: "product", description: "Delivery coordination" },
      ],
    },
  ],
};

export const ANALYSIS_STEPS = [
  { label: "Reading repository structure", duration: 1500 },
  { label: "Mapping code complexity", duration: 2000 },
  { label: "Identifying dependencies", duration: 2500 },
  { label: "Analyzing tech debt hotspots", duration: 2000 },
  { label: "Generating sprint plan", duration: 3000 },
] as const;

export const START_FRESH_SUGGESTED_TASKS = {
  atlas: [
    "List the top 10 sprint candidates",
    "Define capacity (people, PTO, on-call)",
    "Estimate 5 tasks and flag risks",
    "Pick a sprint goal and success metric",
  ],
  loop: [
    "Collect 10 user feedback items",
    "Tag feedback by revenue impact",
    "Convert top 3 items into tasks",
    "Define the weekly learning loop",
  ],
  signal: [
    "List current alerts and top pain points",
    "Define incident severity rules",
    "Map incidents to customer impact",
    "Create the first response checklist",
  ],
  drift: [
    "Define the critical user journey",
    "List UX issues to validate",
    "Create 5 UI tasks with acceptance checks",
    "Define what 'design drift' means for you",
  ],
  phantom: [
    "List 10 tech debt items",
    "Estimate debt in time and $ impact",
    "Pick 3 debt fixes for this sprint",
    "Add security/quality gates to tasks",
  ],
  nexus: [
    "List key cross-team handoffs",
    "Define ownership for each stage",
    "Create the first shared execution graph",
    "Choose the top 3 org-level KPIs",
  ],
} as const;

export const SAMPLE_SPRINT_TASKS = [
  { id: "FE-42", title: "Refactor auth module", complexity: 7.2, points: 3, confidence: 87, reason: "3 external API calls, 2 shared components", repoSource: "frontend", labels: ["refactor", "auth"] },
  { id: "FE-18", title: "Add payment integration", complexity: 8.5, points: 8, confidence: 72, reason: "New third-party SDK, 4 database migrations", repoSource: "backend-api", labels: ["feature", "payments"] },
  { id: "FE-7", title: "Update dashboard cards", complexity: 3.1, points: 2, confidence: 91, reason: "UI-only change, existing patterns", repoSource: "frontend", labels: ["ui", "dashboard"] },
  { id: "BE-15", title: "Optimize search indexing", complexity: 6.8, points: 5, confidence: 78, reason: "2 database queries, caching layer changes", repoSource: "backend-api", labels: ["performance", "search"] },
  { id: "FE-31", title: "Mobile responsive fixes", complexity: 4.2, points: 3, confidence: 85, reason: "CSS-only, 6 breakpoint adjustments", repoSource: "frontend", labels: ["bug", "mobile"] },
  { id: "BE-22", title: "Add rate limiting middleware", complexity: 5.5, points: 3, confidence: 83, reason: "Redis integration, 2 API routes", repoSource: "auth-service", labels: ["security", "api"] },
  { id: "ML-04", title: "Train recommendation model v2", complexity: 9.1, points: 8, confidence: 65, reason: "Large dataset, GPU pipeline, A/B test setup", repoSource: "ml-models", labels: ["ml", "feature"] },
  { id: "INF-11", title: "Upgrade Kubernetes to 1.29", complexity: 6.3, points: 5, confidence: 80, reason: "3 cluster configs, rolling upgrade strategy", repoSource: "infrastructure", labels: ["infra", "upgrade"] },
] as const;

export const INDUSTRY_OPTIONS = [
  { value: "saas" as const, label: "SaaS", icon: "☁️" },
  { value: "fintech" as const, label: "Fintech", icon: "🏦" },
  { value: "healthtech" as const, label: "HealthTech", icon: "🏥" },
  { value: "ecommerce" as const, label: "E-Commerce", icon: "🛒" },
  { value: "devtools" as const, label: "DevTools", icon: "🔧" },
  { value: "enterprise" as const, label: "Enterprise", icon: "🏢" },
  { value: "agency" as const, label: "Agency", icon: "🎯" },
  { value: "education" as const, label: "Education", icon: "🎓" },
  { value: "gaming" as const, label: "Gaming", icon: "🎮" },
  { value: "media" as const, label: "Media", icon: "📺" },
  { value: "ai-ml" as const, label: "AI / ML", icon: "🤖" },
  { value: "crypto-web3" as const, label: "Crypto / Web3", icon: "⛓️" },
  { value: "nonprofit" as const, label: "Nonprofit", icon: "💚" },
  { value: "government" as const, label: "Government", icon: "🏛" },
  { value: "other" as const, label: "Other", icon: "✨" },
] as const;

export const PURPOSE_OPTIONS = [
  { value: "sprint-planning" as const, label: "Sprint Planning", description: "AI-powered sprint estimation and planning", icon: "📋", products: ["atlas"] as const },
  { value: "revenue-intelligence" as const, label: "Revenue Intelligence", description: "Customer signals to revenue insights", icon: "💰", products: ["loop"] as const },
  { value: "incident-management" as const, label: "Incident Management", description: "Revenue-aware incident response", icon: "🚨", products: ["signal"] as const },
  { value: "design-governance" as const, label: "Design Governance", description: "Keep design systems in sync with code", icon: "🎨", products: ["drift"] as const },
  { value: "tech-debt-tracking" as const, label: "Tech Debt Tracking", description: "Debt visibility in dollars, not jargon", icon: "👻", products: ["phantom"] as const },
  { value: "cross-team-alignment" as const, label: "Cross-Team Alignment", description: "Connect eng, product, design, GTM", icon: "🔗", products: ["nexus"] as const },
  { value: "project-management" as const, label: "Project Management", description: "Track delivery across teams and projects", icon: "📊", products: ["atlas"] as const },
  { value: "capacity-planning" as const, label: "Capacity Planning", description: "Plan team workload and availability", icon: "👥", products: ["atlas"] as const },
] as const;

export const ROLE_PURPOSE_MAP: Record<string, Purpose[]> = {
  "engineering-manager": ["sprint-planning", "tech-debt-tracking", "capacity-planning", "project-management", "cross-team-alignment"],
  "tech-lead": ["sprint-planning", "tech-debt-tracking", "design-governance", "project-management"],
  "product-manager": ["sprint-planning", "revenue-intelligence", "cross-team-alignment", "project-management", "capacity-planning"],
  "cto-vp": ["sprint-planning", "revenue-intelligence", "incident-management", "design-governance", "tech-debt-tracking", "cross-team-alignment", "project-management", "capacity-planning"],
  "engineer": ["sprint-planning", "tech-debt-tracking", "project-management"],
  "designer": ["design-governance", "cross-team-alignment", "sprint-planning"],
  "founder": ["revenue-intelligence", "cross-team-alignment", "sprint-planning", "project-management", "capacity-planning"],
  "operations": ["project-management", "capacity-planning", "cross-team-alignment", "incident-management"],
  "devops-sre": ["incident-management", "tech-debt-tracking", "sprint-planning"],
  "qa-engineer": ["sprint-planning", "tech-debt-tracking", "project-management"],
  "data-engineer": ["sprint-planning", "tech-debt-tracking", "project-management"],
  "sales-leader": ["revenue-intelligence", "cross-team-alignment"],
  "cs-leader": ["revenue-intelligence", "incident-management", "cross-team-alignment"],
  "marketing": ["revenue-intelligence", "cross-team-alignment"],
  "other": ["sprint-planning", "revenue-intelligence", "incident-management", "design-governance", "tech-debt-tracking", "cross-team-alignment", "project-management", "capacity-planning"],
};

/** Maps UserRole to compatible TeamType values for team identification and board recommendations. */
export const ROLE_TEAM_TYPE_MAP: Record<string, readonly string[]> = {
  "engineering-manager": ["engineering", "devops-sre", "qa", "data"],
  "tech-lead": ["engineering", "devops-sre", "qa"],
  "product-manager": ["product", "design", "engineering"],
  "cto-vp": ["leadership", "engineering", "product"],
  "engineer": ["engineering", "devops-sre", "qa", "data"],
  "designer": ["design", "product"],
  "founder": ["leadership", "engineering", "product"],
  "operations": ["operations"],
  "devops-sre": ["devops-sre", "engineering"],
  "qa-engineer": ["qa", "engineering"],
  "data-engineer": ["data", "engineering"],
  "sales-leader": ["sales", "marketing", "customer-success"],
  "cs-leader": ["customer-success", "sales", "marketing"],
  "marketing": ["marketing", "sales", "customer-success"],
  "other": ["engineering", "product", "design", "leadership"],
};

export const PRODUCT_CARDS = [
  {
    key: "atlas" as const,
    name: "ATLAS",
    tagline: "AI Sprint Planner",
    description: "Code complexity, team capacity, and business priority in every sprint plan.",
    icon: "🎯",
    color: "#f16e2c",
    features: ["AI estimation", "Code analysis", "Burndown tracking", "Accuracy insights", "Vulnerability scanning", "AI remediation"],
    integrations: ["github", "gitlab", "bitbucket", "jira", "linear", "figma"] as const,
    bestFor: ["Engineering", "Product"],
    available: true,
  },
  {
    key: "loop" as const,
    name: "LOOP",
    tagline: "Revenue Feedback Engine",
    description: "Close the loop between customer demand and engineering delivery.",
    icon: "🔄",
    color: "#6366F1",
    features: ["Signal detection", "Churn risk", "Deal velocity", "Revenue-weighted backlog"],
    integrations: ["gong", "salesforce", "hubspot", "zendesk", "intercom", "slack"] as const,
    bestFor: ["Product", "Sales", "CS"],
    available: true,
  },
  {
    key: "signal" as const,
    name: "SIGNAL",
    tagline: "Incident Intelligence",
    description: "Translate incidents into revenue impact for SRE/DevOps teams.",
    icon: "🚨",
    color: "#EF4444",
    features: ["Impact assessment", "Smart routing", "Revenue context", "Alert intelligence"],
    integrations: ["datadog", "pagerduty", "opsgenie", "sentry", "grafana", "slack"] as const,
    bestFor: ["SRE/DevOps", "Engineering"],
    available: true,
  },
  {
    key: "drift" as const,
    name: "DRIFT",
    tagline: "Design System Sync",
    description: "Keep Figma designs and code components in permanent sync.",
    icon: "🎨",
    color: "#8B5CF6",
    features: ["Drift detection", "Token sync", "Component audit", "UX analytics"],
    integrations: ["figma", "sketch", "github", "gitlab"] as const,
    bestFor: ["Design", "Frontend"],
    available: false,
  },
  {
    key: "phantom" as const,
    name: "PHANTOM",
    tagline: "Tech Debt Radar",
    description: "Tech debt visible in dollars for leadership — not jargon.",
    icon: "👻",
    color: "#22D3EE",
    features: ["Debt scoring", "Dollar impact", "Remediation plans", "Executive dashboard"],
    integrations: ["github", "gitlab", "bitbucket", "jira", "datadog"] as const,
    bestFor: ["Eng Leadership", "Platform"],
    available: false,
  },
  {
    key: "nexus" as const,
    name: "NEXUS",
    tagline: "Full Platform",
    description: "All products unified into one AI organizational nerve center.",
    icon: "🧠",
    color: "#10B981",
    features: ["All products", "Cross-team graph", "Org-level KPIs", "Executive view"],
    integrations: ["github", "gitlab", "jira", "salesforce", "figma", "datadog", "slack"] as const,
    bestFor: ["Leadership", "Enterprise"],
    available: false,
  },
] as const;

export const INTEGRATION_CATALOG = [
  // Code — OAuth 2.0 (Tier 2)
  { key: "github" as const, name: "GitHub", category: "Code" as const, icon: "GH", authMethod: "oauth2" as const, products: ["atlas", "phantom", "drift"] as const },
  { key: "gitlab" as const, name: "GitLab", category: "Code" as const, icon: "GL", authMethod: "oauth2_pkce" as const, products: ["atlas", "phantom", "drift"] as const },
  { key: "bitbucket" as const, name: "Bitbucket", category: "Code" as const, icon: "BB", authMethod: "oauth2" as const, products: ["atlas", "phantom"] as const },
  { key: "azure-devops" as const, name: "Azure DevOps", category: "Code" as const, icon: "AZ", authMethod: "oauth2" as const, products: ["atlas", "phantom"] as const },
  // Project — OAuth 2.0 (Jira = PKCE required)
  { key: "jira" as const, name: "Jira", category: "Project" as const, icon: "JR", authMethod: "oauth2_pkce" as const, products: ["atlas", "phantom"] as const },
  { key: "linear" as const, name: "Linear", category: "Project" as const, icon: "LN", authMethod: "oauth2" as const, products: ["atlas"] as const },
  { key: "asana" as const, name: "Asana", category: "Project" as const, icon: "AS", authMethod: "oauth2" as const, products: ["atlas"] as const },
  { key: "monday" as const, name: "Monday.com", category: "Project" as const, icon: "MN", authMethod: "oauth2" as const, products: ["atlas"] as const },
  { key: "clickup" as const, name: "ClickUp", category: "Project" as const, icon: "CU", authMethod: "oauth2" as const, products: ["atlas"] as const },
  { key: "trello" as const, name: "Trello", category: "Project" as const, icon: "TR", authMethod: "oauth2" as const, products: ["atlas"] as const },
  // CRM — OAuth 2.0
  { key: "salesforce" as const, name: "Salesforce", category: "CRM" as const, icon: "SF", authMethod: "oauth2_pkce" as const, products: ["loop"] as const },
  { key: "hubspot" as const, name: "HubSpot", category: "CRM" as const, icon: "HS", authMethod: "oauth2" as const, products: ["loop"] as const },
  { key: "pipedrive" as const, name: "Pipedrive", category: "CRM" as const, icon: "PD", authMethod: "oauth2" as const, products: ["loop"] as const },
  // Revenue — API Key (Tier 3)
  { key: "gong" as const, name: "Gong", category: "Revenue" as const, icon: "GG", authMethod: "api_key" as const, products: ["loop"] as const, requiredFields: [{ key: "api_key", label: "API Key", placeholder: "Enter your Gong API key", secret: true }] as const },
  // Support — OAuth 2.0
  { key: "zendesk" as const, name: "Zendesk", category: "Support" as const, icon: "ZD", authMethod: "oauth2" as const, products: ["loop", "signal"] as const },
  { key: "intercom" as const, name: "Intercom", category: "Support" as const, icon: "IC", authMethod: "oauth2" as const, products: ["loop"] as const },
  { key: "freshdesk" as const, name: "Freshdesk", category: "Support" as const, icon: "FD", authMethod: "api_key" as const, products: ["loop"] as const, requiredFields: [{ key: "api_key", label: "API Key", placeholder: "Enter your Freshdesk API key", secret: true }, { key: "domain", label: "Subdomain", placeholder: "yourcompany.freshdesk.com", secret: false }] as const },
  // Communication — OAuth 2.0
  { key: "slack" as const, name: "Slack", category: "Communication" as const, icon: "SL", authMethod: "oauth2" as const, products: ["atlas", "loop", "signal"] as const },
  { key: "teams" as const, name: "MS Teams", category: "Communication" as const, icon: "TM", authMethod: "oauth2" as const, products: ["atlas", "loop", "signal"] as const },
  { key: "discord" as const, name: "Discord", category: "Communication" as const, icon: "DC", authMethod: "oauth2" as const, products: ["atlas"] as const },
  // Design — OAuth 2.0
  { key: "figma" as const, name: "Figma", category: "Design" as const, icon: "FG", authMethod: "oauth2" as const, products: ["drift", "atlas"] as const },
  { key: "sketch" as const, name: "Sketch", category: "Design" as const, icon: "SK", authMethod: "api_key" as const, products: ["drift"] as const, requiredFields: [{ key: "api_token", label: "Personal Access Token", placeholder: "Enter your Sketch API token", secret: true }] as const },
  // Monitoring — API Key (Tier 3)
  { key: "datadog" as const, name: "Datadog", category: "Monitoring" as const, icon: "DD", authMethod: "api_key" as const, products: ["signal", "phantom"] as const, requiredFields: [{ key: "api_key", label: "API Key", placeholder: "Enter your Datadog API key", secret: true }, { key: "app_key", label: "Application Key", placeholder: "Enter your Datadog app key", secret: true }] as const },
  { key: "pagerduty" as const, name: "PagerDuty", category: "Monitoring" as const, icon: "PG", authMethod: "api_key" as const, products: ["signal"] as const, requiredFields: [{ key: "api_key", label: "REST API Key", placeholder: "Enter your PagerDuty API key", secret: true }] as const },
  { key: "opsgenie" as const, name: "OpsGenie", category: "Monitoring" as const, icon: "OG", authMethod: "api_key" as const, products: ["signal"] as const, requiredFields: [{ key: "api_key", label: "API Key", placeholder: "Enter your OpsGenie API key", secret: true }] as const },
  { key: "sentry" as const, name: "Sentry", category: "Monitoring" as const, icon: "SN", authMethod: "api_key" as const, products: ["signal"] as const, requiredFields: [{ key: "auth_token", label: "Auth Token", placeholder: "Enter your Sentry auth token", secret: true }, { key: "org_slug", label: "Organization Slug", placeholder: "your-org-slug", secret: false }] as const },
  { key: "grafana" as const, name: "Grafana", category: "Monitoring" as const, icon: "GF", authMethod: "api_key" as const, products: ["signal"] as const, requiredFields: [{ key: "api_key", label: "API Key", placeholder: "Enter your Grafana API key", secret: true }, { key: "base_url", label: "Grafana URL", placeholder: "https://your-instance.grafana.net", secret: false }] as const },
  // Documents — OAuth 2.0
  { key: "google-drive" as const, name: "Google Drive", category: "Documents" as const, icon: "GD", authMethod: "oauth2_pkce" as const, products: ["loop"] as const },
  { key: "notion" as const, name: "Notion", category: "Documents" as const, icon: "NT", authMethod: "oauth2" as const, products: ["atlas", "loop"] as const },
  { key: "confluence" as const, name: "Confluence", category: "Documents" as const, icon: "CF", authMethod: "oauth2_pkce" as const, products: ["atlas"] as const },
  // Import
  { key: "csv" as const, name: "CSV Upload", category: "Import" as const, icon: "CS", authMethod: "api_key" as const, products: ["atlas", "loop"] as const },
] as const;

export const DASHBOARD_LAYOUT_OPTIONS = [
  { value: "compact" as const, label: "Compact", description: "Dense information, for power users", icon: "▣" },
  { value: "standard" as const, label: "Standard", description: "Balanced view, recommended for most teams", icon: "▤" },
  { value: "detailed" as const, label: "Detailed", description: "Expanded cards and charts, for deep analysis", icon: "▦" },
] as const;

export const AI_MODE_OPTIONS = [
  { value: "proactive" as const, label: "Proactive", description: "AI actively suggests changes and flags risks before you ask" },
  { value: "balanced" as const, label: "Balanced", description: "AI assists when helpful but stays out of the way (recommended)" },
  { value: "conservative" as const, label: "Conservative", description: "AI only responds when explicitly asked, minimal automation" },
] as const;

export const ENVIRONMENT_OPTIONS = [
  { value: "production" as const, label: "Production", color: "#22C55E" },
  { value: "staging" as const, label: "Staging", color: "#F59E0B" },
  { value: "development" as const, label: "Development", color: "#6366F1" },
  { value: "testing" as const, label: "Testing", color: "#8B5CF6" },
] as const;

export const SPRINT_CADENCE_OPTIONS = [
  { value: "1-week" as const, label: "1 week" },
  { value: "2-week" as const, label: "2 weeks" },
  { value: "3-week" as const, label: "3 weeks" },
  { value: "4-week" as const, label: "4 weeks" },
  { value: "continuous" as const, label: "Continuous" },
] as const;

export const PROJECT_COLOR_OPTIONS = [
  "#0d9488", "#6366F1", "#F59E0B", "#EF4444", "#8B5CF6",
  "#EC4899", "#22D3EE", "#F97316", "#14B8A6", "#A855F7",
] as const;

export const DEFAULT_MOCK_PROJECTS = [
  {
    id: "proj-1",
    name: "Web Platform",
    slug: "web-platform",
    description: "Main customer-facing web application and API",
    repoIds: ["1", "2"],
    teamId: "team-1",
    environment: "production" as const,
    sprintCadence: "2-week" as const,
    color: "#0d9488",
  },
  {
    id: "proj-2",
    name: "Mobile App",
    slug: "mobile-app",
    description: "iOS and Android mobile applications",
    repoIds: ["3"],
    teamId: "team-1",
    environment: "staging" as const,
    sprintCadence: "2-week" as const,
    color: "#6366F1",
  },
  {
    id: "proj-3",
    name: "Infrastructure",
    slug: "infrastructure",
    description: "Cloud infrastructure and DevOps tooling",
    repoIds: ["4", "7"],
    teamId: "team-2",
    environment: "production" as const,
    sprintCadence: "1-week" as const,
    color: "#F59E0B",
  },
  {
    id: "proj-4",
    name: "Data & ML",
    slug: "data-ml",
    description: "Data pipelines and machine learning models",
    repoIds: ["6", "9"],
    teamId: "team-2",
    environment: "development" as const,
    sprintCadence: "3-week" as const,
    color: "#8B5CF6",
  },
] as const;

export const DEFAULT_MOCK_TEAMS = [
  {
    id: "team-1",
    name: "Product Engineering",
    slug: "product-engineering",
    leadEmail: "sarah.k@acmecorp.com",
    members: [] as { email: string; role: "admin" | "manager" | "member" | "viewer"; teamId?: string; projectIds?: string[] }[],
    projectIds: ["proj-1", "proj-2"],
  },
  {
    id: "team-2",
    name: "Platform & Infra",
    slug: "platform-infra",
    leadEmail: "james.l@acmecorp.com",
    members: [] as { email: string; role: "admin" | "manager" | "member" | "viewer"; teamId?: string; projectIds?: string[] }[],
    projectIds: ["proj-3", "proj-4"],
  },
] as const;

export const LOADING_TIPS = [
  "ATLAS considers 6 signals: code complexity, team capacity, customer demand, tech debt, design scope, and business priority.",
  "Teams using ATLAS improved sprint accuracy from 42% to 87% in just 3 sprints.",
  "ATLAS never stores your source code. It only retains structural metadata like complexity scores.",
  "Planning meetings went from 2+ hours to 20 minutes with ATLAS-generated sprint plans.",
  "PHANTOM turns tech debt into dollar amounts so you can justify refactoring to leadership.",
  "LOOP connects sales call feedback to your sprint priorities. Know which features block real revenue.",
  "SIGNAL translates production incidents into customer revenue impact.",
  "DRIFT keeps your Figma designs and production code in sync.",
] as const;
