"use client";

import { useState, useMemo, useRef } from "react";
import { Search, X, BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SubpageHeroAtmosphere } from "@/components/marketing/subpage-hero-atmosphere";

// ── Glossary data ─────────────────────────────────────────────────────────

const TERMS = [
  // A
  { term: "Acceptance Criteria", letter: "A", category: "Product", definition: "A set of conditions that must be met for a user story or feature to be considered complete. Written from the user's perspective, they define the boundaries of a story and guide QA testing." },
  { term: "Agile", letter: "A", category: "Methodology", definition: "An iterative approach to software development that emphasizes collaboration, flexibility, and delivering working software in short cycles (sprints). Contrasts with waterfall's sequential phases." },
  { term: "API (Application Programming Interface)", letter: "A", category: "Engineering", definition: "A defined contract that allows two software systems to communicate. REST, GraphQL, and gRPC are common API styles. APIs power integrations between tools like Jira, GitHub, and Slack." },
  { term: "ARR (Annual Recurring Revenue)", letter: "A", category: "Business", definition: "The annualized value of all recurring subscription revenue. ARR = MRR × 12. A key SaaS health metric used by investors and leadership to assess growth trajectory." },

  // B
  { term: "Backlog", letter: "B", category: "Product", definition: "A prioritized list of work items (features, bugs, chores) that haven't been scheduled into a sprint yet. The product owner owns backlog grooming, ensuring items are estimated and ordered by value." },
  { term: "Branching Strategy", letter: "B", category: "Engineering", definition: "A set of conventions for how a team uses version control branches. Common strategies include Git Flow (long-lived branches), trunk-based development (short-lived branches), and GitHub Flow." },
  { term: "Bug", letter: "B", category: "Engineering", definition: "An unintended behavior in software that deviates from requirements. Bugs are triaged by severity (critical, major, minor) and priority, then assigned to developers for resolution." },
  { term: "Burndown Chart", letter: "B", category: "Agile", definition: "A chart that tracks remaining work (usually story points) over time during a sprint. The ideal line shows linear progress to zero by sprint end. Steep drops indicate bulk completions; flat lines signal blockers." },
  { term: "Burn Rate", letter: "B", category: "Business", definition: "The rate at which a company spends its cash reserves before becoming cash-flow positive. Measured monthly. Runway = cash on hand ÷ monthly burn rate." },

  // C
  { term: "CAC (Customer Acquisition Cost)", letter: "C", category: "Business", definition: "Total sales and marketing spend divided by new customers acquired in a period. Lower CAC relative to LTV indicates a healthy, scalable business model." },
  { term: "CD (Continuous Delivery)", letter: "C", category: "DevOps", definition: "A practice where code changes are automatically built, tested, and prepared for release to production. Differs from continuous deployment in that a human approval step precedes each release." },
  { term: "Churn Rate", letter: "C", category: "Business", definition: "The percentage of customers or revenue lost in a period. Net revenue churn accounts for expansion revenue; gross churn doesn't. High churn erodes ARR and signals product-market fit issues." },
  { term: "CI (Continuous Integration)", letter: "C", category: "DevOps", definition: "The practice of merging developer code changes into a shared repository frequently (often multiple times a day), with each merge triggering automated tests. Catches integration bugs early." },
  { term: "CI/CD Pipeline", letter: "C", category: "DevOps", definition: "The automated sequence of steps that takes code from commit to production: build → test → scan → deploy. Tools include GitHub Actions, CircleCI, Jenkins, and GitLab CI." },
  { term: "Cycle Time", letter: "C", category: "Engineering", definition: "The time from when a developer starts working on an item to when it's deployed. A core DORA metric. Shorter cycle times indicate a healthy, fast-moving engineering team." },

  // D
  { term: "Definition of Done (DoD)", letter: "D", category: "Agile", definition: "A shared checklist that defines what 'complete' means for a piece of work. Typically includes: code written, tests passing, PR reviewed, deployed to staging, documentation updated." },
  { term: "Dependency", letter: "D", category: "Engineering", definition: "A piece of work that must be completed before another can begin. Cross-team dependencies are a primary source of sprint delays. Identifying and surfacing them early is critical to delivery." },
  { term: "Deployment Frequency", letter: "D", category: "DevOps", definition: "How often an organization successfully deploys to production. A DORA elite metric: high performers deploy on demand, multiple times per day. Low frequency often signals large batch sizes and fear of failure." },
  { term: "DORA Metrics", letter: "D", category: "DevOps", definition: "Four key metrics from the DevOps Research and Assessment program: Deployment Frequency, Lead Time for Changes, Change Failure Rate, and Time to Restore Service. Used to benchmark engineering team performance." },
  { term: "DRY (Don't Repeat Yourself)", letter: "D", category: "Engineering", definition: "A software design principle stating that every piece of knowledge should have a single, authoritative representation in a codebase. Reduces duplication, bugs, and maintenance burden." },

  // E
  { term: "Epic", letter: "E", category: "Product", definition: "A large body of work that can be broken down into multiple user stories or tasks. Epics span multiple sprints and represent a significant feature or business capability." },
  { term: "Error Budget", letter: "E", category: "DevOps", definition: "The acceptable amount of downtime or errors allowed within a given period based on SLO targets. If the budget is exhausted, engineering prioritizes reliability over new features. Core to SRE practice." },
  { term: "Estimation", letter: "E", category: "Agile", definition: "The process of predicting how much effort a task will take. Techniques include story points (relative sizing), t-shirt sizes (XS/S/M/L/XL), and time-based estimation. AI tools like Atlas improve accuracy by analyzing historical data." },

  // F
  { term: "Feature Flag", letter: "F", category: "Engineering", definition: "A configuration toggle that enables or disables a feature without deploying new code. Used for gradual rollouts, A/B testing, and kill-switch capabilities. Reduces deployment risk significantly." },
  { term: "FTUE (First-Time User Experience)", letter: "F", category: "Product", definition: "The journey a new user takes in their first session with a product. Includes onboarding, activation, and the moment they experience their first 'aha' moment. Critical for retention." },

  // G
  { term: "Git", letter: "G", category: "Engineering", definition: "A distributed version control system that tracks changes in source code. Developers commit changes locally and push to shared repositories on platforms like GitHub, GitLab, or Bitbucket." },
  { term: "Golden Path", letter: "G", category: "Engineering", definition: "A paved, opinionated set of tools and workflows that engineering platform teams recommend. Reduces cognitive load for developers by providing a supported, documented default path to production." },

  // H
  { term: "HTTPS", letter: "H", category: "Engineering", definition: "HyperText Transfer Protocol Secure. The encrypted version of HTTP. All modern web applications should serve content exclusively over HTTPS, enforced via TLS certificates." },

  // I
  { term: "Incident", letter: "I", category: "DevOps", definition: "An unplanned interruption or degradation of a service. Incidents are declared, triaged, and resolved via on-call processes. A post-mortem (blameless) is typically written after resolution." },
  { term: "Integration Testing", letter: "I", category: "Engineering", definition: "Tests that verify multiple components or services work correctly together. Sits between unit tests (isolated) and end-to-end tests (full system). Often run in CI pipelines." },
  { term: "ICP (Ideal Customer Profile)", letter: "I", category: "Business", definition: "A detailed description of the company or person who gets the most value from your product and is most likely to buy. Used to focus sales, marketing, and product investment." },

  // K
  { term: "Kanban", letter: "K", category: "Methodology", definition: "A visual workflow management method that uses cards and columns to represent work items moving through stages (To Do → In Progress → Done). Focuses on limiting WIP and maximizing flow." },
  { term: "KPI (Key Performance Indicator)", letter: "K", category: "Business", definition: "A measurable value that demonstrates how effectively an organization is achieving key business objectives. Engineering KPIs often include cycle time, deployment frequency, and error rates." },

  // L
  { term: "Lead Time", letter: "L", category: "Engineering", definition: "The time from a customer request (or ticket creation) to its delivery in production. Includes queue time, development, review, and deployment. A DORA elite metric targets less than one hour." },
  { term: "LTV (Lifetime Value)", letter: "L", category: "Business", definition: "The total revenue a business expects from a customer over the entire relationship. LTV:CAC ratio of 3:1 or higher typically indicates a sustainable acquisition model." },

  // M
  { term: "MECE", letter: "M", category: "Business", definition: "Mutually Exclusive, Collectively Exhaustive. A framework for structuring problems or data so that categories don't overlap and together cover all possibilities. Common in product strategy and analysis." },
  { term: "Microservices", letter: "M", category: "Engineering", definition: "An architectural style where an application is built as a collection of small, independently deployable services. Each service owns its data and communicates via APIs. Increases deployment flexibility but adds operational complexity." },
  { term: "Milestone", letter: "M", category: "Product", definition: "A significant checkpoint or goal in a project timeline. Milestones represent major deliverables (e.g., beta launch, v1.0) and help teams and stakeholders track high-level progress." },
  { term: "MRR (Monthly Recurring Revenue)", letter: "M", category: "Business", definition: "The predictable revenue generated each month from active subscriptions. New MRR + Expansion MRR − Churned MRR = Net New MRR. The most-watched metric in SaaS." },

  // N
  { term: "NPS (Net Promoter Score)", letter: "N", category: "Product", definition: "A measure of customer loyalty. Users rate likelihood to recommend (0–10). Promoters (9–10) minus Detractors (0–6) = NPS. Scores above 50 are considered excellent for B2B SaaS." },

  // O
  { term: "OKR (Objectives and Key Results)", letter: "O", category: "Business", definition: "A goal-setting framework where Objectives are qualitative aspirations and Key Results are quantitative measures of success. Used by Google, Intel, and many SaaS companies to align teams around outcomes." },
  { term: "On-Call", letter: "O", category: "DevOps", definition: "A rotation where engineers are available outside business hours to respond to production incidents. On-call burden is tracked and should be kept below 25% of engineering capacity per SRE best practice." },
  { term: "ORM (Object-Relational Mapping)", letter: "O", category: "Engineering", definition: "A programming technique that lets developers interact with a database using objects instead of raw SQL. Common ORMs include Prisma (JS), SQLAlchemy (Python), and ActiveRecord (Ruby)." },

  // P
  { term: "PLG (Product-Led Growth)", letter: "P", category: "Business", definition: "A go-to-market strategy where the product itself drives user acquisition, activation, and expansion. Characterized by free tiers, self-serve onboarding, and viral loops built into the product." },
  { term: "Post-Mortem", letter: "P", category: "DevOps", definition: "A written analysis conducted after an incident or sprint failure. Blameless post-mortems focus on systems and processes, not individuals. They capture timeline, impact, root causes, and action items." },
  { term: "PR (Pull Request)", letter: "P", category: "Engineering", definition: "A request to merge code changes from one branch into another. PRs include a description of changes, linked tickets, and require peer review before merging. Also called a Merge Request (MR) in GitLab." },
  { term: "Product-Market Fit", letter: "P", category: "Business", definition: "The degree to which a product satisfies strong market demand. Characterized by high retention, word-of-mouth growth, and users who would be 'very disappointed' if the product went away (>40% in Sean Ellis test)." },

  // Q
  { term: "QA (Quality Assurance)", letter: "Q", category: "Engineering", definition: "The systematic process of ensuring a product meets quality standards before release. Includes manual testing, automated test suites, regression testing, and exploratory testing." },

  // R
  { term: "Refactoring", letter: "R", category: "Engineering", definition: "Restructuring existing code without changing its external behavior. Aims to improve readability, reduce complexity, and eliminate tech debt. Critical for long-term codebase health." },
  { term: "Regression", letter: "R", category: "Engineering", definition: "A bug introduced by a code change that breaks previously working functionality. Regression tests are automated checks that ensure existing behavior is preserved across changes." },
  { term: "Retrospective", letter: "R", category: "Agile", definition: "A recurring Agile ceremony at the end of each sprint where the team reflects on what went well, what didn't, and what to improve. Drives continuous process improvement." },
  { term: "ROAS (Return on Ad Spend)", letter: "R", category: "Business", definition: "Revenue generated for every dollar spent on advertising. ROAS = Revenue from ads ÷ Ad spend. A ROAS of 4x means $4 earned per $1 spent." },
  { term: "RPO / RTO", letter: "R", category: "DevOps", definition: "Recovery Point Objective (max acceptable data loss) and Recovery Time Objective (max acceptable downtime). Defined in disaster recovery plans and drive backup frequency and failover architecture decisions." },

  // S
  { term: "SaaS (Software as a Service)", letter: "S", category: "Business", definition: "A software distribution model where applications are hosted in the cloud and delivered to customers over the internet on a subscription basis. Examples: Slack, Salesforce, Voatomy." },
  { term: "Scrum", letter: "S", category: "Methodology", definition: "An Agile framework that organizes work into fixed-length sprints (1–4 weeks). Includes defined roles (Product Owner, Scrum Master, Dev Team) and ceremonies (Planning, Daily Standup, Review, Retrospective)." },
  { term: "SLA (Service Level Agreement)", letter: "S", category: "DevOps", definition: "A contract between a service provider and customer defining expected performance levels. SLAs typically specify uptime guarantees (e.g., 99.9%), response times, and remedies for violations." },
  { term: "SLI / SLO / SLA", letter: "S", category: "DevOps", definition: "Service Level Indicator (measured metric), Service Level Objective (target value for that metric), and Service Level Agreement (contractual commitment). The SRE reliability stack: SLI → SLO → SLA." },
  { term: "Sprint", letter: "S", category: "Agile", definition: "A fixed time-box (usually 1–2 weeks) during which a team commits to completing a set of work items from the backlog. Sprints provide a regular cadence for planning, delivery, and review." },
  { term: "SRE (Site Reliability Engineering)", letter: "S", category: "DevOps", definition: "A discipline that applies software engineering principles to infrastructure and operations. Coined at Google. SRE teams own reliability targets (SLOs), error budgets, on-call rotations, and postmortems." },
  { term: "Story Points", letter: "S", category: "Agile", definition: "A unit for estimating the relative complexity of work items using a Fibonacci-like scale (1, 2, 3, 5, 8, 13, 21). Based on effort, complexity, and uncertainty — not time." },
  { term: "System Design", letter: "S", category: "Engineering", definition: "The process of defining an architecture, components, interfaces, and data flow for a system to satisfy given requirements. Covers scalability, availability, consistency, latency, and cost tradeoffs." },

  // T
  { term: "TDD (Test-Driven Development)", letter: "T", category: "Engineering", definition: "A development practice where tests are written before the production code. Red (failing test) → Green (minimal code to pass) → Refactor. Produces high test coverage and cleaner interfaces." },
  { term: "Tech Debt", letter: "T", category: "Engineering", definition: "The implied cost of shortcuts taken during development that will require additional work later. Accumulates when teams prioritize speed over quality. If left unmanaged, it slows future delivery exponentially." },
  { term: "Throughput", letter: "T", category: "Agile", definition: "The number of work items completed in a period. Used in Kanban to forecast future delivery. Higher throughput with stable cycle times indicates a healthy, predictable engineering process." },
  { term: "Time to Market (TTM)", letter: "T", category: "Product", definition: "The time it takes to develop a product or feature from concept to customer availability. Reducing TTM is a core goal of Agile, CI/CD, and AI-assisted planning tools." },

  // U
  { term: "Unit Test", letter: "U", category: "Engineering", definition: "An automated test that verifies an individual function, method, or class in isolation. The foundation of the testing pyramid. Should be fast, deterministic, and abundant — covering happy paths and edge cases." },
  { term: "User Story", letter: "U", category: "Product", definition: "A short, informal description of a feature from the user's perspective: 'As a [role], I want [goal] so that [reason].' The primary unit of work in Agile backlogs. Should be small enough to complete in one sprint." },

  // V
  { term: "Velocity", letter: "V", category: "Agile", definition: "The average number of story points a team completes per sprint over the last 3–5 sprints. Used to forecast future sprint capacity. Velocity varies naturally — averaging is more reliable than chasing a single number." },
  { term: "Version Control", letter: "V", category: "Engineering", definition: "A system that records changes to files over time so specific versions can be recalled later. Git is the dominant version control system. Enables collaboration, code review, and rollback." },

  // W
  { term: "Waterfall", letter: "W", category: "Methodology", definition: "A sequential software development model with distinct phases: Requirements → Design → Implementation → Testing → Deployment → Maintenance. Each phase must complete before the next begins. Less flexible than Agile for changing requirements." },
  { term: "WIP (Work In Progress)", letter: "W", category: "Agile", definition: "The number of tasks currently being worked on simultaneously. High WIP leads to context-switching, longer cycle times, and lower quality. Kanban WIP limits enforce focus." },

  // Z
  { term: "Zero-Downtime Deployment", letter: "Z", category: "DevOps", definition: "A deployment strategy that keeps a service available during code releases. Techniques include blue-green deployments, canary releases, and rolling updates. Eliminates maintenance windows for users." },
];

