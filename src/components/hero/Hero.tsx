"use client";

import { useHeroSlider } from "@/hooks/useHeroSlider";
import { heroSlides } from "@/data/navigation";

export default function Hero() {
  const currentSlide = useHeroSlider(heroSlides.length);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero" aria-label="Hero banner for The Ummed Haveli heritage hotel">
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
          <span>A Heritage Hotel</span>
          <span className="dot"></span>
          <span>At The Airport, Jaipur</span>
          <span className="dot"></span>
        </div>
        <h1>
          
          <span className="hero-h1-sub">The Ummed Haveli</span>
        </h1>
        <p className="hero-desc">
          21 exquisitely crafted royal rooms with rooftop dining overlooking Jaipur Airport and the
          timeless Aravallis. Heritage hospitality in Sanganer, near Terminal 1 Airport, Jaipur.
        </p>
        <div className="hero-btns">
          <button className="btn-gold" onClick={() => scrollTo("rooms")} aria-label="Explore our luxury rooms">
            Explore Rooms
          </button>
          <button className="btn-ghost" onClick={() => scrollTo("contact")} aria-label="Reserve your stay at The Ummed Haveli">
            Reserve Your Stay
          </button>
        </div>
      </div>
    </section>
  );
}
