import Script from "next/script";
import Hero from "@/components/hero/Hero";
import BookingBar from "@/components/booking/BookingBar";
import About from "@/components/about/About";
import Rooms from "@/components/rooms/Rooms";
import Facilities from "@/components/facilities/Facilities";
import Culture from "@/components/culture/Culture";
import Explore from "@/components/explore/Explore";
import Testimonials from "@/components/testimonials/Testimonials";
import FAQ from "@/components/faq/FAQ";
import Contact from "@/components/contact/Contact";
import WhatsAppWidget from "@/components/layout/WhatsAppWidget";
import PriceBadge from "@/components/conversion/PriceBadge";
import {
  hotelSchema,
  restaurantSchema,
  faqSchema,
  breadcrumbSchema,
  organizationSchema,
} from "@/lib/schema";

export default function HomePage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        id="hotel-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelSchema) }}
      />
      <Script
        id="restaurant-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <Hero />
      <BookingBar />
      <About />
      <Rooms />
      <Facilities />
      <Culture />
      <Explore />
      <Testimonials />
      <FAQ />
      <Contact />

      <WhatsAppWidget />
      <PriceBadge />
    </>
  );
}
