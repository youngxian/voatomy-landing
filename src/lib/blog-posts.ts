export type BlogPost = {
  title: string;
  description: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  body: string[];
};

export const BLOG_POSTS: Record<string, BlogPost> = {
  "from-spec-to-sprint-example": {
    title: "From Spec to Sprint: An End-to-End Example",
    description:
      "A concrete walkthrough: connect a repo, sync your board, and generate your first ATLAS plan — the kind of story you can use as a template for onboarding your own team.",
    author: "Voatomy Team",
    date: "Apr 29, 2026",
    readTime: "5 min read",
    category: "Engineering",
    body: [
      "This post is a working example of what a Voatomy / ATLAS getting-started narrative looks like on the blog. Use it as a reference when you write your own: one clear outcome, a short timeline, and honest constraints.",
      "In our example, a 12-person product team links GitHub and Linear, runs an initial code-complexity pass, and imports the current sprint scope. No slide decks — just connections and data. ATLAS needs real signals, not a polished roadmap PDF.",
      "The first plan you generate is intentionally conservative: it surfaces dependency risks and calendar conflicts before it promises dates. In the walkthrough, the team adjust capacity for two engineers on PTO, re-run the plan, and compare the confidence intervals. That is the example we want new users to see.",
      "By the end of the first week, the example team has a baseline ATLAS run they can diff against the next. The measure of success is not 'the AI was right' — it is that planning conversations cite the same data structure every time.",
      "If you are drafting content for this blog, mirror this shape: problem in one line, three beats of what happened, and a takeaway that your reader can act on next Monday. Swap the product names, keep the structure.",
    ],
  },
  "story-point-delusion": {
    title: "The Story Point Delusion: Why Sprint Estimates Are Statistically Meaningless",
    description:
      "We analyzed 14,000 sprints across 340 engineering teams and found that story point estimates have virtually zero predictive power.",
    author: "Voatomy Team",
    date: "Jan 15, 2026",
    readTime: "8 min read",
    category: "Engineering",
    body: [
      "Every engineering team estimates. Most use story points — those Fibonacci-flavored numbers that promise to capture complexity, effort, and uncertainty in a single integer. The problem? They don't work.",
      "We analyzed 14,000 sprints across 340 engineering teams of varying sizes, from 4-person startups to 200-person enterprise squads. The correlation between story point estimates and actual delivery time was 0.12 — barely above random noise.",
      "The core issue is that story points conflate three distinct dimensions: technical complexity, effort required, and uncertainty. A task can be technically simple but high-effort (migrating 500 database records), or technically complex but low-effort (a single algorithm change). Collapsing these into one number destroys the signal.",
      "What actually predicts sprint outcomes? Our data points to three factors: historical cycle time for similar work items, the number of cross-team dependencies, and the ratio of new code to modified code. ATLAS uses these signals — not human intuition — to generate sprint plans with 87% confidence intervals.",
      "This doesn't mean human judgment is worthless. Engineers have crucial context about organizational dynamics, upcoming holidays, and technical debt that no model can capture. The trick is combining machine precision with human context — which is exactly what ATLAS does.",
      "The future of sprint planning isn't more precise story points. It's probabilistic forecasting grounded in your team's actual delivery data. And that future is here.",
    ],
  },
  "how-we-built-atlas": {
    title: "How We Built ATLAS: From Prototype to Production",
    description:
      "The architectural decisions, trade-offs, and late-night debugging sessions that shaped our AI sprint planner.",
    author: "Ade Ogunleye",
    date: "Jan 8, 2026",
    readTime: "12 min read",
    category: "Engineering",
    body: [
      "ATLAS started as a weekend hack — a Python script that pulled Jira tickets and GitHub PRs into a single view. Eighteen months later, it's an AI sprint planner processing millions of signals per day. This is the story of how we got here.",
      "The first architectural decision was the hardest: should we build a monolith or start with microservices? We chose a modular monolith — a single deployable unit with clear internal boundaries. This let us move fast without the operational overhead of distributed systems.",
      "The AI layer went through three rewrites. Version one used a simple regression model. Version two added a transformer-based complexity analyzer. Version three — the current architecture — uses an ensemble approach that combines code analysis, historical patterns, and team dynamics.",
      "The biggest technical challenge was latency. Sprint planning is interactive — engineers expect sub-second responses. But our AI models needed 3-4 seconds per analysis. The solution was a pre-computation pipeline that continuously analyzes repositories in the background, caching complexity scores that can be assembled into sprint plans in milliseconds.",
      "If we could start over, we'd invest in observability earlier. We didn't add structured logging until month six, and those first six months of debugging were significantly harder than they needed to be.",
      "The lesson? Build for the problem you have today, but leave doors open for the problems you'll have tomorrow.",
    ],
  },
  "revenue-weighted-backlogs": {
    title: "Revenue-Weighted Backlogs: A PM's Guide",
    description:
      "How to attach revenue signals to every backlog item so your team always ships what matters most to the business.",
    author: "Maya Chen",
    date: "Dec 28, 2025",
    readTime: "6 min read",
    category: "Product",
    body: [
      "Your backlog is lying to you. Not intentionally — but the prioritization frameworks most teams use (RICE, MoSCoW, weighted scoring) share a fatal flaw: they treat revenue impact as a guess rather than a measurement.",
      "Revenue-weighted backlogs flip this by connecting every feature request, bug report, and improvement to actual revenue data from your CRM, support system, and product analytics.",
      "The mechanics are straightforward. LOOP ingests deal data from Salesforce, maps feature requests to pipeline value, and surfaces the total addressable revenue for each backlog item. Instead of debating whether Feature A or Feature B matters more, you can see that Feature A is blocking $2.3M in pipeline while Feature B affects $180K.",
      "But revenue weighting isn't just about big numbers. It also reveals surprising insights — like the small bug fix that's causing 40% of trial-to-paid conversion failures, or the API endpoint that three enterprise prospects independently flagged as a blocker.",
      "The key is making this data ambient, not buried in a spreadsheet. When revenue context shows up directly in Jira or Linear, it changes how engineers think about their work. They're not just closing tickets — they're unblocking revenue.",
      "Start small: connect your CRM to LOOP, map your top 20 deals to feature requests, and see what emerges. Most teams are shocked by what they find.",
    ],
  },
  "tech-debt-business-problem": {
    title: "Tech Debt Is Not a Technical Problem — It's a Business One",
    description:
      "Framing tech debt as an engineering concern loses the argument every time. Here's how to speak the language leadership actually understands.",
    author: "James Okafor",
    date: "Dec 20, 2025",
    readTime: "7 min read",
    category: "Culture",
    body: [
      "Every quarter, the same ritual plays out in thousands of companies: engineering asks for time to address tech debt, leadership asks for a business case, engineering can't provide one, and the debt grows.",
      "The problem isn't that leadership doesn't care about code quality. It's that 'tech debt' is an engineering abstraction that doesn't map to any metric the business tracks. Try telling your CFO that the codebase has too much coupling — they'll nod politely and move on.",
      "The solution is translation. Tech debt has real business costs: slower feature velocity, higher incident rates, longer onboarding times, and increased churn risk. PHANTOM quantifies these by analyzing code complexity trends, correlating them with delivery metrics, and expressing the result in dollars and days.",
      "Here's a framework that works: instead of saying 'we need to refactor the auth module,' say 'the auth module's complexity is adding 3 days to every feature that touches user management, which means the SSO feature Enterprise Customer X needs will ship 2 weeks late, risking the $500K renewal.'",
      "When tech debt has a dollar figure attached, it stops being an engineering concern and starts being a business decision. And business decisions get resources.",
      "The companies that handle tech debt well don't eliminate it — they manage it strategically, investing where the business impact is highest. That requires visibility, and visibility requires measurement.",
    ],
  },
  "case-against-story-points": {
    title: "The Case Against Story Points",
    description:
      "A deep statistical analysis of why Fibonacci-based estimation creates a false sense of precision.",
    author: "Priya Sharma",
    date: "Dec 12, 2025",
    readTime: "10 min read",
    category: "Data",
    body: [
      "Story points have become so embedded in agile practice that questioning them feels like heresy. But the statistical foundations of Fibonacci-based estimation are remarkably weak.",
      "The Fibonacci sequence (1, 2, 3, 5, 8, 13, 21) is used because the gaps between numbers grow, supposedly reflecting increasing uncertainty. But this assumes uncertainty grows geometrically with complexity — an assumption that has no empirical support.",
      "Our analysis of 50,000 tickets across 400 teams shows that the distribution of actual completion times within a story point bucket is nearly identical regardless of the bucket. An 8-point story has roughly the same variance as a 3-point story, just shifted right.",
      "What this means in practice: your estimates aren't getting less precise at higher point values (as the Fibonacci gaps imply) — they're equally imprecise everywhere. The scale creates an illusion of calibrated uncertainty.",
      "Probabilistic forecasting offers a fundamentally better approach. Instead of asking 'how many points is this?', ask 'what does our historical data say about how long similar work takes?' This gives you confidence intervals rather than point estimates.",
      "The transition away from story points doesn't require abandoning estimation entirely. It means replacing subjective, consensus-driven numbers with data-driven ranges that honestly communicate uncertainty.",
    ],
  },
  "cross-team-alignment": {
    title: "Cross-Team Alignment at Scale",
    description:
      "When you grow past three squads, alignment stops being a Slack message and starts being an engineering problem.",
    author: "Tunde Adebayo",
    date: "Dec 5, 2025",
    readTime: "9 min read",
    category: "Product",
    body: [
      "At three squads, you can keep everyone aligned with a weekly sync and a shared Slack channel. At ten squads, those mechanisms break down completely. Cross-team alignment becomes an engineering problem that requires engineering solutions.",
      "The core challenge is dependency management. When Team A's sprint depends on Team B's API, and Team B is blocked by Team C's infrastructure migration, you have a three-team dependency chain that no amount of Slack messaging can resolve efficiently.",
      "NEXUS addresses this by building a real-time dependency graph across all teams. It ingests sprint plans, PR references, and API contracts to surface dependencies before they become blockers — not after.",
      "But tooling alone isn't enough. The organizational design matters too. We've found that teams with explicit interface contracts (documented API boundaries, SLA commitments, and escalation paths) ship 40% faster than teams that rely on ad-hoc communication.",
      "The most effective organizations treat alignment as a system, not a practice. They invest in tooling, define contracts, and measure cross-team velocity as a first-class metric.",
      "Start by mapping your dependency graph. You'll likely find that 80% of cross-team friction comes from 20% of interfaces. Fix those first.",
    ],
  },
  "designing-voatomy": {
    title: "Designing Voatomy: Our Design System Journey",
    description: "From a messy Figma file to a composable, theme-aware component library.",
    author: "Lina Park",
    date: "Nov 28, 2025",
    readTime: "8 min read",
    category: "Design",
    body: [
      "When I joined Voatomy as the first designer, the 'design system' was a Figma file with 47 unnamed frames, no consistent spacing, and three different shades of green that may or may not have been intentional.",
      "Six months later, we have a composable, theme-aware component library with 40+ components, dark mode support, and a design-to-code pipeline that keeps Figma and React in sync. Here's how we got there.",
      "The first step was ruthless auditing. I cataloged every unique color, spacing value, font size, and border radius in the existing app. The numbers were humbling: 23 unique grays, 8 different padding values, and exactly zero consistent patterns.",
      "We started with foundations: a color system (5 grays, 3 accents, semantic tokens), a spacing scale (4, 8, 12, 16, 24, 32, 48, 64), and a type ramp (7 sizes with consistent line heights). These three decisions eliminated 80% of design inconsistencies.",
      "The component library followed a progressive disclosure pattern: start with primitives (Button, Card, Chip, Section), compose them into patterns (Feature Card, Testimonial Block, Hero Section), and assemble patterns into page templates.",
      "The biggest lesson: a design system isn't a Figma library or a component package. It's a shared language between design and engineering. When both sides think in the same tokens and components, the translation layer disappears.",
    ],
  },
};
