import type { Industry, ProductKey } from "@/types";

/** Public marketing routes under `/industries/[slug]` — subset of full onboarding `Industry` values. */
export const MARKETING_INDUSTRY_SLUGS = [
  "saas",
  "fintech",
  "healthtech",
  "enterprise",
  "ecommerce",
  "devtools",
  "ai-ml",
] as const satisfies readonly Industry[];

export type MarketingIndustrySlug = (typeof MARKETING_INDUSTRY_SLUGS)[number];

export function isMarketingIndustrySlug(slug: string): slug is MarketingIndustrySlug {
  return (MARKETING_INDUSTRY_SLUGS as readonly string[]).includes(slug);
}

/** Hero mesh / card chrome — unique per vertical (no bitmap assets). */
export interface IndustryHeroVisual {
  orbA: string;
  orbB: string;
  orbC: string;
}

export const INDUSTRY_HUB_VISUAL: IndustryHeroVisual = {
  orbA: "#004838",
  orbB: "#0d9488",
  orbC: "#22c55e",
};

export const INDUSTRY_HUB_PHOTO = {
  src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1800&q=80",
  alt: "Cross-functional team collaborating at a whiteboard and laptops in a modern office",
} as const;

export interface IndustryPageCta {
  label: string;
  href: string;
}

export interface IndustryPagePlaybookStep {
  title: string;
  body: string;
}

export interface IndustryRelatedLink {
  title: string;
  href: string;
}

export interface IndustryProofPoint {
  value: string;
  label: string;
  hint?: string;
}

export interface IndustrySolutionPillar {
  icon: string;
  title: string;
  body: string;
}

export interface IndustrySolutionLink {
  title: string;
  href: string;
  description: string;
}

export interface IndustryQuote {
  text: string;
  attribution: string;
  role: string;
}

export interface IndustryPageContent {
  slug: MarketingIndustrySlug;
  title: string;
  description: string;
  heroEyebrow: string;
  heroHeadline: string;
  heroSubheadline: string;
  hubTeaser: string;
  hubTagline: string;
  /** Editorial photography (Unsplash) — human context alongside abstract hero art */
  photoSrc: string;
  photoAlt: string;
  visual: IndustryHeroVisual;
  proofPoints: readonly IndustryProofPoint[];
  challengeLead: string;
  scenarioParagraph: string;
  solutionPillars: readonly IndustrySolutionPillar[];
  painPoints: string[];
  outcomes: readonly string[];
  playbookSteps: readonly IndustryPagePlaybookStep[];
  recommendedProducts: readonly ProductKey[];
  recommendedSolutions: readonly IndustrySolutionLink[];
  relatedUseCases: readonly IndustryRelatedLink[];
  quote: IndustryQuote;
  ctas: readonly IndustryPageCta[];
  trustNote?: string;
}

