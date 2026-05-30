"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export const DOODLE_INK = "#111827";
const S = 2;

type DoodleProps = { className?: string; size?: number };

function DoodleSvg({
  className,
  size = 40,
  children,
  viewBox = "0 0 40 40",
}: {
  className?: string;
  size?: number;
  children: React.ReactNode;
  viewBox?: string;
}) {
  return (
    <svg
      viewBox={viewBox}
      width={size}
      height={size}
      className={cn("shrink-0", className)}
      aria-hidden
    >
      {children}
    </svg>
  );
}

/** Voatomy-style delivery bird + envelope (reference style) */
export function DoodleBirdMailIcon({ className, size = 40 }: DoodleProps) {
  return (
    <DoodleSvg className={className} size={size} viewBox="0 0 48 32">
      <ellipse cx="14" cy="18" rx="10" ry="8" fill="#3B82F6" stroke={DOODLE_INK} strokeWidth={S} />
      <circle cx="18" cy="16" r="1.5" fill={DOODLE_INK} />
      <path d="M22 17 L26 16 L22 19 Z" fill="#2563EB" stroke={DOODLE_INK} strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M8 20 Q6 22 8 24" stroke={DOODLE_INK} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <rect x="28" y="10" width="16" height="12" rx="2" fill="#fff" stroke={DOODLE_INK} strokeWidth={S} />
      <path d="M28 10 L36 17 L44 10" fill="none" stroke="#93C5FD" strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="28" y1="17" x2="44" y2="17" stroke="#93C5FD" strokeWidth="1.2" />
    </DoodleSvg>
  );
}

export function DoodleGitHubIcon({ className, size = 40 }: DoodleProps) {
  return (
    <DoodleSvg className={className} size={size}>
      <circle cx="20" cy="20" r="16" fill="#24292F" stroke={DOODLE_INK} strokeWidth={S} />
      <circle cx="20" cy="17" r="6" fill="#fff" stroke={DOODLE_INK} strokeWidth="1.5" />
      <path d="M14 26 Q20 30 26 26" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </DoodleSvg>
  );
}

export function DoodleJiraIcon({ className, size = 40 }: DoodleProps) {
  return (
    <DoodleSvg className={className} size={size}>
      <path d="M20 6 L32 20 L20 34 L8 20 Z" fill="#2684FF" stroke={DOODLE_INK} strokeWidth={S} strokeLinejoin="round" />
      <path d="M20 14 L26 20 L20 26 L14 20 Z" fill="#fff" stroke={DOODLE_INK} strokeWidth="1.2" strokeLinejoin="round" />
    </DoodleSvg>
  );
}

export function DoodleSlackIcon({ className, size = 40 }: DoodleProps) {
  const dots = [
    { cx: 14, cy: 14, fill: "#E01E5A" },
    { cx: 26, cy: 14, fill: "#36C5F0" },
    { cx: 14, cy: 26, fill: "#2EB67D" },
    { cx: 26, cy: 26, fill: "#ECB22E" },
  ];
  return (
    <DoodleSvg className={className} size={size}>
      <rect x="6" y="6" width="28" height="28" rx="6" fill="#fff" stroke={DOODLE_INK} strokeWidth={S} />
      {dots.map(({ cx, cy, fill }) => (
        <g key={`${cx}-${cy}`}>
          <rect x={cx - 4} y={cy - 4} width="8" height="8" rx="2" fill={fill} stroke={DOODLE_INK} strokeWidth="1.2" />
        </g>
      ))}
    </DoodleSvg>
  );
}

export function DoodleFigmaIcon({ className, size = 40 }: DoodleProps) {
  return (
    <DoodleSvg className={className} size={size}>
      <rect x="6" y="6" width="12" height="12" rx="3" fill="#F24E1E" stroke={DOODLE_INK} strokeWidth="1.5" />
      <rect x="22" y="6" width="12" height="12" rx="3" fill="#A259FF" stroke={DOODLE_INK} strokeWidth="1.5" />
      <rect x="6" y="22" width="12" height="12" rx="3" fill="#0ACF83" stroke={DOODLE_INK} strokeWidth="1.5" />
      <circle cx="28" cy="28" r="6" fill="#1ABCFE" stroke={DOODLE_INK} strokeWidth="1.5" />
    </DoodleSvg>
  );
}

