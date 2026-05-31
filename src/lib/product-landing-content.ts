import type { ProductKey } from "@/types";
import { PRODUCT_DETAILS } from "@/lib/constants";

export type ProductLandingContent = {
  headline: string;
  subheadline: string;
  bullets: { title: string; description: string }[];
  integrationNames: string[];
  users: string;
  connectionNote: string;
};

export const PRODUCT_LANDING: Record<ProductKey, ProductLandingContent> = {
  atlas: {
    headline: "An intelligence layer on the board you already use",
    subheadline:
      "ATLAS reads code complexity, team capacity, and revenue signals — then enriches your Jira or Linear sprint with estimates and risk flags your whole org can trust.",
    bullets: [...PRODUCT_DETAILS.atlas.sections],
    integrationNames: ["GitHub", "Jira", "Linear", "Figma"],
    users: PRODUCT_DETAILS.atlas.users,
    connectionNote: "Feeds sprint plans and capacity signals into NEXUS org intelligence.",
  },
  loop: {
    headline: "Customer demand weighted into every priority call",
    subheadline:
      "LOOP closes the loop between sales calls, support tickets, and churn signals — so engineering ships what actually moves revenue.",
    bullets: [...PRODUCT_DETAILS.loop.sections],
    integrationNames: ["Gong", "Zendesk", "Salesforce", "Slack"],
    users: PRODUCT_DETAILS.loop.users,
    connectionNote: "Weights revenue signals into ATLAS sprint priorities.",
  },
  signal: {
    headline: "Revenue impact the moment incidents hit production",
    subheadline:
      "SIGNAL translates outages into affected customers, ARR at risk, and role-specific briefs — so every team responds with business context, not guesswork.",
    bullets: [...PRODUCT_DETAILS.signal.sections],
    integrationNames: ["Datadog", "PagerDuty", "CloudWatch", "Slack"],
    users: PRODUCT_DETAILS.signal.users,
    connectionNote: "Surfaces incident impact to NEXUS and every stakeholder in real time.",
  },
  drift: {
    headline: "Design and code stay in permanent sync",
    subheadline:
      "DRIFT detects when Figma tokens drift from code implementations — and suggests design changes backed by conversion data before scope surprises your sprint.",
    bullets: [...PRODUCT_DETAILS.drift.sections],
    integrationNames: ["Figma", "GitHub", "Amplitude", "Linear"],
    users: PRODUCT_DETAILS.drift.users,
    connectionNote: "Aligns design scope with what ATLAS plans to ship each sprint.",
  },
  phantom: {
    headline: "Tech debt visible in dollars — not jargon",
    subheadline:
      "PHANTOM scans your codebase continuously, maps debt hotspots to dollar impact, and gives leadership ROI-backed remediation plans.",
    bullets: [...PRODUCT_DETAILS.phantom.sections],
    integrationNames: ["GitHub", "Jira", "Datadog", "Linear"],
    users: PRODUCT_DETAILS.phantom.users,
    connectionNote: "Quantifies debt cost before ATLAS commits capacity to new work.",
  },
  nexus: {
    headline: "Every product signal in one organizational nerve center",
    subheadline:
      "NEXUS unifies ATLAS, LOOP, SIGNAL, DRIFT, and PHANTOM into a single AI layer — so leaders see how engineering decisions connect to business outcomes.",
    bullets: [
      {
        title: "Unified intelligence",
        description: "Sprint plans, revenue signals, incidents, design scope, and debt — one connected view.",
      },
      {
        title: "Cross-product routing",
        description: "Every signal routes to the right team with the context they need to act.",
      },
    ],
    integrationNames: ["GitHub", "Jira", "Salesforce", "Datadog", "Figma", "Slack"],
    users: "CTO · VP Eng · PM · RevOps",
    connectionNote: "The hub that connects every Voatomy product into one operating system.",
  },
};

export const PLATFORM_CONNECTION_FLOWS = [
  {
    from: "ATLAS",
    fromColor: "#F05A28",
    to: "NEXUS",
    toColor: "#111827",
    desc: "Intelligence layer on the board you already use",
  },
  {
    from: "LOOP",
    fromColor: "#6366F1",
    to: "ATLAS",
    toColor: "#F05A28",
    desc: "Customer demand weighted into every priority call",
  },
  {
    from: "PHANTOM",
    fromColor: "#22D3EE",
    to: "ATLAS",
    toColor: "#F05A28",
    desc: "Tech debt cost visible before you commit",
  },
  {
    from: "DRIFT",
    fromColor: "#8B5CF6",
    to: "ATLAS",
    toColor: "#F05A28",
    desc: "Design scope aligned before sprint commitments",
  },
  {
    from: "SIGNAL",
    fromColor: "#EF4444",
    to: "NEXUS",
    toColor: "#111827",
    desc: "Revenue impact when incidents hit production",
  },
] as const;
