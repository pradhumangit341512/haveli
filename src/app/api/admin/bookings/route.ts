import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/mongodb";
import { authenticateRequest } from "@/lib/auth";
import { escapeRegex } from "@/lib/utils";
import { sendStatusChangeEmail } from "@/services/email.service";

// Statuses that occupy a physical room and therefore must not overlap
const OCCUPYING_STATUSES = ["confirmed", "checked_in"] as const;

const EDITABLE_FIELDS = [
  "name",
  "phone",
  "email",
  "checkin",
  "checkout",
  "room",
  "roomNumber",
  "guests",
  "message",
  "status",
  "source",
  "totalAmount",
  "notes",
] as const;

type BookingDoc = {
  _id?: ObjectId;
  name?: string;
  phone?: string;
  email?: string;
  checkin?: string;
  checkout?: string;
  room?: string;
  roomNumber?: string;
  status?: string;
  [key: string]: unknown;
};

// Return the existing booking that conflicts with target room+dates, or null.
async function findRoomConflict(params: {
  roomNumber: string;
  checkin: string;
  checkout: string;
  excludeId?: ObjectId;
}) {
  const bookings = await getCollection("bookings");
  const filter: Record<string, unknown> = {
    roomNumber: params.roomNumber,
    status: { $in: OCCUPYING_STATUSES as unknown as string[] },
    checkin: { $lt: params.checkout },
    checkout: { $gt: params.checkin },
  };
  if (params.excludeId) filter._id = { $ne: params.excludeId };
  return bookings.findOne(filter) as Promise<BookingDoc | null>;
}

