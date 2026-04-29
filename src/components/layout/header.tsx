"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, ChevronRight, ChevronDown, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-provider";
import {
  NAV_LINKS,
  PRODUCTS,
  PLATFORM_DIFFERENTIATORS,
  PRODUCT_DEMO_LINKS,
} from "@/lib/constants";
import { trackEvent, trackConversion } from "@/lib/analytics";
import { useSession } from "@/hooks/use-session";

type MegaMenuType = "product" | "solutions" | "resources" | null;

export function Header() {
  const [activeMega, setActiveMega] = React.useState<MegaMenuType>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileExpanded, setMobileExpanded] = React.useState<string | null>(null);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout>>(null);
  const { isLoggedIn, dashboardUrl, logout } = useSession();
  const homeLight = !scrolled;

  // Scroll listener for glassmorphism effect
  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
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
    available: "bg-accent-lime",
    "coming-soon": "bg-yellow-400",
    future: "bg-theme-f",
  };

  const STATUS_RING: Record<string, string> = {
    available: "ring-accent-lime/30",
    "coming-soon": "ring-yellow-400/30",
    future: "ring-theme",
  };

  return (
    <>
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent-lime focus:px-4 focus:py-2 focus:text-teal focus:font-semibold"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-500",
          homeLight
            ? "bg-transparent border-b border-transparent"
            : scrolled
            ? "border-b border-theme bg-teal-dark/95 shadow-sm shadow-black/25 backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex min-h-[52px] max-w-container items-center justify-between gap-3 px-4 sm:px-6 lg:min-h-[60px] lg:gap-4">
          {/* PagerDuty-style: logo + primary nav grouped on the left */}
          <div className="flex min-w-0 flex-1 items-center gap-5 sm:gap-7 lg:gap-10">
            <Link
              href="/"
              className="group inline-flex shrink-0 items-center gap-2.5 rounded-lg py-1.5 transition-opacity hover:opacity-85"
            >
              <span
                className={cn(
                  "grid h-[22px] w-[22px] place-items-center rounded-[6px] shadow-sm",
                  homeLight ? "bg-teal shadow-teal/25" : "bg-accent-lime shadow-accent-lime/25",
                )}
                aria-hidden="true"
              >
                <span className="block h-2.5 w-2.5 rounded-[3px] bg-white/30" />
              </span>
              <span
                className={cn(
                  "text-[15px] font-bold tracking-tight",
                  homeLight ? "text-charcoal" : "text-white",
                )}
              >
                Voatomy
              </span>
            </Link>

            <nav className="hidden min-w-0 items-center gap-0.5 lg:flex" aria-label="Primary">
              <button
                type="button"
                className={cn(
                  "inline-flex h-10 items-center gap-1 rounded-md px-3.5 text-sm font-semibold transition-colors",
                  homeLight
                    ? "text-charcoal/75 hover:bg-charcoal/[0.06] hover:text-charcoal"
                    : "text-white/75 hover:bg-white/10 hover:text-white",
                  activeMega === "product" &&
                    (homeLight ? "bg-charcoal/[0.08] text-charcoal" : "bg-white/10 text-white"),
                )}
                onClick={() => openMega(activeMega === "product" ? null : "product")}
                onMouseEnter={() => openMega("product")}
                onMouseLeave={closeMega}
                aria-expanded={activeMega === "product"}
                aria-haspopup="true"
              >
                Platform
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 opacity-55 transition-transform duration-200",
                    activeMega === "product" && "rotate-180 opacity-90",
                  )}
                />
              </button>

              <button
                type="button"
                className={cn(
                  "inline-flex h-10 items-center gap-1 rounded-md px-3.5 text-sm font-semibold transition-colors",
                  homeLight
                    ? "text-charcoal/75 hover:bg-charcoal/[0.06] hover:text-charcoal"
                    : "text-white/75 hover:bg-white/10 hover:text-white",
                  activeMega === "solutions" &&
                    (homeLight ? "bg-charcoal/[0.08] text-charcoal" : "bg-white/10 text-white"),
                )}
                onClick={() => openMega(activeMega === "solutions" ? null : "solutions")}
                onMouseEnter={() => openMega("solutions")}
                onMouseLeave={closeMega}
                aria-expanded={activeMega === "solutions"}
                aria-haspopup="true"
              >
                Solutions
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 opacity-55 transition-transform duration-200",
                    activeMega === "solutions" && "rotate-180 opacity-90",
                  )}
                />
              </button>

              <Link
                href="/pricing"
                className={cn(
                  "inline-flex h-10 items-center rounded-md px-3.5 text-sm font-semibold transition-colors",
                  homeLight
                    ? "text-charcoal/75 hover:bg-charcoal/[0.06] hover:text-charcoal"
                    : "text-white/75 hover:bg-white/10 hover:text-white",
                )}
              >
                Pricing
              </Link>

              <button
                type="button"
                className={cn(
                  "inline-flex h-10 items-center gap-1 rounded-md px-3.5 text-sm font-semibold transition-colors",
                  homeLight
                    ? "text-charcoal/75 hover:bg-charcoal/[0.06] hover:text-charcoal"
                    : "text-white/75 hover:bg-white/10 hover:text-white",
                  activeMega === "resources" &&
                    (homeLight ? "bg-charcoal/[0.08] text-charcoal" : "bg-white/10 text-white"),
                )}
                onClick={() => openMega(activeMega === "resources" ? null : "resources")}
                onMouseEnter={() => openMega("resources")}
                onMouseLeave={closeMega}
                aria-expanded={activeMega === "resources"}
                aria-haspopup="true"
              >
                Resources
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 opacity-55 transition-transform duration-200",
                    activeMega === "resources" && "rotate-180 opacity-90",
                  )}
                />
              </button>
            </nav>
          </div>

          {/* Right cluster: divider + contact + demo + primary CTA (PagerDuty-style) */}
          <div className="hidden shrink-0 items-center gap-2 lg:flex xl:gap-2.5">
            <span
              className={cn(
                "hidden h-6 w-px shrink-0 sm:block",
                homeLight ? "bg-charcoal/15" : "bg-white/20",
              )}
              aria-hidden="true"
            />
            <Link
              href="/contact"
              className={cn(
                "whitespace-nowrap px-2 text-sm font-semibold transition-colors",
                homeLight ? "text-charcoal/80 hover:text-charcoal" : "text-white/80 hover:text-white",
              )}
            >
              Contact
            </Link>
            {isLoggedIn && (
              <button
                type="button"
                onClick={logout}
                className={cn(
                  "whitespace-nowrap px-1 text-sm font-semibold transition-colors",
                  homeLight ? "text-charcoal/70 hover:text-charcoal" : "text-white/70 hover:text-white",
                )}
              >
                Sign out
              </button>
            )}
            <Button
              variant="secondary"
              size="sm"
              className={cn(
                "rounded-lg border font-semibold shadow-none",
                homeLight
                  ? "border-charcoal/15 bg-white/70 text-charcoal hover:bg-white hover:border-charcoal/20"
                  : "border-white/20 bg-transparent text-white hover:bg-white/10 hover:border-white/30",
              )}
              asChild
            >
              <Link href="/demo" data-track-cta="header-watch-demo" data-track-cta-location="header">
                Watch demo
              </Link>
            </Button>
            <Button
              variant="primary"
              size="sm"
              className={cn(
                "gap-1 rounded-lg px-4 font-semibold shadow-sm",
                homeLight ? "bg-teal text-white hover:bg-teal-dark" : "bg-accent-lime text-teal hover:bg-accent-lime/90",
              )}
              asChild
            >
              <Link
                href={isLoggedIn ? dashboardUrl : "/auth/signup"}
                data-track-cta={isLoggedIn ? "header-dashboard" : "header-signup"}
                data-track-cta-text={isLoggedIn ? "Go to Dashboard" : "Get Early Access"}
                data-track-cta-location="header"
                onClick={() => !isLoggedIn && trackConversion("signup_start", { source: "header" })}
              >
                {isLoggedIn ? "Go to Dashboard" : "Get Early Access"}
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
            <div className={cn("pl-0.5", homeLight ? "text-charcoal" : "text-white")}>
              <ThemeToggle />
            </div>
          </div>

          {/* ---- Mobile hamburger ---- */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-lg border border-theme bg-theme-subtle text-theme-s transition-colors hover:bg-theme-subtle"
              onClick={() => {
                setMobileOpen(true);
                trackEvent("navigation", "mobile_menu_open", "Mobile menu opened");
              }}
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ================================================================
            MEGA MENUS
        ================================================================ */}

        {/* -- Product Mega Menu -- */}
        {activeMega === "product" && (
          <div
            className="absolute left-0 right-0 top-full animate-menu-in border-t border-white/10 bg-teal-dark/95 dark-section shadow-2xl backdrop-blur-2xl transition-colors duration-300"
            onMouseEnter={() => openMega("product")}
            onMouseLeave={closeMega}
            role="menu"
            aria-label="Platform menu"
          >
            <div className="mx-auto max-w-container px-6 pb-8 pt-6">
              {/* Section labels */}
              <div className="mb-5 flex items-baseline justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-theme-f">
                    Products
                  </p>
                  <p className="mt-1 text-sm text-theme-m">
                    Start with what you need. Scale when ready.
                  </p>
                </div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-theme-f">
                  Platform
                </p>
              </div>

              <div className="grid grid-cols-3 gap-5">
                {/* Left: 6 products in 2-col grid */}
                <div className="col-span-2 grid grid-cols-2 gap-3">
                  {PRODUCTS.filter((p) => p.key !== "nexus").map((product) => (
                    <Link
                      key={product.key}
                      href={product.href}
                      className="group flex gap-3 rounded-2xl border border-transparent p-3.5 transition-all hover:border-theme hover:bg-theme-subtle"
                      role="menuitem"
                    >
                      <span className="mt-0.5 text-lg">{product.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-theme">
                            {product.name}
                          </span>
                          <span className="truncate text-xs text-theme-m">
                            {product.tagline}
                          </span>
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-theme-m line-clamp-2">
                          {product.description}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <span
                            className={cn(
                              "h-1.5 w-1.5 rounded-full ring-2",
                              STATUS_DOT[product.status],
                              STATUS_RING[product.status]
                            )}
                          />
                          <span className="text-[11px] text-theme-m">
                            {product.statusLabel}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Right: NEXUS card */}
                <div>
                  {(() => {
                    const nexus = PRODUCTS.find((p) => p.key === "nexus")!;
                    return (
                      <Link
                        href={nexus.href}
                        className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:border-accent-lime/20 hover:bg-white/10"
                        role="menuitem"
                      >
                        <span className="text-xl">{nexus.icon}</span>
                        <span className="mt-3 text-sm font-bold text-theme">
                          {nexus.name}
                        </span>
                        <span className="text-xs text-accent-lime/70">
                          Full Organizational Nerve Center
                        </span>
                        <p className="mt-2 text-xs leading-relaxed text-theme-m">
                          {nexus.description}
                        </p>
                        <div className="mt-auto flex items-center gap-2 pt-4">
                          <span
                            className={cn(
                              "h-1.5 w-1.5 rounded-full ring-2",
                              STATUS_DOT[nexus.status],
                              STATUS_RING[nexus.status]
                            )}
                          />
                          <span className="text-[11px] text-theme-m">
                            {nexus.statusLabel}
                          </span>
                        </div>
                      </Link>
                    );
                  })()}
                </div>
              </div>

              {/* Differentiators bar */}
              <div className="mt-6 border-t border-theme pt-5">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-theme-f">
                  What Makes Voatomy Different
                </p>
                <div className="grid grid-cols-4 gap-5">
                  {PLATFORM_DIFFERENTIATORS.map((d) => (
                    <div key={d.title} className="flex items-start gap-2.5">
                      <span className="text-sm">{d.icon}</span>
                      <div>
                        <p className="text-xs font-semibold text-theme-s">
                          {d.title}
                        </p>
                        <p className="mt-0.5 text-[11px] leading-relaxed text-theme-f">
                          {d.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t border-theme pt-5">
                <div className="rounded-2xl border border-theme bg-theme-subtle/40 p-4">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-theme-f">
                    Product demos
                  </p>
                  <p className="mt-1 text-xs text-theme-m">
                    Guided tours for every product in the platform.
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-6">
                    {PRODUCT_DEMO_LINKS.map((d) => (
                      <Link
                        key={d.key}
                        href={d.href}
                        className="rounded-xl px-2.5 py-2 text-center text-xs font-semibold text-theme-s transition-colors hover:bg-theme-subtle hover:text-accent-lime"
                        role="menuitem"
                      >
                        {d.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* -- Solutions Mega Menu -- */}
        {activeMega === "solutions" && (
          <div
            className="absolute left-0 right-0 top-full animate-menu-in border-t border-white/10 bg-teal-dark/95 dark-section shadow-2xl backdrop-blur-2xl transition-colors duration-300"
            onMouseEnter={() => openMega("solutions")}
            onMouseLeave={closeMega}
            role="menu"
            aria-label="Solutions menu"
          >
            <div className="mx-auto max-w-container px-6 pb-8 pt-6">
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
                {/* By Role */}
                <div>
                  <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-theme-f">
                    By Role
                  </p>
                  <div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {NAV_LINKS.solutions.byRole.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="group flex items-start gap-2.5 rounded-2xl p-2.5 transition-all hover:bg-theme-subtle"
                        role="menuitem"
                      >
                        <span className="text-lg">{item.icon}</span>
                        <div>
                          <p className="text-sm font-semibold text-theme group-hover:text-accent-lime transition-colors">
                            {item.title}
                          </p>
                          <p className="mt-0.5 text-xs text-theme-m">
                            {item.description}
                          </p>
                        </div>
                        <ChevronRight className="ml-auto mt-1 h-3.5 w-3.5 text-theme-f opacity-0 transition-all group-hover:opacity-100 group-hover:text-accent-lime" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* By Use Case — Solutions Mega */}
                <div>
                  <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-theme-f">
                    By Use Case
                  </p>
                  <div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {NAV_LINKS.solutions.byUseCase.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="group flex items-start gap-2.5 rounded-2xl p-2.5 transition-all hover:bg-theme-subtle"
                        role="menuitem"
                      >
                        <span className="text-lg">{item.icon}</span>
                        <div>
                          <p className="text-sm font-semibold text-theme group-hover:text-accent-lime transition-colors">
                            {item.title}
                          </p>
                          <p className="mt-0.5 text-xs text-theme-m">
                            {item.description}
                          </p>
                        </div>
                        <ChevronRight className="ml-auto mt-1 h-3.5 w-3.5 text-theme-f opacity-0 transition-all group-hover:opacity-100 group-hover:text-accent-lime" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* By Industry */}
                <div>
                  <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-theme-f">
                    By Industry
                  </p>
                  <div className="grid grid-cols-2 gap-1">
                    {NAV_LINKS.solutions.byIndustry.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="group flex items-start gap-2 rounded-xl p-2 transition-all hover:bg-theme-subtle"
                        role="menuitem"
                      >
                        <span className="text-base">{item.icon}</span>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-theme group-hover:text-accent-lime transition-colors">
                            {item.title}
                          </p>
                          <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-theme-m">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/industries"
                    className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent-lime/90 transition-colors hover:text-accent-lime"
                    role="menuitem"
                  >
                    View all industries
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* -- Resources Mega Menu -- */}
        {activeMega === "resources" && (
          <div
            className="absolute left-0 right-0 top-full animate-menu-in border-t border-white/10 bg-teal-dark/95 dark-section shadow-2xl backdrop-blur-2xl transition-colors duration-300"
            onMouseEnter={() => openMega("resources")}
            onMouseLeave={closeMega}
            role="menu"
            aria-label="Resources menu"
          >
            <div className="mx-auto max-w-container px-6 pb-8 pt-6">
              <div className="grid grid-cols-2 gap-10">
                {/* Learn */}
                <div>
                  <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-theme-f">
                    Learn
                  </p>
                  <div className="space-y-1">
                    {NAV_LINKS.resources.learn.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="group flex items-start gap-3 rounded-2xl p-3 transition-all hover:bg-theme-subtle"
                        role="menuitem"
                      >
                        <span className="text-sm">{item.icon}</span>
                        <div>
                          <p className="text-sm font-semibold text-theme group-hover:text-accent-lime transition-colors">
                            {item.title}
                          </p>
                          <p className="mt-0.5 text-xs text-theme-m">
                            {item.description}
                          </p>
                        </div>
                        <ChevronRight className="ml-auto mt-1 h-3.5 w-3.5 text-theme-f opacity-0 transition-all group-hover:opacity-100 group-hover:text-accent-lime" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Company */}
                <div>
                  <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-theme-f">
                    Company
                  </p>
                  <div className="space-y-1">
                    {NAV_LINKS.resources.company.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="group flex items-start gap-3 rounded-2xl p-3 transition-all hover:bg-theme-subtle"
                        role="menuitem"
                      >
                        <span className="text-sm">{item.icon}</span>
                        <div>
                          <p className="text-sm font-semibold text-theme group-hover:text-accent-lime transition-colors">
                            {item.title}
                          </p>
                          <p className="mt-0.5 text-xs text-theme-m">
                            {item.description}
                          </p>
                        </div>
                        <ChevronRight className="ml-auto mt-1 h-3.5 w-3.5 text-theme-f opacity-0 transition-all group-hover:opacity-100 group-hover:text-accent-lime" />
                      </Link>
                    ))}

                    <p className="mb-2 mt-5 text-[11px] font-bold uppercase tracking-widest text-theme-f">
                      Legal
                    </p>
                    {NAV_LINKS.resources.legal.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="group flex items-start gap-3 rounded-2xl p-3 transition-all hover:bg-theme-subtle"
                        role="menuitem"
                      >
                        <span className="text-sm">{item.icon}</span>
                        <div>
                          <p className="text-sm font-semibold text-theme group-hover:text-accent-lime transition-colors">
                            {item.title}
                          </p>
                          <p className="mt-0.5 text-xs text-theme-m">
                            {item.description}
                          </p>
                        </div>
                        <ChevronRight className="ml-auto mt-1 h-3.5 w-3.5 text-theme-f opacity-0 transition-all group-hover:opacity-100 group-hover:text-accent-lime" />
                      </Link>
                    ))}
                  </div>

                  {/* Featured post */}
                  <div className="mt-5 border-t border-theme pt-4">
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-theme-f">
                      Featured
                    </p>
                    <Link
                      href={NAV_LINKS.resources.featuredPost.href}
                      className="group flex items-center gap-2 rounded-2xl p-3 text-sm font-medium text-theme-m transition-all hover:bg-theme-subtle hover:text-theme"
                    >
                      <span className="flex-1">
                        {NAV_LINKS.resources.featuredPost.title}
                      </span>
                      <ExternalLink className="h-3.5 w-3.5 text-brand opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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
          <div className="absolute bottom-0 right-0 top-0 flex w-full max-w-sm flex-col overflow-y-auto bg-teal-dark dark-section border-l border-white/10 transition-colors duration-300">
            {/* Panel header */}
            <div className="flex items-center justify-between border-b border-theme px-5 py-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2.5"
                onClick={() => setMobileOpen(false)}
              >
                <span
                  className="grid h-[22px] w-[22px] place-items-center rounded-[6px] bg-accent-lime"
                  aria-hidden="true"
                >
                  <span className="block h-2.5 w-2.5 rounded-[3px] bg-teal/30" />
                </span>
                <span className="text-[15px] font-[700] tracking-tight text-theme">
                  Voatomy
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

            <div className="border-b border-theme px-5 py-4 space-y-2">
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  className="flex-1 rounded-lg border-white/15 bg-transparent text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/contact" onClick={() => setMobileOpen(false)}>
                    Contact
                  </Link>
                </Button>
                <Button
                  variant="secondary"
                  className="flex-1 rounded-lg border-white/15 bg-transparent text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/demo" onClick={() => setMobileOpen(false)}>
                    Watch demo
                  </Link>
                </Button>
              </div>
              <Button
                variant="primary"
                className="w-full gap-1.5 rounded-lg bg-accent-lime text-teal hover:bg-accent-lime/90"
                asChild
              >
                <Link
                  href={isLoggedIn ? dashboardUrl : "/auth/login"}
                  onClick={() => setMobileOpen(false)}
                >
                  {isLoggedIn ? "Go to Dashboard" : "Get Early Access"}
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
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
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-theme-s transition-all hover:bg-theme-subtle hover:text-theme"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span>{product.icon}</span>
                    <span className="font-medium text-theme-s">{product.name}</span>
                    <span className="text-theme-f">- {product.tagline}</span>
                    <span
                      className={cn(
                        "ml-auto h-1.5 w-1.5 rounded-full",
                        STATUS_DOT[product.status]
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
                        className="rounded-lg px-2 py-2 text-center text-xs font-semibold text-theme-s transition-colors hover:bg-theme-subtle hover:text-accent-lime"
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
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-theme-s transition-all hover:bg-theme-subtle hover:text-theme"
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
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-theme-s transition-all hover:bg-theme-subtle hover:text-theme"
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
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-theme-s transition-all hover:bg-theme-subtle hover:text-theme"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span>{item.icon}</span>
                    <span>{item.title}</span>
                  </Link>
                ))}
                <Link
                  href="/industries"
                  className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-accent-lime transition-all hover:bg-theme-subtle"
                  onClick={() => setMobileOpen(false)}
                >
                  View all industries
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </MobileSection>

              {/* Pricing (direct link) */}
              <Link
                href="/pricing"
                className="block rounded-xl px-3 py-2.5 text-sm font-medium text-theme-s transition-all hover:bg-theme-subtle hover:text-theme"
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
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-theme-s transition-all hover:bg-theme-subtle hover:text-theme"
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
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-theme-s transition-all hover:bg-theme-subtle hover:text-theme"
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
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-theme-s transition-all hover:bg-theme-subtle hover:text-theme"
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
        className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-theme-s transition-colors hover:text-theme"
        onClick={onToggle}
        aria-expanded={expanded}
      >
        {title}
        <ChevronDown
          className={cn(
            "h-4 w-4 text-theme-f transition-transform duration-200",
            expanded && "rotate-180 text-accent-lime"
          )}
        />
      </button>
      {expanded && (
        <div className="animate-menu-in pb-2 pl-1">{children}</div>
      )}
    </div>
  );
}
