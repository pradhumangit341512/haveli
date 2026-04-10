import type { WithContext, Hotel, Restaurant, FAQPage, BreadcrumbList, Organization } from "schema-dts";
import { faqItems } from "@/data/faq";

export const hotelSchema: WithContext<Hotel> = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: "The Shekhawat Haveli",
  alternateName: "Shekhawat Haveli Jaipur",
  description:
    "Luxury heritage hotel in Pratap Nagar, Jaipur. 21 royal rooms with Rajasthani haveli architecture, rooftop restaurant with Jaipur Airport panoramic views, 5-star facilities. Just 2 km from Jaipur International Airport.",
  url: "https://www.theshekhawathaveli.com",
  telephone: "+919XXXXXXXXX",
  email: "reservations@theshekhawathaveli.com",
  image: [
    "https://www.theshekhawathaveli.com/images/exterior-day.jpg",
    "https://www.theshekhawathaveli.com/images/royal-deluxe-room.jpg",
    "https://www.theshekhawathaveli.com/images/rooftop-restaurant.jpg",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Pratap Nagar, Tonk Road",
    addressLocality: "Jaipur",
    addressRegion: "Rajasthan",
    postalCode: "302033",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 26.82,
    longitude: 75.79,
  },
  priceRange: "Rs 5,000 - Rs 10,000",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, Credit Card, Debit Card, UPI, Net Banking",
  starRating: {
    "@type": "Rating",
    ratingValue: "4",
  },
  numberOfRooms: 21,
  checkinTime: "14:00",
  checkoutTime: "11:00",
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Free Wi-Fi", value: true },
    { "@type": "LocationFeatureSpecification", name: "Free Parking", value: true },
    { "@type": "LocationFeatureSpecification", name: "Airport Shuttle", value: true },
    { "@type": "LocationFeatureSpecification", name: "Rooftop Restaurant", value: true },
    { "@type": "LocationFeatureSpecification", name: "Room Service 24/7", value: true },
    { "@type": "LocationFeatureSpecification", name: "Air Conditioning", value: true },
    { "@type": "LocationFeatureSpecification", name: "Banquet Hall", value: true },
    { "@type": "LocationFeatureSpecification", name: "Travel Desk", value: true },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "52",
    bestRating: "5",
    worstRating: "1",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
};

export const restaurantSchema: WithContext<Restaurant> = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "The Shekhawat Haveli Rooftop Restaurant",
  description:
    "Rooftop multi-cuisine restaurant with panoramic Jaipur Airport and Aravalli views. Authentic Rajasthani thali, North Indian, and Continental cuisine.",
  servesCuisine: ["Rajasthani", "North Indian", "Continental", "Multi-Cuisine"],
  url: "https://www.theshekhawathaveli.com/#facilities",
  telephone: "+919XXXXXXXXX",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Pratap Nagar, Tonk Road",
    addressLocality: "Jaipur",
    addressRegion: "Rajasthan",
    postalCode: "302033",
    addressCountry: "IN",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "07:00",
      closes: "23:00",
    },
  ],
  acceptsReservations: true,
  priceRange: "Rs 500 - Rs 2,000",
};

export const faqSchema: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question" as const,
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer" as const,
      text: item.answer,
    },
  })),
};

export const breadcrumbSchema: WithContext<BreadcrumbList> = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.theshekhawathaveli.com/" },
    { "@type": "ListItem", position: 2, name: "Rooms & Suites", item: "https://www.theshekhawathaveli.com/#rooms" },
    { "@type": "ListItem", position: 3, name: "Facilities", item: "https://www.theshekhawathaveli.com/#facilities" },
    { "@type": "ListItem", position: 4, name: "Heritage & Culture", item: "https://www.theshekhawathaveli.com/#culture" },
    { "@type": "ListItem", position: 5, name: "Explore Jaipur", item: "https://www.theshekhawathaveli.com/#explore" },
    { "@type": "ListItem", position: 6, name: "Contact & Booking", item: "https://www.theshekhawathaveli.com/#contact" },
  ],
};

export const organizationSchema: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "The Shekhawat Haveli",
  url: "https://www.theshekhawathaveli.com",
  logo: "https://www.theshekhawathaveli.com/images/logo.png",
  sameAs: [
    "https://www.instagram.com/theshekhawathaveli/",
    "https://www.facebook.com/theshekhawathaveli/",
    "https://www.youtube.com/@theshekhawathaveli",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+919XXXXXXXXX",
    contactType: "reservations",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
};
