"use client";

import { useState, useEffect } from "react";
import DatePicker from "@/components/ui/DatePicker";

function getDateString(daysFromNow: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().split("T")[0];
}

export default function BookingBar() {
  const [today, setToday] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [minCheckout, setMinCheckout] = useState("");

  useEffect(() => {
    setToday(getDateString(0));
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

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="booking-bar" role="search" aria-label="Room availability search">
      <div className="booking-inner">
        <div className="booking-field">
          <label>Check In</label>
          <DatePicker
            id="bCheckin"
            name="checkin"
            label="Select check-in date"
            value={checkin}
            min={today}
            onChange={handleCheckinChange}
          />
        </div>
        <div className="booking-field">
          <label>Check Out</label>
          <DatePicker
            id="bCheckout"
            name="checkout"
            label="Select check-out date"
            value={checkout}
            min={minCheckout}
            onChange={(val) => setCheckout(val)}
          />
        </div>
        <div className="booking-field">
          <label htmlFor="bGuests">Guests</label>
          <select id="bGuests" aria-label="Number of guests">
            <option>1 Adult</option>
            <option>2 Adults</option>
            <option>2 Adults + 1 Child</option>
            <option>2 Adults + 2 Children</option>
            <option>Group Booking</option>
          </select>
        </div>
        <div className="booking-field">
          <label htmlFor="bRoom">Room Type</label>
          <select id="bRoom" aria-label="Room type">
            <option>Royal Deluxe Room</option>
            <option>Royal Premium Room</option>
          </select>
        </div>
        <button className="booking-btn" onClick={scrollToContact} aria-label="Check room availability">
          Check Availability
        </button>
      </div>
    </div>
  );
}
