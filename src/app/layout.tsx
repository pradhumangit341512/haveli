import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/components/language/LanguageContext";
import ClientShell from "@/components/layout/ClientShell";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import FacebookPixel from "@/components/analytics/FacebookPixel";

export const metadata: Metadata = {
  title: "The Shekhawat Haveli | Luxury Heritage Hotel Near Jaipur Airport | Pratap Nagar, Jaipur",
  description:
    "The Shekhawat Haveli - Luxury heritage hotel in Pratap Nagar, just 2 km from Jaipur Airport. 21 royal rooms from Rs 5,000/night, rooftop restaurant with airport view, 5-star facilities. Book direct and save. Free airport pickup.",
  keywords:
    "luxury hotel jaipur, hotel near jaipur airport, pratap nagar hotel, heritage hotel jaipur, rooftop restaurant jaipur, wedding hotel jaipur, best hotel tonk road, shekhawat haveli jaipur, 5 star hotel jaipur, airport hotel jaipur",
  authors: [{ name: "The Shekhawat Haveli" }],
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  alternates: {
    canonical: "https://www.theshekhawathaveli.com/",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    title: "The Shekhawat Haveli | Luxury Heritage Hotel Near Jaipur Airport",
    description:
      "21 royal rooms from Rs 5,000/night. Rooftop restaurant with airport view. 5-star facilities in Pratap Nagar. Just 2 km from Jaipur Airport. Free pickup.",
    images: [
      {
        url: "https://www.theshekhawathaveli.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Shekhawat Haveli luxury heritage hotel exterior in Pratap Nagar Jaipur",
      },
    ],
    url: "https://www.theshekhawathaveli.com/",
    siteName: "The Shekhawat Haveli",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Shekhawat Haveli | Luxury Heritage Hotel, Jaipur",
    description:
      "21 luxury rooms, rooftop airport view dining, 5-star heritage hotel in Pratap Nagar. From Rs 5,000/night.",
    images: ["https://www.theshekhawathaveli.com/images/og-image.jpg"],
  },
  other: {
    "geo.region": "IN-RJ",
    "geo.placename": "Jaipur, Rajasthan",
    "geo.position": "26.82;75.79",
    ICBM: "26.82, 75.79",
    "theme-color": "#5C1A2A",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
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
