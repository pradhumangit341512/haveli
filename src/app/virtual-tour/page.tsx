import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Virtual Tour | The Ummed Haveli Jaipur",
  description: "Take a 360-degree virtual tour of The Ummed Haveli heritage hotel in Jaipur. Explore rooms, rooftop restaurant, and facilities from anywhere.",
};

export default function VirtualTourPage() {
  const tourSpots = [
    { name: "Grand Lobby", image: "https://images.unsplash.com/photo-1632558036346-500cfd0f711b?w=800&q=85", description: "Step into the hand-carved entrance of our five-story haveli" },
    { name: "Royal Deluxe Room", image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=85", description: "Experience the room with Rajasthani murals and city views" },
    { name: "Royal Premium Room", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=85", description: "Comfortable king room with contemporary styling and airport views" },
    { name: "Rooftop Restaurant", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=85", description: "Dine under the stars with panoramic Aravalli views" },
    { name: "Banquet Hall", image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&q=85", description: "Elegant space for weddings, events, and celebrations" },
    { name: "Hotel Exterior", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=85", description: "The five-story haveli facade and landscaped entrance" },
  ];

  return (
    <>
      <section style={{ background: "var(--dark)", padding: "140px 40px 80px", textAlign: "center" }}>
        <p className="sec-tag" style={{ color: "var(--gold)" }}>Immersive Experience</p>
        <h1 className="sec-title" style={{ color: "white", fontSize: "clamp(32px, 4vw, 52px)" }}>
          Virtual <em style={{ color: "var(--gold)" }}>Tour</em>
        </h1>
        <div className="sec-line" style={{ margin: "16px auto" }}></div>
        <p className="sec-desc" style={{ color: "rgba(255,255,255,0.55)", margin: "0 auto" }}>
          Explore The Ummed Haveli from anywhere in the world. Click on any area to begin your virtual walkthrough.
        </p>
      </section>

      <section style={{ background: "var(--cream)", padding: "80px 40px" }}>
        <div className="container">
          {/* Placeholder for 360 embed */}
          <div style={{
            background: "var(--charcoal)",
            height: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            marginBottom: 60,
            border: "1px solid rgba(200,164,92,0.2)",
          }}>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: 24, color: "var(--gold)", marginBottom: 8 }}>
              360&deg; Virtual Tour
            </p>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginBottom: 24 }}>
              Full immersive Matterport tour coming soon
            </p>
            <Link href="/#contact" className="btn-gold" style={{ display: "inline-block" }}>
              Schedule a Live Video Tour
            </Link>
          </div>

          {/* Tour Spots Grid */}
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 24, textAlign: "center", color: "var(--maroon-d)", marginBottom: 32 }}>
            Explore Key Areas
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
            {tourSpots.map((spot) => (
              <div key={spot.name} className="explore-card">
                <div className="explore-img">
                  <Image src={spot.image} alt={spot.name} width={500} height={300} style={{ width: "100%", height: 200, objectFit: "cover" }} />
                </div>
                <div className="explore-body">
                  <h3 className="explore-name">{spot.name}</h3>
                  <p className="explore-desc">{spot.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
