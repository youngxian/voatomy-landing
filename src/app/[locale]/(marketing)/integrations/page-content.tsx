"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Chip } from "@/components/ui/chip";
import Link from "next/link";
import {
  Search,
  ArrowRight,
  Link2,
  Settings2,
  RefreshCw,
  Code2,
  Webhook,
  MessageSquarePlus,
  CheckCircle2,
  Clock,
  Blocks,
  Filter,
  Shield,
  Zap,
  X,
} from "lucide-react";
import { useLocale } from "@/i18n/locale-provider";
import { FynkButtonPrimary, FynkHeading, FynkSubheading } from "@/components/marketing/fynk-primitives";
import { BrandIcon, getBrandColor } from "@/components/icons/brand-icons";
import { IntegrationsHeroCloud } from "@/components/integrations/integrations-hero-cloud";
import { IntegrationsSpotlightCards } from "@/components/integrations/integrations-spotlight-cards";
import { IntegrationsHelpCarousel } from "@/components/integrations/integrations-help-carousel";
import {
  FEATURED_INTEGRATIONS,
  PRODUCT_FILTERS,
  INTEGRATIONS_CATALOG,
  categoryCounts,
  PRODUCT_BADGE_COLORS,
  type IntegrationCategory,
} from "@/lib/integrations-page-data";

const CATEGORY_ICONS: Record<string, typeof Code2> = {
  Code: Code2,
  Project: Settings2,
  Design: Blocks,
  CRM: Link2,
  Support: Shield,
  Revenue: Zap,
  Monitoring: RefreshCw,
  Communication: Zap,
  Documents: Blocks,
  Import: Settings2,
};

const BRAND_ICON_NAMES = new Set([
  "GitHub", "GitLab", "Jira", "Linear", "Figma", "Slack", "Salesforce", "HubSpot",
  "Datadog", "Zendesk", "Notion", "Gong", "Freshdesk", "Microsoft Teams", "PagerDuty", "Sentry",
]);

function useScrollAnimation() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    document.querySelectorAll(".animate-on-scroll").forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);
}

function IntegrationLogo({
  name,
  color,
  abbr,
  size = 36,
}: {
  name: string;
  color: string;
  abbr: string;
  size?: number;
}) {
  if (BRAND_ICON_NAMES.has(name)) {
    return <BrandIcon name={name} size={size} colored className="shrink-0" />;
  }
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-xl text-xs font-bold text-white shadow-sm"
      style={{ backgroundColor: color, width: size, height: size }}
    >
      {abbr}
    </span>
  );
}

function IntegrationIconTile({
  name,
  color,
  abbr,
}: {
  name: string;
  color: string;
  abbr: string;
}) {
  const brandColor = BRAND_ICON_NAMES.has(name) ? getBrandColor(name) : color;
  return (
    <div
      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 shadow-sm sm:h-[72px] sm:w-[72px]"
      style={{
        borderColor: `${brandColor}45`,
        backgroundColor: `${brandColor}18`,
        boxShadow: `0 4px 16px ${brandColor}15`,
      }}
    >
      <IntegrationLogo name={name} color={color} abbr={abbr} size={36} />
    </div>
  );
}

