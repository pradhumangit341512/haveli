"use client";

import { useState, useEffect, useCallback, type FormEvent, type ReactNode } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// ─── Types ───
interface Booking { _id: string; name: string; phone: string; email: string; checkin: string; checkout: string; room: string; roomNumber: string; guests: string; message: string; status: string; source: string; totalAmount: number; notes: string; createdAt: string; }
type BookingFormState = {
  mode: "create" | "edit";
  id?: string;
  name: string;
  phone: string;
  email: string;
  checkin: string;
  checkout: string;
  room: string;
  roomNumber: string;
  guests: string;
  status: string;
  source: string;
  totalAmount: string;
  message: string;
  notes: string;
};
const ROOM_TYPES = ["Royal Deluxe", "Maharaja Suite", "Family Suite"];
const SOURCES = ["Direct", "WhatsApp", "Phone", "Walk-in", "MakeMyTrip", "Booking.com", "Airbnb", "Manual"];
const STATUSES = ["pending", "confirmed", "checked_in", "checked_out", "cancelled"];
function emptyForm(): BookingFormState {
  return {
    mode: "create",
    name: "",
    phone: "",
    email: "",
    checkin: "",
    checkout: "",
    room: ROOM_TYPES[0],
    roomNumber: "",
    guests: "2 Adults",
    status: "pending",
    source: "Direct",
    totalAmount: "",
    message: "",
    notes: "",
  };
}
function bookingToForm(b: Booking): BookingFormState {
  return {
    mode: "edit",
    id: b._id,
    name: b.name || "",
    phone: b.phone || "",
    email: b.email || "",
    checkin: b.checkin || "",
    checkout: b.checkout || "",
    room: b.room || ROOM_TYPES[0],
    roomNumber: b.roomNumber || "",
    guests: b.guests || "",
    status: b.status || "pending",
    source: b.source || "Direct",
    totalAmount: b.totalAmount ? String(b.totalAmount) : "",
    message: b.message || "",
    notes: b.notes || "",
  };
}
interface Room { _id: string; number: string; floor: number; type: string; price: number; status: string; housekeeping: string; notes: string; }
interface Guest { _id: string; name: string; phone: string; email: string; visits: number; totalSpent: number; vip: boolean; lastVisit: string; preferences: string; notes: string; }
interface Stats { totalBookings: number; pending: number; confirmed: number; checkedIn: number; cancelled: number; totalRooms: number; availableRooms: number; occupiedRooms: number; maintenanceRooms: number; totalGuests: number; todayCheckins: number; todayCheckouts: number; occupancyRate: number; revenue: number; }

const CHART_COLORS = ["#C8A45C", "#5C1A2A", "#722F37", "#8B3A4A", "#96772F", "#27AE60"];
const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  pending: { bg: "rgba(243,156,18,0.15)", text: "#F39C12" },
  confirmed: { bg: "rgba(39,174,96,0.15)", text: "#27AE60" },
  checked_in: { bg: "rgba(52,152,219,0.15)", text: "#3498DB" },
  checked_out: { bg: "rgba(155,89,182,0.15)", text: "#9B59B6" },
  cancelled: { bg: "rgba(231,76,60,0.15)", text: "#E74C3C" },
};

