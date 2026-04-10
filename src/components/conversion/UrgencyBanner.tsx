"use client";

import { useState, useEffect } from "react";

export default function UrgencyBanner() {
  const [visible, setVisible] = useState(false);
  const [viewers, setViewers] = useState(0);

  useEffect(() => {
    // Show after 5 seconds
    const timer = setTimeout(() => {
      setVisible(true);
      setViewers(Math.floor(Math.random() * 5) + 2); // 2-6 viewers
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: 90,
      left: 24,
      background: "white",
      padding: "14px 20px",
      borderRadius: 8,
      boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
      zIndex: 997,
      maxWidth: 280,
      animation: "slideUp 0.5s ease",
      border: "1px solid var(--sand-d)",
    }}>
      <button
        onClick={() => setVisible(false)}
        style={{
          position: "absolute",
          top: 6,
          right: 10,
          background: "none",
          border: "none",
          color: "var(--text-l)",
          fontSize: 16,
          cursor: "pointer",
        }}
        aria-label="Dismiss"
      >
        &times;
      </button>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <span style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#E74C3C",
          animation: "pulse 1.5s infinite",
        }}></span>
        <span style={{ fontSize: 12, fontWeight: 600, color: "var(--maroon-d)" }}>
          High Demand
        </span>
      </div>
      <p style={{ fontSize: 13, color: "var(--text-m)", lineHeight: 1.5 }}>
        <strong>{viewers} people</strong> are viewing rooms right now.
        Only <strong>3 rooms</strong> left for this weekend.
      </p>
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
