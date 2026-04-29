# Step 4.5: Connect Integrations (Optional)

> An optional step between team setup and first sprint plan. Users connect their project management, communication, and design tools for richer ATLAS insights.

---

## When This Step Appears

```
 ┌──────────────────────────────────────────────────────────────────────────┐
 │                                                                          │
 │  THIS STEP IS CONTEXTUAL — it only appears when:                        │
 │                                                                          │
 │  1. User is on Pro, Business, or Enterprise plan                        │
 │  2. User selected >= 1 repo in Step 3                                   │
 │  3. User hasn't skipped 2+ previous steps already                       │
 │                                                                          │
 │  For Free plan users, this is shown as a post-onboarding prompt        │
 │  inside the dashboard (not during onboarding).                          │
 │                                                                          │
 └──────────────────────────────────────────────────────────────────────────┘
```

---

## Source & Destination

```
 /onboard/team                  /onboard/integrations           /onboard/first-plan
 ═════════════                  ═════════════════════           ═══════════════════

 ┌──────────────┐    ┌──────────────────────────────┐    ┌──────────────┐
 │ User invited │    │                              │    │ First AI     │
 │ team members │───>│  Connect tools (optional)    │───>│ sprint plan  │
 │              │    │  Jira, Slack, Figma, etc.    │    │              │
 └──────────────┘    │                              │    └──────────────┘
                     │  Skip for now ───────────────│──>
                     └──────────────────────────────┘
```

---

## Wireframe

```
 ┌────────────────────────────────────────────────────────────────────────┐
 │                                                                        │
 │  ┌──┐                                                                  │
 │  │//│ Voatomy                                              [X] Exit   │
 │  └──┘                                                                  │
 │                                                                        │
 │  [●━━━━━━━●━━━━━━━●━━━━━━━●━━━━━━━○]                                  │
 │   Welcome  Connect   Repos    Team    Plan                             │
 │                                                                        │
 │  ┌────────────────────────────────────────────────────────────────┐    │
 │  │                                                                │    │
 │  │              Supercharge your sprint plans                    │    │
 │  │                                                                │    │
 │  │     Connect your tools to give ATLAS more context.            │    │
 │  │     Better data = more accurate sprint estimates.             │    │
 │  │                                                                │    │
 │  │                                                                │    │
 │  │  PROJECT MANAGEMENT                                           │    │
 │  │  ┌──────────────────────────────────────────────────────┐     │    │
 │  │  │                                                      │     │    │
 │  │  │  ┌────────────────────┐  ┌────────────────────┐     │     │    │
 │  │  │  │  [Jira icon]       │  │  [Linear icon]     │     │     │    │
 │  │  │  │  Jira              │  │  Linear            │     │     │    │
 │  │  │  │  [Connect]         │  │  [Connect]         │     │     │    │
 │  │  │  └────────────────────┘  └────────────────────┘     │     │    │
 │  │  │                                                      │     │    │
 │  │  │  ┌────────────────────┐                              │     │    │
 │  │  │  │  [Asana icon]      │                              │     │    │
 │  │  │  │  Asana             │                              │     │    │
 │  │  │  │  [Connect]         │                              │     │    │
 │  │  │  └────────────────────┘                              │     │    │
 │  │  │                                                      │     │    │
 │  │  └──────────────────────────────────────────────────────┘     │    │
 │  │                                                                │    │
 │  │  COMMUNICATION                                                │    │
 │  │  ┌──────────────────────────────────────────────────────┐     │    │
 │  │  │                                                      │     │    │
 │  │  │  ┌────────────────────┐  ┌────────────────────┐     │     │    │
 │  │  │  │  [Slack icon]      │  │  [Teams icon]      │     │     │    │
 │  │  │  │  Slack             │  │  Microsoft Teams   │     │     │    │
 │  │  │  │  [Connect]         │  │  [Connect]         │     │     │    │
 │  │  │  └────────────────────┘  └────────────────────┘     │     │    │
 │  │  │                                                      │     │    │
 │  │  └──────────────────────────────────────────────────────┘     │    │
 │  │                                                                │    │
 │  │  DESIGN                                                       │    │
 │  │  ┌──────────────────────────────────────────────────────┐     │    │
 │  │  │                                                      │     │    │
 │  │  │  ┌────────────────────┐                              │     │    │
 │  │  │  │  [Figma icon]      │                              │     │    │
 │  │  │  │  Figma             │                              │     │    │
 │  │  │  │  [Connect]         │                              │     │    │
 │  │  │  └────────────────────┘                              │     │    │
 │  │  │                                                      │     │    │
 │  │  └──────────────────────────────────────────────────────┘     │    │
 │  │                                                                │    │
 │  │  ┌────────────────────────────────────────────────────────┐   │    │
 │  │  │                   Continue                             │   │    │
 │  │  └────────────────────────────────────────────────────────┘   │    │
 │  │                                                                │    │
 │  │       Skip for now -->                                        │    │
 │  │                                                                │    │
 │  └────────────────────────────────────────────────────────────────┘    │
 │                                                                        │
 └────────────────────────────────────────────────────────────────────────┘
```

---

## Integration Cards — Detailed Anatomy

