export interface PaymentOrder {
  success: boolean;
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
}

export async function createPaymentOrder(amount: number, notes?: Record<string, string>): Promise<PaymentOrder> {
  const response = await fetch("/api/payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount, notes }),
  });

  if (!response.ok) {
    throw new Error("Failed to create payment order");
  }

  return response.json();
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill?: { name?: string; email?: string; contact?: string };
  theme?: { color: string };
  handler: (response: RazorpayResponse) => void;
}

interface RazorpayInstance {
  open: () => void;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export function openRazorpayCheckout(
  order: PaymentOrder,
  guestDetails: { name: string; phone: string; email?: string },
  onSuccess: (response: RazorpayResponse) => void,
  onError?: () => void
) {
  const options: RazorpayOptions = {
    key: order.keyId,
    amount: order.amount,
    currency: order.currency,
    name: "The Ummed Haveli",
    description: "Room Booking Payment",
    order_id: order.orderId,
    prefill: {
      name: guestDetails.name,
      contact: guestDetails.phone,
      email: guestDetails.email,
    },
    theme: { color: "#5C1A2A" },
    handler: onSuccess,
  };

  try {
    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch {
    onError?.();
  }
}
