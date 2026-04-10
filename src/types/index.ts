export interface Room {
  tag: string;
  name: string;
  price: number;
  features: string[];
  image: string;
  alt: string;
  bookLabel: string;
}

export interface Facility {
  icon: string;
  name: string;
  description: string;
}

export interface CultureItem {
  tag: string;
  name: string;
  description: string;
  image: string;
  alt: string;
}

export interface ExploreItem {
  distance: string;
  name: string;
  description: string;
  image: string;
  alt: string;
}

export interface Testimonial {
  stars: number;
  text: string;
  author: string;
  source: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BookingFormData {
  name: string;
  phone: string;
  checkin: string;
  checkout: string;
  room: string;
  guests: string;
  message: string;
}

export interface ContactInfo {
  label: string;
  value: string;
  href?: string;
  target?: string;
}

export interface NavLink {
  href: string;
  label: string;
  ariaLabel: string;
}

export interface HeroSlide {
  src: string;
  alt: string;
}
