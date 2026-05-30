"use client";

import * as React from "react";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight, Check } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { FYNK } from "@/lib/fynk-theme";
import { BrandIcon, getBrandColor } from "@/components/icons/brand-icons";
import { FynkHeading, FynkSubheading } from "@/components/marketing/fynk-primitives";

function DeveloperPlatformVisual() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
        <div
          className="relative min-h-[360px] overflow-hidden rounded-3xl p-8 sm:min-h-[400px] sm:p-10 animate-fynk-card-drift"
          style={{ backgroundColor: FYNK.yellow }}
        >
        {/* Sprint board mockup */}
        <div className="relative z-10 rounded-2xl border border-black/5 bg-white p-5 shadow-2xl sm:p-6">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-amber-400" />
            <div className="h-3 w-3 rounded-full bg-emerald-400" />
            <span className="ml-2 text-xs font-semibold text-fynk-muted">ATLAS · Sprint 24</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { color: "#A78BFA", label: "Auth refactor" },
              { color: "#FBBF24", label: "API v2" },
              { color: "#34D399", label: "Dashboard" },
              { color: "#F472B6", label: "Billing" },
              { color: "#60A5FA", label: "Mobile sync" },
              { color: "#FB923C", label: "DRIFT scan" },
            ].map((note) => (
              <div
                key={note.label}
                className="rounded-xl p-3 text-[11px] font-semibold leading-tight text-fynk-ink shadow-sm sm:text-xs"
                style={{ backgroundColor: note.color }}
              >
                {note.label}
              </div>
            ))}
          </div>
        </div>

        {/* User presence popup */}
        <div className="absolute bottom-20 left-4 z-20 w-44 rounded-2xl border border-fynk-border bg-white p-4 shadow-xl sm:left-6">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-wide text-fynk-muted">Connected</p>
          {["Sarah Chen", "Marcus Webb", "Elena R."].map((name, i) => (
            <div key={name} className="flex items-center gap-2.5 py-1.5">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white"
                style={{ backgroundColor: ["#6366F1", "#F05A28", "#10B981"][i] }}
              >
                {name[0]}
              </div>
              <span className="truncate text-xs font-medium text-fynk-ink">{name}</span>
            </div>
          ))}
        </div>

        {/* Code editor overlay */}
        <div className="absolute bottom-4 right-4 z-20 w-[62%] overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl sm:right-6">
          <div className="flex items-center gap-2 border-b border-zinc-700 px-4 py-2.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <span className="ml-1 text-[10px] text-zinc-400">webhook.ts</span>
          </div>
          <pre className="overflow-hidden p-4 text-[10px] leading-relaxed sm:text-[11px]">
            <code>
              <span className="text-violet-400">await</span>{" "}
              <span className="text-sky-300">voatomy</span>
              <span className="text-zinc-400">.</span>
              <span className="text-amber-300">integrations</span>
              <span className="text-zinc-400">.</span>
              <span className="text-emerald-300">connect</span>
              <span className="text-zinc-400">({"{"}</span>
              {"\n"}
              {"  "}
              <span className="text-rose-300">provider</span>
              <span className="text-zinc-400">: </span>
              <span className="text-lime-300">&apos;github&apos;</span>
              {"\n"}
              <span className="text-zinc-400">{"})"}</span>
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}

