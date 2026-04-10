import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";
import { verifyPassword, createToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ success: false, message: "Missing credentials" }, { status: 400 });
    }

    const staff = await getCollection("staff");
    const user = await staff.findOne({ username });

    if (!user) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }

    const token = createToken({ username: user.username, role: user.role });

    // Update last login
    await staff.updateOne({ _id: user._id }, { $set: { lastLogin: new Date() } });

    const response = NextResponse.json({
      success: true,
      token,
      user: { username: user.username, role: user.role, name: user.name },
    });

    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400, // 24 hours
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
