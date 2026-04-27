import { useLanguage } from "../context/LanguageContext";

function Footer() {
  const { t } = useLanguage();
  const footer = t.footer;

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-section">
          <h4>Neratix Academy</h4>
          <p>{footer.tagline}</p>
        </div>
        <div className="footer-section">
          <h4>{footer.menuTitle}</h4>
          <a href="/#kursus">{footer.menuLinks.courses}</a>
          <a href="/#program">{footer.menuLinks.program}</a>
          <a href="/#faq">{footer.menuLinks.faq}</a>
        </div>
        <div className="footer-section">
          <h4>{footer.contactTitle}</h4>
          <a href="tel:+628123456789">+62 812-3456-789</a>
          <a href="mailto:info@neratix.id">info@neratix.id</a>
        </div>
      </div>
      <div className="footer-bottom">&copy; 2026 Neratix Academy. {footer.copyright}</div>
    </footer>
  );
}

export default Footer;
