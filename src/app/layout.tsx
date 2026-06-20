import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/components/language/LanguageContext";
import ClientShell from "@/components/layout/ClientShell";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import FacebookPixel from "@/components/analytics/FacebookPixel";

export const metadata: Metadata = {
  title: "The Ummed Haveli | A Heritage Hotel At The Airport | Sanganer, Jaipur",
  description:
    "The Ummed Haveli - A heritage hotel near Terminal 1 Airport, Sanganer, Jaipur. Royal heritage rooms, rooftop restaurant with airport view, 5-star facilities. Book direct and save.",
  keywords:
    "luxury hotel jaipur, hotel near jaipur airport, sanganer hotel, heritage hotel jaipur, rooftop restaurant jaipur, wedding hotel jaipur, ummed haveli jaipur, 5 star hotel jaipur, airport hotel jaipur, hotel near terminal 1 jaipur",
  authors: [{ name: "The Ummed Haveli" }],
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  alternates: {
    canonical: "https://www.theummedhaveli.com/",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    title: "The Ummed Haveli | A Heritage Hotel At The Airport, Jaipur",
    description:
      "Royal heritage rooms. Rooftop restaurant with airport view. Heritage hospitality near Terminal 1 Airport, Sanganer, Jaipur.",
    images: [
      {
        url: "https://www.theummedhaveli.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Ummed Haveli heritage hotel exterior in Sanganer Jaipur",
      },
    ],
    url: "https://www.theummedhaveli.com/",
    siteName: "The Ummed Haveli",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Ummed Haveli | A Heritage Hotel At The Airport, Jaipur",
    description:
      "Luxury heritage rooms, rooftop airport view dining, heritage hotel near Terminal 1 Airport, Sanganer, Jaipur.",
    images: ["https://www.theummedhaveli.com/images/og-image.jpg"],
  },
  other: {
    "geo.region": "IN-RJ",
    "geo.placename": "Jaipur, Rajasthan",
    "geo.position": "26.8216411;75.815738",
    ICBM: "26.8216411, 75.815738",
    "theme-color": "#5C1A2A",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-512x512.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon-180x180.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#5C1A2A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <LanguageProvider>
          <ClientShell>{children}</ClientShell>
        </LanguageProvider>
        <GoogleAnalytics />
        <FacebookPixel />
      </body>
    </html>
  );
}
