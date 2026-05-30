"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Shield,
  Lock,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const PRODUCTS = [
  { name: "ATLAS", href: "/products/atlas", color: "#f16e2c", desc: "Sprint Intelligence" },
  { name: "LOOP", href: "/products/loop", color: "#6366f1", desc: "Revenue Feedback" },
  { name: "SIGNAL", href: "/products/signal", color: "#ef4444", desc: "Incident Intelligence" },
  { name: "DRIFT", href: "/products/drift", color: "#8B5CF6", desc: "Design Sync" },
  { name: "PHANTOM", href: "/products/phantom", color: "#22D3EE", desc: "Tech Debt Radar" },
  { name: "NEXUS", href: "/products/nexus", color: "#10B981", desc: "Org Intelligence" },
];

const TRUST_LOGOS = [
  "Vercel", "Raycast", "Linear", "Loom", "Notion", "Figma",
];

const CERTIFICATIONS = [
  { icon: Shield, label: "SOC 2 Type II" },
  { icon: Lock, label: "GDPR Ready" },
  { icon: CheckCircle2, label: "99.99% SLA" },
];

function ProductSwitcher() {
  const pathname = usePathname();
  const currentProduct = PRODUCTS.find((p) => pathname?.includes(p.href));

  return (
    <div className="relative z-20 border-b premium-divider">
      <div className="mx-auto max-w-container px-4">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-3 -mx-1">
          {PRODUCTS.map((product) => {
            const isActive = pathname?.includes(product.href);
            return (
              <Link
                key={product.name}
                href={product.href}
                className={cn(
                  "relative flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium whitespace-nowrap transition-all duration-300",
                  isActive
                    ? "text-theme"
                    : "text-theme-m hover:text-theme-s hover:bg-theme-subtle",
                )}
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full transition-all duration-300",
                    isActive ? "scale-100 opacity-100" : "scale-75 opacity-40",
                  )}
                  style={{ backgroundColor: product.color }}
                />
                <span>{product.name}</span>
                {isActive && (
                  <span className="text-[10px] text-theme-m font-normal hidden sm:inline">
                    {product.desc}
                  </span>
                )}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full"
                    style={{ backgroundColor: product.color }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TrustedByBar() {
  return (
    <div className="relative z-10 border-b premium-divider bg-theme-subtle/50">
      <div className="mx-auto max-w-container px-4 py-4">
        <div className="flex items-center justify-center gap-8 sm:gap-12">
          <span className="text-[11px] font-medium tracking-widest uppercase text-theme-f whitespace-nowrap">
            Trusted by
          </span>
          <div className="flex items-center gap-6 sm:gap-10">
            {TRUST_LOGOS.map((name) => (
              <span
                key={name}
                className="text-sm font-semibold text-theme-f/60 transition-colors hover:text-theme-m"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function EnterpriseCTA() {
  return (
    <section className="relative overflow-hidden bg-theme">
      <div className="premium-divider" />
      <div className="relative py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0 fine-grid" />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full opacity-[0.06] blur-[100px] bg-brand animate-ambient-glow" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            {CERTIFICATIONS.map((cert) => (
              <span key={cert.label} className="enterprise-badge">
                <cert.icon className="h-3 w-3" />
                {cert.label}
              </span>
            ))}
          </div>

          <h2 className="text-heading-1 sm:text-display-2 text-theme mb-4 tracking-tight">
            Enterprise-grade intelligence for{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand to-brand-dark">
              every team
            </span>
          </h2>
          <p className="text-body-lg text-theme-s mb-10 max-w-xl mx-auto">
            Join hundreds of engineering organizations using Voatomy to make data-driven decisions. Start free, scale when ready.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" asChild>
              <Link href="/auth/signup">
                Get Started Free <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/contact">
                Talk to Sales
              </Link>
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4 text-xs text-theme-m">
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-brand" />
              No credit card required
            </span>
            <span className="h-1 w-1 rounded-full bg-theme-f" />
            <span>Free tier forever</span>
            <span className="h-1 w-1 rounded-full bg-theme-f" />
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <ProductSwitcher />
      {children}
      <TrustedByBar />
      <EnterpriseCTA />
    </div>
  );
}
