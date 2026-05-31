"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, ChevronDown, ChevronLeft, Cookie, Settings2, Sliders } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  acceptAllCookies,
  acceptEssentialOnly,
  getCookieConsent,
  saveCookieConsent,
  subscribeCookieConsent,
} from "@/lib/cookie-consent";
import { defaultLocale, isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { useOptionalLocale } from "@/i18n/locale-provider";

type View = "banner" | "settings";

const BOX_SHADOW =
  "0 20px 50px -12px rgba(15, 23, 42, 0.18), 0 8px 20px -8px rgba(240, 90, 40, 0.12)";

function readLocaleFromCookie(): Locale {
  if (typeof document === "undefined") return defaultLocale;
  const match = document.cookie.match(/(?:^|; )NEXT_LOCALE=([^;]*)/);
  const value = match ? decodeURIComponent(match[1]) : "";
  return isValidLocale(value) ? value : defaultLocale;
}

function Toggle({
  checked,
  disabled,
  onChange,
  label,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200",
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
        checked ? "bg-[#F05A28]" : "bg-[#e2e8f0]",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200",
          checked && "translate-x-5",
        )}
      />
    </button>
  );
}

function CategoryRow({
  label,
  description,
  checked,
  onChange,
  services,
  servicesLabel,
  expanded,
  onToggleExpand,
  icon: Icon,
  accent,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  services: readonly string[];
  servicesLabel: string;
  expanded: boolean;
  onToggleExpand: () => void;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  accent: string;
}) {
  return (
    <div className="rounded-xl bg-[#f8fafc] p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-1 gap-3">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${accent}14`, color: accent }}
          >
            <Icon className="h-5 w-5" strokeWidth={2.2} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-[#0f172a]">{label}</p>
            <p className="mt-1 text-xs leading-relaxed text-[#64748b]">{description}</p>
          </div>
        </div>
        <Toggle checked={checked} onChange={onChange} label={label} />
      </div>
      <button
        type="button"
        onClick={onToggleExpand}
        className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#F05A28] transition-colors hover:text-[#E04E1E]"
      >
        <ChevronDown
          className={cn("h-4 w-4 transition-transform duration-200", expanded && "rotate-180")}
          strokeWidth={2.5}
        />
        {servicesLabel}
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {services.map((service) => (
              <li key={service} className="mt-2 flex items-center gap-2 text-xs text-[#64748b]">
                <span className="h-1 w-1 rounded-full bg-[#F05A28]/60" />
                {service}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

function CookieBoxShell({
  children,
  widthClass,
}: {
  children: React.ReactNode;
  widthClass: string;
}) {
  return (
    <div
      className={cn(
        "pointer-events-auto overflow-hidden rounded-2xl bg-white",
        widthClass,
      )}
      style={{ boxShadow: BOX_SHADOW }}
    >
      <div className="h-1 bg-gradient-to-r from-[#F05A28] via-[#FF8A5C] to-[#3B82F6]" />
      {children}
    </div>
  );
}

function CookieBanner({
  t,
  cookiesHref,
  onAcceptAll,
  onDecline,
  onOpenSettings,
}: {
  t: ReturnType<typeof getDictionary>["cookieConsent"];
  cookiesHref: string;
  onAcceptAll: () => void;
  onDecline: () => void;
  onOpenSettings: () => void;
}) {
  return (
    <>
      <div className="px-6 pt-6 pb-5">
        <div className="flex items-start gap-4">
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ring-1 ring-[#F05A28]/10"
            style={{
              background: "linear-gradient(135deg, #FFF4EF 0%, #FFE8DC 100%)",
              boxShadow: "0 4px 14px rgba(240, 90, 40, 0.15)",
            }}
          >
            <Cookie className="h-6 w-6 text-[#F05A28]" strokeWidth={2.2} />
          </span>
          <div className="min-w-0 flex-1">
            <h2 id="cookie-consent-title" className="text-base font-bold tracking-tight text-[#0f172a]">
              {t.bannerTitle}
            </h2>
            <p id="cookie-consent-desc" className="mt-2 text-sm leading-relaxed text-[#64748b]">
              {t.bannerDescription}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenSettings}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#F05A28]/15 bg-[#FFF8F5] px-4 py-2.5 text-sm font-semibold text-[#F05A28] transition-all hover:border-[#F05A28]/30 hover:bg-[#FFF4EF]"
        >
          <Settings2 className="h-4 w-4" strokeWidth={2.2} />
          {t.openSettingsLink}
        </button>
      </div>

      <div className="flex gap-3 bg-[#fafafa] px-6 py-4">
        <button
          type="button"
          onClick={onDecline}
          className="flex-1 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-[#475569] shadow-sm ring-1 ring-[#e2e8f0] transition-all hover:bg-[#f8fafc] hover:text-[#0f172a]"
        >
          {t.decline}
        </button>
        <button
          type="button"
          onClick={onAcceptAll}
          className="flex-1 rounded-full bg-[#F05A28] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#F05A28]/25 transition-all hover:bg-[#E04E1E] hover:shadow-lg hover:shadow-[#F05A28]/30"
        >
          {t.acceptAll}
        </button>
      </div>

      <p className="px-6 py-3 text-center text-xs text-[#94a3b8]">
        <Link href={cookiesHref} className="font-medium transition-colors hover:text-[#64748b] hover:underline">
          {t.cookiePolicyLink}
        </Link>
      </p>
    </>
  );
}

function PrivacySettingsPanel({
  t,
  privacyHref,
  cookiesHref,
  analytics,
  preferences,
  expanded,
  onAnalyticsChange,
  onPreferencesChange,
  onToggleExpanded,
  onToggleAll,
  onBack,
  onDecline,
  onAcceptSelected,
  onAcceptAll,
}: {
  t: ReturnType<typeof getDictionary>["cookieConsent"];
  privacyHref: string;
  cookiesHref: string;
  analytics: boolean;
  preferences: boolean;
  expanded: Record<string, boolean>;
  onAnalyticsChange: (value: boolean) => void;
  onPreferencesChange: (value: boolean) => void;
  onToggleExpanded: (key: string) => void;
  onToggleAll: (enabled: boolean) => void;
  onBack: () => void;
  onDecline: () => void;
  onAcceptSelected: () => void;
  onAcceptAll: () => void;
}) {
  const allEnabled = analytics && preferences;

  return (
    <>
      <div className="max-h-[min(62vh,480px)] overflow-y-auto px-6 pt-5 pb-4">
        <button
          type="button"
          onClick={onBack}
          className="mb-4 inline-flex items-center gap-1 rounded-full bg-[#f8fafc] px-3 py-1.5 text-xs font-semibold text-[#64748b] transition-colors hover:bg-[#f1f5f9] hover:text-[#0f172a]"
        >
          <ChevronLeft className="h-3.5 w-3.5" strokeWidth={2.5} />
          {t.backToBanner}
        </button>

        <h2 id="cookie-consent-title" className="text-base font-bold tracking-tight text-[#0f172a]">
          {t.title}
        </h2>
        <p id="cookie-consent-desc" className="mt-2 text-sm leading-relaxed text-[#64748b]">
          {t.descriptionBeforeLink}{" "}
          <Link href={privacyHref} className="font-semibold text-[#2563eb] hover:underline">
            {t.privacyPolicyLink}
          </Link>
          {t.descriptionAfterLink}{" "}
          <Link href={cookiesHref} className="font-semibold text-[#2563eb] hover:underline">
            {t.cookiePolicyLink}
          </Link>
          .
        </p>

        <div className="mt-5 space-y-3">
          <CategoryRow
            label={t.categories.analytics.label}
            description={t.categories.analytics.description}
            checked={analytics}
            onChange={onAnalyticsChange}
            services={t.categories.analytics.services}
            servicesLabel={t.categories.analytics.servicesLabel}
            expanded={!!expanded.analytics}
            onToggleExpand={() => onToggleExpanded("analytics")}
            icon={BarChart3}
            accent="#D97706"
          />
          <CategoryRow
            label={t.categories.preferences.label}
            description={t.categories.preferences.description}
            checked={preferences}
            onChange={onPreferencesChange}
            services={t.categories.preferences.services}
            servicesLabel={t.categories.preferences.servicesLabel}
            expanded={!!expanded.preferences}
            onToggleExpand={() => onToggleExpanded("preferences")}
            icon={Sliders}
            accent="#7C3AED"
          />
        </div>

        <div className="mt-4 flex items-start justify-between gap-4 rounded-xl bg-[#f8fafc] p-4">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-[#0f172a]">{t.toggleAllLabel}</p>
            <p className="mt-1 text-xs leading-relaxed text-[#64748b]">{t.toggleAllDescription}</p>
          </div>
          <Toggle checked={allEnabled} onChange={onToggleAll} label={t.toggleAllLabel} />
        </div>
      </div>

      <div className="flex gap-2 bg-[#fafafa] px-5 py-4">
        <button
          type="button"
          onClick={onDecline}
          className="flex-1 rounded-full bg-white px-3 py-2.5 text-xs font-semibold text-[#475569] shadow-sm ring-1 ring-[#e2e8f0] transition-all hover:bg-[#f8fafc] sm:text-sm"
        >
          {t.decline}
        </button>
        <button
          type="button"
          onClick={onAcceptSelected}
          className="flex-1 rounded-full bg-white px-3 py-2.5 text-xs font-semibold text-[#475569] shadow-sm ring-1 ring-[#e2e8f0] transition-all hover:bg-[#f8fafc] sm:text-sm"
        >
          {t.acceptSelected}
        </button>
        <button
          type="button"
          onClick={onAcceptAll}
          className="flex-1 rounded-full bg-[#F05A28] px-3 py-2.5 text-xs font-semibold text-white shadow-md shadow-[#F05A28]/25 transition-all hover:bg-[#E04E1E] sm:text-sm"
        >
          {t.acceptAll}
        </button>
      </div>
    </>
  );
}

export function CookieConsentBanner() {
  const localeCtx = useOptionalLocale();
  const [locale, setLocale] = React.useState<Locale>(localeCtx?.locale ?? defaultLocale);
  const [visible, setVisible] = React.useState(false);
  const [ready, setReady] = React.useState(false);
  const [view, setView] = React.useState<View>("banner");
  const [analytics, setAnalytics] = React.useState(true);
  const [preferences, setPreferences] = React.useState(true);
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    if (!localeCtx) setLocale(readLocaleFromCookie());
  }, [localeCtx]);

  const t = (localeCtx?.dictionary ?? getDictionary(localeCtx?.locale ?? locale)).cookieConsent;
  const privacyHref = localeCtx ? localeCtx.localizedPath("/privacy") : `/${locale}/privacy`;
  const cookiesHref = localeCtx ? localeCtx.localizedPath("/cookies") : `/${locale}/cookies`;

  React.useEffect(() => {
    const existing = getCookieConsent();
    if (existing?.decided) {
      setAnalytics(existing.analytics);
      setPreferences(existing.preferences);
      setVisible(false);
    } else {
      setVisible(true);
    }
    setReady(true);

    return subscribeCookieConsent((state) => {
      setAnalytics(state.analytics);
      setPreferences(state.preferences);
      if (state.decided) setVisible(false);
    });
  }, []);

  const dismiss = () => setVisible(false);

  const handleAcceptAll = () => {
    acceptAllCookies();
    dismiss();
  };

  const handleDecline = () => {
    acceptEssentialOnly();
    dismiss();
  };

  const handleAcceptSelected = () => {
    saveCookieConsent({ analytics, preferences });
    dismiss();
  };

  const handleToggleAll = (enabled: boolean) => {
    setAnalytics(enabled);
    setPreferences(enabled);
  };

  const toggleExpanded = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (!ready) return null;

  const widthClass =
    view === "banner"
      ? "w-[min(calc(100vw-2rem),400px)]"
      : "w-[min(calc(100vw-2rem),440px)]";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 420, damping: 32 }}
          className="fixed z-[200] bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] pointer-events-none"
          role="dialog"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-desc"
        >
          <CookieBoxShell widthClass={widthClass}>
            <AnimatePresence mode="wait" initial={false}>
              {view === "banner" ? (
                <motion.div
                  key="banner"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.2 }}
                >
                  <CookieBanner
                    t={t}
                    cookiesHref={cookiesHref}
                    onAcceptAll={handleAcceptAll}
                    onDecline={handleDecline}
                    onOpenSettings={() => setView("settings")}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <PrivacySettingsPanel
                    t={t}
                    privacyHref={privacyHref}
                    cookiesHref={cookiesHref}
                    analytics={analytics}
                    preferences={preferences}
                    expanded={expanded}
                    onAnalyticsChange={setAnalytics}
                    onPreferencesChange={setPreferences}
                    onToggleExpanded={toggleExpanded}
                    onToggleAll={handleToggleAll}
                    onBack={() => setView("banner")}
                    onDecline={handleDecline}
                    onAcceptSelected={handleAcceptSelected}
                    onAcceptAll={handleAcceptAll}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </CookieBoxShell>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
