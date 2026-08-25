"use client";

import { useState } from "react";
import Script from "next/script";
import { createPaymentOrder, openRazorpayCheckout, verifyPayment } from "@/services/payment.service";

interface PaymentButtonProps {
  amount: number;
  roomName: string;
  guestName: string;
  guestPhone: string;
  guestEmail?: string;
  onSuccess?: () => void;
}

export default function PaymentButton({
  amount,
  roomName,
  guestName,
  guestPhone,
  guestEmail,
  onSuccess,
}: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const order = await createPaymentOrder(amount, { room: roomName });

      openRazorpayCheckout(
        order,
        { name: guestName, phone: guestPhone, email: guestEmail },
        async (response) => {
          // Never trust the client callback alone — confirm the signature server-side.
          const verified = await verifyPayment(response);
          if (verified) {
            onSuccess?.();
          } else {
            alert("We could not verify your payment. If money was debited, please contact us with your payment reference.");
          }
        },
        () => {
          alert("Payment could not be initiated. Please try again or contact us directly.");
        }
      );
    } catch {
      alert("Unable to process payment. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <button
        onClick={handlePayment}
        disabled={loading}
        className="btn-gold"
        style={{ opacity: loading ? 0.6 : 1, cursor: loading ? "not-allowed" : "pointer" }}
      >
        {loading ? "Processing..." : `Pay ₹${amount.toLocaleString("en-IN")} Now`}
      </button>
    </>
  );
}
