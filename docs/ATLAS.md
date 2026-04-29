# ATLAS — AI Sprint Planner
## by Voatomy Labs

> **"Sprint planning that actually understands your code."**

---

## Overview

ATLAS is Voatomy's flagship product — an AI-powered sprint planning engine that replaces gut-feel estimation with data-driven intelligence. It analyzes six dimensions of complexity to generate sprint plans your team can trust.

**Status:** Available now
**Product Color:** #f16e2c (Orange)
**Target Users:** Engineering Managers · Tech Leads · Product Managers
**Entry Point:** [voatomy.global/products/atlas](/products/atlas)

---

## Core Capabilities

### 1. AI Sprint Composition
Generate complete sprint plans with ticket-level estimates powered by code complexity analysis, team capacity modeling, and business priority scoring.

### 2. Six-Signal Analysis
Every estimate is informed by six data dimensions:
- **Code Complexity** — Cyclomatic complexity, dependency depth, file coupling
- **Team Capacity** — PTO, on-call schedules, skill-task matching, velocity trends
- **Customer Demand** — Support tickets, sales objections, churn signals, NPS correlation
- **Tech Debt Awareness** — Debt hotspot mapping, debt-to-velocity ratio, refactor ROI
- **Design Scope** — Figma component complexity, responsive variants, new vs existing patterns
- **Business Priority** — Revenue impact, pipeline urgency, deal scoring

### 3. Accuracy Tracking
Track estimation accuracy across sprints with continuous learning: 82% → 85% → 87%. ATLAS improves with every sprint cycle.

### 4. Sprint Burndown & Velocity
Real-time burndown charts, velocity trending, and delivery prediction dashboards.

---

## Integrations

| Tool | Type | Description |
|------|------|-------------|
| GitHub | Code | Repository analysis, PR tracking, complexity scanning |
| GitLab | Code | Repository analysis, merge request tracking |
| Jira | Project | Sprint sync, ticket import, board integration |
| Linear | Project | Cycle sync, issue import |
| Figma | Design | Design scope estimation, component analysis |
| Slack | Comms | Sprint notifications, daily standups |

---

## Pricing

| Tier | Price | Includes |
|------|-------|----------|
| Free | $0/mo | 1 team (8 members), 1 repo, 2 AI plans/month |
| Pro | $14/user/mo | Unlimited teams, repos, AI plans, Figma integration |
| Business | $28/user/mo | Cross-team dependencies, CRM integration, revenue-weighted backlog |
| Enterprise | Custom | SSO/SAML, RBAC, audit logs, dedicated support |

---

## Pages & Routes

| Page | Route | Description |
|------|-------|-------------|
| Landing Page | `/products/atlas` | Product overview, features, pricing preview |
| Dashboard | `atlas-app/` | Main sprint planning dashboard |
| Sprint Planning | `atlas-app/sprint` | Active sprint management |
| Burndown | `atlas-app/sprint/burndown` | Sprint burndown chart |
| Planning Notes | `atlas-app/sprint/planning-notes` | Meeting minutes |
| Standups | `atlas-app/standups` | Daily standup tracker |
| Analytics | `atlas-app/analytics` | Team performance analytics |
| AI Chat | `atlas-app/chat` | ATLAS AI assistant |
| Team | `atlas-app/team` | Team directory |
| Settings | `atlas-app/settings` | Configuration |

---

## Technical Stack

- **Frontend:** Next.js 16, React 19, Tailwind CSS 4
- **Theme:** Light Voatomy theme (#FAFAF8 bg, #5A9E8F accent)
- **Typography:** Playfair Display (headings) + Inter (body)
- **State:** React hooks, client-side mock data
- **App Directory:** `atlas-app/`

---

## Key Metrics

| Metric | Target |
|--------|--------|
| Sprint estimation accuracy | > 85% within 3 sprints |
| Planning time reduction | From 2 hours to 20 minutes |
| Delivery prediction confidence | > 80% P50 |
| User adoption rate | > 60% of engineering teams |

---

## Security

- Never stores source code — read-only API access
- Retains only structural metadata (file size, complexity scores, dependency maps)
- TLS 1.3 in transit, AES-256 at rest
- SOC 2 compliance ready
- Tenant isolation via PostgreSQL RLS

---

*Last updated: February 2026*
*Maintained by: Voatomy Labs*
