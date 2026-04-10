export type Locale = "en" | "hi";

export interface Translations {
  nav: {
    about: string;
    rooms: string;
    facilities: string;
    heritage: string;
    explore: string;
    faq: string;
    contact: string;
    bookNow: string;
    offers: string;
    gallery: string;
    blog: string;
  };
  hero: {
    badge1: string;
    badge2: string;
    title: string;
    titleEm: string;
    description: string;
    exploreRooms: string;
    reserveStay: string;
  };
  booking: {
    checkIn: string;
    checkOut: string;
    guests: string;
    roomType: string;
    checkAvailability: string;
  };
  about: {
    tag: string;
    title: string;
    titleEm: string;
    description1: string;
    description2: string;
    luxuryRooms: string;
    facilities: string;
    rooftopView: string;
    grandOpening: string;
  };
  rooms: {
    tag: string;
    title: string;
    titleEm: string;
    description: string;
    perNight: string;
    from: string;
  };
  contact: {
    tag: string;
    title: string;
    titleEm: string;
    description: string;
    fullName: string;
    phone: string;
    specialRequests: string;
    sendBooking: string;
    successMessage: string;
  };
  footer: {
    tagline: string;
    quickLinks: string;
    services: string;
    contact: string;
    rights: string;
  };
  common: {
    bookDirect: string;
    save15: string;
    viewDetails: string;
    readMore: string;
    backToHome: string;
    viewAllRooms: string;
    fromPrice: string;
  };
}

