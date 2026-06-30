import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { roomsDetailed } from "@/data/rooms-detailed";
import { env } from "@/lib/env";

export const metadata: Metadata = {
  title: "Luxury Rooms & Suites | The Ummed Haveli Jaipur",
  description: "Explore our luxury rooms at The Ummed Haveli — the Royal Premium Room and Royal Deluxe Room, each with complimentary breakfast and Wi-Fi.",
  alternates: { canonical: `${env.siteUrl}/rooms` },
};

export default function RoomsPage() {
  return (
    <>
      <section className="page-hero">
        <p className="sec-tag" style={{ color: "var(--gold)" }}>Accommodations</p>
        <h1 className="sec-title">Luxury Rooms & <em>Royal Suites</em></h1>
        <div className="sec-line" style={{ margin: "16px auto" }}></div>
        <p className="sec-desc">
          Each of our 21 rooms is an individual masterpiece. Hand-painted Rajasthani murals, Jaipur block-printed textiles,
          marble-clad bathrooms, and views stretching to the Aravalli horizon.
        </p>
      </section>

      <section className="page-section">
        <div className="container">
          {roomsDetailed.map((room) => (
            <div key={room.slug} className="room-listing">
              <div className="room-listing-img-wrap">
                <Image src={room.images[0].src} alt={room.images[0].alt} fill sizes="(max-width: 1024px) 100vw, 55vw" className="room-listing-img" />
              </div>
              <div>
                <p className="sec-tag">{room.tag}</p>
                <h2 className="room-listing-name">{room.name}</h2>
                <p className="room-listing-meta">{room.size} &bull; {room.bedType} &bull; {room.view} &bull; Up to {room.maxGuests} guests</p>
                <p className="room-listing-desc">{room.shortDescription}</p>
                <div className="room-listing-amenities">
                  {room.amenities.slice(0, 6).map((a) => (
                    <span key={a} className="room-listing-amenity">{a}</span>
                  ))}
                </div>
                <div className="room-listing-cta">
                  <Link href={`/rooms/${room.slug}`} className="btn-gold">View Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
