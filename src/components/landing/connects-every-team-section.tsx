"use client";

import * as React from "react";
import Link from "next/link";
import { SOLUTIONS_TEAMS } from "@/lib/constants";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { ArrowRight } from "lucide-react";
import { useDictionary, useLocale } from "@/i18n/locale-provider";
import {
  FynkCard,
  FynkDisplayHeading,
  FynkHeadingUnderlineAccent,
  FynkReveal,
  FynkTabGroup,
} from "@/components/marketing/fynk-primitives";
import { IndustrySolutionIcon, TeamSolutionIcon } from "@/components/marketing/landing-illustrations";

const INDUSTRIES = [
  { key: "saas", title: "SaaS", desc: "Ship faster without adding another planning tool nobody uses.", href: "/industries/saas" },
  { key: "fintech", title: "Finance", desc: "Hit compliance deadlines without sacrificing delivery speed.", href: "/industries/fintech" },
  { key: "healthtech", title: "Healthtech", desc: "Regulated releases with audit trails your team can actually trust.", href: "/industries/healthtech" },
  { key: "enterprise", title: "Enterprise", desc: "One view across squads — fewer missed commitments at scale.", href: "/industries/enterprise" },
  { key: "ecommerce", title: "E-commerce", desc: "Survive peak season with sprints that account for real capacity.", href: "/industries/ecommerce" },
  { key: "devtools", title: "DevTools", desc: "Repo-aware planning built for teams who ship code every week.", href: "/industries/devtools" },
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
          {items.map((item, i) => (
            <Link key={item.key} href={localizedPath(item.href)} className="group block">
              <FynkCard visible={isVisible} delay={i * 60} className="h-full transition-transform group-hover:-translate-y-0.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-black/[0.05] sm:h-11 sm:w-11">
                  {tab === "teams" ? (
                    <TeamSolutionIcon index={i} className="h-8 w-8" />
                  ) : (
                    <IndustrySolutionIcon index={i} className="h-8 w-8" />
                  )}
                </span>
                  <h3 className="mt-3 text-base font-bold text-fynk-ink sm:mt-4 sm:text-lg">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-fynk-muted sm:mt-2 sm:text-base">{item.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-fynk-orange opacity-0 transition-opacity group-hover:opacity-100">
                    {t.learnMore}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </FynkCard>
              </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
