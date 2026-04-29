# Product Ecosystem Integration in Onboarding

> How all 6 Voatomy products (ATLAS, LOOP, SIGNAL, DRIFT, PHANTOM, NEXUS) are introduced, teased, and activated throughout the onboarding journey. The goal: users discover the full platform naturally, not all at once.
>
> These product entries are aligned with the six ideas in `MEGA_STARTUP_IDEAS.md`, and Step 1 now captures the user's selected idea template to personalize this product-ecosystem path.

---

## The 6 Products

```
 ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
 │                                                                                                  │
 │  #   PRODUCT     WHAT IT DOES                              ENTRY POINT IN ONBOARDING            │
 │  ──  ──────────  ──────────────────────────────────────── ──────────────────────────────────── │
 │                                                                                                  │
 │  5   ATLAS       AI Sprint Planner — understands code      PRIMARY. The core onboarding product. │
 │                  complexity, design scope, business         Users generate their first plan here.  │
 │                  priority, customer demand, tech debt,                                            │
 │                  and team capacity                                                                │
 │                                                                                                  │
 │  3   LOOP        Product-Revenue Feedback Engine —         TEASED in Step 5 (First Sprint Plan)  │
 │                  closes the feedback loop between what      when ATLAS shows revenue-weighted     │
 │                  customers want, what engineering builds,   priorities. "Want to see why this     │
 │                  and what sales can sell                    feature is prioritized? LOOP tracks   │
 │                                                            customer demand signals."              │
 │                                                                                                  │
 │  2   SIGNAL      Revenue-Aware Incident Intelligence —     TEASED in Integration Step when user  │
 │                  translates incidents into business          connects Datadog/PagerDuty. Also     │
 │                  impact in real-time                        surfaced post-onboarding when first   │
 │                                                            incident correlates with revenue.      │
 │                                                                                                  │
 │  4   DRIFT       AI Design System Guardian —               TEASED when user connects Figma in    │
 │                  keeps design and code in sync,             Integration Step. "DRIFT monitors     │
 │                  optimizes designs for revenue              design-code drift automatically."     │
 │                                                                                                  │
 │  6   PHANTOM     AI Technical Debt Radar —                 TEASED in Step 5 when ATLAS flags     │
 │                  makes tech debt visible in dollars,        tech debt hotspots. "PHANTOM tracks   │
 │                  not jargon                                 these with dollar impact."            │
 │                                                                                                  │
 │  1   NEXUS       AI Organizational Nerve Center —          THE DESTINATION. Shown in dashboard   │
 │                  connects all teams into one loop           after user activates 3+ products.     │
 │                                                            "Unlock NEXUS: your org nerve center."│
 │                                                                                                  │
 └──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Progressive Disclosure Strategy

```
 ┌──────────────────────────────────────────────────────────────────────────┐
 │                                                                          │
 │  PHILOSOPHY: Don't overwhelm. Reveal products as users need them.      │
 │                                                                          │
 │  ONBOARDING    →  Show ATLAS only. It's the wedge.                     │
 │  FIRST SPRINT  →  Tease LOOP + PHANTOM (contextual nudges).            │
 │  INTEGRATIONS  →  Tease SIGNAL + DRIFT (when relevant tools connect).  │
 │  DASHBOARD     →  Tease NEXUS (when 3+ products are active).           │
 │  WEEK 1-2      →  Unlock LOOP + PHANTOM with guided activation.       │
 │  WEEK 3-4      →  Unlock SIGNAL + DRIFT based on usage patterns.      │
 │  MONTH 2+      →  Full NEXUS available when cross-team data flows.    │
 │                                                                          │
 └──────────────────────────────────────────────────────────────────────────┘
