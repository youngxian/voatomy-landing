"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Calendar, Play, Users, Building2, Mail, User, ChevronDown } from "lucide-react";
import { PRODUCT_CARDS } from "@/lib/constants";
import { VoatomyLogo } from "@/components/icons/voatomy-logo-mark";
import { useLocale } from "@/i18n/locale-provider";

const TEAM_SIZES = ["1–10", "11–50", "51–200", "201–1 000", "1 000+"];
const ROLES = ["Engineering Lead", "Product Manager", "Founder / CTO", "DevOps / SRE", "Design Lead", "Other"];

const TRUST_ITEMS = [
  "No credit card required",
  "30-minute session",
  "Custom to your use case",
];

type FormStep = "details" | "sent";

export default function DemoPage() {
  const { localizedPath } = useLocale();
  const [tab, setTab] = React.useState<"book" | "try">("book");
  const [formStep, setFormStep] = React.useState<FormStep>("details");
  const [sending, setSending] = React.useState(false);
  const [form, setForm] = React.useState({ name: "", email: "", company: "", teamSize: "", role: "" });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const canSubmit = form.name && form.email && form.company && form.teamSize && form.role;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 1400));
    setSending(false);
    setFormStep("sent");
  };

  return (
    <main className="light-surface-typography min-h-screen bg-[#f4f5f7] text-fynk-ink">
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-5 md:px-10">
        <VoatomyLogo
          href={localizedPath("/")}
          wordmarkClassName="text-xl font-bold tracking-tight text-fynk-ink sm:text-[26px]"
        />
        <Link
          href="/auth/signup"
          className="rounded-full bg-[#121312] px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-80"
        >
          Start free
        </Link>
      </header>

      {/* Hero */}
      <div className="mx-auto max-w-[1120px] px-5 pt-10 pb-4 text-center md:px-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#f16e2c]/20 bg-[#f16e2c]/8 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#f16e2c]">
            Get a Demo
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#121312] sm:text-5xl">
            See Voatomy in action
          </h1>
          <p className="mx-auto mt-3 max-w-[520px] text-base text-[#121312]/55">
            Book a personalised walkthrough with our team, or jump straight into an interactive demo.
          </p>
        </motion.div>

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mx-auto mt-6 inline-flex rounded-xl border border-[#121312]/10 bg-white p-1 shadow-sm"
        >
          <button
            type="button"
            onClick={() => setTab("book")}
            className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${tab === "book" ? "bg-[#121312] text-white shadow-sm" : "text-[#121312]/50 hover:text-[#121312]/70"}`}
          >
            <Calendar className="h-3.5 w-3.5" />
            Book a demo
          </button>
          <button
            type="button"
            onClick={() => setTab("try")}
            className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${tab === "try" ? "bg-[#121312] text-white shadow-sm" : "text-[#121312]/50 hover:text-[#121312]/70"}`}
          >
            <Play className="h-3.5 w-3.5" />
            Try it yourself
          </button>
        </motion.div>
      </div>

      {/* Tab content */}
      <div className="mx-auto max-w-[1120px] px-5 pb-16 md:px-10">
        <AnimatePresence mode="wait">
          {/* ── BOOK A DEMO ── */}
          {tab === "book" && (
            <motion.div
              key="book"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="mt-6 grid gap-6 lg:grid-cols-5"
            >
              {/* Left: what to expect */}
              <div className="lg:col-span-2">
                <div className="sticky top-8 rounded-2xl border border-white/90 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-[#121312]">What to expect</h2>
                  <p className="mt-1.5 text-sm text-[#121312]/55">
                    A 30-minute session tailored to your team&apos;s setup, with a live product walkthrough and Q&A.
                  </p>

                  <div className="mt-5 space-y-4">
                    {[
                      { icon: Users, title: "Personalised walkthrough", body: "We'll focus on the modules most relevant to your team — Atlas, Signal, Loop, or the full platform." },
                      { icon: Building2, title: "Live with your data", body: "Connect your GitHub or Jira in advance and we'll demo with your real projects." },
                      { icon: CheckCircle2, title: "No hard sell", body: "Ask anything. We'll tell you honestly if Voatomy isn't the right fit." },
                    ].map(({ icon: Icon, title, body }) => (
                      <div key={title} className="flex gap-3">
                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f16e2c]/10">
                          <Icon className="h-4 w-4 text-[#f16e2c]" />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-[#121312]">{title}</p>
                          <p className="mt-0.5 text-xs text-[#121312]/50">{body}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {TRUST_ITEMS.map((t) => (
                      <span key={t} className="inline-flex items-center gap-1 rounded-full bg-[#121312]/5 px-2.5 py-1 text-[11px] font-medium text-[#121312]/60">
                        <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: form */}
              <div className="lg:col-span-3">
                <div className="rounded-2xl border border-white/90 bg-white p-6 shadow-sm">
                  <AnimatePresence mode="wait">
                    {formStep === "details" ? (
                      <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="space-y-4"
                      >
                        <div>
                          <h2 className="text-lg font-bold text-[#121312]">Book your demo</h2>
                          <p className="mt-0.5 text-sm text-[#121312]/50">We&apos;ll confirm a time within one business day.</p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <label className="block">
                            <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#121312]/60">
                              <User className="h-3 w-3" /> Full name
                            </span>
                            <input
                              type="text"
                              required
                              placeholder="Alex Johnson"
                              value={form.name}
                              onChange={set("name")}
                              className="w-full rounded-xl border border-[#121312]/10 bg-[#f4f5f7] px-3.5 py-2.5 text-sm text-[#121312] placeholder:text-[#121312]/30 focus:border-[#f16e2c]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#f16e2c]/15 transition-all"
                            />
                          </label>
                          <label className="block">
                            <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#121312]/60">
                              <Mail className="h-3 w-3" /> Work email
                            </span>
                            <input
                              type="email"
                              required
                              placeholder="alex@company.com"
                              value={form.email}
                              onChange={set("email")}
                              className="w-full rounded-xl border border-[#121312]/10 bg-[#f4f5f7] px-3.5 py-2.5 text-sm text-[#121312] placeholder:text-[#121312]/30 focus:border-[#f16e2c]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#f16e2c]/15 transition-all"
                            />
                          </label>
                        </div>

                        <label className="block">
                          <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#121312]/60">
                            <Building2 className="h-3 w-3" /> Company
                          </span>
                          <input
                            type="text"
                            required
                            placeholder="Acme Corp"
                            value={form.company}
                            onChange={set("company")}
                            className="w-full rounded-xl border border-[#121312]/10 bg-[#f4f5f7] px-3.5 py-2.5 text-sm text-[#121312] placeholder:text-[#121312]/30 focus:border-[#f16e2c]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#f16e2c]/15 transition-all"
                          />
                        </label>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <label className="block">
                            <span className="mb-1.5 block text-xs font-semibold text-[#121312]/60">Team size</span>
                            <div className="relative">
                              <select
                                required
                                value={form.teamSize}
                                onChange={set("teamSize")}
                                className="w-full appearance-none rounded-xl border border-[#121312]/10 bg-[#f4f5f7] px-3.5 py-2.5 text-sm text-[#121312] focus:border-[#f16e2c]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#f16e2c]/15 transition-all"
                              >
                                <option value="">Select size</option>
                                {TEAM_SIZES.map((s) => <option key={s} value={s}>{s} people</option>)}
                              </select>
                              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#121312]/30" />
                            </div>
                          </label>
                          <label className="block">
                            <span className="mb-1.5 block text-xs font-semibold text-[#121312]/60">Your role</span>
                            <div className="relative">
                              <select
                                required
                                value={form.role}
                                onChange={set("role")}
                                className="w-full appearance-none rounded-xl border border-[#121312]/10 bg-[#f4f5f7] px-3.5 py-2.5 text-sm text-[#121312] focus:border-[#f16e2c]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#f16e2c]/15 transition-all"
                              >
                                <option value="">Select role</option>
                                {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                              </select>
                              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#121312]/30" />
                            </div>
                          </label>
                        </div>

                        <button
                          type="submit"
                          disabled={!canSubmit || sending}
                          className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#f16e2c] text-sm font-bold text-white shadow-md shadow-[#f16e2c]/20 transition-all hover:shadow-lg hover:shadow-[#f16e2c]/30 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                        >
                          {sending ? (
                            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
                              <path d="M12 2a10 10 0 0 1 10 10" />
                            </svg>
                          ) : (
                            <>Request demo <ArrowRight className="h-4 w-4" /></>
                          )}
                        </button>
                        <p className="text-center text-[11px] text-[#121312]/35">
                          By submitting you agree to our{" "}
                          <Link href="/privacy" className="underline hover:text-[#121312]/60">Privacy Policy</Link>.
                        </p>
                      </motion.form>
                    ) : (
                      <motion.div
                        key="sent"
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-8 text-center"
                      >
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50">
                          <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                        </div>
                        <h2 className="text-xl font-bold text-[#121312]">You&apos;re booked in!</h2>
                        <p className="mx-auto mt-2 max-w-[340px] text-sm text-[#121312]/55">
                          We&apos;ll send a calendar invite to <strong>{form.email}</strong> within one business day.
                        </p>
                        <p className="mt-5 text-sm text-[#121312]/45">While you wait —</p>
                        <button
                          type="button"
                          onClick={() => setTab("try")}
                          className="mt-3 inline-flex items-center gap-1.5 rounded-xl border border-[#121312]/10 bg-[#f4f5f7] px-4 py-2 text-sm font-semibold text-[#121312] transition-colors hover:bg-[#121312]/8"
                        >
                          <Play className="h-3.5 w-3.5" />
                          Try the interactive demo
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── TRY INTERACTIVE ── */}
          {tab === "try" && (
            <motion.div
              key="try"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="mt-6"
            >
              <p className="mb-5 text-center text-sm text-[#121312]/50">
                Pick a product to explore an interactive walkthrough — no sign-up needed.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {PRODUCT_CARDS.map((product, i) => (
                  <motion.div
                    key={product.key}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      href={`/products/${product.key}/demo`}
                      className="group flex flex-col rounded-2xl border border-white/90 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className="flex h-10 w-10 items-center justify-center rounded-xl text-xl"
                          style={{ backgroundColor: `${product.color}18` }}
                        >
                          {product.icon}
                        </span>
                        {!product.available && (
                          <span className="rounded-full bg-[#121312]/6 px-2 py-0.5 text-[10px] font-semibold text-[#121312]/40">
                            Coming soon
                          </span>
                        )}
                      </div>
                      <div className="mt-3 flex-1">
                        <p className="text-sm font-bold text-[#121312]">{product.name}</p>
                        <p className="text-xs font-medium" style={{ color: product.color }}>{product.tagline}</p>
                        <p className="mt-1.5 text-xs leading-relaxed text-[#121312]/50">{product.description}</p>
                      </div>
                      <div className="mt-4 flex items-center gap-1 text-xs font-semibold" style={{ color: product.color }}>
                        {product.available ? "Explore demo" : "Coming soon"}
                        {product.available && <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-[#121312]/45">Want a guided walkthrough instead?</p>
                <button
                  type="button"
                  onClick={() => setTab("book")}
                  className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-[#f16e2c] transition-opacity hover:opacity-75"
                >
                  <Calendar className="h-4 w-4" />
                  Book a live demo
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-5 py-5 text-xs text-[#121312]/35">
        <span>&copy; 2025-2026 Voatomy Labs</span>
        <span>&middot;</span>
        <Link href="/privacy" className="hover:text-[#121312]/60">Privacy</Link>
        <span>&middot;</span>
        <Link href="/onboard" className="hover:text-[#121312]/60">Start onboarding →</Link>
      </footer>
    </main>
  );
}
