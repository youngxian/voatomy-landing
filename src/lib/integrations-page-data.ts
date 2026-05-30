export type IntegrationCategory =
  | "Code"
  | "Project"
  | "Design"
  | "CRM"
  | "Support"
  | "Revenue"
  | "Monitoring"
  | "Communication"
  | "Documents"
  | "Import";

export type IntegrationStatus = "available" | "coming-soon";

export interface IntegrationItem {
  slug: string;
  name: string;
  abbr: string;
  color: string;
  category: IntegrationCategory;
  description: string;
  products: string[];
  status: IntegrationStatus;
}

export const INTEGRATION_STATS = [
  {
    value: "30+",
    label: "native integrations",
    quote: "Connect your full stack without custom development.",
  },
  {
    value: "5 min",
    label: "average setup time",
    quote: "OAuth flows that feel instant — not another IT project.",
  },
  {
    value: "Real-time",
    label: "bi-directional sync",
    quote: "Signals flow continuously into ATLAS, LOOP, and SIGNAL.",
  },
  {
    value: "99.9%",
    label: "connector uptime",
    quote: "Enterprise-grade reliability for every integration.",
  },
  {
    value: "Zero",
    label: "source code stored",
    quote: "We analyze metadata and signals — never your raw code.",
  },
] as const;

export const FEATURED_INTEGRATIONS = [
  {
    slug: "github",
    name: "GitHub",
    headline: "How engineering teams connect code complexity to sprint plans",
    gradient: "linear-gradient(135deg, #238636 0%, #0d1117 55%, #161b22 100%)",
    accent: "#238636",
  },
  {
    slug: "jira",
    name: "Jira",
    headline: "From board chaos to AI-backed sprint plans in one sync",
    gradient: "linear-gradient(135deg, #0052CC 0%, #0747A6 50%, #172B4D 100%)",
    accent: "#2684FF",
  },
  {
    slug: "slack",
    name: "Slack",
    headline: "Real-time sprint alerts where your team already lives",
    gradient: "linear-gradient(135deg, #E01E5A 0%, #4A154B 55%, #1a1a2e 100%)",
    accent: "#E01E5A",
  },
  {
    slug: "figma",
    name: "Figma",
    headline: "Design-code drift caught before it ships to production",
    gradient: "linear-gradient(135deg, #F24E1E 0%, #A259FF 45%, #0ACF83 100%)",
    accent: "#A259FF",
  },
  {
    slug: "salesforce",
    name: "Salesforce",
    headline: "Revenue signals wired into every backlog decision",
    gradient: "linear-gradient(135deg, #00A1E0 0%, #0176D3 50%, #032D60 100%)",
    accent: "#00A1E0",
  },
  {
    slug: "datadog",
    name: "Datadog",
    headline: "Incidents enriched with business context — not just alerts",
    gradient: "linear-gradient(135deg, #632CA6 0%, #4A154B 50%, #1a1033 100%)",
    accent: "#632CA6",
  },
] as const;

export const INTEGRATION_TESTIMONIALS = [
  {
    quote:
      "Connecting GitHub and Jira took under ten minutes. ATLAS had our first AI sprint plan before standup ended.",
    name: "Sarah Chen",
    role: "VP Engineering",
    company: "Meridian SaaS",
    rating: 5,
  },
  {
    quote:
      "Slack notifications for sprint risks changed how we run incidents. SIGNAL routes context before anyone pages the wrong team.",
    name: "Marcus Webb",
    role: "Head of Platform",
    company: "Novaledge Financial",
    rating: 5,
  },
  {
    quote:
      "Salesforce + LOOP finally gave product the revenue picture engineering never had. Prioritization debates dropped overnight.",
    name: "Elena Rodriguez",
    role: "Director of Product",
    company: "CartFlow",
    rating: 5,
  },
] as const;

