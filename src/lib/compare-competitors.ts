export type CompetitorComparisonRow = {
  feature: string;
  voatomy: string | boolean;
  competitor: string | boolean;
};

export type CompetitorPage = {
  name: string;
  tagline: string;
  description: string;
  category: string;
  comparison: CompetitorComparisonRow[];
  differentiators: string[];
  pricing: { voatomy: string; competitor: string };
};

export const COMPETITORS: Record<string, CompetitorPage> = {
  jellyfish: {
    name: "Jellyfish",
    tagline: "Engineering Management Intelligence",
    description: "See how Voatomy compares to Jellyfish for engineering intelligence. While Jellyfish focuses on management dashboards, Voatomy combines AI sprint planning, revenue intelligence, and cross-team coordination in one platform.",
    category: "Engineering Intelligence",
    comparison: [
      { feature: "AI Sprint Planning", voatomy: true, competitor: false },
      { feature: "Engineering Metrics Dashboard", voatomy: true, competitor: true },
      { feature: "Revenue-Weighted Backlog", voatomy: true, competitor: false },
      { feature: "Tech Debt Quantification ($)", voatomy: true, competitor: false },
      { feature: "Cross-Team Dependency Mapping", voatomy: true, competitor: "Limited" },
      { feature: "Incident Revenue Impact", voatomy: true, competitor: false },
      { feature: "Design-Code Sync Monitoring", voatomy: true, competitor: false },
      { feature: "CRM Integration (Salesforce, HubSpot)", voatomy: true, competitor: false },
      { feature: "Git + Project Tool Integration", voatomy: true, competitor: true },
      { feature: "Custom Reporting", voatomy: true, competitor: true },
    ],
    differentiators: [
      "Voatomy generates sprint plans — Jellyfish only reports on past performance",
      "Revenue intelligence connects customer signals to engineering priorities",
      "Tech debt expressed in dollars, not just code metrics",
      "Six purpose-built products vs. a single analytics dashboard",
    ],
    pricing: { voatomy: "From $29/user/mo", competitor: "Custom pricing (typically $50K+/yr)" },
  },
  productboard: {
    name: "Productboard",
    tagline: "Product Management Platform",
    description: "Compare Voatomy and Productboard for product-engineering alignment. Productboard focuses on product management; Voatomy adds AI sprint planning, revenue-weighted backlogs, and incident intelligence.",
    category: "Product Management",
    comparison: [
      { feature: "Customer Feedback Aggregation", voatomy: true, competitor: true },
      { feature: "Revenue-Weighted Prioritization", voatomy: true, competitor: "Limited" },
      { feature: "AI Sprint Planning", voatomy: true, competitor: false },
      { feature: "Roadmap Visualization", voatomy: "Q2 2026", competitor: true },
      { feature: "CRM Revenue Attribution", voatomy: true, competitor: "Limited" },
      { feature: "Engineering Complexity Scoring", voatomy: true, competitor: false },
      { feature: "Incident Business Impact", voatomy: true, competitor: false },
      { feature: "Cross-Team Dependency Graph", voatomy: true, competitor: false },
      { feature: "Design System Monitoring", voatomy: true, competitor: false },
      { feature: "Jira/Linear/Asana Sync", voatomy: true, competitor: true },
    ],
    differentiators: [
      "Voatomy bridges product AND engineering — not just PM workflows",
      "Revenue data comes from CRM, not manual input",
      "AI generates sprint plans that account for code complexity",
      "Full incident intelligence layer for operational context",
    ],
    pricing: { voatomy: "From $29/user/mo", competitor: "From $20/maker/mo" },
  },
  pagerduty: {
    name: "PagerDuty",
    tagline: "Incident Management Platform",
    description: "Compare Voatomy SIGNAL with PagerDuty. PagerDuty is the gold standard for on-call management; SIGNAL adds revenue-aware routing, business impact scoring, and customer context to every incident.",
    category: "Incident Management",
    comparison: [
      { feature: "On-Call Scheduling", voatomy: "Via integration", competitor: true },
      { feature: "Alert Routing & Escalation", voatomy: true, competitor: true },
      { feature: "Revenue Impact per Incident", voatomy: true, competitor: false },
      { feature: "Affected Customer Identification", voatomy: true, competitor: false },
      { feature: "SLA-Aware Escalation", voatomy: true, competitor: "Limited" },
      { feature: "Post-Incident Cost Reporting", voatomy: true, competitor: false },
      { feature: "AI Sprint Planning", voatomy: true, competitor: false },
      { feature: "CRM Data Integration", voatomy: true, competitor: false },
      { feature: "Monitoring Tool Integrations", voatomy: true, competitor: true },
      { feature: "Status Page", voatomy: false, competitor: true },
    ],
    differentiators: [
      "SIGNAL adds business context that PagerDuty can't — revenue at risk, customer impact, SLA implications",
      "Voatomy is a complement: use PagerDuty for on-call + SIGNAL for business intelligence",
      "Post-incident cost analysis in dollars, not just duration",
      "Connected to sprint planning — incidents inform future capacity allocation",
    ],
    pricing: { voatomy: "From $29/user/mo", competitor: "From $21/user/mo" },
  },
  sonarqube: {
    name: "SonarQube",
    tagline: "Code Quality & Security",
    description: "Compare Voatomy PHANTOM with SonarQube for tech debt management. SonarQube scans code for bugs and vulnerabilities; PHANTOM translates technical debt into business cost.",
    category: "Code Quality",
    comparison: [
      { feature: "Static Code Analysis", voatomy: "Via integration", competitor: true },
      { feature: "Security Vulnerability Scanning", voatomy: false, competitor: true },
      { feature: "Tech Debt → Dollar Translation", voatomy: true, competitor: false },
      { feature: "Debt Impact on Velocity", voatomy: true, competitor: false },
      { feature: "Code Smell Detection", voatomy: "Via integration", competitor: true },
      { feature: "Business Case Generation", voatomy: true, competitor: false },
      { feature: "Sprint Planning Integration", voatomy: true, competitor: false },
      { feature: "Revenue-Correlated Prioritization", voatomy: true, competitor: false },
      { feature: "Multi-Language Support", voatomy: true, competitor: true },
      { feature: "CI/CD Pipeline Integration", voatomy: true, competitor: true },
    ],
    differentiators: [
      "PHANTOM answers 'how much is this debt costing us?' — SonarQube answers 'where is the debt?'",
      "Use together: SonarQube for detection, PHANTOM for business prioritization",
      "Debt expressed in days-of-velocity-lost and dollar impact",
      "Integrated with sprint planning for automatic debt capacity allocation",
    ],
    pricing: { voatomy: "From $29/user/mo", competitor: "Free (Community) / From $150/yr (Developer)" },
  },
  gong: {
    name: "Gong",
    tagline: "Revenue Intelligence Platform",
    description: "Compare Voatomy LOOP with Gong for revenue intelligence. Gong captures sales conversations; LOOP connects those signals to engineering backlogs so teams ship what customers actually need.",
    category: "Revenue Intelligence",
    comparison: [
      { feature: "Sales Call Recording & Analysis", voatomy: "Via Gong integration", competitor: true },
      { feature: "Feature Request Extraction", voatomy: true, competitor: "Limited" },
      { feature: "CRM Revenue Attribution", voatomy: true, competitor: true },
      { feature: "Backlog Revenue Weighting", voatomy: true, competitor: false },
      { feature: "Engineering Sprint Integration", voatomy: true, competitor: false },
      { feature: "Support Ticket Analysis", voatomy: true, competitor: false },
      { feature: "Deal-to-Feature Mapping", voatomy: true, competitor: false },
      { feature: "Competitive Intelligence", voatomy: false, competitor: true },
      { feature: "Coaching & Training", voatomy: false, competitor: true },
      { feature: "Product-Revenue Alignment", voatomy: true, competitor: "Limited" },
    ],
    differentiators: [
      "LOOP takes Gong's intelligence further — connecting it to engineering backlogs",
      "Use together: Gong captures signals, LOOP translates them into engineering priorities",
      "Revenue weighting across ALL channels — not just sales calls",
      "Direct integration with sprint planning for actionable prioritization",
    ],
    pricing: { voatomy: "From $29/user/mo", competitor: "Custom pricing (typically $100+/user/mo)" },
  },
  "incident-io": {
    name: "incident.io",
    tagline: "Modern Incident Management",
    description: "Compare Voatomy SIGNAL with incident.io. Both modernize incident management, but SIGNAL adds revenue-aware routing and business impact scoring that connects incidents to customer and financial data.",
    category: "Incident Management",
    comparison: [
      { feature: "Slack-Native Incident Management", voatomy: true, competitor: true },
      { feature: "Automated Incident Workflows", voatomy: true, competitor: true },
      { feature: "Revenue Impact Scoring", voatomy: true, competitor: false },
      { feature: "Customer Impact Identification", voatomy: true, competitor: false },
      { feature: "Post-Incident Reviews", voatomy: true, competitor: true },
      { feature: "On-Call Management", voatomy: "Via integration", competitor: true },
      { feature: "CRM Data Enrichment", voatomy: true, competitor: false },
      { feature: "Sprint Planning Integration", voatomy: true, competitor: false },
      { feature: "Status Page", voatomy: false, competitor: true },
      { feature: "Catalog / Service Ownership", voatomy: false, competitor: true },
    ],
    differentiators: [
      "SIGNAL answers 'what's the business cost?' for every incident",
      "Revenue-aware routing means P1s are defined by impact, not just severity",
      "Connected to the full Voatomy suite — incidents inform sprint planning and product decisions",
      "Customer-level impact tracking with CRM data",
    ],
    pricing: { voatomy: "From $29/user/mo", competitor: "Free (Starter) / Custom (Pro)" },
  },
};
