"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { VoatomyLogo } from "@/components/icons/voatomy-logo-mark";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { useDictionary } from "@/i18n/locale-provider";

interface AuthShellProps {
  children: React.ReactNode;
}

export function AuthShell({ children }: AuthShellProps) {
  const dict = useDictionary();
  const shell = dict.auth.shell;

  return (
    <main className="grid min-h-screen lg:grid-cols-[1fr_minmax(440px,48.8%)]">
      <section className="flex min-h-0 flex-col bg-[#f7f7f8] px-5 pb-4 pt-5 md:px-11">
        <header className="flex shrink-0 items-start justify-between gap-4">
          <div>
            <VoatomyLogo href="/" />
          </div>
          <LanguageSwitcher compact />
        </header>

        <div className="flex flex-1 flex-col overflow-y-auto py-6 sm:justify-center sm:py-10">
          {children}
        </div>

        <footer className="mt-auto shrink-0 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 pt-3 text-[11px] text-fynk-muted">
          <span>&copy; 2025-2026 Voatomy Labs</span>
          <span className="text-fynk-muted/30">&middot;</span>
          <Link href="#" className="font-semibold transition-colors hover:text-fynk-ink">
            {shell.terms}
          </Link>
          <span className="text-fynk-muted/30">&middot;</span>
          <Link href="#" className="font-semibold transition-colors hover:text-fynk-ink">
            {shell.privacy}
          </Link>
          <span className="hidden text-fynk-muted/30 sm:inline">&middot;</span>
          <Link href="#" className="hidden font-semibold transition-colors hover:text-fynk-ink sm:inline">
            {shell.licenses}
          </Link>
          <span className="hidden text-fynk-muted/30 sm:inline">&middot;</span>
          <Link href="#" className="hidden font-semibold transition-colors hover:text-fynk-ink sm:inline">
            {shell.cookiePolicy}
          </Link>
        </footer>
      </section>

      <section
        className="relative hidden overflow-hidden border-l border-[#0f1215] bg-[#07090b] text-white lg:flex lg:flex-col"
        aria-label="Platform preview"
      >
        {/* Glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 90% 55% at 55% 80%, #F05A2810, transparent)" }}
          aria-hidden
        />

        {/* Top text */}
        <div className="relative z-10 shrink-0 px-10 pt-12">
          <p className="text-[11px] font-bold uppercase tracking-widest text-white/45">
            {shell.promoLabel}
          </p>
          <h2 className="mt-3 max-w-[360px] text-[clamp(26px,2.2vw,38px)] font-semibold leading-[1.14] tracking-tight text-white">
            {shell.promoHeadline}
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-5 flex flex-wrap gap-2"
          >
            {[
              { label: "87% accuracy", color: "#10b981" },
              { label: "3 min setup", color: "#F05A28" },
              { label: "47 pts / sprint", color: "#6366f1" },
            ].map((s) => (
              <span
                key={s.label}
                className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold"
                style={{ borderColor: `${s.color}30`, backgroundColor: `${s.color}12`, color: s.color }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: s.color }} />
                {s.label}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ── Mockups: overlapping, flush to bottom ── */}
        <div className="relative flex-1 overflow-hidden">

          {/* Desktop — behind, anchored bottom-right */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-0 right-0 z-0 flex flex-col overflow-hidden rounded-tl-2xl border border-white/[0.11] bg-[#f4f5f7] shadow-2xl shadow-black/60"
            style={{ width: "78%", height: "68%" }}
          >
            {/* Browser chrome */}
            <div className="flex shrink-0 items-center gap-1.5 border-b border-black/[0.08] bg-white px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-red-400/55" />
              <span className="h-2 w-2 rounded-full bg-yellow-400/55" />
              <span className="h-2 w-2 rounded-full bg-green-400/55" />
              <div className="ml-2 flex-1 rounded bg-black/[0.05] px-2.5 py-0.5 text-[9px] text-black/30">
                atlas.voatomy.com
              </div>
              <span className="rounded-full bg-[#F05A28]/15 px-1.5 py-0.5 text-[8px] font-bold text-[#F05A28]">Live</span>
            </div>

            {/* App shell */}
            <div className="flex min-h-0 flex-1">
              {/* Sidebar */}
              <div className="flex w-9 shrink-0 flex-col items-center gap-2.5 border-r border-black/[0.06] bg-white py-2.5">
                <div className="h-5 w-5 rounded-md bg-[#F05A28]" />
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-4 w-4 rounded bg-black/[0.08]" />
                ))}
              </div>

              {/* Content */}
              <div className="flex-1 overflow-hidden p-3">
                <div className="mb-2.5 flex items-center justify-between">
                  <div>
                    <div className="mb-1 h-2.5 w-24 rounded-full bg-black/[0.14]" />
                    <div className="h-1.5 w-14 rounded-full bg-black/[0.07]" />
                  </div>
                  <div className="flex gap-1">
                    {["47 pts", "8 days"].map((t) => (
                      <span key={t} className="rounded-md bg-white px-1.5 py-0.5 text-[8px] font-semibold text-black/45 shadow-sm">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { label: "To Do", color: "#64748b", cards: [
                      { pts: "8", w: "w-2/3", accent: "#6366f1" },
                      { pts: "5", w: "w-1/2", accent: "#F05A28" },
                      { pts: "3", w: "w-3/4", accent: "#10b981" },
                    ]},
                    { label: "In Progress", color: "#F05A28", cards: [
                      { pts: "13", w: "w-full", accent: "#F05A28" },
                      { pts: "8",  w: "w-2/3", accent: "#6366f1" },
                    ]},
                    { label: "Done", color: "#10b981", cards: [
                      { pts: "5", w: "w-full", accent: "#10b981" },
                      { pts: "8", w: "w-full", accent: "#10b981" },
                    ]},
                  ].map((col) => (
                    <div key={col.label}>
                      <div className="mb-1.5 flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: col.color }} />
                        <span className="text-[7.5px] font-bold uppercase tracking-wider" style={{ color: col.color }}>{col.label}</span>
                      </div>
                      <div className="space-y-1">
                        {col.cards.map((card, ci) => (
                          <div key={ci} className="rounded-md bg-white p-1.5 shadow-sm">
                            <div className={`mb-1 h-1.5 rounded-full bg-black/[0.11] ${card.w}`} />
                            <div className="flex items-center justify-between">
                              <div className="h-1 w-6 rounded-full bg-black/[0.06]" />
                              <span className="rounded-full px-1 py-0.5 text-[7px] font-bold" style={{ backgroundColor: `${card.accent}18`, color: card.accent }}>{card.pts}pt</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.15, duration: 0.45 }}
                  className="mt-2 flex items-center gap-1.5 rounded-lg border border-[#F05A28]/22 bg-[#F05A28]/8 px-2 py-1.5"
                >
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#F05A28]/20 text-[8px]">✦</span>
                  <div className="flex-1">
                    <div className="h-1.5 w-28 rounded-full bg-[#F05A28]/28" />
                    <div className="mt-0.5 h-1 w-16 rounded-full bg-[#F05A28]/14" />
                  </div>
                  <div className="h-4 w-8 rounded-md bg-[#F05A28]/22" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Phone — front, anchored bottom-left, overlapping desktop */}
          <motion.div
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-0 left-10 z-10 overflow-hidden rounded-t-[28px] border-[2.5px] border-black/55 bg-white shadow-2xl shadow-black/60"
            style={{ width: 152, height: "80%" }}
          >
            {/* Notch */}
            <div className="mx-auto mt-2 h-[14px] w-[54px] rounded-full bg-[#07090b]" />

            {/* Status bar */}
            <div className="flex items-center justify-between px-3 py-1">
              <div className="h-1.5 w-8 rounded-full bg-black/[0.12]" />
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => <div key={i} className="h-1.5 w-1.5 rounded-full bg-black/[0.12]" />)}
              </div>
            </div>

            {/* App header */}
            <div className="border-b border-black/[0.06] bg-white px-3 py-2">
              <div className="mb-1 h-2.5 w-20 rounded-full bg-black/[0.14]" />
              <div className="h-1.5 w-14 rounded-full bg-black/[0.07]" />
            </div>

            {/* Content */}
            <div className="px-2.5 py-2">
              <div className="mb-2 rounded-xl bg-[#F05A28] p-2.5">
                <div className="mb-1.5 h-2 w-16 rounded-full bg-white/30" />
                <div className="flex items-center justify-between">
                  <div className="h-4 w-10 rounded-md bg-white/20" />
                  <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[7px] font-bold text-white">13pt</span>
                </div>
              </div>

              {[
                { accent: "#6366f1", w: "w-2/3", pts: "8" },
                { accent: "#10b981", w: "w-full", pts: "5" },
                { accent: "#64748b", w: "w-1/2", pts: "3" },
              ].map((item, i) => (
                <div key={i} className="mb-1.5 rounded-lg border border-black/[0.06] bg-[#f8f8f9] p-2">
                  <div className={`mb-1 h-1.5 rounded-full bg-black/[0.11] ${item.w}`} />
                  <div className="flex items-center justify-between">
                    <div className="h-1 w-8 rounded-full bg-black/[0.07]" />
                    <span className="rounded-full px-1 py-0.5 text-[7px] font-bold" style={{ backgroundColor: `${item.accent}18`, color: item.accent }}>{item.pts}pt</span>
                  </div>
                </div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.25, duration: 0.4 }}
                className="mt-1 flex items-center gap-1.5 rounded-lg border border-[#F05A28]/25 bg-[#F05A28]/8 px-2 py-1.5"
              >
                <span className="text-[8px] text-[#F05A28]">✦</span>
                <div className="h-1.5 w-16 rounded-full bg-[#F05A28]/30" />
              </motion.div>
            </div>

            {/* Bottom nav */}
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-around border-t border-black/[0.07] bg-white px-2 py-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className={`h-4 w-4 rounded ${i === 0 ? "bg-[#F05A28]/20" : "bg-black/[0.08]"}`} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
