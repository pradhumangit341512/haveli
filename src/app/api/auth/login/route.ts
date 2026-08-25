import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";
import { verifyPassword, createToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Require strings — reject objects like {"$ne": null} that would otherwise
    // reach the Mongo query as operators (NoSQL injection).
    if (typeof username !== "string" || typeof password !== "string" || !username || !password) {
      return NextResponse.json({ success: false, message: "Missing credentials" }, { status: 400 });
    }

    const staff = await getCollection("staff");
    const user = await staff.findOne({ username });

    if (!user || typeof user.passwordHash !== "string") {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }

    // Validate the stored role against the allowed set before minting a token,
    // rather than trusting an arbitrary string from the DB document.
    const ALLOWED_ROLES = ["owner", "manager", "frontdesk"] as const;
    if (!ALLOWED_ROLES.includes(user.role)) {
      return NextResponse.json({ success: false, message: "Account role misconfigured" }, { status: 500 });
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
