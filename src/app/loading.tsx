export default function Loading() {
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "var(--dark)",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    }}>
      <h2 style={{
        fontFamily: "'Cinzel', serif",
        color: "var(--gold)",
        fontSize: 28,
        fontWeight: 400,
        letterSpacing: 8,
        animation: "pulse 1.5s ease-in-out infinite",
      }}>
        The Ummed Haveli
      </h2>
      <p style={{
        color: "var(--gold-d)",
        fontSize: 11,
        letterSpacing: 6,
        marginTop: 8,
        textTransform: "uppercase",
      }}>
        Loading...
      </p>
    </div>
  );
}