export const INDUSTRY_PAGE_BY_SLUG: Record<MarketingIndustrySlug, IndustryPageContent> = {
  saas: {
    slug: "saas",
    title: "SaaS — Voatomy for Product-Led Engineering",
    description:
      "Align recurring releases with sprint reality: code-aware estimates, debt visibility, and revenue-weighted priorities for B2B and B2C SaaS teams.",
    heroEyebrow: "SaaS",
    heroHeadline: "Ship every release cycle with predictable velocity",
    heroSubheadline:
      "Voatomy connects roadmap pressure, sprint debt, and GTM signals so engineering, product, and revenue stay on the same page — without more status meetings.",
    hubTeaser:
      "Recurring releases and sprint cadence stay tied to capacity and code reality. GTM sees the same priorities engineering defends in every retro.",
    hubTagline: "Product-led growth meets engineering truth.",
    photoSrc:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
    photoAlt: "Product and engineering team collaborating around laptops in an open office",
    visual: { orbA: "#0d9488", orbB: "#0284c7", orbC: "#6366f1" },
    proofPoints: [
      { value: "87%", label: "Sprint accuracy", hint: "typical ATLAS cohort after calibration" },
      { value: "6", label: "Signals in every plan", hint: "code, capacity, demand, debt, design, revenue" },
      { value: "Weeks", label: "Faster exec alignment", hint: "one graph instead of dueling decks" },
    ],
    challengeLead:
      "SaaS teams scale until planning becomes politics: every function has a dashboard, but no one shares a model of what can actually ship.",
    scenarioParagraph:
      "It is Tuesday. Sales promised a date in QBR. Support is red-hot on three accounts. Your EM opens Voatomy and sees the same sprint risk, revenue tags, and code hotspots as your PM — before the escalation hits Slack.",
    solutionPillars: [
      {
        icon: "🎯",
        title: "One plan everyone defends",
        body: "ATLAS turns code structure and capacity into a sprint narrative PMs, EMs, and sales can cite in customer calls — not a second spreadsheet.",
      },
      {
        icon: "💰",
        title: "Revenue-weighted backlog",
        body: "LOOP ties CRM and support to tickets so roadmap reviews rank work by ARR and churn risk, not who argued loudest.",
      },
      {
        icon: "👻",
        title: "Debt with a dollar story",
        body: "PHANTOM gives tech debt an executive-friendly cost so refactors win capacity next to features.",
      },
    ],
    painPoints: [
      "Roadmaps promise dates that engineering cannot defend with data.",
      "Story points diverge across squads, breaking cross-team planning.",
      "Tech debt competes with features but never gets a dollar or risk score.",
      "Sales and CS commitments outpace what capacity models actually support.",
      "Leadership reviews turn into narrative battles instead of a single execution graph.",
    ],
    outcomes: [
      "Sprint plans that cite code complexity, capacity, and debt — not opinion.",
      "Revenue-weighted backlog so PMs and sales align on what “urgent” means.",
      "Cross-team visibility as you add squads without losing delivery truth.",
      "Fewer estimation meetings and more time shipping customer value.",
    ],
    playbookSteps: [
      {
        title: "Connect code and work",
        body: "Link Git + Jira/Linear so ATLAS reads structure, churn, and dependencies while tickets stay the system of record.",
      },
      {
        title: "Publish one plan narrative",
        body: "Share sprint composition and risk flags with product and GTM so commitments use the same numbers.",
      },
      {
        title: "Layer revenue and debt",
        body: "Add LOOP for pipeline-weighted priorities and PHANTOM when debt needs a CFO-friendly storyline.",
      },
    ],
    recommendedProducts: ["atlas", "loop", "phantom", "nexus"],
    recommendedSolutions: [
      {
        title: "Product leaders",
        href: "/solutions/product-leaders",
        description: "Revenue-weighted roadmaps and customer signal alignment.",
      },
      {
        title: "Engineering managers",
        href: "/solutions/engineering-managers",
        description: "Sprint plans your team can trust with less meeting time.",
      },
      {
        title: "Customer success",
        href: "/solutions/customer-success",
        description: "Health, incidents, and delivery visibility in one loop.",
      },
    ],
    relatedUseCases: [
      { title: "Sprint planning", href: "/use-cases/sprint-planning" },
      { title: "Feedback → roadmap", href: "/use-cases/feedback-roadmap" },
      { title: "Revenue intelligence", href: "/use-cases/revenue-intelligence" },
      { title: "Cross-team alignment", href: "/use-cases/cross-team" },
    ],
    quote: {
      text: "We stopped debating story points in leadership reviews. The plan cites code and capacity — finance finally hears engineering in one language.",
      attribution: "VP Engineering",
      role: "B2B SaaS · Series C",
    },
    ctas: [
      { label: "Get early access", href: "/auth/signup" },
      { label: "See ATLAS", href: "/products/atlas" },
    ],
  },
  fintech: {
    slug: "fintech",
    title: "Fintech — Revenue-Aware Delivery & Incidents",
    description:
      "Prioritize engineering work and incidents with compliance context, audit-friendly signals, and revenue impact — built for regulated, high-stakes releases.",
    heroEyebrow: "Fintech",
    heroHeadline: "Delivery and incidents your risk committee can trust",
    heroSubheadline:
      "From change control to on-call, Voatomy ties tickets, code complexity, and customer revenue so trade-offs are explainable — not tribal.",
    hubTeaser:
      "Triage incidents with revenue and policy context. Keep audit evidence adjacent to the work — not buried in email threads and screenshots.",
    hubTagline: "Operational resilience with revenue context.",
    photoSrc:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1600&q=80",
    photoAlt: "Financial data and analytics on multiple monitors in a trading-style workspace",
    visual: { orbA: "#0f766e", orbB: "#1e3a5f", orbC: "#ca8a04" },
    proofPoints: [
      { value: "P1", label: "Tied to ARR", hint: "not every alert is existential" },
      { value: "SOC 2", label: "Ready posture", hint: "audit logs, isolation, encryption" },
      { value: "One", label: "Incident story", hint: "from pager to customer to dollar" },
    ],
    challengeLead:
      "Financial services run on uptime promises and regulatory scrutiny — yet most incident tools still sort by service name, not exposure.",
    scenarioParagraph:
      "Payments latency spikes. On-call sees SIGNAL attach pipeline stage, affected ARR, and the last change window — CS gets talking points before the first executive ping.",
    solutionPillars: [
      {
        icon: "🚨",
        title: "Revenue-scored incidents",
        body: "SIGNAL ranks what to wake up for: which customers, contracts, and regions are in the blast radius.",
      },
      {
        icon: "🔄",
        title: "CRM-linked backlog",
        body: "LOOP keeps roadmap and release reviews honest with the same account truth your risk team already trusts.",
      },
      {
        icon: "📋",
        title: "Change you can prove",
        body: "ATLAS documents capacity and code risk so approvals are evidence-led, not hero-led.",
      },
    ],
    painPoints: [
      "Incidents lack instant business and regulatory context for triage.",
      "Feature work is prioritized without a unified view of risk and revenue.",
      "Audit requests slow teams because evidence lives in scattered tools.",
      "Change windows compress while stakeholders still want full traceability.",
      "On-call rotations burn out when every alert feels equally existential.",
    ],
    outcomes: [
      "Revenue-scored incidents so the right leader sees the right page first.",
      "CRM-linked backlog context for roadmap reviews and release gates.",
      "A consistent story from ticket → deploy → customer impact for auditors.",
      "Fewer false escalations and faster path to mitigation for material issues.",
    ],
    playbookSteps: [
      {
        title: "Instrument revenue context",
        body: "Connect CRM and support so SIGNAL and LOOP enrich incidents and epics with ARR, segment, and policy tags.",
      },
      {
        title: "Standardize severity",
        body: "Define what P1–P4 means in dollars and customers, then route automatically instead of debating in Slack.",
      },
      {
        title: "Prove change discipline",
        body: "Use ATLAS plans plus audit logs so releases show who approved scope, capacity, and risk acceptance.",
      },
    ],
    recommendedProducts: ["atlas", "signal", "loop", "nexus"],
    recommendedSolutions: [
      {
        title: "SRE & DevOps",
        href: "/solutions/sre-devops",
        description: "Revenue-aware incidents and intelligent routing.",
      },
      {
        title: "CTO & VP Engineering",
        href: "/solutions/cto-vp-engineering",
        description: "Board-ready resilience and delivery narratives.",
      },
      {
        title: "Customer success",
        href: "/solutions/customer-success",
        description: "Proactive comms when incidents touch high-value accounts.",
      },
    ],
    relatedUseCases: [
      { title: "Incident intelligence", href: "/use-cases/incident-intelligence" },
      { title: "Revenue intelligence", href: "/use-cases/revenue-intelligence" },
      { title: "Cross-team alignment", href: "/use-cases/cross-team" },
      { title: "Tech debt management", href: "/use-cases/tech-debt-management" },
    ],
    quote: {
      text: "We finally escalated by customer impact, not loudest Slack thread. SIGNAL plus LOOP is the bridge between on-call and the revenue org.",
      attribution: "Head of Infrastructure",
      role: "Payments platform · Fintech",
    },
    ctas: [
      { label: "Talk to sales", href: "/contact" },
      { label: "Incident intelligence", href: "/use-cases/incident-intelligence" },
    ],
    trustNote:
      "Designed for enterprise controls: encryption, tenant isolation, and audit logging as baseline expectations — align with your SOC 2 and vendor risk programs.",
  },
  healthtech: {
    slug: "healthtech",
    title: "HealthTech — Trust, Change Control & Safe Shipping",
    description:
      "Balance patient trust and velocity: severity tied to impact, disciplined change control, and cross-team visibility for digital health and medtech platforms.",
    heroEyebrow: "HealthTech",
    heroHeadline: "When severity maps to patient and revenue impact",
    heroSubheadline:
      "Voatomy helps HealthTech teams weigh incidents and releases with clarity — so engineering decisions reflect clinical and commercial reality.",
    hubTeaser:
      "Unify incidents, design integrity, and release planning so quality and compliance teams read the same system — not parallel spreadsheets.",
    hubTagline: "Trust, traceability, and velocity together.",
    photoSrc:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80",
    photoAlt: "Healthcare professional using tablet technology in a clinical setting",
    visual: { orbA: "#059669", orbB: "#0891b2", orbC: "#7c3aed" },
    proofPoints: [
      { value: "One", label: "Impact frame", hint: "patient, region, revenue in one view" },
      { value: "Design", label: "Drift control", hint: "Figma ↔ code for shared systems" },
      { value: "Faster", label: "Calm incidents", hint: "facts before comms templates" },
    ],
    challengeLead:
      "Digital health moves fast — but regulators, clinicians, and patients all need evidence that change was deliberate, tested, and proportional.",
    scenarioParagraph:
      "A telemetry anomaly hits a connected device cohort. SIGNAL surfaces geography and contract tier; DRIFT confirms UI tokens still match the approved release; ATLAS shows what else shipped in the window.",
    solutionPillars: [
      {
        icon: "🛡",
        title: "Severity with context",
        body: "Unify monitoring, CRM, and support so incidents are triaged with cohort and revenue exposure — not guesswork.",
      },
      {
        icon: "🎨",
        title: "Design integrity at scale",
        body: "DRIFT watches shared design systems so drift is caught before it becomes a quality or compliance surprise.",
      },
      {
        icon: "📋",
        title: "Change boards that trust engineering",
        body: "ATLAS backs release scope with code and dependency truth so approvals are faster and auditable.",
      },
    ],
    painPoints: [
      "Incident severity debates lack a shared patient and business frame.",
      "Design and code drift create quality risk across product lines.",
      "Cross-functional alignment breaks under HIPAA-style scrutiny.",
      "Post-market changes need traceability that ticket tools alone cannot provide.",
      "Clinical, eng, and commercial teams each maintain their own “source of truth.”",
    ],
    outcomes: [
      "Shared definitions of impact: patient cohorts, regions, and revenue exposure.",
      "Design-code monitoring that catches drift before it becomes a recall-class issue.",
      "Release narratives that tie scope, testing evidence, and approvals together.",
      "Faster, calmer incident comms with pre-approved templates grounded in facts.",
    ],
    playbookSteps: [
      {
        title: "Connect clinical and commercial signals",
        body: "Bring support, CRM, and monitoring into one graph so severity isn’t guessed from pager noise alone.",
      },
      {
        title: "Guard design integrity",
        body: "Use DRIFT on shared systems so token and component drift is visible across product lines.",
      },
      {
        title: "Size change honestly",
        body: "Let ATLAS reflect real code and dependency risk so change boards approve scope with confidence.",
      },
    ],
    recommendedProducts: ["atlas", "signal", "drift", "phantom"],
    recommendedSolutions: [
      {
        title: "Design teams",
        href: "/solutions/design-teams",
        description: "Design governance and code sync for regulated UX.",
      },
      {
        title: "Customer success",
        href: "/solutions/customer-success",
        description: "Health signals and incident context for renewals.",
      },
      {
        title: "SRE & DevOps",
        href: "/solutions/sre-devops",
        description: "Operational clarity when minutes matter.",
      },
    ],
    relatedUseCases: [
      { title: "Incident intelligence", href: "/use-cases/incident-intelligence" },
      { title: "Design system health", href: "/use-cases/design-system-health" },
      { title: "Sprint planning", href: "/use-cases/sprint-planning" },
      { title: "Tech debt management", href: "/use-cases/tech-debt-management" },
    ],
    quote: {
      text: "Quality and engineering finally look at the same severity definition. DRIFT plus SIGNAL cut our ‘unknown unknown’ releases dramatically.",
      attribution: "Head of Quality",
      role: "Digital health · MedTech",
    },
    ctas: [
      { label: "Get early access", href: "/auth/signup" },
      { label: "Security overview", href: "/security" },
    ],
    trustNote:
      "Pair Voatomy with your HIPAA and quality programs: minimize sensitive content in tickets, enforce access boundaries, and retain evidence for reviews.",
  },
  enterprise: {
    slug: "enterprise",
    title: "Enterprise — Portfolio Visibility Across Engineering",
    description:
      "Large engineering orgs use Voatomy for portfolio-wide signals, dependency awareness, and executive-ready narratives — powered by NEXUS and ATLAS.",
    heroEyebrow: "Enterprise",
    heroHeadline: "One nerve center for dozens of teams and programs",
    heroSubheadline:
      "Replace fragmented dashboards with a connected graph of work, risk, and revenue — so VPs and CTOs see truth without manual roll-ups.",
    hubTeaser:
      "Portfolio views that respect team autonomy but expose dependency risk, spend, and customer commitments in one place.",
    hubTagline: "Portfolio truth without spreadsheet theater.",
    photoSrc:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    photoAlt: "Modern glass office towers reflecting sky at dusk",
    visual: { orbA: "#312e81", orbB: "#1e40af", orbC: "#0f766e" },
    proofPoints: [
      { value: "40+", label: "Teams mapped", hint: "dependency graph at a glance" },
      { value: "1", label: "Executive narrative", hint: "same data as squads" },
      { value: "Days", label: "Less QBR prep", hint: "fewer manual roll-ups" },
    ],
    challengeLead:
      "Enterprises buy visibility — then drown in partial metrics. Every division exports its own truth; the center cannot hold a coherent story.",
    scenarioParagraph:
      "Quarterly business review: NEXUS shows cross-program dependencies, LOOP highlights revenue at risk from slips, and ATLAS explains why dates moved — without a war room.",
    solutionPillars: [
      {
        icon: "🧠",
        title: "NEXUS portfolio graph",
        body: "See who depends on whom across programs, time zones, and vendors before commitments cascade.",
      },
      {
        icon: "🎯",
        title: "Squad-level truth that rolls up",
        body: "ATLAS keeps local planning honest while feeding the same signals leadership reviews.",
      },
      {
        icon: "💰",
        title: "Revenue on every decision",
        body: "LOOP connects CRM so portfolio trade-offs cite accounts and pipeline, not politics.",
      },
    ],
    painPoints: [
      "No single view of dependencies across divisions and geographies.",
      "Executive reviews depend on heroic manual reporting every quarter.",
      "Standardization conflicts with team autonomy in the trenches.",
      "Duplicate tooling and partial data make “single pane of glass” an empty promise.",
      "Transformation programs stall when no one agrees which metrics matter.",
    ],
    outcomes: [
      "Portfolio heatmaps across programs, regions, and product lines.",
      "Dependency-aware planning so one team’s slip doesn’t surprise five others.",
      "Board-ready narratives sourced from the same data engineering uses daily.",
      "A path from team-level ATLAS to org-wide NEXUS without rip-and-replace.",
    ],
    playbookSteps: [
      {
        title: "Map the execution graph",
        body: "Start with critical programs in NEXUS to surface cross-team edges and bottlenecks.",
      },
      {
        title: "Normalize planning signals",
        body: "Roll ATLAS out squad-by-squad so estimates and risks use one vocabulary upward.",
      },
      {
        title: "Attach business context",
        body: "Feed LOOP and SIGNAL so escalations and roadmap reviews cite revenue, not anecdotes.",
      },
    ],
    recommendedProducts: ["nexus", "atlas", "loop", "phantom"],
    recommendedSolutions: [
      {
        title: "CTO & VP Engineering",
        href: "/solutions/cto-vp-engineering",
        description: "Board-ready metrics and org-wide visibility.",
      },
      {
        title: "Engineering managers",
        href: "/solutions/engineering-managers",
        description: "Ground-truth planning for large orgs.",
      },
      {
        title: "Product leaders",
        href: "/solutions/product-leaders",
        description: "Portfolio alignment with revenue weighting.",
      },
    ],
    relatedUseCases: [
      { title: "Cross-team alignment", href: "/use-cases/cross-team" },
      { title: "Sprint planning", href: "/use-cases/sprint-planning" },
      { title: "Revenue intelligence", href: "/use-cases/revenue-intelligence" },
      { title: "Tech debt management", href: "/use-cases/tech-debt-management" },
    ],
    quote: {
      text: "We retired three executive dashboards. NEXUS is the first map that matched how teams actually depend on each other.",
      attribution: "CTO",
      role: "Global enterprise software",
    },
    ctas: [
      { label: "Contact enterprise", href: "/contact" },
      { label: "Cross-team alignment", href: "/use-cases/cross-team" },
    ],
  },
  ecommerce: {
    slug: "ecommerce",
    title: "E‑Commerce — Peak Traffic, Revenue, and Fast Iteration",
    description:
      "Connect storefront peaks, conversion-critical paths, and engineering sprints — so incidents and roadmap bets reflect revenue in real time.",
    heroEyebrow: "E‑Commerce",
    heroHeadline: "When every minute of downtime has a cart value",
    heroSubheadline:
      "Voatomy helps commerce platforms prioritize fixes and features with revenue-weighted backlog and incident context your teams can act on immediately.",
    hubTeaser:
      "Peak-season readiness with code-aware sizing plus incidents ranked by cart, segment, and campaign — not just service name.",
    hubTagline: "Peak traffic, peak clarity.",
    photoSrc:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=80",
    photoAlt: "Customer paying at a retail counter with shopping bags",
    visual: { orbA: "#ea580c", orbB: "#db2777", orbC: "#7c2d12" },
    proofPoints: [
      { value: "$", label: "Cart-aware triage", hint: "incidents ranked by revenue" },
      { value: "BF", label: "Season ready", hint: "capacity + code risk in one plan" },
      { value: "GTM", label: "Same backlog", hint: "growth and platform aligned" },
    ],
    challengeLead:
      "Commerce teams live in campaigns and conversion curves — engineering lives in services and deploys. The gap shows up as surprise outages and missed peaks.",
    scenarioParagraph:
      "Checkout error rate climbs during a flash sale. SIGNAL surfaces AOV and segment; LOOP shows which campaigns tie to the regression; ATLAS explains which change batch carried the risk.",
    solutionPillars: [
      {
        icon: "🛒",
        title: "Revenue-ranked incidents",
        body: "Wake the right people with cart, campaign, and SLA context — not just service topology.",
      },
      {
        icon: "📊",
        title: "Experiments with code truth",
        body: "Size growth bets with dependency and complexity signals so launches do not surprise platform.",
      },
      {
        icon: "🔗",
        title: "One backlog for GTM and eng",
        body: "LOOP aligns merchandising pressure with engineering capacity using shared customer and pipeline tags.",
      },
    ],
    painPoints: [
      "Black Friday readiness turns into all-hands chaos without shared priorities.",
      "Engineering cannot see which incidents hit highest-value customers first.",
      "Experiment backlogs outpace capacity with no code-aware sizing.",
      "Merchandising and growth ship dates collide with platform refactors silently.",
      "Third-party integrations fail in ways that don’t map cleanly to on-call ownership.",
    ],
    outcomes: [
      "Incident queues ordered by revenue, segment, and SLA — not loudest channel.",
      "Sprint trade-offs that include conversion surfaces and payment risk explicitly.",
      "Shared language between growth, commerce, and platform engineering.",
      "Faster rollback decisions when dollar exposure is visible in minutes.",
    ],
    playbookSteps: [
      {
        title: "Bind incidents to carts",
        body: "Connect monitoring, OMS, and CRM so SIGNAL scores impact in terms customers and finance already use.",
      },
      {
        title: "Size experiments with code truth",
        body: "Use ATLAS so checkout and search bets include complexity and dependency cost, not just story points.",
      },
      {
        title: "Align roadmap to revenue",
        body: "Let LOOP weight backlog items by pipeline, churn risk, and campaign deadlines together.",
      },
    ],
    recommendedProducts: ["atlas", "signal", "loop", "nexus"],
    recommendedSolutions: [
      {
        title: "Sales leaders",
        href: "/solutions/sales-leaders",
        description: "Ship dates and revenue-aligned enablement.",
      },
      {
        title: "Product leaders",
        href: "/solutions/product-leaders",
        description: "Prioritize what moves conversion and retention.",
      },
      {
        title: "SRE & DevOps",
        href: "/solutions/sre-devops",
        description: "Incidents with customer and revenue context.",
      },
    ],
    relatedUseCases: [
      { title: "Incident intelligence", href: "/use-cases/incident-intelligence" },
      { title: "Revenue intelligence", href: "/use-cases/revenue-intelligence" },
      { title: "Sprint planning", href: "/use-cases/sprint-planning" },
      { title: "Cross-team alignment", href: "/use-cases/cross-team" },
    ],
    quote: {
      text: "Black Friday used to be a guessing game. Now incidents sort by segment and basket — we recover revenue instead of just uptime charts.",
      attribution: "Director of Platform",
      role: "Global e‑commerce",
    },
    ctas: [
      { label: "Get early access", href: "/auth/signup" },
      { label: "Revenue intelligence", href: "/use-cases/revenue-intelligence" },
    ],
  },
  devtools: {
    slug: "devtools",
    title: "DevTools — Code-Centric Delivery with ATLAS & PHANTOM",
    description:
      "Developer-first companies run on fast iteration and deep codebases. Voatomy speaks your language: complexity, debt dollars, and sprint realism.",
    heroEyebrow: "DevTools",
    heroHeadline: "Dogfood the stack you sell — with estimates that respect the code",
    heroSubheadline:
      "ATLAS and PHANTOM map complexity and debt where your users live: repos, APIs, and docs-heavy surfaces — ideal for platform and tooling teams.",
    hubTeaser:
      "Public roadmaps meet private capacity truth. SDK and CLI teams get the same rigor you promise customers — complexity, debt, and docs scope in one loop.",
    hubTagline: "Builders deserve builder-grade planning.",
    photoSrc:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
    photoAlt: "Developer workspace with laptop showing code on screen",
    visual: { orbA: "#475569", orbB: "#0ea5e9", orbC: "#a855f7" },
    proofPoints: [
      { value: "SDK", label: "Debt in dollars", hint: "justify platform time" },
      { value: "API", label: "Scope realism", hint: "breaking changes staged" },
      { value: "1", label: "Public roadmap", hint: "same truth internally" },
    ],
    challengeLead:
      "DevTools companies sell rigor — then plan in spreadsheets. Public promises outrun internal capacity until support and Twitter remind you.",
    scenarioParagraph:
      "A major SDK release is promised at conf season. PHANTOM shows debt cost in the core client; ATLAS resizes the sprint with generated-code hotspots visible — PM and platform agree before the keynote.",
    solutionPillars: [
      {
        icon: "⚡",
        title: "Capacity truth for platform",
        body: "ATLAS understands polyglot repos, generated code, and shared libraries so sprint plans match how platform actually works.",
      },
      {
        icon: "👻",
        title: "Debt your CFO understands",
        body: "PHANTOM translates hotspots into time and money so platform investments win fair share of the roadmap.",
      },
      {
        icon: "🎨",
        title: "Docs and UI stay honest",
        body: "DRIFT keeps marketing sites and consoles aligned with the design system your developers ship against.",
      },
    ],
    painPoints: [
      "Public roadmaps create expectation debt without capacity truth.",
      "Internal dogfooding falls behind customer-facing velocity.",
      "Tech debt in core SDKs is invisible until it becomes a support fire.",
      "Breaking API changes are hard to stage against real downstream usage.",
      "Docs and examples drift from shipped behavior faster than teams can refresh them.",
    ],
    outcomes: [
      "Honest sprint commitments for platform teams with brutal context switching.",
      "Debt narratives in dollars so platform investments compete fairly with features.",
      "Design-code checks where UI kits and CLIs share components and tokens.",
      "A credible internal story that matches what you tell developers externally.",
    ],
    playbookSteps: [
      {
        title: "Instrument the platforms you ship",
        body: "Connect repos and boards so ATLAS reflects polyglot services, generated code, and shared libraries.",
      },
      {
        title: "Quantify platform debt",
        body: "Deploy PHANTOM on core SDKs and gateways to translate hotspots into time and money.",
      },
      {
        title: "Tighten docs and UI parity",
        body: "Add DRIFT where marketing sites and consoles reuse design systems with production code.",
      },
    ],
    recommendedProducts: ["atlas", "phantom", "drift", "nexus"],
    recommendedSolutions: [
      {
        title: "Engineering managers",
        href: "/solutions/engineering-managers",
        description: "Sprint intelligence for deeply technical teams.",
      },
      {
        title: "Design teams",
        href: "/solutions/design-teams",
        description: "Design systems that match shipped APIs and UIs.",
      },
      {
        title: "CTO & VP Engineering",
        href: "/solutions/cto-vp-engineering",
        description: "Platform ROI without hand-wavy debt.",
      },
    ],
    relatedUseCases: [
      { title: "Tech debt management", href: "/use-cases/tech-debt-management" },
      { title: "Sprint planning", href: "/use-cases/sprint-planning" },
      { title: "Design system health", href: "/use-cases/design-system-health" },
      { title: "Cross-team alignment", href: "/use-cases/cross-team" },
    ],
    quote: {
      text: "We finally gave platform the same narrative we give customers: complexity, debt, and dates from one system.",
      attribution: "VP Platform",
      role: "Developer tools · API-first",
    },
    ctas: [
      { label: "Explore PHANTOM", href: "/products/phantom" },
      { label: "Tech debt management", href: "/use-cases/tech-debt-management" },
    ],
  },
  "ai-ml": {
    slug: "ai-ml",
    title: "AI / ML — The AI Product Operating System for Model Teams",
    description:
      "Model shipping, eval debt, and cross-functional alignment — Voatomy extends your AI product discipline from notebooks to production roadmaps.",
    heroEyebrow: "AI / ML",
    heroHeadline: "From research spikes to production-grade release cadence",
    heroSubheadline:
      "Treat inference, data pipelines, and product surfaces as one delivery graph. Voatomy aligns ML, platform, and GTM on shared priorities and risk.",
    hubTeaser:
      "One place for experiment load, model risk, and customer commitments — so research, platform, and product don’t optimize three different backlogs.",
    hubTagline: "Ship models with the same rigor as product.",
    photoSrc:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80",
    photoAlt: "Abstract neural network visualization representing AI and machine learning",
    visual: { orbA: "#7c3aed", orbB: "#db2777", orbC: "#0369a1" },
    proofPoints: [
      { value: "ML", label: "On the sprint", hint: "eval + serving as scope" },
      { value: "Risk", label: "Visible", hint: "confidence tied to revenue" },
      { value: "GTM", label: "One backlog", hint: "research + product aligned" },
    ],
    challengeLead:
      "AI teams ship demos fast and production slowly — because notebooks, pipelines, and product surfaces live in different planning languages.",
    scenarioParagraph:
      "A flagship model slips. LOOP shows which enterprise renewals named the capability; ATLAS resizes the next cycle with training and serving work explicit; PHANTOM flags pipeline debt that will bite the next train job.",
    solutionPillars: [
      {
        icon: "🧪",
        title: "ML work as first-class scope",
        body: "ATLAS brings training, eval, and serving tasks into the same sprint graph as product engineering — with dependencies explicit.",
      },
      {
        icon: "💰",
        title: "Customer bets with receipts",
        body: "LOOP ties roadmap items to accounts and launches so model investments map to revenue and risk.",
      },
      {
        icon: "📉",
        title: "Eval and infra debt surfaced",
        body: "PHANTOM highlights where pipeline complexity or stale evals threaten the next release train.",
      },
    ],
    painPoints: [
      "Research and product timelines collide without a shared estimation language.",
      "Latency of model iteration hides in generic project tools.",
      "Customer commitments on AI features outpace measurable delivery confidence.",
      "Eval and data debt rarely get sprint capacity next to net-new models.",
      "Compliance and safety reviews need evidence that lives outside Jupyter.",
    ],
    outcomes: [
      "Sprint plans that surface data, eval, and serving work as first-class scope.",
      "Customer-facing promises tied to confidence intervals and risk flags, not vibes.",
      "Tech debt visibility for training pipelines, feature stores, and inference paths.",
      "Executive summaries that explain model bets in delivery and dollars.",
    ],
    playbookSteps: [
      {
        title: "Unify ML and product boards",
        body: "Bring model training, shipping, and serving tasks into ATLAS-backed cycles with explicit dependency edges.",
      },
      {
        title: "Weight bets with revenue",
        body: "Use LOOP so roadmap items cite which accounts, segments, or launches depend on each capability.",
      },
      {
        title: "Expose eval and infra debt",
        body: "Let PHANTOM highlight where pipeline complexity or stale evals threaten reliability and time-to-train.",
      },
    ],
    recommendedProducts: ["atlas", "loop", "phantom", "nexus"],
    recommendedSolutions: [
      {
        title: "Product leaders",
        href: "/solutions/product-leaders",
        description: "Reconcile roadmap promises with ML reality.",
      },
      {
        title: "CTO & VP Engineering",
        href: "/solutions/cto-vp-engineering",
        description: "Portfolio view across research and production.",
      },
      {
        title: "Engineering managers",
        href: "/solutions/engineering-managers",
        description: "Sprint plans that include pipeline and model work.",
      },
    ],
    relatedUseCases: [
      { title: "Sprint planning", href: "/use-cases/sprint-planning" },
      { title: "Revenue intelligence", href: "/use-cases/revenue-intelligence" },
      { title: "Tech debt management", href: "/use-cases/tech-debt-management" },
      { title: "Cross-team alignment", href: "/use-cases/cross-team" },
    ],
    quote: {
      text: "We stopped hiding model work in ‘spikes.’ ATLAS made eval and serving visible next to product tickets — execs finally saw why dates moved.",
      attribution: "Head of ML Platform",
      role: "Applied AI · Enterprise",
    },
    ctas: [
      { label: "Get early access", href: "/auth/signup" },
      { label: "Platform vision", href: "/products/nexus" },
    ],
  },
};
