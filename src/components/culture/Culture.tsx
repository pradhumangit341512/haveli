import { cultureItems } from "@/data/culture";

export default function Culture() {
  return (
    <section className="culture-sec" id="culture" aria-labelledby="culture-title">
      <div className="container">
        <div className="sec-tag" style={{ color: "var(--gold)" }}>Rajasthani Heritage</div>
        <h2 className="sec-title" id="culture-title" style={{ color: "white" }}>
          Rajasthan Culture, <em>Festivals</em> &amp; Traditions
        </h2>
        <div className="sec-line"></div>
        <p className="sec-desc">
          Rajasthan is a living epic of colour, music, and devotion. Time your visit to Jaipur with
          these extraordinary celebrations and cultural experiences.
        </p>
        <div className="culture-grid">
          {cultureItems.map((item) => (
            <article key={item.name} className="culture-card reveal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image} alt={item.alt} width={600} height={450} loading="lazy" />
              <div className="culture-info">
                <div className="culture-tag">{item.tag}</div>
                <h3 className="culture-name">{item.name}</h3>
                <div className="culture-text">{item.description}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
