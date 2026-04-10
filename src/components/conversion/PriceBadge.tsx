"use client";

export default function PriceBadge() {
  return (
    <div style={{
      position: "fixed",
      top: "50%",
      left: 0,
      transform: "translateY(-50%)",
      zIndex: 998,
      writingMode: "vertical-rl",
      textOrientation: "mixed",
    }}>
      <a
        href="#contact"
        style={{
          display: "block",
          background: "var(--maroon)",
          color: "var(--gold-l)",
          padding: "16px 10px",
          fontSize: 11,
          letterSpacing: 2,
          textTransform: "uppercase",
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 600,
          textDecoration: "none",
          borderRight: "2px solid var(--gold)",
          transition: "all 0.3s",
        }}
      >
        Book Direct &amp; Save 15%
      </a>
    </div>
  );
}
