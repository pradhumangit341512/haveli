import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-main">
        <div>
          <div className="footer-logo">The Shekhawat Haveli</div>
          <p className="footer-tagline">Luxury Heritage Hotel &amp; Resort</p>
          <p className="footer-text">
            A five-story haveli masterpiece in Pratap Nagar, Jaipur, offering 21 luxury rooms from
            Rs 5,000/night, rooftop dining with airport views, and authentic Rajputana hospitality.
            Just 2 km from Jaipur International Airport on Tonk Road.
          </p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link href="/#about">About Us</Link></li>
            <li><Link href="/rooms">Rooms &amp; Suites</Link></li>
            <li><Link href="/offers">Special Offers</Link></li>
            <li><Link href="/gallery">Photo Gallery</Link></li>
            <li><Link href="/blog">Travel Blog</Link></li>
            <li><Link href="/virtual-tour">Virtual Tour</Link></li>
            <li><Link href="/#faq">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h4>Services</h4>
          <ul className="footer-links">
            <li><Link href="/#contact">Book a Room</Link></li>
            <li><Link href="/offers#honeymoon-package">Honeymoon Package</Link></li>
            <li><Link href="/offers#wedding-group-deal">Wedding Packages</Link></li>
            <li><Link href="/offers#corporate-long-stay">Corporate Stays</Link></li>
            <li><Link href="/#contact">Airport Transfer</Link></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul className="footer-links">
            <li><a href="tel:+919XXXXXXXXX">+91 9XXX XXX XXX</a></li>
            <li><a href="mailto:reservations@theshekhawathaveli.com">reservations@theshekhawathaveli.com</a></li>
            <li><a href="https://wa.me/919XXXXXXXXX" target="_blank" rel="noopener">WhatsApp Chat</a></li>
            <li>Pratap Nagar, Tonk Road</li>
            <li>Jaipur, Rajasthan 302033</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {year} The Shekhawat Haveli. All Rights Reserved. &bull; Luxury Heritage Hotel Near
        Jaipur Airport, Pratap Nagar &bull; Website by <a href="#">Pradhuman Singh</a>
      </div>
    </footer>
  );
}
