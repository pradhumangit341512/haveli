import type { Room } from "@/types";

export const rooms: Room[] = [
  {
    tag: "Deluxe",
    name: "Royal Deluxe Room",
    price: 4000,
    features: ["King Bed", "City View", "40\" LED", "Mini Bar", "Rain Shower"],
    image: "/room3.JPG",
    alt: "Royal Deluxe Room at The Ummed Haveli luxury hotel Jaipur with king bed and city view",
    bookLabel: "Book This Room",
  },
  {
    tag: "Premium",
    name: "Royal Premium Room",
    price: 3000,
    features: ["King Bed", "Airport View", "55\" LED", "Premium Mini Bar", "Bathtub"],
    image: "/room2.JPG",
    alt: "Royal Premium Room at The Ummed Haveli Jaipur with king bed and airport view",
    bookLabel: "Book This Room",
  },
];
