import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { roomsDetailed } from "@/data/rooms-detailed";
import RoomGallery from "@/components/rooms/RoomGallery";
import { env } from "@/lib/env";

const SITE = env.siteUrl;

interface Props { params: Promise<{ slug: string }>; }

export async function generateStaticParams() {
  return roomsDetailed.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const room = roomsDetailed.find((r) => r.slug === slug);
  if (!room) return {};
  return {
    title: `${room.name} | The Ummed Haveli Jaipur`,
    description: room.shortDescription,
    alternates: { canonical: `${SITE}/rooms/${room.slug}` },
  };
}

export default async function RoomDetailPage({ params }: Props) {
  const { slug } = await params;
  const room = roomsDetailed.find((r) => r.slug === slug);
  if (!room) notFound();

  const roomSchema = {
    "@context": "https://schema.org",
    "@type": "HotelRoom",
    name: room.name,
    description: room.shortDescription,
    url: `${SITE}/rooms/${room.slug}`,
    image: room.images.map((img) =>
      img.src.startsWith("http") ? img.src : `${SITE}${img.src}`
    ),
    bed: { "@type": "BedDetails", typeOfBed: room.bedType },
    occupancy: { "@type": "QuantitativeValue", maxValue: room.maxGuests },
    amenityFeature: room.amenities.map((a) => ({
      "@type": "LocationFeatureSpecification",
      name: a,
      value: true,
    })),
    offers: {
      "@type": "Offer",
      price: room.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `${SITE}/rooms/${room.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(roomSchema) }}
      />
      <section className="page-hero">
        <p className="sec-tag" style={{ color: "var(--gold)" }}>{room.tag}</p>
        <h1 className="sec-title" style={{ color: "white" }}>{room.name}</h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 8 }}>
          {room.size} &bull; {room.bedType} &bull; {room.view} &bull; Up to {room.maxGuests} guests
        </p>
      </section>

      <section className="room-detail-gallery-section">
        <RoomGallery images={room.images} />
      </section>

      <section className="page-section">
        <div className="container room-detail-content">
          <div>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 24, color: "var(--maroon-d)", marginBottom: 16 }}>About This Room</h2>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: "var(--text-m)", lineHeight: 1.8 }}>{room.longDescription}</p>

            <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 18, color: "var(--maroon-d)", marginTop: 40, marginBottom: 16 }}>Highlights</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {room.highlights.map((h) => (
                <li key={h} style={{ padding: "8px 0", borderBottom: "1px solid var(--sand-d)", fontSize: 15, color: "var(--text-m)" }}>
                  <span style={{ color: "var(--gold)", marginRight: 8 }}>&#10003;</span> {h}
                </li>
              ))}
            </ul>

            <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 18, color: "var(--maroon-d)", marginTop: 40, marginBottom: 16 }}>All Amenities</h3>
            <div className="room-detail-amenities-grid">
              {room.amenities.map((a) => (
                <div key={a} style={{ fontSize: 14, padding: "8px 0", color: "var(--text-m)" }}>
                  <span style={{ color: "var(--gold)", marginRight: 8 }}>&#8226;</span> {a}
                </div>
              ))}
            </div>
          </div>

          <div className="room-detail-sidebar">
            <div style={{ background: "rgba(30,132,73,0.15)", border: "1px solid rgba(30,132,73,0.3)", padding: "10px 14px", marginBottom: 20, fontSize: 13, color: "#7DCEA0", textAlign: "center" }}>
              Book Direct & Save 15% vs OTA
            </div>
            <ul style={{ listStyle: "none", padding: 0, marginBottom: 24 }}>
              {["Complimentary breakfast", "Free cancellation (24hr)", "Free Wi-Fi"].map((item) => (
                <li key={item} style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", padding: "6px 0" }}>
                  <span style={{ color: "var(--gold)", marginRight: 8 }}>&#10003;</span> {item}
                </li>
              ))}
            </ul>
            <Link href="/#contact" className="btn-send" style={{ display: "block", textAlign: "center" }}>Book This Room</Link>
          </div>
        </div>
      </section>

      <div className="room-detail-back">
        <Link href="/rooms" style={{ fontSize: 13, color: "var(--gold-d)", letterSpacing: 2, textTransform: "uppercase" }}>&larr; View All Rooms</Link>
      </div>
    </>
  );
}
