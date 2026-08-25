import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getServerEnv } from "@/lib/env";

// Verifies a Razorpay payment server-side. The client CANNOT be trusted to
// report success: Razorpay signs `${order_id}|${payment_id}` with our key
// secret, and only a signature we recompute and match proves the payment is
// genuine. Without this step a forged/failed payment could be treated as paid.
export async function POST(request: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await request.json();

    if (
      typeof razorpay_order_id !== "string" ||
      typeof razorpay_payment_id !== "string" ||
      typeof razorpay_signature !== "string"
    ) {
      return NextResponse.json(
        { success: false, verified: false, message: "Invalid payment payload" },
        { status: 400 }
      );
    }

    const { razorpaySecret } = getServerEnv();
    if (!razorpaySecret) {
      return NextResponse.json(
        { success: false, verified: false, message: "Payment gateway not configured" },
        { status: 503 }
      );
    }

    const expected = crypto
      .createHmac("sha256", razorpaySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    // Constant-time comparison to avoid leaking the signature via timing.
    const expectedBuf = Buffer.from(expected, "utf8");
    const providedBuf = Buffer.from(razorpay_signature, "utf8");
    const verified =
      expectedBuf.length === providedBuf.length &&
      crypto.timingSafeEqual(expectedBuf, providedBuf);

    if (!verified) {
      return NextResponse.json(
        { success: false, verified: false, message: "Payment verification failed" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, verified: true });
  } catch {
    return NextResponse.json(
      { success: false, verified: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
