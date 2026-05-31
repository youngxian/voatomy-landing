"use client";

import * as React from "react";
import Link from "next/link";
import { SOLUTIONS_TEAMS } from "@/lib/constants";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import {
  Code2,
  LayoutGrid,
  Building2,
  Shield,
  Palette,
  DollarSign,
  ArrowRight,
  Factory,
  ShoppingBag,
  Cpu,
  HeartPulse,
  Landmark,
} from "lucide-react";
import { useDictionary, useLocale } from "@/i18n/locale-provider";
import {
  FynkCard,
  FynkDisplayHeading,
  FynkHeadingUnderlineAccent,
  FynkReveal,
  FynkTabGroup,
} from "@/components/marketing/fynk-primitives";

const TEAM_ICONS = [Code2, LayoutGrid, Building2, Shield, Palette, DollarSign] as const;

const INDUSTRIES = [
  { key: "saas", title: "SaaS", desc: "Ship faster without adding another planning tool nobody uses.", href: "/industries/saas", icon: Cpu },
  { key: "fintech", title: "Finance", desc: "Hit compliance deadlines without sacrificing delivery speed.", href: "/industries/fintech", icon: Landmark },
  { key: "healthtech", title: "Healthtech", desc: "Regulated releases with audit trails your team can actually trust.", href: "/industries/healthtech", icon: HeartPulse },
  { key: "enterprise", title: "Enterprise", desc: "One view across squads — fewer missed commitments at scale.", href: "/industries/enterprise", icon: Building2 },
  { key: "ecommerce", title: "E-commerce", desc: "Survive peak season with sprints that account for real capacity.", href: "/industries/ecommerce", icon: ShoppingBag },
  { key: "devtools", title: "DevTools", desc: "Repo-aware planning built for teams who ship code every week.", href: "/industries/devtools", icon: Factory },
] as const;

export function ConnectsEveryTeamSection() {
  const [tab, setTab] = React.useState<"teams" | "industries">("teams");
  const t = useDictionary().solutions;
  const { localizedPath } = useLocale();
  const { ref, isVisible } = useScrollAnimation();
  const items = tab === "teams" ? SOLUTIONS_TEAMS : INDUSTRIES;

  return (
    <section className="light-surface-typography relative overflow-hidden bg-fynk-surface-alt px-4 py-12 sm:py-16 lg:py-24">
      <div ref={ref} className="relative z-[1] mx-auto max-w-container">
        <FynkReveal visible={isVisible} direction="right" className="text-center">
          <FynkDisplayHeading align="center">
            {t.titleLead}
            <br />
            <FynkHeadingUnderlineAccent variant="teal">{t.titleAccent}</FynkHeadingUnderlineAccent>
          </FynkDisplayHeading>
          <div className="mt-8 flex justify-center">
            <FynkTabGroup
              tabs={[
                { id: "teams" as const, label: t.teamsTab },
                { id: "industries" as const, label: t.industriesTab },
              ]}
              active={tab}
              onChange={setTab}
            />
          </div>
        </FynkReveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon =
              tab === "teams"
                ? TEAM_ICONS[i]
                : INDUSTRIES[i]?.icon ?? Building2;
            return (
              <Link key={item.key} href={localizedPath(item.href)} className="group block">
                <FynkCard visible={isVisible} delay={i * 60} className="h-full transition-transform group-hover:-translate-y-0.5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-fynk-orange-light text-fynk-orange">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-fynk-ink">{item.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-fynk-muted">{item.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-fynk-orange opacity-0 transition-opacity group-hover:opacity-100">
                    {t.learnMore}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </FynkCard>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
