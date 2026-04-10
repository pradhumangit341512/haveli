import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";
import { authenticateRequest } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const auth = authenticateRequest(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const bookings = await getCollection("bookings");
    const rooms = await getCollection("rooms");
    const guests = await getCollection("guests");

    const allBookings = await bookings.find({}).toArray();
    const allRooms = await rooms.find({}).toArray();
    const totalGuests = await guests.countDocuments();

    const today = new Date().toISOString().split("T")[0];

    const stats = {
      totalBookings: allBookings.length,
      pending: allBookings.filter((b) => b.status === "pending").length,
      confirmed: allBookings.filter((b) => b.status === "confirmed").length,
      checkedIn: allBookings.filter((b) => b.status === "checked_in").length,
      cancelled: allBookings.filter((b) => b.status === "cancelled").length,
      totalRooms: allRooms.length,
      availableRooms: allRooms.filter((r) => r.status === "available").length,
      occupiedRooms: allRooms.filter((r) => r.status === "occupied").length,
      maintenanceRooms: allRooms.filter((r) => r.status === "maintenance").length,
      totalGuests,
      todayCheckins: allBookings.filter((b) => b.checkin === today && b.status === "confirmed").length,
      todayCheckouts: allBookings.filter((b) => b.checkout === today && b.status === "checked_in").length,
      occupancyRate: allRooms.length > 0
        ? Math.round((allRooms.filter((r) => r.status === "occupied").length / allRooms.length) * 100)
        : 0,
      revenue: allBookings
        .filter((b) => b.status === "confirmed" || b.status === "checked_in" || b.status === "checked_out")
        .reduce((sum, b) => sum + (b.totalAmount || 0), 0),
    };

    // Monthly revenue for chart (last 6 months)
    const monthlyRevenue: { month: string; revenue: number; bookings: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const monthStr = d.toISOString().slice(0, 7); // YYYY-MM
      const monthLabel = d.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
      const monthBookings = allBookings.filter((b) => b.createdAt?.toString().startsWith(monthStr));
      monthlyRevenue.push({
        month: monthLabel,
        revenue: monthBookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0),
        bookings: monthBookings.length,
      });
    }

    // Room type distribution
    const roomTypeStats = allBookings.reduce((acc: Record<string, number>, b) => {
      const room = b.room || "Unknown";
      acc[room] = (acc[room] || 0) + 1;
      return acc;
    }, {});

    // Booking source distribution
    const sourceStats = allBookings.reduce((acc: Record<string, number>, b) => {
      const source = b.source || "Direct";
      acc[source] = (acc[source] || 0) + 1;
      return acc;
    }, {});

    return NextResponse.json({
      success: true,
      stats,
      monthlyRevenue,
      roomTypeStats,
      sourceStats,
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
