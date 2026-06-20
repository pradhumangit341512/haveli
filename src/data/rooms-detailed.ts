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
    tag: "Deluxe",
    name: "Royal Deluxe Room",
    price: 4000,
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
      "Complimentary breakfast",
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
      { src: "/DSC07588.jpg", alt: "Royal Deluxe Room king bed with Rajasthani decor at The Ummed Haveli Jaipur" },
      { src: "/sh2.jpg", alt: "Royal Deluxe Room bathroom with Italian marble at The Ummed Haveli" },
      { src: "/DSC07525.jpg", alt: "Royal Deluxe Room window view of Jaipur city skyline" },
      { src: "/room21.jpg", alt: "Royal Deluxe Room work desk and seating area" },
    ],
    bookLabel: "Book This Room",
  },
  {
    slug: "royal-premium",
    tag: "Premium",
    name: "Royal Premium Room",
    price: 3000,
    size: "300 sq ft",
    maxGuests: 2,
    bedType: "King Size Bed",
    view: "Airport View",
    shortDescription: "Comfortable, value-rich room with airport views and contemporary Rajputana styling.",
    longDescription: "The Royal Premium Room at The Ummed Haveli offers exceptional value without compromising on comfort. Thoughtfully designed with contemporary Rajputana styling, the room features a plush king-size bed dressed in soft cotton linens, warm wooden accents, and a sparkling marble bathroom. Watch aircraft glide in over the Aravalli hills from your window, unwind in front of a 55-inch LED smart TV, and relax in a soaking Mini Bar after a day of exploring the Pink City. High-speed Wi-Fi, a premium minibar, and round-the-clock room service make it ideal for both leisure and business travelers.",
    highlights: [
      "Airport runway views over the Aravalli hills",
      "Plush king-size bed with cotton linens",
      "Marble bathroom with soaking Mini Bar",
      "Contemporary Rajputana-inspired interiors",
      "Complimentary breakfast",
    ],
    amenities: [
      "King Size Bed",
      "Airport View",
      "55\" LED Smart TV",
      "Premium Mini Bar",
      "High-Speed Wi-Fi",
      "Work Desk",
      "In-Room Safe",
      "Air Conditioning",
      "24/7 Room Service",
      "Tea/Coffee Maker",
      "Iron & Ironing Board",
    ],
    images: [
      { src: "/room2.JPG", alt: "Royal Premium Room king bed with airport view at The Ummed Haveli Jaipur" },
      { src: "/IMG_7759.jpg", alt: "Royal Premium Room marble bathroom with Mini Bar at The Ummed Haveli" },
      { src: "/IMG_7751.jpg", alt: "Royal Premium Room window view of Jaipur airport and Aravalli hills" },
      { src: "/IMG_7762.jpg", alt: "Royal Premium Room window view of Jaipur airport and Aravalli hills" },
      { src: "/IMG_7780.jpg", alt: "Royal Premium Room window view of Jaipur airport and Aravalli hills" },
      { src: "/IMG_7755.jpg", alt: "Royal Premium Room window view of Jaipur airport and Aravalli hills" },
    ],
    bookLabel: "Book This Room",
  },
];
