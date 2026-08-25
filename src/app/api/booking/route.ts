import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";
import { buildWhatsAppBookingUrl } from "@/services/whatsapp.service";
import { sendBookingNotification } from "@/services/email.service";
import { sendWhatsAppBookingNotification } from "@/services/callmebot.service";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import type { BookingFormData } from "@/types";

export async function POST(request: NextRequest) {
  try {
    if (!rateLimit(`booking:${getClientIp(request)}`, 5, 60_000)) {
      return NextResponse.json(
        { success: false, message: "Too many requests. Please try again shortly." },
        { status: 429 }
      );
    }

    const body = (await request.json()) as Partial<Record<keyof BookingFormData, unknown>>;

    // Validate untrusted input rather than trusting the request shape: required
    // fields must be non-empty strings (rejects objects/nulls reaching Mongo).
    const isNonEmptyString = (v: unknown): v is string => typeof v === "string" && v.trim() !== "";
    if (
      !isNonEmptyString(body.name) ||
      !isNonEmptyString(body.phone) ||
      !isNonEmptyString(body.checkin) ||
      !isNonEmptyString(body.checkout)
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Normalize into a known-good shape; coerce optional fields to strings.
    const data: BookingFormData = {
      name: body.name,
      phone: body.phone,
      checkin: body.checkin,
      checkout: body.checkout,
      room: typeof body.room === "string" ? body.room : "",
      guests: typeof body.guests === "string" ? body.guests : String(body.guests ?? ""),
      message: typeof body.message === "string" ? body.message : "",
    };

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
