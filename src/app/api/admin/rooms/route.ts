import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/mongodb";
import { authenticateRequest } from "@/lib/auth";

// GET /api/admin/rooms — list all rooms
export async function GET(request: NextRequest) {
  const auth = authenticateRequest(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const rooms = await getCollection("rooms");
    const results = await rooms.find({}).sort({ floor: 1, number: 1 }).toArray();
    return NextResponse.json({ success: true, rooms: results });
  } catch (error) {
    console.error("Rooms fetch error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PATCH /api/admin/rooms — update room status or pricing
export async function PATCH(request: NextRequest) {
  const auth = authenticateRequest(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id, ...updates } = await request.json();
    if (!id) return NextResponse.json({ error: "Missing room id" }, { status: 400 });

    const rooms = await getCollection("rooms");
    const allowed = ["status", "housekeeping", "price", "notes", "maintenanceNote"];
    const updateFields: Record<string, unknown> = { updatedAt: new Date() };

    for (const key of allowed) {
      if (updates[key] !== undefined) updateFields[key] = updates[key];
    }

    const result = await rooms.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateFields },
      { returnDocument: "after" }
    );

    return NextResponse.json({ success: true, room: result });
  } catch (error) {
    console.error("Room update error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
