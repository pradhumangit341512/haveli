import { facilities } from "@/data/facilities";

const ICONS: Record<string, React.ReactNode> = {
  "Rooftop Restaurant": (
    <path d="M8 22h8M12 15v7M7 3h10l-1 7a4 4 0 0 1-8 0L7 3Z" />
  ),
  "Luxury Bathrooms": (
    <path d="M12 2.5S5 9 5 14a7 7 0 0 0 14 0c0-5-7-11.5-7-11.5Z" />
  ),
  "24/7 Room Service": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  "Near the Airport": (
    <path d="M17.8 19.2 16 11l3.5-3.5a2.1 2.1 0 0 0-3-3L13 8 4.8 6.2a.5.5 0 0 0-.5.8l3.5 3.9-2 2-2.5-.5-1 1 3 1.6L9 18.5l1-1-.5-2.5 2-2 3.9 3.5a.5.5 0 0 0 .8-.5Z" />
  ),
  "High-Speed Wi-Fi": (
    <>
      <path d="M2 8.8a15 15 0 0 1 20 0M5 12.5a11 11 0 0 1 14 0M8.5 16a6 6 0 0 1 7 0" />
      <circle cx="12" cy="20" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  "Events & Weddings": (
    <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.2A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
  ),
};

const DEFAULT_ICON = (
  <path d="M12 3l2.4 5.6L20 9.3l-4 4 1 5.7-5-3-5 3 1-5.7-4-4 5.6-.7L12 3Z" />
);

function FacilityIcon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      {ICONS[name] ?? DEFAULT_ICON}
    </svg>
  );
}

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
          Ummed Haveli attends to your every desire with five-star precision.
        </p>
      </div>
      <div className="container">
        <div className="fac-grid">
          {facilities.map((fac) => (
            <div key={fac.name} className="fac-card reveal">
              <div className="fac-icon" aria-hidden="true"><FacilityIcon name={fac.name} /></div>
              <h3 className="fac-name">{fac.name}</h3>
              <div className="fac-desc">{fac.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
