# Startup Idea Templates in Onboarding (MEGA_STARTUP_IDEAS)

> How Step 1 (Welcome) uses the six ideas from `MEGA_STARTUP_IDEAS.md` to personalize onboarding, integration guidance, and first-value experiences.

---

## Purpose

Instead of treating all new users the same, onboarding now asks:

**"Which startup idea are you building first?"**

This lets Voatomy adapt:

- integration recommendations
- onboarding copy and examples
- first sprint/sample plan content
- product teasers and activation nudges

---

## The 6 Templates (from `MEGA_STARTUP_IDEAS.md`)

| Template | Idea | Best fit | Onboarding emphasis |
|---|---|---|---|
| `NEXUS` | AI Organizational Nerve Center | Founders, CTOs, platform leaders, enterprise transformation | Multi-team setup, broad integrations, cross-functional workflow mapping |
| `SIGNAL` | Revenue-Aware Incident Intelligence | SRE/DevOps, reliability teams, support leaders | Observability + CRM + comms integrations, incident impact examples |
| `LOOP` | Product-Revenue Feedback Engine | PMs, product ops, revenue ops, GTM leaders | CRM + support + call transcripts + backlog tools |
| `DRIFT` | AI Design System Guardian + Revenue Optimizer | Design systems, frontend teams, design ops | Figma + code repo + analytics integrations, design-code sync examples |
| `ATLAS` | AI Sprint Planner | Engineering managers, tech leads, PMs | Repos + Jira/Linear + capacity planning, first sprint plan generation |
| `PHANTOM` | AI Technical Debt Radar | Eng leadership, staff engineers, platform teams | Repo analysis, debt hotspots, cost/risk scoring examples |

---

## Where It Lives in Onboarding

### Step 1 — Welcome (`/onboard`)

The template selector appears in the Welcome form after basic workspace identity fields and before advanced setup toggles.

It is:

- required
- persisted in onboarding form state
- used to tailor downstream steps

---

## How Each Template Changes Onboarding Behavior

### 1. NEXUS

- Suggests enabling **multiple teams** and **multiple projects**
- Promotes broad integrations early (code, PM, CRM, support, observability, comms)
- Uses cross-functional sample workflows in first-plan previews

### 2. SIGNAL

- Prioritizes integrations: `Datadog`, `PagerDuty`, `CloudWatch`, `Salesforce/HubSpot`, `Slack/Teams`
- Uses incident + revenue impact examples in onboarding copy
- Highlights alert correlation and business impact routing in plan output teasers

### 3. LOOP

- Prioritizes integrations: `Jira/Linear`, `Salesforce/HubSpot`, `Gong/Chorus`, `Zendesk/Intercom`
- Uses revenue-weighted backlog examples
- Surfaces GTM + product alignment tips during setup

### 4. DRIFT

- Prioritizes integrations: `Figma`, `GitHub/GitLab`, `Amplitude/Mixpanel/PostHog` (when available)
- Uses design-code sync and drift remediation examples
- Highlights design system governance and UX optimization metrics

### 5. ATLAS

- Prioritizes integrations: `GitHub/GitLab`, `Jira/Linear`, optionally `Figma`
- Default/fallback onboarding path for engineering planning
- Fastest time-to-value path: generate first AI sprint plan

### 6. PHANTOM

- Prioritizes repo connection and code analysis
- Uses tech debt hotspot examples and refactor ROI framing
- Encourages engineering-leadership views and long-lived projects/services

---

## UI Spec (Welcome Step)

Each template card includes:

- template code (`ATLAS`, `LOOP`, etc.)
- short title (e.g. "AI Sprint Planner")
- concise summary
- onboarding hint (e.g. "Best for SRE/DevOps")

### Validation

- Must select exactly one template before proceeding

### Responsive

- Desktop: 2-column card grid
- Mobile: single-column list

---

## Data Model

Onboarding form state stores:

- `startupIdeaTemplate` (string enum)

Allowed values:

- `nexus`
- `signal`
- `loop`
- `drift`
- `atlas`
- `phantom`

---

## Notes

- This template selection is not a permanent product lock-in.
- Users can switch focus later (e.g., start with `ATLAS`, expand into `LOOP` + `PHANTOM`, then activate `NEXUS` workflows).
- The selector exists to improve onboarding relevance and reduce setup friction.

