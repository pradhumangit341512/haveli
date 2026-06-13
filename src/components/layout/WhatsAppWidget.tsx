"use client";

import { useState } from "react";
import { env } from "@/lib/env";

const quickReplies = [
  { label: "Check Room Availability", message: "Hi, I want to check room availability at The Ummed Haveli" },
  { label: "Room Rates", message: "Hi, what are the current room rates at The Ummed Haveli?" },
  { label: "Airport Pickup", message: "Hi, I need airport pickup service. My flight details:" },
  { label: "Wedding Group Booking", message: "Hi, I want to inquire about wedding group booking at The Ummed Haveli" },
  { label: "Directions to Hotel", message: "Hi, can you share directions to The Ummed Haveli from Jaipur Airport?" },
];

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);

  const sendMessage = (message: string) => {
    const url = `https://wa.me/${env.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setOpen(false);
  };

  return (
    <>
      {/* Chat Widget */}
      {open && (
        <div style={{
          position: "fixed",
          bottom: 90,
          right: 24,
          width: 320,
          background: "white",
          borderRadius: 12,
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
          zIndex: 998,
          overflow: "hidden",
        }}>
          {/* Header */}
          <div style={{
            background: "#075E54",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "#25D366",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontFamily: "'Cinzel', serif",
              fontSize: 14,
              fontWeight: 600,
            }}>
              UH
            </div>
            <div>
              <p style={{ color: "white", fontWeight: 600, fontSize: 14 }}>The Ummed Haveli</p>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 11 }}>Typically replies within minutes</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{ marginLeft: "auto", background: "none", border: "none", color: "white", fontSize: 20, cursor: "pointer" }}
              aria-label="Close chat widget"
            >
              &times;
            </button>
          </div>

          {/* Chat Area */}
          <div style={{ padding: 16, background: "#ECE5DD", minHeight: 80 }}>
            <div style={{
              background: "white",
              padding: "10px 14px",
              borderRadius: "0 8px 8px 8px",
              fontSize: 13,
              color: "#333",
              lineHeight: 1.5,
              maxWidth: "85%",
            }}>
              Namaste! Welcome to The Ummed Haveli. How can we help you today?
            </div>
          </div>

          {/* Quick Replies */}
          <div style={{ padding: "12px 16px", borderTop: "1px solid #eee" }}>
            <p style={{ fontSize: 10, color: "#999", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>
              Quick Replies
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {quickReplies.map((reply) => (
                <button
                  key={reply.label}
                  onClick={() => sendMessage(reply.message)}
                  style={{
                    background: "none",
                    border: "1px solid #25D366",
                    color: "#25D366",
                    padding: "8px 12px",
                    fontSize: 12,
                    borderRadius: 20,
                    cursor: "pointer",
                    textAlign: "left",
                    fontFamily: "'DM Sans', sans-serif",
                    transition: "all 0.2s",
                  }}
                >
                  {reply.label}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Message */}
          <div style={{ padding: "8px 16px 12px", borderTop: "1px solid #eee" }}>
            <button
              onClick={() => sendMessage("Hi, I have a question about The Ummed Haveli")}
              style={{
                width: "100%",
                background: "#25D366",
                color: "white",
                border: "none",
                padding: "10px",
                fontSize: 13,
                borderRadius: 6,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
              }}
            >
              Start Custom Chat
            </button>
          </div>
        </div>
      )}

      {/* Float Button */}
      <button
        onClick={() => setOpen(!open)}
        className="wa-float"
        aria-label="Chat on WhatsApp"
        style={{ border: "none" }}
      >
        <svg viewBox="0 0 32 32">
          <path d="M16.01 2.93A13.07 13.07 0 002.93 16a12.94 12.94 0 001.74 6.53L2.93 29.07l6.72-1.76A13.07 13.07 0 1016.01 2.93zm7.6 18.42c-.32.9-1.86 1.72-2.56 1.83-.66.1-1.49.14-2.41-.15a22.1 22.1 0 01-2.18-.81c-3.84-1.66-6.35-5.53-6.54-5.79-.19-.26-1.52-2.02-1.52-3.86s.96-2.74 1.3-3.11c.34-.37.74-.46.99-.46s.5.01.72.01c.23.01.54-.09.84.64.32.75 1.08 2.64 1.18 2.83.1.19.16.42.03.68-.13.26-.19.42-.38.65-.19.23-.4.5-.57.68-.19.19-.39.4-.17.78.22.38.99 1.63 2.12 2.64 1.45 1.3 2.68 1.7 3.06 1.89.38.19.6.16.83-.1.22-.26.96-1.12 1.22-1.5.26-.38.51-.32.86-.19.34.13 2.18 1.03 2.56 1.22.38.19.63.28.72.44.1.16.1.9-.22 1.79z" />
        </svg>
      </button>
    </>
  );
}
