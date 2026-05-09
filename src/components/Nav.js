import { useState } from "react";

export default function Nav({ onNavClick }) {
  const [menuOpen, setMenuOpen] = useState(false);


  const handleClick = (id) => {
    setMenuOpen(false);
    onNavClick(id);
  };

  return (
    <>
      <nav className="nav">
        <div className="nav-logo" onClick={() => handleClick("home")}>
          <div className="nav-logo-icon">B</div>
          <div>
            <div className="nav-logo-text">Barangay Sinalhan</div>
            <div className="nav-logo-sub">LGU</div>
          </div>
        </div>
        {/* Desktop links */}
        <div className="nav-links">
          <button className="nav-link" onClick={() => handleClick("home")}>
            Home
          </button>
          <button className="nav-link" onClick={() => handleClick("about")}>
            About
          </button>
          <button className="nav-link" onClick={() => handleClick("offices")}>
            Offices
          </button>
          <button className="nav-cta" onClick={() => handleClick("offices")}>
            Our Offices
          </button>
        </div>
        {/* Hamburger */}
        <button
          className={`nav-hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
      {/* Mobile / Tablet drawer */}
      <div className={`nav-drawer${menuOpen ? " open" : ""}`}>
        <button className="nav-drawer-link" onClick={() => handleClick("home")}>
          Home
        </button>
        <button className="nav-drawer-link" onClick={() => handleClick("about")}>
          About
        </button>
        <button
          className="nav-drawer-link"
          onClick={() => handleClick("offices")}
        >
          Offices
        </button>
        <button className="nav-drawer-cta" onClick={() => handleClick("offices")}>
          Our Offices
        </button>
      </div>
    </>
  );
}

