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

        <div className="rooms-video reveal">
          <div className="rooms-video-media">
            <video
              className="rooms-video-el"
              src="/airport-takeoff.mp4"
              poster="/airport-takeoff-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="An aircraft taking off, seen from The Ummed Haveli near Jaipur Airport"
            />
            <span className="rooms-video-badge"><span className="dot" /> Live from our rooftop</span>
          </div>
          <div className="rooms-video-copy">
            <div className="sec-tag" style={{ color: "var(--gold)" }}>At The Airport</div>
            <h3 className="rooms-video-title">
              Watch the World <em>Take Off</em>
            </h3>
            <div className="sec-line"></div>
            <p className="sec-desc">
              From our rooftop restaurant and Airport-View rooms, watch aircraft soar over the
              Aravalli hills — a front-row seat to Jaipur&apos;s skies that no other heritage hotel
              can offer. Just 2 km and five minutes from Terminal 1.
            </p>
            <a href="#contact" className="btn-gold rooms-video-cta" aria-label="Book an Airport-View room">
              Book an Airport-View Room
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
