"use client";

import { useState, useRef, useEffect } from "react";

interface DatePickerProps {
  id: string;
  name: string;
  label: string;
  value: string;
  min?: string;
  onChange: (date: string) => void;
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function toDateStr(y: number, m: number, d: number): string {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function formatDisplay(dateStr: string): string {
  if (!dateStr) return "Select date";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function DatePicker({ id, name, label, value, min, onChange }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = value ? new Date(value + "T00:00:00") : null;
  const minDate = min ? new Date(min + "T00:00:00") : null;

  const [viewYear, setViewYear] = useState(selected?.getFullYear() || new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(selected?.getMonth() ?? new Date().getMonth());

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Sync view when value changes
  useEffect(() => {
    if (selected) {
      setViewYear(selected.getFullYear());
      setViewMonth(selected.getMonth());
    }
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
  };

  const selectDate = (day: number) => {
    const dateStr = toDateStr(viewYear, viewMonth, day);
    onChange(dateStr);
    setOpen(false);
  };

  const isDisabled = (day: number): boolean => {
    if (!minDate) return false;
    const d = new Date(viewYear, viewMonth, day);
    return d < minDate;
  };

  const isSelected = (day: number): boolean => {
    if (!selected) return false;
    return selected.getFullYear() === viewYear && selected.getMonth() === viewMonth && selected.getDate() === day;
  };

  const isToday = (day: number): boolean => {
    const t = new Date();
    return t.getFullYear() === viewYear && t.getMonth() === viewMonth && t.getDate() === day;
  };

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {/* Hidden input for form submission */}
      <input type="hidden" id={id} name={name} value={value} />

      {/* Display button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={label}
        className="datepicker-trigger"
      >
        <span className="datepicker-icon">&#128197;</span>
        <span>{formatDisplay(value)}</span>
      </button>

      {/* Calendar dropdown */}
      {open && (
        <div className="datepicker-dropdown">
          {/* Header */}
          <div className="datepicker-header">
            <button type="button" onClick={prevMonth} className="datepicker-nav" aria-label="Previous month">&#8249;</button>
            <span className="datepicker-month">{MONTHS[viewMonth]} {viewYear}</span>
            <button type="button" onClick={nextMonth} className="datepicker-nav" aria-label="Next month">&#8250;</button>
          </div>

          {/* Day names */}
          <div className="datepicker-days-header">
            {DAYS.map((d) => (
              <span key={d} className="datepicker-day-name">{d}</span>
            ))}
          </div>

          {/* Day grid */}
          <div className="datepicker-grid">
            {/* Empty cells for offset */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <span key={`e-${i}`} className="datepicker-empty"></span>
            ))}

            {/* Day cells */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const disabled = isDisabled(day);
              const sel = isSelected(day);
              const today = isToday(day);

              return (
                <button
                  key={day}
                  type="button"
                  disabled={disabled}
                  onClick={() => selectDate(day)}
                  className={`datepicker-day ${sel ? "selected" : ""} ${today ? "today" : ""} ${disabled ? "disabled" : ""}`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
