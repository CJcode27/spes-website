import { useEffect, useRef, useState } from "react";

import Nav from "./components/Nav";
import MainPage from "./components/MainPage";
import OfficeDetailPage from "./components/OfficeDetailPage";

const OFFICES = [
  {
    id: "bhw1",
    name: "BHW 1",
    subtitle: "Barangay Health Worker 1",
    icon: "🏥",
    accent: "#2ecc71",
    bg: "linear-gradient(135deg, #0d3d2b 0%, #1a6b4a 50%, #0d3d2b 100%)",
    description:
      "Primary health services and community wellness programs for Zone 1 residents.",
    services: [
      "Health Consultations",
      "Immunization Records",
      "Prenatal Monitoring",
      "Blood Pressure Check",
      "Health Certificates",
    ],
    schedule: "Monday – Friday, 8:00 AM – 5:00 PM",
    contact: "BHW Team 1 – Ext. 101",
  },
  {
    id: "bhw2",
    name: "BHW 2",
    subtitle: "Barangay Health Worker 2",
    icon: "💉",
    accent: "#3498db",
    bg: "linear-gradient(135deg, #0d2b3d 0%, #1a4b6b 50%, #0d2b3d 100%)",
    description:
      "Secondary health services and wellness initiatives for Zone 2 and extended communities.",
    services: [
      "Medical Referrals",
      "Child Health Monitoring",
      "Nutritional Assessments",
      "Family Planning",
      "Wound Dressing",
    ],
    schedule: "Monday – Friday, 8:00 AM – 5:00 PM",
    contact: "BHW Team 2 – Ext. 102",
  },
  {
    id: "philhealth",
    name: "PhilHealth",
    subtitle: "Health Insurance Corporation",
    icon: "🛡️",
    accent: "#9b59b6",
    bg: "linear-gradient(135deg, #2b0d3d 0%, #4a1a6b 50%, #2b0d3d 100%)",
    description:
      "National health insurance enrollment, contributions, and benefit processing.",
    services: [
      "Member Registration",
      "Contribution Payments",
      "Benefit Availment",
      "MDR Printing",
      "Coverage Inquiries",
    ],
    schedule: "Monday – Friday, 8:00 AM – 5:00 PM",
    contact: "PhilHealth Desk – Ext. 103",
  },
  {
    id: "badac",
    name: "BADAC",
    subtitle: "Barangay Anti-Drug Abuse Council",
    icon: "⚖️",
    accent: "#e67e22",
    bg: "linear-gradient(135deg, #3d1e0d 0%, #6b3a1a 50%, #3d1e0d 100%)",
    description:
      "Community drug prevention, rehabilitation coordination, and anti-drug awareness campaigns.",
    services: [
      "Drug Testing Referrals",
      "Community Seminars",
      "Rehabilitation Coordination",
      "Case Monitoring",
      "Awareness Programs",
    ],
    schedule: "Monday – Friday, 8:00 AM – 5:00 PM",
    contact: "BADAC Office – Ext. 104",
  },
  {
    id: "office",
    name: "Office",
    subtitle: "Barangay Main Office",
    icon: "🏛️",
    accent: "#2980b9",
    bg: "linear-gradient(135deg, #0d1a3d 0%, #1a2f6b 50%, #0d1a3d 100%)",
    description:
      "Central administrative hub for all barangay governance, records, and public services.",
    services: [
      "Residency Certificates",
      "Barangay IDs",
      "Business Permits",
      "Indigency Certificates",
      "Official Documents",
    ],
    schedule: "Monday – Friday, 8:00 AM – 5:00 PM",
    contact: "Main Office – Ext. 100",
  },
  {
    id: "vawc",
    name: "VAWC",
    subtitle: "Violence Against Women & Children",
    icon: "💙",
    accent: "#e91e8c",
    bg: "linear-gradient(135deg, #3d0d20 0%, #6b1a3a 50%, #3d0d20 100%)",
    description:
      "Support, protection, and legal assistance for women and children victims of violence.",
    services: [
      "Case Filing",
      "Legal Assistance Referral",
      "Counseling",
      "Protection Orders",
      "Safe House Coordination",
    ],
    schedule: "Monday – Friday, 8:00 AM – 5:00 PM",
    contact: "VAWC Desk – Ext. 105",
  },
  {
    id: "clearance",
    name: "Clearance",
    subtitle: "Barangay Clearance Office",
    icon: "📋",
    accent: "#27ae60",
    bg: "linear-gradient(135deg, #143d0d 0%, #2a6b1a 50%, #143d0d 100%)",
    description:
      "Issuance of barangay clearances for employment, legal, business, and personal purposes.",
    services: [
      "Employment Clearance",
      "Business Clearance",
      "NBI Clearance Support",
      "Police Clearance Support",
      "Court Clearance",
    ],
    schedule: "Monday – Friday, 8:00 AM – 5:00 PM",
    contact: "Clearance Office – Ext. 106",
  },
  {
    id: "lupon",
    name: "Lupon",
    subtitle: "Lupong Tagapamayapa",
    icon: "🤝",
    accent: "#f39c12",
    bg: "linear-gradient(135deg, #3d320d 0%, #6b5a1a 50%, #3d320d 100%)",
    description:
      "Community dispute resolution and mediation services for peaceful settlement of conflicts.",
    services: [
      "Dispute Mediation",
      "Conciliation Proceedings",
      "Barangay Justice",
      "Settlement Agreements",
      "Case Records",
    ],
    schedule: "Monday – Friday, 8:00 AM – 5:00 PM",
    contact: "Lupon Secretariat – Ext. 107",
  },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --gold: #c9a84c;
    --gold-light: #e8cc7a;
    --navy: #0a1628;
    --navy-mid: #112040;
    --cream: #f5f0e8;
    --text: #1a1a2e;
    --text-muted: #6b7280;
    --white: #ffffff;
    --T: cubic-bezier(0.4, 0, 0.2, 1);
  }

  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; background: var(--navy); color: var(--white); overflow-x: hidden; }

  /* ── NAV ── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0.875rem 3rem;
    background: rgba(10,22,40,0.95);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(201,168,76,0.2);
    transition: padding 0.3s var(--T);
  }
  .nav-logo { display: flex; align-items: center; gap: 0.75rem; cursor: pointer; transition: opacity 0.2s; flex-shrink: 0; }
  .nav-logo:hover { opacity: 0.85; }
  .nav-logo-icon {
    width: 40px; height: 40px; border-radius: 50%;
    background: linear-gradient(135deg, var(--gold), var(--gold-light));
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; font-weight: 700; color: var(--navy);
    font-family: 'Playfair Display', serif;
    border: 2px solid rgba(255,255,255,0.15); flex-shrink: 0;
  }
  .nav-logo-text { font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 600; color: var(--gold); line-height: 1.1; }
  .nav-logo-sub { font-size: 0.6rem; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 1px; }
  .nav-links { display: flex; gap: 1.75rem; align-items: center; }
  .nav-link {
    font-size: 0.8rem; font-weight: 500; letter-spacing: 0.5px;
    color: rgba(255,255,255,0.7); cursor: pointer;
    transition: color 0.2s; text-transform: uppercase;
    background: none; border: none; padding: 0; white-space: nowrap;
  }
  .nav-link:hover { color: var(--gold); }
  .nav-cta {
    padding: 0.45rem 1.1rem; border-radius: 6px;
    background: var(--gold); color: var(--navy);
    font-size: 0.75rem; font-weight: 600; cursor: pointer;
    border: none; transition: all 0.2s; text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap;
  }
  .nav-cta:hover { background: var(--gold-light); transform: translateY(-1px); }

  /* Hamburger */
  .nav-hamburger {
    display: none; flex-direction: column; justify-content: center; gap: 5px;
    width: 36px; height: 36px; cursor: pointer; background: none; border: none; padding: 4px;
    border-radius: 6px; transition: background 0.2s;
  }
  .nav-hamburger:hover { background: rgba(255,255,255,0.08); }
  .nav-hamburger span {
    display: block; width: 100%; height: 2px;
    background: var(--gold); border-radius: 2px;
    transition: all 0.3s var(--T); transform-origin: center;
  }
  .nav-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .nav-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .nav-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  /* Mobile drawer */
  .nav-drawer {
    display: none; position: fixed; top: 65px; left: 0; right: 0; z-index: 190;
    background: rgba(8,18,34,0.98); backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(201,168,76,0.2);
    flex-direction: column; padding: 1.25rem 1.5rem 1.5rem;
    gap: 0.25rem;
    transform: translateY(-10px); opacity: 0;
    transition: transform 0.3s var(--T), opacity 0.3s var(--T);
    pointer-events: none;
  }
  .nav-drawer.open { transform: translateY(0); opacity: 1; pointer-events: all; }
  .nav-drawer-link {
    padding: 0.875rem 1rem; border-radius: 8px; cursor: pointer;
    font-size: 0.9rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;
    color: rgba(255,255,255,0.75); background: none; border: none; text-align: left;
    transition: all 0.2s;
  }
  .nav-drawer-link:hover { color: var(--gold); background: rgba(201,168,76,0.08); }
  .nav-drawer-cta {
    margin-top: 0.5rem; padding: 0.875rem; border-radius: 8px;
    background: var(--gold); color: var(--navy);
    font-size: 0.85rem; font-weight: 700; cursor: pointer;
    border: none; text-transform: uppercase; letter-spacing: 0.5px; text-align: center;
    transition: all 0.2s;
  }
  .nav-drawer-cta:hover { background: var(--gold-light); }

  /* ── HERO ── */
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
  .hero-orb { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; }
  .hero-orb-1 { width: 500px; height: 500px; background: rgba(201,168,76,0.06); top: -100px; right: -100px; }
  .hero-orb-2 { width: 300px; height: 300px; background: rgba(26,48,96,0.5); bottom: 100px; left: -50px; }
  .hero-content { padding: 6rem 3rem 3rem; max-width: 1200px; margin: 0 auto; width: 100%; position: relative; z-index: 1; }
  .hero-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 0.5rem;
    padding: 0.4rem 1rem; border-radius: 100px;
    border: 1px solid rgba(201,168,76,0.4); background: rgba(201,168,76,0.08);
    font-size: 0.72rem; font-weight: 500; letter-spacing: 1px;
    text-transform: uppercase; color: var(--gold); margin-bottom: 1.5rem;
  }
  .hero-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--gold); animation: pulse 2s infinite; flex-shrink: 0; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
  .hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 5vw, 4rem); font-weight: 700; line-height: 1.1;
    color: var(--white); margin-bottom: 1.25rem;
  }
  .hero-title span { color: var(--gold); display: block; }
  .hero-desc { font-size: clamp(0.9rem, 2vw, 1.05rem); line-height: 1.75; color: rgba(255,255,255,0.65); margin-bottom: 2rem; max-width: 480px; }
  .hero-buttons { display: flex; gap: 1rem; flex-wrap: wrap; }
  .btn-primary {
    padding: 0.8rem 1.75rem; border-radius: 8px;
    background: linear-gradient(135deg, var(--gold), var(--gold-light));
    color: var(--navy); font-weight: 600; font-size: 0.875rem;
    border: none; cursor: pointer; transition: all 0.3s var(--T);
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(201,168,76,0.35); }
  .btn-outline {
    padding: 0.8rem 1.75rem; border-radius: 8px;
    background: transparent; color: var(--white); font-weight: 500; font-size: 0.875rem;
    border: 1px solid rgba(255,255,255,0.3); cursor: pointer; transition: all 0.3s var(--T);
  }
  .btn-outline:hover { border-color: var(--gold); color: var(--gold); transform: translateY(-2px); }

  /* Hero visual */
  .hero-visual { display: flex; align-items: center; justify-content: center; }
  .logo-seal {
    width: clamp(220px, 28vw, 320px); height: clamp(220px, 28vw, 320px); border-radius: 50%;
    background: linear-gradient(135deg, rgba(201,168,76,0.1), rgba(201,168,76,0.05));
    border: 2px solid rgba(201,168,76,0.3);
    display: flex; align-items: center; justify-content: center;
    position: relative; animation: float 6s ease-in-out infinite;
  }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
  .logo-seal::before {
    content:''; position:absolute; inset:-12px; border-radius:50%;
    border:1px dashed rgba(201,168,76,0.2); animation:spin 30s linear infinite;
  }
  @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  .logo-seal-inner { text-align: center; padding: 1rem; }
  .logo-seal-emblem { font-size: clamp(50px, 8vw, 80px); line-height: 1; margin-bottom: 0.5rem; }
  .logo-seal-name { font-family: 'Playfair Display', serif; font-size: clamp(0.75rem, 1.5vw, 1.1rem); font-weight: 700; color: var(--gold); letter-spacing: 2px; text-transform: uppercase; }
  .logo-seal-tagline { font-size: 0.6rem; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin-top: 0.25rem; text-transform: uppercase; }

  /* ── STATS ROW ── */
  .stats-row {
    background: rgba(201,168,76,0.06);
    border-top: 1px solid rgba(201,168,76,0.15); border-bottom: 1px solid rgba(201,168,76,0.15);
    padding: 1.75rem 3rem; display: grid; grid-template-columns: repeat(4, 1fr);
  }
  .stat-item { text-align: center; padding: 0.25rem; }
  .stat-number { font-family: 'Playfair Display', serif; font-size: clamp(1.4rem, 3vw, 2rem); font-weight: 700; color: var(--gold); }
  .stat-label { font-size: 0.7rem; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 1px; margin-top: 0.2rem; }

  /* ── SECTION DIVIDER ── */
  .section-divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent); }

  /* ── ABOUT SECTION ── */
  .about-section {
    padding: 5rem 3rem;
    background: linear-gradient(180deg, var(--navy) 0%, #0f1f3d 50%, var(--navy) 100%);
  }
  .section-label { font-size: 0.72rem; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; color: var(--gold); margin-bottom: 0.875rem; }
  .section-title { font-family: 'Playfair Display', serif; font-size: clamp(1.75rem, 4vw, 3rem); font-weight: 700; line-height: 1.15; color: var(--white); margin-bottom: 1.25rem; }
  .section-title span { color: var(--gold); }
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; max-width: 1200px; margin: 0 auto; }
  .about-desc { font-size: 0.95rem; line-height: 1.8; color: rgba(255,255,255,0.65); margin-bottom: 1.25rem; }
  .divider { width: 60px; height: 3px; background: linear-gradient(90deg, var(--gold), transparent); margin-bottom: 1.75rem; }
  .values-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.875rem; margin-top: 1.75rem; }
  .value-card {
    padding: 1.1rem; border-radius: 12px;
    background: rgba(201,168,76,0.05); border: 1px solid rgba(201,168,76,0.15);
    transition: all 0.3s var(--T);
  }
  .value-card:hover { background: rgba(201,168,76,0.1); transform: translateY(-3px); border-color: rgba(201,168,76,0.35); }
  .value-icon { font-size: 1.4rem; margin-bottom: 0.4rem; }
  .value-title { font-weight: 600; font-size: 0.85rem; color: var(--gold); margin-bottom: 0.2rem; }
  .value-desc { font-size: 0.78rem; color: rgba(255,255,255,0.5); line-height: 1.5; }
  .officials-title { font-family: 'Playfair Display', serif; font-size: 1.4rem; color: var(--white); margin-bottom: 1.25rem; font-weight: 600; }
  .official-item {
    display: flex; align-items: center; gap: 0.875rem;
    padding: 0.875rem; border-radius: 10px;
    border-bottom: 1px solid rgba(255,255,255,0.06); transition: background 0.2s;
  }
  .official-item:hover { background: rgba(255,255,255,0.04); }
  .official-avatar {
    width: 42px; height: 42px; border-radius: 50%; flex-shrink: 0;
    background: linear-gradient(135deg, var(--gold), var(--gold-light));
    display: flex; align-items: center; justify-content: center;
    font-size: 0.72rem; font-weight: 700; color: var(--navy);
  }
  .official-name { font-weight: 500; font-size: 0.875rem; color: var(--white); }
  .official-role { font-size: 0.72rem; color: rgba(255,255,255,0.45); margin-top: 2px; }

  /* ── OFFICES SECTION ── */
  .offices-section { padding: 5rem 3rem; background: var(--navy); display: flex; flex-direction: column; align-items: center; }
  .offices-header { text-align: center; margin-bottom: 2.5rem; width: 100%; }
  .offices-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.1rem; width: 100%; max-width: 1200px;
  }
  .office-card {
    position: relative; border-radius: 14px; overflow: hidden; cursor: pointer;
    transition: all 0.4s var(--T); border: 1px solid rgba(255,255,255,0.08);
    height: 210px; display: flex; flex-direction: column; justify-content: flex-end;
  }
  .office-card:hover { transform: translateY(-6px) scale(1.02); border-color: rgba(201,168,76,0.5); box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
  .office-card-bg { position: absolute; inset: 0; transition: transform 0.4s var(--T); }
  .office-card:hover .office-card-bg { transform: scale(1.08); }
  .office-card-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%); }
  .office-card-content { position: relative; z-index: 1; padding: 1.1rem; }
  .office-card-icon { font-size: 1.85rem; margin-bottom: 0.4rem; display: block; transition: transform 0.3s; }
  .office-card:hover .office-card-icon { transform: scale(1.1); }
  .office-card-name { font-family: 'Playfair Display', serif; font-size: 1.05rem; font-weight: 700; color: var(--white); margin-bottom: 0.15rem; }
  .office-card-sub { font-size: 0.65rem; color: rgba(255,255,255,0.55); text-transform: uppercase; letter-spacing: 0.5px; }
  .office-card-arrow {
    position: absolute; top: 0.875rem; right: 0.875rem;
    width: 30px; height: 30px; border-radius: 50%;
    background: rgba(201,168,76,0.2); border: 1px solid rgba(201,168,76,0.4);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.85rem; transition: all 0.3s; opacity: 0; transform: translateX(-5px);
  }
  .office-card:hover .office-card-arrow { opacity: 1; transform: translateX(0); background: var(--gold); color: var(--navy); }

  /* ── OFFICE DETAIL PAGE ── */
  .office-detail-page { min-height: 100vh; display: flex; flex-direction: column; animation: pageEnter 0.5s var(--T) forwards; }
  @keyframes pageEnter { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
  .office-hero { min-height: 38vh; position: relative; display: flex; align-items: flex-end; padding: 2.5rem 3rem; }
  .office-hero-content { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; width: 100%; }
  .office-hero-icon { font-size: 2.75rem; margin-bottom: 0.6rem; display: block; }
  .office-hero-title { font-family: 'Playfair Display', serif; font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 700; color: white; }
  .office-hero-sub { font-size: clamp(0.85rem, 2vw, 1rem); color: rgba(255,255,255,0.7); margin-top: 0.4rem; }
  .office-body { flex: 1; padding: 3rem; background: var(--cream); color: var(--text); }
  .office-body-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr; gap: 3rem; }
  .office-section-label { font-size: 0.68rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.6rem; }
  .office-section-title { font-family: 'Playfair Display', serif; font-size: 1.4rem; font-weight: 700; color: var(--text); margin-bottom: 0.875rem; }
  .office-desc-text { font-size: 0.92rem; line-height: 1.8; color: #4b5563; margin-bottom: 1.75rem; }
  .services-list { list-style: none; display: flex; flex-direction: column; gap: 0.45rem; }
  .service-item {
    display: flex; align-items: center; gap: 0.75rem;
    padding: 0.7rem 0.875rem; border-radius: 10px;
    background: white; border: 1px solid #e5e7eb;
    font-size: 0.875rem; font-weight: 500; color: var(--text); transition: all 0.2s;
  }
  .service-item:hover { border-color: var(--gold); transform: translateX(4px); }
  .service-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .info-card { background: white; border-radius: 14px; padding: 1.5rem; border: 1px solid #e5e7eb; margin-bottom: 1.25rem; box-shadow: 0 4px 16px rgba(0,0,0,0.06); }
  .info-row { display: flex; gap: 0.75rem; margin-bottom: 0.875rem; }
  .info-row:last-child { margin-bottom: 0; }
  .info-icon { font-size: 1.2rem; flex-shrink: 0; margin-top: 2px; }
  .info-label { font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px; }
  .info-value { font-size: 0.875rem; font-weight: 500; color: var(--text); }

  /* ── FOOTER ── */
  .footer { background: #060e1c; padding: 2.5rem 3rem; border-top: 1px solid rgba(201,168,76,0.15); text-align: center; color: rgba(255,255,255,0.35); font-size: 0.78rem; }
  .footer-logo { font-family: 'Playfair Display', serif; font-size: 1.2rem; color: var(--gold); margin-bottom: 0.4rem; font-weight: 700; }

  /* ── FADE IN ── */
  .fade-in { opacity: 0; transform: translateY(22px); transition: opacity 0.65s var(--T), transform 0.65s var(--T); }
  .fade-in.visible { opacity: 1; transform: translateY(0); }

  /* ── SCROLLBAR ── */
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: var(--navy); }
  ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.3); border-radius: 3px; }

  /* ════════════════════════════════════════
     TABLET  601px – 900px
  ════════════════════════════════════════ */
  @media (max-width: 900px) {
    .nav { padding: 0.875rem 1.75rem; }
    .nav-links { display: none; }
    .nav-hamburger { display: flex; }
    .nav-drawer { display: flex; }

    .hero-content { padding: 5.5rem 1.75rem 2.5rem; }
    .hero-inner { grid-template-columns: 1fr; gap: 0; }
    .hero-visual { display: none; }
    .hero-desc { max-width: 100%; }

    .stats-row { grid-template-columns: repeat(2, 1fr); gap: 0; padding: 1.5rem 1.75rem; }
    .stat-item { padding: 0.75rem; border-bottom: 1px solid rgba(201,168,76,0.08); }
    .stat-item:nth-child(1), .stat-item:nth-child(2) { border-bottom: 1px solid rgba(201,168,76,0.08); }

    .about-section { padding: 4rem 1.75rem; }
    .about-grid { grid-template-columns: 1fr; gap: 2.5rem; }

    .offices-section { padding: 4rem 1.75rem; }
    .offices-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
    .office-card { height: 190px; }

    .office-hero { padding: 2rem 1.75rem; min-height: 32vh; }
    .office-body { padding: 2rem 1.75rem; }
    .office-body-inner { grid-template-columns: 1fr; gap: 1.5rem; }

    .footer { padding: 2rem 1.75rem; }
  }

  /* ════════════════════════════════════════
     MOBILE  ≤ 600px
  ════════════════════════════════════════ */
  @media (max-width: 600px) {
    .nav { padding: 0.75rem 1.1rem; }
    .nav-logo-sub { display: none; }
    .nav-drawer { top: 60px; padding: 1rem 1.1rem 1.25rem; }

    .hero-content { padding: 4.75rem 1.1rem 2rem; }
    .hero-badge { font-size: 0.65rem; padding: 0.35rem 0.75rem; }
    .hero-buttons { flex-direction: column; }
    .btn-primary, .btn-outline { width: 100%; text-align: center; padding: 0.875rem; }

    .stats-row { grid-template-columns: repeat(2, 1fr); padding: 1.25rem 1.1rem; gap: 0; }
    .stat-item { padding: 0.6rem 0.25rem; }
    .stat-number { font-size: 1.35rem; }
    .stat-label { font-size: 0.6rem; }

    .about-section { padding: 3rem 1.1rem; }
    .values-grid { grid-template-columns: 1fr; gap: 0.75rem; }

    .offices-section { padding: 3rem 1.1rem; }
    .offices-grid { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
    .office-card { height: 165px; }
    .office-card-icon { font-size: 1.5rem; }
    .office-card-name { font-size: 0.9rem; }
    .office-card-sub { font-size: 0.58rem; }

    .office-hero { padding: 1.5rem 1.1rem; min-height: 30vh; }
    .office-body { padding: 1.5rem 1.1rem; }
    .info-card { padding: 1.1rem; }
    .services-list { gap: 0.35rem; }
    .service-item { font-size: 0.82rem; padding: 0.6rem 0.75rem; }

    .footer { padding: 1.75rem 1.1rem; }
  }

  /* ════════════════════════════════════════
     LARGE DESKTOP  ≥ 1400px
  ════════════════════════════════════════ */
  @media (min-width: 1400px) {
    .hero-content { max-width: 1400px; }
    .about-grid { max-width: 1400px; }
    .offices-grid { max-width: 1400px; }
    .office-body-inner { max-width: 1400px; }
  }
`;

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function App() {
  const [selectedOffice, setSelectedOffice] = useState(null);
  const pendingScroll = useRef(null);

  const handleOfficeClick = (id) => {
    setSelectedOffice(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setSelectedOffice(null);
    pendingScroll.current = "offices";
  };

  const handleNavClick = (sectionId) => {
    if (selectedOffice) {
      setSelectedOffice(null);
      pendingScroll.current = sectionId;
    } else {
      scrollToId(sectionId);
    }
  };

  useEffect(() => {
    if (!selectedOffice && pendingScroll.current) {
      const target = pendingScroll.current;
      pendingScroll.current = null;
      setTimeout(() => {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 80);
    }
  }, [selectedOffice]);

  const office = selectedOffice ? OFFICES.find((o) => o.id === selectedOffice) : null;

  return (
    <>
      <style>{styles}</style>
      <Nav onNavClick={handleNavClick} />
      {selectedOffice ? (
        <OfficeDetailPage office={office} onBack={handleBack} />
      ) : (
        <MainPage onOfficeClick={handleOfficeClick} offices={OFFICES} />
      )}
    </>
  );
}