export const translations: Record<Locale, Translations> = {
  en: {
    nav: {
      about: "About",
      rooms: "Rooms",
      facilities: "Facilities",
      heritage: "Heritage",
      explore: "Explore",
      faq: "FAQ",
      contact: "Contact",
      bookNow: "Book Now",
      offers: "Offers",
      gallery: "Gallery",
      blog: "Blog",
    },
    hero: {
      badge1: "Luxury Heritage Hotel",
      badge2: "Pratap Nagar, Jaipur",
      title: "Luxury Heritage Hotel Near",
      titleEm: "Jaipur Airport",
      description: "21 exquisitely crafted royal rooms with rooftop dining overlooking Jaipur Airport and the timeless Aravallis. Five-star heritage hospitality in Pratap Nagar, just 2 km from the airport.",
      exploreRooms: "Explore Rooms",
      reserveStay: "Reserve Your Stay",
    },
    booking: {
      checkIn: "Check In",
      checkOut: "Check Out",
      guests: "Guests",
      roomType: "Room Type",
      checkAvailability: "Check Availability",
    },
    about: {
      tag: "Our Legacy",
      title: "Heritage Hotel in",
      titleEm: "Pratap Nagar, Jaipur",
      description1: "Rising majestically in Pratap Nagar on Tonk Road, The Shekhawat Haveli is a five-story architectural marvel inspired by Rajasthan's timeless haveli tradition.",
      description2: "Just 2 kilometres from Jaipur International Airport, our 21 luxury rooms offer the perfect confluence of heritage aesthetics and five-star modern comfort.",
      luxuryRooms: "Luxury Rooms",
      facilities: "Facilities",
      rooftopView: "Rooftop View",
      grandOpening: "Grand Opening",
    },
    rooms: {
      tag: "Accommodations",
      title: "Luxury Rooms &",
      titleEm: "Royal Suites in Jaipur",
      description: "Each of our 21 rooms is an individual masterpiece.",
      perNight: "/night",
      from: "From",
    },
    contact: {
      tag: "Get in Touch",
      title: "Book Your Stay at",
      titleEm: "The Shekhawat Haveli Jaipur",
      description: "Let us create an unforgettable heritage experience for you. Fill the form or contact us directly — we respond within minutes.",
      fullName: "Full Name",
      phone: "Phone Number",
      specialRequests: "Special Requests",
      sendBooking: "Send Booking Request",
      successMessage: "Your booking request has been sent. Our team will call you within 30 minutes. Padharo Mhare Desh!",
    },
    footer: {
      tagline: "Luxury Heritage Hotel & Resort",
      quickLinks: "Quick Links",
      services: "Services",
      contact: "Contact",
      rights: "All Rights Reserved.",
    },
    common: {
      bookDirect: "Book Direct & Save 15%",
      save15: "Save 15% vs OTA",
      viewDetails: "View Details",
      readMore: "Read More",
      backToHome: "Back to Home",
      viewAllRooms: "View All Rooms",
      fromPrice: "From",
    },
  },
  hi: {
    nav: {
      about: "\u092A\u0930\u093F\u091A\u092F",
      rooms: "\u0915\u092E\u0930\u0947",
      facilities: "\u0938\u0941\u0935\u093F\u0927\u093E\u090F\u0902",
      heritage: "\u0935\u093F\u0930\u093E\u0938\u0924",
      explore: "\u0916\u094B\u091C\u0947\u0902",
      faq: "\u0938\u0935\u093E\u0932",
      contact: "\u0938\u0902\u092A\u0930\u094D\u0915",
      bookNow: "\u0905\u092D\u0940 \u092C\u0941\u0915 \u0915\u0930\u0947\u0902",
      offers: "\u0911\u092B\u0930\u094D\u0938",
      gallery: "\u0917\u0948\u0932\u0930\u0940",
      blog: "\u092C\u094D\u0932\u0949\u0917",
    },
    hero: {
      badge1: "\u0932\u0915\u094D\u091C\u0930\u0940 \u0939\u0947\u0930\u093F\u091F\u0947\u091C \u0939\u094B\u091F\u0932",
      badge2: "\u092A\u094D\u0930\u0924\u093E\u092A \u0928\u0917\u0930, \u091C\u092F\u092A\u0941\u0930",
      title: "\u091C\u092F\u092A\u0941\u0930 \u090F\u092F\u0930\u092A\u094B\u0930\u094D\u091F \u0915\u0947 \u092A\u093E\u0938 \u0932\u0915\u094D\u091C\u0930\u0940 \u0939\u0947\u0930\u093F\u091F\u0947\u091C \u0939\u094B\u091F\u0932",
      titleEm: "\u0926 \u0909\u092E\u094D\u092E\u0947\u0926 \u0939\u0935\u0947\u0932\u0940",
      description: "\u091C\u092F\u092A\u0941\u0930 \u090F\u092F\u0930\u092A\u094B\u0930\u094D\u091F \u0914\u0930 \u0905\u0930\u093E\u0935\u0932\u0940 \u0915\u0947 \u0926\u0943\u0936\u094D\u092F \u0935\u093E\u0932\u0947 \u0930\u0942\u092B\u091F\u0949\u092A \u0921\u093E\u0907\u0928\u093F\u0902\u0917 \u0915\u0947 \u0938\u093E\u0925 21 \u0936\u093E\u0939\u0940 \u0915\u092E\u0930\u0947\u0964 \u092A\u094D\u0930\u0924\u093E\u092A \u0928\u0917\u0930 \u092E\u0947\u0902 \u092A\u093E\u0902\u091A \u0938\u093F\u0924\u093E\u0930\u093E \u0939\u0947\u0930\u093F\u091F\u0947\u091C \u0906\u0924\u093F\u0925\u094D\u092F\u0964",
      exploreRooms: "\u0915\u092E\u0930\u0947 \u0926\u0947\u0916\u0947\u0902",
      reserveStay: "\u0905\u092A\u0928\u093E \u0920\u0939\u0930\u093E\u0935 \u092C\u0941\u0915 \u0915\u0930\u0947\u0902",
    },
    booking: {
      checkIn: "\u091A\u0947\u0915 \u0907\u0928",
      checkOut: "\u091A\u0947\u0915 \u0906\u0909\u091F",
      guests: "\u092E\u0947\u0939\u092E\u093E\u0928",
      roomType: "\u0915\u092E\u0930\u0947 \u0915\u093E \u092A\u094D\u0930\u0915\u093E\u0930",
      checkAvailability: "\u0909\u092A\u0932\u092C\u094D\u0927\u0924\u093E \u091C\u093E\u0902\u091A\u0947\u0902",
    },
    about: {
      tag: "\u0939\u092E\u093E\u0930\u0940 \u0935\u093F\u0930\u093E\u0938\u0924",
      title: "\u0939\u0947\u0930\u093F\u091F\u0947\u091C \u0939\u094B\u091F\u0932",
      titleEm: "\u092A\u094D\u0930\u0924\u093E\u092A \u0928\u0917\u0930, \u091C\u092F\u092A\u0941\u0930",
      description1: "\u091F\u094B\u0902\u0915 \u0930\u094B\u0921 \u092A\u0930 \u092A\u094D\u0930\u0924\u093E\u092A \u0928\u0917\u0930 \u092E\u0947\u0902 \u0936\u093E\u0928 \u0938\u0947 \u0916\u0921\u093C\u093E, \u0926 \u0909\u092E\u094D\u092E\u0947\u0926 \u0939\u0935\u0947\u0932\u0940 \u0930\u093E\u091C\u0938\u094D\u0925\u093E\u0928 \u0915\u0940 \u0936\u093E\u0936\u094D\u0935\u0924 \u0939\u0935\u0947\u0932\u0940 \u092A\u0930\u0902\u092A\u0930\u093E \u0938\u0947 \u092A\u094D\u0930\u0947\u0930\u093F\u0924 \u092A\u093E\u0902\u091A \u092E\u0902\u091C\u093F\u0932\u093E \u0935\u093E\u0938\u094D\u0924\u0941\u0915\u0932\u093E \u0915\u093E \u091A\u092E\u0924\u094D\u0915\u093E\u0930 \u0939\u0948\u0964",
      description2: "\u091C\u092F\u092A\u0941\u0930 \u0905\u0902\u0924\u0930\u094D\u0930\u093E\u0937\u094D\u091F\u094D\u0930\u0940\u092F \u0939\u0935\u093E\u0908 \u0905\u0921\u094D\u0921\u0947 \u0938\u0947 \u092E\u093E\u0924\u094D\u0930 2 \u0915\u093F\u0932\u094B\u092E\u0940\u091F\u0930 \u0926\u0942\u0930, \u0939\u092E\u093E\u0930\u0947 21 \u0932\u0915\u094D\u091C\u0930\u0940 \u0915\u092E\u0930\u0947 \u0935\u093F\u0930\u093E\u0938\u0924 \u0938\u094C\u0902\u0926\u0930\u094D\u092F \u0914\u0930 \u092A\u093E\u0902\u091A \u0938\u093F\u0924\u093E\u0930\u093E \u0906\u0927\u0941\u0928\u093F\u0915 \u0906\u0930\u093E\u092E \u0915\u093E \u0938\u0902\u0917\u092E \u092A\u094D\u0930\u0926\u093E\u0928 \u0915\u0930\u0924\u0947 \u0939\u0948\u0902\u0964",
      luxuryRooms: "\u0932\u0915\u094D\u091C\u0930\u0940 \u0915\u092E\u0930\u0947",
      facilities: "\u0938\u0941\u0935\u093F\u0927\u093E\u090F\u0902",
      rooftopView: "\u0930\u0942\u092B\u091F\u0949\u092A \u0926\u0943\u0936\u094D\u092F",
      grandOpening: "\u0917\u094D\u0930\u0948\u0902\u0921 \u0913\u092A\u0928\u093F\u0902\u0917",
    },
    rooms: {
      tag: "\u0906\u0935\u093E\u0938",
      title: "\u0932\u0915\u094D\u091C\u0930\u0940 \u0915\u092E\u0930\u0947 \u0914\u0930",
      titleEm: "\u091C\u092F\u092A\u0941\u0930 \u092E\u0947\u0902 \u0936\u093E\u0939\u0940 \u0938\u094D\u0935\u0940\u091F\u094D\u0938",
      description: "\u0939\u092E\u093E\u0930\u0947 21 \u0915\u092E\u0930\u094B\u0902 \u092E\u0947\u0902 \u0938\u0947 \u092A\u094D\u0930\u0924\u094D\u092F\u0947\u0915 \u090F\u0915 \u0905\u0928\u0942\u0920\u0940 \u0915\u0943\u0924\u093F \u0939\u0948\u0964",
      perNight: "/\u0930\u093E\u0924",
      from: "\u0936\u0941\u0930\u0942",
    },
    contact: {
      tag: "\u0938\u0902\u092A\u0930\u094D\u0915 \u0915\u0930\u0947\u0902",
      title: "\u0905\u092A\u0928\u093E \u0920\u0939\u0930\u093E\u0935 \u092C\u0941\u0915 \u0915\u0930\u0947\u0902",
      titleEm: "\u0926 \u0909\u092E\u094D\u092E\u0947\u0926 \u0939\u0935\u0947\u0932\u0940 \u091C\u092F\u092A\u0941\u0930",
      description: "\u0939\u092E \u0906\u092A\u0915\u0947 \u0932\u093F\u090F \u090F\u0915 \u0905\u0935\u093F\u0938\u094D\u092E\u0930\u0923\u0940\u092F \u0935\u093F\u0930\u093E\u0938\u0924 \u0905\u0928\u0941\u092D\u0935 \u092C\u0928\u093E\u090F\u0902\u0964 \u092B\u0949\u0930\u094D\u092E \u092D\u0930\u0947\u0902 \u092F\u093E \u0938\u0940\u0927\u0947 \u0938\u0902\u092A\u0930\u094D\u0915 \u0915\u0930\u0947\u0902\u0964",
      fullName: "\u092A\u0942\u0930\u093E \u0928\u093E\u092E",
      phone: "\u092B\u094B\u0928 \u0928\u0902\u092C\u0930",
      specialRequests: "\u0935\u093F\u0936\u0947\u0937 \u0905\u0928\u0941\u0930\u094B\u0927",
      sendBooking: "\u092C\u0941\u0915\u093F\u0902\u0917 \u0905\u0928\u0941\u0930\u094B\u0927 \u092D\u0947\u091C\u0947\u0902",
      successMessage: "\u0906\u092A\u0915\u093E \u092C\u0941\u0915\u093F\u0902\u0917 \u0905\u0928\u0941\u0930\u094B\u0927 \u092D\u0947\u091C \u0926\u093F\u092F\u093E \u0917\u092F\u093E \u0939\u0948\u0964 \u0939\u092E\u093E\u0930\u0940 \u091F\u0940\u092E 30 \u092E\u093F\u0928\u091F \u092E\u0947\u0902 \u0906\u092A\u0915\u094B \u0915\u0949\u0932 \u0915\u0930\u0947\u0917\u0940\u0964 \u092A\u0927\u093E\u0930\u094B \u092E\u094D\u0939\u093E\u0930\u0947 \u0926\u0947\u0936!",
    },
    footer: {
      tagline: "\u0932\u0915\u094D\u091C\u0930\u0940 \u0939\u0947\u0930\u093F\u091F\u0947\u091C \u0939\u094B\u091F\u0932 \u0914\u0930 \u0930\u093F\u0938\u0949\u0930\u094D\u091F",
      quickLinks: "\u0924\u094D\u0935\u0930\u093F\u0924 \u0932\u093F\u0902\u0915\u094D\u0938",
      services: "\u0938\u0947\u0935\u093E\u090F\u0902",
      contact: "\u0938\u0902\u092A\u0930\u094D\u0915",
      rights: "\u0938\u0930\u094D\u0935\u093E\u0927\u093F\u0915\u093E\u0930 \u0938\u0941\u0930\u0915\u094D\u0937\u093F\u0924\u0964",
    },
    common: {
      bookDirect: "\u0938\u0940\u0927\u0947 \u092C\u0941\u0915 \u0915\u0930\u0947\u0902 \u0914\u0930 15% \u092C\u091A\u093E\u090F\u0902",
      save15: "OTA \u0938\u0947 15% \u0915\u092E",
      viewDetails: "\u0935\u093F\u0935\u0930\u0923 \u0926\u0947\u0916\u0947\u0902",
      readMore: "\u0914\u0930 \u092A\u0922\u093C\u0947\u0902",
      backToHome: "\u0939\u094B\u092E \u092A\u0930 \u0935\u093E\u092A\u0938 \u091C\u093E\u090F\u0902",
      viewAllRooms: "\u0938\u092D\u0940 \u0915\u092E\u0930\u0947 \u0926\u0947\u0916\u0947\u0902",
      fromPrice: "\u0936\u0941\u0930\u0942",
    },
  },
};