```
 DEFAULT STATE:
 ┌────────────────────────────┐
 │                            │
 │  [Icon]  Tool Name         │
 │  Brief description         │
 │                            │
 │  ┌──────────────────────┐ │
 │  │     Connect          │ │
 │  └──────────────────────┘ │
 │                            │
 └────────────────────────────┘

 CONNECTED STATE:
 ┌────────────────────────────┐
 │                            │    green border
 │  [Icon]  Tool Name    ✓   │    green checkmark
 │  Connected as @team       │
 │                            │
 │  [Disconnect]             │    muted text link
 │                            │
 └────────────────────────────┘

 COMING SOON STATE:
 ┌────────────────────────────┐
 │                            │    50% opacity
 │  [Icon]  Tool Name         │
 │  Coming Q3 2026           │    yellow badge
 │                            │
 │  [Notify me]              │    ghost button
 │                            │
 └────────────────────────────┘
```

---

## Available Integrations (Full List)

```
 ┌──────────────────────────────────────────────────────────────────────────────────┐
 │                                                                                  │
 │  CATEGORY            TOOL               STATUS        WHAT ATLAS GETS           │
 │  ──────────────────  ─────────────────  ───────────  ──────────────────────── │
 │                                                                                  │
 │  Project Mgmt        Jira               Available     Tickets, story points,    │
 │                                                        sprint data, labels      │
 │                      Linear             Available     Issues, cycles, projects  │
 │                      Asana              Coming Q4     Tasks, sections, timeline │
 │                                                                                  │
 │  Communication       Slack              Available     Channel summaries,        │
 │                                                        standup reports          │
 │                      Microsoft Teams    Coming Q3     Meeting notes, channels   │
 │                                                                                  │
 │  Design              Figma              Pro plan+     Component count, page     │
 │                                                        complexity, handoff data │
 │                                                                                  │
 │  CRM                 Salesforce         Business+     Revenue data, deal stages │
 │                      HubSpot            Business+     Pipeline data, contacts   │
 │                                                                                  │
 │  Observability       Datadog            Business+     Incident counts, metrics  │
 │                      PagerDuty          Business+     On-call schedules, alerts │
 │                                                                                  │
 │  Revenue Intel       Gong               Enterprise    Call insights, objections │
 │                                                                                  │
 │  Support             Zendesk            Business+     Ticket volume, categories │
 │                      Intercom           Business+     Conversation data         │
 │                                                                                  │
 └──────────────────────────────────────────────────────────────────────────────────┘
```

---

## How Integrations Power the Full Product Ecosystem

Each integration doesn't just improve ATLAS — it unlocks capabilities across all 6 Voatomy products:

```
 ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
 │                                                                                                  │
 │  INTEGRATION              ATLAS            LOOP             SIGNAL           DRIFT    PHANTOM   │
 │  ────────────────────    ──────────────── ────────────────  ──────────────  ────────  ────────  │
 │                                                                                                  │
 │  GitHub / GitLab          Code complexity   —               —               Code     Tech debt │
 │                           analysis                                          sync     scanning  │
 │                                                                                                  │
 │  Jira / Linear            Sprint history,   Revenue-weighted  —             —        Debt →    │
 │                           velocity          backlog                                  tickets   │
 │                                                                                                  │
 │  ClickUp                  Board structure,  Revenue-weighted  —             —        Debt →    │
 │                           sprint cycles     backlog                                  tickets   │
 │                                                                                                  │
 │  Figma                    Design scope      —               —               Design   —         │
 │                           estimation                                        drift              │
 │                                                                             monitor            │
 │                                                                                                  │
 │  Salesforce / HubSpot     Business          Revenue signals,  Revenue      —        Debt →    │
 │                           priority          deal tracking     impact                 revenue   │
 │                                                                                                  │
 │  Datadog / PagerDuty      On-call           —               Incident       —        Incident  │
 │                           capacity                           intelligence            → debt    │
 │                                                                                                  │
 │  Slack / Teams            Team context      Ship-to-sell     Alert routing  —        —         │
 │                                             briefs                                              │
 │                                                                                                  │
 │  Gong / Chorus            Customer          Sales call       —              —        —         │
 │                           demand            analysis                                            │
 │                                                                                                  │
 │  Zendesk / Intercom       Support-driven    Feedback loop    Customer       —        —         │
 │                           priorities                         impact                             │
 │                                                                                                  │
 └──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### What Users See After Connecting

When a user connects an integration, show which products benefit:

```
 ┌──────────────────────────────────────────────────────────────────┐
 │                                                                  │
 │  ✓ Connected to GitHub                                          │
 │                                                                  │
 │  This unlocks:                                                  │
 │  ⚡ ATLAS — Code complexity analysis for sprint planning         │
 │  🔮 PHANTOM — Tech debt scanning with dollar impact              │
 │  🎨 DRIFT — Design-to-code sync monitoring (if Figma connected) │
 │                                                                  │
 └──────────────────────────────────────────────────────────────────┘
```

---

## ATLAS Sprint Operations (Post-Plan Automation)

With the right integrations and explicit user consent, ATLAS can move beyond “planning once”:
- Ticket commenting: annotate planned tickets with confidence and risk summaries.
- Sprint close detection: detect sprint end and generate a sprint report.
- Reminders: post plan-ready notifications and close-ready checklists.
- Board learning: learn workflow stages and fields before planning for higher confidence.

See: `docs/onboarding/14-atlas-advanced-planning.md`

See `11-product-ecosystem.md` for the complete product-integration mapping and progressive disclosure strategy.

---

## Accessibility

| Element | Requirement |
|---------|-------------|
| Integration cards | `role="button"` + `aria-label="Connect {tool}"` |
| Connected checkmark | `aria-label="{tool} connected"` |
| Coming soon badge | `aria-label="{tool} coming {date}"` |
| Notify me button | `aria-label="Get notified when {tool} is available"` |
| Category headings | `role="heading"` level 3 |
| Product benefit list | `role="list"` with descriptive items |
