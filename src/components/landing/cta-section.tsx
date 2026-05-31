"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { VoatomyLogoMark } from "@/components/icons/voatomy-logo-mark";
import { FynkDisplayHeading, FynkHeadingUnderlineAccent } from "@/components/marketing/fynk-primitives";
import { useSession } from "@/hooks/use-session";
import { useDictionary, useLocale } from "@/i18n/locale-provider";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/landing/scroll-reveal";

type SprintRow = {
  name: string;
  assignee: string;
  label: string;
  labelColor: string;
  status: string;
  statusColor: string;
  points: number;
  indent?: boolean;
};

const SPRINT_ROWS: SprintRow[] = [
  {
    name: "Website assets",
    assignee: "Sam",
    label: "Design",
    labelColor: "bg-teal-500",
    status: "In progress",
    statusColor: "bg-blue-50 text-blue-700",
    points: 8,
  },
  {
    name: "Landing page",
    assignee: "Alex",
    label: "Product",
    labelColor: "bg-orange-500",
    status: "Ready",
    statusColor: "bg-emerald-50 text-emerald-700",
    points: 3,
    indent: true,
  },
  {
    name: "About page",
    assignee: "Jordan",
    label: "Engineering",
    labelColor: "bg-blue-500",
    status: "In progress",
    statusColor: "bg-blue-50 text-blue-700",
    points: 5,
    indent: true,
  },
  {
    name: "Pricing page refresh",
    assignee: "Morgan",
    label: "Product",
    labelColor: "bg-orange-500",
    status: "Blocked",
    statusColor: "bg-red-50 text-red-700",
    points: 5,
    indent: true,
  },
  {
    name: "Sprint capacity review",
    assignee: "Riley",
    label: "Planning",
    labelColor: "bg-violet-500",
    status: "Ready",
    statusColor: "bg-emerald-50 text-emerald-700",
    points: 2,
  },
  {
    name: "API latency spike review",
    assignee: "Casey",
    label: "SRE",
    labelColor: "bg-rose-500",
    status: "In progress",
    statusColor: "bg-blue-50 text-blue-700",
    points: 3,
  },
  {
    name: "Q2 revenue forecast sync",
    assignee: "Taylor",
    label: "Finance",
    labelColor: "bg-amber-500",
    status: "Ready",
    statusColor: "bg-emerald-50 text-emerald-700",
    points: 2,
  },
];

const SIDEBAR_ITEMS = [
  { label: "Home", active: false },
  { label: "Sprint", active: true },
  { label: "Chat", active: false },
  { label: "Signal", active: false },
  { label: "Docs", active: false },
  { label: "Settings", active: false },
];

