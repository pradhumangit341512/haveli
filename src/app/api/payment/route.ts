import { NextRequest, NextResponse } from "next/server";
import { getServerEnv } from "@/lib/env";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    if (!rateLimit(`payment:${getClientIp(request)}`, 10, 60_000)) {
      return NextResponse.json(
        { success: false, message: "Too many requests. Please try again shortly." },
        { status: 429 }
      );
    }

    const { amount, currency = "INR", receipt, notes } = await request.json();
    const { razorpaySecret } = getServerEnv();
    const razorpayKeyId = process.env.RAZORPAY_KEY_ID;

    if (!razorpayKeyId || !razorpaySecret) {
      return NextResponse.json(
        { success: false, message: "Payment gateway not configured" },
        { status: 503 }
      );
    }

    // Amount must be a positive integer number of rupees within a sane range.
    // (Client-supplied; still validate strictly to reject non-numeric, NaN,
    // fractional, or absurd values before forwarding to Razorpay.)
    const MIN_AMOUNT = 100; // ₹100
    const MAX_AMOUNT = 10_00_000; // ₹10,00,000
    if (
      typeof amount !== "number" ||
      !Number.isInteger(amount) ||
      amount < MIN_AMOUNT ||
      amount > MAX_AMOUNT
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid amount" },
        { status: 400 }
      );
    }

    // Create Razorpay order via their API
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${razorpayKeyId}:${razorpaySecret}`).toString("base64")}`,
      },
      body: JSON.stringify({
        amount: amount * 100, // Razorpay expects amount in paise
        currency,
        receipt: receipt || `order_${Date.now()}`,
        notes: notes || {},
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { success: false, message: errorData.error?.description || "Payment order creation failed" },
        { status: 500 }
      );
    }

    const order = await response.json();

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: razorpayKeyId,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
