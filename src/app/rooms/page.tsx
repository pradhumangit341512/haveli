import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { roomsDetailed } from "@/data/rooms-detailed";

export const metadata: Metadata = {
  title: "Luxury Rooms & Suites | The Shekhawat Haveli Jaipur",
  description: "Explore our 21 luxury rooms and suites at The Shekhawat Haveli. Royal Deluxe Rooms from Rs 5,000/night, Maharaja Heritage Suites, and Rajputana Family Suites.",
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
              <div>
                <Image src={room.images[0].src} alt={room.images[0].alt} width={700} height={500} className="room-listing-img" />
              </div>
              <div>
                <p className="sec-tag">{room.tag}</p>
                <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 28, color: "var(--maroon-d)", marginBottom: 8 }}>{room.name}</h2>
                <p className="room-listing-meta">{room.size} &bull; {room.bedType} &bull; {room.view} &bull; Up to {room.maxGuests} guests</p>
                <p className="room-listing-desc">{room.shortDescription}</p>
                <div className="room-listing-amenities">
                  {room.amenities.slice(0, 6).map((a) => (
                    <span key={a} className="room-listing-amenity">{a}</span>
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <div>
                    <span className="room-listing-price">&#8377;{room.price.toLocaleString("en-IN")}</span>
                    <span style={{ fontSize: 13, color: "var(--text-l)" }}> /night</span>
                  </div>
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
