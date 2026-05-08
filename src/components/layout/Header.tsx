"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScrollHeader } from "@/hooks/useScrollHeader";
import { navLinks } from "@/data/navigation";

export default function Header() {
  const scrolled = useScrollHeader();
  const pathname = usePathname();
  const isHome = pathname === "/";
  // On inner pages the header should always render in its solid state so it
  // stays visually fixed/legible over the page-hero instead of being transparent.
  const showSolid = scrolled || !isHome;
  const [mobileOpen, setMobileOpen] = useState(false);

  const resolveHref = (href: string) => {
    if (href.startsWith("#") && !isHome) return `/${href}`;
    return href;
  };

  const scrollToContact = () => {
    if (!isHome) {
      window.location.href = "/#contact";
      return;
    }
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleMobileLink = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      if (!isHome) {
        window.location.href = `/${href}`;
        return;
      }
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    }
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
            {navLinks.map((link) => {
              const href = resolveHref(link.href);
              return (
                <li key={link.href}>
                  {href.startsWith("/") ? (
                    <Link href={href} aria-label={link.ariaLabel}>
                      {link.label}
                    </Link>
                  ) : (
                    <a href={href} aria-label={link.ariaLabel}>
                      {link.label}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="nav-book">
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
        {navLinks.map((link) => {
          const href = resolveHref(link.href);
          if (link.href.startsWith("#")) {
            return (
              <a
                key={link.href}
                href={href}
                onClick={(e) => {
                  e.preventDefault();
                  handleMobileLink(link.href);
                }}
              >
                {link.label}
              </a>
            );
          }
          return (
            <Link
              key={link.href}
              href={href}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </>
  );
}
