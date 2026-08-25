import type { BookingFormData } from "@/types";
import { env } from "@/lib/env";

// Single source of truth for the public WhatsApp Business number, shared with
// WhatsAppWidget (both read env.whatsapp) so they can never drift apart.
const WHATSAPP_NUMBER = env.whatsapp;

export function buildWhatsAppBookingUrl(data: BookingFormData): string {
  const message = [
    "*Booking Request — The Ummed Haveli*",
    "",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Check-in: ${data.checkin}`,
    `Check-out: ${data.checkout}`,
    `Room: ${data.room}`,
    `Guests: ${data.guests}`,
    `Request: ${data.message || "None"}`,
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppChatUrl(): string {
  const text = "Hi, I would like to book a room at The Ummed Haveli Jaipur";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
