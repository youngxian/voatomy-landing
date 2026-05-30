import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Caveat } from "next/font/google";

/** fynk.com body stack — Inter */
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/** fynk.com heading stack — Labil Grotesk (same files as fynk.com) */
export const headingFont = localFont({
  src: [
    {
      path: "../assets/fonts/labil-grotesk/LabilGrotesk-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/labil-grotesk/LabilGrotesk-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/labil-grotesk/LabilGrotesk-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-heading",
  display: "swap",
});

/** Handwritten annotations on pricing cards (Fynk-style notes) */
export const handwritingFont = Caveat({
  subsets: ["latin"],
  variable: "--font-handwriting",
  display: "swap",
  weight: ["600", "700"],
});

export const fontVariables = `${inter.variable} ${headingFont.variable} ${handwritingFont.variable}`;