const CATEGORIES = ["All", "Agile", "Business", "DevOps", "Engineering", "Methodology", "Product"];
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const CATEGORY_COLORS: Record<string, { text: string; bg: string }> = {
  Agile:       { text: "#F05A28", bg: "#FFF3EE" },
  Business:    { text: "#059669", bg: "#ECFDF5" },
  DevOps:      { text: "#7C3AED", bg: "#F5F3FF" },
  Engineering: { text: "#2563EB", bg: "#EFF6FF" },
  Methodology: { text: "#D97706", bg: "#FFFBEB" },
  Product:     { text: "#DB2777", bg: "#FDF2F8" },
};

export default function PageContent() {
  const [query, setQuery]         = useState("");
  const [category, setCategory]   = useState("All");
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const q   = query.toLowerCase().trim();
    const cat = category === "All" ? null : category;
    return TERMS.filter((t) => {
      const matchesQ   = !q || t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q);
      const matchesCat = !cat || t.category === cat;
      const matchesL   = !activeLetter || t.letter === activeLetter;
      return matchesQ && matchesCat && matchesL;
    });
  }, [query, category, activeLetter]);

  const grouped = useMemo(() => {
    const map: Record<string, typeof TERMS> = {};
    for (const t of filtered) {
      if (!map[t.letter]) map[t.letter] = [];
      map[t.letter].push(t);
    }
    return map;
  }, [filtered]);

  const presentLetters = new Set(filtered.map((t) => t.letter));

  const clearSearch = () => {
    setQuery("");
    setActiveLetter(null);
    setCategory("All");
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white px-4 pb-10 pt-16 sm:pt-20">
        <SubpageHeroAtmosphere />
        <div className="relative z-10 mx-auto max-w-container text-center">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-[#F05A28]/25 bg-[#F05A28]/8 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#F05A28]">
            <BookOpen className="h-3 w-3" />
            Glossary
          </span>
          <h1 className="font-heading mt-4 text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight text-[#121312]">
            SaaS & Engineering Glossary
          </h1>
          <p className="mx-auto mt-4 max-w-[52ch] text-base leading-relaxed text-[#121312]/55 sm:text-lg">
            Clear definitions for every term modern software teams use — from sprint velocity to DORA metrics.
          </p>

          {/* Search */}
          <div className="mx-auto mt-8 max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#121312]/35" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setActiveLetter(null); }}
                placeholder="Search terms…"
                className="h-12 w-full rounded-2xl border border-[#121312]/12 bg-white pl-11 pr-10 text-sm text-[#121312] shadow-sm outline-none transition placeholder:text-[#121312]/35 focus:border-[#F05A28]/40 focus:ring-2 focus:ring-[#F05A28]/12"
              />
              {(query || activeLetter || category !== "All") && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-[#121312]/8 text-[#121312]/50 hover:bg-[#121312]/14 transition"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Filters ──────────────────────────────────────── */}
      <div className="sticky top-0 z-20 border-b border-[#121312]/8 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto max-w-container px-4">
          {/* Category tabs */}
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={cn(
                  "shrink-0 rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-all duration-150",
                  category === cat
                    ? "bg-[#121312] text-white shadow-sm"
                    : "bg-transparent text-[#121312]/50 hover:bg-[#121312]/6 hover:text-[#121312]",
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* A–Z alphabet bar */}
          <div className="flex flex-wrap gap-0.5 pb-3">
            {LETTERS.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => { setActiveLetter(activeLetter === l ? null : l); setQuery(""); }}
                disabled={!presentLetters.has(l)}
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-lg text-[11px] font-bold transition-all",
                  activeLetter === l
                    ? "bg-[#F05A28] text-white"
                    : presentLetters.has(l)
                    ? "text-[#121312]/55 hover:bg-[#F05A28]/10 hover:text-[#F05A28]"
                    : "cursor-not-allowed text-[#121312]/18",
                )}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Term list ────────────────────────────────────── */}
      <div className="mx-auto max-w-container px-4 py-10">
        {Object.keys(grouped).length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-2xl">🔍</p>
            <p className="mt-3 text-sm font-medium text-[#121312]/50">No terms match your search.</p>
            <button
              type="button"
              onClick={clearSearch}
              className="mt-4 text-xs font-semibold text-[#F05A28] hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.keys(grouped).sort().map((letter) => (
              <section key={letter} id={`letter-${letter}`}>
                <div className="mb-4 flex items-center gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F05A28]/10 text-lg font-bold text-[#F05A28]">
                    {letter}
                  </span>
                  <div className="h-px flex-1 bg-[#121312]/8" />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {grouped[letter].map((item) => {
                    const cat = CATEGORY_COLORS[item.category] ?? { text: "#64748B", bg: "#F8FAFC" };
                    return (
                      <article
                        key={item.term}
                        className="group rounded-2xl border border-[#121312]/8 bg-white p-5 shadow-[0_2px_8px_rgba(17,24,39,0.04)] transition-shadow hover:shadow-[0_4px_20px_rgba(17,24,39,0.08)]"
                      >
                        <div className="mb-2 flex items-start justify-between gap-2">
                          <h3 className="text-[15px] font-bold leading-tight text-[#121312]">
                            {item.term}
                          </h3>
                          <span
                            className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                            style={{ color: cat.text, backgroundColor: cat.bg }}
                          >
                            {item.category}
                          </span>
                        </div>
                        <p className="text-[13px] leading-relaxed text-[#121312]/60">
                          {item.definition}
                        </p>
                      </article>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>

      {/* ── CTA strip ────────────────────────────────────── */}
      <section className="border-t border-[#121312]/8 bg-[#f8f9fb] px-4 py-16">
        <div className="mx-auto max-w-container text-center">
          <h2 className="text-2xl font-bold text-[#121312] sm:text-3xl">
            Put these concepts into practice
          </h2>
          <p className="mx-auto mt-3 max-w-[44ch] text-sm leading-relaxed text-[#121312]/55">
            Voatomy connects sprint planning, tech debt, velocity, and DORA metrics into one intelligent workspace.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/auth/signup"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[#F05A28] px-6 text-sm font-semibold text-white shadow-sm transition hover:shadow-md"
            >
              Start free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/products"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-[#121312]/14 bg-white px-6 text-sm font-semibold text-[#121312] shadow-sm transition hover:bg-[#121312]/4"
            >
              Explore products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
