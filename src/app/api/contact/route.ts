import { NextRequest, NextResponse } from "next/server";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    if (!rateLimit(`contact:${getClientIp(request)}`, 5, 60_000)) {
      return NextResponse.json(
        { success: false, message: "Too many requests. Please try again shortly." },
        { status: 429 }
      );
    }

    const data = await request.json();

    if (!data.name || !data.phone) {
      return NextResponse.json(
        { success: false, message: "Name and phone are required" },
        { status: 400 }
      );
    }

    // In production, you could:
    // - Send email notification
    // - Save to database
    // - Push to CRM/PMS

    return NextResponse.json({
      success: true,
      message: "Message received. We will contact you shortly.",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
