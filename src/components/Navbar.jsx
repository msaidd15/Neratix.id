import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const LANGUAGE_OPTIONS = [{ code: "id" }, { code: "en" }];

function Navbar({ trialPage = false }) {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setLangOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoClick = (event) => {
    event.preventDefault();
    setOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const links = [
    {
      href: trialPage ? "/#kursus" : "#kursus",
      label: trialPage ? t.navbar.coursesTrial : t.navbar.links.courses,
    },
    { href: trialPage ? "/#program" : "#program", label: t.navbar.links.programs },
    { href: trialPage ? "/#metode" : "#metode", label: t.navbar.links.method },
    { href: trialPage ? "/#faq" : "#faq", label: t.navbar.links.faq },
  ];

  const activeLanguage = LANGUAGE_OPTIONS.find((item) => item.code === language) ?? LANGUAGE_OPTIONS[0];

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
          <li className="nav-language-item" ref={langRef}>
            <button
              type="button"
              className="nav-language-btn"
              aria-label={t.navbar.languageMenuLabel}
              onClick={() => setLangOpen((value) => !value)}
            >
              <span className={`lang-flag flag-${activeLanguage.code}`}></span>
              <span className="lang-code">{language.toUpperCase()}</span>
              <span className="lang-caret">{langOpen ? "▲" : "▼"}</span>
            </button>
            <div className={`nav-language-menu ${langOpen ? "show" : ""}`}>
              {LANGUAGE_OPTIONS.map((item) => (
                <button
                  type="button"
                  key={item.code}
                  className={`nav-language-option ${language === item.code ? "active" : ""}`}
                  onClick={() => {
                    setLanguage(item.code);
                    setLangOpen(false);
                    setOpen(false);
                  }}
                >
                  <span className={`lang-flag flag-${item.code}`}></span>
                  <span>{t.navbar.languages[item.code]}</span>
                </button>
              ))}
            </div>
          </li>
          <li>
            <a href="#form" className="get-started-btn" onClick={() => setOpen(false)}>
              {t.navbar.cta}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