export const INTEGRATION_REVIEWS = [
  {
    quote:
      "Setup was genuinely five minutes. OAuth, pick repos, done. No Jira admin ticket, no security review marathon.",
    name: "James K.",
    role: "Staff Engineer",
    rating: 5,
  },
  {
    quote:
      "The Datadog connector enriches every alert with customer ARR. That alone justified the rollout to leadership.",
    name: "Priya M.",
    role: "SRE Lead",
    rating: 5,
  },
  {
    quote:
      "Figma sync through DRIFT caught three design-token drifts we would have shipped. Integration paid for itself in week one.",
    name: "Tom H.",
    role: "Design Systems Lead",
    rating: 5,
  },
  {
    quote:
      "We requested a custom webhook for our internal tool. Voatomy shipped it in three weeks with full documentation.",
    name: "Anna L.",
    role: "Platform Architect",
    rating: 5,
  },
] as const;

export const LOGO_STRIP = [
  "GitHub",
  "GitLab",
  "Jira",
  "Linear",
  "Slack",
  "Figma",
  "Salesforce",
  "HubSpot",
  "Datadog",
  "Zendesk",
  "Notion",
  "PagerDuty",
  "Sentry",
  "Microsoft Teams",
] as const;

/** Animated hero constellation — x/y in % of hero canvas */
export const HERO_FLOATING_LOGOS = [
  { name: "GitHub", x: 6, y: 18, size: "lg" as const, drift: "a" as const, delay: 0, depth: 1.4 },
  { name: "Slack", x: 11, y: 42, size: "md" as const, drift: "b" as const, delay: 0.15, depth: 1.1 },
  { name: "Figma", x: 4, y: 66, size: "md" as const, drift: "c" as const, delay: 0.3, depth: 0.9 },
  { name: "Linear", x: 16, y: 82, size: "sm" as const, drift: "a" as const, delay: 0.45, depth: 1.2 },
  { name: "Datadog", x: 20, y: 8, size: "sm" as const, drift: "b" as const, delay: 0.2, depth: 1.0 },
  { name: "GitLab", x: 14, y: 28, size: "sm" as const, drift: "c" as const, delay: 0.55, depth: 0.8 },
  { name: "Jira", x: 90, y: 16, size: "lg" as const, drift: "b" as const, delay: 0.1, depth: 1.3 },
  { name: "Salesforce", x: 94, y: 40, size: "md" as const, drift: "a" as const, delay: 0.25, depth: 1.0 },
  { name: "Microsoft Teams", x: 86, y: 62, size: "md" as const, drift: "c" as const, delay: 0.4, depth: 1.15 },
  { name: "HubSpot", x: 78, y: 84, size: "sm" as const, drift: "b" as const, delay: 0.5, depth: 0.85 },
  { name: "Google Drive", x: 92, y: 6, size: "sm" as const, drift: "a" as const, delay: 0.35, depth: 1.25 },
  { name: "Bitbucket", x: 82, y: 28, size: "sm" as const, drift: "c" as const, delay: 0.6, depth: 0.95 },
  { name: "Asana", x: 28, y: 6, size: "sm" as const, drift: "b" as const, delay: 0.65, depth: 1.05 },
  { name: "Zendesk", x: 72, y: 6, size: "sm" as const, drift: "a" as const, delay: 0.7, depth: 0.9 },
  { name: "Intercom", x: 32, y: 88, size: "sm" as const, drift: "c" as const, delay: 0.75, depth: 1.1 },
  { name: "Gong", x: 68, y: 88, size: "sm" as const, drift: "b" as const, delay: 0.8, depth: 0.88 },
] as const;

