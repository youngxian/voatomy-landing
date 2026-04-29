"use client";

import * as React from "react";
import {
  getSSOConfig,
  upsertSSOConfig,
  deleteSSOConfig,
  testSSOConnection,
  APIError,
  type SSOConfig,
  type SSOConfigInput,
} from "@/lib/api";

const CALLBACK_BASE =
  process.env.NEXT_PUBLIC_ONBOARDING_API_URL?.replace("/v1", "") ??
  "http://localhost:8081";

type Protocol = "saml" | "oidc";

export default function SSOSettingsPage() {
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [testing, setTesting] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);

  const [protocol, setProtocol] = React.useState<Protocol>("saml");
  const [domain, setDomain] = React.useState("");
  const [enabled, setEnabled] = React.useState(false);
  const [enforceSSO, setEnforceSSO] = React.useState(false);

  // SAML fields
  const [idpMetadataURL, setIdpMetadataURL] = React.useState("");
  const [idpEntityID, setIdpEntityID] = React.useState("");
  const [idpSSOURL, setIdpSSOURL] = React.useState("");
  const [idpCertificate, setIdpCertificate] = React.useState("");

  // OIDC fields
  const [oidcIssuer, setOidcIssuer] = React.useState("");
  const [oidcClientID, setOidcClientID] = React.useState("");
  const [oidcClientSecret, setOidcClientSecret] = React.useState("");

  const [hasExisting, setHasExisting] = React.useState(false);
  const [feedback, setFeedback] = React.useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const acsURL = `${CALLBACK_BASE}/public/auth/sso/callback/${protocol}`;

  React.useEffect(() => {
    getSSOConfig()
      .then((cfg: SSOConfig) => {
        setHasExisting(true);
        setProtocol(cfg.protocol);
        setDomain(cfg.domain);
        setEnabled(cfg.enabled);
        setEnforceSSO(cfg.enforce_sso);
        setIdpMetadataURL(cfg.idp_metadata_url ?? "");
        setIdpEntityID(cfg.idp_entity_id ?? "");
        setIdpSSOURL(cfg.idp_sso_url ?? "");
        setIdpCertificate(cfg.idp_certificate ?? "");
        setOidcIssuer(cfg.oidc_issuer ?? "");
        setOidcClientID(cfg.oidc_client_id ?? "");
      })
      .catch((err: unknown) => {
        if (err instanceof APIError && err.status === 404) {
          // No config yet
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setFeedback(null);
    try {
      const input: SSOConfigInput = {
        protocol,
        domain: domain.trim(),
        enabled,
        enforce_sso: enforceSSO,
        idp_entity_id: idpEntityID,
        idp_sso_url: idpSSOURL,
        idp_certificate: idpCertificate,
        idp_metadata_url: idpMetadataURL,
        oidc_issuer: oidcIssuer,
        oidc_client_id: oidcClientID,
        oidc_client_secret: oidcClientSecret,
      };
      await upsertSSOConfig(input);
      setHasExisting(true);
      setFeedback({ type: "success", message: "SSO configuration saved." });
    } catch (err) {
      const msg =
        err instanceof APIError ? err.message : "Failed to save configuration.";
      setFeedback({ type: "error", message: msg });
    } finally {
      setSaving(false);
    }
  };

  const handleTest = async () => {
    setTesting(true);
    setFeedback(null);
    try {
      const result = await testSSOConnection();
      setFeedback({
        type: result.success ? "success" : "error",
        message: result.message,
      });
    } catch (err) {
      const msg =
        err instanceof APIError
          ? err.message
          : "Connection test failed unexpectedly.";
      setFeedback({ type: "error", message: msg });
    } finally {
      setTesting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Remove SSO configuration? Users will need to sign in with email.")) return;
    setDeleting(true);
    setFeedback(null);
    try {
      await deleteSSOConfig();
      setHasExisting(false);
      setProtocol("saml");
      setDomain("");
      setEnabled(false);
      setEnforceSSO(false);
      setIdpMetadataURL("");
      setIdpEntityID("");
      setIdpSSOURL("");
      setIdpCertificate("");
      setOidcIssuer("");
      setOidcClientID("");
      setOidcClientSecret("");
      setFeedback({ type: "success", message: "SSO configuration removed." });
    } catch (err) {
      const msg =
        err instanceof APIError ? err.message : "Failed to remove configuration.";
      setFeedback({ type: "error", message: msg });
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#121312]/10 border-t-brand" />
          <p className="text-sm text-[#121312]/50">Loading SSO settings…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#121312]">
            Single Sign-On (SSO)
          </h1>
          <p className="mt-1 text-sm text-[#121312]/50">
            Configure SAML 2.0 or OIDC for your organization so team members can
            sign in through your identity provider.
          </p>
        </div>

        {feedback && (
          <div
            className={`mb-6 rounded-lg border px-4 py-3 text-sm ${
              feedback.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {feedback.message}
          </div>
        )}

        <div className="space-y-6 rounded-2xl border border-[#121312]/10 bg-white p-6 shadow-sm">
          {/* Protocol toggle */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#121312]/70">
              Protocol
            </label>
            <div className="flex gap-2">
              {(["saml", "oidc"] as Protocol[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setProtocol(p)}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                    protocol === p
                      ? "border-brand bg-brand/5 text-brand"
                      : "border-[#121312]/15 text-[#121312]/50 hover:border-[#121312]/30"
                  }`}
                >
                  {p === "saml" ? "SAML 2.0" : "OpenID Connect"}
                </button>
              ))}
            </div>
          </div>

          {/* Domain */}
          <FieldInput
            label="Email domain"
            placeholder="acme.com"
            value={domain}
            onChange={setDomain}
            hint="The email domain that maps to this SSO configuration"
          />

          {/* Protocol-specific fields */}
          {protocol === "saml" ? (
            <>
              <FieldInput
                label="IdP Metadata URL"
                placeholder="https://idp.example.com/metadata"
                value={idpMetadataURL}
                onChange={setIdpMetadataURL}
              />
              <FieldInput
                label="IdP Entity ID"
                placeholder="https://idp.example.com/entity"
                value={idpEntityID}
                onChange={setIdpEntityID}
              />
              <FieldInput
                label="IdP SSO URL"
                placeholder="https://idp.example.com/sso"
                value={idpSSOURL}
                onChange={setIdpSSOURL}
              />
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#121312]/70">
                  IdP Certificate
                </label>
                <textarea
                  rows={5}
                  placeholder="-----BEGIN CERTIFICATE-----&#10;...&#10;-----END CERTIFICATE-----"
                  value={idpCertificate}
                  onChange={(e) => setIdpCertificate(e.target.value)}
                  className="flex w-full rounded-md border border-[#121312]/15 bg-white px-3.5 py-3 font-mono text-sm text-[#121312] transition-colors placeholder:text-[#121312]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:border-brand"
                />
              </div>
              <ReadOnlyField
                label="Assertion Consumer Service (ACS) URL"
                value={acsURL}
              />
            </>
          ) : (
            <>
              <FieldInput
                label="Issuer URL"
                placeholder="https://accounts.google.com"
                value={oidcIssuer}
                onChange={setOidcIssuer}
              />
              <FieldInput
                label="Client ID"
                placeholder="your-client-id"
                value={oidcClientID}
                onChange={setOidcClientID}
              />
              <FieldInput
                label="Client Secret"
                placeholder="your-client-secret"
                type="password"
                value={oidcClientSecret}
                onChange={setOidcClientSecret}
                hint="Leave blank to keep the existing secret"
              />
              <ReadOnlyField
                label="Redirect URI"
                value={acsURL}
              />
            </>
          )}

          {/* Toggles */}
          <div className="space-y-4 border-t border-[#121312]/10 pt-6">
            <Toggle
              label="Enable SSO"
              description="Allow users to sign in with this SSO configuration"
              checked={enabled}
              onChange={setEnabled}
            />
            <Toggle
              label="Enforce SSO"
              description="Disable password login for all users in this organization"
              checked={enforceSSO}
              onChange={setEnforceSSO}
            />
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 border-t border-[#121312]/10 pt-6">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-[#121312] px-5 text-sm font-semibold text-white transition-all hover:bg-[#121312]/90 active:scale-[0.98] disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save configuration"}
            </button>

            {hasExisting && (
              <button
                type="button"
                onClick={handleTest}
                disabled={testing}
                className="inline-flex h-11 items-center justify-center rounded-xl border border-[#121312]/15 bg-white px-5 text-sm font-semibold text-[#121312] transition-all hover:bg-[#121312]/5 active:scale-[0.98] disabled:opacity-50"
              >
                {testing ? "Testing…" : "Test connection"}
              </button>
            )}

            {hasExisting && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex h-11 items-center justify-center rounded-xl border border-red-200 bg-white px-5 text-sm font-semibold text-red-600 transition-all hover:bg-red-50 active:scale-[0.98] disabled:opacity-50 ml-auto"
              >
                {deleting ? "Removing…" : "Remove SSO"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FieldInput({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  hint,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  hint?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#121312]/70">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex h-12 w-full rounded-md border border-[#121312]/15 bg-white px-3.5 text-base font-medium text-[#121312] transition-colors placeholder:text-[#121312]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:border-brand"
      />
      {hint && (
        <p className="mt-1 text-xs text-[#121312]/40">{hint}</p>
      )}
    </div>
  );
}

function ReadOnlyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#121312]/70">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          readOnly
          value={value}
          className="flex h-12 w-full rounded-md border border-[#121312]/10 bg-[#fafafa] px-3.5 text-sm font-mono text-[#121312]/70"
        />
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex h-12 shrink-0 items-center justify-center rounded-md border border-[#121312]/15 bg-white px-3 text-xs font-medium text-[#121312]/60 transition-colors hover:bg-[#121312]/5"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <p className="mt-1 text-xs text-[#121312]/40">
        Provide this URL to your identity provider
      </p>
    </div>
  );
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative mt-0.5 inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
          checked ? "bg-brand" : "bg-[#121312]/15"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
      <div>
        <span className="block text-sm font-semibold text-[#121312]">
          {label}
        </span>
        <span className="block text-xs text-[#121312]/50">{description}</span>
      </div>
    </label>
  );
}
