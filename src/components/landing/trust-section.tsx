"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { useDictionary } from "@/i18n/locale-provider";
import { IntegrationLogo } from "@/components/icons/integration-logos";

const TRUST_TOOLS = [
  { key: "github", name: "GitHub", label: "GitHub" },
  { key: "jira", name: "Jira", label: "Jira" },
  { key: "slack", name: "Slack", label: "Slack" },
  { key: "linear", name: "Linear", label: "Linear" },
  { key: "figma", name: "Figma", label: "Figma" },
  { key: "notion", name: "Notion", label: "Notion" },
  { key: "hubspot", name: "HubSpot", label: "HubSpot" },
  { key: "gitlab", name: "GitLab", label: "GitLab" },
  { key: "asana", name: "Asana", label: "Asana" },
  { key: "confluence", name: "Confluence", label: "Confluence" },
  { key: "datadog", name: "Datadog", label: "Datadog" },
  { key: "sentry", name: "Sentry", label: "Sentry" },
  { key: "teams", name: "Microsoft Teams", label: "Teams" },
  { key: "azure-devops", name: "Azure DevOps", label: "Azure DevOps" },
] as const;

export function TrustSection() {
  const { ref, isVisible } = useScrollAnimation();
  const t = useDictionary().hero;

  return (
    <section className="bg-[#f9fafb] px-4 py-12 sm:py-16 lg:py-20">
      <div
        ref={ref}
        className={cn(
          "mx-auto max-w-container transition-all duration-700",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        )}
      >
        <p className="mx-auto mb-8 max-w-3xl text-center text-base leading-relaxed text-[#374151] sm:mb-10 sm:text-lg md:text-xl">
          {t.socialProofBefore}{" "}
          <span className="mx-0.5 inline-flex items-center rounded-full border border-[#e5e7eb] bg-white px-3 py-0.5 text-[#111827] shadow-[0_1px_2px_rgba(0,0,0,0.06)] sm:px-3.5 sm:py-1">
            <span className="font-semibold">{t.socialProofHighlight}</span>
          </span>{" "}
          {t.socialProofAfter}
        </p>

        <div className="mx-auto grid max-w-4xl grid-cols-4 gap-2 sm:grid-cols-7 sm:gap-2.5">
          {TRUST_TOOLS.map(({ key, name, label }) => (
            <div
              key={key}
              className="flex flex-col items-center justify-center gap-1 rounded-lg bg-[#f3f4f6] px-1.5 py-2 ring-1 ring-[#e5e7eb]/80 transition-all duration-200 hover:bg-white hover:shadow-sm hover:ring-[#d1d5db] sm:gap-1.5 sm:px-2 sm:py-2.5"
              title={name}
            >
              <IntegrationLogo
                integrationKey={key}
                name={name}
                size="md"
                className="h-6 w-6 sm:h-7 sm:w-7"
              />
              <span className="w-full truncate text-center text-[9px] font-medium leading-tight text-[#64748b] sm:text-[10px]">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
