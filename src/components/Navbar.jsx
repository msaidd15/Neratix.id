import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar({ trialPage = false }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = (event) => {
    event.preventDefault();
    setOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const links = [
    { href: trialPage ? "/#kursus" : "#kursus", label: trialPage ? "Daftar Kursus" : "Materi Pembelajaran" },
    { href: trialPage ? "/#program" : "#program", label: "Program Kursus" },
    { href: trialPage ? "/#metode" : "#metode", label: "Metode" },
    { href: trialPage ? "/#faq" : "#faq", label: "FAQ" },
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <Link to="/" onClick={handleLogoClick}>
            <img src="/asset/img/NeratixLogo.png" alt="Neratix Logo" />
          </Link>
        </div>
        <button className="hamburger" onClick={() => setOpen((v) => !v)} type="button" aria-label="Toggle menu">
          <i className="fas fa-bars"></i>
        </button>
        <ul className={`nav-menu ${open ? "active" : ""}`}>
          {links.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#form" className="get-started-btn" onClick={() => setOpen(false)}>
              Daftar
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
