"use client";

import { useState, useEffect, type FormEvent } from "react";
import { buildWhatsAppBookingUrl } from "@/services/whatsapp.service";
import type { BookingFormData } from "@/types";
import DatePicker from "@/components/ui/DatePicker";

function getDateString(daysFromNow: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().split("T")[0];
}

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [today, setToday] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [minCheckout, setMinCheckout] = useState("");

  useEffect(() => {
    const t = getDateString(0);
    setToday(t);
    setCheckin(getDateString(1));
    setCheckout(getDateString(2));
    setMinCheckout(getDateString(2));
  }, []);

  const handleCheckinChange = (val: string) => {
    setCheckin(val);
    const next = new Date(val);
    next.setDate(next.getDate() + 1);
    const nextStr = next.toISOString().split("T")[0];
    setMinCheckout(nextStr);
    if (checkout <= val) setCheckout(nextStr);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "loading") return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data: BookingFormData = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      checkin: formData.get("checkin") as string,
      checkout: formData.get("checkout") as string,
      room: formData.get("room") as string,
      guests: formData.get("guests") as string,
      message: formData.get("message") as string,
    };

    setStatus("loading");

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Request failed");

      const result = await res.json();
      if (!result.success) throw new Error("Booking failed");

      setStatus("success");
      const url = buildWhatsAppBookingUrl(data);
      setTimeout(() => { window.open(url, "_blank"); }, 800);
    } catch {
      setStatus("error");
    }
  };

  return (
    <form id="contactForm" onSubmit={handleSubmit} aria-label="Room booking form">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="fname">Full Name</label>
          <input type="text" id="fname" name="name" placeholder="Your Name" required autoComplete="name" />
        </div>
        <div className="form-group">
          <label htmlFor="fphone">Phone Number</label>
          <input type="tel" id="fphone" name="phone" placeholder="+91 XXXXX XXXXX" required autoComplete="tel" />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Check-In</label>
          <DatePicker
            id="fcheckin"
            name="checkin"
            label="Select check-in date"
            value={checkin}
            min={today}
            onChange={handleCheckinChange}
          />
        </div>
        <div className="form-group">
          <label>Check-Out</label>
          <DatePicker
            id="fcheckout"
            name="checkout"
            label="Select check-out date"
            value={checkout}
            min={minCheckout}
            onChange={(val) => setCheckout(val)}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="froom">Room Type</label>
          <select id="froom" name="room">
            <option value="Royal Deluxe">Royal Deluxe &mdash; Rs 5,000/night</option>
            <option value="Maharaja Suite">Maharaja Heritage Suite &mdash; Rs 8,000</option>
            <option value="Family Suite">Rajputana Family Suite &mdash; Rs 10,000</option>
            <option value="Wedding Group">Wedding Group Booking</option>
            <option value="Corporate">Corporate / Long Stay</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="fguests">Guests</label>
          <select id="fguests" name="guests">
            <option>1 Adult</option>
            <option>2 Adults</option>
            <option>2 Adults + 1 Child</option>
            <option>2 Adults + 2 Children</option>
            <option>Group (5+)</option>
          </select>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="fmsg">Special Requests</label>
        <textarea id="fmsg" name="message" placeholder="Airport pickup, special occasion, dietary needs, extra beds..."></textarea>
      </div>
      <button
        type="submit"
        className="btn-send"
        aria-label="Submit booking request"
        disabled={status === "loading" || status === "success"}
        style={{ opacity: status === "loading" ? 0.7 : 1 }}
      >
        {status === "loading" ? "Sending..." : status === "success" ? "Sent!" : "Send Booking Request"}
      </button>
      {status === "success" && (
        <div id="formSuccess" style={{ display: "block" }} role="alert">
          Your booking request has been sent successfully! Our team will call you within 30 minutes. Padharo Mhare Desh!
        </div>
      )}
      {status === "error" && (
        <div
          role="alert"
          style={{
            marginTop: 16,
            padding: "14px 20px",
            background: "rgba(220,53,69,0.12)",
            border: "1px solid rgba(220,53,69,0.3)",
            borderRadius: 8,
            color: "#ff6b6b",
            fontSize: 14,
            lineHeight: 1.6,
          }}
        >
          Booking request failed. Please try again or contact us directly at{" "}
          <a href="tel:+917296812341" style={{ color: "var(--gold)", fontWeight: 600 }}>
            +91 72968 12341
          </a>{" "}
          / <a href="tel:+911414063461" style={{ color: "var(--gold)", fontWeight: 600 }}>0141-4063461</a>
        </div>
      )}
    </form>
  );
}