function CtaDesktopMock() {
  const totalPoints = SPRINT_ROWS.reduce((sum, row) => sum + row.points, 0);
  const capacityUsed = 82;

  return (
    <div className="pointer-events-none absolute bottom-0 left-1/2 z-10 w-[min(98%,1180px)] -translate-x-[54%] select-none">
      <div className="overflow-hidden rounded-t-[1.25rem] border border-white/25 bg-white shadow-[0_40px_120px_rgba(0,0,0,0.45)] sm:rounded-t-[1.5rem]">
        <div className="flex min-h-[380px] sm:min-h-[460px] lg:min-h-[520px]">
          {/* Sidebar */}
          <div className="hidden w-[4.5rem] shrink-0 bg-[#1e1e2e] sm:block lg:w-20">
            <div className="flex flex-col items-center gap-2.5 py-6 lg:gap-3">
              {SIDEBAR_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className={cn(
                    "flex h-10 w-10 flex-col items-center justify-center rounded-xl text-[9px] font-medium leading-none text-white/60 lg:h-11 lg:w-11",
                    item.active && "bg-white/15 text-white",
                  )}
                  title={item.label}
                >
                  <span className="text-[11px] font-semibold">{item.label[0]}</span>
                  <span className="mt-0.5 hidden text-[7px] uppercase tracking-wide lg:block">
                    {item.label.slice(0, 4)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Main panel */}
          <div className="min-w-0 flex-1 bg-[#fafafa]">
            {/* Sprint header */}
            <div className="border-b border-gray-200 bg-white px-5 py-4 sm:px-6 sm:py-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="text-left">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-base font-bold text-gray-900 sm:text-lg lg:text-xl">
                      Sprint 14 · ATLAS
                    </p>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700 sm:text-xs">
                      High confidence
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                    May 12 – May 26 · Capacity-aware plan · 6 signals merged
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {[
                    { label: "Days left", value: "6" },
                    { label: "Tickets", value: "24" },
                    { label: "Points", value: String(totalPoints) },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-left sm:px-3.5 sm:py-2"
                    >
                      <p className="text-[9px] font-medium uppercase tracking-wide text-gray-400 sm:text-[10px]">
                        {stat.label}
                      </p>
                      <p className="text-sm font-bold text-gray-900 sm:text-base">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Capacity bar */}
              <div className="mt-4">
                <div className="mb-1.5 flex items-center justify-between text-[10px] sm:text-xs">
                  <span className="font-medium text-gray-600">Team capacity</span>
                  <span className="font-semibold text-gray-900">{capacityUsed}% allocated</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-200 sm:h-2.5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand to-teal-500"
                    style={{ width: `${capacityUsed}%` }}
                  />
                </div>
              </div>
            </div>

            {/* AI insight strip */}
            <div className="flex items-center gap-2 border-b border-violet-100 bg-violet-50/80 px-5 py-2.5 sm:px-6 sm:py-3">
              <span className="shrink-0 rounded-md bg-violet-600 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white sm:text-[10px]">
                AI
              </span>
              <p className="truncate text-left text-[11px] text-violet-900 sm:text-xs lg:text-sm">
                3 tickets deprioritized — Jordan at 110% load; Morgan blocked on design review
              </p>
            </div>

            {/* Table */}
            <div className="grid grid-cols-[1fr_72px_64px_72px_80px] gap-1 border-b border-gray-100 bg-white px-4 py-2.5 text-[9px] font-semibold uppercase tracking-wide text-gray-400 sm:grid-cols-[1fr_80px_72px_80px_88px] sm:px-6 sm:text-[10px]">
              <span>Name</span>
              <span>Assignee</span>
              <span>Status</span>
              <span>Pts</span>
              <span>Labels</span>
            </div>
            <div className="divide-y divide-gray-100 bg-white">
              {SPRINT_ROWS.map((row) => (
                <div
                  key={row.name}
                  className="grid grid-cols-[1fr_72px_64px_72px_80px] items-center gap-1 px-4 py-2.5 sm:grid-cols-[1fr_80px_72px_80px_88px] sm:px-6 sm:py-3"
                >
                  <span
                    className={cn(
                      "truncate text-left text-xs font-medium text-gray-800 sm:text-sm",
                      row.indent && "pl-4 text-gray-600",
                    )}
                  >
                    {row.indent && "↳ "}
                    {row.name}
                  </span>
                  <span className="truncate text-left text-[10px] text-gray-500 sm:text-xs">
                    {row.assignee}
                  </span>
                  <span
                    className={cn(
                      "inline-flex w-fit rounded-full px-1.5 py-0.5 text-[8px] font-semibold sm:px-2 sm:text-[9px]",
                      row.statusColor,
                    )}
                  >
                    {row.status}
                  </span>
                  <span className="text-left text-[10px] font-semibold text-gray-700 sm:text-xs">
                    {row.points}
                  </span>
                  <span
                    className={cn(
                      "inline-flex w-fit rounded px-1.5 py-0.5 text-[8px] font-medium text-white sm:px-2 sm:text-[9px]",
                      row.labelColor,
                    )}
                  >
                    {row.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CtaMobileMock() {
  const tasks = [
    { title: "Social content calendar", due: "Today", priority: "High" },
    { title: "API latency spike review", due: "Wed", priority: "Urgent" },
    { title: "Q2 revenue forecast sync", due: "Thu", priority: "Med" },
    { title: "Design review — pricing", due: "Fri", priority: "High" },
    { title: "Standup prep for Sprint 14", due: "Mon", priority: "Low" },
  ];

  return (
    <div className="pointer-events-none absolute bottom-0 right-0 z-20 w-[min(48%,300px)] select-none sm:right-[2%] lg:w-[min(44%,340px)]">
      <div className="overflow-hidden rounded-t-[2.25rem] rounded-b-none border-[4px] border-b-0 border-gray-900 bg-[#121218] shadow-[0_32px_90px_rgba(0,0,0,0.55)]">
        <div className="mx-auto mt-3 h-1.5 w-16 rounded-full bg-gray-700" />
        <div className="px-4 pb-6 pt-4 sm:px-5 sm:pb-7 sm:pt-5">
          <div className="mb-1 flex items-center justify-between">
            <p className="text-sm font-bold text-white sm:text-base">Voatomy</p>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
              </span>
              <span className="text-[10px] text-gray-400 sm:text-xs">3 signals</span>
            </div>
          </div>
          <p className="mb-4 text-left text-[10px] text-gray-500 sm:text-xs">Sprint 14 · 6 days left</p>

          <div className="mb-4 grid grid-cols-3 gap-2 sm:gap-2.5">
            {[
              { label: "Recent", count: "8", bg: "bg-violet-600" },
              { label: "Today", count: "4", bg: "bg-blue-600" },
              { label: "Assigned", count: "12", bg: "bg-gray-700" },
            ].map((tile) => (
              <div
                key={tile.label}
                className={cn("flex aspect-square flex-col justify-between rounded-xl p-2.5 sm:p-3", tile.bg)}
              >
                <span className="text-lg font-bold text-white sm:text-xl">{tile.count}</span>
                <span className="text-[9px] font-medium text-white/90 sm:text-[10px]">{tile.label}</span>
              </div>
            ))}
          </div>

          <div className="mb-3 flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500 sm:text-xs">
              Your queue
            </p>
            <span className="rounded-full bg-brand/20 px-2 py-0.5 text-[9px] font-semibold text-emerald-400 sm:text-[10px]">
              5 tasks
            </span>
          </div>

          <div className="space-y-2 sm:space-y-2.5">
            {tasks.map((task) => (
              <div
                key={task.title}
                className="flex items-start gap-2.5 rounded-xl bg-white/5 px-3 py-2.5 sm:px-3.5 sm:py-3"
              >
                <div className="mt-0.5 h-4 w-4 shrink-0 rounded border-2 border-gray-600" />
                <div className="min-w-0 flex-1 text-left">
                  <span className="block text-[10px] leading-snug text-gray-200 sm:text-xs">{task.title}</span>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    <span className="text-[8px] text-gray-500 sm:text-[9px]">{task.due}</span>
                    <span
                      className={cn(
                        "rounded px-1 py-0.5 text-[8px] font-semibold sm:text-[9px]",
                        task.priority === "Urgent" && "bg-red-500/20 text-red-400",
                        task.priority === "High" && "bg-orange-500/20 text-orange-400",
                        task.priority === "Med" && "bg-blue-500/20 text-blue-400",
                        task.priority === "Low" && "bg-gray-500/20 text-gray-400",
                      )}
                    >
                      {task.priority}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CTASection() {
  const dict = useDictionary();
  const t = dict.cta;
  const nav = dict.nav;
  const { localizedPath } = useLocale();
  const { isLoggedIn, dashboardUrl } = useSession();

  const [titleLine1, titleLine2] = t.title.includes(". ")
    ? [t.title.split(". ")[0] + ".", t.title.split(". ").slice(1).join(". ")]
    : [t.title, ""];

  return (
    <section className="bg-fynk-surface-alt px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-container">
        <div
          className="relative overflow-hidden rounded-[1.25rem] px-4 pb-0 pt-10 text-center sm:rounded-[2rem] sm:px-8 sm:pt-16 md:rounded-[3rem] md:pt-20 lg:px-12 lg:pt-24"
          style={{
            background:
              "linear-gradient(145deg, #021a12 0%, #004838 28%, #047857 52%, #0d9488 72%, #F05A28 100%)",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 20% 0%, rgba(255,255,255,0.12), transparent 55%), radial-gradient(ellipse 70% 50% at 90% 100%, rgba(240,90,40,0.25), transparent 50%)",
            }}
            aria-hidden
          />

          <ScrollReveal direction="up" className="relative z-10">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-xl sm:mb-8 sm:h-16 sm:w-16 sm:rounded-2xl md:mb-10 md:h-20 md:w-20 md:rounded-3xl">
              <VoatomyLogoMark className="h-7 w-7 sm:h-9 sm:w-9 md:h-11 md:w-11" />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delayMs={80} className="relative z-10">
            <FynkDisplayHeading align="center" className="max-w-4xl !text-white">
              {titleLine1}
              {titleLine2 ? (
                <>
                  <br />
                  <FynkHeadingUnderlineAccent variant="inverse">{titleLine2}</FynkHeadingUnderlineAccent>
                </>
              ) : null}
            </FynkDisplayHeading>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/85 sm:mt-6 sm:text-base md:mt-8 md:text-lg lg:text-xl">
              {t.subtitle}
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delayMs={160} className="relative z-10 mt-6 sm:mt-10 md:mt-12">
            <Link
              href={isLoggedIn ? localizedPath(dashboardUrl) : localizedPath("/signup")}
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-gray-900 shadow-[0_8px_32px_rgba(0,0,0,0.2)] transition hover:bg-gray-50 hover:shadow-[0_12px_40px_rgba(0,0,0,0.25)] sm:gap-2.5 sm:px-10 sm:py-4 sm:text-base md:px-12 md:text-lg"
            >
              {isLoggedIn ? nav.goToDashboard : t.startFreeTrial}
              {!isLoggedIn && (
                <span className="font-extrabold uppercase tracking-wide text-brand">Free</span>
              )}
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
          </ScrollReveal>

          {/* Mockup stage — much taller & full-bleed within banner */}
          <ScrollReveal direction="up" delayMs={240} className="relative z-10 mx-auto mt-12 w-full sm:mt-16 lg:mt-20">
            <div className="relative mx-auto h-[220px] w-full sm:h-[340px] md:h-[400px] lg:h-[520px] xl:h-[580px]">
              <CtaDesktopMock />
              <CtaMobileMock />
            </div>
          </ScrollReveal>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-3 sm:gap-8 lg:mt-14">
          {t.trust.map((item, i) => (
            <ScrollReveal key={item.title} direction="up" delayMs={i * 80}>
              <p className="text-base font-semibold text-fynk-ink sm:text-lg">{item.title}</p>
              <p className="mt-1 text-sm text-fynk-muted sm:mt-1.5 sm:text-base">{item.desc}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
