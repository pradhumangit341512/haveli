import { facilities } from "@/data/facilities";

export default function Facilities() {
  return (
    <section className="facilities-sec" id="facilities" aria-labelledby="fac-title">
      <div className="container text-center">
        <div className="sec-tag">World-Class Amenities</div>
        <h2 className="sec-title" id="fac-title">
          Five-Star Hotel <em>Facilities in Jaipur</em>
        </h2>
        <div className="sec-line"></div>
        <p className="sec-desc">
          Every detail anticipated. From sunrise yoga on the rooftop to midnight room service, The
          Shekhawat Haveli attends to your every desire with five-star precision.
        </p>
      </div>
      <div className="container">
        <div className="fac-grid">
          {facilities.map((fac) => (
            <div key={fac.name} className="fac-card reveal">
              <div className="fac-icon" aria-hidden="true">{fac.icon}</div>
              <h3 className="fac-name">{fac.name}</h3>
              <div className="fac-desc">{fac.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