export function DoodleLinearIcon({ className, size = 40 }: DoodleProps) {
  return (
    <DoodleSvg className={className} size={size}>
      <rect x="6" y="6" width="28" height="28" rx="6" fill="#5E6AD2" stroke={DOODLE_INK} strokeWidth={S} />
      <line x1="12" y1="28" x2="28" y2="12" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
    </DoodleSvg>
  );
}

export function DoodleGitLabIcon({ className, size = 40 }: DoodleProps) {
  return (
    <DoodleSvg className={className} size={size}>
      <path d="M20 8 L32 30 H8 Z" fill="#FC6D26" stroke={DOODLE_INK} strokeWidth={S} strokeLinejoin="round" />
      <path d="M20 8 L26 22 H14 Z" fill="#E24329" stroke={DOODLE_INK} strokeWidth="1.2" strokeLinejoin="round" />
    </DoodleSvg>
  );
}

export function DoodleNotionIcon({ className, size = 40 }: DoodleProps) {
  return (
    <DoodleSvg className={className} size={size}>
      <rect x="8" y="6" width="24" height="28" rx="3" fill="#fff" stroke={DOODLE_INK} strokeWidth={S} />
      <text x="20" y="26" textAnchor="middle" fill={DOODLE_INK} fontSize="16" fontWeight="800">
        N
      </text>
    </DoodleSvg>
  );
}

export function DoodleSalesforceIcon({ className, size = 40 }: DoodleProps) {
  return (
    <DoodleSvg className={className} size={size}>
      <ellipse cx="20" cy="22" rx="14" ry="9" fill="#00A1E0" stroke={DOODLE_INK} strokeWidth={S} />
      <path d="M10 18 Q20 8 30 18" fill="#fff" stroke={DOODLE_INK} strokeWidth="1.5" />
    </DoodleSvg>
  );
}

export function DoodleHubSpotIcon({ className, size = 40 }: DoodleProps) {
  return (
    <DoodleSvg className={className} size={size}>
      <circle cx="20" cy="20" r="14" fill="#FF7A59" stroke={DOODLE_INK} strokeWidth={S} />
      <circle cx="20" cy="20" r="5" fill="#fff" stroke={DOODLE_INK} strokeWidth="1.5" />
      {[0, 72, 144, 216, 288].map((deg) => {
        const r = (deg * Math.PI) / 180;
        const x = 20 + Math.cos(r) * 10;
        const y = 20 + Math.sin(r) * 10;
        return <circle key={deg} cx={x} cy={y} r="2.5" fill="#fff" stroke={DOODLE_INK} strokeWidth="1" />;
      })}
    </DoodleSvg>
  );
}

export function DoodleGoogleDriveIcon({ className, size = 40 }: DoodleProps) {
  return (
    <DoodleSvg className={className} size={size}>
      <path d="M20 8 L34 32 H6 Z" fill="#FBBC04" stroke={DOODLE_INK} strokeWidth={S} strokeLinejoin="round" />
      <path d="M20 8 L28 20 H12 Z" fill="#34A853" stroke={DOODLE_INK} strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M12 20 H28 L34 32 H6 Z" fill="#4285F4" stroke={DOODLE_INK} strokeWidth="1.2" strokeLinejoin="round" />
    </DoodleSvg>
  );
}

export function DoodleGmailIcon({ className, size = 40 }: DoodleProps) {
  return (
    <DoodleSvg className={className} size={size}>
      <rect x="8" y="12" width="24" height="18" rx="2" fill="#fff" stroke={DOODLE_INK} strokeWidth={S} />
      <path d="M8 12 L20 22 L32 12" fill="none" stroke="#EA4335" strokeWidth="2" strokeLinejoin="round" />
      <rect x="8" y="12" width="24" height="6" fill="#EA4335" opacity="0.25" />
    </DoodleSvg>
  );
}

