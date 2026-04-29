"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useOnboarding } from "../onboarding-context";
import { INTEGRATION_CATALOG, PRODUCT_CARDS } from "@/lib/constants";
import {
  initiateOAuthConnect,
  connectWithAPIKey,
  disconnectIntegration,
  openOAuthPopup,
  fetchBoardProjects,
  APIError,
} from "@/lib/api";
import { useSubscriptionProducts } from "@/hooks/use-subscription-products";
import type { IntegrationKey, ConnectedIntegration, AuthMethod, ProductKey, BoardProject } from "@/types";

type CatalogEntry = (typeof INTEGRATION_CATALOG)[number];

export function ConnectStep() {
  const { goNext, goBack, updateFormData, formData, markStepComplete, markStepSkipped, saveStep, skipStepOnServer } = useOnboarding();
  const { products: subscribedProducts, loading: productsLoading } = useSubscriptionProducts();
  const [connected, setConnected] = React.useState<ConnectedIntegration[]>(formData.connectedIntegrations);
  const [connecting, setConnecting] = React.useState<IntegrationKey | null>(null);
  const [activeCategory, setActiveCategory] = React.useState<string>("all");
  const [error, setError] = React.useState<string | null>(null);

  // API key form state — open for a specific provider
  const [apiKeyTarget, setApiKeyTarget] = React.useState<CatalogEntry | null>(null);
  const [apiKeyValues, setApiKeyValues] = React.useState<Record<string, string>>({});
  const [apiKeyError, setApiKeyError] = React.useState<string | null>(null);

  // Board project picker state
  const [boardProjects, setBoardProjects] = React.useState<BoardProject[]>([]);
  const [boardProjectsLoading, setBoardProjectsLoading] = React.useState(false);
  const [boardProjectProvider, setBoardProjectProvider] = React.useState<IntegrationKey | null>(null);
  const [showBoardPicker, setShowBoardPicker] = React.useState(false);
  const [selectedBoardProject, setSelectedBoardProject] = React.useState<BoardProject | null>(formData.selectedBoardProject);

  const relevantIntegrations = React.useMemo(() => {
    if (productsLoading || subscribedProducts.length === 0) return INTEGRATION_CATALOG;
    return INTEGRATION_CATALOG.filter((integ) =>
      integ.products.some((p) => subscribedProducts.includes(p as ProductKey)),
    );
  }, [subscribedProducts, productsLoading]);

  const categories = React.useMemo(() => {
    const cats = new Set(relevantIntegrations.map((i) => i.category));
    return ["all", ...Array.from(cats)];
  }, [relevantIntegrations]);

  const filteredIntegrations = activeCategory === "all"
    ? relevantIntegrations
    : relevantIntegrations.filter((i) => i.category === activeCategory);

  const isConnected = (key: IntegrationKey) => connected.some((c) => c.key === key);

  // Role-based board sorting and recommendation
  const sortedBoardProjects = React.useMemo(() => {
    const role = formData.userRole as string;
    if (!role || boardProjects.length <= 1) return boardProjects;

    const engRoles = ["engineering-manager", "tech-lead", "engineer", "devops-sre", "qa-engineer", "data-engineer"];
    const productRoles = ["product-manager", "designer"];
    const leadershipRoles = ["cto-vp", "founder"];

    const score = (p: BoardProject): number => {
      const name = (p.name || "").toLowerCase();
      const key = (p.key || "").toLowerCase();
      let s = 0;
      if (engRoles.includes(role)) {
        if (p.hasActiveSprint) s += 30;
        if (/\b(sprint|dev|backend|frontend|platform|api)\b/.test(name + key)) s += 20;
        s += Math.min(p.ticketCount / 10, 15);
      } else if (productRoles.includes(role)) {
        if (/\b(backlog|product|roadmap|feature|ux)\b/.test(name + key)) s += 25;
        if (p.hasActiveSprint) s += 15;
      } else if (leadershipRoles.includes(role)) {
        if (p.hasActiveSprint) s += 35;
        s += Math.min(p.ticketCount / 5, 10);
      }
      return s;
    };

    return [...boardProjects].sort((a, b) => score(b) - score(a));
  }, [boardProjects, formData.userRole]);

  const recommendedBoardKeys = React.useMemo(() => {
    if (sortedBoardProjects.length < 2) return new Set<string>();
    const top = sortedBoardProjects.slice(0, 2);
    return new Set(top.map((p) => p.key));
  }, [sortedBoardProjects]);

  // ── OAuth flow ──

  const handleOAuthConnect = async (integ: CatalogEntry) => {
    setConnecting(integ.key);
    setError(null);

    try {
      const callbackUrl = `${window.location.origin}/onboarding/callback/${integ.key}`;
      const { auth_url } = await initiateOAuthConnect(integ.key, callbackUrl);
      const { code: _code, state: _state } = await openOAuthPopup(auth_url);

      const newConnection: ConnectedIntegration = {
        key: integ.key,
        displayName: integ.name,
        connectedAt: new Date().toISOString(),
        authMethod: integ.authMethod as AuthMethod,
      };
      setConnected((prev) => [...prev, newConnection]);

      const boardProviders: IntegrationKey[] = ["jira", "linear", "clickup", "github"];
      if (boardProviders.includes(integ.key)) {
        setBoardProjectsLoading(true);
        try {
          const projects = await fetchBoardProjects(integ.key);
          setBoardProjects(projects);
          setBoardProjectProvider(integ.key);
          setShowBoardPicker(true);
        } catch {
          // Non-blocking — user can still continue without picking a project
        } finally {
          setBoardProjectsLoading(false);
        }
      }
    } catch (err) {
      const msg = err instanceof APIError
        ? err.message
        : err instanceof Error ? err.message : "Connection failed";
      setError(`${integ.name}: ${msg}`);
    } finally {
      setConnecting(null);
    }
  };

  // ── API Key flow ──

  const handleOpenAPIKeyForm = (integ: CatalogEntry) => {
    setApiKeyTarget(integ);
    setApiKeyValues({});
    setApiKeyError(null);
  };

  const handleSubmitAPIKey = async () => {
    if (!apiKeyTarget) return;
    const fields = ("requiredFields" in apiKeyTarget ? apiKeyTarget.requiredFields : undefined) as
      | readonly { key: string; label: string }[]
      | undefined;

    if (fields) {
      const missing = fields.filter((f) => !apiKeyValues[f.key]?.trim());
      if (missing.length > 0) {
        setApiKeyError(`Please fill in: ${missing.map((f) => f.label).join(", ")}`);
        return;
      }
    }

    setConnecting(apiKeyTarget.key);
    setApiKeyError(null);

    try {
      await connectWithAPIKey(apiKeyTarget.key, apiKeyValues);

      const newConnection: ConnectedIntegration = {
        key: apiKeyTarget.key,
        displayName: apiKeyTarget.name,
        connectedAt: new Date().toISOString(),
        authMethod: "api_key",
      };
      setConnected((prev) => [...prev, newConnection]);
      setApiKeyTarget(null);
    } catch (err) {
      const msg = err instanceof APIError ? err.message : "Invalid credentials";
      setApiKeyError(msg);
    } finally {
      setConnecting(null);
    }
  };

  // ── Unified connect entry point ──

  const handleConnect = (integ: CatalogEntry) => {
    if (isConnected(integ.key)) return;

    const method = integ.authMethod;
    if (method === "oauth2" || method === "oauth2_pkce") {
      handleOAuthConnect(integ);
    } else {
      handleOpenAPIKeyForm(integ);
    }
  };

  const handleDisconnect = async (key: IntegrationKey) => {
    try {
      await disconnectIntegration(key);
    } catch {
      // Best-effort — still remove locally so UX doesn't block
    }
    setConnected((prev) => prev.filter((c) => c.key !== key));
  };

  const [isSaving, setIsSaving] = React.useState(false);

  const handleContinue = async () => {
    setIsSaving(true);
    setError(null);
    try {
      await saveStep("connect", {
        connectedIntegrations: connected.map((c) => ({
          key: c.key,
          displayName: c.displayName,
          connectedAt: c.connectedAt,
          authMethod: c.authMethod,
        })),
        selectedBoardProject,
      });
      updateFormData({ connectedIntegrations: connected, selectedBoardProject });
      markStepComplete("connect");
      goNext();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to save step";
      setError(msg);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSkip = async () => {
    try {
      await skipStepOnServer("connect");
    } catch {
      // best-effort
    }
    markStepSkipped("connect");
    goNext();
  };

  const getProductBadges = (products: readonly string[]) => {
    return products
      .filter((p) => subscribedProducts.includes(p as ProductKey))
      .map((p) => PRODUCT_CARDS.find((pc) => pc.key === p))
      .filter(Boolean);
  };

  const authMethodLabel = (method: string) => {
    switch (method) {
      case "oauth2": return "OAuth";
      case "oauth2_pkce": return "OAuth";
      case "api_key": return "API Key";
      default: return "";
    }
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/12">
          <span className="text-2xl">🔗</span>
        </div>
        <h1 className="text-[28px] font-bold tracking-tight text-[#121312]">Connect your tools</h1>
        <p className="mt-1.5 text-sm text-[#121312]/50">
          Connect your project board, Slack or Teams for notifications, and other team apps. We&apos;ll sync data securely.
        </p>
      </motion.div>

      {/* Trust badges */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-5 flex items-center justify-center gap-4 text-[10px] text-[#121312]/40"
      >
        <span className="flex items-center gap-1">🔒 Read-only access</span>
        <span className="flex items-center gap-1">🛡 No source code stored</span>
        <span className="flex items-center gap-1">🔐 Encrypted in transit</span>
      </motion.div>

      {/* Global error banner */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700"
          >
            <div className="flex items-center justify-between">
              <span>{error}</span>
              <button type="button" onClick={() => setError(null)} className="ml-3 text-red-400 hover:text-red-600">
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category tabs */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mb-4 flex gap-1.5 overflow-x-auto scrollbar-none pb-1"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "shrink-0 rounded-lg px-3 py-1.5 text-[11px] font-semibold transition-all duration-200 capitalize",
              activeCategory === cat
                ? "bg-brand/10 text-[#121312]"
                : "bg-transparent text-[#121312]/45 hover:bg-[#121312]/5",
            )}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Connected count */}
      {connected.length > 0 && (
        <div className="mb-4 rounded-xl border border-brand/15 bg-brand/5 p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-[#121312]">
              {connected.length}
            </span>
            <span className="text-xs font-medium text-[#121312]/65">
              {connected.length === 1 ? "tool connected" : "tools connected"}
            </span>
          </div>
          <div className="flex gap-1">
            {connected.map((c) => {
              const integ = INTEGRATION_CATALOG.find((i) => i.key === c.key);
              return (
                <span key={c.key} className="flex h-6 w-6 items-center justify-center rounded-md bg-white border border-[#121312]/10 text-[8px] font-bold text-[#121312]/60">
                  {integ?.icon || "?"}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected board project indicator */}
      {selectedBoardProject && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mb-4 rounded-xl border border-blue-100 bg-blue-50/50 p-3 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 text-[10px]">📋</span>
            <div>
              <span className="text-xs font-medium text-[#121312]/70">
                {selectedBoardProject.provider.charAt(0).toUpperCase() + selectedBoardProject.provider.slice(1)} — {selectedBoardProject.name}
              </span>
              <p className="text-[10px] text-[#121312]/40">
                {selectedBoardProject.ticketCount} tickets{selectedBoardProject.hasActiveSprint ? " · Active sprint" : ""}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setSelectedBoardProject(null);
              updateFormData({ selectedBoardProject: null });
            }}
            className="text-[10px] text-[#121312]/40 hover:text-[#121312]/60"
          >
            ✕
          </button>
        </motion.div>
      )}

      {/* ── Board Project Picker Modal ── */}
      <AnimatePresence>
        {showBoardPicker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) setShowBoardPicker(false); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              className="mx-4 w-full max-w-md rounded-2xl border border-[#121312]/10 bg-white p-6 shadow-2xl"
            >
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-[#121312]">Select your project board</h3>
                <p className="mt-0.5 text-[11px] text-[#121312]/40">
                  Choose the project Atlas will track for sprint planning
                </p>
              </div>

              {boardProjectsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="block h-5 w-5 rounded-full border-2 border-brand/30 border-t-brand"
                  />
                  <span className="ml-2 text-xs text-[#121312]/50">Loading projects…</span>
                </div>
              ) : boardProjects.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-xs text-[#121312]/40">No projects found</p>
                </div>
              ) : (
                <div className="max-h-[300px] overflow-y-auto space-y-1.5">
                  {sortedBoardProjects.map((project) => {
                    const isRecommended = recommendedBoardKeys.has(project.key);
                    return (
                      <button
                      key={project.key}
                      type="button"
                      onClick={() => {
                        setSelectedBoardProject(project);
                        updateFormData({ selectedBoardProject: project });
                        setShowBoardPicker(false);
                      }}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all",
                        selectedBoardProject?.key === project.key
                          ? "border-brand/30 bg-brand/5"
                          : "border-[#121312]/8 hover:border-[#121312]/15 hover:bg-[#121312]/[0.02]",
                      )}
                    >
                      {project.avatarUrl ? (
                        <img src={project.avatarUrl} alt="" className="h-8 w-8 rounded-lg" />
                      ) : (
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#121312]/5 text-[10px] font-bold text-[#121312]/40">
                          {project.key.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-[#121312] truncate">{project.name}</span>
                            {isRecommended && (
                              <span className="shrink-0 rounded bg-brand/15 px-1.5 py-0.5 text-[9px] font-medium text-brand-dark">
                                Recommended
                              </span>
                            )}
                            <span className="shrink-0 rounded bg-[#121312]/5 px-1.5 py-0.5 text-[9px] font-medium text-[#121312]/40">
                              {project.key}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] text-[#121312]/40">{project.ticketCount} tickets</span>
                          {project.hasActiveSprint && (
                            <span className="rounded-full bg-green-50 px-1.5 py-0.5 text-[9px] font-medium text-green-600">
                              Active sprint
                            </span>
                          )}
                        </div>
                      </div>
                      </button>
                    );
                  })}
                </div>
              )}

              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowBoardPicker(false)}
                  className="flex-1 rounded-xl border border-[#121312]/12 py-2.5 text-xs font-medium text-[#121312]/60 transition-all hover:bg-[#121312]/5"
                >
                  Skip
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── API Key Modal ── */}
      <AnimatePresence>
        {apiKeyTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) setApiKeyTarget(null); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              className="mx-4 w-full max-w-md rounded-2xl border border-[#121312]/10 bg-white p-6 shadow-2xl"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#121312]/10 bg-[#121312]/[0.03] text-sm font-bold text-[#121312]/50">
                  {apiKeyTarget.icon}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#121312]">Connect {apiKeyTarget.name}</h3>
                  <p className="text-[11px] text-[#121312]/40">Enter your API credentials below</p>
                </div>
              </div>

              <div className="space-y-3">
                {("requiredFields" in apiKeyTarget && apiKeyTarget.requiredFields
                  ? (apiKeyTarget.requiredFields as readonly { key: string; label: string; placeholder: string; secret: boolean }[])
                  : [{ key: "api_key", label: "API Key", placeholder: "Enter API key", secret: true }]
                ).map((field) => (
                  <div key={field.key}>
                    <label className="mb-1 block text-[11px] font-medium text-[#121312]/60">
                      {field.label}
                    </label>
                    <input
                      type={field.secret ? "password" : "text"}
                      placeholder={field.placeholder}
                      value={apiKeyValues[field.key] ?? ""}
                      onChange={(e) => setApiKeyValues((prev) => ({ ...prev, [field.key]: e.target.value }))}
                      className="w-full rounded-lg border border-[#121312]/12 bg-[#121312]/[0.02] px-3 py-2.5 text-sm text-[#121312] placeholder:text-[#121312]/30 outline-none focus:border-brand/40 focus:ring-2 focus:ring-brand/10 transition-all"
                    />
                  </div>
                ))}
              </div>

              {apiKeyError && (
                <p className="mt-3 text-[11px] text-red-600">{apiKeyError}</p>
              )}

              <div className="mt-5 flex gap-2">
                <button
                  type="button"
                  onClick={() => setApiKeyTarget(null)}
                  className="flex-1 rounded-xl border border-[#121312]/12 py-2.5 text-xs font-medium text-[#121312]/60 transition-all hover:bg-[#121312]/5"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmitAPIKey}
                  disabled={connecting === apiKeyTarget.key}
                  className="flex flex-[2] items-center justify-center gap-2 rounded-xl bg-brand py-2.5 text-xs font-semibold text-[#121312] transition-all hover:shadow-md active:scale-[0.98] disabled:opacity-50"
                >
                  {connecting === apiKeyTarget.key ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="block h-3 w-3 rounded-full border-2 border-[#121312]/30 border-t-[#121312]"
                      />
                      Validating…
                    </>
                  ) : (
                    "Connect"
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Integration grid */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredIntegrations.map((integ, index) => {
            const intConnected = isConnected(integ.key);
            const isLoading = connecting === integ.key;
            const productBadges = getProductBadges(integ.products);

            return (
              <motion.div
                key={integ.key}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.02 }}
                className={cn(
                  "flex items-center gap-3 rounded-xl border p-3 transition-all duration-200",
                  intConnected
                    ? "border-brand/20 bg-brand/5"
                    : "border-[#121312]/8 bg-white hover:border-[#121312]/15",
                )}
              >
                {/* Icon */}
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border text-xs font-bold",
                    intConnected
                      ? "border-brand/20 bg-brand/10 text-[#121312]"
                      : "border-[#121312]/10 bg-[#121312]/[0.03] text-[#121312]/50",
                  )}
                >
                  {integ.icon}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-semibold text-[#121312]">{integ.name}</span>
                    {productBadges.map((pb) => (
                      <span key={pb!.key} className="text-[8px]">{pb!.icon}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-[#121312]/40">{integ.category}</span>
                    <span className="text-[10px] text-[#121312]/25">·</span>
                    <span className={cn(
                      "text-[9px] font-medium px-1.5 py-0.5 rounded",
                      integ.authMethod === "api_key"
                        ? "bg-amber-50 text-amber-600"
                        : "bg-blue-50 text-blue-600",
                    )}>
                      {authMethodLabel(integ.authMethod)}
                    </span>
                  </div>
                </div>

                {/* Action */}
                {intConnected ? (
                  <button
                    type="button"
                    onClick={() => handleDisconnect(integ.key)}
                    className="shrink-0 rounded-lg border border-brand/20 bg-white px-2.5 py-1 text-[10px] font-semibold text-brand-dark transition-colors hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                  >
                    ✓ Connected
                  </button>
                ) : isLoading ? (
                  <div className="shrink-0 flex items-center gap-1.5 rounded-lg bg-[#121312]/5 px-2.5 py-1">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="block h-3 w-3 rounded-full border-2 border-brand/30 border-t-brand"
                    />
                    <span className="text-[10px] text-[#121312]/50">Connecting…</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleConnect(integ)}
                    className="shrink-0 rounded-lg bg-[#121312]/[0.06] px-2.5 py-1 text-[10px] font-semibold text-[#121312]/60 transition-all hover:bg-brand/10 hover:text-[#121312]"
                  >
                    Connect
                  </button>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={goBack}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-[#121312]/12 text-sm font-medium text-[#121312]/60 transition-all hover:bg-[#121312]/5"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </button>
        {connected.length === 0 ? (
          <button
            type="button"
            onClick={handleSkip}
            className="flex h-12 flex-[2] items-center justify-center gap-2 rounded-xl border border-[#121312]/12 text-sm font-medium text-[#121312]/55 transition-all hover:bg-[#121312]/5"
          >
            Skip for now
          </button>
        ) : (
          <button
            type="button"
            onClick={handleContinue}
            disabled={isSaving}
            className="flex h-12 flex-[2] items-center justify-center gap-2 rounded-xl bg-brand text-sm font-semibold text-[#121312] shadow-sm transition-all hover:shadow-md active:scale-[0.98] disabled:opacity-60"
          >
            {isSaving ? (
              <>
                <span className="block h-4 w-4 animate-spin rounded-full border-2 border-[#121312]/20 border-t-[#121312]" />
                Saving…
              </>
            ) : (
              <>
                Continue
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
