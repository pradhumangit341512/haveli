import type { BookingFormData } from "@/types";

export interface BookingResponse {
  success: boolean;
  message: string;
  whatsappUrl?: string;
}

export async function submitBooking(data: BookingFormData): Promise<BookingResponse> {
  const response = await fetch("/api/booking", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Booking submission failed");
  }

  return response.json();
}
