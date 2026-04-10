// Centralized environment variable access with defaults

export const env = {
  phone: process.env.NEXT_PUBLIC_PHONE_NUMBER || "+919XXXXXXXXX",
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY || "+91 9XXX XXX XXX",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919XXXXXXXXX",
  email: process.env.NEXT_PUBLIC_EMAIL || "reservations@theshekhawathaveli.com",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.theshekhawathaveli.com",
  razorpayKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
  gaId: process.env.NEXT_PUBLIC_GA_ID || "",
  fbPixelId: process.env.NEXT_PUBLIC_FB_PIXEL_ID || "",
} as const;

// Server-only env (never exposed to client)
export function getServerEnv() {
  return {
    razorpaySecret: process.env.RAZORPAY_KEY_SECRET || "",
    smtpHost: process.env.SMTP_HOST || "",
    smtpPort: Number(process.env.SMTP_PORT) || 587,
    smtpUser: process.env.SMTP_USER || "",
    smtpPass: process.env.SMTP_PASS || "",
    notificationEmail: process.env.NOTIFICATION_EMAIL || "",
    adminUsername: process.env.ADMIN_USERNAME || "admin",
    adminPassword: process.env.ADMIN_PASSWORD || "admin123",
  };
}