/** Hero logo cloud — legacy grid data (kept for reference) */
export const HERO_LOGO_CLOUD = {
  left: [
    { name: "Slack", opacity: 0.82, blur: 0, offsetY: 0 },
    { name: "Jira", opacity: 0.9, blur: 0, offsetY: 8 },
    { name: "GitHub", opacity: 1, blur: 0, offsetY: -4 },
    { name: "Figma", opacity: 0.85, blur: 0, offsetY: 12 },
    { name: "Datadog", opacity: 0.78, blur: 0, offsetY: -8 },
    { name: "Linear", opacity: 0.92, blur: 0, offsetY: 4 },
    { name: "Gmail", opacity: 0.8, blur: 0, offsetY: 16 },
    { name: "HubSpot", opacity: 0.88, blur: 0, offsetY: -12 },
    { name: "Zendesk", opacity: 0.75, blur: 0, offsetY: 20 },
    { name: "Framer", opacity: 0.83, blur: 0, offsetY: -16 },
    { name: "GitLab", opacity: 0.86, blur: 0, offsetY: 8 },
    { name: "Gong", opacity: 0.79, blur: 0, offsetY: -4 },
  ],
  right: [
    { name: "Salesforce", opacity: 0.84, blur: 0, offsetY: 4 },
    { name: "Microsoft Teams", opacity: 0.9, blur: 0, offsetY: -8 },
    { name: "PagerDuty", opacity: 0.93, blur: 0, offsetY: 12 },
    { name: "Freshdesk", opacity: 0.81, blur: 0, offsetY: -4 },
    { name: "Google Drive", opacity: 0.77, blur: 0, offsetY: 16 },
    { name: "Bitbucket", opacity: 0.91, blur: 0, offsetY: -12 },
    { name: "Intercom", opacity: 0.83, blur: 0, offsetY: 8 },
    { name: "Asana", opacity: 0.87, blur: 0, offsetY: -16 },
    { name: "Microsoft Outlook", opacity: 0.76, blur: 0, offsetY: 20 },
    { name: "Google Calendar", opacity: 0.85, blur: 0, offsetY: -8 },
    { name: "Adobe Creative Cloud", opacity: 0.8, blur: 0, offsetY: 4 },
    { name: "Gmail", opacity: 0.82, blur: 0, offsetY: 12 },
  ],
} as const;

export const ENTERPRISE_TRUST_COMPANIES = [
  { name: "Meridian", style: "font-bold tracking-tight" },
  { name: "Novaledge", style: "font-semibold" },
  { name: "CartFlow", style: "font-bold italic" },
  { name: "Stackwise", style: "font-bold uppercase tracking-wider" },
  { name: "CodeStream", style: "font-semibold tracking-tight" },
  { name: "HealthBridge", style: "font-bold" },
  { name: "FinTrust", style: "font-semibold italic" },
  { name: "Slalom", style: "font-bold tracking-wide" },
  { name: "Accenture", style: "font-bold uppercase tracking-widest text-sm" },
  { name: "Deloitte", style: "font-bold" },
  { name: "Dropbox", style: "font-semibold" },
  { name: "Stripe", style: "font-semibold italic" },
  { name: "Vercel", style: "font-bold tracking-wide" },
  { name: "Linear", style: "font-semibold tracking-tight" },
] as const;

export const HELP_RESOURCES = [
  {
    tag: "Guide",
    tagBg: "bg-amber-100 text-amber-900",
    title: "Explore how-to guides",
    href: "/docs",
  },
  {
    tag: "Help Center",
    tagBg: "bg-sky-100 text-sky-900",
    title: "Learn how to manage your integrations",
    href: "/docs",
  },
  {
    tag: "Developers",
    tagBg: "bg-emerald-100 text-emerald-900",
    title: "Build your own experience",
    href: "/docs",
  },
  {
    tag: "Marketplace",
    tagBg: "bg-violet-100 text-violet-900",
    title: "Explore all integrations",
    href: "#marketplace",
  },
  {
    tag: "Embed",
    tagBg: "bg-rose-100 text-rose-900",
    title: "Embed Voatomy in your tools",
    href: "/contact?topic=integration-request",
  },
] as const;

export const PRODUCT_FILTERS = ["All", "ATLAS", "LOOP", "SIGNAL", "PHANTOM", "DRIFT", "NEXUS"] as const;

