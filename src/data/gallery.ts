export interface GalleryImage {
  src: string;
  alt: string;
  category: "rooms" | "dining" | "exterior" | "experiences" | "weddings";
  caption: string;
}

export const galleryImages: GalleryImage[] = [
  // Rooms
  { src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=85", alt: "Royal Deluxe Room with king bed and Rajasthani decor", category: "rooms", caption: "Royal Deluxe Room" },
  { src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=85", alt: "Maharaja Heritage Suite living area with luxury furnishings", category: "rooms", caption: "Maharaja Heritage Suite" },
  { src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=85", alt: "Rajputana Family Suite spacious bedroom", category: "rooms", caption: "Rajputana Family Suite" },
  { src: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=85", alt: "Premium room bathroom with marble finishing", category: "rooms", caption: "Marble-Clad Bathroom" },

  // Dining
  { src: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=800&q=85", alt: "Authentic Rajasthani thali served at rooftop restaurant", category: "dining", caption: "Rajasthani Thali" },
  { src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=85", alt: "Rooftop restaurant dining setup with ambient lighting", category: "dining", caption: "Rooftop Dining" },
  { src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=85", alt: "Candlelit dinner table on rooftop with city view", category: "dining", caption: "Candlelit Dinner" },
  { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=85", alt: "Chef preparing traditional Rajasthani dishes", category: "dining", caption: "Live Kitchen" },

  // Exterior
  { src: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=85", alt: "Heritage architecture of The Ummed Haveli exterior", category: "exterior", caption: "Haveli Facade" },
  { src: "https://images.unsplash.com/photo-1632558036346-500cfd0f711b?w=800&q=85", alt: "Traditional Rajasthani archway entrance", category: "exterior", caption: "Grand Entrance" },
  { src: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=85", alt: "Heritage building with Jaipur Pink City architecture", category: "exterior", caption: "Heritage Architecture" },
  { src: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&q=85", alt: "Hotel exterior garden and landscaping", category: "exterior", caption: "Landscaped Gardens" },

  // Experiences
  { src: "https://images.unsplash.com/photo-1616787716164-1ddf249132f8?w=800&q=85", alt: "Holi festival celebration with colors at hotel", category: "experiences", caption: "Holi Celebration" },
  { src: "https://images.unsplash.com/photo-1568292342316-60aa3d36f4b3?w=800&q=85", alt: "Traditional Rajasthani Ghoomar dance performance", category: "experiences", caption: "Cultural Evening" },
  { src: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=85", alt: "Block printing workshop experience for guests", category: "experiences", caption: "Block Printing Workshop" },
  { src: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=800&q=85", alt: "Amber Fort sightseeing tour arranged by hotel", category: "experiences", caption: "Amber Fort Tour" },

  // Weddings
  { src: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&q=85", alt: "Wedding decoration at The Ummed Haveli banquet", category: "weddings", caption: "Wedding Decor" },
  { src: "https://images.unsplash.com/photo-1610024062303-e355e94c7a8c?w=800&q=85", alt: "Wedding reception setup with traditional theme", category: "weddings", caption: "Wedding Reception" },
  { src: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=85", alt: "Sangeet night celebration on rooftop", category: "weddings", caption: "Sangeet Night" },
  { src: "https://images.unsplash.com/photo-1554787388-9194e4eb57a3?w=800&q=85", alt: "Mehendi ceremony decorations and setup", category: "weddings", caption: "Mehendi Ceremony" },
];

export const galleryCategories = [
  { key: "all", label: "All" },
  { key: "rooms", label: "Rooms & Suites" },
  { key: "dining", label: "Dining" },
  { key: "exterior", label: "Exterior" },
  { key: "experiences", label: "Experiences" },
  { key: "weddings", label: "Weddings" },
] as const;
