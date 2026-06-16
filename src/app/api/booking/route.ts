import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";
import { buildWhatsAppBookingUrl } from "@/services/whatsapp.service";
import { sendBookingNotification } from "@/services/email.service";
import { sendWhatsAppBookingNotification } from "@/services/callmebot.service";
import type { BookingFormData } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const data: BookingFormData = await request.json();

    if (!data.name || !data.phone || !data.checkin || !data.checkout) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Try to persist to MongoDB, but don't fail the booking if the DB
    // isn't configured or is unreachable — notifications still go out.
    let bookingId = "";
    try {
      const bookings = await getCollection("bookings");
      const booking = {
        name: data.name,
        phone: data.phone,
        email: "",
        checkin: data.checkin,
        checkout: data.checkout,
        room: data.room,
        roomNumber: "",
        guests: data.guests,
        message: data.message || "",
        status: "pending",
        source: "Direct",
        totalAmount: 0,
        notes: "",
        createdAt: new Date(),
      };

      const result = await bookings.insertOne(booking);
      bookingId = result.insertedId.toString();

      // Upsert guest record
      const guests = await getCollection("guests");
      await guests.updateOne(
        { phone: data.phone },
        {
          $set: { name: data.name, phone: data.phone, lastVisit: new Date(), updatedAt: new Date() },
          $inc: { visits: 1 },
          $setOnInsert: { email: "", vip: false, totalSpent: 0, preferences: "", notes: "", createdAt: new Date() },
        },
        { upsert: true }
      );
    } catch (dbError) {
      console.error("Booking DB save skipped/failed:", dbError);
    }

    // WhatsApp notification to the hotel (CallMeBot) — best effort.
    try {
      await sendWhatsAppBookingNotification(data);
    } catch (waError) {
      console.error("WhatsApp notification failed:", waError);
    }

    // Email notification to the hotel — best effort.
    try {
      await sendBookingNotification({
        guestName: data.name,
        guestPhone: data.phone,
        checkin: data.checkin,
        checkout: data.checkout,
        room: data.room,
        guests: data.guests,
        message: data.message,
      });
    } catch {
      // Don't fail the booking if email fails
    }

    const whatsappUrl = buildWhatsAppBookingUrl(data);

    return NextResponse.json({
      success: true,
      message: "Booking request received",
      bookingId,
      whatsappUrl,
    });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
