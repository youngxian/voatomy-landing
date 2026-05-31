"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { useDictionary } from "@/i18n/locale-provider";
import { DoodleIntegrationIcon } from "@/components/marketing/doodle-integration-icons";
import { HexIconStrip } from "@/components/marketing/graph-node-primitives";

const TRUST_INTEGRATIONS = [
  "Linear",
  "GitHub",
  "Jira",
  "Slack",
  "Notion",
  "Figma",
  "HubSpot",
] as const;

export function TrustSection() {
  const { ref, isVisible } = useScrollAnimation();
  const t = useDictionary().hero;

  return (
    <section className="bg-white px-4 py-10 sm:py-16 lg:py-20">
      <div
        ref={ref}
        className={cn(
          "mx-auto max-w-container transition-all duration-700",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        )}
      >
        <p className="mb-6 text-center text-sm text-fynk-body sm:mb-10 sm:text-body-base md:text-body-lg">
          {t.socialProof}
        </p>

        <HexIconStrip
          icons={TRUST_INTEGRATIONS.map((name) => ({
            key: name,
            node: <DoodleIntegrationIcon name={name} size={32} />,
          }))}
        />
      </div>
    </section>
  );
}
