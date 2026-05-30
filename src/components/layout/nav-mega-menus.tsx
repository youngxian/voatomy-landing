"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight, ExternalLink, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  PRODUCTS,
  PRODUCT_DEMO_LINKS,
  NAV_LINKS,
} from "@/lib/constants";
import { ProductLogoMark, type ProductLogoKey } from "@/components/icons/product-logos";

const STATUS_STYLES: Record<string, { pill: string; dot: string }> = {
  available: {
    pill: "bg-emerald-50 text-emerald-700 ring-emerald-200/60",
    dot: "bg-emerald-500",
  },
  "coming-soon": {
    pill: "bg-amber-50 text-amber-700 ring-amber-200/60",
    dot: "bg-amber-400",
  },
  future: {
    pill: "bg-slate-100 text-slate-600 ring-slate-200/60",
    dot: "bg-slate-400",
  },
};

function productAccent(color: string) {
  return typeof color === "string" && !color.startsWith("url") ? color : "#004838";
}

function ProductLogoBadge({
  productKey,
  size = "md",
  className,
}: {
  productKey: ProductLogoKey | string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = { sm: "h-9 w-9", md: "h-11 w-11", lg: "h-14 w-14" };
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-xl shadow-sm ring-1 ring-black/[0.06] transition-transform duration-300 group-hover:scale-105",
        sizes[size],
        className,
      )}
    >
      <ProductLogoMark product={productKey} className="h-full w-full" />
    </div>
  );
}

function MegaEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-handwriting text-[1.15rem] font-bold leading-none text-brand sm:text-[1.25rem]">
      {children}
    </p>
  );
}

function MegaSectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-fynk-muted">
      {children}
    </p>
  );
}

function StatusPill({ status, label }: { status: string; label: string }) {
  const styles = STATUS_STYLES[status] ?? STATUS_STYLES.future;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1",
        styles.pill,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", styles.dot)} />
      {label}
    </span>
  );
}

