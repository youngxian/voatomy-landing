import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Voatomy — The AI Product Operating System";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a0a 0%, #141414 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Subtle grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 600,
            height: 300,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(241,110,44,0.15), transparent 70%)",
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            height: 80,
            borderRadius: 20,
            background: "rgba(241,110,44,0.12)",
            border: "2px solid rgba(241,110,44,0.3)",
            marginBottom: 32,
          }}
        >
          <span
            style={{
              fontSize: 40,
              fontWeight: 800,
              color: "#f16e2c",
              letterSpacing: "-2px",
            }}
          >
            V
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-1px",
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          Voatomy
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 500,
            color: "#f16e2c",
            marginTop: 12,
            textAlign: "center",
          }}
        >
          The AI Product Operating System
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 18,
            color: "rgba(255,255,255,0.5)",
            marginTop: 24,
            textAlign: "center",
            maxWidth: 600,
            lineHeight: 1.5,
          }}
        >
          Sprint planning backed by code complexity, team capacity, and business
          priority.
        </div>

        {/* Bottom accent bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background:
              "linear-gradient(90deg, #f16e2c, #12FF80, #6366F1, #f16e2c)",
          }}
        />

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: 24,
            fontSize: 14,
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "1px",
          }}
        >
          voatomy.global
        </div>
      </div>
    ),
    { ...size },
  );
}
