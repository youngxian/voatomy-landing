# Voatomy landing — page routes

All routes below are organized by category. Routes marked **[LIVE]** have a `page.tsx` in `src/app/`. Routes marked **[MISSING]** need to be created.

---

## Home & marketing core

| Path | Status | File / Priority |
|------|--------|-----------------|
| `/` | **[LIVE]** | `(marketing)/page.tsx` |
| `/demo` | **[LIVE]** | `demo/page.tsx` |
| `/pricing` | **[LIVE]** | `(marketing)/pricing/page.tsx` |
| `/pricing/checkout` | **[LIVE]** | `(marketing)/pricing/checkout/page.tsx` |
| `/about` | **[LIVE]** | `(marketing)/about/page.tsx` |
| `/contact` | **[LIVE]** | `(marketing)/contact/page.tsx` |
| `/careers` | **[LIVE]** | `(marketing)/careers/page.tsx` |
| `/press` | **[LIVE]** | `(marketing)/press/page.tsx` |
| `/blog` | **[LIVE]** | `(marketing)/blog/page.tsx` |
| `/docs` | **[LIVE]** | `(marketing)/docs/page.tsx` |
| `/changelog` | **[LIVE]** | `(marketing)/changelog/page.tsx` |
| `/status` | **[LIVE]** | `(marketing)/status/page.tsx` |
| `/security` | **[LIVE]** | `(marketing)/security/page.tsx` |
| `/integrations` | **[LIVE]** | `(marketing)/integrations/page.tsx` |
| `/privacy` | **[MISSING]** | P0 — legally required (GDPR/CCPA) |
| `/terms` | **[MISSING]** | P0 — legally required before signups |
| `/cookies` | **[MISSING]** | P1 — required under ePrivacy/GDPR |
| `/roadmap` | **[MISSING]** | P2 — public product roadmap |

---

## Product pages

| Path | Status | File / Priority |
|------|--------|-----------------|
| `/products/atlas` | **[LIVE]** | `(marketing)/products/atlas/page.tsx` |
| `/products/loop` | **[LIVE]** | `(marketing)/products/loop/page.tsx` |
| `/products/signal` | **[LIVE]** | `(marketing)/products/signal/page.tsx` |
| `/products/drift` | **[LIVE]** | `(marketing)/products/drift/page.tsx` |
| `/products/phantom` | **[LIVE]** | `(marketing)/products/phantom/page.tsx` |
| `/products/nexus` | **[LIVE]** | `(marketing)/products/nexus/page.tsx` |
| `/products/atlas/demo` | **[MISSING]** | P0 — interactive demo / video walkthrough |
| `/products/loop/demo` | **[MISSING]** | P1 — product-specific demo |
| `/products/signal/demo` | **[MISSING]** | P1 — product-specific demo |
| `/products/drift/demo` | **[MISSING]** | P1 — product-specific demo |
| `/products/phantom/demo` | **[MISSING]** | P1 — product-specific demo |
| `/products/nexus/demo` | **[MISSING]** | P1 — product-specific demo |

---

## Solutions (persona / role)

| Path | Status | File / Priority |
|------|--------|-----------------|
| `/solutions/engineering-managers` | **[LIVE]** | `(marketing)/solutions/engineering-managers/page.tsx` |
| `/solutions/product-leaders` | **[LIVE]** | `(marketing)/solutions/product-leaders/page.tsx` |
| `/solutions/sre-devops` | **[LIVE]** | `(marketing)/solutions/sre-devops/page.tsx` |
| `/solutions/design-teams` | **[LIVE]** | `(marketing)/solutions/design-teams/page.tsx` |
| `/solutions/cto-vp-engineering` | **[MISSING]** | P1 — primary buyer for ATLAS, PHANTOM, NEXUS |
| `/solutions/sales-leaders` | **[MISSING]** | P1 — primary buyer for LOOP, SIGNAL |
| `/solutions/customer-success` | **[MISSING]** | P2 — key persona for SIGNAL, LOOP |

---

## Use cases

| Path | Status | File / Priority |
|------|--------|-----------------|
| `/use-cases/sprint-planning` | **[LIVE]** | `(marketing)/use-cases/sprint-planning/page.tsx` |
| `/use-cases/feedback-roadmap` | **[LIVE]** | `(marketing)/use-cases/feedback-roadmap/page.tsx` |
| `/use-cases/cross-team` | **[LIVE]** | `(marketing)/use-cases/cross-team/page.tsx` |
| `/use-cases/revenue-intelligence` | **[LIVE]** | `(marketing)/use-cases/revenue-intelligence/page.tsx` |
| `/use-cases/incident-intelligence` | **[MISSING]** | P1 — SIGNAL core use case |
| `/use-cases/design-system-health` | **[MISSING]** | P1 — DRIFT core use case |
| `/use-cases/tech-debt-management` | **[MISSING]** | P1 — PHANTOM core use case |

