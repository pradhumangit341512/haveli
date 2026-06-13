export interface RoomDetailed {
  slug: string;
  tag: string;
  name: string;
  price: number;
  size: string;
  maxGuests: number;
  bedType: string;
  view: string;
  shortDescription: string;
  longDescription: string;
  highlights: string[];
  amenities: string[];
  images: { src: string; alt: string }[];
  bookLabel: string;
}

export const roomsDetailed: RoomDetailed[] = [
  {
    slug: "royal-deluxe",
    tag: "Premium",
    name: "Royal Deluxe Room",
    price: 5000,
    size: "320 sq ft",
    maxGuests: 2,
    bedType: "King Size Bed",
    view: "City View",
    shortDescription: "Elegantly appointed room with hand-painted Rajasthani murals and modern comfort.",
    longDescription: "The Royal Deluxe Room at The Ummed Haveli is a sanctuary of Rajasthani artistry and modern luxury. Each room features hand-painted murals by local master artisans, Jaipur block-printed textiles, and a marble-clad bathroom with rainfall shower. Wake up to panoramic views of Jaipur's skyline from your private window, and enjoy your morning chai on the cushioned window seat — a traditional jharokha reimagined for contemporary comfort. The room is equipped with a 40-inch LED smart TV, high-speed Wi-Fi, a well-stocked minibar, and a dedicated work desk for business travelers.",
    highlights: [
      "Hand-painted Rajasthani wall murals",
      "Jaipur block-printed bed linens",
      "Italian marble bathroom",
      "Jharokha-style cushioned window seat",
      "Complimentary breakfast & airport transfer",
    ],
    amenities: [
      "King Size Bed",
      "City View",
      "40\" LED Smart TV",
      "Mini Bar",
      "Rain Shower",
      "High-Speed Wi-Fi",
      "Work Desk",
      "In-Room Safe",
      "Air Conditioning",
      "24/7 Room Service",
      "Tea/Coffee Maker",
      "Iron & Ironing Board",
    ],
    images: [
      { src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=900&q=85", alt: "Royal Deluxe Room king bed with Rajasthani decor at The Ummed Haveli Jaipur" },
      { src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900&q=85", alt: "Royal Deluxe Room bathroom with Italian marble at The Ummed Haveli" },
      { src: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=900&q=85", alt: "Royal Deluxe Room window view of Jaipur city skyline" },
      { src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=85", alt: "Royal Deluxe Room work desk and seating area" },
    ],
    bookLabel: "Book This Room",
  },
  {
    slug: "maharaja-suite",
    tag: "Luxury Suite",
    name: "Maharaja Heritage Suite",
    price: 8000,
    size: "520 sq ft",
    maxGuests: 3,
    bedType: "King Size Bed + Daybed",
    view: "Airport & Aravalli View",
    shortDescription: "Spacious suite with living area, jacuzzi, and panoramic airport views.",
    longDescription: "The Maharaja Heritage Suite is our signature accommodation, designed for guests who demand the finest. Spread across 520 sq ft, this suite features a separate living area with a hand-carved diwan, a bedroom with a king-size four-poster bed draped in Rajasthani textiles, and a luxurious bathroom with a private jacuzzi overlooking the Aravalli hills. The suite's private balcony offers unobstructed views of Jaipur International Airport — watch aircraft land against the sunset from the comfort of your own space. A dedicated butler ensures every need is anticipated before you even ask.",
    highlights: [
      "Private jacuzzi with Aravalli view",
      "Separate living area with hand-carved diwan",
      "Four-poster king bed with canopy",
      "Dedicated personal butler",
      "Private balcony with airport runway view",
    ],
    amenities: [
      "King Size Four-Poster Bed",
      "Airport & Aravalli View",
      "Private Jacuzzi",
      "Living Area",
      "Private Balcony",
      "Dedicated Butler",
      "55\" LED Smart TV",
      "Premium Mini Bar",
      "Bose Bluetooth Speaker",
      "Nespresso Coffee Machine",
      "Bathrobes & Slippers",
      "Pillow Menu",
      "High-Speed Wi-Fi",
      "In-Room Safe",
      "24/7 Room Service",
    ],
    images: [
      { src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=85", alt: "Maharaja Heritage Suite bedroom with four-poster bed at The Ummed Haveli Jaipur" },
      { src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900&q=85", alt: "Maharaja Suite jacuzzi bathroom with Aravalli views" },
      { src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=900&q=85", alt: "Maharaja Suite living area with hand-carved diwan" },
      { src: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=900&q=85", alt: "Maharaja Suite private balcony airport view" },
    ],
    bookLabel: "Book This Suite",
  },
  {
    slug: "rajputana-family-suite",
    tag: "Family",
    name: "Rajputana Family Suite",
    price: 10000,
    size: "750 sq ft",
    maxGuests: 5,
    bedType: "1 King + 2 Twin Beds",
    view: "Terrace Garden View",
    shortDescription: "Two-bedroom suite with private terrace, perfect for families.",
    longDescription: "The Rajputana Family Suite is thoughtfully designed for families and groups who want space without sacrificing luxury. This 750 sq ft two-bedroom suite features a master bedroom with a king-size bed, a children's room with twin beds and a dedicated play corner, a private dining area, and a spacious terrace garden where the family can enjoy meals together under the Rajasthan sky. The suite is decorated in a warm Rajputana palette with miniature paintings, brass accents, and hand-woven dhurrie rugs. Children receive a welcome kit with traditional Rajasthani toys and treats.",
    highlights: [
      "Two separate bedrooms (1 King + 2 Twins)",
      "Private terrace garden with dining",
      "Children's play corner with Rajasthani toys",
      "Family dining area within suite",
      "Kids' welcome kit with local treats",
    ],
    amenities: [
      "1 King Bed + 2 Twin Beds",
      "Terrace Garden",
      "Private Dining Area",
      "Kids Play Zone",
      "2 Bathrooms",
      "55\" + 40\" LED Smart TVs",
      "Mini Bar",
      "Washing Machine",
      "Microwave",
      "Baby Cot (on request)",
      "High-Speed Wi-Fi",
      "In-Room Safe",
      "24/7 Room Service",
      "Extra Towels & Linens",
    ],
    images: [
      { src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900&q=85", alt: "Rajputana Family Suite master bedroom at The Ummed Haveli Jaipur" },
      { src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=900&q=85", alt: "Rajputana Suite children's room with twin beds" },
      { src: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=900&q=85", alt: "Rajputana Suite private terrace garden" },
      { src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=85", alt: "Rajputana Suite family dining area" },
    ],
    bookLabel: "Book This Suite",
  },
];
