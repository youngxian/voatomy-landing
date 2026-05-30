import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        heading: [
          "var(--font-heading)",
          "Labil Grotesk",
          "var(--font-inter)",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        handwriting: [
          "var(--font-handwriting)",
          "Caveat",
          "cursive",
        ],
      },
      colors: {
        brand: {
          DEFAULT: "#004838",
          light: "#e6fff0",
          dark: "#073127",
          50: "#e6fff0",
          100: "#b3ffd6",
          200: "#80ffbb",
          300: "#4dffa1",
          400: "#26ff8d",
          500: "#004838",
          600: "#073127",
          700: "#073127",
          800: "#073127",
          900: "#021a12",
        },
        safe: {
          green: "#004838",
          "green-dark": "#073127",
          black: "#073127",
          dark: "#073127",
          "dark-gray": "#333F3C",
          white: "#ffffff",
          gray: "#a1a3a7",
        },
        surface: {
          DEFAULT: "#EBEDE8",
          white: "#ffffff",
          dark: "#073127",
          darker: "#073127",
          muted: "#8a8f98",
        },
        border: {
          DEFAULT: "#e5e7eb",
          light: "rgba(0, 0, 0, 0.06)",
          dark: "rgba(255, 255, 255, 0.1)",
        },
        teal: {
          DEFAULT: "#004838",
          dark: "#073127",
          light: "#005a48",
        },
        cream: "#EBEDE8",
        charcoal: "#333F3C",
        "heading-dark": "#073127",
        "body-dark": "#333F3C",
        fynk: {
          orange: "#F05A28",
          "orange-hover": "#E04E1E",
          "orange-light": "#FFF4EF",
          blue: "#3B82F6",
          "blue-light": "#EFF6FF",
          yellow: "#FBBF24",
          ink: "#111827",
          body: "#374151",
          muted: "#6B7280",
          faint: "#9CA3AF",
          border: "rgba(17, 24, 39, 0.08)",
          "border-hover": "rgba(17, 24, 39, 0.14)",
          surface: "#FFFFFF",
          "surface-alt": "#F9FAFB",
          "surface-warm": "#FFFBF7",
        },
        "accent-lime": "#E2FB6C",
        coral: { DEFAULT: "#F97316", light: "#FFF7ED", dark: "#EA580C" },
        violet: { DEFAULT: "#8B5CF6", light: "#F5F3FF", dark: "#6D28D9" },
        amber: { DEFAULT: "#F59E0B", light: "#FFFBEB", dark: "#D97706" },
        sky: { DEFAULT: "#0EA5E9", light: "#F0F9FF", dark: "#0284C7" },
        rose: { DEFAULT: "#F43F5E", light: "#FFF1F2", dark: "#E11D48" },
      },
      fontSize: {
        /* fynk.com text-heading-* scale (Labil Grotesk, weight 500) */
        "display-1": [
          "90px",
          { lineHeight: "0.9", letterSpacing: "-1.62px", fontWeight: "700" },
        ],
        "display-2": [
          "64px",
          { lineHeight: "1.1", letterSpacing: "-1.28px", fontWeight: "700" },
        ],
        "heading-1": [
          "54px",
          { lineHeight: "1.1", letterSpacing: "-1.08px", fontWeight: "700" },
        ],
        "heading-2": [
          "42px",
          { lineHeight: "1.1", letterSpacing: "-0.84px", fontWeight: "700" },
        ],
        "heading-3": [
          "32px",
          { lineHeight: "1.1", letterSpacing: "-0.64px", fontWeight: "700" },
        ],
        "heading-4": [
          "28px",
          { lineHeight: "1.1", letterSpacing: "-0.56px", fontWeight: "700" },
        ],
        "heading-5": [
          "22px",
          { lineHeight: "1.2", letterSpacing: "-0.44px", fontWeight: "700" },
        ],
        /* fynk.com text-body-* scale (Inter, weight 400) */
        "body-xl": [
          "22px",
          { lineHeight: "1.5", letterSpacing: "-0.22px" },
        ],
        "body-lg": [
          "20px",
          { lineHeight: "1.4444", letterSpacing: "-0.2px" },
        ],
        "body-base": [
          "18px",
          { lineHeight: "1.5", letterSpacing: "-0.18px" },
        ],
        "body-sm": [
          "15px",
          { lineHeight: "1.42857", letterSpacing: "-0.15px" },
        ],
      },
      borderRadius: {
        card: "20px",
      },
      spacing: {
        section: "96px",
        "section-element": "64px",
      },
      maxWidth: {
        container: "1600px",
      },
      keyframes: {
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          from: { opacity: "0", transform: "translateX(-30px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(30px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        "chip-float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-3px)" },
        },
        "menu-in": {
          from: { opacity: "0", transform: "translateY(-8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "nav-drop-in": {
          from: { opacity: "0", transform: "translateY(-10px) scale(0.98)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "nav-slide-down": {
          from: { opacity: "0", transform: "translateY(-16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "hero-scale-in": {
          from: { opacity: "0", transform: "translateY(32px) scale(0.96)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "hero-fade-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "trust-dot": {
          "0%, 100%": { opacity: "0.3", transform: "translate(-50%, -50%) scale(1)" },
          "50%": { opacity: "1", transform: "translate(-50%, -50%) scale(1.6)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "ambient-glow": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.65", transform: "scale(1.03)" },
        },
        "mesh-move": {
          "0%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(3%, -2%)" },
          "100%": { transform: "translate(0, 0)" },
        },
        "border-shine": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.95)", opacity: "0.7" },
          "50%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(0.95)", opacity: "0.7" },
        },
        "orbit": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "count-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "wire-crawl": {
          "0%": { left: "4%" },
          "50%": { left: "96%" },
          "100%": { left: "4%" },
        },
        "orb-drift-1": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(8%, -6%) scale(1.05)" },
        },
        "orb-drift-2": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(-6%, 8%) scale(1.04)" },
        },
        "picture-float": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-5px) rotate(0.3deg)" },
        },
        /* fynk.com rotating-word hero — swap-in / swap-out */
        "word-swap-in": {
          "0%": { opacity: "0", transform: "translateY(14px) scale(0.92)", filter: "blur(4px)" },
          "55%": { opacity: "1", transform: "translateY(0) scale(1.02)", filter: "blur(0)" },
          "100%": { transform: "translateY(0) scale(1)" },
        },
        "word-swap-out": {
          "0%": { opacity: "1", transform: "translateY(0) scale(1)", filter: "blur(0)" },
          "100%": { opacity: "0", transform: "translateY(-14px) scale(0.92)", filter: "blur(4px)" },
        },
        /* fynk.com card-stack drift (3-step "How it works" illustrations) */
        "fynk-card-drift": {
          "0%, 100%": { transform: "translate(0, 0) rotate(-1.2deg)" },
          "50%": { transform: "translate(0.6%, -1.2%) rotate(-0.6deg)" },
        },
        "fynk-card-drift-alt": {
          "0%, 100%": { transform: "translate(0, 0) rotate(1.5deg)" },
          "50%": { transform: "translate(-0.4%, -1.6%) rotate(0.8deg)" },
        },
        /* fynk.com soft ambient breathing */
        "fynk-ambient": {
          "0%, 100%": { opacity: "0.55", transform: "translate(0,0) scale(1)" },
          "50%": { opacity: "0.75", transform: "translate(2%, -3%) scale(1.04)" },
        },
        "logo-drift-a": {
          "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
          "33%": { transform: "translate(6px, -12px) rotate(2.5deg)" },
          "66%": { transform: "translate(-5px, 8px) rotate(-2deg)" },
        },
        "logo-drift-b": {
          "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
          "50%": { transform: "translate(-10px, -14px) rotate(-3deg)" },
        },
        "logo-drift-c": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(8px, 10px) scale(1.04)" },
        },
        "logo-pop-in": {
          from: { opacity: "0", transform: "scale(0.55) translateY(24px)" },
          to: { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        "marquee-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "hub-pulse": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.85" },
          "50%": { transform: "scale(1.06)", opacity: "1" },
        },
        "ring-expand": {
          "0%": { transform: "scale(0.85)", opacity: "0.55" },
          "100%": { transform: "scale(1.55)", opacity: "0" },
        },
        "dash-flow": {
          "0%": { strokeDashoffset: "24" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 600ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fade-in 500ms ease-out both",
        "slide-up": "slide-up 700ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "slide-in-left": "slide-in-left 600ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "slide-in-right": "slide-in-right 600ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "scale-in": "scale-in 500ms cubic-bezier(0.16, 1, 0.3, 1) both",
        float: "float 7s ease-in-out infinite",
        "float-slow": "float-slow 9.5s ease-in-out infinite",
        "chip-float": "chip-float 4s ease-in-out infinite",
        "menu-in": "menu-in 200ms ease-out both",
        "nav-drop-in": "nav-drop-in 240ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "nav-slide-down": "nav-slide-down 500ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "hero-scale-in": "hero-scale-in 900ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "hero-fade-up": "hero-fade-up 700ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "trust-dot": "trust-dot 2.8s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "ambient-glow": "ambient-glow 8s ease-in-out infinite",
        "mesh-move": "mesh-move 20s ease-in-out infinite",
        "border-shine": "border-shine 4s ease-in-out infinite",
        "scan-line": "scan-line 3s linear infinite",
        "pulse-ring": "pulse-ring 3s ease-in-out infinite",
        "count-up": "count-up 0.5s ease-out both",
        "orbit": "orbit 30s linear infinite",
        "wire-crawl": "wire-crawl 4.2s ease-in-out infinite",
        "orb-drift-1": "orb-drift-1 16s ease-in-out infinite",
        "orb-drift-2": "orb-drift-2 20s ease-in-out infinite 2s",
        "picture-float": "picture-float 6s ease-in-out infinite",
        "word-swap-in": "word-swap-in 480ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "word-swap-out": "word-swap-out 360ms cubic-bezier(0.4, 0, 1, 1) both",
        "fynk-card-drift": "fynk-card-drift 9s ease-in-out infinite",
        "fynk-card-drift-alt": "fynk-card-drift-alt 11s ease-in-out infinite 1.5s",
        "fynk-ambient": "fynk-ambient 14s ease-in-out infinite",
        "logo-drift-a": "logo-drift-a 8s ease-in-out infinite",
        "logo-drift-b": "logo-drift-b 10s ease-in-out infinite",
        "logo-drift-c": "logo-drift-c 9s ease-in-out infinite",
        "logo-pop-in": "logo-pop-in 800ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "marquee-scroll": "marquee-scroll 40s linear infinite",
        "hub-pulse": "hub-pulse 3.2s ease-in-out infinite",
        "ring-expand": "ring-expand 2.8s ease-out infinite",
        "dash-flow": "dash-flow 1.8s linear infinite",
      },
      backgroundImage: {
        "green-glow":
          "radial-gradient(ellipse at center, rgba(0,72,56,0.12), transparent 70%)",
        "green-glow-soft":
          "radial-gradient(ellipse at center, rgba(0,72,56,0.06), transparent 60%)",
        "dot-grid":
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
        "dot-grid-light":
          "radial-gradient(circle at 1px 1px, rgba(0,72,56,0.06) 1px, transparent 0)",
        /* fynk.com signature gradient washes (orange-left, blue-right) */
        "fynk-orange-wash":
          "radial-gradient(60% 50% at 15% 30%, rgba(240,90,40,0.16), transparent 70%)",
        "fynk-blue-wash":
          "radial-gradient(50% 45% at 85% 20%, rgba(59,130,246,0.14), transparent 70%)",
        "fynk-warm-floor":
          "linear-gradient(180deg, #FFFBF7 0%, #FFFFFF 50%, #F9FAFB 100%)",
        "fynk-cta-glow":
          "radial-gradient(80% 60% at 50% 0%, rgba(240,90,40,0.18), transparent 65%)",
      },
    },
  },
  plugins: [],
};

export default config;
