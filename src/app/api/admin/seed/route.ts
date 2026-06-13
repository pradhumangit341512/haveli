import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";
import { hashPassword } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const expected = process.env.SEED_SECRET;
  if (!expected) {
    return NextResponse.json(
      { success: false, error: "SEED_SECRET is not configured on the server" },
      { status: 500 }
    );
  }
  if (request.headers.get("x-seed-secret") !== expected) {
    return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
  }

  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminUsername || !adminPassword) {
    return NextResponse.json(
      { success: false, error: "ADMIN_USERNAME and ADMIN_PASSWORD must be set" },
      { status: 500 }
    );
  }

  try {
    // Seed staff
    const staff = await getCollection("staff");
    const existingAdmin = await staff.findOne({ username: adminUsername });

    if (!existingAdmin) {
      const passwordHash = await hashPassword(adminPassword);
      await staff.insertOne({
        username: adminUsername,
        passwordHash,
        name: "Pradhuman Singh",
        role: "owner",
        email: process.env.GMAIL_USER,
        createdAt: new Date(),
      });
    }

    // Seed 21 rooms
    const rooms = await getCollection("rooms");
    const existingRooms = await rooms.countDocuments();

    if (existingRooms === 0) {
      const roomData = [];
      // Floor 1: 5 Royal Deluxe
      for (let i = 1; i <= 5; i++) {
        roomData.push({
          number: `1${String(i).padStart(2, "0")}`,
          floor: 1,
          type: "Royal Deluxe",
          price: 4000,
          status: "available",
          housekeeping: "clean",
          notes: "",
          createdAt: new Date(),
        });
      }
      // Floor 2: 5 Royal Deluxe
      for (let i = 1; i <= 5; i++) {
        roomData.push({
          number: `2${String(i).padStart(2, "0")}`,
          floor: 2,
          type: "Royal Deluxe",
          price: 4000,
          status: "available",
          housekeeping: "clean",
          notes: "",
          createdAt: new Date(),
        });
      }
      // Floor 3: 4 Royal Deluxe + 1 Royal Premium
      for (let i = 1; i <= 4; i++) {
        roomData.push({
          number: `3${String(i).padStart(2, "0")}`,
          floor: 3,
          type: "Royal Deluxe",
          price: 4000,
          status: "available",
          housekeeping: "clean",
          notes: "",
          createdAt: new Date(),
        });
      }
      roomData.push({
        number: "305",
        floor: 3,
        type: "Royal Premium",
        price: 3000,
        status: "available",
        housekeeping: "clean",
        notes: "Airport view",
        createdAt: new Date(),
      });
      // Floor 4: 4 Royal Premium
      for (let i = 1; i <= 4; i++) {
        roomData.push({
          number: `4${String(i).padStart(2, "0")}`,
          floor: 4,
          type: "Royal Premium",
          price: 3000,
          status: "available",
          housekeeping: "clean",
          notes: "",
          createdAt: new Date(),
        });
      }
      // Floor 5: 2 Royal Premium (rooftop level)
      for (let i = 1; i <= 2; i++) {
        roomData.push({
          number: `5${String(i).padStart(2, "0")}`,
          floor: 5,
          type: "Royal Premium",
          price: 3000,
          status: "available",
          housekeeping: "clean",
          notes: "Rooftop access",
          createdAt: new Date(),
        });
      }

      await rooms.insertMany(roomData);
    }

    // Seed demo bookings
    const bookings = await getCollection("bookings");
    const existingBookings = await bookings.countDocuments();

    if (existingBookings === 0) {
      await bookings.insertMany([
        { name: "Rahul Sharma", phone: "+91 98765 43210", email: "rahul@example.com", checkin: "2025-04-01", checkout: "2025-04-03", room: "Royal Deluxe", roomNumber: "101", guests: "2 Adults", message: "Airport pickup needed", status: "confirmed", source: "Direct", totalAmount: 10000, notes: "", createdAt: new Date("2025-03-28") },
        { name: "Priya Agarwal", phone: "+91 87654 32109", email: "priya@example.com", checkin: "2025-04-10", checkout: "2025-04-15", room: "Royal Premium", roomNumber: "305", guests: "2 Adults + 1 Child", message: "Honeymoon trip, cake arrangement", status: "confirmed", source: "WhatsApp", totalAmount: 40000, notes: "VIP guest", createdAt: new Date("2025-03-27") },
        { name: "Vikram Singh", phone: "+91 76543 21098", email: "", checkin: "2025-05-01", checkout: "2025-05-03", room: "Royal Premium", roomNumber: "404", guests: "2 Adults + 2 Children", message: "", status: "pending", source: "MakeMyTrip", totalAmount: 20000, notes: "", createdAt: new Date("2025-03-26") },
        { name: "Meera Joshi", phone: "+91 99887 76655", email: "meera@example.com", checkin: "2025-04-05", checkout: "2025-04-07", room: "Royal Deluxe", roomNumber: "202", guests: "1 Adult", message: "Business trip, need work desk", status: "pending", source: "Direct", totalAmount: 10000, notes: "", createdAt: new Date("2025-03-29") },
        { name: "Arjun Patel", phone: "+91 88776 65544", email: "arjun@example.com", checkin: "2025-03-25", checkout: "2025-03-27", room: "Royal Premium", roomNumber: "401", guests: "2 Adults", message: "", status: "checked_out", source: "Booking.com", totalAmount: 16000, notes: "Repeat guest", createdAt: new Date("2025-03-20") },
      ]);
    }

    // Seed demo guests
    const guests = await getCollection("guests");
    const existingGuests = await guests.countDocuments();

    if (existingGuests === 0) {
      await guests.insertMany([
        { name: "Rahul Sharma", phone: "+91 98765 43210", email: "rahul@example.com", visits: 1, totalSpent: 10000, vip: false, lastVisit: new Date("2025-03-28"), preferences: "Non-smoking room", notes: "", createdAt: new Date() },
        { name: "Priya Agarwal", phone: "+91 87654 32109", email: "priya@example.com", visits: 1, totalSpent: 40000, vip: true, lastVisit: new Date("2025-03-27"), preferences: "High floor, extra pillows", notes: "Honeymoon couple", createdAt: new Date() },
        { name: "Arjun Patel", phone: "+91 88776 65544", email: "arjun@example.com", visits: 3, totalSpent: 48000, vip: true, lastVisit: new Date("2025-03-25"), preferences: "Airport view room", notes: "Repeat guest — corporate", createdAt: new Date() },
      ]);
    }

    // Create indexes
    await bookings.createIndex({ status: 1 });
    await bookings.createIndex({ checkin: 1 });
    await bookings.createIndex({ createdAt: -1 });
    await guests.createIndex({ phone: 1 }, { unique: true });
    await staff.createIndex({ username: 1 }, { unique: true });

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully",
      counts: {
        staff: await staff.countDocuments(),
        rooms: await rooms.countDocuments(),
        bookings: await bookings.countDocuments(),
        guests: await guests.countDocuments(),
      },
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
