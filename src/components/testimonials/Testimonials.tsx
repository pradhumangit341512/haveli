import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section className="testi-sec" aria-labelledby="testi-title">
      <div className="container text-center">
        <div className="sec-tag">Guest Voices</div>
        <h2 className="sec-title" id="testi-title">
          Reviews from Our <em>Guests</em>
        </h2>
        <div className="sec-line"></div>
      </div>
      <div className="container">
        <div className="testi-grid">
          {testimonials.map((t) => (
            <article key={t.author} className="testi-card reveal">
              <div className="testi-stars" aria-label={`${t.stars} out of 5 stars`}>
                {"★".repeat(t.stars)}
              </div>
              <p className="testi-text">{t.text}</p>
              <div className="testi-author">{t.author}</div>
              <div className="testi-source">{t.source}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