export const INTEGRATIONS_CATALOG: IntegrationItem[] = [
  { slug: "github", name: "GitHub", abbr: "GH", color: "#24292F", category: "Code", description: "Analyze code complexity, PR velocity, and dependency graphs from your repositories.", products: ["ATLAS", "PHANTOM"], status: "available" },
  { slug: "gitlab", name: "GitLab", abbr: "GL", color: "#FC6D26", category: "Code", description: "Connect GitLab for merge request signals and CI-aware sprint intelligence.", products: ["ATLAS", "PHANTOM"], status: "available" },
  { slug: "bitbucket", name: "Bitbucket", abbr: "BB", color: "#0052CC", category: "Code", description: "Import Bitbucket repos to power AI estimation with real complexity data.", products: ["ATLAS"], status: "available" },
  { slug: "azure-devops", name: "Azure DevOps", abbr: "AZ", color: "#0078D4", category: "Code", description: "Sync Azure DevOps pipelines and repos for unified delivery intelligence.", products: ["ATLAS", "PHANTOM"], status: "coming-soon" },
  { slug: "jira", name: "Jira", abbr: "JR", color: "#0052CC", category: "Project", description: "Bi-directional Jira sync — import boards, overlay AI estimates, push plans back.", products: ["ATLAS", "LOOP"], status: "available" },
  { slug: "linear", name: "Linear", abbr: "LN", color: "#5E6AD2", category: "Project", description: "Import Linear cycles for code-backed sprint plans your team trusts.", products: ["ATLAS"], status: "available" },
  { slug: "asana", name: "Asana", abbr: "AS", color: "#F06A6A", category: "Project", description: "Cross-team visibility and AI task estimation from Asana projects.", products: ["ATLAS", "NEXUS"], status: "coming-soon" },
  { slug: "monday", name: "Monday.com", abbr: "MN", color: "#FF3D57", category: "Project", description: "Connect Monday boards for workflow signals across squads.", products: ["ATLAS"], status: "coming-soon" },
  { slug: "clickup", name: "ClickUp", abbr: "CU", color: "#7B68EE", category: "Project", description: "Sync ClickUp spaces into Voatomy's planning intelligence layer.", products: ["ATLAS"], status: "coming-soon" },
  { slug: "trello", name: "Trello", abbr: "TR", color: "#0052CC", category: "Project", description: "Import Trello boards for lightweight team sprint coordination.", products: ["ATLAS"], status: "coming-soon" },
  { slug: "figma", name: "Figma", abbr: "FG", color: "#F24E1E", category: "Design", description: "Detect design-to-code drift and estimate UI effort from Figma files.", products: ["ATLAS", "DRIFT"], status: "available" },
  { slug: "sketch", name: "Sketch", abbr: "SK", color: "#FDB300", category: "Design", description: "Monitor Sketch libraries for design system consistency.", products: ["DRIFT"], status: "coming-soon" },
  { slug: "salesforce", name: "Salesforce", abbr: "SF", color: "#00A1E0", category: "CRM", description: "Revenue-weight your backlog with live CRM pipeline data.", products: ["LOOP", "NEXUS"], status: "available" },
  { slug: "hubspot", name: "HubSpot", abbr: "HS", color: "#FF7A59", category: "CRM", description: "Connect deals and contacts to inform product prioritization.", products: ["LOOP"], status: "available" },
  { slug: "pipedrive", name: "Pipedrive", abbr: "PD", color: "#017737", category: "CRM", description: "Sync Pipedrive pipeline stages into revenue-aware planning.", products: ["LOOP"], status: "coming-soon" },
  { slug: "zendesk", name: "Zendesk", abbr: "ZD", color: "#03363D", category: "Support", description: "Aggregate tickets and CSAT into customer demand signals.", products: ["LOOP", "SIGNAL"], status: "available" },
  { slug: "intercom", name: "Intercom", abbr: "IC", color: "#6FDEF4", category: "Support", description: "Ingest live chat and product tour engagement patterns.", products: ["LOOP"], status: "coming-soon" },
  { slug: "freshdesk", name: "Freshdesk", abbr: "FD", color: "#21B453", category: "Support", description: "Support ticket trends feed directly into backlog intelligence.", products: ["LOOP"], status: "available" },
  { slug: "gong", name: "Gong", abbr: "GG", color: "#7B61FF", category: "Revenue", description: "Sales call intelligence surfaces feature requests and competitive mentions.", products: ["LOOP"], status: "available" },
  { slug: "datadog", name: "Datadog", abbr: "DD", color: "#632CA6", category: "Monitoring", description: "Correlate monitors with revenue impact and route incident context.", products: ["SIGNAL", "PHANTOM"], status: "available" },
  { slug: "pagerduty", name: "PagerDuty", abbr: "PG", color: "#06AC38", category: "Monitoring", description: "Enrich incidents with business context and smart escalation.", products: ["SIGNAL"], status: "coming-soon" },
  { slug: "opsgenie", name: "OpsGenie", abbr: "OG", color: "#2684FF", category: "Monitoring", description: "Alert routing with revenue-aware prioritization.", products: ["SIGNAL"], status: "coming-soon" },
  { slug: "sentry", name: "Sentry", abbr: "SN", color: "#362D59", category: "Monitoring", description: "Error tracking signals feed PHANTOM tech-debt analysis.", products: ["SIGNAL", "PHANTOM"], status: "available" },
  { slug: "grafana", name: "Grafana", abbr: "GF", color: "#F46800", category: "Monitoring", description: "Dashboard and alert data for operational intelligence.", products: ["SIGNAL"], status: "coming-soon" },
  { slug: "slack", name: "Slack", abbr: "SL", color: "#4A154B", category: "Communication", description: "Sprint updates, risk alerts, and AI summaries in Slack channels.", products: ["ATLAS", "LOOP", "SIGNAL"], status: "available" },
  { slug: "teams", name: "Microsoft Teams", abbr: "TM", color: "#6264A7", category: "Communication", description: "Notifications and sprint digests inside Microsoft Teams.", products: ["ATLAS", "SIGNAL"], status: "coming-soon" },
  { slug: "discord", name: "Discord", abbr: "DC", color: "#5865F2", category: "Communication", description: "Community and team alerts for fast-moving product orgs.", products: ["ATLAS"], status: "coming-soon" },
  { slug: "google-drive", name: "Google Drive", abbr: "GD", color: "#4285F4", category: "Documents", description: "Import specs and docs for context-aware planning.", products: ["LOOP"], status: "available" },
  { slug: "notion", name: "Notion", abbr: "NT", color: "#000000", category: "Documents", description: "Sync Notion databases into your product intelligence hub.", products: ["ATLAS", "LOOP"], status: "available" },
  { slug: "confluence", name: "Confluence", abbr: "CF", color: "#172B4D", category: "Documents", description: "Link Confluence pages to sprint items and decisions.", products: ["ATLAS"], status: "coming-soon" },
  { slug: "csv", name: "CSV Import", abbr: "CS", color: "#F05A28", category: "Import", description: "Bulk-import backlogs, capacity plans, or custom datasets.", products: ["ATLAS", "LOOP"], status: "available" },
];

