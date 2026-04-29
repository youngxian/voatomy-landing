"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCT_CARDS } from "@/lib/constants";

const DEMO_SETUP_STEPS = [
  { label: "Provisioning demo workspace...", duration: 800 },
  { label: "Loading sample project data...", duration: 1000 },
  { label: "Activating all products...", duration: 900 },
  { label: "Generating sample sprint plan...", duration: 1200 },
  { label: "Ready!", duration: 400 },
];

const ATLAS_APP_URL = process.env.NEXT_PUBLIC_ATLAS_APP_URL || "http://localhost:3000";
const DEMO_DASHBOARD_URL = `${ATLAS_APP_URL}/dashboard?demo=true`;

export default function DemoPage() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    let stepIdx = 0;
    let elapsed = 0;
    const totalDuration = DEMO_SETUP_STEPS.reduce((s, a) => s + a.duration, 0);

    const interval = setInterval(() => {
      elapsed += 50;
      setProgress(Math.min((elapsed / totalDuration) * 100, 100));

      let cumulative = 0;
      for (let i = 0; i < DEMO_SETUP_STEPS.length; i++) {
        cumulative += DEMO_SETUP_STEPS[i].duration;
        if (elapsed < cumulative) {
          stepIdx = i;
          break;
        }
        if (i === DEMO_SETUP_STEPS.length - 1) stepIdx = i;
      }
      setCurrentStep(stepIdx);

      if (elapsed >= totalDuration) {
        clearInterval(interval);
        setReady(true);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex min-h-screen flex-col bg-[#f7f7f8]">
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-5 md:px-8">
        <Link href="/" className="inline-flex items-center gap-2.5" aria-label="Back to Voatomy">
          <span
            className="grid h-[18px] w-[18px] place-items-center rounded-md bg-brand shadow-sm shadow-brand/25"
            aria-hidden="true"
          >
            <span className="block h-2 w-2 rounded-[3px] bg-safe-black/20" />
          </span>
          <span className="text-[28px] font-bold tracking-tight text-[#121312]">Voatomy</span>
        </Link>
        <span className="rounded-full bg-brand/10 px-3 py-1 text-[11px] font-semibold text-[#121312]/70">
          Demo Mode
        </span>
      </header>

      {/* Content */}
      <div className="flex flex-1 items-center justify-center px-5">
        <div className="w-full max-w-[480px] text-center">
          <AnimatePresence mode="wait">
            {!ready ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {/* Spinning icon */}
                <div className="mx-auto mb-6 relative h-20 w-20">
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-brand/20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="absolute inset-2 rounded-2xl bg-brand/10 flex items-center justify-center">
                    <motion.span
                      className="text-3xl"
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      🧪
                    </motion.span>
                  </div>
                </div>

                <h1 className="mb-2 text-[28px] font-bold tracking-tight text-[#121312]">
                  Setting up your demo workspace
                </h1>
                <p className="mx-auto mb-8 max-w-[360px] text-sm text-[#121312]/50">
                  We&apos;re spinning up a pre-configured workspace with sample data so you can explore everything Voatomy offers.
                </p>

                {/* Progress bar */}
                <div className="mx-auto max-w-[380px] mb-6">
                  <div className="h-2 rounded-full bg-[#121312]/8 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-brand"
                      style={{ width: `${progress}%` }}
                      transition={{ duration: 0.05 }}
                    />
                  </div>
                  <p className="mt-2 text-[11px] text-[#121312]/40">
                    {DEMO_SETUP_STEPS[currentStep]?.label}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="ready"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                {/* Celebration */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 250, damping: 15 }}
                  className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-3xl bg-brand/15"
                >
                  <motion.span
                    className="text-5xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    🎉
                  </motion.span>
                </motion.div>

                <h1 className="mb-2 text-[28px] font-bold tracking-tight text-[#121312]">
                  Your demo is ready!
                </h1>
                <p className="mx-auto mb-6 max-w-[380px] text-sm text-[#121312]/50">
                  Explore the full Voatomy platform with sample data. Nothing you do here affects real accounts.
                </p>

                {/* Product pills */}
                <div className="mb-8 flex flex-wrap justify-center gap-2">
                  {PRODUCT_CARDS.map((p) => (
                    <span
                      key={p.key}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#121312]/8 bg-white px-3 py-1.5 text-xs font-semibold text-[#121312]/70"
                    >
                      <span>{p.icon}</span>
                      {p.name}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={DEMO_DASHBOARD_URL}
                  className="inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-brand text-base font-bold text-[#121312] shadow-md shadow-brand/20 transition-all hover:shadow-lg hover:shadow-brand/30 active:scale-[0.98]"
                >
                  Enter Demo Dashboard
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </a>

                <p className="mt-4 text-[11px] text-[#121312]/35">
                  Read-only mode &middot; No sign-up required &middot; Sample data only
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto flex items-center justify-center gap-3.5 px-5 py-4 text-xs text-[#121312]/40">
        <span>&copy; 2025-2026 Voatomy Labs</span>
        <span className="text-[#121312]/15">&middot;</span>
        <Link href="/onboard" className="transition-colors hover:text-[#121312]/60">
          Start real onboarding &rarr;
        </Link>
      </footer>
    </main>
  );
}
