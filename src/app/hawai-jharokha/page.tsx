import type { Metadata } from "next";
import Link from "next/link";
import { env } from "@/lib/env";
import MenuGallery from "@/components/menu/MenuGallery";

export const metadata: Metadata = {
  title: "Hawai Jharokha — Rooftop Restaurant | The Ummed Haveli Jaipur",
  description:
    "Hawai Jharokha, the pure-vegetarian rooftop restaurant at The Ummed Haveli, Jaipur. Authentic Rajasthani thali, North Indian, Continental and multi-cuisine dining with panoramic Jaipur airport and Aravalli views. Open daily.",
  alternates: { canonical: `${env.siteUrl}/hawai-jharokha` },
};

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

      <section className="page-section hj-menu-section">
        <div className="container text-center">
          <p className="sec-tag">Our Menu</p>
          <h2 className="sec-title">A Taste of <em>Rajasthan</em></h2>
          <div className="sec-line"></div>
          <p className="sec-desc">
            From hearty breakfasts and wood-fired pizzas to indulgent shakes, mocktails and desserts
            — explore our full pure-vegetarian menu below. Tap any page to view it full size.
          </p>
          <MenuGallery />
        </div>
      </section>
    </>
  );
}