export function categoryCounts(): { label: IntegrationCategory | "All"; count: number }[] {
  const cats = ["All", "Code", "Project", "Design", "CRM", "Support", "Revenue", "Monitoring", "Communication", "Documents", "Import"] as const;
  return cats.map((label) => ({
    label,
    count: label === "All" ? INTEGRATIONS_CATALOG.length : INTEGRATIONS_CATALOG.filter((i) => i.category === label).length,
  }));
}

export const PRODUCT_BADGE_COLORS: Record<string, string> = {
  ATLAS: "#F05A28",
  LOOP: "#6366F1",
  PHANTOM: "#22D3EE",
  SIGNAL: "#EF4444",
  DRIFT: "#8B5CF6",
  NEXUS: "#10B981",
};

export const LOGO_CDN = "https://cdn.simpleicons.org";

export const INTEGRATION_SLUGS: Record<string, string> = {
  GitHub: "github",
  GitLab: "gitlab",
  Bitbucket: "bitbucket",
  Jira: "jira",
  Linear: "linear",
  Asana: "asana",
  Figma: "figma",
  Salesforce: "salesforce",
  HubSpot: "hubspot",
  Zendesk: "zendesk",
  Intercom: "intercom",
  Slack: "slack",
  "Microsoft Teams": "microsoftteams",
  Datadog: "datadog",
  PagerDuty: "pagerduty",
  Gong: "gong",
  "Google Drive": "googledrive",
  Notion: "notion",
  Sentry: "sentry",
  Freshdesk: "freshdesk",
};