export default function IntegrationsPage() {
  const { localizedPath } = useLocale();
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<IntegrationCategory | "All">("All");
  const [activeProduct, setActiveProduct] = useState("All");
  useScrollAnimation();

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const categories = categoryCounts();
  const hasFilters = activeCategory !== "All" || activeProduct !== "All" || searchQuery.trim().length > 0;

  const filteredIntegrations = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return INTEGRATIONS_CATALOG.filter((item) => {
      if (activeCategory !== "All" && item.category !== activeCategory) return false;
      if (activeProduct !== "All" && !item.products.includes(activeProduct)) return false;
      if (q) {
        const haystack = `${item.name} ${item.category} ${item.description} ${item.products.join(" ")}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [activeCategory, activeProduct, searchQuery]);

  const clearFilters = () => {
    setActiveCategory("All");
    setActiveProduct("All");
    setSearchQuery("");
  };

  return (
    <div className="relative overflow-hidden bg-white">
      <IntegrationsHeroCloud
        heroLoaded={heroLoaded}
        exploreHref="#marketplace"
        integrateHref="/auth/signup"
      />

      <IntegrationsSpotlightCards docsHref={localizedPath("/docs")} />

      {/* Marketplace */}
      <section id="marketplace" className="scroll-mt-28 bg-white px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-container">
          <div className="mx-auto mb-12 max-w-2xl text-center animate-on-scroll">
            <FynkHeading as="h2" className="text-heading-2 sm:text-display-3">
              Integration marketplace
            </FynkHeading>
            <FynkSubheading className="mt-4">
              Browse 30+ native connectors. Filter by category or Voatomy product — connect in minutes.
            </FynkSubheading>

            <div className="mx-auto mt-8 flex max-w-lg items-center gap-3 rounded-full border-2 border-fynk-border bg-fynk-surface-alt px-5 py-3.5 shadow-sm">
              <Search className="h-5 w-5 shrink-0 text-fynk-orange" />
              <input
                type="search"
                placeholder="Search integrations…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-body-base text-fynk-ink placeholder:text-fynk-muted focus:outline-none"
              />
              {searchQuery && (
                <button type="button" onClick={() => setSearchQuery("")} className="text-fynk-muted hover:text-fynk-ink">
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          {/* Filters */}
          <div className="animate-on-scroll mb-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Filter className="h-5 w-5 shrink-0 text-fynk-orange" />
              <div className="flex flex-1 flex-wrap items-center gap-2">
                {categories.map(({ label, count }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setActiveCategory(label)}
                    className={cn(
                      "cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-all",
                      activeCategory === label
                        ? "bg-fynk-ink text-white shadow-md"
                        : "bg-fynk-surface text-fynk-muted hover:bg-fynk-border/40 hover:text-fynk-ink",
                    )}
                  >
                    {label} ({count})
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-fynk-muted">Product:</span>
              {PRODUCT_FILTERS.map((prod) => (
                <button
                  key={prod}
                  type="button"
                  onClick={() => setActiveProduct(prod)}
                  className={cn(
                    "cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-all",
                    activeProduct === prod
                      ? "bg-fynk-orange text-white shadow-md"
                      : "bg-fynk-surface text-fynk-muted hover:bg-fynk-border/40",
                  )}
                  style={
                    activeProduct === prod && prod !== "All"
                      ? { backgroundColor: PRODUCT_BADGE_COLORS[prod] ?? undefined }
                      : undefined
                  }
                >
                  {prod}
                </button>
              ))}
              {hasFilters && (
                <button type="button" onClick={clearFilters} className="text-sm font-medium text-fynk-orange hover:underline">
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {/* Featured row */}
          <div className="mb-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 animate-on-scroll">
            {FEATURED_INTEGRATIONS.map((item) => (
              <Link
                key={item.slug}
                href={localizedPath(`/integrations/${item.slug}`)}
                className="group overflow-hidden rounded-3xl border-2 border-fynk-border transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative flex h-44 items-end p-6 sm:h-48" style={{ background: item.gradient }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  <div
                    className="relative flex h-[72px] w-[72px] items-center justify-center rounded-2xl border-2 border-white/30 bg-white shadow-xl transition-transform group-hover:scale-105"
                  >
                    <BrandIcon name={item.name} size={44} colored />
                  </div>
                </div>
                <div className="bg-white p-5 sm:p-6">
                  <p className="text-sm font-bold uppercase tracking-wide" style={{ color: item.accent }}>
                    {item.name}
                  </p>
                  <p className="mt-2 text-body-base font-semibold leading-snug text-fynk-ink group-hover:text-fynk-orange sm:text-body-lg">
                    {item.headline}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Grid */}
          <div className="mb-6 flex items-center justify-between animate-on-scroll">
            <span className="text-body-base font-medium text-fynk-muted">
              {filteredIntegrations.length} of {INTEGRATIONS_CATALOG.length} integrations
            </span>
          </div>

          {filteredIntegrations.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredIntegrations.map((item, i) => {
                const CategoryIcon = CATEGORY_ICONS[item.category] ?? Blocks;
                const categoryColor = getBrandColor(item.name);
                const card = (
                  <Card
                    variant="light"
                    className={cn(
                      "animate-on-scroll h-full p-5 transition-all hover:-translate-y-0.5 hover:border-fynk-orange/50 hover:shadow-lg sm:p-6",
                      `stagger-${(i % 3) + 1}`,
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <IntegrationIconTile name={item.name} color={item.color} abbr={item.abbr} />
                      <div className="min-w-0 flex-1 pt-1">
                        <div className="flex items-center gap-2">
                          <h3 className="truncate font-heading text-body-lg font-bold text-fynk-ink sm:text-heading-4">{item.name}</h3>
                          {item.status === "coming-soon" ? (
                            <span className="flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                              <Clock className="h-3 w-3" />
                              Soon
                            </span>
                          ) : (
                            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                          )}
                        </div>
                        <div
                          className="mt-1.5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium"
                          style={{
                            backgroundColor: `${categoryColor}12`,
                            color: categoryColor,
                          }}
                        >
                          <CategoryIcon className="h-3.5 w-3.5" />
                          {item.category}
                        </div>
                      </div>
                    </div>
                    <p className="mt-4 line-clamp-2 text-body-sm leading-relaxed text-fynk-muted sm:text-body-base">
                      {item.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {item.products.map((p) => (
                        <Chip key={p} dotColor={PRODUCT_BADGE_COLORS[p]} className="text-xs font-semibold">
                          {p}
                        </Chip>
                      ))}
                    </div>
                  </Card>
                );
                return item.status === "available" ? (
                  <Link key={item.slug} href={localizedPath(`/integrations/${item.slug}`)} className="block">
                    {card}
                  </Link>
                ) : (
                  <div key={item.slug}>{card}</div>
                );
              })}
            </div>
          ) : (
            <div className="animate-on-scroll py-16 text-center">
              <Search className="mx-auto mb-4 h-10 w-10 text-fynk-muted" />
              <h3 className="font-heading text-heading-4 font-bold text-fynk-ink">No integrations found</h3>
              <p className="mt-2 text-body-sm text-fynk-muted">Try a different search or adjust filters.</p>
              <button type="button" onClick={clearFilters} className="mt-4 text-sm font-medium text-fynk-orange hover:underline">
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* API strip */}
      <Section variant="white" className="pb-12">
        <Card className="mx-auto max-w-5xl border-2 border-fynk-border animate-on-scroll">
          <div className="flex flex-col items-center gap-8 p-10 sm:flex-row sm:p-12">
            <div className="flex shrink-0 gap-4">
              {[
                { Icon: Code2, bg: "#F05A2818", color: "#F05A28" },
                { Icon: Webhook, bg: "#6366F118", color: "#6366F1" },
                { Icon: Blocks, bg: "#10B98118", color: "#10B981" },
              ].map(({ Icon, bg, color }, i) => (
                <div
                  key={i}
                  className="flex h-20 w-20 items-center justify-center rounded-2xl border-2 shadow-sm"
                  style={{ backgroundColor: bg, borderColor: `${color}35` }}
                >
                  <Icon className="h-9 w-9" style={{ color }} />
                </div>
              ))}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <FynkHeading as="h3" className="text-left sm:text-heading-2">
                Build your own integration
              </FynkHeading>
              <p className="mt-3 text-body-base text-fynk-muted">
                REST API · Webhooks · TypeScript, Python & Go SDKs · Full export anytime
              </p>
              <FynkButtonPrimary href={localizedPath("/docs")} variant="ink" className="mt-6 inline-flex px-6 py-3 text-base">
                Read the API docs
                <ArrowRight className="ml-2 h-5 w-5" />
              </FynkButtonPrimary>
            </div>
          </div>
        </Card>
      </Section>

      <IntegrationsHelpCarousel localizedPath={localizedPath} />

      {/* Final CTA */}
      <Section variant="amber" container={false} className="py-20 sm:py-28">
        <div className="relative mx-auto max-w-2xl animate-on-scroll px-4 text-center">
          <MessageSquarePlus className="mx-auto mb-5 h-10 w-10 text-fynk-orange" />
          <FynkHeading as="h2" className="mb-4">
            Don&apos;t see your tool?
          </FynkHeading>
          <FynkSubheading className="mb-8">
            We ship new integrations every month. Request yours — typically live in 4–6 weeks.
          </FynkSubheading>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <FynkButtonPrimary href={localizedPath("/contact?topic=integration-request")} variant="ink">
              Request an integration
            </FynkButtonPrimary>
            <FynkButtonPrimary href="/auth/signup" variant="orange">
              Start free trial
            </FynkButtonPrimary>
          </div>
        </div>
      </Section>
    </div>
  );
}
