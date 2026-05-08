"use client";

import { useHeroSlider } from "@/hooks/useHeroSlider";
import { heroSlides } from "@/data/navigation";

export default function Hero() {
  const currentSlide = useHeroSlider(heroSlides.length);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero" aria-label="Hero banner for The Shekhawat Haveli luxury hotel">
      <div className="hero-slides">
        {heroSlides.map((slide, i) => (
          <div key={i} className={`hero-slide ${i === currentSlide ? "active" : ""}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.src}
              alt={slide.alt}
              width={1920}
              height={1080}
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>
      <div className="hero-pattern"></div>
      <div className="hero-content">
        <div className="hero-orn"></div>
        <div className="hero-badge">
          <span className="dot"></span>
          <span>Luxury Heritage Hotel</span>
          <span className="dot"></span>
          <span>Pratap Nagar, Jaipur</span>
          <span className="dot"></span>
        </div>
        <h1>
          Luxury Heritage Hotel Near <em>Jaipur Airport</em> <br />  The Shekhawat Haveli
        </h1>
        <p className="hero-desc">
          21 exquisitely crafted royal rooms with rooftop dining overlooking Jaipur Airport and the
          timeless Aravallis. Five-star heritage hospitality in Pratap Nagar, just 2 km from the
          airport.
        </p>
        <div className="hero-btns">
          <button className="btn-gold" onClick={() => scrollTo("rooms")} aria-label="Explore our luxury rooms">
            Explore Rooms
          </button>
          <button className="btn-ghost" onClick={() => scrollTo("contact")} aria-label="Reserve your stay at The Shekhawat Haveli">
            Reserve Your Stay
          </button>
        </div>
      </div>
    </section>
  );
}
