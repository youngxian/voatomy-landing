import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#0d0e10", color: "#fff", fontFamily: "sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", textAlign: "center", padding: "1rem" }}>
        <p style={{ fontSize: "7rem", fontWeight: 900, opacity: 0.06, lineHeight: 1, margin: 0, userSelect: "none" }}>404</p>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginTop: "-1.5rem" }}>Page not found</h1>
        <p style={{ color: "rgba(255,255,255,0.4)", marginTop: "0.5rem" }}>This page doesn&apos;t exist or has moved.</p>
        <Link href="/" style={{ marginTop: "2rem", display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#f16e2c", color: "#fff", padding: "0.75rem 1.5rem", borderRadius: "9999px", fontWeight: 700, fontSize: "0.875rem", textDecoration: "none" }}>
          ← Back to home
        </Link>
      </body>
    </html>
  );
}
