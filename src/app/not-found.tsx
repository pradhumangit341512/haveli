import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--dark)",
      color: "white",
      textAlign: "center",
      padding: "40px 20px",
    }}>
      <p style={{ fontSize: 10, letterSpacing: 6, textTransform: "uppercase", color: "var(--gold-d)", marginBottom: 16 }}>
        Page Not Found
      </p>
      <h1 style={{ fontFamily: "'Cinzel', serif", color: "var(--gold)", fontSize: 120, lineHeight: 1, marginBottom: 8 }}>
        404
      </h1>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: "rgba(255,255,255,0.5)", marginBottom: 40, maxWidth: 450 }}>
        The page you are looking for doesn&apos;t exist. Perhaps you&apos;d like to explore our luxury rooms instead?
      </p>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
        <Link href="/" style={{
          background: "var(--gold)",
          color: "var(--dark)",
          padding: "14px 36px",
          fontSize: 12,
          letterSpacing: 3,
          textTransform: "uppercase",
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 600,
        }}>
          Back to Home
        </Link>
        <Link href="/rooms" style={{
          border: "1px solid rgba(255,255,255,0.3)",
          color: "white",
          padding: "14px 36px",
          fontSize: 12,
          letterSpacing: 3,
          textTransform: "uppercase",
          fontFamily: "'DM Sans', sans-serif",
        }}>
          View Rooms
        </Link>
      </div>
    </div>
  );
}
