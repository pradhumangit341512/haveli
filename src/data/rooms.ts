import type { Room } from "@/types";

export const rooms: Room[] = [
  {
    tag: "Premium",
    name: "Royal Deluxe Room",
    price: 5000,
    features: ["King Bed", "City View", "40\" LED", "Mini Bar", "Rain Shower"],
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80",
    alt: "Royal Deluxe Room at The Shekhawat Haveli luxury hotel Jaipur with king bed and city view",
    bookLabel: "Book This Room",
  },
  {
    tag: "Luxury Suite",
    name: "Maharaja Heritage Suite",
    price: 8000,
    features: ["Living Area", "Airport View", "Jacuzzi", "Butler"],
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
    alt: "Maharaja Heritage Suite at The Shekhawat Haveli Jaipur with living area and airport view",
    bookLabel: "Book This Suite",
  },
  {
    tag: "Family",
    name: "Rajputana Family Suite",
    price: 10000,
    features: ["2 Bedrooms", "Terrace", "Dining Area", "Kids Zone"],
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80",
    alt: "Rajputana Family Suite at The Shekhawat Haveli Jaipur with two bedrooms and terrace",
    bookLabel: "Book This Suite",
  },
];
