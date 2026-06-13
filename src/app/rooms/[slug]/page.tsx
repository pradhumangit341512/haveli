import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { roomsDetailed } from "@/data/rooms-detailed";

interface Props { params: Promise<{ slug: string }>; }

export async function generateStaticParams() {
  return roomsDetailed.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const room = roomsDetailed.find((r) => r.slug === slug);
  if (!room) return {};
  return { title: `${room.name} | The Ummed Haveli Jaipur`, description: room.shortDescription };
}

export default async function RoomDetailPage({ params }: Props) {
  const { slug } = await params;
  const room = roomsDetailed.find((r) => r.slug === slug);
  if (!room) notFound();

  return (
    <>
      <section className="page-hero">
        <p className="sec-tag" style={{ color: "var(--gold)" }}>{room.tag}</p>
        <h1 className="sec-title" style={{ color: "white" }}>{room.name}</h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 8 }}>
          {room.size} &bull; {room.bedType} &bull; {room.view} &bull; Up to {room.maxGuests} guests
        </p>
      </section>

      <section className="room-detail-gallery-section">
        <div className="container room-detail-gallery">
          <Image src={room.images[0].src} alt={room.images[0].alt} width={900} height={600} sizes="(max-width: 1024px) 100vw, 66vw" />
          <div className="room-detail-gallery-side">
            {room.images.slice(1, 3).map((img, i) => (
              <Image key={i} src={img.src} alt={img.alt} width={450} height={300} sizes="(max-width: 1024px) 50vw, 33vw" />
            ))}
          </div>
        </div>
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
            <p style={{ fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>Starting From</p>
            <div style={{ marginBottom: 24 }}>
              <span style={{ fontFamily: "'Cinzel', serif", fontSize: 36, color: "var(--gold)" }}>&#8377;{room.price.toLocaleString("en-IN")}</span>
              <span style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}> /night</span>
            </div>
            <div style={{ background: "rgba(30,132,73,0.15)", border: "1px solid rgba(30,132,73,0.3)", padding: "10px 14px", marginBottom: 20, fontSize: 13, color: "#7DCEA0", textAlign: "center" }}>
              Book Direct & Save 15% vs OTA
            </div>
            <ul style={{ listStyle: "none", padding: 0, marginBottom: 24 }}>
              {["Complimentary breakfast", "Free airport pickup", "Free cancellation (24hr)", "Free Wi-Fi"].map((item) => (
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
