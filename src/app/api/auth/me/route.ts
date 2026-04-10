import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const payload = authenticateRequest(request);
  if (!payload) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({
    authenticated: true,
    user: { username: payload.username, role: payload.role },
  });
}
