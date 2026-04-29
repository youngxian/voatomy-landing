# Voatomy: Pages by Product Module

This document lists the key pages/screens needed to deliver each Voatomy product module.

## Startup Idea Template Pages (Unified Onboarding + Template Activation)
These pages are used to onboard users into one of the six startup idea tracks from `MEGA_STARTUP_IDEAS.md` (`NEXUS`, `SIGNAL`, `LOOP`, `DRIFT`, `ATLAS`, `PHANTOM`) and tailor the workspace accordingly. This is the **single, unified onboarding** for all Voatomy products — `loop-app` and `atlas-app` no longer have separate onboarding flows.

- `/onboard` (Unified onboarding entry — Step 1 includes startup idea template selection)
- `/onboard?step=welcome` (Workspace basics + idea template choice)
- `/onboard?step=connect` (Repo/data/integration connect, personalized by selected idea)
- `/onboard?step=repos` (Select repos/sources to analyze)
- `/onboard?step=team` (Invite team members + set roles)
- `/onboard?step=plan` (First AI sprint plan / signal analysis / product-specific first-value moment)
- `/templates` (Template gallery for all six startup idea tracks)
- `/templates/:templateKey` (Template detail page: use cases, recommended integrations, starter graph)
- `/projects/:projectId/template-profile` (Active idea profile, assumptions, and applied defaults)
- `/projects/:projectId/template-profile/edit` (Change or refine idea template after onboarding)

## 1) Voatomy Blueprint
- `/projects` (Project list)
- `/projects/new` (Create project)
- `/projects/:projectId/overview` (Project home: status, highlights, risks)
- `/projects/:projectId/blueprint` (Blueprint hub)
- `/projects/:projectId/blueprint/product-map` (Feature/capability map)
- `/projects/:projectId/blueprint/journeys` (User journeys hub)
- `/projects/:projectId/blueprint/journeys/:journeyId` (Journey details: states, edge cases)
- `/projects/:projectId/blueprint/data-model` (Entities, relationships, lifecycle)
- `/projects/:projectId/blueprint/api-contracts` (APIs hub)
- `/projects/:projectId/blueprint/api-contracts/:contractId` (Contract detail: schemas, errors)
- `/projects/:projectId/blueprint/event-taxonomy` (Analytics events + conventions)
- `/projects/:projectId/blueprint/edge-cases` (Edge case registry)
- `/projects/:projectId/blueprint/definition-of-done` (DoD checklists per feature)

## 2) Multi-Agent Team
- `/projects/:projectId/agents` (Agent roster + status)
- `/projects/:projectId/agents/:agentId` (Agent profile: goals, permissions, output history)
- `/projects/:projectId/collaboration/decisions` (Open decisions and conflicts)
- `/projects/:projectId/collaboration/decisions/:decisionId` (Decision detail: options, votes, rationale)
- `/projects/:projectId/memory` (Shared project memory browser)
- `/projects/:projectId/memory/activity` (Change log across agents)

## 3) Execution Graph
- `/projects/:projectId/execution` (Execution hub)
- `/projects/:projectId/execution/graph` (Task dependency graph)
- `/projects/:projectId/execution/board` (Kanban view)
- `/projects/:projectId/execution/backlog` (Atomic tasks list)
- `/projects/:projectId/execution/milestones` (Milestones timeline)
- `/projects/:projectId/execution/tasks/:taskId` (Task detail: gates, owner, artifacts)
- `/projects/:projectId/execution/risk-register` (Risks, severity, mitigation)
- `/projects/:projectId/execution/releases` (Release train: planned and shipped)

## 4) Code-Aware Planner
- `/projects/:projectId/repos` (Connected repos)
- `/projects/:projectId/repos/connect` (Connect repo + access settings)
- `/projects/:projectId/repos/:repoId/ingestion` (Ingestion status + index coverage)
- `/projects/:projectId/repos/:repoId/architecture` (As-is architecture map)
- `/projects/:projectId/repos/:repoId/target-architecture` (Target architecture plan)
- `/projects/:projectId/repos/:repoId/debt` (Tech debt hotspots + prioritization)
- `/projects/:projectId/repos/:repoId/migrations` (Migration workstreams)
- `/projects/:projectId/repos/:repoId/change-risk` (Risk scoring by component)

