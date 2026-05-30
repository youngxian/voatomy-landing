/**
 * fynk.com-inspired design tokens for Voatomy marketing.
 * Reference: https://fynk.com/en/
 */
export const FYNK = {
  orange: "#F05A28",
  orangeHover: "#E04E1E",
  orangeLight: "#FFF4EF",
  blue: "#3B82F6",
  blueLight: "#EFF6FF",
  yellow: "#FBBF24",
  yellowLight: "#FFFBEB",
  teal: "#0D9488",
  tealLight: "#F0FDFA",
  ink: "#111827",
  body: "#374151",
  muted: "#6B7280",
  faint: "#9CA3AF",
  border: "rgba(17, 24, 39, 0.08)",
  borderHover: "rgba(17, 24, 39, 0.14)",
  surface: "#FFFFFF",
  surfaceAlt: "#F9FAFB",
  surfaceWarm: "#FFFBF7",
  cream: "#F3F4F6",
  radius: {
    card: "1rem",
    pill: "9999px",
  },
} as const;

export const FYNK_AVATAR_COLORS = [
  { bg: FYNK.blue, text: "#FFFFFF" },
  { bg: FYNK.orange, text: "#FFFFFF" },
  { bg: FYNK.yellow, text: "#111827" },
] as const;

export const FYNK_ANIMATION = {
  reveal: "transition-all duration-700 ease-out",
  revealUp: "opacity-0 translate-y-8 data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0",
  hoverLift: "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg",
  float: "animate-float-slow",
} as const;
