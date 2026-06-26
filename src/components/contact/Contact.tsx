import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section className="contact-sec" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="sec-tag" style={{ color: "var(--gold)" }}>Get in Touch</div>
        <h2 className="sec-title" id="contact-title">
          Book Your Stay at <em style={{ color: "var(--gold)" }}>The Ummed Haveli Jaipur</em>
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
              <div className="c-value">The Ummed Haveli</div>
            </div>
            <div className="c-item">
              <div className="c-label">Address</div>
              <div className="c-value">
                Krishi Nagar, Budh Singhpura<br />
                Near Terminal 1 Airport, Sanganer<br />
                Jaipur, Rajasthan 302029, India
              </div>
            </div>
            <div className="c-item">
              <div className="c-label">Reservations</div>
              <div className="c-value">
                <a href="tel:+917296812341" aria-label="Call for reservations">+91 72968 12341</a>
              </div>
            </div>
            <div className="c-item">
              <div className="c-label">WhatsApp</div>
              <div className="c-value">
                <a href="https://wa.me/917296812341" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
                  +91 72968 12341
                </a>
              </div>
            </div>
            <div className="c-item">
              <div className="c-label">Email</div>
              <div className="c-value">
                <a href="mailto:theummedhaveli@gmail.com" aria-label="Email for reservations">
                  theummedhaveli@gmail.com
                </a>
              </div>
            </div>
            <div className="c-item">
              <div className="c-label">From Jaipur Airport</div>
              <div className="c-value">2 km &bull; 5 min drive</div>
            </div>
            <iframe
              className="c-map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.5755305728744!2d75.81316307548926!3d26.82164107670166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396dc900385ce4cf%3A0x91eb96e568f41c49!2sThe%20Ummed%20Haveli%2C%20at%20the%20airport!5e0!3m2!1sen!2sus!4v1780047077721!5m2!1sen!2sus"
              allowFullScreen
              loading="lazy"
              title="The Ummed Haveli location on Google Maps - Krishi Nagar, Sanganer, Jaipur"
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
