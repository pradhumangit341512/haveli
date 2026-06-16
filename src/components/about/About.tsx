export default function About() {
  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="container">
        <div className="about-grid">
          <div className="about-imgs reveal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="about-img-main"
              src="./ummed.jpg"
              alt="Hawa Mahal Jaipur Pink City landmark near The Ummed Haveli hotel in Sanganer"
              width={544}
              height={420}
              loading="lazy"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="about-img-sec"
              src="./room3.jpg"
              alt="Traditional Rajasthani haveli archway architecture style used in The Ummed Haveli Jaipur"
              width={300}
              height={308}
              loading="lazy"
            />
            <div className="about-exp">
              <div className="about-exp-num">2026</div>
              <div className="about-exp-label">Grand Opening</div>
            </div>
          </div>
          <div className="reveal">
            <div className="sec-tag">Our Legacy</div>
            <h2 className="sec-title" id="about-title">
              Heritage Hotel in <em>Sanganer, Jaipur</em>
            </h2>
            <div className="sec-line"></div>
            <p className="sec-desc">
              Rising majestically in  Sanganer, The Ummed Haveli is a five-story
              architectural marvel inspired by Rajasthan&apos;s timeless haveli tradition. Every arched
              window, carved balustrade, and hand-painted detail reflects the artistry of master
              Rajasthani craftsmen.
            </p>
            <p className="sec-desc" style={{ marginTop: 16 }}>
              Located near Terminal 1 Airport in Sanganer, our 21 luxury rooms offer the
              perfect confluence of heritage aesthetics and five-star modern comfort. Our rooftop
              restaurant frames panoramic views of the airport runway against the dramatic silhouette
              of the Aravallis &mdash; making us the best heritage hotel near Jaipur airport for discerning
              travelers.
            </p>
            <div className="about-features">
              <div className="about-feat">
                <div className="about-feat-num">21</div>
                <div className="about-feat-label">Luxury Rooms</div>
              </div>
              <div className="about-feat">
                <div className="about-feat-num">5&#9733;</div>
                <div className="about-feat-label">Facilities</div>
              </div>
              <div className="about-feat">
                <div className="about-feat-num">360&deg;</div>
                <div className="about-feat-label">Rooftop View</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
