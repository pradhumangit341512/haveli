import { exploreItems } from "@/data/explore";

export default function Explore() {
  return (
    <section className="explore-sec" id="explore" aria-labelledby="explore-title">
      <div className="container text-center">
        <div className="sec-tag">Iconic Jaipur</div>
        <h2 className="sec-title" id="explore-title">
          Tourist Destinations <em>Near The Ummed Haveli</em>
        </h2>
        <div className="sec-line"></div>
        <p className="sec-desc">
          Jaipur&apos;s greatest heritage attractions are all within easy reach from our Krishi Nagar, Sanganer
          location on Budh Singhpura
        </p>
      </div>
      <div className="container">
        <div className="explore-grid">
          {exploreItems.map((item) => (
            <article key={item.name} className="explore-card reveal">
              <div className="explore-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
  src={item.image} 
  alt={item.alt} 
  width={500} 
  height={500} 
  loading="lazy"
  style={{ width: "100%", height: "100%", objectFit: "cover" }}
/> 
              </div>
              <div className="explore-body">
                <div className="explore-dist">{item.distance}</div>
                <h3 className="explore-name">{item.name}</h3>
                <p className="explore-desc">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