## 5) Security-by-Default
- `/projects/:projectId/security` (Security hub)
- `/projects/:projectId/security/threat-models` (Threat model list)
- `/projects/:projectId/security/threat-models/:modelId` (Threat model detail: STRIDE-like flows)
- `/projects/:projectId/security/policies` (AuthN/AuthZ policy templates)
- `/projects/:projectId/security/abuse-simulations` (Abuse-case scenarios)
- `/projects/:projectId/security/compliance` (Compliance hub)
- `/projects/:projectId/security/compliance/soc2-starter` (SOC2 baseline controls + evidence checklist)
- `/projects/:projectId/security/compliance/gdpr-starter` (GDPR baseline controls + evidence checklist)

## 6) Test Intelligence
- `/projects/:projectId/quality` (Quality hub)
- `/projects/:projectId/quality/test-plans` (Test plans by feature)
- `/projects/:projectId/quality/test-plans/:planId` (Plan detail: unit/integration/e2e/acceptance)
- `/projects/:projectId/quality/acceptance` (Acceptance criteria library)
- `/projects/:projectId/quality/coverage` (Coverage gaps + risk-based priority)
- `/projects/:projectId/quality/regressions` (Regression history + learnings)

## 7) Prompt Compiler
- `/projects/:projectId/prompts` (Prompt hub)
- `/projects/:projectId/prompts/new` (Create prompt bundle from task/spec)
- `/projects/:projectId/prompts/bundles/:bundleId` (Bundle detail + versioning)
- `/projects/:projectId/prompts/bundles/:bundleId/export` (Export for Cursor/Claude/Copilot, etc.)

## 8) MCP Mission Control
- `/projects/:projectId/mcp` (MCP hub)
- `/projects/:projectId/mcp/connectors` (Connector list)
- `/projects/:projectId/mcp/connectors/new` (Add connector)
- `/projects/:projectId/mcp/permissions` (Scoped permissions by agent/tool)
- `/projects/:projectId/mcp/audit-log` (Action log: who/what/when/why)

## 9) Live Spec Sync
- `/projects/:projectId/sync` (Sync hub)
- `/projects/:projectId/sync/status` (Current sync status)
- `/projects/:projectId/sync/diffs` (Spec/code diffs)
- `/projects/:projectId/sync/diffs/:diffId` (Diff detail: mapping to requirements)
- `/projects/:projectId/sync/drift` (Detected drift + recommended fixes)

## 10) Launch Cockpit
- `/projects/:projectId/launch` (Launch hub)
- `/projects/:projectId/launch/checklists` (Release checklist library)
- `/projects/:projectId/launch/releases/:releaseId` (Release detail: go/no-go, checklist, sign-offs)
- `/projects/:projectId/launch/rollback` (Rollback/roll-forward plans)
- `/projects/:projectId/launch/monitoring` (Monitoring dashboard setup guidance)
- `/projects/:projectId/launch/incidents` (Incidents hub)
- `/projects/:projectId/launch/incidents/runbooks` (Runbooks library)
- `/projects/:projectId/launch/incidents/:incidentId` (Incident timeline + actions)

## 11) Growth Loops
- `/projects/:projectId/growth` (Growth hub)
- `/projects/:projectId/growth/experiments` (Experiment backlog)
- `/projects/:projectId/growth/experiments/:experimentId` (Experiment detail: hypothesis, metrics, rollout)
- `/projects/:projectId/growth/funnel` (Funnel definitions + leakage)
- `/projects/:projectId/growth/instrumentation` (Event tracking plan + QA)
- `/projects/:projectId/growth/pricing` (Pricing/packaging tests)
- `/projects/:projectId/growth/reviews/weekly` (Weekly growth review pack)

## 12) Investor Mode
- `/projects/:projectId/investor` (Investor hub)
- `/projects/:projectId/investor/narrative` (Pitch narrative builder)
- `/projects/:projectId/investor/kpis` (KPI story builder)
- `/projects/:projectId/investor/roadmap-confidence` (Roadmap confidence report)
- `/projects/:projectId/investor/execution-credibility` (Execution credibility report)

## Cross-Cutting (Required)
- `/auth/sign-in` (Sign in)
- `/auth/sign-out` (Sign out)
- `/settings` (User settings)
- `/settings/billing` (Billing and plan)
- `/settings/organization` (Org, team, roles)
- `/settings/integrations` (Integrations overview)
- `/help` (Help and docs)
- `/status` (System status)