```

---

## Step 1: Welcome — Product Ecosystem Preview

The welcome step's "How Voatomy Works" illustration subtly shows the full ecosystem:

### Updated Product Flow Illustration

```
 ┌────────────────────────────────────────────────────────────────────────────────────┐
 │                                                                                    │
 │                        How Voatomy works                                           │
 │                                                                                    │
 │  ┌────────────┐    ┌────────────┐    ┌────────────┐    ┌────────────┐            │
 │  │            │    │            │    │            │    │            │            │
 │  │  ┌──────┐  │    │  ┌──────┐  │    │  ┌──────┐  │    │  ┌──────┐  │            │
 │  │  │</>   │  │    │  │ ◎◎◎  │  │    │  │ ⚡AI  │  │    │  │ ═══  │  │            │
 │  │  │      │  │ ──>│  │      │  │ ──>│  │ATLAS │  │ ──>│  │ ═══  │  │            │
 │  │  └──────┘  │    │  └──────┘  │    │  └──────┘  │    │  └──────┘  │            │
 │  │            │    │            │    │            │    │            │            │
 │  │  Connect   │    │  Add your  │    │   ATLAS    │    │  Sprint    │            │
 │  │  your data │    │  team      │    │  analyzes  │    │  plan      │            │
 │  │            │    │            │    │  everything│    │  ready!    │            │
 │  └────────────┘    └────────────┘    └────────────┘    └────────────┘            │
 │                                                                                    │
 │   Code repos,       Engineers,        6 AI signals:       Accurate estimates      │
 │   Jira, Notion,     leads, PMs,       code complexity,    your team trusts        │
 │   spreadsheets      designers         design scope,                               │
 │                                        business priority,                          │
 │                                        customer demand,                            │
 │                                        tech debt,                                  │
 │                                        team capacity                               │
 │                                                                                    │
 │  ┌──────────────────────────────────────────────────────────────────────────┐      │
 │  │                                                                          │      │
 │  │  As your team grows, unlock more:                                       │      │
 │  │                                                                          │      │
 │  │  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐                     │      │
 │  │  │ATLAS │  │ LOOP │  │SIGNAL│  │DRIFT │  │PHNTM │  ──> NEXUS          │      │
 │  │  │Sprint│  │Revenue│ │Incid.│  │Design│  │ Debt │      Nerve Center   │      │
 │  │  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘                     │      │
 │  │   Active    Coming    Coming    Coming    Coming       The full        │      │
 │  │   now       soon      soon      soon      soon         platform       │      │
 │  │                                                                          │      │
 │  └──────────────────────────────────────────────────────────────────────────┘      │
 │                                                                                    │
 └────────────────────────────────────────────────────────────────────────────────────┘
```

### Animation for Product Row

```
 TIMING                   ANIMATION
 ──────────────────────  ──────────────────────────────────────────────
 After main flow plays    Product row slides in from bottom (0.3s fade up)
 0.0s                     ATLAS chip glows green (active)
 0.3s                     LOOP chip fades in (muted, 50% opacity)
 0.5s                     SIGNAL chip fades in (muted)
 0.7s                     DRIFT chip fades in (muted)
 0.9s                     PHANTOM chip fades in (muted)
 1.1s                     Arrow draws to NEXUS label
 1.5s                     Row settles, subtle shimmer on "Coming soon"
```

---

## Step 2: Connect Data — Product-Aware Recommendations

When users connect specific tools, show how other products will use that data:

### Connection → Product Mapping

```
 TOOL CONNECTED              PRODUCTS THAT BENEFIT                  NUDGE SHOWN
 ──────────────────────────  ──────────────────────────────────── ─────────────────────────────
 GitHub / GitLab              ATLAS (code complexity)                "ATLAS will analyze this repo"
                              PHANTOM (tech debt scanning)           "PHANTOM will track debt here"

 Jira / Linear                ATLAS (sprint history & velocity)     "ATLAS uses your sprint data"
                              LOOP (revenue-weighted backlog)        "LOOP weights by revenue impact"

 Figma                        ATLAS (design scope estimation)       "ATLAS factors design effort"
                              DRIFT (design-code sync)              "DRIFT monitors design drift"

 Salesforce / HubSpot         LOOP (revenue-weighted priorities)    "LOOP connects deals to features"
                              SIGNAL (customer revenue impact)      "SIGNAL ties incidents to revenue"

 Datadog / PagerDuty          SIGNAL (incident intelligence)        "SIGNAL will auto-assess impact"
                              ATLAS (on-call capacity planning)     "ATLAS factors on-call load"

 Slack / Teams                All products (notifications)          "Get alerts from all Voatomy products"

 Gong / Chorus                LOOP (sales call analysis)            "LOOP extracts feature requests"
                              ATLAS (customer demand signals)       "ATLAS weights by demand"

 Zendesk / Intercom           LOOP (support-driven priorities)      "LOOP routes support signals"
                              SIGNAL (customer impact correlation)   "SIGNAL correlates incidents"
