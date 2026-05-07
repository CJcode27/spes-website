import { useState, useEffect, useRef } from "react";

const OFFICES = [
  {
    id: "bhw1",
    name: "BHW 1",
    subtitle: "Barangay Health Worker 1",
    icon: "🏥",
    color: "#1a6b4a",
    accent: "#2ecc71",
    bg: "linear-gradient(135deg, #0d3d2b 0%, #1a6b4a 50%, #0d3d2b 100%)",
    description: "Primary health services and community wellness programs for Zone 1 residents.",
    services: ["Health Consultations", "Immunization Records", "Prenatal Monitoring", "Blood Pressure Check", "Health Certificates"],
    schedule: "Monday – Friday, 8:00 AM – 5:00 PM",
    contact: "BHW Team 1 – Ext. 101",
  },
  {
    id: "bhw2",
    name: "BHW 2",
    subtitle: "Barangay Health Worker 2",
    icon: "💉",
    color: "#1a4b6b",
    accent: "#3498db",
    bg: "linear-gradient(135deg, #0d2b3d 0%, #1a4b6b 50%, #0d2b3d 100%)",
    description: "Secondary health services and wellness initiatives for Zone 2 and extended communities.",
    services: ["Medical Referrals", "Child Health Monitoring", "Nutritional Assessments", "Family Planning", "Wound Dressing"],
    schedule: "Monday – Friday, 8:00 AM – 5:00 PM",
    contact: "BHW Team 2 – Ext. 102",
  },
  {
    id: "philhealth",
    name: "PhilHealth",
    subtitle: "Health Insurance Corporation",
    icon: "🛡️",
    color: "#4a1a6b",
    accent: "#9b59b6",
    bg: "linear-gradient(135deg, #2b0d3d 0%, #4a1a6b 50%, #2b0d3d 100%)",
    description: "National health insurance enrollment, contributions, and benefit processing.",
    services: ["Member Registration", "Contribution Payments", "Benefit Availment", "MDR Printing", "Coverage Inquiries"],
    schedule: "Monday – Friday, 8:00 AM – 5:00 PM",
    contact: "PhilHealth Desk – Ext. 103",
  },
  {
    id: "badac",
    name: "BADAC",
    subtitle: "Barangay Anti-Drug Abuse Council",
    icon: "⚖️",
    color: "#6b3a1a",
    accent: "#e67e22",
    bg: "linear-gradient(135deg, #3d1e0d 0%, #6b3a1a 50%, #3d1e0d 100%)",
    description: "Community drug prevention, rehabilitation coordination, and anti-drug awareness campaigns.",
    services: ["Drug Testing Referrals", "Community Seminars", "Rehabilitation Coordination", "Case Monitoring", "Awareness Programs"],
    schedule: "Monday – Friday, 8:00 AM – 5:00 PM",
    contact: "BADAC Office – Ext. 104",
  },
  {
    id: "office",
    name: "Office",
    subtitle: "Barangay Main Office",
    icon: "🏛️",
    color: "#1a2f6b",
    accent: "#2980b9",
    bg: "linear-gradient(135deg, #0d1a3d 0%, #1a2f6b 50%, #0d1a3d 100%)",
    description: "Central administrative hub for all barangay governance, records, and public services.",
    services: ["Residency Certificates", "Barangay IDs", "Business Permits", "Indigency Certificates", "Official Documents"],
    schedule: "Monday – Friday, 8:00 AM – 5:00 PM",
    contact: "Main Office – Ext. 100",
  },
  {
    id: "vawc",
    name: "VAWC",
    subtitle: "Violence Against Women & Children",
    icon: "💙",
    color: "#6b1a3a",
    accent: "#e91e8c",
    bg: "linear-gradient(135deg, #3d0d20 0%, #6b1a3a 50%, #3d0d20 100%)",
    description: "Support, protection, and legal assistance for women and children victims of violence.",
    services: ["Case Filing", "Legal Assistance Referral", "Counseling", "Protection Orders", "Safe House Coordination"],
    schedule: "Monday – Friday, 8:00 AM – 5:00 PM",
    contact: "VAWC Desk – Ext. 105",
  },
  {
    id: "clearance",
    name: "Clearance",
    subtitle: "Barangay Clearance Office",
    icon: "📋",
    color: "#2a6b1a",
    accent: "#27ae60",
    bg: "linear-gradient(135deg, #143d0d 0%, #2a6b1a 50%, #143d0d 100%)",
    description: "Issuance of barangay clearances for employment, legal, business, and personal purposes.",
    services: ["Employment Clearance", "Business Clearance", "NBI Clearance Support", "Police Clearance Support", "Court Clearance"],
    schedule: "Monday – Friday, 8:00 AM – 5:00 PM",
    contact: "Clearance Office – Ext. 106",
  },
  {
    id: "lupon",
    name: "Lupon",
    subtitle: "Lupong Tagapamayapa",
    icon: "🤝",
    color: "#6b5a1a",
    accent: "#f39c12",
    bg: "linear-gradient(135deg, #3d320d 0%, #6b5a1a 50%, #3d320d 100%)",
    description: "Community dispute resolution and mediation services for peaceful settlement of conflicts.",
    services: ["Dispute Mediation", "Conciliation Proceedings", "Barangay Justice", "Settlement Agreements", "Case Records"],
    schedule: "Monday – Friday, 8:00 AM – 5:00 PM",
    contact: "Lupon Secretariat – Ext. 107",
  },
];

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --gold: #c9a84c;
    --gold-light: #e8cc7a;
    --navy: #0a1628;
    --navy-mid: #112040;
    --navy-light: #1a3060;
    --cream: #f5f0e8;
    --cream-dark: #ede4d0;
    --text: #1a1a2e;
    --text-muted: #6b7280;
    --white: #ffffff;
    --transition: cubic-bezier(0.4, 0, 0.2, 1);
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--navy);
    color: var(--white);
    overflow-x: hidden;
  }

  .page { min-height: 100vh; display: flex; flex-direction: column; }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1rem 3rem;
    background: rgba(10,22,40,0.92);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(201,168,76,0.2);
    transition: all 0.3s var(--transition);
  }
  .nav-logo {
    display: flex; align-items: center; gap: 0.75rem; cursor: pointer;
    transition: opacity 0.2s;
  }
  .nav-logo:hover { opacity: 0.85; }
  .nav-logo-icon {
    width: 42px; height: 42px; border-radius: 50%;
    background: linear-gradient(135deg, var(--gold), var(--gold-light));
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; font-weight: 700; color: var(--navy);
    font-family: 'Playfair Display', serif;
    border: 2px solid rgba(255,255,255,0.15);
  }
  .nav-logo-text { font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 600; color: var(--gold); line-height: 1.1; }
  .nav-logo-sub { font-size: 0.65rem; color: rgba(255,255,255,0.5); font-weight: 400; text-transform: uppercase; letter-spacing: 1px; }
  .nav-links { display: flex; gap: 2rem; align-items: center; }
  .nav-link {
    font-size: 0.85rem; font-weight: 500; letter-spacing: 0.5px;
    color: rgba(255,255,255,0.7); cursor: pointer;
    transition: color 0.2s; text-transform: uppercase;
    background: none; border: none; padding: 0;
  }
  .nav-link:hover, .nav-link.active { color: var(--gold); }
  .nav-cta {
    padding: 0.5rem 1.25rem; border-radius: 6px;
    background: var(--gold); color: var(--navy);
    font-size: 0.8rem; font-weight: 600; cursor: pointer;
    border: none; transition: all 0.2s; text-transform: uppercase; letter-spacing: 0.5px;
  }
  .nav-cta:hover { background: var(--gold-light); transform: translateY(-1px); }

  /* HERO */
  .hero {
    min-height: 100vh;
    background: radial-gradient(ellipse at 20% 50%, rgba(26,48,96,0.8) 0%, transparent 60%),
                radial-gradient(ellipse at 80% 20%, rgba(201,168,76,0.1) 0%, transparent 50%),
                var(--navy);
    display: flex; align-items: center; position: relative; overflow: hidden;
  }
  .hero-grid {
    position: absolute; inset: 0; opacity: 0.04;
    background-image: linear-gradient(rgba(201,168,76,1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px);
    background-size: 60px 60px;
  }
  .hero-orb {
    position: absolute; border-radius: 50%;
    filter: blur(80px); pointer-events: none;
  }
  .hero-orb-1 { width: 500px; height: 500px; background: rgba(201,168,76,0.06); top: -100px; right: -100px; }
  .hero-orb-2 { width: 300px; height: 300px; background: rgba(26,48,96,0.5); bottom: 100px; left: -50px; }
  .hero-content { padding: 0 3rem; max-width: 1200px; margin: 0 auto; width: 100%; position: relative; z-index: 1; padding-top: 100px; }
  .hero-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 0.5rem;
    padding: 0.4rem 1rem; border-radius: 100px;
    border: 1px solid rgba(201,168,76,0.4);
    background: rgba(201,168,76,0.08);
    font-size: 0.75rem; font-weight: 500; letter-spacing: 1px;
    text-transform: uppercase; color: var(--gold); margin-bottom: 1.5rem;
  }
  .hero-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--gold); animation: pulse 2s infinite; }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
  .hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 700; line-height: 1.1;
    color: var(--white); margin-bottom: 1.5rem;
  }
  .hero-title span { color: var(--gold); display: block; }
  .hero-desc { font-size: 1.05rem; line-height: 1.75; color: rgba(255,255,255,0.65); margin-bottom: 2.5rem; max-width: 480px; }
  .hero-buttons { display: flex; gap: 1rem; flex-wrap: wrap; }
  .btn-primary {
    padding: 0.85rem 2rem; border-radius: 8px;
    background: linear-gradient(135deg, var(--gold), var(--gold-light));
    color: var(--navy); font-weight: 600; font-size: 0.9rem;
    border: none; cursor: pointer; transition: all 0.3s var(--transition);
    letter-spacing: 0.3px;
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(201,168,76,0.35); }
  .btn-outline {
    padding: 0.85rem 2rem; border-radius: 8px;
    background: transparent; color: var(--white); font-weight: 500; font-size: 0.9rem;
    border: 1px solid rgba(255,255,255,0.3); cursor: pointer;
    transition: all 0.3s var(--transition);
  }
  .btn-outline:hover { border-color: var(--gold); color: var(--gold); transform: translateY(-2px); }

  /* HERO LOGO VISUAL */
  .hero-visual { display: flex; align-items: center; justify-content: center; }
  .logo-seal {
    width: 320px; height: 320px; border-radius: 50%;
    background: linear-gradient(135deg, rgba(201,168,76,0.1), rgba(201,168,76,0.05));
    border: 2px solid rgba(201,168,76,0.3);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    position: relative; animation: float 6s ease-in-out infinite;
  }
  @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
  .logo-seal::before {
    content: ''; position: absolute; inset: -12px;
    border-radius: 50%; border: 1px dashed rgba(201,168,76,0.2);
    animation: spin 30s linear infinite;
  }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  .logo-seal-inner { text-align: center; }
  .logo-seal-emblem { font-size: 80px; line-height: 1; margin-bottom: 0.5rem; }
  .logo-seal-name {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem; font-weight: 700; color: var(--gold);
    letter-spacing: 2px; text-transform: uppercase;
  }
  .logo-seal-tagline { font-size: 0.65rem; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin-top: 0.25rem; text-transform: uppercase; }

  /* STATS ROW */
  .stats-row {
    background: rgba(201,168,76,0.06); border-top: 1px solid rgba(201,168,76,0.15); border-bottom: 1px solid rgba(201,168,76,0.15);
    padding: 2rem 3rem; display: grid; grid-template-columns: repeat(4, 1fr);
  }
  .stat-item { text-align: center; }
  .stat-number { font-family: 'Playfair Display', serif; font-size: 2rem; font-weight: 700; color: var(--gold); }
  .stat-label { font-size: 0.75rem; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 1px; margin-top: 0.25rem; }

  /* ABOUT PAGE */
  .about-page {
    min-height: 100vh; padding: 120px 3rem 4rem;
    background: linear-gradient(180deg, var(--navy) 0%, #0f1f3d 50%, var(--navy) 100%);
    position: relative; overflow: hidden;
  }
  .section-label {
    font-size: 0.75rem; font-weight: 600; letter-spacing: 3px; text-transform: uppercase;
    color: var(--gold); margin-bottom: 1rem;
  }
  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 4vw, 3rem); font-weight: 700;
    line-height: 1.15; color: var(--white); margin-bottom: 1.5rem;
  }
  .section-title span { color: var(--gold); }
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; max-width: 1200px; margin: 0 auto; }
  .about-desc { font-size: 1rem; line-height: 1.8; color: rgba(255,255,255,0.65); margin-bottom: 1.5rem; }
  .divider { width: 60px; height: 3px; background: linear-gradient(90deg, var(--gold), transparent); margin-bottom: 2rem; }
  .values-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 2rem; }
  .value-card {
    padding: 1.25rem; border-radius: 12px;
    background: rgba(201,168,76,0.05); border: 1px solid rgba(201,168,76,0.15);
    transition: all 0.3s var(--transition);
  }
  .value-card:hover { background: rgba(201,168,76,0.1); transform: translateY(-3px); border-color: rgba(201,168,76,0.35); }
  .value-icon { font-size: 1.5rem; margin-bottom: 0.5rem; }
  .value-title { font-weight: 600; font-size: 0.9rem; color: var(--gold); margin-bottom: 0.25rem; }
  .value-desc { font-size: 0.8rem; color: rgba(255,255,255,0.5); line-height: 1.5; }
  .officials-title { font-family: 'Playfair Display', serif; font-size: 1.5rem; color: var(--white); margin-bottom: 1.5rem; font-weight: 600; }
  .official-item {
    display: flex; align-items: center; gap: 1rem;
    padding: 1rem; border-radius: 10px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    transition: background 0.2s;
  }
  .official-item:hover { background: rgba(255,255,255,0.04); }
  .official-avatar {
    width: 44px; height: 44px; border-radius: 50%;
    background: linear-gradient(135deg, var(--gold), var(--gold-light));
    display: flex; align-items: center; justify-content: center;
    font-size: 0.75rem; font-weight: 700; color: var(--navy); flex-shrink: 0;
  }
  .official-name { font-weight: 500; font-size: 0.9rem; color: var(--white); }
  .official-role { font-size: 0.75rem; color: rgba(255,255,255,0.45); margin-top: 2px; }

  /* OFFICES PAGE */
  .offices-page {
    min-height: 100vh; padding: 100px 3rem 4rem;
    background: var(--navy);
    display: flex; flex-direction: column; align-items: center;
  }
  .offices-header { text-align: center; margin-bottom: 3rem; }
  .offices-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.25rem;
    width: 100%; max-width: 1200px;
  }
  .office-card {
    position: relative; border-radius: 16px; overflow: hidden;
    cursor: pointer; transition: all 0.4s var(--transition);
    border: 1px solid rgba(255,255,255,0.08);
    height: 220px;
    display: flex; flex-direction: column; justify-content: flex-end;
  }
  .office-card:hover { transform: translateY(-8px) scale(1.02); border-color: rgba(201,168,76,0.5); box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
  .office-card-bg { position: absolute; inset: 0; transition: transform 0.4s var(--transition); }
  .office-card:hover .office-card-bg { transform: scale(1.08); }
  .office-card-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%);
  }
  .office-card-content { position: relative; z-index: 1; padding: 1.25rem; }
  .office-card-icon { font-size: 2rem; margin-bottom: 0.5rem; display: block; transition: transform 0.3s; }
  .office-card:hover .office-card-icon { transform: scale(1.2); }
  .office-card-name { font-family: 'Playfair Display', serif; font-size: 1.15rem; font-weight: 700; color: var(--white); margin-bottom: 0.2rem; }
  .office-card-sub { font-size: 0.7rem; color: rgba(255,255,255,0.55); text-transform: uppercase; letter-spacing: 0.5px; }
  .office-card-arrow {
    position: absolute; top: 1rem; right: 1rem;
    width: 32px; height: 32px; border-radius: 50%;
    background: rgba(201,168,76,0.2); border: 1px solid rgba(201,168,76,0.4);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.9rem; transition: all 0.3s; opacity: 0; transform: translateX(-5px);
  }
  .office-card:hover .office-card-arrow { opacity: 1; transform: translateX(0); background: var(--gold); color: var(--navy); }

  /* OFFICE DETAIL PAGE */
  .office-detail-page {
    min-height: 100vh;
    display: flex; flex-direction: column;
  }
  .office-hero {
    height: 42vh; position: relative; display: flex; align-items: flex-end;
    padding: 3rem;
  }
  .office-hero-content { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; width: 100%; }
  .office-hero-badge {
    display: inline-flex; align-items: center; gap: 0.5rem;
    padding: 0.35rem 0.875rem; border-radius: 100px;
    background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
    font-size: 0.7rem; text-transform: uppercase; letter-spacing: 1px;
    color: rgba(255,255,255,0.8); margin-bottom: 1rem; cursor: pointer;
    transition: all 0.2s;
  }
  .office-hero-badge:hover { background: rgba(255,255,255,0.2); }
  .office-hero-icon { font-size: 3rem; margin-bottom: 0.75rem; display: block; }
  .office-hero-title { font-family: 'Playfair Display', serif; font-size: 2.5rem; font-weight: 700; color: white; }
  .office-hero-sub { font-size: 1rem; color: rgba(255,255,255,0.7); margin-top: 0.5rem; }
  .office-body { flex: 1; padding: 3rem; background: var(--cream); color: var(--text); max-width: 100%; }
  .office-body-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr; gap: 3rem; }
  .office-section-label { font-size: 0.7rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.75rem; }
  .office-section-title { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 700; color: var(--text); margin-bottom: 1rem; }
  .office-desc-text { font-size: 0.95rem; line-height: 1.8; color: #4b5563; margin-bottom: 2rem; }
  .services-list { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; }
  .service-item {
    display: flex; align-items: center; gap: 0.75rem;
    padding: 0.75rem 1rem; border-radius: 10px;
    background: white; border: 1px solid #e5e7eb;
    font-size: 0.9rem; font-weight: 500; color: var(--text);
    transition: all 0.2s;
  }
  .service-item:hover { border-color: var(--gold); transform: translateX(4px); }
  .service-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .info-card {
    background: white; border-radius: 16px; padding: 1.75rem;
    border: 1px solid #e5e7eb; margin-bottom: 1.5rem;
    box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  }
  .info-row { display: flex; gap: 0.75rem; margin-bottom: 1rem; }
  .info-row:last-child { margin-bottom: 0; }
  .info-icon { font-size: 1.25rem; flex-shrink: 0; }
  .info-label { font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px; }
  .info-value { font-size: 0.9rem; font-weight: 500; color: var(--text); }
  .back-btn {
    display: inline-flex; align-items: center; gap: 0.5rem;
    padding: 0.6rem 1.25rem; border-radius: 8px;
    background: transparent; border: 1px solid rgba(255,255,255,0.3);
    color: white; font-size: 0.8rem; font-weight: 500;
    cursor: pointer; transition: all 0.2s; text-transform: uppercase; letter-spacing: 0.5px;
    margin-bottom: 1.5rem; display: block; width: fit-content;
  }
  .back-btn:hover { background: rgba(255,255,255,0.15); border-color: rgba(255,255,255,0.5); }

  /* FOOTER */
  .footer {
    background: #060e1c; padding: 3rem;
    border-top: 1px solid rgba(201,168,76,0.15);
    text-align: center; color: rgba(255,255,255,0.35);
    font-size: 0.8rem;
  }
  .footer-logo { font-family: 'Playfair Display', serif; font-size: 1.25rem; color: var(--gold); margin-bottom: 0.5rem; font-weight: 700; }

  /* TRANSITIONS */
  .fade-in { opacity: 0; transform: translateY(24px); transition: opacity 0.7s var(--transition), transform 0.7s var(--transition); }
  .fade-in.visible { opacity: 1; transform: translateY(0); }
  .fade-in-delay-1 { transition-delay: 0.1s; }
  .fade-in-delay-2 { transition-delay: 0.2s; }
  .fade-in-delay-3 { transition-delay: 0.3s; }
  .fade-in-delay-4 { transition-delay: 0.4s; }

  .page-enter { animation: pageEnter 0.5s var(--transition) forwards; }
  @keyframes pageEnter { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }

  /* SCROLLBAR */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--navy); }
  ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.3); border-radius: 3px; }

  @media (max-width: 900px) {
    .hero-inner, .about-grid, .office-body-inner { grid-template-columns: 1fr; }
    .offices-grid { grid-template-columns: repeat(2, 1fr); }
    .hero-visual { display: none; }
    .stats-row { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
    .nav { padding: 1rem 1.5rem; }
    .nav-links { gap: 1rem; }
    .hero-content, .about-page, .offices-page, .office-body { padding-left: 1.5rem; padding-right: 1.5rem; }
  }
`;

function FadeSection({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`fade-in${inView ? " visible" : ""}`}
      style={{ transitionDelay: `${delay}s`, ...style }}
    >
      {children}
    </div>
  );
}

function Nav({ currentPage, navigateTo }) {
  const pages = ["home", "about", "offices"];
  return (
    <nav className="nav">
      <div className="nav-logo" onClick={() => navigateTo("home")}>
        <div className="nav-logo-icon">S</div>
        <div>
          <div className="nav-logo-text">Barangay Sinalhan</div>
          <div className="nav-logo-sub">Local Government Unit</div>
        </div>
      </div>
      <div className="nav-links">
        {pages.map((p) => (
          <button
            key={p}
            className={`nav-link${currentPage === p ? " active" : ""}`}
            onClick={() => navigateTo(p)}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
        <button className="nav-cta" onClick={() => navigateTo("offices")}>Our Offices</button>
      </div>
    </nav>
  );
}

function HeroPage({ navigateTo }) {
  return (
    <div className="page page-enter">
      <div className="hero">
        <div className="hero-grid" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-content" style={{ paddingTop: "100px" }}>
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
                  Welcome to
                  <span>Barangay Sinalhan</span>
                </h1>
              </FadeSection>
              <FadeSection delay={0.2}>
                <p className="hero-desc">
                  A local government committed to transparency, excellence, and genuine service for every resident. Access all our offices, services, and community programs here.
                </p>
              </FadeSection>
              <FadeSection delay={0.3}>
                <div className="hero-buttons">
                  <button className="btn-primary" onClick={() => navigateTo("offices")}>
                    Explore Offices →
                  </button>
                  <button className="btn-outline" onClick={() => navigateTo("about")}>
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
                    <div className="logo-seal-name">Barangay</div>
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
      <footer className="footer">
        <div className="footer-logo">Barangay LGU</div>
        <p>© 2025 Barangay Local Government Unit. All rights reserved.</p>
      </footer>
    </div>
  );
}

function AboutPage({ navigateTo }) {
  const officials = [
    { initials: "LL", name: "Ladis Lao Alicbusan", role: "Barangay Captain" },
    { initials: "LE", name: "Ladis Lao Alicbusan", role: "Barangay Kagawad" },
    { initials: "LQ", name: "Ladis Lao Alicbusan", role: "Barangay Kagawad" },
    { initials: "LW", name: "Ladis Lao Alicbusan", role: "Barangay Kagawad" },
    { initials: "LT", name: "Ladis Lao Alicbusan", role: "Barangay Treasurer" },
    { initials: "LY", name: "Ladis Lao Alicbusan", role: "Barangay Secretary" },
  ];
  const values = [
    { icon: "🤲", title: "Service", desc: "Dedicated to every resident's needs, always." },
    { icon: "⚖️", title: "Integrity", desc: "Transparent governance with accountability." },
    { icon: "🌱", title: "Progress", desc: "Sustainable growth for the community." },
    { icon: "🤝", title: "Unity", desc: "Building bonds and lasting partnerships." },
  ];
  return (
    <div className="page page-enter about-page">
      <div className="about-grid" style={{ paddingBottom: "4rem" }}>
        <div>
          <FadeSection>
            <p className="section-label">Who We Are</p>
            <h2 className="section-title">Serving with <span>Purpose</span></h2>
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
    </div>
  );
}

function OfficesPage({ navigateTo }) {
  return (
    <div className="page page-enter offices-page">
      <div className="offices-header">
        <FadeSection>
          <p className="section-label" style={{ textAlign: "center" }}>Barangay Departments</p>
          <h2 className="section-title" style={{ textAlign: "center", color: "white" }}>
            Our <span style={{ color: "var(--gold)" }}>Offices</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem", maxWidth: 480, margin: "0 auto" }}>
            Eight specialized departments serving the full needs of our community. Select an office to learn more.
          </p>
        </FadeSection>
      </div>
      <div className="offices-grid">
        {OFFICES.map((office, i) => (
          <FadeSection key={office.id} delay={i * 0.07}>
            <div
              className="office-card"
              onClick={() => navigateTo("office", office.id)}
              style={{ cursor: "pointer" }}
            >
              <div
                className="office-card-bg"
                style={{ background: office.bg }}
              />
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
    </div>
  );
}

function OfficeDetailPage({ officeId, navigateTo }) {
  const office = OFFICES.find((o) => o.id === officeId);
  if (!office) return null;
  return (
    <div className="office-detail-page page-enter">
      <div
        className="office-hero"
        style={{ background: office.bg }}
      >
        <div
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 100%)"
          }}
        />
        <div className="office-hero-content">
          <button className="back-btn" onClick={() => navigateTo("offices")}>
            ← Back to Offices
          </button>
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
              <p className="office-section-label" style={{ marginTop: "2rem" }}>Available Services</p>
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
                <p style={{ fontSize: "0.85rem", color: "#6b7280", lineHeight: 1.6 }}>
                  Please bring a valid government-issued ID and any relevant documents when visiting this office. Staff will guide you through the process.
                </p>
              </div>
              <button
                className="btn-primary"
                style={{ width: "100%", marginTop: "0.5rem", justifyContent: "center", display: "flex" }}
                onClick={() => navigateTo("offices")}
              >
                View All Offices
              </button>
            </FadeSection>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-logo">Barangay LGU</div>
        <p>© 2025 Barangay Local Government Unit. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedOffice, setSelectedOffice] = useState(null);

  const navigateTo = (page, officeId = null) => {
    setCurrentPage(page);
    if (officeId) setSelectedOffice(officeId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activePage = selectedOffice && currentPage === "office" ? "office" : currentPage;

  return (
    <>
      <style>{styles}</style>
      <Nav currentPage={currentPage === "office" ? "offices" : currentPage} navigateTo={navigateTo} />
      {activePage === "home" && <HeroPage navigateTo={navigateTo} />}
      {activePage === "about" && <AboutPage navigateTo={navigateTo} />}
      {activePage === "offices" && <OfficesPage navigateTo={navigateTo} />}
      {activePage === "office" && <OfficeDetailPage officeId={selectedOffice} navigateTo={navigateTo} />}
    </>
  );
}