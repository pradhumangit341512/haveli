import { rooms } from "@/data/rooms";

export default function Rooms() {
  return (
    <section className="rooms-sec" id="rooms" aria-labelledby="rooms-title">
      <div className="container">
        <div className="sec-tag" style={{ color: "var(--gold)" }}>Accommodations</div>
        <h2 className="sec-title" id="rooms-title" style={{ color: "white" }}>
          Luxury Rooms &amp; <em style={{ color: "var(--gold)" }}>Royal Suites in Jaipur</em>
        </h2>
        <div className="sec-line"></div>
        <p className="sec-desc">
          Each of our 21 rooms is an individual masterpiece. Hand-painted Rajasthani murals, Jaipur
          block-printed textiles, marble-clad bathrooms, and views that stretch from Jaipur city
          skyline to the Aravalli horizon.
        </p>
        <div className="room-grid">
          {rooms.map((room) => (
            <article key={room.name} className="room-card reveal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={room.image} alt={room.alt} width={600} height={800} loading="lazy" />
              <div className="room-overlay">
                <div className="room-tag">{room.tag}</div>
                <h3 className="room-name">{room.name}</h3>
                <div className="room-price">
                  From <b>&#8377;{room.price.toLocaleString("en-IN")}</b> /night
                </div>
                <div className="room-feats">
                  {room.features.map((feat) => (
                    <span key={feat} className="room-feat">{feat}</span>
                  ))}
                </div>
                <a href="#contact" className="room-btn" aria-label={`Book ${room.name}`}>
                  {room.bookLabel}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