```

### Integration Step — Product Benefit Cards

```
 ┌────────────────────────────────────────────────────────────────────────────────┐
 │                                                                                │
 │  You connected GitHub and Jira. Here's what Voatomy can do:                  │
 │                                                                                │
 │  ┌──────────────────────────────────────────────────────────────────────┐      │
 │  │                                                                      │      │
 │  │  ┌─────────────────────────────────────────────────────────┐        │      │
 │  │  │  ⚡ ATLAS — Sprint Planning (Active Now)                │        │      │
 │  │  │                                                         │        │      │
 │  │  │  • Code complexity analysis from GitHub  ✓              │        │      │
 │  │  │  • Sprint velocity from Jira history  ✓                 │        │      │
 │  │  │  • Team capacity estimation  ✓                          │        │      │
 │  │  │                                                         │        │      │
 │  │  │  [Generating your first plan...]                       │        │      │
 │  │  └─────────────────────────────────────────────────────────┘        │      │
 │  │                                                                      │      │
 │  │  ┌─────────────────────────────────────────────────────────┐        │      │
 │  │  │  🔮 PHANTOM — Tech Debt Radar (Unlocks after 1st plan) │        │      │
 │  │  │                                                         │        │      │
 │  │  │  • Scans GitHub repos for tech debt hotspots            │        │      │
 │  │  │  • Shows debt in dollars, not jargon                    │        │      │
 │  │  │  • Prioritizes remediation by business impact           │        │      │
 │  │  │                                                         │        │      │
 │  │  │  [Activate after your first sprint →]                  │        │      │
 │  │  └─────────────────────────────────────────────────────────┘        │      │
 │  │                                                                      │      │
 │  │  ┌─────────────────────────────────────────────────────────┐        │      │
 │  │  │  🔄 LOOP — Revenue Feedback (Coming soon)               │        │      │
 │  │  │                                                         │        │      │
 │  │  │  • Revenue-weighted feature prioritization              │        │      │
 │  │  │  • Auto-generates sales briefs when features ship       │        │      │
 │  │  │  • Connects Jira backlog to pipeline value              │        │      │
 │  │  │                                                         │        │      │
 │  │  │  [Notify me when available]                            │        │      │
 │  │  └─────────────────────────────────────────────────────────┘        │      │
 │  │                                                                      │      │
 │  └──────────────────────────────────────────────────────────────────────┘      │
 │                                                                                │
 └────────────────────────────────────────────────────────────────────────────────┘
```

---

## Step 5: First Sprint Plan — Product Teasers in Results

After generating the first sprint plan, ATLAS results include contextual teasers for other products:

### PHANTOM Teaser (in Sprint Results)

```
 ┌──────────────────────────────────────────────────────────────────┐
 │                                                                  │
 │  📊  SPRINT STATS                                                │
 │                                                                  │
 │  Total points:  42 pts                                           │
 │  Avg confidence: 83%                                             │
 │  Tech debt flags: 3 items ←── PHANTOM TEASER POINT              │
 │  Estimated accuracy: 87%                                         │
 │                                                                  │
 │  ──────────────────────────────────────────────────────────     │
 │                                                                  │
 │  ┌──────────────────────────────────────────────────────────┐   │
 │  │  🔮 PHANTOM detected 3 tech debt hotspots in your code: │   │
 │  │                                                          │   │
 │  │  • auth-module/ — $12K/quarter in slower releases       │   │
 │  │  • payment-service/ — 2.3x longer PR merge times        │   │
 │  │  • legacy-api/ — caused 4 incidents last quarter         │   │
 │  │                                                          │   │
 │  │  Track debt with dollar impact → [Activate PHANTOM]     │   │
 │  │                                                          │   │
 │  └──────────────────────────────────────────────────────────┘   │
 │                                                                  │
 └──────────────────────────────────────────────────────────────────┘
```

### LOOP Teaser (in Sprint Results)

```
 ┌──────────────────────────────────────────────────────────────────┐
 │                                                                  │
 │  ┌──────────────────────────────────────────────────────────┐   │
 │  │  FE-42  Refactor auth module                             │   │
 │  │  ■■■■■■■░░░  Complexity: 7.2  ·  3 pts                  │   │
 │  │  Confidence: 87%                                         │   │
 │  │                                                          │   │
 │  │  💰 Revenue signal: 15 deals worth $2.3M mention auth   │   │ ← LOOP TEASER
 │  │     issues in sales calls. [See why with LOOP →]        │   │
 │  │                                                          │   │
 │  └──────────────────────────────────────────────────────────┘   │
 │                                                                  │
 └──────────────────────────────────────────────────────────────────┘
