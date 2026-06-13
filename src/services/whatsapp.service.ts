import type { BookingFormData } from "@/types";

const WHATSAPP_NUMBER = "917296812341";

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
