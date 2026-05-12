import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/mongodb";
import { authenticateRequest } from "@/lib/auth";
import { sendStatusChangeEmail } from "@/services/email.service";

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
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
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
      .limit(100)
      .toArray();

    return NextResponse.json({ success: true, bookings: results });
  } catch (error) {
    console.error("Bookings fetch error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// Statuses that occupy a physical room and therefore must not overlap
const OCCUPYING_STATUSES = ["confirmed", "checked_in"] as const;

// PATCH /api/admin/bookings — update booking status
export async function PATCH(request: NextRequest) {
  const auth = authenticateRequest(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id, status, notes } = await request.json();
    if (!id || !status) {
      return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
    }

    const bookings = await getCollection("bookings");
    const targetId = new ObjectId(id);

    // Conflict check: when promoting to a status that occupies a room,
    // make sure no other active booking overlaps the same room/dates.
    if ((OCCUPYING_STATUSES as readonly string[]).includes(status)) {
      const target = await bookings.findOne({ _id: targetId });
      if (!target) {
        return NextResponse.json({ error: "Booking not found" }, { status: 404 });
      }
      if (target.roomNumber && target.checkin && target.checkout) {
        // Overlap rule: existing.checkin < target.checkout AND target.checkin < existing.checkout
        const conflict = await bookings.findOne({
          _id: { $ne: targetId },
          roomNumber: target.roomNumber,
          status: { $in: OCCUPYING_STATUSES as unknown as string[] },
          checkin: { $lt: target.checkout },
          checkout: { $gt: target.checkin },
        });
        if (conflict) {
          return NextResponse.json(
            {
              error: "Room conflict",
              message: `Room ${target.roomNumber} is already booked by ${conflict.name} from ${conflict.checkin} to ${conflict.checkout} (${conflict.status}).`,
              conflict: {
                id: conflict._id.toString(),
                name: conflict.name,
                roomNumber: conflict.roomNumber,
                checkin: conflict.checkin,
                checkout: conflict.checkout,
                status: conflict.status,
              },
            },
            { status: 409 }
          );
        }
      }
    }

    const updateFields: Record<string, unknown> = {
      status,
      updatedAt: new Date(),
      updatedBy: auth.username,
    };
    if (notes !== undefined) updateFields.notes = notes;

    const result = await bookings.findOneAndUpdate(
      { _id: targetId },
      { $set: updateFields },
      { returnDocument: "after" }
    );

    if (!result) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Send email notification on status change
    try {
      if (result.email) {
        await sendStatusChangeEmail(result.email, result.name, status, id);
      }
    } catch {
      // Don't fail the request if email fails
    }

    return NextResponse.json({ success: true, booking: result });
  } catch (error) {
    console.error("Booking update error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE /api/admin/bookings — delete a booking
export async function DELETE(request: NextRequest) {
  const auth = authenticateRequest(request);
  if (!auth || auth.role !== "owner") {
    return NextResponse.json({ error: "Unauthorized — owner only" }, { status: 403 });
  }

  try {
    const { id } = await request.json();
    const bookings = await getCollection("bookings");
    await bookings.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Booking delete error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
