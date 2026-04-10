import { NextRequest, NextResponse } from "next/server";
import { getServerEnv } from "@/lib/env";

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = "INR", receipt, notes } = await request.json();
    const { razorpaySecret } = getServerEnv();
    const razorpayKeyId = process.env.RAZORPAY_KEY_ID;

    if (!razorpayKeyId || !razorpaySecret) {
      return NextResponse.json(
        { success: false, message: "Payment gateway not configured" },
        { status: 503 }
      );
    }

    if (!amount || amount < 100) {
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
