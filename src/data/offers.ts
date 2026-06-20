export interface Offer {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  includes: string[];
  validUntil: string;
  image: string;
  imageAlt: string;
  badge?: string;
  terms: string[];
}

export const offers: Offer[] = [
  {
    slug: "honeymoon-package",
    title: "Royal Honeymoon Package",
    subtitle: "3 Nights in Royal Deluxe Room",
    description: "Begin your forever in a room fit for royalty. Our honeymoon package includes the Royal Deluxe Room with candlelit rooftop dinner, couples spa, and a surprise Rajasthani welcome ceremony.",
    price: "Rs 28,000",
    originalPrice: "Rs 36,000",
    discount: "Save 22%",
    includes: [
      "3 nights in Royal Deluxe Room",
      "Daily breakfast for two",
      "One candlelit rooftop dinner",
      "Room decorated with flowers & candles",
      "Late checkout until 2 PM",
      "Welcome fruit basket & wine",
      "Couple photoshoot at hotel ",
    ],
    validUntil: "2025-12-31",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    imageAlt: "Honeymoon suite at The Ummed Haveli Jaipur with romantic decoration",
    badge: "Most Popular",
    terms: ["Subject to availability", "Advance booking required", "Non-refundable", "Valid for couples only"],
  },
  {
    slug: "wedding-group-deal",
    title: "Wedding Group Block Booking",
    subtitle: "10+ Rooms at Special Rates",
    description: "Planning a destination wedding in Jaipur? Block 10 or more rooms and get exclusive group rates and a dedicated wedding liaison to handle all guest logistics.",
    price: "Rs 4,000/room/night",
    originalPrice: "Rs 5,000/room/night",
    discount: "20% Off",
    includes: [
      "Group rate: Rs 4,000/room/night (min 10 rooms)",
      "Dedicated wedding guest coordinator",
      "Welcome drinks for all guests on arrival",
      "Customized room assignments",
      "Group breakfast arrangement",
      "Late checkout for wedding night guests",
      
    ],
    validUntil: "2025-12-31",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&q=80",
    imageAlt: "Wedding group accommodation at The Ummed Haveli Jaipur",
    badge: "Wedding Special",
    terms: ["Minimum 10 rooms required", "Advance booking 30 days prior", "50% advance payment", "Peak season surcharge may apply (Nov-Feb)"],
  },
  {
    slug: "corporate-long-stay",
    title: "Corporate & Long Stay Package",
    subtitle: "7+ Nights Extended Stay Rate",
    description: "For business travelers visiting Sitapura EPIP, JECC Convention Centre, or Jaipur's southern business corridor. Weekly and monthly rates with all the amenities a working professional needs.",
    price: "Rs 3,500/night",
    originalPrice: "Rs 5,000/night",
    discount: "30% Off",
    includes: [
      "Royal Deluxe Room at Rs 3,500/night (7+ nights)",
      "Daily breakfast included",
      "High-speed dedicated Wi-Fi",
      "Dedicated work desk with ergonomic chair",
      "Welcome drinks for all guests on arrival",
      "Daily laundry: Paid",
      "Monthly billing available",
    ],
    validUntil: "2025-12-31",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
    imageAlt: "Corporate room with work desk at The Ummed Haveli Jaipur",
    badge: "Best Value",
    terms: ["Minimum 7 nights stay", "Valid corporate ID required", "Monthly billing on approved credit", "Subject to availability"],
  },
  {
    slug: "weekend-getaway",
    title: "Weekend Heritage Getaway",
    subtitle: "2 Nights — Fri to Sun",
    description: "Escape the city for a weekend of royal relaxation. Two nights in our heritage hotel with a curated Jaipur experience — from rooftop dining to a guided heritage walk.",
    price: "Rs 12,000",
    originalPrice: "Rs 15,000",
    discount: "Save Rs 3,000",
    includes: [
      "2 nights in Royal Deluxe Room",
      "Daily breakfast for two",
      "One rooftop dinner for two",
      "Guided heritage walk of Old Jaipur",
      "Late checkout Sunday until 3 PM",
      "Welcome drink on arrival",
    ],
    validUntil: "2025-12-31",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80",
    imageAlt: "Weekend getaway in Jaipur heritage hotel with Hawa Mahal view",
    terms: ["Valid Friday to Sunday only", "Subject to availability", "Non-refundable", "Advance booking 48 hours prior"],
  },
];
