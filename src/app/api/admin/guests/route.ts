import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/mongodb";
import { authenticateRequest } from "@/lib/auth";
import { escapeRegex } from "@/lib/utils";

// GET /api/admin/guests — list guests
export async function GET(request: NextRequest) {
  const auth = authenticateRequest(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const guests = await getCollection("guests");
    const url = new URL(request.url);
    const search = url.searchParams.get("search");

    const filter: Record<string, unknown> = {};
    if (search) {
      const safe = escapeRegex(search);
      filter.$or = [
        { name: { $regex: safe, $options: "i" } },
        { phone: { $regex: safe, $options: "i" } },
        { email: { $regex: safe, $options: "i" } },
      ];
    }

    const results = await guests
      .find(filter)
      .sort({ lastVisit: -1 })
      .limit(100)
      .toArray();

    return NextResponse.json({ success: true, guests: results });
  } catch (error) {
    console.error("Guests fetch error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PATCH /api/admin/guests — update guest notes/preferences
export async function PATCH(request: NextRequest) {
  const auth = authenticateRequest(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id, notes, vip, preferences } = await request.json();
    const guests = await getCollection("guests");

    const updateFields: Record<string, unknown> = { updatedAt: new Date() };
    if (notes !== undefined) updateFields.notes = notes;
    if (vip !== undefined) updateFields.vip = vip;
    if (preferences !== undefined) updateFields.preferences = preferences;

    await guests.updateOne({ _id: new ObjectId(id) }, { $set: updateFields });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Guest update error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