---

## Content (dynamic routes)

| Path | Status | File / Priority |
|------|--------|-----------------|
| `/blog/[slug]` | **[MISSING]** | P1 — individual blog posts |
| `/docs/[category]/[slug]` | **[MISSING]** | P1 — individual documentation pages |
| `/integrations/[slug]` | **[MISSING]** | P2 — per-integration setup guide (Jira, GitHub, Figma, etc.) |

---

## Customers & social proof

| Path | Status | File / Priority |
|------|--------|-----------------|
| `/customers` | **[MISSING]** | P2 — case studies index |
| `/customers/[slug]` | **[MISSING]** | P2 — individual case study |

---

## Industries

| Path | Status | File / Priority |
|------|--------|-----------------|
| `/industries` | **[MISSING]** | P1 — index page with all verticals |
| `/industries/ai-infrastructure` | **[MISSING]** | P1 — Phase 1 vertical |
| `/industries/financial-services` | **[MISSING]** | P1 — Phase 1 vertical |
| `/industries/retail` | **[MISSING]** | P1 — Phase 1 vertical |
| `/industries/insurance` | **[MISSING]** | P1 — Phase 1 vertical |

---

## Competitor comparison pages

| Path | Status | File / Priority |
|------|--------|-----------------|
| `/compare/[competitor]` | **[MISSING]** | P2 — SEO + sales enablement (e.g. `/compare/jellyfish`, `/compare/productboard`, `/compare/pagerduty`, `/compare/sonarqube`) |

---

## Authentication & account

| Path | Status | File / Priority |
|------|--------|-----------------|
| `/auth/login` | **[LIVE]** | `auth/login/page.tsx` |
| `/auth/signup` | **[LIVE]** | `auth/signup/page.tsx` |
| `/auth/expired` | **[LIVE]** | `auth/expired/page.tsx` |
| `/auth/payment-success` | **[LIVE]** | `auth/payment-success/page.tsx` |
| `/auth/sso/complete` | **[LIVE]** | `auth/sso/complete/page.tsx` |
| `/auth/verify/[token]` | **[LIVE]** | `auth/verify/[token]/page.tsx` (dynamic) |
| `/auth/reset-password/[token]` | **[LIVE]** | `auth/reset-password/[token]/page.tsx` (dynamic) |
| `/auth/forgot-password` | **[MISSING]** | P0 — "enter your email" reset request page |

---

## Onboarding & invites

| Path | Status | File / Priority |
|------|--------|-----------------|
| `/onboard` | **[LIVE]** | `onboard/page.tsx` |
| `/invite/[token]` | **[LIVE]** | `invite/[token]/page.tsx` (dynamic) |
| `/onboarding/callback/[provider]` | **[LIVE]** | `onboarding/callback/[provider]/page.tsx` (dynamic) |

---

## Settings (post-auth)

| Path | Status | File / Priority |
|------|--------|-----------------|
| `/settings/sso` | **[LIVE]** | `settings/sso/page.tsx` |

---

## Summary

| Category | Live | Missing | Total |
|----------|------|---------|-------|
| Marketing core | 14 | 4 | 18 |
| Products | 6 | 6 | 12 |
| Solutions | 4 | 3 | 7 |
| Use cases | 4 | 3 | 7 |
| Content (dynamic) | 0 | 3 | 3 |
| Customers | 0 | 2 | 2 |
| Industries | 0 | 5 | 5 |
| Comparison | 0 | 1 | 1 |
| Auth | 7 | 1 | 8 |
| Onboarding | 3 | 0 | 3 |
| Settings | 1 | 0 | 1 |
| **Totals** | **39** | **28** | **67** |

---

## Non-page routes (reference)

| Path / behavior | Source |
|-----------------|--------|
| `robots.txt` | `src/app/robots.ts` |
| `sitemap.xml` | `src/app/sitemap.ts` |
| Web app manifest | `src/app/manifest.ts` |
| Default Open Graph image | `src/app/opengraph-image.tsx` |

---

## Sitemap note

`src/app/sitemap.ts` currently indexes only public marketing URLs. When missing pages are created, add them to the sitemap as well — especially `/privacy`, `/terms`, `/roadmap`, `/customers`, the three new solutions, the three new use cases, and the `/compare/*` pages.
