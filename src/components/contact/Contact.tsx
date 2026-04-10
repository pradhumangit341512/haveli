import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section className="contact-sec" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="sec-tag" style={{ color: "var(--gold)" }}>Get in Touch</div>
        <h2 className="sec-title" id="contact-title">
          Book Your Stay at <em style={{ color: "var(--gold)" }}>The Shekhawat Haveli Jaipur</em>
        </h2>
        <div className="sec-line"></div>
        <div className="contact-grid">
          <div>
            <p className="sec-desc" style={{ color: "rgba(255,255,255,0.5)", marginBottom: 32 }}>
              Let us create an unforgettable heritage experience for you. Fill the form or contact us
              directly &mdash; we respond within minutes.
            </p>
            <div className="c-item">
              <div className="c-label">Hotel Name</div>
              <div className="c-value">The Shekhawat Haveli</div>
            </div>
            <div className="c-item">
              <div className="c-label">Address</div>
              <div className="c-value">
                Pratap Nagar, Tonk Road<br />
                Jaipur, Rajasthan 302033, India
              </div>
            </div>
            <div className="c-item">
              <div className="c-label">Reservations</div>
              <div className="c-value">
                <a href="tel:+919XXXXXXXXX" aria-label="Call for reservations">+91 9XXX XXX XXX</a>
              </div>
            </div>
            <div className="c-item">
              <div className="c-label">WhatsApp</div>
              <div className="c-value">
                <a href="https://wa.me/919XXXXXXXXX" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
                  Chat with us instantly
                </a>
              </div>
            </div>
            <div className="c-item">
              <div className="c-label">Email</div>
              <div className="c-value">
                <a href="mailto:reservations@theshekhawathaveli.com" aria-label="Email for reservations">
                  reservations@theshekhawathaveli.com
                </a>
              </div>
            </div>
            <div className="c-item">
              <div className="c-label">From Jaipur Airport</div>
              <div className="c-value">2 km &bull; 5 min drive &bull; Complimentary Pickup</div>
            </div>
            <iframe
              className="c-map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.5!2d75.79!3d26.82!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDQ5JzEyLjAiTiA3NcKwNDcnMjQuMCJF!5e0!3m2!1sen!2sin!4v1"
              allowFullScreen
              loading="lazy"
              title="The Shekhawat Haveli location on Google Maps - Pratap Nagar Jaipur"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: "1px solid rgba(200,164,92,0.2)" }}
            ></iframe>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
