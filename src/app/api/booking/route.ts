import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";
import { buildWhatsAppBookingUrl } from "@/services/whatsapp.service";
import { sendBookingNotification } from "@/services/email.service";
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

    // Save to MongoDB
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

    // Send email notification to hotel
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
      bookingId: result.insertedId.toString(),
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
