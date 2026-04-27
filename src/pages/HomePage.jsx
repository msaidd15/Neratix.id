import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import EnrollmentForm from "../components/EnrollmentForm";
import ProgramModal from "../components/ProgramModal";
import SuccessModal from "../components/SuccessModal";
import { useLanguage } from "../context/LanguageContext";

function HomePage() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [modalKey, setModalKey] = useState(null);
  const [modalVariant, setModalVariant] = useState("program");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPromoPopup, setShowPromoPopup] = useState(false);
  const [showFloating, setShowFloating] = useState(true);
  const { language, t } = useLanguage();
  const home = t.home;

  const [statValues, setStatValues] = useState(home.stats.map(() => 0));
  const statsRef = useRef(null);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return undefined;

    setStatValues(home.stats.map(() => 0));

    let started = false;
    let rafId = 0;

    const animate = () => {
      if (started) return;
      started = true;
      const start = performance.now();
      const duration = 1500;

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        setStatValues(home.stats.map((item) => Math.floor(progress * item.target)));

        if (progress < 1) {
          rafId = requestAnimationFrame(tick);
        } else {
          setStatValues(home.stats.map((item) => item.target));
        }
      };

      rafId = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [home.stats]);

  useEffect(() => {
    const promoTimer = setTimeout(() => {
      setShowPromoPopup(true);
    }, 3000);

    return () => clearTimeout(promoTimer);
  }, []);

  const whatsappMessage =
    language === "en"
      ? "Hello, I would like to get more information about Neratix Academy robotics courses."
      : "Halo kak, saya ingin mendapatkan informasi lebih lanjut mengenai program kursus robotika di Neratix Academy.";

  return (
    <>
      <section className="hero">
        <video className="hero-video" autoPlay muted loop playsInline>
          <source src="/asset/video/lego.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>{home.heroTitle}</h1>
          <p>{home.heroSubtitle}</p>
          <div className="hero-buttons">
            <a href="#form" className="btn-primary">
              {home.registerNow}
            </a>
            <Link to="/coba-gratis" className="btn-secondary">
              {home.tryFree}
            </Link>
          </div>
        </div>
      </section>

      {showFloating && (
        <div className="floating-container" id="floatingBox">
          <button
            className="floating-close"
            id="closeBtn"
            onClick={() => setShowFloating(false)}
            type="button"
            aria-label={home.closeFloatingAria}
          >
            &#10005;
          </button>
          <a
            href={`https://wa.me/6282279258938?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noreferrer"
            className="floating-btn"
            aria-label={home.whatsappAria}
          >
            <i className="fab fa-whatsapp"></i>
          </a>
        </div>
      )}

      <section className="stats-testi" ref={statsRef}>
        <div className="container">
          <div className="stats-grid">
            {home.stats.map((item, index) => (
              <div className="stat-item" key={item.label}>
                <div className="stat-number">{`${statValues[index]}${item.suffix}`}</div>
                <div>{item.label}</div>
              </div>
            ))}
          </div>
          <div className="testimonials-carousel">
            <div className="carousel-track" id="carouselTrack">
              {[...home.testimonials, ...home.testimonials.slice(0, 3)].map((item, idx) => (
                <div className="testimonial-card" key={`${item.key}-${idx}`}>
                  <div className="testimonial-avatar">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <h4 className="testimonial-name">{item.name}</h4>
                  <span className="testimonial-age">{item.age}</span>
                  <p className="testimonial-text">{item.text}</p>
                  <a
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                      setModalVariant("testimonial");
                      setModalKey(item.key);
                    }}
                    className="testimonial-link"
                  >
                    {home.readMore} &rarr;
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h3>{home.aboutTitle}</h3>
              <p>{home.aboutParagraphs[0]}</p>
              <p>{home.aboutParagraphs[1]}</p>
            </div>
            <div className="about-image">
              <img src="/asset/img/kids.png" alt={home.aboutImageAlt} />
            </div>
          </div>
        </div>
      </section>

      <section id="kursus">
        <div className="container">
          <h2 className="section-title">{home.learnTitle}</h2>
          <div className="learning-grid">
            <div className="learning-card">
              <i className="fas fa-robot"></i>
              <h4>{home.learningItems[0]}</h4>
            </div>
            <div className="learning-card">
              <i className="fas fa-code"></i>
              <h4>{home.learningItems[1]}</h4>
            </div>
            <div className="learning-card">
              <i className="fas fa-gamepad"></i>
              <h4>{home.learningItems[2]}</h4>
            </div>
            <div className="learning-card">
              <i className="fas fa-lightbulb"></i>
              <h4>{home.learningItems[3]}</h4>
            </div>
          </div>
        </div>
      </section>

      <section id="program">
        <div className="container">
          <h2 className="section-title">{home.programTitle}</h2>
          <div className="program-grid">
            {home.programCards.map((card) => (
              <div
                className="program-card"
                key={card.key}
                onClick={() => {
                  setModalVariant("program");
                  setModalKey(card.key);
                }}
              >
                <img src={card.image} alt={card.imageAlt} />
                <h4>
                  {card.title}
                  <span>({card.ageRange})</span>
                </h4>
                <ul className="program-list">
                  {card.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="metode" className="metode">
        <div className="container">
          <h2 className="section-title">{home.methodTitle}</h2>
          <div className="metode-grid">
            <div className="metode-card">
              <i className="fas fa-project-diagram"></i>
              <h4>{home.methodItems[0]}</h4>
            </div>
            <div className="metode-card">
              <i className="fas fa-tools"></i>
              <h4>{home.methodItems[1]}</h4>
            </div>
            <div className="metode-card">
              <i className="fas fa-smile"></i>
              <h4>{home.methodItems[2]}</h4>
            </div>
            <div className="metode-card">
              <i className="fas fa-user-graduate"></i>
              <h4>{home.methodItems[3]}</h4>
            </div>
          </div>
        </div>
      </section>

      <section id="faq">
        <div className="container">
          <h2 className="section-title">{home.faqTitle}</h2>
          {home.faqs.map((item, index) => {
            const open = activeFaq === index;
            return (
              <div className="faq-item" key={item.q}>
                <div className="faq-question" onClick={() => setActiveFaq((value) => (value === index ? null : index))}>
                  {item.q}
                  <span>{open ? "-" : "+"}</span>
                </div>
                <div className={`faq-answer ${open ? "active" : ""}`}>{item.a}</div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="form" className="form-section">
        <div className="container form-container">
          <h2 className="section-title white-text">{home.formTitle}</h2>
          <EnrollmentForm
            submitUrl="https://script.google.com/macros/s/AKfycbwtx4bBX6TugqnZVDIvYgHcLjZ9LdNyqbq0mMmjL-4lguR2_wQ8Gb1YwnboRc9iTJPG/exec"
            buttonText={home.formButton}
            onSuccess={() => setShowSuccess(true)}
            showHiddenNext
          />
        </div>
      </section>

      <ProgramModal
        data={modalKey ? home.modalData[modalKey] : null}
        variant={modalVariant}
        onClose={() => setModalKey(null)}
        defaultTitle={t.modal.defaultTitle}
        closeAria={t.modal.closeAria}
      />
      <SuccessModal
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
        title={t.modal.successTitle}
        closeLabel={t.modal.successClose}
        message={home.successMessage}
      />

      <div
        className={`promo-popup-overlay ${showPromoPopup ? "show" : ""}`}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setShowPromoPopup(false);
          }
        }}
      >
        <div className="promo-popup-card">
          <button
            type="button"
            className="promo-popup-close"
            onClick={() => setShowPromoPopup(false)}
            aria-label={t.modal.closeAria}
          >
            &times;
          </button>
          <span className="promo-popup-label">{home.promoLabel}</span>
          <p className="promo-popup-text">{home.promoMessage}</p>
          <a href="#form" className="promo-popup-btn" onClick={() => setShowPromoPopup(false)}>
            {home.promoCta}
          </a>
        </div>
      </div>
    </>
  );
}

export default HomePage;
