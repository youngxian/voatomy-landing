"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { VoatomyLogo } from "@/components/icons/voatomy-logo-mark";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { useDictionary } from "@/i18n/locale-provider";

interface AuthShellProps {
  children: React.ReactNode;
}

const PILL_CONFIG = [
  { key: "ems" as const, icon: "sparkle", pos: "left-2 top-0 -rotate-[10deg]" },
  { key: "techLeads" as const, icon: "code", pos: "left-[220px] top-[34px]" },
  { key: "productLeaders" as const, icon: "chart", pos: "right-[-8px] top-[14px] rotate-[12deg]" },
  { key: "ctos" as const, icon: "shield", pos: "left-[44px] top-[110px] rotate-[12deg]" },
];

function PillIcon({ type }: { type: string }) {
  switch (type) {
    case "sparkle":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" />
        </svg>
      );
    case "code":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case "chart":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    case "shield":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    default:
      return null;
  }
}

export function AuthShell({ children }: AuthShellProps) {
  const dict = useDictionary();
  const shell = dict.auth.shell;

  return (
    <main className="grid min-h-screen lg:grid-cols-[1fr_minmax(440px,48.8%)]">
      <section className="flex flex-col bg-[#f7f7f8] px-5 pb-3.5 pt-5 md:px-11">
        <header className="flex items-start justify-between gap-4">
          <div>
            <VoatomyLogo href="/" />
            <span className="mt-1 ml-10 block text-xs text-fynk-muted">{shell.byline}</span>
          </div>
          <LanguageSwitcher compact />
        </header>

        <div className="my-auto">{children}</div>

        <footer className="mt-auto flex flex-wrap items-center justify-center gap-x-3.5 pt-[18px] text-xs text-fynk-muted">
          <span>&copy; 2025-2026 Voatomy Labs</span>
          <span className="text-fynk-muted/30">&middot;</span>
          <Link href="#" className="font-semibold transition-colors hover:text-fynk-ink">
            {shell.terms}
          </Link>
          <span className="text-fynk-muted/30">&middot;</span>
          <Link href="#" className="font-semibold transition-colors hover:text-fynk-ink">
            {shell.privacy}
          </Link>
          <span className="text-fynk-muted/30">&middot;</span>
          <Link href="#" className="font-semibold transition-colors hover:text-fynk-ink">
            {shell.licenses}
          </Link>
          <span className="text-fynk-muted/30">&middot;</span>
          <Link href="#" className="font-semibold transition-colors hover:text-fynk-ink">
            {shell.cookiePolicy}
          </Link>
          <span className="text-fynk-muted/30">&middot;</span>
          <span>v1.0</span>
        </footer>
      </section>

      <section
        className="relative hidden overflow-hidden border-l border-[#0f1215] bg-[#07090b] text-white lg:block"
        aria-label="Platform preview"
      >
        <div className="relative h-full px-[50px] pt-[58px]">
          <p className="text-xs font-bold uppercase tracking-widest text-white/65">
            {shell.promoLabel}
          </p>

          <h2 className="mt-4 max-w-[430px] text-[clamp(34px,2.9vw,54px)] font-semibold leading-[1.1] tracking-tight">
            {shell.promoHeadline}
          </h2>

          <div className="relative mt-16 min-h-[175px]">
            {PILL_CONFIG.map((pill, index) => (
              <motion.span
                key={pill.key}
                initial={{ opacity: 0, scale: 0.85, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: 0.4 + index * 0.12,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`absolute inline-flex h-[68px] items-center gap-2.5 whitespace-nowrap rounded-full border border-emerald-500/25 bg-emerald-900/60 px-[30px] text-[clamp(20px,1.55vw,31px)] font-medium tracking-tight text-emerald-400 backdrop-blur-sm ${pill.pos}`}
              >
                <PillIcon type={pill.icon} />
                {shell.pills[pill.key]}
              </motion.span>
            ))}
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-[60%]">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-0 right-0 h-[76%] w-[96%] rounded-tl-[14px] border border-white/[0.12] bg-gradient-to-b from-[#f8f8f8] to-[#ececec] p-3.5"
            >
              <div className="mb-2.5 h-7 rounded-lg bg-black/[0.07]" />
              <div className="mb-2.5 flex h-[26px] items-center gap-1.5 rounded-lg bg-black/[0.06] px-2">
                {[...Array(3)].map((_, i) => (
                  <span key={i} className="h-2.5 w-7 rounded-full bg-black/[0.12]" />
                ))}
              </div>
              <div className="mb-3 flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <i key={i} className="block h-[30px] w-[84px] rounded-lg bg-black/[0.08]" />
                ))}
              </div>
              <div className="grid gap-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="grid h-[62px] grid-cols-[36px_1fr_82px] items-center gap-2.5 rounded-[10px] bg-black/[0.06] px-2.5"
                  >
                    <em className="h-[22px] w-[22px] rounded-full bg-black/[0.15]" />
                    <i className="block h-3 rounded-full bg-black/[0.14]" />
                    <b className="block h-3 rounded-full bg-black/[0.14]" />
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-0 left-0 w-[312px] rounded-[34px] border-2 border-black/55 bg-gradient-to-b from-[#f8f8f8] to-[#ededed] p-3 shadow-2xl"
              style={{ height: "560px" }}
            >
              <div className="mx-auto mb-3.5 h-[18px] w-[84px] rounded-full bg-[#07090b]" />
              <div className="mb-3 h-12 rounded-[10px] bg-black/[0.09]" />
              {[...Array(5)].map((_, i) => (
                <div key={i} className="mb-2 h-[42px] rounded-[10px] bg-black/[0.09]" />
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="absolute bottom-6 right-[50px] flex items-center gap-4 text-[11px] text-white/40"
          >
            <span className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500/60">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              {shell.soc2}
            </span>
            <span className="h-2.5 w-px bg-white/15" />
            <span className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500/60">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              {shell.encryption}
            </span>
            <span className="h-2.5 w-px bg-white/15" />
            <span>{shell.neverStoresCode}</span>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
