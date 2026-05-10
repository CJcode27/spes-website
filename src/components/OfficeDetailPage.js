import FadeSection from "./FadeSection";

export default function OfficeDetailPage({ office, onBack }) {
  if (!office) return null;

  return (
    <div className="office-detail-page">
      <div className="office-hero" style={{ background: office.bg }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 100%)",
          }}
        />
        <div className="office-hero-content">
          <div className="office-hero-icon">{office.icon}</div>
          <h1 className="office-hero-title">{office.name}</h1>
          <p className="office-hero-sub">{office.subtitle}</p>
        </div>
      </div>
      <div className="office-body">
        <div className="office-body-inner">
          <div>
            <FadeSection>
              <p className="office-section-label">About This Office</p>
              <h2 className="office-section-title">Department Overview</h2>
              <p className="office-desc-text">{office.description}</p>
            </FadeSection>
            <FadeSection delay={0.1}>
              <p className="office-section-label" style={{ marginTop: "1.75rem" }}>
                Available Services
              </p>
              <ul className="services-list">
                {office.services.map((s) => (
                  <li className="service-item" key={s}>
                    <div className="service-dot" style={{ background: office.accent }} />
                    {s}
                  </li>
                ))}
              </ul>
            </FadeSection>
          </div>
          <div>
            <FadeSection delay={0.15}>
              <div className="info-card">
                <p className="office-section-label">Office Information</p>
                <div className="info-row">
                  <div className="info-icon">🕐</div>
                  <div>
                    <div className="info-label">Office Hours</div>
                    <div className="info-value">{office.schedule}</div>
                  </div>
                </div>
                <div className="info-row">
                  <div className="info-icon">📞</div>
                  <div>
                    <div className="info-label">Contact</div>
                    <div className="info-value">{office.contact}</div>
                  </div>
                </div>
                <div className="info-row">
                  <div className="info-icon">📍</div>
                  <div>
                    <div className="info-label">Location</div>
                    <div className="info-value">Barangay Hall, Ground Floor</div>
                  </div>
                </div>
              </div>
              <div className="info-card">
                <p className="office-section-label">Requirements</p>
                <p style={{ fontSize: "0.83rem", color: "#6b7280", lineHeight: 1.65 }}>
                  Please bring a valid government-issued ID and any relevant documents. Staff will guide you through the process.
                </p>
              </div>
              <button
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center", display: "flex" }}
                onClick={onBack}
              >
                ← View All Offices
              </button>
            </FadeSection>
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="footer-logo">Barangay Sinalhan</div>
        <p>© 2026 Barangay Sinalhan. All rights reserved.</p>
      </footer>
    </div>
  );
}