```

### DRIFT Teaser (in Sprint Results — only if Figma connected)

```
 ┌──────────────────────────────────────────────────────────────────┐
 │                                                                  │
 │  ┌──────────────────────────────────────────────────────────┐   │
 │  │  FE-18  Add payment integration                          │   │
 │  │  ■■■■■■■■■░  Complexity: 8.5  ·  8 pts                  │   │
 │  │                                                          │   │
 │  │  🎨 Design note: 14 Figma components need new states.   │   │ ← DRIFT TEASER
 │  │     DRIFT detected 3 existing components have drifted   │   │
 │  │     from code. [Fix drift first with DRIFT →]           │   │
 │  │                                                          │   │
 │  └──────────────────────────────────────────────────────────┘   │
 │                                                                  │
 └──────────────────────────────────────────────────────────────────┘
```

### SIGNAL Teaser (in Sprint Results — only if Datadog/PagerDuty connected)

```
 ┌──────────────────────────────────────────────────────────────────┐
 │                                                                  │
 │  ┌──────────────────────────────────────────────────────────┐   │
 │  │  📊  TEAM CAPACITY NOTE                                  │   │
 │  │                                                          │   │
 │  │  ATLAS detected 2 engineers are on-call this sprint.    │   │
 │  │  Historical data shows on-call reduces velocity by 30%. │   │
 │  │                                                          │   │
 │  │  ⚡ SIGNAL can auto-route incidents by revenue impact    │   │ ← SIGNAL TEASER
 │  │     and reduce alert noise by 97%. [Activate SIGNAL →]  │   │
 │  │                                                          │   │
 │  └──────────────────────────────────────────────────────────┘   │
 │                                                                  │
 └──────────────────────────────────────────────────────────────────┘
```

---

## Dashboard: NEXUS Teaser (Post-Onboarding)

Once a user has 3+ products active, the NEXUS teaser appears:

```
 ┌──────────────────────────────────────────────────────────────────────────────┐
 │                                                                              │
 │  ┌──────────────────────────────────────────────────────────────────────┐   │
 │  │                                                                      │   │
 │  │  🧠 Unlock NEXUS — Your Organizational Nerve Center                 │   │
 │  │                                                                      │   │
 │  │  You have 3 Voatomy products active:                                │   │
 │  │                                                                      │   │
 │  │  [✓ ATLAS]  [✓ PHANTOM]  [✓ LOOP]  [○ SIGNAL]  [○ DRIFT]          │   │
 │  │                                                                      │   │
 │  │  NEXUS connects ALL your teams — engineering, product, sales,       │   │
 │  │  marketing, SRE, and customer success — into one intelligent loop.  │   │
 │  │                                                                      │   │
 │  │  Connect 2 more products to unlock NEXUS.                           │   │
 │  │                                                                      │   │
 │  │  [Explore NEXUS →]                                                  │   │
 │  │                                                                      │   │
 │  └──────────────────────────────────────────────────────────────────────┘   │
 │                                                                              │
 └──────────────────────────────────────────────────────────────────────────────┘