// GET /api/admin/bookings — list all bookings with filters
export async function GET(request: NextRequest) {
  const auth = authenticateRequest(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const bookings = await getCollection("bookings");
    const url = new URL(request.url);

    const filter: Record<string, unknown> = {};
    const status = url.searchParams.get("status");
    const search = url.searchParams.get("search");
    const from = url.searchParams.get("from");
    const to = url.searchParams.get("to");

    if (status && status !== "all") filter.status = status;
    if (search) {
      const safe = escapeRegex(search);
      filter.$or = [
        { name: { $regex: safe, $options: "i" } },
        { phone: { $regex: safe, $options: "i" } },
      ];
    }
    if (from || to) {
      filter.checkin = {};
      if (from) (filter.checkin as Record<string, string>).$gte = from;
      if (to) (filter.checkin as Record<string, string>).$lte = to;
    }

    const results = await bookings
      .find(filter)
      .sort({ createdAt: -1 })
      .limit(200)
      .toArray();

    return NextResponse.json({ success: true, bookings: results });
  } catch (error) {
    console.error("Bookings fetch error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST /api/admin/bookings — create a booking manually from the admin panel
export async function POST(request: NextRequest) {
  const auth = authenticateRequest(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { name, phone, email, checkin, checkout, room, roomNumber, guests, message, status, source, totalAmount, notes } = body;

    if (!name || !phone || !checkin || !checkout || !room) {
      return NextResponse.json(
        { error: "Missing required fields: name, phone, checkin, checkout, room" },
        { status: 400 }
      );
    }

    if (checkin >= checkout) {
      return NextResponse.json(
        { error: "Check-out must be after check-in" },
        { status: 400 }
      );
    }

    const finalStatus: string = status || "pending";

    // If this booking occupies the room, check for conflicts.
    if (roomNumber && (OCCUPYING_STATUSES as readonly string[]).includes(finalStatus)) {
      const conflict = await findRoomConflict({ roomNumber, checkin, checkout });
      if (conflict) {
        return NextResponse.json(
          {
            error: "Room conflict",
            message: `Room ${roomNumber} is already booked by ${conflict.name} from ${conflict.checkin} to ${conflict.checkout} (${conflict.status}).`,
          },
          { status: 409 }
        );
      }
    }

    const bookings = await getCollection("bookings");
    const now = new Date();
    const insert = await bookings.insertOne({
      name: String(name).trim(),
      phone: String(phone).trim(),
      email: email ? String(email).trim() : "",
      checkin,
      checkout,
      room,
      roomNumber: roomNumber || "",
      guests: guests || "",
      message: message || "",
      status: finalStatus,
      source: source || "Manual",
      totalAmount: Number(totalAmount) || 0,
      notes: notes || "",
      createdAt: now,
      createdBy: auth.username,
    });

    // Best-effort guest upsert so the Guests tab stays in sync.
    try {
      const guestsCol = await getCollection("guests");
      await guestsCol.updateOne(
        { phone: String(phone).trim() },
        {
          $setOnInsert: {
            phone: String(phone).trim(),
            name: String(name).trim(),
            email: email ? String(email).trim() : "",
            vip: false,
            visits: 0,
            totalSpent: 0,
            preferences: "",
            notes: "",
            createdAt: now,
          },
          $set: { lastVisit: now },
        },
        { upsert: true }
      );
    } catch {
      // Don't fail the booking insert if the guest upsert fails (e.g. unique index race).
    }

    const created = await bookings.findOne({ _id: insert.insertedId });
    return NextResponse.json({ success: true, booking: created }, { status: 201 });
  } catch (error) {
    console.error("Booking create error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PATCH /api/admin/bookings — update any editable booking fields (status, dates, room, etc.)
export async function PATCH(request: NextRequest) {
  const auth = authenticateRequest(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { id, ...rest } = body;
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const bookings = await getCollection("bookings");
    const targetId = new ObjectId(id);
    const existing = (await bookings.findOne({ _id: targetId })) as BookingDoc | null;
    if (!existing) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Whitelist editable fields
    const updateFields: Record<string, unknown> = {};
    for (const key of EDITABLE_FIELDS) {
      if (rest[key] !== undefined) updateFields[key] = rest[key];
    }
    if (Object.keys(updateFields).length === 0) {
      return NextResponse.json({ error: "No editable fields supplied" }, { status: 400 });
    }

    // Validate date order if either date changed
    const newCheckin = (updateFields.checkin as string) ?? existing.checkin;
    const newCheckout = (updateFields.checkout as string) ?? existing.checkout;
    if (newCheckin && newCheckout && newCheckin >= newCheckout) {
      return NextResponse.json({ error: "Check-out must be after check-in" }, { status: 400 });
    }
    if (updateFields.totalAmount !== undefined) {
      updateFields.totalAmount = Number(updateFields.totalAmount) || 0;
    }

    // Conflict check for occupying statuses
    const nextStatus = (updateFields.status as string) ?? existing.status;
    const nextRoom = (updateFields.roomNumber as string) ?? existing.roomNumber;
    if (
      nextRoom &&
      newCheckin &&
      newCheckout &&
      (OCCUPYING_STATUSES as readonly string[]).includes(nextStatus || "")
    ) {
      const conflict = await findRoomConflict({
        roomNumber: nextRoom,
        checkin: newCheckin,
        checkout: newCheckout,
        excludeId: targetId,
      });
      if (conflict) {
        return NextResponse.json(
          {
            error: "Room conflict",
            message: `Room ${nextRoom} is already booked by ${conflict.name} from ${conflict.checkin} to ${conflict.checkout} (${conflict.status}).`,
          },
          { status: 409 }
        );
      }
    }

    updateFields.updatedAt = new Date();
    updateFields.updatedBy = auth.username;

    const result = (await bookings.findOneAndUpdate(
      { _id: targetId },
      { $set: updateFields },
      { returnDocument: "after" }
    )) as BookingDoc | null;

    // Email on status change only
    if (
      result &&
      updateFields.status &&
      updateFields.status !== existing.status &&
      result.email
    ) {
      try {
        await sendStatusChangeEmail(result.email, result.name || "Guest", String(updateFields.status), id);
      } catch {
        /* silent — don't fail the request if email fails */
      }
    }

    return NextResponse.json({ success: true, booking: result });
  } catch (error) {
    console.error("Booking update error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE /api/admin/bookings — owner-only delete
export async function DELETE(request: NextRequest) {
  const auth = authenticateRequest(request);
  if (!auth || auth.role !== "owner") {
    return NextResponse.json({ error: "Unauthorized — owner only" }, { status: 403 });
  }

  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    const bookings = await getCollection("bookings");
    await bookings.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Booking delete error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
