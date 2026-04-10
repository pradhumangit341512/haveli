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
    const updateFields: Record<string, unknown> = {
      status,
      updatedAt: new Date(),
      updatedBy: auth.username,
    };
    if (notes !== undefined) updateFields.notes = notes;

    const result = await bookings.findOneAndUpdate(
      { _id: new ObjectId(id) },
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
