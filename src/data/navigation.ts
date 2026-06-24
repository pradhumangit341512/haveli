import type { NavLink, HeroSlide } from "@/types";

export const navLinks: NavLink[] = [
  { href: "#about", label: "About", ariaLabel: "About The Ummed Haveli" },
  { href: "/rooms", label: "Rooms", ariaLabel: "View Rooms and Suites" },
  { href: "/hawai-jharokha", label: "Hawai-Jharokha", ariaLabel: "Hawai Jharokha rooftop restaurant menu" },
  { href: "/offers", label: "Offers", ariaLabel: "Special Offers and Packages" },
  { href: "/gallery", label: "Gallery", ariaLabel: "Photo Gallery" },
  { href: "/blog", label: "Blog", ariaLabel: "Travel Blog and Guides" },
  { href: "#faq", label: "FAQ", ariaLabel: "Frequently Asked Questions" },
  { href: "#contact", label: "Contact", ariaLabel: "Contact and Book" },
];

export const heroSlides: HeroSlide[] = [
  {
    src: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1920&q=80",
    alt: "Hawa Mahal Palace of Winds in Jaipur Rajasthan near The Ummed Haveli hotel",
  },
  {
    src: "https://images.unsplash.com/photo-1695395550316-8995ae9d35ff?q=80&w=2056&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Heritage architecture in Rajasthan India near luxury hotels in Jaipur",
  },
  {
    src: "https://plus.unsplash.com/premium_photo-1661930618375-aafabc2bf3e7?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Amber Fort Jaipur popular tourist attraction near Krishi Nagar, Sanganer hotels",
  },
];