```

---

## Product Activation Timeline

```
 ┌──────────────────────────────────────────────────────────────────────────────────┐
 │                                                                                  │
 │  ONBOARDING           WEEK 1              WEEK 2-4            MONTH 2+           │
 │  ────────────────── ────────────────── ────────────────── ──────────────────     │
 │                                                                                  │
 │  ⚡ ATLAS            ⚡ ATLAS            ⚡ ATLAS            ⚡ ATLAS             │
 │     Generate first      Refine sprint       Advanced sprint     Portfolio-level    │
 │     sprint plan         settings            customization       planning           │
 │                                                                                  │
 │  Teaser: PHANTOM     🔮 PHANTOM          🔮 PHANTOM          🔮 PHANTOM          │
 │  (debt flags in      Activate tech        Debt trends          Remediation ROI    │
 │   sprint results)    debt scanning        over time            tracking           │
 │                                                                                  │
 │  Teaser: LOOP        Teaser: LOOP        🔄 LOOP             🔄 LOOP             │
 │  (revenue signals    (revenue-weighted   Revenue-weighted     Ship-to-sell       │
 │   in task cards)     backlog preview)    backlog active       automation         │
 │                                                                                  │
 │  Teaser: DRIFT       Teaser: DRIFT       🎨 DRIFT            🎨 DRIFT            │
 │  (if Figma           (design-code        Full sync            Revenue-aware      │
 │   connected)         drift scan)         monitoring           design optimize    │
 │                                                                                  │
 │  Teaser: SIGNAL      Teaser: SIGNAL      ⚡ SIGNAL            ⚡ SIGNAL           │
 │  (if Datadog/        (incident           Revenue-aware        Cross-team         │
 │   PagerDuty)         preview)            incidents active     incident routing   │
 │                                                                                  │
 │                                           Teaser: NEXUS       🧠 NEXUS            │
 │                                           (3+ products)       Full org nerve      │
 │                                                               center active      │
 │                                                                                  │
 └──────────────────────────────────────────────────────────────────────────────────┘
```

---

## Product Card Component (Reused Across Onboarding)

Every product teaser uses a consistent card design:

```
 ACTIVE STATE:
 ┌──────────────────────────────────────────────────────┐
 │                                                      │     green left border
 │  ⚡ ATLAS — Sprint Planning          [Active] ✓     │     green "Active" badge
 │                                                      │
 │  AI-powered sprint plans that understand             │
 │  your code, team, and business priorities.           │
 │                                                      │
 │  [Open ATLAS →]                                     │
 │                                                      │
 └──────────────────────────────────────────────────────┘

 TEASER STATE:
 ┌──────────────────────────────────────────────────────┐
 │                                                      │     gray left border
 │  🔮 PHANTOM — Tech Debt Radar     [Unlock →]       │     muted colors
 │                                                      │
 │  Make tech debt visible in dollars, not jargon.     │
 │  Track trends and justify refactoring to leadership.│
 │                                                      │
 │  Activates after your first sprint plan.            │
 │                                                      │
 └──────────────────────────────────────────────────────┘

 COMING SOON STATE:
 ┌──────────────────────────────────────────────────────┐
 │                                                      │     50% opacity
 │  🔄 LOOP — Revenue Feedback       [Coming Soon]     │     yellow badge
 │                                                      │
 │  Close the loop between customer demand              │
 │  and engineering priorities with revenue data.       │
 │                                                      │
 │  [Notify me when available]                         │
 │                                                      │
 └──────────────────────────────────────────────────────┘
```

---

## ATLAS 6 Signal Indicators in Sprint Plan

During onboarding Step 5, ATLAS shows its 6 intelligence signals. Each maps to a product:

```
 ┌──────────────────────────────────────────────────────────────────────────────┐
 │                                                                              │
 │  ATLAS analyzed your sprint using 6 signals:                                │
 │                                                                              │
 │  ┌──────────────────────┐  ┌──────────────────────┐                        │
 │  │  📊 Code Complexity   │  │  🎨 Design Scope     │                        │
 │  │  From: GitHub         │  │  From: Figma          │                        │
 │  │  Powers: ATLAS        │  │  Powers: ATLAS, DRIFT │                        │
 │  │  Status: ✓ Active     │  │  Status: ○ Connect    │                        │
 │  └──────────────────────┘  └──────────────────────┘                        │
 │                                                                              │
 │  ┌──────────────────────┐  ┌──────────────────────┐                        │
 │  │  💰 Business Priority │  │  🎯 Customer Demand  │                        │
 │  │  From: Salesforce      │  │  From: Zendesk, Gong │                        │
 │  │  Powers: ATLAS, LOOP   │  │  Powers: ATLAS, LOOP │                        │
 │  │  Status: ○ Connect     │  │  Status: ○ Connect   │                        │
 │  └──────────────────────┘  └──────────────────────┘                        │
 │                                                                              │
 │  ┌──────────────────────┐  ┌──────────────────────┐                        │
 │  │  🔧 Tech Debt        │  │  👥 Team Capacity    │                        │
 │  │  From: GitHub         │  │  From: Sprint history │                        │
 │  │  Powers: ATLAS,       │  │  Powers: ATLAS,      │                        │
 │  │         PHANTOM       │  │         SIGNAL       │                        │
 │  │  Status: ✓ Active     │  │  Status: ✓ Active    │                        │
 │  └──────────────────────┘  └──────────────────────┘                        │
 │                                                                              │
 │  Connect more tools to make ATLAS smarter. [Add integrations]              │
 │                                                                              │
 └──────────────────────────────────────────────────────────────────────────────┘
