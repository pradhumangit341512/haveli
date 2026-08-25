import nodemailer from "nodemailer";

// Escape user-supplied values before embedding them in HTML emails to prevent
// HTML/content injection into staff and guest inboxes.
function esc(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

interface BookingEmailData {
  guestName: string;
  guestPhone: string;
  checkin: string;
  checkout: string;
  room: string;
  guests: string;
  message?: string;
}

export async function sendBookingNotification(data: BookingEmailData): Promise<void> {
  const to = process.env.NOTIFICATION_EMAIL || process.env.GMAIL_USER;
  if (!to) return;

  await transporter.sendMail({
    from: `"The Ummed Haveli" <${process.env.GMAIL_USER}>`,
    to,
    subject: `New Booking Request — ${data.guestName} (${data.room})`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #5C1A2A; padding: 20px; text-align: center;">
          <h1 style="color: #C8A45C; font-size: 20px; margin: 0;">The Ummed Haveli</h1>
          <p style="color: rgba(255,255,255,0.6); font-size: 12px; margin: 4px 0 0;">New Booking Request</p>
        </div>
        <div style="padding: 24px; background: #f9f9f9;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; width: 120px;">Guest Name</td><td>${esc(data.guestName)}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Phone</td><td><a href="tel:${esc(data.guestPhone)}">${esc(data.guestPhone)}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Check-in</td><td>${esc(data.checkin)}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Check-out</td><td>${esc(data.checkout)}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Room</td><td>${esc(data.room)}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Guests</td><td>${esc(data.guests)}</td></tr>
            ${data.message ? `<tr><td style="padding: 8px 0; font-weight: bold;">Requests</td><td>${esc(data.message)}</td></tr>` : ""}
          </table>
        </div>
        <div style="padding: 16px; text-align: center; background: #1C1917;">
          <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin: 0;">Respond to this guest within 30 minutes</p>
        </div>
      </div>
    `,
  });
}

export async function sendBookingConfirmation(
  guestEmail: string,
  data: BookingEmailData & { bookingId: string }
): Promise<void> {
  if (!guestEmail) return;

  await transporter.sendMail({
    from: `"The Ummed Haveli" <${process.env.GMAIL_USER}>`,
    to: guestEmail,
    subject: `Booking Confirmed — The Ummed Haveli, Jaipur`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #5C1A2A; padding: 24px; text-align: center;">
          <h1 style="color: #C8A45C; font-size: 22px; margin: 0;">The Ummed Haveli</h1>
          <p style="color: rgba(255,255,255,0.6); font-size: 12px; margin: 4px 0 0;">Luxury Heritage Hotel • Jaipur</p>
        </div>
        <div style="padding: 24px; background: white;">
          <h2 style="color: #5C1A2A; font-size: 18px;">Booking Confirmed!</h2>
          <p style="color: #666;">Dear ${esc(data.guestName)},</p>
          <p style="color: #666;">Thank you for choosing The Ummed Haveli. Your booking has been confirmed.</p>
          <div style="background: #f9f6f0; padding: 16px; margin: 16px 0; border-left: 3px solid #C8A45C;">
            <p style="margin: 4px 0;"><strong>Booking ID:</strong> ${esc(data.bookingId)}</p>
            <p style="margin: 4px 0;"><strong>Room:</strong> ${esc(data.room)}</p>
            <p style="margin: 4px 0;"><strong>Check-in:</strong> ${esc(data.checkin)} (12:00 PM)</p>
            <p style="margin: 4px 0;"><strong>Check-out:</strong> ${esc(data.checkout)} (11:00 AM)</p>
            <p style="margin: 4px 0;"><strong>Guests:</strong> ${esc(data.guests)}</p>
          </div>
          <p style="color: #999; font-size: 13px; margin-top: 24px;">
            For any changes, call us at +91 72968 12341 or reply to this email.
          </p>
        </div>
        <div style="padding: 16px; text-align: center; background: #1C1917;">
          <p style="color: #C8A45C; font-size: 14px; margin: 0;">Padharo Mhare Desh!</p>
          <p style="color: rgba(255,255,255,0.3); font-size: 11px; margin: 4px 0 0;">Krishi Nagar, Budh Singhpura, Near Terminal 1 Airport, Sanganer, Jaipur 302029</p>
        </div>
      </div>
    `,
  });
}

export async function sendStatusChangeEmail(
  guestEmail: string,
  guestName: string,
  status: string,
  bookingId: string
): Promise<void> {
  if (!guestEmail) return;

  const statusMessages: Record<string, string> = {
    confirmed: "Your booking has been confirmed! We look forward to welcoming you.",
    cancelled: "Your booking has been cancelled. If this was a mistake, please contact us immediately.",
    checked_in: "Welcome to The Ummed Haveli! We hope you enjoy your stay.",
    checked_out: "Thank you for staying with us. We hope to see you again soon!",
  };

  await transporter.sendMail({
    from: `"The Ummed Haveli" <${process.env.GMAIL_USER}>`,
    to: guestEmail,
    subject: `Booking ${status.replace("_", " ").toUpperCase()} — The Ummed Haveli`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
        <h2 style="color: #5C1A2A;">The Ummed Haveli</h2>
        <p>Dear ${esc(guestName)},</p>
        <p>${statusMessages[status] || `Your booking status has been updated to: ${esc(status)}`}</p>
        <p style="color: #999; font-size: 13px;">Booking ID: ${esc(bookingId)}</p>
        <p style="color: #999; font-size: 13px;">Questions? Call +91 72968 12341</p>
      </div>
    `,
  });
}
