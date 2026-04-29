export type DocPage = { title: string; description: string; content: string[] };

export type DocsData = Record<string, Record<string, DocPage>>;

export type SidebarNavItem = { slug: string; label: string };
export type SidebarNavGroup = { category: string; label: string; items: SidebarNavItem[] };

export const DOCS_DATA: DocsData = {
  "getting-started": {
    "quickstart": {
      title: "Quickstart Guide",
      description: "Get up and running with Voatomy in under 5 minutes. Create your workspace, invite your team, and connect your first integration.",
      content: [
        "Welcome to Voatomy! This guide walks you through setting up your workspace from scratch. By the end, you'll have a fully configured environment ready for AI-powered sprint planning.",
        "Step 1: Create your workspace. Sign up at app.voatomy.com and choose a workspace name. This will be your team's home base for all Voatomy products.",
        "Step 2: Invite your team. Navigate to Settings → Team and send invitations via email. Team members can be assigned roles: Admin, Manager, or Member.",
        "Step 3: Connect your first integration. Go to Settings → Integrations and connect GitHub, GitLab, or Jira. OAuth flows handle authentication automatically.",
        "Step 4: Run your first analysis. Once connected, ATLAS will begin analyzing your repositories. Initial analysis takes 2-5 minutes depending on repo size.",
      ],
    },
    "workspace-setup": {
      title: "Workspace Setup",
      description: "Configure your Voatomy workspace settings, team roles, and notification preferences.",
      content: [
        "Your workspace is the central hub for all Voatomy activity. This guide covers the key configuration options available to workspace administrators.",
        "Workspace settings include general options (name, timezone, default sprint length), security settings (SSO, 2FA requirements), and notification preferences.",
        "Team roles follow a hierarchical model: Owners have full access, Admins can manage integrations and team members, Managers can create and modify sprint plans, and Members have read access with limited write permissions.",
        "Notification channels can be configured per-product. ATLAS notifications go to engineering channels, LOOP alerts go to product channels, and SIGNAL incidents go to on-call channels.",
      ],
    },
  },
  "products": {
    "atlas-overview": {
      title: "ATLAS Overview",
      description: "Learn how ATLAS uses AI to generate data-driven sprint plans with confidence scoring and risk analysis.",
      content: [
        "ATLAS is Voatomy's AI sprint planning engine. It analyzes code complexity, team capacity, historical velocity, and cross-team dependencies to generate sprint plans backed by data.",
        "Key concepts: Complexity Score — a 0-100 metric derived from static analysis of code changes. Confidence Interval — the probability range for sprint completion. Risk Flags — automated alerts for dependency conflicts, capacity issues, or scope creep.",
        "ATLAS integrates with GitHub, GitLab, Jira, Linear, and Asana to pull in real-time data. Sprint plans update dynamically as new commits, PRs, and ticket changes flow in.",
        "Getting started with ATLAS requires connecting at least one code repository and one project management tool. The AI model calibrates to your team's patterns over 2-3 sprint cycles.",
      ],
    },
    "loop-overview": {
      title: "LOOP Overview",
      description: "Discover how LOOP connects customer feedback, CRM data, and product roadmaps into a unified intelligence layer.",
      content: [
        "LOOP is the customer-product intelligence layer. It ingests signals from CRM systems, support tickets, sales calls, and NPS surveys to create a revenue-weighted view of your product backlog.",
        "Core features include: Revenue Attribution — map every feature request to pipeline value. Feedback Clustering — AI-powered grouping of similar requests across channels. Stakeholder Alerts — automatic notifications when shipped features affect tracked deals.",
        "LOOP integrates with Salesforce, HubSpot, Zendesk, Intercom, Gong, and Slack to build a complete picture of customer needs and their business impact.",
        "Setup requires connecting at least one CRM and configuring feature request mapping rules. LOOP begins surfacing insights within 24 hours of initial data sync.",
      ],
    },
    "signal-overview": {
      title: "SIGNAL Overview",
      description: "Understand how SIGNAL provides revenue-aware incident management with business context for every alert.",
      content: [
        "SIGNAL transforms incident management from reactive firefighting to proactive, revenue-aware response. Every incident is enriched with business context: affected customers, revenue at risk, and SLA implications.",
        "Key capabilities: Revenue Impact Scoring — real-time calculation of incident business cost. Smart Routing — escalation based on business impact, not just severity. Post-Incident Intelligence — automated retrospectives with actionable recommendations.",
        "SIGNAL connects to PagerDuty, Datadog, Sentry, OpsGenie, and Grafana for monitoring data, and cross-references with CRM data from LOOP for business context.",
        "Initial setup involves connecting monitoring tools and configuring revenue mapping rules. SIGNAL's AI improves routing accuracy over time as it learns from resolution patterns.",
      ],
    },
  },
  "integrations": {
    "github-setup": {
      title: "GitHub Integration Setup",
      description: "Connect your GitHub repositories to Voatomy for code analysis, PR tracking, and complexity scoring.",
      content: [
        "The GitHub integration enables ATLAS to analyze your codebase for complexity patterns, PHANTOM to track tech debt trends, and DRIFT to monitor design-code consistency.",
        "Setup: Navigate to Settings → Integrations → GitHub. Click 'Connect' to initiate the OAuth flow. Select which repositories to analyze — you can start with a subset and add more later.",
        "Permissions required: Repository read access (code, PRs, issues), Organization read access (team structure). Voatomy never writes to your repositories.",
        "Once connected, initial analysis begins automatically. Large repositories (100K+ lines) may take up to 10 minutes for first analysis. Subsequent analyses are incremental and near-instant.",
      ],
    },
    "jira-setup": {
      title: "Jira Integration Setup",
      description: "Connect Jira to sync tickets, sprint data, and project structure with Voatomy's AI planning engine.",
      content: [
        "The Jira integration syncs your project structure, sprint data, and ticket details with ATLAS for AI-powered sprint planning.",
        "Setup: Navigate to Settings → Integrations → Jira. Click 'Connect' to start the OAuth 2.0 PKCE flow. Select the Jira projects you want to sync.",
        "Voatomy maps Jira concepts to its internal model: Projects → Teams, Sprints → Sprint Plans, Issues → Work Items, Story Points → Complexity Inputs.",
        "Bi-directional sync is optional. When enabled, sprint plans generated by ATLAS can be pushed back to Jira as draft sprints for team review.",
      ],
    },
    "slack-setup": {
      title: "Slack Integration Setup",
      description: "Set up Slack notifications for sprint updates, incident alerts, and cross-team coordination.",
      content: [
        "The Slack integration delivers real-time notifications for ATLAS sprint events, SIGNAL incidents, and LOOP customer feedback alerts directly to your team channels.",
        "Setup: Navigate to Settings → Integrations → Slack. Click 'Add to Slack' to install the Voatomy bot. Select default channels for each product's notifications.",
        "Channel mapping: Create dedicated channels (e.g., #atlas-sprints, #signal-incidents, #loop-feedback) or use existing channels. Each product's notifications can be routed independently.",
        "Interactive features: Team members can react to notifications to acknowledge, snooze, or escalate directly from Slack without switching to the Voatomy dashboard.",
      ],
    },
  },
  "api": {
    "authentication": {
      title: "API Authentication",
      description: "Learn how to authenticate with the Voatomy API using API keys and OAuth tokens.",
      content: [
        "The Voatomy API uses Bearer token authentication. All requests must include an Authorization header with a valid API key or OAuth access token.",
        "API keys can be generated in Settings → API → Keys. Each key is scoped to a workspace and can be restricted to specific products (ATLAS, LOOP, SIGNAL, etc.).",
        "For OAuth integrations, use the standard OAuth 2.0 authorization code flow with PKCE. The token endpoint is https://api.voatomy.com/oauth/token.",
        "Rate limits: Free tier — 100 requests/minute. Pro tier — 1,000 requests/minute. Enterprise — custom limits. Rate limit headers (X-RateLimit-Remaining, X-RateLimit-Reset) are included in every response.",
      ],
    },
    "webhooks": {
      title: "Webhooks",
      description: "Configure webhooks to receive real-time event notifications from Voatomy.",
      content: [
        "Webhooks deliver real-time HTTP POST notifications when events occur in your Voatomy workspace. Configure endpoints in Settings → API → Webhooks.",
        "Supported events: sprint.created, sprint.updated, sprint.completed, incident.opened, incident.resolved, feedback.received, integration.synced.",
        "Webhook payloads include a signature header (X-Voatomy-Signature) for verification. Use HMAC-SHA256 with your webhook secret to validate authenticity.",
        "Retry policy: Failed deliveries (non-2xx responses) are retried 3 times with exponential backoff (1min, 5min, 30min). After 3 failures, the webhook is disabled and an email notification is sent.",
      ],
    },
  },
};

export const SIDEBAR_NAV: SidebarNavGroup[] = [
  { category: "getting-started", label: "Getting Started", items: [
    { slug: "quickstart", label: "Quickstart Guide" },
    { slug: "workspace-setup", label: "Workspace Setup" },
  ]},
  { category: "products", label: "Products", items: [
    { slug: "atlas-overview", label: "ATLAS Overview" },
    { slug: "loop-overview", label: "LOOP Overview" },
    { slug: "signal-overview", label: "SIGNAL Overview" },
  ]},
  { category: "integrations", label: "Integrations", items: [
    { slug: "github-setup", label: "GitHub Setup" },
    { slug: "jira-setup", label: "Jira Setup" },
    { slug: "slack-setup", label: "Slack Setup" },
  ]},
  { category: "api", label: "API Reference", items: [
    { slug: "authentication", label: "Authentication" },
    { slug: "webhooks", label: "Webhooks" },
  ]},
];