```

---

## Contextual Product Discovery Rules

```
 TRIGGER                              PRODUCT SHOWN            NUDGE TEXT
 ────────────────────────────────── ────────────────────────  ──────────────────────────────
 User generates 1st sprint plan       PHANTOM                  "3 tech debt hotspots found.
                                                               Track with dollar impact."

 Sprint plan shows revenue signals    LOOP                     "Revenue-weighted priorities
                                                               powered by LOOP."

 User connects Figma                  DRIFT                    "DRIFT will monitor design-code
                                                               sync automatically."

 User connects Datadog/PagerDuty      SIGNAL                   "SIGNAL converts incidents
                                                               to business impact scores."

 User generates 3rd sprint plan       LOOP (detailed)          "Ready to close the feedback
                                                               loop? LOOP imports customer
                                                               signals from sales & support."

 User generates 5th sprint plan       PHANTOM (detailed)       "You've flagged 12 debt items.
                                                               PHANTOM tracks them with
                                                               quarterly dollar impact."

 3+ products activated                NEXUS                    "You're ready for NEXUS — your
                                                               organizational nerve center."

 User's team has 5+ members           NEXUS (light)            "Growing teams use NEXUS for
                                                               cross-team alignment."
```

---

## Pricing Integration in Onboarding

Products are introduced WITHOUT pricing pressure during onboarding. The pricing model only surfaces post-onboarding:

```
 DURING ONBOARDING:
 ──────────────────────────────────────────────────
 • ATLAS is fully functional (Free tier: 1 repo, 8 members, 2 plans/month)
 • Other products show as "teasers" — no pricing shown
 • "Unlock" buttons lead to product pages, not paywalls
 • No upsell modals or pricing popups during the onboarding flow

 POST-ONBOARDING (Dashboard):
 ──────────────────────────────────────────────────
 • When user tries to activate PHANTOM, LOOP, etc:
   - Show feature preview + value proposition
   - Then show pricing: "Pro plan includes PHANTOM ($14/user/mo)"
   - Or: "This feature is coming soon. Get notified."
 • Upgrade prompts are contextual, never blocking
```

---

## Product Ecosystem by Persona

```
 ┌──────────────────────────────────────────────────────────────────────────────────────────┐
 │                                                                                          │
 │  PERSONA              PRODUCTS THEY'LL USE            ONBOARDING TEASERS THEY SEE       │
 │  ──────────────────  ──────────────────────────────  ──────────────────────────────────  │
 │  EM (Sarah K.)        ATLAS, PHANTOM, LOOP           PHANTOM debt flags, LOOP revenue   │
 │  VP Product (Marcus)  ATLAS, LOOP, NEXUS             LOOP revenue signals, NEXUS nerve  │
 │  Tech Lead (Priya)    ATLAS, PHANTOM, DRIFT          PHANTOM debt, DRIFT design sync    │
 │  CTO (James L.)       All products                   All teasers, NEXUS first           │
 │  PM (Lisa M.)         ATLAS, LOOP                    LOOP revenue-weighted backlog      │
 │  Founder (David R.)   ATLAS, LOOP, NEXUS             LOOP revenue, NEXUS org center     │
 │  Designer (Rachel)    ATLAS, DRIFT                   DRIFT design-code sync             │
 │  SRE/DevOps (Tom)     ATLAS, SIGNAL                  SIGNAL incident intelligence       │
 │                                                                                          │
 └──────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Accessibility

| Element | Requirement |
|---------|-------------|
| Product cards | `role="article"` with `aria-label="ATLAS sprint planning - Active"` |
| Teaser badges | `aria-label="Coming soon: LOOP Revenue Feedback"` |
| Unlock buttons | `aria-label="Activate PHANTOM tech debt scanning"` |
| Signal indicators | `role="status"` with `aria-label="Code complexity signal: Active"` |
| Product row animation | `prefers-reduced-motion: reduce` disables staggered entrance |
| Notify buttons | `aria-label="Get notified when LOOP is available"` |