// ─── Style helpers ───
const s = {
  card: { background: "var(--charcoal)", border: "1px solid rgba(200,164,92,0.15)" } as const,
  label: { fontSize: 10, letterSpacing: 3, textTransform: "uppercase" as const, color: "rgba(255,255,255,0.4)", marginBottom: 8 },
  value: { fontFamily: "'Cinzel', serif", fontSize: 28 },
  th: { padding: "12px 14px", textAlign: "left" as const, color: "var(--gold)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" as const, fontWeight: 500, borderBottom: "1px solid rgba(200,164,92,0.15)" },
  td: { padding: "10px 14px", color: "rgba(255,255,255,0.6)", fontSize: 13, borderBottom: "1px solid rgba(255,255,255,0.04)" },
  btn: (active: boolean) => ({ padding: "8px 20px", fontSize: 11, letterSpacing: 2, textTransform: "uppercase" as const, background: active ? "var(--gold)" : "transparent", color: active ? "var(--dark)" : "rgba(255,255,255,0.5)", border: `1px solid ${active ? "var(--gold)" : "rgba(255,255,255,0.15)"}`, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }),
  input: { width: "100%", padding: "10px 12px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(200,164,92,0.25)", color: "white", fontFamily: "'DM Sans', sans-serif", fontSize: 13, outline: "none" },
};

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [tab, setTab] = useState<"bookings" | "rooms" | "guests" | "analytics" | "settings">("bookings");

  // Data
  const [stats, setStats] = useState<Stats | null>(null);
  const [monthlyRevenue, setMonthlyRevenue] = useState<{ month: string; revenue: number; bookings: number }[]>([]);
  const [roomTypeStats, setRoomTypeStats] = useState<Record<string, number>>({});
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [seeding, setSeeding] = useState(false);

  // Booking form modal
  const [bookingForm, setBookingForm] = useState<BookingFormState | null>(null);
  const [savingBooking, setSavingBooking] = useState(false);
  const [formError, setFormError] = useState("");

  const headers = useCallback(() => ({ "Content-Type": "application/json" }), []);

  // ─── Check existing session on mount ───
  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setIsAuthenticated(data.authenticated))
      .catch(() => setIsAuthenticated(false));
  }, []);

  // ─── Auth ───
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username, password }) });
      const data = await res.json();
      if (data.success) { setIsAuthenticated(true); } else { setLoginError(data.message || "Login failed"); }
    } catch { setLoginError("Connection error"); }
  };

  // ─── Data fetching ───
  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/stats", { headers: headers() });
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
        setMonthlyRevenue(data.monthlyRevenue);
        setRoomTypeStats(data.roomTypeStats);
      }
    } catch { /* ignore */ }
  }, [headers]);

  const fetchBookings = useCallback(async () => {
    const params = new URLSearchParams();
    if (statusFilter !== "all") params.set("status", statusFilter);
    if (searchQuery) params.set("search", searchQuery);
    try {
      const res = await fetch(`/api/admin/bookings?${params}`, { headers: headers() });
      const data = await res.json();
      if (data.success) setBookings(data.bookings);
    } catch { /* ignore */ }
  }, [headers, statusFilter, searchQuery]);

  const fetchRooms = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/rooms", { headers: headers() });
      const data = await res.json();
      if (data.success) setRooms(data.rooms);
    } catch { /* ignore */ }
  }, [headers]);

  const fetchGuests = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/guests", { headers: headers() });
      const data = await res.json();
      if (data.success) setGuests(data.guests);
    } catch { /* ignore */ }
  }, [headers]);

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchStats();
    fetchBookings();
    fetchRooms();
    fetchGuests();
  }, [isAuthenticated, fetchStats, fetchBookings, fetchRooms, fetchGuests]);

  useEffect(() => {
    if (isAuthenticated) fetchBookings();
  }, [statusFilter, searchQuery, isAuthenticated, fetchBookings]);

  // ─── Actions ───
  const updateBookingStatus = async (id: string, status: string) => {
    const res = await fetch("/api/admin/bookings", { method: "PATCH", headers: headers(), body: JSON.stringify({ id, status }) });
    if (res.status === 409) {
      const data = await res.json();
      window.alert(data.message || "Room conflict — this room is already booked for those dates.");
      return;
    }
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      window.alert(data.error || "Failed to update booking");
      return;
    }
    fetchBookings();
    fetchStats();
  };

  const saveBooking = async () => {
    if (!bookingForm) return;
    setFormError("");
    const payload = {
      ...(bookingForm.id ? { id: bookingForm.id } : {}),
      name: bookingForm.name.trim(),
      phone: bookingForm.phone.trim(),
      email: bookingForm.email.trim(),
      checkin: bookingForm.checkin,
      checkout: bookingForm.checkout,
      room: bookingForm.room,
      roomNumber: bookingForm.roomNumber.trim(),
      guests: bookingForm.guests.trim(),
      status: bookingForm.status,
      source: bookingForm.source,
      totalAmount: bookingForm.totalAmount ? Number(bookingForm.totalAmount) : 0,
      message: bookingForm.message.trim(),
      notes: bookingForm.notes.trim(),
    };
    if (!payload.name || !payload.phone || !payload.checkin || !payload.checkout || !payload.room) {
      setFormError("Name, phone, check-in, check-out and room type are required.");
      return;
    }
    if (payload.checkin >= payload.checkout) {
      setFormError("Check-out must be after check-in.");
      return;
    }
    setSavingBooking(true);
    try {
      const res = await fetch("/api/admin/bookings", {
        method: bookingForm.mode === "create" ? "POST" : "PATCH",
        headers: headers(),
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setFormError(data.message || data.error || "Save failed");
      } else {
        setBookingForm(null);
        fetchBookings();
        fetchStats();
        fetchGuests();
      }
    } catch {
      setFormError("Network error — please try again.");
    } finally {
      setSavingBooking(false);
    }
  };

  const deleteBooking = async (id: string, name: string) => {
    if (!window.confirm(`Delete booking for ${name}? This cannot be undone.`)) return;
    const res = await fetch("/api/admin/bookings", {
      method: "DELETE",
      headers: headers(),
      body: JSON.stringify({ id }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      window.alert(data.error || "Delete failed (owner only).");
      return;
    }
    fetchBookings();
    fetchStats();
  };

  const updateRoomStatus = async (id: string, status: string) => {
    await fetch("/api/admin/rooms", { method: "PATCH", headers: headers(), body: JSON.stringify({ id, status }) });
    fetchRooms();
    fetchStats();
  };

  const updateRoomHousekeeping = async (id: string, housekeeping: string) => {
    await fetch("/api/admin/rooms", { method: "PATCH", headers: headers(), body: JSON.stringify({ id, housekeeping }) });
    fetchRooms();
  };

  const toggleGuestVip = async (id: string, vip: boolean) => {
    await fetch("/api/admin/guests", { method: "PATCH", headers: headers(), body: JSON.stringify({ id, vip: !vip }) });
    fetchGuests();
  };

  const seedDatabase = async () => {
    setSeeding(true);
    try {
      const res = await fetch("/api/admin/seed", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        alert(`Database seeded! ${data.counts.rooms} rooms, ${data.counts.bookings} bookings, ${data.counts.guests} guests`);
        fetchStats(); fetchBookings(); fetchRooms(); fetchGuests();
      }
    } catch { alert("Seed failed"); }
    setSeeding(false);
  };

  // ─── Loading state ───
  if (isAuthenticated === null) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--dark)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif" }}>Loading...</p>
      </div>
    );
  }

  // ─── Login Screen ───
  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--dark)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 380, padding: 40, ...s.card }}>
          <h1 style={{ fontFamily: "'Cinzel', serif", color: "var(--gold)", fontSize: 22, textAlign: "center", marginBottom: 8 }}>Admin Panel</h1>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", textAlign: "center", marginBottom: 32 }}>The Shekhawat Haveli</p>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", ...s.label, color: "var(--gold)" }}>Username</label>
              <input style={s.input} type="text" value={username} onChange={(e) => setUsername(e.target.value)} required autoComplete="username" />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", ...s.label, color: "var(--gold)" }}>Password</label>
              <div style={{ position: "relative" }}>
                <input style={s.input} type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  style={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    color: "var(--gold-d)",
                    cursor: "pointer",
                    fontSize: 13,
                    fontFamily: "'DM Sans', sans-serif",
                    padding: "4px 6px",
                  }}
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>
            {loginError && <p style={{ color: "#E74C3C", fontSize: 13, marginBottom: 12 }}>{loginError}</p>}
            <button type="submit" className="btn-send" style={{ width: "100%" }}>Login</button>
          </form>
        </div>
      </div>
    );
  }

  const pieData = Object.entries(roomTypeStats).map(([name, value]) => ({ name, value }));

  // ─── Dashboard ───
  return (
    <div style={{ minHeight: "100vh", background: "var(--dark)" }}>
      {/* Top Bar */}
      <div style={{ background: "var(--charcoal)", padding: "12px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(200,164,92,0.15)" }}>
        <div style={{ fontFamily: "'Cinzel', serif", color: "var(--gold)", fontSize: 16 }}>Shekhawat Haveli Admin</div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {stats && <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>Today: {stats.todayCheckins} in / {stats.todayCheckouts} out</span>}
          <button onClick={() => { fetch("/api/auth/logout", { method: "POST" }).then(() => setIsAuthenticated(false)); }} style={{ background: "none", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)", padding: "5px 14px", fontSize: 11, cursor: "pointer", fontFamily: "'DM Sans'" }}>Logout</button>
        </div>
      </div>

      <div style={{ padding: "24px 32px" }}>
        {/* Stats Row */}
        {stats && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12, marginBottom: 24 }}>
            {[
              { label: "Total Bookings", val: stats.totalBookings, color: "var(--gold)" },
              { label: "Pending", val: stats.pending, color: "#F39C12" },
              { label: "Confirmed", val: stats.confirmed, color: "#27AE60" },
              { label: "Checked In", val: stats.checkedIn, color: "#3498DB" },
              { label: "Occupancy", val: `${stats.occupancyRate}%`, color: "var(--gold-l)" },
              { label: "Revenue", val: `₹${stats.revenue.toLocaleString("en-IN")}`, color: "var(--gold)" },
            ].map((x) => (
              <div key={x.label} style={{ ...s.card, padding: 18 }}>
                <p style={s.label}>{x.label}</p>
                <p style={{ ...s.value, color: x.color, fontSize: 24 }}>{x.val}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
          {(["bookings", "rooms", "guests", "analytics", "settings"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} style={s.btn(tab === t)}>{t}</button>
          ))}
        </div>

        {/* ════════ BOOKINGS TAB ════════ */}
        {tab === "bookings" && (
          <div>
            <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
              <input style={{ ...s.input, maxWidth: 280 }} placeholder="Search name or phone..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              <select style={{ ...s.input, maxWidth: 160 }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="checked_in">Checked In</option>
                <option value="checked_out">Checked Out</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <button
                onClick={() => { setFormError(""); setBookingForm(emptyForm()); }}
                style={{
                  marginLeft: "auto",
                  padding: "10px 22px",
                  background: "var(--gold)",
                  color: "var(--dark)",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 12,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                }}
              >
                + Add Booking
              </button>
            </div>
            <div style={{ ...s.card, overflow: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {["Guest", "Phone", "Room", "Check-in", "Check-out", "Amount", "Source", "Status", "Actions"].map((h) => (
                      <th key={h} style={s.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b._id}>
                      <td style={{ ...s.td, color: "white", fontWeight: 500 }}>
                        {b.name}
                        {b.message && <div style={{ fontSize: 11, color: "var(--gold-d)", marginTop: 2 }}>{b.message.slice(0, 40)}</div>}
                      </td>
                      <td style={{ ...s.td, color: "var(--gold-l)" }}><a href={`tel:${b.phone}`} style={{ color: "inherit" }}>{b.phone}</a></td>
                      <td style={s.td}>{b.room}{b.roomNumber ? ` #${b.roomNumber}` : ""}</td>
                      <td style={s.td}>{b.checkin}</td>
                      <td style={s.td}>{b.checkout}</td>
                      <td style={{ ...s.td, color: "var(--gold)" }}>{b.totalAmount ? `₹${b.totalAmount.toLocaleString("en-IN")}` : "—"}</td>
                      <td style={s.td}>{b.source}</td>
                      <td style={s.td}>
                        <span style={{ padding: "3px 8px", fontSize: 10, letterSpacing: 1, textTransform: "uppercase", background: STATUS_COLORS[b.status]?.bg || "rgba(255,255,255,0.1)", color: STATUS_COLORS[b.status]?.text || "#fff" }}>
                          {b.status.replace("_", " ")}
                        </span>
                      </td>
                      <td style={{ ...s.td, whiteSpace: "nowrap" }}>
                        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                          {b.status === "pending" && <ActionBtn label="Confirm" color="#27AE60" onClick={() => updateBookingStatus(b._id, "confirmed")} />}
                          {b.status === "confirmed" && <ActionBtn label="Check In" color="#3498DB" onClick={() => updateBookingStatus(b._id, "checked_in")} />}
                          {b.status === "checked_in" && <ActionBtn label="Check Out" color="#9B59B6" onClick={() => updateBookingStatus(b._id, "checked_out")} />}
                          {(b.status === "pending" || b.status === "confirmed") && <ActionBtn label="Cancel" color="#E74C3C" onClick={() => updateBookingStatus(b._id, "cancelled")} />}
                          <ActionBtn label="Edit" color="#C8A45C" onClick={() => { setFormError(""); setBookingForm(bookingToForm(b)); }} />
                          <ActionBtn label="Delete" color="#E74C3C" onClick={() => deleteBooking(b._id, b.name)} />
                        </div>
                      </td>
                    </tr>
                  ))}
                  {bookings.length === 0 && (
                    <tr><td colSpan={9} style={{ ...s.td, textAlign: "center", padding: 32 }}>No bookings found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ════════ ROOMS TAB ════════ */}
        {tab === "rooms" && (
          <div>
            <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
              {[
                { label: "Available", count: rooms.filter((r) => r.status === "available").length, color: "#27AE60" },
                { label: "Occupied", count: rooms.filter((r) => r.status === "occupied").length, color: "#3498DB" },
                { label: "Reserved", count: rooms.filter((r) => r.status === "reserved").length, color: "#F39C12" },
                { label: "Maintenance", count: rooms.filter((r) => r.status === "maintenance").length, color: "#E74C3C" },
              ].map((x) => (
                <div key={x.label} style={{ ...s.card, padding: "10px 20px", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: x.color }}></span>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{x.label}: <strong style={{ color: "white" }}>{x.count}</strong></span>
                </div>
              ))}
            </div>

            {/* Room Grid by Floor */}
            {[1, 2, 3, 4, 5].map((floor) => {
              const floorRooms = rooms.filter((r) => r.floor === floor);
              if (floorRooms.length === 0) return null;
              return (
                <div key={floor} style={{ marginBottom: 24 }}>
                  <p style={{ ...s.label, marginBottom: 12 }}>Floor {floor}</p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 8 }}>
                    {floorRooms.map((room) => {
                      const color = room.status === "available" ? "#27AE60" : room.status === "occupied" ? "#3498DB" : room.status === "reserved" ? "#F39C12" : "#E74C3C";
                      return (
                        <div key={room._id} style={{ ...s.card, padding: 16, borderLeft: `3px solid ${color}` }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                            <span style={{ fontFamily: "'Cinzel', serif", fontSize: 18, color: "white" }}>#{room.number}</span>
                            <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1, color, background: `${color}22`, padding: "2px 8px" }}>{room.status}</span>
                          </div>
                          <p style={{ fontSize: 12, color: "var(--gold-d)", marginBottom: 4 }}>{room.type}</p>
                          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>₹{room.price.toLocaleString("en-IN")}/night • {room.housekeeping}</p>
                          <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
                            {room.status === "available" && <ActionBtn label="Occupy" color="#3498DB" onClick={() => updateRoomStatus(room._id, "occupied")} />}
                            {room.status === "occupied" && <ActionBtn label="Free" color="#27AE60" onClick={() => updateRoomStatus(room._id, "available")} />}
                            {room.status !== "maintenance" && <ActionBtn label="Maint." color="#E74C3C" onClick={() => updateRoomStatus(room._id, "maintenance")} />}
                            {room.status === "maintenance" && <ActionBtn label="Ready" color="#27AE60" onClick={() => updateRoomStatus(room._id, "available")} />}
                            {room.housekeeping === "dirty" && <ActionBtn label="Clean" color="#9B59B6" onClick={() => updateRoomHousekeeping(room._id, "clean")} />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ════════ GUESTS TAB ════════ */}
        {tab === "guests" && (
          <div style={{ ...s.card, overflow: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Guest", "Phone", "Email", "Visits", "Total Spent", "VIP", "Last Visit", "Preferences", "Actions"].map((h) => (
                    <th key={h} style={s.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {guests.map((g) => (
                  <tr key={g._id}>
                    <td style={{ ...s.td, color: "white", fontWeight: 500 }}>{g.name}</td>
                    <td style={{ ...s.td, color: "var(--gold-l)" }}>{g.phone}</td>
                    <td style={s.td}>{g.email || "—"}</td>
                    <td style={{ ...s.td, textAlign: "center" }}>{g.visits}</td>
                    <td style={{ ...s.td, color: "var(--gold)" }}>₹{g.totalSpent.toLocaleString("en-IN")}</td>
                    <td style={s.td}>
                      {g.vip ? <span style={{ color: "#F39C12", fontSize: 14 }}>★ VIP</span> : <span style={{ color: "rgba(255,255,255,0.2)" }}>—</span>}
                    </td>
                    <td style={s.td}>{g.lastVisit ? new Date(g.lastVisit).toLocaleDateString("en-IN") : "—"}</td>
                    <td style={{ ...s.td, maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{g.preferences || "—"}</td>
                    <td style={s.td}>
                      <ActionBtn label={g.vip ? "Remove VIP" : "Mark VIP"} color="#F39C12" onClick={() => toggleGuestVip(g._id, g.vip)} />
                    </td>
                  </tr>
                ))}
                {guests.length === 0 && (
                  <tr><td colSpan={9} style={{ ...s.td, textAlign: "center", padding: 32 }}>No guests yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* ════════ ANALYTICS TAB ════════ */}
        {tab === "analytics" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 16 }}>
              {/* Revenue Chart */}
              <div style={{ ...s.card, padding: 24 }}>
                <p style={{ ...s.label, marginBottom: 20 }}>Monthly Revenue & Bookings</p>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={monthlyRevenue}>
                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={11} />
                    <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} />
                    <Tooltip contentStyle={{ background: "#1C1917", border: "1px solid rgba(200,164,92,0.2)", fontSize: 12 }} />
                    <Bar dataKey="revenue" fill="#C8A45C" name="Revenue (₹)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="bookings" fill="#5C1A2A" name="Bookings" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Room Type Pie */}
              <div style={{ ...s.card, padding: 24 }}>
                <p style={{ ...s.label, marginBottom: 20 }}>Bookings by Room Type</p>
                {pieData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, value }) => `${name}: ${value}`}>
                        {pieData.map((_, i) => (<Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />))}
                      </Pie>
                      <Tooltip contentStyle={{ background: "#1C1917", border: "1px solid rgba(200,164,92,0.2)", fontSize: 12 }} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <p style={{ color: "rgba(255,255,255,0.3)", textAlign: "center", paddingTop: 60 }}>No data yet</p>
                )}
              </div>
            </div>

            {/* Key Metrics */}
            {stats && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                {[
                  { label: "Avg Revenue/Booking", val: stats.totalBookings > 0 ? `₹${Math.round(stats.revenue / stats.totalBookings).toLocaleString("en-IN")}` : "—" },
                  { label: "Occupancy Rate", val: `${stats.occupancyRate}%` },
                  { label: "Total Guests", val: stats.totalGuests },
                  { label: "Cancellation Rate", val: stats.totalBookings > 0 ? `${Math.round((stats.cancelled / stats.totalBookings) * 100)}%` : "0%" },
                ].map((x) => (
                  <div key={x.label} style={{ ...s.card, padding: 18 }}>
                    <p style={s.label}>{x.label}</p>
                    <p style={{ ...s.value, color: "var(--gold)", fontSize: 22 }}>{x.val}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ════════ BOOKING FORM MODAL ════════ */}
        {bookingForm && (
          <BookingFormModal
            state={bookingForm}
            onChange={(patch) => setBookingForm((prev) => (prev ? { ...prev, ...patch } : prev))}
            onCancel={() => { setBookingForm(null); setFormError(""); }}
            onSave={saveBooking}
            saving={savingBooking}
            error={formError}
            availableRoomNumbers={rooms.map((r) => r.number).sort()}
          />
        )}

        {/* ════════ SETTINGS TAB ════════ */}
        {tab === "settings" && (
          <div>
            <div style={{ ...s.card, padding: 32, maxWidth: 600, marginBottom: 24 }}>
              <h3 style={{ fontFamily: "'Cinzel', serif", color: "var(--gold)", fontSize: 18, marginBottom: 20 }}>Database</h3>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 16 }}>
                Seed the database with 21 rooms, demo bookings, and your admin account. Safe to run multiple times — it only creates data if collections are empty.
              </p>
              <button onClick={seedDatabase} disabled={seeding} className="btn-send" style={{ maxWidth: 250, opacity: seeding ? 0.6 : 1 }}>
                {seeding ? "Seeding..." : "Seed Database"}
              </button>
            </div>

            <div style={{ ...s.card, padding: 32, maxWidth: 600, marginBottom: 24 }}>
              <h3 style={{ fontFamily: "'Cinzel', serif", color: "var(--gold)", fontSize: 18, marginBottom: 20 }}>System Info</h3>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 2 }}>
                <p>MongoDB: Connected (Cluster0)</p>
                <p>Email: Gmail SMTP configured</p>
                <p>Rooms: {rooms.length} / 21</p>
                <p>Total Bookings: {bookings.length}</p>
                <p>Total Guests: {guests.length}</p>
              </div>
            </div>

            <div style={{ ...s.card, padding: 32, maxWidth: 600 }}>
              <h3 style={{ fontFamily: "'Cinzel', serif", color: "var(--gold)", fontSize: 18, marginBottom: 20 }}>Environment</h3>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 2 }}>
                To update phone numbers, email, or other settings, edit the <code style={{ color: "var(--gold-d)" }}>.env.local</code> file and restart the server.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Booking form modal ───
function BookingFormModal({
  state,
  onChange,
  onCancel,
  onSave,
  saving,
  error,
  availableRoomNumbers,
}: {
  state: BookingFormState;
  onChange: (patch: Partial<BookingFormState>) => void;
  onCancel: () => void;
  onSave: () => void;
  saving: boolean;
  error: string;
  availableRoomNumbers: string[];
}) {
  const field = (label: string, child: ReactNode) => (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", ...s.label, color: "var(--gold-d)" }}>{label}</label>
      {child}
    </div>
  );

  return (
    <div
      onClick={onCancel}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(2px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          ...s.card,
          width: "min(720px, 100%)",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: 32,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ fontFamily: "'Cinzel', serif", color: "var(--gold)", fontSize: 22 }}>
            {state.mode === "create" ? "New Booking" : "Edit Booking"}
          </h2>
          <button onClick={onCancel} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: 24, cursor: "pointer", lineHeight: 1 }} aria-label="Close">×</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {field("Guest Name *", (
            <input style={s.input} value={state.name} onChange={(e) => onChange({ name: e.target.value })} placeholder="Full name" />
          ))}
          {field("Phone *", (
            <input style={s.input} value={state.phone} onChange={(e) => onChange({ phone: e.target.value })} placeholder="+91 9XXXX XXXXX" />
          ))}
          {field("Email", (
            <input style={s.input} type="email" value={state.email} onChange={(e) => onChange({ email: e.target.value })} placeholder="guest@example.com" />
          ))}
          {field("Guests", (
            <input style={s.input} value={state.guests} onChange={(e) => onChange({ guests: e.target.value })} placeholder="2 Adults + 1 Child" />
          ))}
          {field("Check-in *", (
            <input style={s.input} type="date" value={state.checkin} onChange={(e) => onChange({ checkin: e.target.value })} />
          ))}
          {field("Check-out *", (
            <input style={s.input} type="date" value={state.checkout} onChange={(e) => onChange({ checkout: e.target.value })} />
          ))}
          {field("Room Type *", (
            <select style={s.input} value={state.room} onChange={(e) => onChange({ room: e.target.value })}>
              {ROOM_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          ))}
          {field("Room Number", (
            <>
              <input
                style={s.input}
                list="room-numbers-datalist"
                value={state.roomNumber}
                onChange={(e) => onChange({ roomNumber: e.target.value })}
                placeholder="e.g. 101"
              />
              <datalist id="room-numbers-datalist">
                {availableRoomNumbers.map((n) => <option key={n} value={n} />)}
              </datalist>
            </>
          ))}
          {field("Status", (
            <select style={s.input} value={state.status} onChange={(e) => onChange({ status: e.target.value })}>
              {STATUSES.map((st) => <option key={st} value={st}>{st.replace("_", " ")}</option>)}
            </select>
          ))}
          {field("Source", (
            <select style={s.input} value={state.source} onChange={(e) => onChange({ source: e.target.value })}>
              {SOURCES.map((src) => <option key={src} value={src}>{src}</option>)}
            </select>
          ))}
          {field("Total Amount (₹)", (
            <input style={s.input} type="number" min={0} value={state.totalAmount} onChange={(e) => onChange({ totalAmount: e.target.value })} placeholder="10000" />
          ))}
        </div>

        <div style={{ gridColumn: "1 / -1" }}>
          {field("Guest Message", (
            <textarea style={{ ...s.input, minHeight: 60, resize: "vertical", fontFamily: "'DM Sans', sans-serif" }} value={state.message} onChange={(e) => onChange({ message: e.target.value })} placeholder="Airport pickup, dietary preferences, etc." />
          ))}
          {field("Internal Notes", (
            <textarea style={{ ...s.input, minHeight: 60, resize: "vertical", fontFamily: "'DM Sans', sans-serif" }} value={state.notes} onChange={(e) => onChange({ notes: e.target.value })} placeholder="VIP, repeat guest, follow-up reminders…" />
          ))}
        </div>

        {error && (
          <p style={{ color: "#E74C3C", fontSize: 13, marginBottom: 12, padding: "10px 14px", background: "rgba(231,76,60,0.1)", border: "1px solid rgba(231,76,60,0.3)" }}>{error}</p>
        )}

        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 16 }}>
          <button
            onClick={onCancel}
            disabled={saving}
            style={{ padding: "10px 22px", background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={saving}
            style={{ padding: "10px 32px", background: "var(--gold)", border: "none", color: "var(--dark)", cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.6 : 1, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}
          >
            {saving ? "Saving…" : state.mode === "create" ? "Create Booking" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Small action button component ───
function ActionBtn({ label, color, onClick }: { label: string; color: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "3px 8px",
        fontSize: 10,
        background: `${color}22`,
        color,
        border: `1px solid ${color}44`,
        cursor: "pointer",
        fontFamily: "'DM Sans', sans-serif",
        letterSpacing: 0.5,
      }}
    >
      {label}
    </button>
  );
}
