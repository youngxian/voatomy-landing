# LOOP — Revenue Feedback Engine
## by Voatomy Labs

> **"Close the loop between customer demand and engineering delivery."**

---

## Overview

LOOP is Voatomy's revenue feedback engine — connecting customer signals (sales calls, support tickets, churn indicators) directly to engineering prioritization. It creates a closed loop where every feature ship automatically generates sales enablement, marketing copy, and CS talking points.

**Status:** Coming Q3 2026
**Product Color:** #6366F1 (Indigo)
**Target Users:** Product Managers · Sales · Marketing · Customer Success
**Entry Point:** [voatomy.global/products/loop](/products/loop)

---

## Core Capabilities

### 1. Inbound Intelligence
Automatically extract and aggregate customer signals from multiple sources:
- **Gong Call Analysis** — AI extracts feature requests, objections, and competitive mentions from sales calls
- **Support Ticket Mining** — Classify and quantify support demand by feature area
- **Churn Signal Detection** — Identify at-risk accounts and correlate with feature gaps
- **Revenue-Weighted Backlog** — Every feature request carries a dollar value attached

### 2. Outbound Intelligence
When features ship, LOOP auto-generates go-to-market materials:
- **Sales Enablement** — One-pagers, battle cards, talk tracks per feature ship
- **Marketing Copy** — Release announcements, blog drafts, social posts
- **CS Talking Points** — Account-specific impact summaries for customer success
- **Deal Risk Alerts** — Notify sales when at-risk deal features ship

### 3. Revenue Attribution
Track the full revenue journey from signal to ship:
- Pipeline blocked by feature → Feature shipped → Revenue influenced
- Attribution per feature: $2.3M pipeline → $1.42M influenced post-ship

### 4. Cross-Team Alignment
Bridge the gap between product, engineering, sales, marketing, and CS with shared context and automatic handoffs.

---

## Integrations

| Tool | Type | Description |
|------|------|-------------|
| Gong | Revenue | Call transcripts, feature mentions, competitive intelligence |
| Salesforce | CRM | Deal pipeline, account health, revenue data |
| HubSpot | CRM | Contact management, deal tracking |
| Zendesk | Support | Ticket analysis, customer demand signals |
| Slack | Comms | Signal alerts, ship notifications, team updates |
| Intercom | Support | Chat analysis, feature request extraction |

---

## Pricing

| Tier | Price | Notes |
|------|-------|-------|
| Add-on | $39/user/mo | Available as standalone add-on |
| Included in Business | $59/user/mo | Bundled with Business tier |
| Included in Enterprise | Custom | Full access in Enterprise/NEXUS |

---

## Pages & Routes

| Page | Route | Description |
|------|-------|-------------|
| Landing Page | `/products/loop` | Product overview, features, waitlist |
| Dashboard | `loop-app/` | Main LOOP dashboard |
| Signals | `loop-app/signals` | Inbound signal management |
| Features | `loop-app/features` | Feature-revenue mapping |
| Accounts | `loop-app/accounts` | Account health and signals |
| Ships | `loop-app/ships` | Feature ship tracking |
| Enablement | `loop-app/enablement` | Generated sales materials |
| Analytics | `loop-app/analytics` | Revenue intelligence analytics |

---

## Technical Stack

- **Frontend:** Next.js 16, React 19, Tailwind CSS 4
- **Theme:** Light theme with #C75C63 rose accent
- **App Directory:** `loop-app/`
- **Pages:** 21 routes (fully built)

---

## Key Metrics

| Metric | Target |
|--------|--------|
| Signal-to-ship cycle time | < 2 sprints |
| Revenue attribution accuracy | > 75% |
| Sales enablement generation time | < 24 hours from ship |
| Cross-team alignment score | > 80% satisfaction |

---

*Last updated: February 2026*
*Maintained by: Voatomy Labs*
