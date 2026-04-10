import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
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
