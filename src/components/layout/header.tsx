"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NAV_LINKS,
  PRODUCTS,
  PRODUCT_DEMO_LINKS,
} from "@/lib/constants";
import { trackEvent, trackConversion } from "@/lib/analytics";
import { useSession } from "@/hooks/use-session";
import { useLocale } from "@/i18n/locale-provider";
import { UtilityTopBar } from "@/components/layout/utility-top-bar";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import {
  ProductMegaMenu,
  SolutionsMegaMenu,
  ResourcesMegaMenu,
  ProductLogoBadge,
} from "@/components/layout/nav-mega-menus";

type MegaMenuType = "product" | "solutions" | "resources" | null;

export function Header() {
  const [activeMega, setActiveMega] = React.useState<MegaMenuType>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [mobileExpanded, setMobileExpanded] = React.useState<string | null>(null);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout>>(null);
  const { isLoggedIn, dashboardUrl, logout } = useSession();
  const { localizedPath, dictionary: t } = useLocale();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll listener — utility bar hide + nav compact/float
  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Escape to close
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMega(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const openMega = React.useCallback((menu: MegaMenuType) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMega(menu);
    if (menu) {
      trackEvent("navigation", "mega_menu_open", menu, undefined, { menu });
    }
  }, []);

  const closeMega = React.useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActiveMega(null), 150);
  }, []);

  const STATUS_DOT: Record<string, string> = {
    available: "bg-fynk-orange",
    "coming-soon": "bg-yellow-400",
    future: "bg-theme-f",
  };

  const navTriggerClass = (active: boolean) =>
    cn(
      "inline-flex items-center gap-1.5 rounded-lg px-3.5 text-[15px] font-medium transition-all duration-200",
      scrolled ? "h-11" : "h-12",
      "text-fynk-muted hover:bg-fynk-surface-alt hover:text-fynk-ink",
      active && "bg-fynk-surface-alt text-fynk-ink",
    );

  const navLinkClass = cn(
    "inline-flex items-center rounded-lg px-3.5 text-[15px] font-medium text-fynk-muted transition-all duration-200 hover:bg-fynk-surface-alt hover:text-fynk-ink",
    scrolled ? "h-11" : "h-12",
  );

  return (
    <>
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-fynk-orange focus:px-4 focus:py-2 focus:text-white focus:font-semibold focus:shadow-lg"
      >
        {t.nav.skipToContent}
      </a>

      <header className="sticky top-0 z-50">
        <UtilityTopBar scrolled={scrolled} />

        {/* Nav wrapper — transparent at top, gains bg + shadow on scroll */}
        <div
          className={cn(
            "transition-colors duration-200",
            scrolled ? "bg-white/95 shadow-[0_1px_0_0_rgba(17,24,39,0.06)] backdrop-blur-md" : "bg-white",
          )}
        >
          <div className="mx-auto max-w-container px-4 sm:px-6">
            <div
              className={cn(
                "relative flex h-16 items-center justify-between gap-4",
                !mounted && "opacity-0",
                mounted && "opacity-100 transition-opacity duration-150",
              )}
            >
            {/* Logo */}
            <Link
              href={localizedPath("/")}
              className="group relative z-[2] inline-flex shrink-0 items-center gap-2 rounded-lg py-1.5 pl-0.5 transition-opacity hover:opacity-85"
            >
              <span className="grid h-8 w-8 place-items-center" aria-hidden="true">
                <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8">
                  <path
                    d="M6 18c4-8 10-12 20-12-2 6-1 12 4 16-5-2-10-1-14 4 2-4 5-7 10-8Z"
                    fill="#F05A28"
                  />
                  <path
                    d="M8 22c3-5 8-8 14-9-1 3 0 6 2 8-3-1-6 0-8 2 1-2 2-3 4-4Z"
                    fill="#3B82F6"
                    opacity="0.85"
                  />
                </svg>
              </span>
              <span className="font-heading text-[18px] font-semibold tracking-[-0.02em] text-fynk-ink">
                voatomy
              </span>
            </Link>

            {/* Center nav — fynk pattern: absolutely centered in the pill */}
            <nav
              className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-0.5 lg:flex"
              aria-label="Primary"
            >
              <button
                type="button"
                className={navTriggerClass(activeMega === "product")}
                onClick={() => openMega(activeMega === "product" ? null : "product")}
                onMouseEnter={() => openMega("product")}
                onMouseLeave={closeMega}
                aria-expanded={activeMega === "product"}
                aria-haspopup="true"
              >
                {t.nav.platform}
                <ChevronDown
                  className={cn(
                    "h-[17px] w-[17px] opacity-50 transition-transform duration-200",
                    activeMega === "product" && "rotate-180 opacity-80",
                  )}
                />
              </button>

              <button
                type="button"
                className={navTriggerClass(activeMega === "solutions")}
                onClick={() => openMega(activeMega === "solutions" ? null : "solutions")}
                onMouseEnter={() => openMega("solutions")}
                onMouseLeave={closeMega}
                aria-expanded={activeMega === "solutions"}
                aria-haspopup="true"
              >
                {t.nav.solutions}
                <ChevronDown
                  className={cn(
                    "h-[17px] w-[17px] opacity-50 transition-transform duration-200",
                    activeMega === "solutions" && "rotate-180 opacity-80",
                  )}
                />
              </button>

              <Link href={localizedPath("/customers")} className={navLinkClass}>
                {t.nav.customers}
              </Link>

              <Link href={localizedPath("/pricing")} className={navLinkClass}>
                {t.nav.pricing}
              </Link>

              <button
                type="button"
                className={navTriggerClass(activeMega === "resources")}
                onClick={() => openMega(activeMega === "resources" ? null : "resources")}
                onMouseEnter={() => openMega("resources")}
                onMouseLeave={closeMega}
                aria-expanded={activeMega === "resources"}
                aria-haspopup="true"
              >
                {t.nav.resources}
                <ChevronDown
                  className={cn(
                    "h-[17px] w-[17px] opacity-50 transition-transform duration-200",
                    activeMega === "resources" && "rotate-180 opacity-80",
                  )}
                />
              </button>
            </nav>

            {/* Right CTAs — fynk pattern: Free trial (outline) + Get a demo (dark) */}
            <div className="relative z-[2] hidden shrink-0 items-center gap-2 lg:flex">
              <LanguageSwitcher variant="light" compact />
              {isLoggedIn ? (
                <Link
                  href={dashboardUrl}
                  data-track-cta="header-dashboard"
                  data-track-cta-location="header"
                  className="inline-flex h-10 items-center rounded-full border border-fynk-border bg-white px-5 text-[14px] font-semibold text-fynk-ink shadow-sm transition-all hover:border-fynk-border-hover hover:bg-fynk-surface-alt"
                >
                  {t.nav.goToDashboard}
                </Link>
              ) : (
                <Link
                  href={localizedPath("/auth/signup")}
                  data-track-cta="header-free-trial"
                  data-track-cta-location="header"
                  onClick={() => trackConversion("signup_start", { source: "header" })}
                  className="inline-flex h-10 items-center rounded-full border border-fynk-border bg-white px-5 text-[14px] font-semibold text-fynk-ink shadow-sm transition-all hover:border-fynk-border-hover hover:bg-fynk-surface-alt"
                >
                  Free trial
                </Link>
              )}
              <Link
                href={localizedPath("/demo")}
                data-track-cta="header-get-demo"
                data-track-cta-location="header"
                className="inline-flex h-10 items-center rounded-full bg-fynk-ink px-5 text-[14px] font-semibold text-white shadow-sm transition-all hover:bg-fynk-ink/90 active:scale-[0.98]"
              >
                {t.nav.getDemo}
              </Link>
              {isLoggedIn && (
                <button
                  type="button"
                  onClick={logout}
                  className="ml-1 px-1 text-[13px] font-medium text-fynk-muted transition-colors hover:text-fynk-ink"
                  aria-label="Sign out"
                  title="Sign out"
                >
                  Sign out
                </button>
              )}
            </div>

            {/* Mobile hamburger */}
            <div className="flex items-center gap-2 lg:hidden">
              <LanguageSwitcher variant="light" compact />
              <button
                type="button"
                className="grid h-9 w-9 place-items-center rounded-lg text-fynk-muted transition-colors hover:bg-fynk-surface-alt hover:text-fynk-ink"
                onClick={() => {
                  setMobileOpen(true);
                  trackEvent("navigation", "mobile_menu_open", "Mobile menu opened");
                }}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>{/* /nav row */}
        </div>{/* /max-w-container */}

        {/* ── Mega menus — rendered inside the sticky header so they scroll with it ── */}
        {activeMega === "product" && (
          <div
            className="absolute left-0 right-0 z-40 animate-nav-drop-in px-4 pt-1 sm:px-6"
            onMouseEnter={() => openMega("product")}
            onMouseLeave={closeMega}
            role="menu"
            aria-label="Platform menu"
          >
            <div className="mx-auto max-w-container">
              <ProductMegaMenu />
            </div>
          </div>
        )}

        {activeMega === "solutions" && (
          <div
            className="absolute left-0 right-0 z-40 animate-nav-drop-in px-4 pt-1 sm:px-6"
            onMouseEnter={() => openMega("solutions")}
            onMouseLeave={closeMega}
            role="menu"
            aria-label="Solutions menu"
          >
            <div className="mx-auto max-w-container">
              <SolutionsMegaMenu />
            </div>
          </div>
        )}

        {activeMega === "resources" && (
          <div
            className="absolute left-0 right-0 z-40 animate-nav-drop-in px-4 pt-1 sm:px-6"
            onMouseEnter={() => openMega("resources")}
            onMouseLeave={closeMega}
            role="menu"
            aria-label="Resources menu"
          >
            <div className="mx-auto max-w-container">
              <ResourcesMegaMenu />
            </div>
          </div>
        )}

      </div>{/* /nav bg wrapper */}
      </header>

      {/* ================================================================
          MOBILE MENU
      ================================================================ */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          {/* Slide-out panel */}
          <div className="absolute bottom-0 right-0 top-0 flex w-full max-w-sm animate-slide-in-right flex-col overflow-y-auto border-l border-fynk-border bg-white">
            {/* Panel header */}
            <div className="flex items-center justify-between border-b border-theme px-5 py-4">
              <Link
                href={localizedPath("/")}
                className="inline-flex items-center gap-2"
                onClick={() => setMobileOpen(false)}
              >
                <span className="grid h-7 w-7 place-items-center" aria-hidden="true">
                  <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7">
                    <path
                      d="M6 18c4-8 10-12 20-12-2 6-1 12 4 16-5-2-10-1-14 4 2-4 5-7 10-8Z"
                      fill="#F05A28"
                    />
                    <path
                      d="M8 22c3-5 8-8 14-9-1 3 0 6 2 8-3-1-6 0-8 2 1-2 2-3 4-4Z"
                      fill="#3B82F6"
                      opacity="0.85"
                    />
                  </svg>
                </span>
                <span className="font-heading text-[17px] font-semibold tracking-[-0.02em] text-theme">
                  voatomy
                </span>
              </Link>
              <button
                type="button"
                className="grid h-9 w-9 place-items-center rounded-lg border border-theme bg-theme-subtle text-theme-s transition-colors hover:bg-theme-subtle"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="border-b border-theme px-5 py-4 space-y-3">
              <LanguageSwitcher variant="light" compact className="w-full" />
              <div className="flex gap-2">
                <Link
                  href={isLoggedIn ? dashboardUrl : localizedPath("/auth/login")}
                  onClick={() => setMobileOpen(false)}
                  className="flex flex-1 items-center justify-center rounded-full border border-fynk-ink/15 bg-white py-2.5 text-[15px] font-medium text-fynk-ink transition-colors hover:bg-fynk-surface-alt"
                >
                  {isLoggedIn ? t.nav.goToDashboard : t.nav.logIn}
                </Link>
                <Link
                  href={localizedPath("/demo")}
                  onClick={() => setMobileOpen(false)}
                  className="flex flex-1 items-center justify-center rounded-full bg-fynk-ink py-2.5 text-[15px] font-medium text-white transition-colors hover:bg-fynk-ink/90"
                >
                  {t.nav.getDemo}
                </Link>
              </div>
              {isLoggedIn && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    logout();
                  }}
                  className="w-full rounded-lg border border-theme py-2 text-[13px] font-medium text-theme-s transition-colors hover:bg-theme-subtle hover:text-theme"
                >
                  Sign out
                </button>
              )}
            </div>

            {/* Nav sections */}
            <div className="flex-1 px-5 py-4">
              <MobileSection
                title="Platform"
                expanded={mobileExpanded === "product"}
                onToggle={() =>
                  setMobileExpanded(mobileExpanded === "product" ? null : "product")
                }
              >
                {PRODUCTS.map((product) => (
                  <Link
                    key={product.key}
                    href={product.href}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all hover:bg-theme-subtle"
                    onClick={() => setMobileOpen(false)}
                  >
                    <ProductLogoBadge productKey={product.key} size="sm" />
                    <span className="font-heading font-semibold text-theme-s">{product.name}</span>
                    <span className="truncate text-xs text-theme-f">{product.tagline}</span>
                    <span
                      className={cn(
                        "ml-auto h-1.5 w-1.5 shrink-0 rounded-full",
                        STATUS_DOT[product.status],
                      )}
                    />
                  </Link>
                ))}
                <div className="mx-2 mt-2 rounded-xl border border-theme bg-theme-subtle/50 p-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-theme-f">
                    Product demos
                  </p>
                  <div className="mt-2 grid grid-cols-2 gap-1.5">
                    {PRODUCT_DEMO_LINKS.map((d) => (
                      <Link
                        key={`m-demo-${d.key}`}
                        href={d.href}
                        className="rounded-lg px-2 py-2 text-center text-xs font-semibold text-theme-s transition-colors hover:bg-theme-subtle hover:text-fynk-orange"
                        onClick={() => setMobileOpen(false)}
                      >
                        {d.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </MobileSection>

              {/* Solutions */}
              <MobileSection
                title="Solutions"
                expanded={mobileExpanded === "solutions"}
                onToggle={() =>
                  setMobileExpanded(mobileExpanded === "solutions" ? null : "solutions")
                }
              >
                <p className="px-3 pb-1.5 pt-1 text-[10px] font-bold uppercase tracking-widest text-theme-f">
                  By Role
                </p>
                {NAV_LINKS.solutions.byRole.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[15px] text-theme-s transition-all hover:bg-theme-subtle hover:text-theme"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span>{item.icon}</span>
                    <span>{item.title}</span>
                  </Link>
                ))}
                <p className="mt-2 px-3 pb-1.5 pt-1 text-[10px] font-bold uppercase tracking-widest text-theme-f">
                  By Use Case
                </p>
                {NAV_LINKS.solutions.byUseCase.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[15px] text-theme-s transition-all hover:bg-theme-subtle hover:text-theme"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span>{item.icon}</span>
                    <span>{item.title}</span>
                  </Link>
                ))}
                <p className="mt-2 px-3 pb-1.5 pt-1 text-[10px] font-bold uppercase tracking-widest text-theme-f">
                  By Industry
                </p>
                {NAV_LINKS.solutions.byIndustry.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[15px] text-theme-s transition-all hover:bg-theme-subtle hover:text-theme"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span>{item.icon}</span>
                    <span>{item.title}</span>
                  </Link>
                ))}
                <Link
                  href="/industries"
                  className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-[15px] font-semibold text-fynk-orange transition-all hover:bg-theme-subtle"
                  onClick={() => setMobileOpen(false)}
                >
                  View all industries
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </MobileSection>

              <Link
                href={localizedPath("/customers")}
                className="block rounded-xl px-3 py-2.5 text-[15px] font-medium text-theme-s transition-all hover:bg-theme-subtle hover:text-theme"
                onClick={() => setMobileOpen(false)}
              >
                {t.nav.customers}
              </Link>

              {/* Pricing (direct link) */}
              <Link
                href={localizedPath("/pricing")}
                className="block rounded-xl px-3 py-2.5 text-[15px] font-medium text-theme-s transition-all hover:bg-theme-subtle hover:text-theme"
                onClick={() => setMobileOpen(false)}
              >
                Pricing
              </Link>

              {/* Resources */}
              <MobileSection
                title="Resources"
                expanded={mobileExpanded === "resources"}
                onToggle={() =>
                  setMobileExpanded(mobileExpanded === "resources" ? null : "resources")
                }
              >
                {NAV_LINKS.resources.learn.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[15px] text-theme-s transition-all hover:bg-theme-subtle hover:text-theme"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span>{item.icon}</span>
                    <span>{item.title}</span>
                  </Link>
                ))}
                <div className="divider-green my-2" />
                {NAV_LINKS.resources.company.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[15px] text-theme-s transition-all hover:bg-theme-subtle hover:text-theme"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span>{item.icon}</span>
                    <span>{item.title}</span>
                  </Link>
                ))}
                <p className="px-3 pb-1.5 pt-3 text-[10px] font-bold uppercase tracking-widest text-theme-f">
                  Legal
                </p>
                {NAV_LINKS.resources.legal.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[15px] text-theme-s transition-all hover:bg-theme-subtle hover:text-theme"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span>{item.icon}</span>
                    <span>{item.title}</span>
                  </Link>
                ))}
              </MobileSection>
            </div>

            {/* Bottom */}
            <div className="border-t border-theme px-5 py-4">
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-theme-f">
                {[
                  { label: "About", href: "/about" },
                  { label: "Careers", href: "/careers" },
                  { label: "Contact", href: "/contact" },
                  { label: "Security", href: "/security" },
                  { label: "Privacy", href: "/privacy" },
                  { label: "Terms", href: "/terms" },
                  { label: "Cookies", href: "/cookies" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="transition-colors hover:text-theme-m"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// --- Mobile collapsible section ---

function MobileSection({
  title,
  children,
  expanded,
  onToggle,
}: {
  title: string;
  children: React.ReactNode;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-theme">
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-[15px] font-medium text-theme-s transition-colors hover:text-theme"
        onClick={onToggle}
        aria-expanded={expanded}
      >
        {title}
        <ChevronDown
          className={cn(
            "h-4 w-4 text-theme-f transition-transform duration-200",
            expanded && "rotate-180 text-fynk-orange"
          )}
        />
      </button>
      {expanded && (
        <div className="animate-menu-in pb-2 pl-1">{children}</div>
      )}
    </div>
  );
}
