"use client";

/**
 * IntegrationCard — self-contained card with full connect/disconnect logic.
 *
 * Handles BOTH auth methods from INTEGRATION_CATALOG:
 *   • oauth2 / oauth2_pkce  → launches OAuth popup
 *   • api_key               → renders an inline credential modal with the
 *                             tool's `requiredFields`, validates, then calls
 *                             connectWithAPIKey
 *
 * The parent step only needs to:
 *   1. Track `ConnectedIntegration[]` in state
 *   2. Pass `isConnected(key)` down as `connected`
 *   3. Implement `onConnected(key, displayName, authMethod)` to append to state
 *   4. Implement `onDisconnected(key)` to remove from state
 */

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Eye, EyeOff, ExternalLink, Loader2, X } from "lucide-react";
import { IntegrationLogo } from "@/components/icons/integration-logos";
import { cn } from "@/lib/utils";
import {
  initiateOAuthConnect,
  connectWithAPIKey,
  disconnectIntegration,
  openOAuthPopup,
  APIError,
} from "@/lib/api";
import type { AuthMethod, IntegrationKey } from "@/types";
import { INTEGRATION_CATALOG } from "@/lib/constants";

type CatalogEntry = (typeof INTEGRATION_CATALOG)[number];

// ── API key modal ─────────────────────────────────────────────────────────

