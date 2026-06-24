import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-main">
        <div>
          <div className="footer-logo">The Ummed Haveli</div>
          <p className="footer-tagline">A Heritage Hotel At The Airport</p>
          <p className="footer-text">
            A heritage haveli masterpiece in Krishi Nagar, Sanganer, Jaipur, offering luxury heritage
            rooms, rooftop dining with airport views, and authentic Rajputana hospitality.
            Near Terminal 1 Airport, Jaipur.
          </p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link href="/#about">About Us</Link></li>
            <li><Link href="/rooms">Rooms &amp; Suites</Link></li>
            <li><Link href="/hawai-jharokha">Hawai Jharokha Restaurant</Link></li>
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
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul className="footer-links">
            <li><a href="tel:+917296812341">+91 72968 12341</a></li>
            <li><a href="tel:+911414063461">0141-4063461</a></li>
            <li><a href="mailto:theummedhaveli@gmail.com">theummedhaveli@gmail.com</a></li>
            <li><a href="https://wa.me/917296812341" target="_blank" rel="noopener">WhatsApp Chat</a></li>
            <li>Krishi Nagar, Budh Singhpura</li>
            <li>Near Terminal 1 Airport, Sanganer</li>
            <li>Jaipur, Rajasthan 302029</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {year} The Ummed Haveli. All Rights Reserved. &bull; A Heritage Hotel At The Airport,
        Sanganer, Jaipur &bull; Website by <a href="#">Pradhuman Singh</a>
      </div>
    </footer>
  );
}
