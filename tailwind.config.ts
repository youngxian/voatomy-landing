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
          "var(--font-aspekta)",
          "Aspekta",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
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
        "accent-lime": "#E2FB6C",
        coral: { DEFAULT: "#F97316", light: "#FFF7ED", dark: "#EA580C" },
        violet: { DEFAULT: "#8B5CF6", light: "#F5F3FF", dark: "#6D28D9" },
        amber: { DEFAULT: "#F59E0B", light: "#FFFBEB", dark: "#D97706" },
        sky: { DEFAULT: "#0EA5E9", light: "#F0F9FF", dark: "#0284C7" },
        rose: { DEFAULT: "#F43F5E", light: "#FFF1F2", dark: "#E11D48" },
      },
      fontSize: {
        "display-1": [
          "80px",
          { lineHeight: "1.05", letterSpacing: "-2.58px", fontWeight: "600" },
        ],
        "display-2": [
          "56px",
          { lineHeight: "1.05", letterSpacing: "-1.74px", fontWeight: "600" },
        ],
        "heading-1": [
          "40px",
          { lineHeight: "1.15", letterSpacing: "-1.2px", fontWeight: "600" },
        ],
        "heading-2": [
          "28px",
          { lineHeight: "1.2", letterSpacing: "-0.5px", fontWeight: "600" },
        ],
        "heading-3": [
          "20px",
          { lineHeight: "1.3", fontWeight: "600" },
        ],
        "body-lg": [
          "18px",
          { lineHeight: "28px", letterSpacing: "-0.18px" },
        ],
        "body-base": [
          "16px",
          { lineHeight: "24px" },
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
        container: "1280px",
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
      },
    },
  },
  plugins: [],
};

export default config;
