import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { offers } from "@/data/offers";

export const metadata: Metadata = {
  title: "Special Offers & Packages | The Ummed Haveli Jaipur",
  description: "Exclusive deals: Honeymoon packages, wedding group rates, corporate stays, and weekend getaways.",
  alternates: { canonical: "https://www.ummedhaveli.com/offers" },
};

export default function OffersPage() {
  return (
    <>
      <section className="page-hero">
        <p className="sec-tag" style={{ color: "var(--gold)" }}>Exclusive Deals</p>
        <h1 className="sec-title">Special Offers & <em>Packages</em></h1>
        <div className="sec-line" style={{ margin: "16px auto" }}></div>
        <p className="sec-desc">Book direct for the best rates. Our curated packages offer exceptional value with exclusive inclusions you won&apos;t find on OTAs.</p>
      </section>

      <section className="page-section">
        <div className="container">
          {offers.map((offer) => (
            <div key={offer.slug} className="offer-card">
              <div className="offer-card-img-wrap">
                <Image src={offer.image} alt={offer.imageAlt} fill sizes="(max-width: 1024px) 100vw, 45vw" className="offer-card-img" />
                {offer.badge && (
                  <span style={{ position: "absolute", top: 16, left: 16, background: "var(--maroon)", color: "var(--gold-l)", padding: "6px 16px", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>
                    {offer.badge}
                  </span>
                )}
              </div>
              <div className="offer-card-body">
                <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 24, color: "var(--maroon-d)", marginBottom: 4 }}>{offer.title}</h2>
                <p style={{ fontSize: 13, color: "var(--gold-d)", letterSpacing: 1, marginBottom: 16 }}>{offer.subtitle}</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: "var(--text-m)", lineHeight: 1.7, marginBottom: 20 }}>{offer.description}</p>

                <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
                  <span className="offer-price">{offer.price}</span>
                  {offer.originalPrice && <span className="offer-original">{offer.originalPrice}</span>}
                  {offer.discount && <span className="offer-discount">{offer.discount}</span>}
                </div>

                <div style={{ marginBottom: 20 }}>
                  <p style={{ fontSize: 12, fontWeight: 600, color: "var(--maroon-d)", letterSpacing: 1, marginBottom: 8, textTransform: "uppercase" }}>Package Includes:</p>
                  <ul className="offer-includes">
                    {offer.includes.map((item) => (
                      <li key={item}><span style={{ color: "var(--gold)", marginRight: 8 }}>&#10003;</span> {item}</li>
                    ))}
                  </ul>
                </div>

                <Link href="/#contact" className="btn-gold">Book This Package</Link>
                <p style={{ fontSize: 11, color: "var(--text-l)", marginTop: 10 }}>
                  Valid until {new Date(offer.validUntil).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
