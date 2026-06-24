export interface GalleryImage {
  src: string;
  alt: string;
  category: "rooms" | "dining" | "exterior" | "experiences" | "weddings";
  caption: string;
}

export const galleryImages: GalleryImage[] = [
  // Rooms
  { src: "/IMG_7803.jpg", alt: "Royal Deluxe Room with king bed and Rajasthani decor", category: "rooms", caption: "Royal Deluxe Room" },
  { src: "/IMG_7755.jpg", alt: "Royal Premium Room with king bed and airport view", category: "rooms", caption: "Royal Premium Room" },
  { src: "/IMG_7780.jpg", alt: "Royal Deluxe Room spacious bedroom with Rajasthani decor", category: "rooms", caption: "Royal Deluxe Room" },
  { src: "/IMG_7759.jpg", alt: "Premium room bathroom with marble finishing", category: "rooms", caption: "Marble-Clad Bathroom" },

  // Dining
  { src: "/daalbati.png", alt: "Authentic Rajasthani thali served at rooftop restaurant", category: "dining", caption: "Rajasthani Thali" },
  { src: "/IMG_7712.jpg", alt: "Rooftop restaurant dining setup with ambient lighting", category: "dining", caption: "Rooftop Dining" },
  { src: "/IMG_7708.jpg", alt: "Candlelit Dinner table on rooftop with Airport view", category: "dining", caption: "Airport View" },
  { src: "/IMG_7747.jpg", alt: "Chef preparing traditional Rajasthani dishes", category: "dining", caption: "Live Kitchen" },

  // Exterior
  { src: "/mainoutside.jpg", alt: "Heritage architecture of The Ummed Haveli exterior", category: "exterior", caption: "Haveli Facade" },
  { src: "/IMG_7858.jpg", alt: "Traditional Rajasthani archway entrance", category: "exterior", caption: "Grand Entrance" },
  { src: "/IMG_7666.jpg", alt: "Heritage building with Jaipur Pink City architecture", category: "exterior", caption: "Heritage Architecture" },
  { src: "/IMG_7663.jpg", alt: "Hotel exterior garden and landscaping", category: "exterior", caption: "Heritage View" },

  // Experiences
  { src: "/IMG_7680.jpg", alt: "Holi festival celebration with colors at hotel", category: "experiences", caption: "Holi Celebration" },
  { src: "/IMG_7681.jpg", alt: "Traditional Rajasthani Ghoomar dance performance", category: "experiences", caption: "Cultural Evening" },
  { src: "/IMG_7817.jpg", alt: "Block printing workshop experience for guests", category: "experiences", caption: "Block Printing Workshop" },
  { src: "/IMG_7665.jpg", alt: "Amber Fort sightseeing tour arranged by hotel", category: "experiences", caption: "Amber Fort Tour" },

  // // Weddings
  // { src: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&q=85", alt: "Wedding decoration at The Ummed Haveli banquet", category: "weddings", caption: "Wedding Decor" },
  // { src: "https://images.unsplash.com/photo-1610024062303-e355e94c7a8c?w=800&q=85", alt: "Wedding reception setup with traditional theme", category: "weddings", caption: "Wedding Reception" },
  // { src: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=85", alt: "Sangeet night celebration on rooftop", category: "weddings", caption: "Sangeet Night" },
  // { src: "https://images.unsplash.com/photo-1554787388-9194e4eb57a3?w=800&q=85", alt: "Mehendi ceremony decorations and setup", category: "weddings", caption: "Mehendi Ceremony" },
];

export const galleryCategories = [
  { key: "all", label: "All" },
  { key: "rooms", label: "Rooms & Suites" },
  { key: "dining", label: "Dining" },
  { key: "exterior", label: "Exterior" },
  { key: "experiences", label: "Experiences" },
  { key: "weddings", label: "Weddings" },
] as const;
