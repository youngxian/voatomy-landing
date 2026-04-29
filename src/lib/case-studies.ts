export type CaseStudy = {
  company: string;
  logo: string;
  industry: string;
  teamSize: string;
  products: string[];
  headline: string;
  overview: string;
  challenge: string[];
  solution: string[];
  results: { label: string; value: string; delta: string }[];
  quote: { text: string; author: string; role: string };
};

export const CASE_STUDIES: Record<string, CaseStudy> = {
  "meridian-saas": {
    company: "Meridian SaaS",
    logo: "MS",
    industry: "SaaS",
    teamSize: "120 engineers",
    products: ["ATLAS", "PHANTOM"],
    headline: "87% sprint accuracy with AI-powered planning",
    overview: "Meridian SaaS is a B2B collaboration platform serving 2,000+ companies. Their engineering organization grew from 40 to 120 engineers in 18 months, and sprint planning became their biggest bottleneck.",
    challenge: [
      "Sprint completion rates had dropped to 52% as the team scaled, leading to missed commitments and eroding trust with product stakeholders.",
      "Story point estimates varied wildly between teams, making cross-team planning nearly impossible. A '5' on one team was a '13' on another.",
      "Tech debt was accumulating faster than they could address it, but without quantified impact, leadership wouldn't allocate dedicated capacity.",
    ],
    solution: [
      "Meridian deployed ATLAS across all 12 squads, replacing manual estimation with AI-powered complexity analysis calibrated to each team's historical data.",
      "PHANTOM was connected to provide real-time tech debt cost visibility, enabling leadership to make data-driven decisions about debt allocation.",
      "Within two sprint cycles, ATLAS had calibrated to each team's patterns and began generating plans with confidence intervals instead of point estimates.",
    ],
    results: [
      { label: "Sprint Accuracy", value: "87%", delta: "+35%" },
      { label: "Tech Debt Reduced", value: "42%", delta: "-42%" },
      { label: "Cycle Time", value: "3.2 days", delta: "-28%" },
      { label: "Planning Time", value: "-70%", delta: "reduction" },
    ],
    quote: { text: "ATLAS didn't just improve our estimates — it changed how we think about planning. We went from arguing about story points to having data-driven conversations about confidence intervals.", author: "Sarah Kim", role: "VP Engineering, Meridian SaaS" },
  },
  "novaledge-fintech": {
    company: "Novaledge Financial",
    logo: "NF",
    industry: "Fintech",
    teamSize: "85 engineers",
    products: ["SIGNAL", "LOOP"],
    headline: "Revenue-aware incidents reduced MTTR by 60%",
    overview: "Novaledge Financial is a payment processing platform handling $4B in annual transaction volume. Every minute of downtime has direct revenue impact, but their incident response treated all alerts equally.",
    challenge: [
      "Mean time to resolve (MTTR) was 30 minutes, but for high-revenue-impact incidents, the actual business cost was being calculated hours after resolution.",
      "The product team had no visibility into which customer feature requests were tied to active pipeline, leading to misaligned roadmap priorities.",
      "On-call engineers were drowning in alerts with no way to distinguish a $10K incident from a $1M one.",
    ],
    solution: [
      "SIGNAL was deployed to enrich every incident with real-time revenue impact data, connecting PagerDuty alerts with Salesforce customer data via LOOP.",
      "Smart routing automatically escalated high-revenue incidents while allowing on-call to batch low-impact alerts for business-hours resolution.",
      "LOOP connected Salesforce pipeline data to the product backlog, giving PMs revenue context for every feature request.",
    ],
    results: [
      { label: "MTTR", value: "12 min", delta: "-60%" },
      { label: "Revenue Saved", value: "$2.1M", delta: "annually" },
      { label: "Escalation Accuracy", value: "94%", delta: "+38%" },
      { label: "False Escalations", value: "-72%", delta: "reduction" },
    ],
    quote: { text: "Before SIGNAL, a P1 was a P1 regardless of impact. Now our engineers know instantly whether they're dealing with a $500 issue or a $500K one. That context changes everything.", author: "Michael Torres", role: "CTO, Novaledge Financial" },
  },
  "cartflow-ecommerce": {
    company: "CartFlow",
    logo: "CF",
    industry: "E-Commerce",
    teamSize: "200 engineers",
    products: ["ATLAS", "NEXUS", "LOOP"],
    headline: "Cross-team dependencies cut in half",
    overview: "CartFlow is an enterprise e-commerce platform with 14 engineering squads spanning checkout, search, inventory, and fulfillment. Cross-team dependencies were the #1 source of sprint failure.",
    challenge: [
      "42% of sprint failures were caused by untracked cross-team dependencies. Teams would commit to work that required another team's API, only to discover the dependency mid-sprint.",
      "Product managers spent 18+ hours per week in alignment meetings trying to coordinate releases across teams.",
      "Feature prioritization was disconnected from revenue data — the PM team relied on intuition rather than customer signals.",
    ],
    solution: [
      "NEXUS built a real-time dependency graph across all 14 squads, surfacing conflicts before sprint commitment rather than after.",
      "ATLAS was deployed for each squad, generating plans that account for cross-team dependencies and flag potential blockers.",
      "LOOP connected HubSpot pipeline data to Linear, giving PMs revenue context for every backlog item.",
    ],
    results: [
      { label: "Dependency Blocks", value: "-51%", delta: "reduction" },
      { label: "Feature Velocity", value: "+34%", delta: "increase" },
      { label: "PM Hours Saved", value: "18h/wk", delta: "per PM" },
      { label: "Revenue Alignment", value: "96%", delta: "of top items" },
    ],
    quote: { text: "NEXUS gave us something we'd never had: a live map of who depends on whom. Dependencies stopped being surprises and became plannable risks.", author: "Jennifer Liu", role: "Director of Engineering, CartFlow" },
  },
  "healthbridge-platform": {
    company: "HealthBridge",
    logo: "HB",
    industry: "Healthcare",
    teamSize: "60 engineers",
    products: ["PHANTOM", "DRIFT"],
    headline: "Design-code drift eliminated across 3 products",
    overview: "HealthBridge builds a HIPAA-compliant patient engagement platform. With three separate product lines sharing a design system, design-code consistency had become a serious quality and compliance concern.",
    challenge: [
      "Design tokens were drifting across the three products, leading to accessibility issues that threatened HIPAA compliance.",
      "The design team spent 40% of their time auditing code for visual inconsistencies rather than designing new features.",
      "Tech debt in the shared component library was slowing feature delivery by an estimated 2 weeks per quarter.",
    ],
    solution: [
      "DRIFT was connected to Figma and the shared React component library, continuously monitoring design-code consistency.",
      "PHANTOM analyzed the component library's complexity trends and translated tech debt into business cost for leadership.",
      "Automated drift alerts in Slack ensured deviations were caught within hours, not weeks.",
    ],
    results: [
      { label: "Design Drift", value: "0%", delta: "eliminated" },
      { label: "Debt Cost Visibility", value: "100%", delta: "full" },
      { label: "Developer Satisfaction", value: "+27pts", delta: "NPS" },
      { label: "Design Audit Time", value: "-85%", delta: "reduction" },
    ],
    quote: { text: "DRIFT turned design consistency from a manual audit into an automated guarantee. Our designers went from policing implementation to designing new features.", author: "David Park", role: "Head of Design, HealthBridge" },
  },
  "stackwise-enterprise": {
    company: "Stackwise",
    logo: "SW",
    industry: "Enterprise",
    teamSize: "500 engineers",
    products: ["ATLAS", "LOOP", "SIGNAL", "NEXUS"],
    headline: "Full-stack product intelligence across 40 teams",
    overview: "Stackwise is an enterprise infrastructure company with 500+ engineers across 40 teams in 5 time zones. They needed a unified intelligence layer to connect engineering velocity, customer feedback, and operational health.",
    challenge: [
      "Leadership had no unified view of engineering health. Each VP maintained separate dashboards, making board-level reporting a manual 2-week exercise.",
      "Customer escalations took an average of 4 days to reach the engineering team responsible, costing the company several enterprise renewals.",
      "Sprint planning across 40 teams consumed over 200 person-hours per sprint, with minimal coordination between teams.",
    ],
    solution: [
      "The full Voatomy suite was deployed in a phased rollout: ATLAS first for planning, then LOOP for customer signals, SIGNAL for incidents, and NEXUS for cross-team coordination.",
      "Executive dashboards aggregated data from all products into a single view, reducing board reporting from 2 weeks to 2 hours.",
      "LOOP and SIGNAL were connected so customer escalations were automatically routed to the responsible engineering team with full business context.",
    ],
    results: [
      { label: "Planning Time", value: "-65%", delta: "reduction" },
      { label: "Revenue Attribution", value: "100%", delta: "of backlog" },
      { label: "Teams Onboarded", value: "40", delta: "in 6 weeks" },
      { label: "Escalation Time", value: "-91%", delta: "4d → 9h" },
    ],
    quote: { text: "Voatomy gave us something no amount of dashboards ever could: a unified picture of how engineering effort connects to business outcomes. That visibility transformed how leadership thinks about R&D investment.", author: "Robert Chen", role: "CTO, Stackwise" },
  },
  "codestream-saas": {
    company: "CodeStream AI",
    logo: "CA",
    industry: "SaaS",
    teamSize: "45 engineers",
    products: ["ATLAS", "LOOP"],
    headline: "Revenue-weighted backlog increased close rate by 22%",
    overview: "CodeStream AI builds developer productivity tools. As a small team competing against well-funded incumbents, they needed to ship exactly what their prospects needed to close deals — not what they guessed was important.",
    challenge: [
      "Product decisions were driven by the loudest stakeholder rather than data. Sales, success, and product each had different views of priority.",
      "Sprint accuracy was below 60%, making it impossible to give sales reliable ship dates for features prospects were waiting on.",
      "The engineering team felt disconnected from business outcomes, treating tickets as abstractions rather than revenue opportunities.",
    ],
    solution: [
      "LOOP connected HubSpot deal data to Linear, revealing that 3 features alone accounted for 68% of blocked pipeline.",
      "ATLAS replaced estimation meetings with AI-generated sprint plans, giving sales reliable delivery dates for the first time.",
      "Revenue context on every ticket transformed engineering culture — developers could see the dollar impact of their work.",
    ],
    results: [
      { label: "Close Rate", value: "+22%", delta: "increase" },
      { label: "Feature Alignment", value: "94%", delta: "to revenue" },
      { label: "Sprint Accuracy", value: "81%", delta: "+29%" },
      { label: "Sales Confidence", value: "NPS 72", delta: "+40pts" },
    ],
    quote: { text: "Once engineers could see that the feature they were building would directly unblock $400K in pipeline, everything changed. Motivation, accuracy, and speed all went up.", author: "Alex Rivera", role: "CEO, CodeStream AI" },
  },
};