function EnterpriseAdminVisual() {
  const connectedApps = ["GitHub", "Jira", "Slack"] as const;

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="overflow-hidden rounded-3xl border border-fynk-border bg-white shadow-2xl animate-fynk-card-drift-alt">
        <div className="flex min-h-[340px] sm:min-h-[380px]">
          <div className="hidden w-44 shrink-0 border-r border-fynk-border bg-fynk-surface-alt p-4 sm:block">
            <p className="mb-4 text-xs font-bold uppercase tracking-wide text-fynk-muted">Admin</p>
            {["Profile", "Apps", "Integrations", "Security", "Audit log"].map((item, i) => (
              <div
                key={item}
                className={cn(
                  "mb-1.5 rounded-xl px-3 py-2 text-xs font-medium",
                  i === 2 ? "bg-fynk-orange/15 font-semibold text-fynk-orange" : "text-fynk-muted",
                )}
              >
                {item}
              </div>
            ))}
          </div>

          <div className="flex-1 p-5 sm:p-6">
            <h4 className="mb-5 text-base font-bold text-fynk-ink">Enterprise integrations</h4>

            <div className="space-y-4">
              <div className="rounded-2xl border border-fynk-border bg-fynk-surface-alt/50 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-semibold text-fynk-ink">SCIM provisioning</span>
                  <div className="flex h-6 w-11 items-center rounded-full bg-fynk-orange px-0.5">
                    <div className="h-5 w-5 translate-x-5 rounded-full bg-white shadow-sm" />
                  </div>
                </div>
                <p className="text-xs text-fynk-muted">Auto-sync users from Okta or Azure AD</p>
              </div>

              <div className="rounded-2xl border border-fynk-border p-4">
                <span className="text-sm font-semibold text-fynk-ink">API token</span>
                <div className="mt-3 flex gap-2">
                  <input
                    readOnly
                    value="voa_live_••••••••••••"
                    className="flex-1 rounded-xl border border-fynk-border bg-white px-3 py-2 text-xs text-fynk-muted"
                  />
                  <button
                    type="button"
                    className="rounded-xl bg-fynk-ink px-4 py-2 text-xs font-semibold text-white"
                  >
                    Generate
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {connectedApps.map((name) => {
                  const color = getBrandColor(name);
                  return (
                    <span
                      key={name}
                      className="inline-flex items-center gap-2 rounded-full border-2 px-3 py-1.5 text-xs font-semibold"
                      style={{
                        borderColor: `${color}40`,
                        backgroundColor: `${color}14`,
                        color: color,
                      }}
                    >
                      <BrandIcon name={name} size={18} colored />
                      <Check className="h-3.5 w-3.5" />
                      {name}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpotlightCard({
  title,
  description,
  ctaLabel,
  href,
  visual,
  reverse = false,
}: {
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  visual: React.ReactNode;
  reverse?: boolean;
}) {
  const { ref, animationClass } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={cn(
        "overflow-hidden rounded-[2rem] border border-fynk-border bg-white shadow-md transition-all duration-700",
        animationClass,
      )}
    >
      <div
        className={cn(
          "grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:gap-16 lg:p-14",
          reverse && "lg:[&>*:first-child]:order-2",
        )}
      >
        <div>
          <FynkHeading as="h3" className="text-left sm:text-heading-2">
            {title}
          </FynkHeading>
          <p className="mt-5 text-body-base text-fynk-muted sm:text-body-lg">{description}</p>
          <Link
            href={href}
            className="mt-8 inline-flex items-center rounded-full bg-fynk-ink px-7 py-3.5 text-body-base font-semibold text-white transition-all hover:bg-fynk-ink/90 hover:shadow-lg"
          >
            {ctaLabel}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
        <div className="flex items-center justify-center">{visual}</div>
      </div>
    </div>
  );
}

export function IntegrationsSpotlightCards({ docsHref }: { docsHref: string }) {
  const { ref, animationClass } = useScrollAnimation();

  return (
    <section className="bg-fynk-surface-alt px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-container space-y-12 sm:space-y-16">
        <SpotlightCard
          title="Award-winning developer platform"
          description="Build custom integrations with our REST API, real-time webhooks, and SDKs for TypeScript, Python, and Go. Embed sprint intelligence directly into your internal tools."
          ctaLabel="Learn more"
          href={docsHref}
          visual={<DeveloperPlatformVisual />}
        />

        <div ref={ref} className={cn("mx-auto max-w-3xl text-center transition-all duration-700", animationClass)}>
          <FynkHeading>Administer Voatomy at scale</FynkHeading>
          <FynkSubheading className="mt-4">
            Access and authentication, security operations, automation, and beyond — it&apos;s all here.
          </FynkSubheading>
        </div>

        <SpotlightCard
          title="Enterprise management integrations"
          description="Admins can connect Voatomy to Okta, Azure AD, and your monitoring stack to deploy and provision securely at scale. Our integrations with top enterprise systems help you get started from day one."
          ctaLabel="Learn more"
          href={docsHref}
          visual={<EnterpriseAdminVisual />}
          reverse
        />
      </div>
    </section>
  );
}
