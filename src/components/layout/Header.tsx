"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScrollHeader } from "@/hooks/useScrollHeader";
import { navLinks } from "@/data/navigation";
import LanguageSwitcher from "@/components/language/LanguageSwitcher";

export default function Header() {
  const scrolled = useScrollHeader();
  const pathname = usePathname();
  const isHome = pathname === "/";
  // On inner pages the header should always render in its solid state so it
  // stays visually fixed/legible over the page-hero instead of being transparent.
  const showSolid = scrolled || !isHome;
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleMobileLink = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header id="header" className={showSolid ? "scrolled" : ""} role="banner">
        <div className="top-bar">
          <div>
            Pratap Nagar, Jaipur &bull; 2 km from Airport &bull;{" "}
            <a href="tel:+919XXXXXXXXX" aria-label="Call The Shekhawat Haveli">
              +91 9XXX XXX XXX
            </a>
          </div>
          <div>
            <a href="mailto:reservations@theshekhawathaveli.com" aria-label="Email reservations">
              reservations@theshekhawathaveli.com
            </a>
          </div>
        </div>
        <nav className="nav-main" role="navigation" aria-label="Main Navigation">
          <a href="/" className="logo" aria-label="The Shekhawat Haveli Homepage">
            <div className="logo-name">The Shekhawat Haveli</div>
            <div className="logo-tag">Luxury Heritage Hotel &bull; Jaipur</div>
          </a>
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.href}>
                {link.href.startsWith("/") ? (
                  <Link href={link.href} aria-label={link.ariaLabel}>
                    {link.label}
                  </Link>
                ) : (
                  <a href={link.href} aria-label={link.ariaLabel}>
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
          <div className="nav-book">
            <LanguageSwitcher />
            <span className="nav-phone">
              <a href="tel:+919XXXXXXXXX" style={{ color: "var(--gold-l)" }} aria-label="Call to book">
                +91 9XXX XXX XXX
              </a>
            </span>
            <button className="btn-book" onClick={scrollToContact} aria-label="Book a room now">
              Book Now
            </button>
          </div>
          <button
            className="hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
      </header>

      <div className={`mobile-nav ${mobileOpen ? "open" : ""}`}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => {
              e.preventDefault();
              handleMobileLink(link.href);
            }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