export function DoodleTeamsIcon({ className, size = 40 }: DoodleProps) {
  return (
    <DoodleSvg className={className} size={size}>
      <rect x="6" y="10" width="28" height="22" rx="3" fill="#6264A7" stroke={DOODLE_INK} strokeWidth={S} />
      <text x="20" y="26" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="800">
        T
      </text>
    </DoodleSvg>
  );
}

export function DoodleDatadogIcon({ className, size = 40 }: DoodleProps) {
  return (
    <DoodleSvg className={className} size={size}>
      <rect x="8" y="14" width="24" height="16" rx="4" fill="#632CA6" stroke={DOODLE_INK} strokeWidth={S} />
      <circle cx="15" cy="22" r="3" fill="#fff" stroke={DOODLE_INK} strokeWidth="1.2" />
      <circle cx="25" cy="22" r="3" fill="#fff" stroke={DOODLE_INK} strokeWidth="1.2" />
      <path d="M12 14 L16 8 H24 L28 14" fill="#632CA6" stroke={DOODLE_INK} strokeWidth="1.5" strokeLinejoin="round" />
    </DoodleSvg>
  );
}

export function DoodleAsanaIcon({ className, size = 40 }: DoodleProps) {
  return (
    <DoodleSvg className={className} size={size}>
      <circle cx="13" cy="22" r="6" fill="#F06A6A" stroke={DOODLE_INK} strokeWidth="1.5" />
      <circle cx="27" cy="22" r="6" fill="#F06A6A" stroke={DOODLE_INK} strokeWidth="1.5" />
      <circle cx="20" cy="14" r="6" fill="#F06A6A" stroke={DOODLE_INK} strokeWidth="1.5" />
    </DoodleSvg>
  );
}

export function DoodleBitbucketIcon({ className, size = 40 }: DoodleProps) {
  return (
    <DoodleSvg className={className} size={size}>
      <path d="M8 10 H32 L28 30 H12 Z" fill="#2684FF" stroke={DOODLE_INK} strokeWidth={S} strokeLinejoin="round" />
      <rect x="16" y="16" width="8" height="6" rx="1" fill="#fff" stroke={DOODLE_INK} strokeWidth="1.2" />
    </DoodleSvg>
  );
}

export function DoodleZendeskIcon({ className, size = 40 }: DoodleProps) {
  return (
    <DoodleSvg className={className} size={size}>
      <circle cx="20" cy="20" r="14" fill="#03363D" stroke={DOODLE_INK} strokeWidth={S} />
      <path d="M12 24 Q20 12 28 24" fill="none" stroke="#78A300" strokeWidth="2.5" strokeLinecap="round" />
    </DoodleSvg>
  );
}

export function DoodleIntercomIcon({ className, size = 40 }: DoodleProps) {
  return (
    <DoodleSvg className={className} size={size}>
      <rect x="10" y="12" width="20" height="16" rx="8" fill="#286EFA" stroke={DOODLE_INK} strokeWidth={S} />
      <circle cx="16" cy="20" r="2" fill="#fff" />
      <circle cx="24" cy="20" r="2" fill="#fff" />
      <path d="M16 24 Q20 27 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
    </DoodleSvg>
  );
}

export function DoodleCalendarIcon({ className, size = 40 }: DoodleProps) {
  return (
    <DoodleSvg className={className} size={size}>
      <rect x="8" y="10" width="24" height="24" rx="3" fill="#fff" stroke={DOODLE_INK} strokeWidth={S} />
      <rect x="8" y="10" width="24" height="8" fill="#4285F4" stroke={DOODLE_INK} strokeWidth="1.5" />
      <line x1="14" y1="8" x2="14" y2="14" stroke={DOODLE_INK} strokeWidth="2" strokeLinecap="round" />
      <line x1="26" y1="8" x2="26" y2="14" stroke={DOODLE_INK} strokeWidth="2" strokeLinecap="round" />
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3].map((c) => (
          <rect
            key={`${r}-${c}`}
            x={12 + c * 5}
            y={22 + r * 4}
            width="3"
            height="2.5"
            rx="0.5"
            fill="#E5E7EB"
            stroke={DOODLE_INK}
            strokeWidth="0.5"
          />
        )),
      )}
    </DoodleSvg>
  );
}