export function ProductMegaMenu({ onNavigate }: { onNavigate?: () => void }) {
  const coreProducts = PRODUCTS.filter((p) => p.key !== "nexus");
  const nexus = PRODUCTS.find((p) => p.key === "nexus")!;

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-fynk-border/80 bg-gradient-to-b from-white via-white to-[#F9FAFB] shadow-[0_24px_64px_rgba(17,24,39,0.12)]">
      <div className="border-b border-fynk-border/60 bg-[#FAFBFC] px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <MegaEyebrow>Six products. One system.</MegaEyebrow>
            <h3 className="mt-2 font-heading text-xl font-bold tracking-[-0.02em] text-fynk-ink sm:text-[1.35rem]">
              The Voatomy platform
            </h3>
            <p className="mt-1 max-w-md text-sm leading-relaxed text-fynk-muted">
              Start with what you need. Scale when ready — every product connects through NEXUS.
            </p>
          </div>
          <Link
            href="/products/atlas"
            onClick={onNavigate}
            className="inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-brand-light px-4 py-2 text-xs font-semibold text-brand transition-colors hover:bg-brand-light/80"
          >
            Start with ATLAS
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      <div className="px-5 py-5 sm:px-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
          <div className="grid gap-2.5 sm:grid-cols-2">
            {coreProducts.map((product) => {
              const accent = productAccent(product.color);
              return (
                <Link
                  key={product.key}
                  href={product.href}
                  onClick={onNavigate}
                  className="group relative flex gap-3.5 overflow-hidden rounded-2xl border border-fynk-border/70 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/25 hover:shadow-[0_12px_32px_rgba(0,72,56,0.08)]"
                  role="menuitem"
                >
                  <div
                    className="absolute inset-y-0 left-0 w-1 rounded-l-2xl opacity-0 transition-opacity group-hover:opacity-100"
                    style={{ backgroundColor: accent }}
                    aria-hidden
                  />
                  <ProductLogoBadge productKey={product.key} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="font-heading text-[15px] font-bold tracking-[-0.01em] text-fynk-ink">
                        {product.name}
                      </span>
                      <span className="text-xs font-medium" style={{ color: accent }}>
                        {product.tagline}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-fynk-muted line-clamp-2">
                      {product.description}
                    </p>
                    <div className="mt-2.5">
                      <StatusPill status={product.status} label={product.statusLabel} />
                    </div>
                  </div>
                  <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-fynk-muted/40 transition-all group-hover:translate-x-0.5 group-hover:text-brand" />
                </Link>
              );
            })}
          </div>

          <Link
            href={nexus.href}
            onClick={onNavigate}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#161b26] p-5 text-white shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
            role="menuitem"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(14,165,233,0.35), transparent 70%)",
              }}
              aria-hidden
            />
            <div className="relative">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-300" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-300/90">
                  Full platform
                </span>
              </div>
              <ProductLogoBadge productKey="nexus" size="lg" className="mt-4 ring-white/10" />
              <h4 className="mt-4 font-heading text-lg font-bold tracking-[-0.02em]">
                {nexus.name}
              </h4>
              <p className="mt-1 text-sm font-medium text-emerald-200/80">{nexus.tagline}</p>
              <p className="mt-2 text-xs leading-relaxed text-white/60">{nexus.description}</p>
              <div className="mt-4">
                <StatusPill status={nexus.status} label={nexus.statusLabel} />
              </div>
              <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-emerald-300 transition-all group-hover:gap-2">
                Explore NEXUS
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        </div>

        <div className="mt-6 rounded-2xl border border-fynk-border/60 bg-[#F3F4F6]/80 p-4">
          <MegaSectionLabel>Interactive demos</MegaSectionLabel>
          <p className="mt-1 text-xs text-fynk-muted">Guided tours for every product in the platform.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {PRODUCT_DEMO_LINKS.map((d) => (
              <Link
                key={d.key}
                href={d.href}
                onClick={onNavigate}
                className="group inline-flex items-center gap-2 rounded-full border border-fynk-border bg-white px-3 py-1.5 text-xs font-semibold text-fynk-ink transition-all hover:border-brand/30 hover:bg-brand-light/50 hover:text-brand"
                role="menuitem"
              >
                <ProductLogoMark product={d.key} className="h-5 w-5" />
                {d.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SolutionsMegaMenu({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-fynk-border/80 bg-white shadow-[0_24px_64px_rgba(17,24,39,0.12)]">
      <div className="border-b border-fynk-border/60 bg-[#FAFBFC] px-5 py-4 sm:px-6">
        <MegaEyebrow>Built for every team</MegaEyebrow>
        <h3 className="mt-2 font-heading text-xl font-bold tracking-[-0.02em] text-fynk-ink">
          Solutions that fit your workflow
        </h3>
      </div>
      <div className="grid gap-6 px-5 py-5 sm:px-6 lg:grid-cols-3">
        {(
          [
            { label: "By role", items: NAV_LINKS.solutions.byRole },
            { label: "By use case", items: NAV_LINKS.solutions.byUseCase },
            { label: "By industry", items: NAV_LINKS.solutions.byIndustry, compact: true },
          ] as const
        ).map(({ label, items, ...rest }) => {
          const compact = "compact" in rest && rest.compact;
          return (
          <div key={label}>
            <MegaSectionLabel>{label}</MegaSectionLabel>
            <div className={cn("mt-3 space-y-1", compact && "grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-1")}>
              {items.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={onNavigate}
                  className="group flex items-start gap-3 rounded-xl p-3 transition-all hover:bg-brand-light/40"
                  role="menuitem"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F3F4F6] text-lg transition-colors group-hover:bg-white group-hover:shadow-sm">
                    {item.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-heading text-sm font-bold text-fynk-ink transition-colors group-hover:text-brand">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-fynk-muted line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-fynk-muted/30 transition-all group-hover:translate-x-0.5 group-hover:text-brand" />
                </Link>
              ))}
            </div>
            {label === "By industry" && (
              <Link
                href="/industries"
                onClick={onNavigate}
                className="mt-3 inline-flex items-center gap-1 px-3 text-xs font-semibold text-brand transition-all hover:gap-2"
              >
                View all industries
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
          );
        })}
      </div>
    </div>
  );
}

export function ResourcesMegaMenu({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-fynk-border/80 bg-white shadow-[0_24px_64px_rgba(17,24,39,0.12)]">
      <div className="border-b border-fynk-border/60 bg-[#FAFBFC] px-5 py-4 sm:px-6">
        <MegaEyebrow>Learn & connect</MegaEyebrow>
        <h3 className="mt-2 font-heading text-xl font-bold tracking-[-0.02em] text-fynk-ink">
          Resources
        </h3>
      </div>
      <div className="grid gap-6 px-5 py-5 sm:px-6 lg:grid-cols-2">
        <div>
          <MegaSectionLabel>Learn</MegaSectionLabel>
          <div className="mt-3 space-y-1">
            {NAV_LINKS.resources.learn.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={onNavigate}
                className="group flex items-start gap-3 rounded-xl p-3 transition-all hover:bg-brand-light/40"
                role="menuitem"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F3F4F6] text-base group-hover:bg-white group-hover:shadow-sm">
                  {item.icon}
                </span>
                <div>
                  <p className="font-heading text-sm font-bold text-fynk-ink group-hover:text-brand">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-xs text-fynk-muted">{item.description}</p>
                </div>
                <ChevronRight className="ml-auto mt-1 h-4 w-4 text-fynk-muted/30 group-hover:text-brand" />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <MegaSectionLabel>Company</MegaSectionLabel>
          <div className="mt-3 space-y-1">
            {NAV_LINKS.resources.company.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={onNavigate}
                className="group flex items-start gap-3 rounded-xl p-3 transition-all hover:bg-brand-light/40"
                role="menuitem"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F3F4F6] text-base">
                  {item.icon}
                </span>
                <div>
                  <p className="font-heading text-sm font-bold text-fynk-ink group-hover:text-brand">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-xs text-fynk-muted">{item.description}</p>
                </div>
                <ChevronRight className="ml-auto mt-1 h-4 w-4 text-fynk-muted/30 group-hover:text-brand" />
              </Link>
            ))}
          </div>

          <MegaSectionLabel>Legal</MegaSectionLabel>
          <div className="mt-3 space-y-1">
            {NAV_LINKS.resources.legal.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={onNavigate}
                className="group flex items-center gap-3 rounded-xl p-2.5 text-sm transition-all hover:bg-[#F3F4F6]"
                role="menuitem"
              >
                <span className="text-fynk-muted">{item.icon}</span>
                <span className="font-medium text-fynk-ink group-hover:text-brand">{item.title}</span>
              </Link>
            ))}
          </div>

          <div className="mt-5 rounded-xl border border-fynk-orange/20 bg-fynk-orange-light/50 p-4">
            <MegaSectionLabel>Featured</MegaSectionLabel>
            <Link
              href={NAV_LINKS.resources.featuredPost.href}
              onClick={onNavigate}
              className="group mt-2 flex items-center gap-2 font-heading text-sm font-semibold text-fynk-ink transition-colors hover:text-brand"
            >
              <span className="flex-1">{NAV_LINKS.resources.featuredPost.title}</span>
              <ExternalLink className="h-3.5 w-3.5 text-brand opacity-60 group-hover:opacity-100" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ProductLogoBadge, StatusPill };
