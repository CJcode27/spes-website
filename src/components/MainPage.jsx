import FadeSection from "./FadeSection";
import { scrollToId } from "../utils/scrollTo";

export default function MainPage({ onOfficeClick, offices }) {
  const officials = [
    { initials: "JD", name: "Ladis Lao Alicbusan", role: "Barangay Captain" },
    { initials: "MR", name: "Ladis Lao Alicbusan", role: "Barangay Kagawad" },
    { initials: "AR", name: "Ladis Lao Alicbusan", role: "Barangay Kagawad" },
    { initials: "LS", name: "Ladis Lao Alicbusan", role: "Barangay Kagawad" },
    { initials: "RM", name: "Ladis Lao Alicbusan", role: "Barangay Treasurer" },
    { initials: "GB", name: "Ladis Lao Alicbusan", role: "Barangay Secretary" },
  ];

  const values = [
    { icon: "🤲", title: "Service", desc: "Dedicated to every resident's needs, always." },
    { icon: "⚖️", title: "Integrity", desc: "Transparent governance with accountability." },
    { icon: "🌱", title: "Progress", desc: "Sustainable growth for the community." },
    { icon: "🤝", title: "Unity", desc: "Building bonds and lasting partnerships." },
  ];

  return (
    <>
      {/* ── SECTION 1: HERO ── */}
      <section id="home">
        <div className="hero">
          <div className="hero-grid" />
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-content">
            <div className="hero-inner">
              <div>
                <FadeSection>
                  <div className="hero-badge">
                    <div className="hero-badge-dot" />
                    Serving Our Community
                  </div>
                </FadeSection>
                <FadeSection delay={0.1}>
                  <h1 className="hero-title">
                    Your Barangay,
                    <span>Your Home.</span>
                  </h1>
                </FadeSection>
                <FadeSection delay={0.2}>
                  <p className="hero-desc">
                    A local government committed to transparency, excellence, and genuine service for every resident. Access all our offices, services, and community programs here.
                  </p>
                </FadeSection>
                <FadeSection delay={0.3}>
                  <div className="hero-buttons">
                    <button className="btn-primary" onClick={() => scrollToId("offices")}>
                      Explore Offices →
                    </button>
                    <button className="btn-outline" onClick={() => scrollToId("about")}>
                      About Us
                    </button>
                  </div>
                </FadeSection>
              </div>
              <FadeSection delay={0.2}>
                <div className="hero-visual">
                  <div className="logo-seal">
                    <div className="logo-seal-inner">
                      <div className="logo-seal-emblem">🏛️</div>
                      <div className="logo-seal-name">Barangay Sinalhan</div>
                      <div className="logo-seal-tagline">Local Government Unit</div>
                    </div>
                  </div>
                </div>
              </FadeSection>
            </div>
          </div>
        </div>
        <div className="stats-row">
          {[
            { n: "8,000+", l: "Residents" },
            { n: "8", l: "Offices" },
            { n: "30+", l: "Services" },
            { n: "24/7", l: "Commitment" },
          ].map((s) => (
            <div className="stat-item" key={s.l}>
              <div className="stat-number">{s.n}</div>
              <div className="stat-label">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* ── SECTION 2: ABOUT ── */}
      <section id="about" className="about-section">
        <div className="about-grid">
          <div>
            <FadeSection>
              <p className="section-label">Who We Are</p>
              <h2 className="section-title">
                Serving with <span>Purpose</span>
              </h2>
              <div className="divider" />
            </FadeSection>
            <FadeSection delay={0.1}>
              <p className="about-desc">
                Our barangay is the smallest yet most vital unit of government — the first line of service for every resident. For decades, we have stood as the backbone of community welfare, justice, and progress.
              </p>
              <p className="about-desc">
                Our mission is rooted in respect for every individual and family in our community. We strive to deliver accessible, efficient, and compassionate public service across all our departments.
              </p>
            </FadeSection>
            <FadeSection delay={0.2}>
              <div className="values-grid">
                {values.map((v) => (
                  <div className="value-card" key={v.title}>
                    <div className="value-icon">{v.icon}</div>
                    <div className="value-title">{v.title}</div>
                    <div className="value-desc">{v.desc}</div>
                  </div>
                ))}
              </div>
            </FadeSection>
          </div>
          <div>
            <FadeSection delay={0.15}>
              <p className="officials-title">Elected Officials</p>
              {officials.map((o) => (
                <div className="official-item" key={o.name}>
                  <div className="official-avatar">{o.initials}</div>
                  <div>
                    <div className="official-name">{o.name}</div>
                    <div className="official-role">{o.role}</div>
                  </div>
                </div>
              ))}
            </FadeSection>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── SECTION 3: OFFICES ── */}
      <section id="offices" className="offices-section">
        <div className="offices-header">
          <FadeSection>
            <p className="section-label">Barangay Departments</p>
            <h2 className="section-title">
              Our <span>Offices</span>
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: "clamp(0.82rem,1.8vw,0.95rem)",
                maxWidth: 480,
                margin: "0.6rem auto 0",
              }}
            >
              Eight specialized departments serving the full needs of our community.
            </p>
          </FadeSection>
        </div>
        <div className="offices-grid">
          {offices.map((office, i) => (
            <FadeSection key={office.id} delay={i * 0.06}>
              <div className="office-card" onClick={() => onOfficeClick(office.id)}>
                <div className="office-card-bg" style={{ background: office.bg }} />
                <div className="office-card-overlay" />
                <div className="office-card-content">
                  <span className="office-card-icon">{office.icon}</span>
                  <div className="office-card-name">{office.name}</div>
                  <div className="office-card-sub">{office.subtitle}</div>
                </div>
                <div className="office-card-arrow">→</div>
              </div>
            </FadeSection>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-logo">Barangay Sinalhan</div>
        <p>© 2026 Barangay Sinalhan. All rights reserved.</p>
      </footer>
    </>
  );
}