export function DoodleFramerIcon({ className, size = 40 }: DoodleProps) {
  return (
    <DoodleSvg className={className} size={size}>
      <path d="M10 8 H30 V18 H20 V32 H10 Z" fill="#0055FF" stroke={DOODLE_INK} strokeWidth={S} strokeLinejoin="round" />
    </DoodleSvg>
  );
}

export function DoodlePagerDutyIcon({ className, size = 40 }: DoodleProps) {
  return (
    <DoodleSvg className={className} size={size}>
      <circle cx="20" cy="20" r="14" fill="#06AC38" stroke={DOODLE_INK} strokeWidth={S} />
      <path d="M20 10 V20 L26 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
    </DoodleSvg>
  );
}

export function DoodleOutlookIcon({ className, size = 40 }: DoodleProps) {
  return (
    <DoodleSvg className={className} size={size}>
      <rect x="8" y="12" width="24" height="18" rx="2" fill="#0078D4" stroke={DOODLE_INK} strokeWidth={S} />
      <text x="20" y="26" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="800">
        O
      </text>
    </DoodleSvg>
  );
}

export function DoodleAdobeIcon({ className, size = 40 }: DoodleProps) {
  return (
    <DoodleSvg className={className} size={size}>
      <rect x="8" y="8" width="24" height="24" rx="4" fill="#FF0000" stroke={DOODLE_INK} strokeWidth={S} />
      <text x="20" y="25" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="800">
        Ae
      </text>
    </DoodleSvg>
  );
}

export function DoodleFreshdeskIcon({ className, size = 40 }: DoodleProps) {
  return (
    <DoodleSvg className={className} size={size}>
      <circle cx="20" cy="20" r="14" fill="#25C16F" stroke={DOODLE_INK} strokeWidth={S} />
      <path d="M14 22 L18 26 L26 16" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </DoodleSvg>
  );
}

const DOODLE_MAP: Record<string, React.ComponentType<DoodleProps>> = {
  GitHub: DoodleGitHubIcon,
  Jira: DoodleJiraIcon,
  Slack: DoodleSlackIcon,
  Figma: DoodleFigmaIcon,
  Linear: DoodleLinearIcon,
  GitLab: DoodleGitLabIcon,
  Notion: DoodleNotionIcon,
  Salesforce: DoodleSalesforceIcon,
  HubSpot: DoodleHubSpotIcon,
  "Google Drive": DoodleGoogleDriveIcon,
  Gmail: DoodleGmailIcon,
  "Microsoft Teams": DoodleTeamsIcon,
  Datadog: DoodleDatadogIcon,
  Asana: DoodleAsanaIcon,
  Bitbucket: DoodleBitbucketIcon,
  Zendesk: DoodleZendeskIcon,
  Intercom: DoodleIntercomIcon,
  "Google Calendar": DoodleCalendarIcon,
  Framer: DoodleFramerIcon,
  PagerDuty: DoodlePagerDutyIcon,
  "Microsoft Outlook": DoodleOutlookIcon,
  "Adobe Creative Cloud": DoodleAdobeIcon,
  Freshdesk: DoodleFreshdeskIcon,
};

export function DoodleIntegrationIcon({
  name,
  className,
  size = 40,
}: {
  name: string;
  className?: string;
  size?: number;
}) {
  const Icon = DOODLE_MAP[name] ?? DoodleBirdMailIcon;
  return <Icon className={className} size={size} />;
}

/** Floating chip — white card + doodle icon + label */
export function DoodleIconChip({
  name,
  label,
  className,
  style,
  rotate = 0,
  size = 36,
}: {
  name: string;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
  rotate?: number;
  size?: number;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-1.5 rounded-2xl border-2 border-fynk-ink/90 bg-white px-2.5 py-2 shadow-[0_4px_14px_rgba(0,0,0,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        className,
      )}
      style={{
        ...style,
        transform: rotate
          ? `${style?.transform ? `${style.transform} ` : ""}rotate(${rotate}deg)`
          : style?.transform,
      }}
    >
      <DoodleIntegrationIcon name={name} size={size} />
      {label && (
        <span className="max-w-[72px] truncate text-[9px] font-bold uppercase tracking-wide text-fynk-ink">
          {label}
        </span>
      )}
    </div>
  );
}
