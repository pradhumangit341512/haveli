import type { Metadata } from "next";
import Link from "next/link";
import { menu } from "@/data/menu";

export const metadata: Metadata = {
  title: "Hawai Jharokha — Rooftop Restaurant | The Ummed Haveli Jaipur",
  description:
    "Hawai Jharokha, the pure-vegetarian rooftop restaurant at The Ummed Haveli, Jaipur. Authentic Rajasthani thali, North Indian, Continental and multi-cuisine dining with panoramic Jaipur airport and Aravalli views. Open daily.",
  alternates: { canonical: "https://www.ummedhaveli.com/hawai-jharokha" },
};

const formatPrice = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export default function HawaiJharokhaPage() {
  return (
    <>
      <section className="page-hero hj-hero">
        <p className="sec-tag" style={{ color: "var(--gold)" }}>Rooftop Restaurant &bull; Pure Vegetarian</p>
        <h1 className="sec-title hj-hero-title">
          Hawai <em>Jharokha</em>
        </h1>
        <div className="sec-line" style={{ margin: "18px auto" }}></div>
        <p className="sec-desc hj-hero-desc">
          Dine beneath the open Rajasthan sky on our rooftop, where aircraft glide over the Aravalli
          hills. From slow-cooked Rajasthani classics to wood-fired pizza, every dish carries the
          pride of our kitchen.
        </p>
        <p className="hj-hindi">हर व्यंजन में राजस्थान की शान</p>
        <div className="hj-hero-meta">
          <span>100% Pure Vegetarian</span>
          <span>Multi-Cuisine</span>
          <span>Rooftop &bull; Airport View</span>
          <span>Open Daily</span>
        </div>
        <Link href="/#contact" className="btn-gold hj-reserve" aria-label="Reserve a table at Hawai Jharokha">
          Reserve a Table
        </Link>
      </section>

      <section className="page-section hj-section">
        <div className="container">
          {/* Quick category navigation */}
          <nav className="hj-quicknav" aria-label="Menu categories">
            {menu.map((cat) => (
              <a key={cat.id} href={`#${cat.id}`} className="hj-pill">{cat.name}</a>
            ))}
          </nav>

          <div className="hj-sheet">
            <span className="hj-corner hj-corner-tl" aria-hidden>&#10070;</span>
            <span className="hj-corner hj-corner-tr" aria-hidden>&#10070;</span>
            <span className="hj-corner hj-corner-bl" aria-hidden>&#10070;</span>
            <span className="hj-corner hj-corner-br" aria-hidden>&#10070;</span>

            <div className="hj-menu">
              {menu.map((cat) => (
                <section key={cat.id} id={cat.id} className="hj-cat" aria-labelledby={`${cat.id}-title`}>
                  <header className="hj-cat-head">
                    <span className="hj-cat-flourish" aria-hidden>&#10086;</span>
                    <h2 className="hj-cat-title" id={`${cat.id}-title`}>{cat.name}</h2>
                    {cat.note && <p className="hj-cat-note">{cat.note}</p>}
                  </header>
                  <ul className="hj-items">
                    {cat.items.map((item) => (
                      <li key={item.name} className="hj-item">
                        <div className="hj-item-head">
                          <span className="hj-item-name">{item.name}</span>
                          <span className="hj-item-dots" aria-hidden></span>
                          <span className="hj-item-price">{formatPrice(item.price)}</span>
                        </div>
                        {item.desc && <p className="hj-item-desc">{item.desc}</p>}
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            <p className="hj-footnote">
              &#10086;&ensp;All prices are subject to applicable government taxes. Please inform our
              associate if you are allergic to any ingredient.&ensp;&#10086;
            </p>
          </div>

          <div className="hj-cta">
            <h2 className="hj-cta-title">An Evening to Remember</h2>
            <p className="hj-cta-desc">
              Reserve your table on the rooftop and let us craft an unforgettable Rajasthani evening
              under the stars.
            </p>
            <Link href="/#contact" className="btn-gold" aria-label="Reserve a table at Hawai Jharokha">
              Reserve a Table
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
