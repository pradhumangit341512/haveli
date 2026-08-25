// Centralized environment variable access with defaults

export const env = {
  phone: process.env.NEXT_PUBLIC_PHONE_NUMBER || "+917296812341",
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY || "+91 72968 12341",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917296812341",
  email: process.env.NEXT_PUBLIC_EMAIL || "theummedhaveli@gmail.com",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.theummedhaveli.com",
  razorpayKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
  gaId: process.env.NEXT_PUBLIC_GA_ID || "",
  fbPixelId: process.env.NEXT_PUBLIC_FB_PIXEL_ID || "",
} as const;

// Server-only env (never exposed to client).
// NOTE: email uses GMAIL_USER / GMAIL_APP_PASSWORD / NOTIFICATION_EMAIL read
// directly in email.service.ts; admin credentials are read directly in the seed
// route. Those are intentionally NOT surfaced here to avoid misleading/dead
// config (the old SMTP_* fields were never used by the email transport).
export function getServerEnv() {
  return {
    razorpaySecret: process.env.RAZORPAY_KEY_SECRET || "",
  };
}
