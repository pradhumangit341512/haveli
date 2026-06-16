import type { BookingFormData } from "@/types";

// Sends a WhatsApp message to the hotel's own number via CallMeBot (free).
// Setup (one-time):
//   1. Save +34 644 51 95 23 as a contact (CallMeBot).
//   2. Send it the message: "I allow callmebot to send me messages"
//   3. You'll receive your personal API key.
//   4. Put your number + key in env: CALLMEBOT_PHONE and CALLMEBOT_APIKEY.
//      CALLMEBOT_PHONE format: country code + number, no "+" or spaces, e.g. 917296812341
export async function sendWhatsAppBookingNotification(data: BookingFormData): Promise<void> {
  const phone = process.env.CALLMEBOT_PHONE;
  const apiKey = process.env.CALLMEBOT_APIKEY;

  // Not configured — skip silently so bookings still succeed.
  if (!phone || !apiKey) return;

  const message = [
    "🛎️ New Booking Request — The Ummed Haveli",
    "",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Check-in: ${data.checkin}`,
    `Check-out: ${data.checkout}`,
    `Room: ${data.room}`,
    `Guests: ${data.guests}`,
    `Request: ${data.message || "None"}`,
  ].join("\n");

  const url =
    `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}` +
    `&text=${encodeURIComponent(message)}&apikey=${encodeURIComponent(apiKey)}`;

  const res = await fetch(url, { method: "GET" });
  if (!res.ok) {
    throw new Error(`CallMeBot request failed with status ${res.status}`);
  }
}
