"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
      <h1 style={{ fontFamily: "'Cinzel', serif", color: "var(--gold)", fontSize: 48, marginBottom: 16 }}>
        Something Went Wrong
      </h1>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "rgba(255,255,255,0.6)", marginBottom: 32 }}>
        We apologize for the inconvenience. Please try again.
      </p>
      <button
        onClick={reset}
        style={{
          background: "var(--gold)",
          color: "var(--dark)",
          padding: "14px 36px",
          border: "none",
          fontSize: 12,
          letterSpacing: 3,
          textTransform: "uppercase",
          cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 600,
        }}
      >
        Try Again
      </button>
      <p style={{ marginTop: 24, fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
        Or call us directly: <a href={`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}`} style={{ color: "var(--gold-l)" }}>
          {process.env.NEXT_PUBLIC_PHONE_DISPLAY || "+91 9XXX XXX XXX"}
        </a>
      </p>
    </div>
  );
}