function ApiKeyModal({
  integration,
  accentColor,
  onSuccess,
  onClose,
}: {
  integration: CatalogEntry;
  accentColor: string;
  onSuccess: (key: IntegrationKey, displayName: string) => void;
  onClose: () => void;
}) {
  const fields = (
    ("requiredFields" in integration ? integration.requiredFields : undefined) as
      | readonly { key: string; label: string; placeholder: string; secret: boolean }[]
      | undefined
  ) ?? [{ key: "api_key", label: "API Key", placeholder: "Enter your API key", secret: true }];

  const [values, setValues] = React.useState<Record<string, string>>({});
  const [shown, setShown] = React.useState<Record<string, boolean>>({});
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  // Links to docs for specific tools
  const docsLink: Record<string, string> = {
    datadog: "https://docs.datadoghq.com/account_management/api-app-keys/",
    pagerduty: "https://support.pagerduty.com/docs/api-access-keys",
    opsgenie: "https://support.atlassian.com/opsgenie/docs/api-key-management/",
    sentry: "https://docs.sentry.io/api/auth/",
    grafana: "https://grafana.com/docs/grafana/latest/administration/api-keys/",
    gong: "https://us-66146.app.gong.io/settings/api",
    freshdesk: "https://support.freshdesk.com/support/solutions/articles/215517",
    sketch: "https://www.sketch.com/docs/developers/developer-settings/",
  };

  const handleSubmit = async () => {
    const missing = fields.filter((f) => !values[f.key]?.trim());
    if (missing.length) {
      setError(`Please fill in: ${missing.map((f) => f.label).join(", ")}`);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await connectWithAPIKey(integration.key as IntegrationKey, values);
      onSuccess(integration.key as IntegrationKey, integration.name);
    } catch (err) {
      setError(err instanceof APIError ? err.message : "Invalid credentials — please double-check and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ duration: 0.18 }}
        className="w-full max-w-md rounded-2xl border border-[#121312]/10 bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-[#121312]/8 px-6 py-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-black/[0.06] bg-white shadow-sm">
            <IntegrationLogo integrationKey={integration.key} name={integration.name} size="md" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-[#121312]">Connect {integration.name}</h3>
            <p className="text-[11px] text-[#121312]/45">Enter your API credentials</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-full text-[#121312]/35 hover:bg-[#121312]/6 hover:text-[#121312]/60 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Fields */}
        <div className="space-y-3 px-6 py-5">
          {fields.map((field) => (
            <div key={field.key}>
              <label className="mb-1.5 block text-xs font-semibold text-[#121312]/60">
                {field.label}
              </label>
              <div className="relative">
                <input
                  type={field.secret && !shown[field.key] ? "password" : "text"}
                  placeholder={field.placeholder}
                  value={values[field.key] ?? ""}
                  onChange={(e) => {
                    setValues((prev) => ({ ...prev, [field.key]: e.target.value }));
                    setError(null);
                  }}
                  onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); }}
                  className="w-full rounded-xl border border-[#121312]/12 bg-[#121312]/[0.02] px-3.5 py-2.5 pr-10 text-sm text-[#121312] placeholder:text-[#121312]/30 outline-none transition-all focus:border-[var(--accent)]/40 focus:ring-2 focus:ring-[var(--accent)]/10"
                  style={{ "--accent": accentColor } as React.CSSProperties}
                />
                {field.secret && (
                  <button
                    type="button"
                    onClick={() => setShown((prev) => ({ ...prev, [field.key]: !prev[field.key] }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#121312]/30 hover:text-[#121312]/60 transition-colors"
                    tabIndex={-1}
                  >
                    {shown[field.key] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                )}
              </div>
            </div>
          ))}

          {docsLink[integration.key] && (
            <a
              href={docsLink[integration.key]}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] text-[#121312]/40 hover:text-[#121312]/65 transition-colors"
            >
              <ExternalLink className="h-3 w-3" />
              Where do I find my {integration.name} API key?
            </a>
          )}

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-600"
            >
              {error}
            </motion.p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 border-t border-[#121312]/8 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-[#121312]/12 py-2.5 text-xs font-medium text-[#121312]/55 hover:bg-[#121312]/5 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="flex flex-[2] items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold text-white transition-all hover:brightness-105 active:scale-[0.98] disabled:opacity-60"
            style={{ background: accentColor }}
          >
            {loading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Validating…
              </>
            ) : (
              "Connect"
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Public component ──────────────────────────────────────────────────────

export function IntegrationCard({
  integration,
  connected,
  accentColor = "#F05A28",
  onConnected,
  onDisconnected,
}: {
  integration: CatalogEntry;
  connected: boolean;
  accentColor?: string;
  onConnected: (key: IntegrationKey, displayName: string, authMethod: AuthMethod) => void;
  onDisconnected: (key: IntegrationKey) => void;
}) {
  const key = integration.key as IntegrationKey;
  const [loading, setLoading] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleClick = async () => {
    if (connected) {
      // Disconnect
      setLoading(true);
      try {
        await disconnectIntegration(key);
      } catch {
        // best-effort
      } finally {
        setLoading(false);
      }
      onDisconnected(key);
      return;
    }

    setError(null);

    if (integration.authMethod === "api_key") {
      setShowModal(true);
      return;
    }

    // OAuth flow
    setLoading(true);
    try {
      const callbackUrl = `${window.location.origin}/onboarding/callback/${key}`;
      const { auth_url } = await initiateOAuthConnect(key, callbackUrl);
      await openOAuthPopup(auth_url);
      onConnected(key, integration.name, integration.authMethod as AuthMethod);
    } catch (err) {
      const msg = err instanceof APIError ? err.message : "Connection failed — please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const authBadge = {
    oauth2: { label: "OAuth", cls: "bg-blue-50 text-blue-700" },
    oauth2_pkce: { label: "OAuth", cls: "bg-blue-50 text-blue-700" },
    api_key: { label: "API Key", cls: "bg-amber-50 text-amber-700" },
  }[integration.authMethod] ?? { label: "", cls: "" };

  return (
    <>
      <AnimatePresence>
        {showModal && (
          <ApiKeyModal
            integration={integration}
            accentColor={accentColor}
            onSuccess={(k, displayName) => {
              setShowModal(false);
              onConnected(k, displayName, "api_key");
            }}
            onClose={() => setShowModal(false)}
          />
        )}
      </AnimatePresence>

      <div
        className={cn(
          "flex items-center gap-3.5 rounded-2xl border px-4 py-3.5 transition-all duration-150",
          connected
            ? "border-emerald-200 bg-emerald-50/70"
            : "border-[#121312]/10 bg-white hover:border-[#121312]/18 hover:shadow-sm",
        )}
      >
        {/* Logo */}
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border bg-white shadow-sm",
            connected ? "border-emerald-200/60" : "border-black/[0.06]",
          )}
        >
          <IntegrationLogo integrationKey={integration.key} name={integration.name} size="md" />
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-[#121312]">{integration.name}</p>
          <div className="mt-0.5 flex items-center gap-1.5">
            <span className="text-[11px] text-[#121312]/45 capitalize">{integration.category.toLowerCase()}</span>
            <span className="text-[10px] text-[#121312]/25">·</span>
            <span className={cn("rounded-md px-1.5 py-px text-[9px] font-bold uppercase tracking-wide", authBadge.cls)}>
              {authBadge.label}
            </span>
          </div>
          {error && (
            <p className="mt-1 text-[10px] text-red-500">{error}</p>
          )}
        </div>

        {/* Action button */}
        <button
          type="button"
          onClick={handleClick}
          disabled={loading}
          className={cn(
            "shrink-0 rounded-xl border px-3 py-1.5 text-[11px] font-semibold transition-all",
            connected
              ? "border-emerald-200 bg-white text-emerald-700 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              : "border-[#121312]/10 bg-[#121312]/[0.04] text-[#121312]/55 hover:border-[var(--accent)]/30 hover:bg-[var(--accent)]/8 hover:text-[#121312]",
            loading && "opacity-50 cursor-not-allowed",
          )}
          style={{ "--accent": accentColor } as React.CSSProperties}
        >
          {loading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : connected ? (
            <span className="flex items-center gap-1">
              <Check className="h-3 w-3" strokeWidth={2.5} />
              Connected
            </span>
          ) : integration.authMethod === "api_key" ? (
            "Add key"
          ) : (
            "Connect"
          )}
        </button>
      </div>
    </>
  );
}

// ── Shared section renderer ───────────────────────────────────────────────

export function IntegrationGroup({
  label,
  badge,
  integrations,
  connected,
  accentColor,
  onConnected,
  onDisconnected,
  hint,
  delay = 0,
}: {
  label: string;
  badge?: "Required" | "Recommended";
  integrations: CatalogEntry[];
  connected: (key: IntegrationKey) => boolean;
  accentColor: string;
  onConnected: (key: IntegrationKey, displayName: string, authMethod: AuthMethod) => void;
  onDisconnected: (key: IntegrationKey) => void;
  hint?: string;
  delay?: number;
}) {
  if (integrations.length === 0) return null;
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
      <div className="mb-2 flex items-center gap-1.5">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#121312]/40">{label}</p>
        {badge === "Required" && (
          <span className="rounded-full bg-red-50 px-1.5 py-0.5 text-[9px] font-bold text-red-500">Required</span>
        )}
        {badge === "Recommended" && (
          <span className="rounded-full bg-amber-50 px-1.5 py-0.5 text-[9px] font-bold text-amber-600">Recommended</span>
        )}
      </div>
      {hint && <p className="mb-2 text-xs text-[#121312]/45">{hint}</p>}
      <div className="space-y-2">
        {integrations.map((i) => (
          <IntegrationCard
            key={i.key}
            integration={i}
            connected={connected(i.key as IntegrationKey)}
            accentColor={accentColor}
            onConnected={onConnected}
            onDisconnected={onDisconnected}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ── Shared connect state hook ─────────────────────────────────────────────

export function useConnectState(initial: import("@/types").ConnectedIntegration[]) {
  const [connected, setConnected] = React.useState<import("@/types").ConnectedIntegration[]>(initial);

  const isConnected = React.useCallback(
    (key: IntegrationKey) => connected.some((c) => c.key === key),
    [connected],
  );

  const onConnected = React.useCallback(
    (key: IntegrationKey, displayName: string, authMethod: AuthMethod) => {
      setConnected((prev) => [
        ...prev.filter((c) => c.key !== key),
        { key, displayName, connectedAt: new Date().toISOString(), authMethod },
      ]);
    },
    [],
  );

  const onDisconnected = React.useCallback((key: IntegrationKey) => {
    setConnected((prev) => prev.filter((c) => c.key !== key));
  }, []);

  return { connected, isConnected, onConnected, onDisconnected };
}
