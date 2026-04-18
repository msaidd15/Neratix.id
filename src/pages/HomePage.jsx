import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import EnrollmentForm from "../components/EnrollmentForm";
import ProgramModal from "../components/ProgramModal";
import SuccessModal from "../components/SuccessModal";
import { FAQS, HOME_STATS, PROGRAM_DATA, TESTIMONIALS } from "../data/content";

function HomePage() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [modalKey, setModalKey] = useState(null);
  const [modalVariant, setModalVariant] = useState("program");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFloating, setShowFloating] = useState(true);
  const [statValues, setStatValues] = useState(HOME_STATS.map(() => 0));
  const statsRef = useRef(null);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return undefined;

    let started = false;
    let rafId = 0;

    const animate = () => {
      if (started) return;
      started = true;
      const start = performance.now();
      const duration = 1500;

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        setStatValues(HOME_STATS.map((item) => Math.floor(progress * item.target)));

        if (progress < 1) {
          rafId = requestAnimationFrame(tick);
        } else {
          setStatValues(HOME_STATS.map((item) => item.target));
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
  }, []);

  return (
    <>
      <section className="hero">
        <video className="hero-video" autoPlay muted loop playsInline>
          <source src="/asset/video/lego.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Bangun Masa Depan dengan Robotika & Coding</h1>
          <p>Belajar robotik dari dasar hingga mahir dengan metode menyenangkan dan interaktif.</p>
          <div className="hero-buttons">
            <a href="#form" className="btn-primary">
              Daftar Sekarang
            </a>
            <Link to="/coba-gratis" className="btn-secondary">
              Coba Gratis
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
            aria-label="Close floating WhatsApp button"
          >
            &#10005;
          </button>
          <a
            href="https://wa.me/6282279258938?text=Halo%20kak%2C%20saya%20ingin%20mendapatkan%20informasi%20lebih%20lanjut%20mengenai%20program%20kursus%20robotik%20di%20Neratix%20?"
            target="_blank"
            rel="noreferrer"
            className="floating-btn"
          >
            <i className="fab fa-whatsapp"></i>
          </a>
        </div>
      )}

      <section className="stats-testi" ref={statsRef}>
        <div className="container">
          <div className="stats-grid">
            {HOME_STATS.map((item, index) => (
              <div className="stat-item" key={item.label}>
                <div className="stat-number">{`${statValues[index]}${item.suffix}`}</div>
                <div>{item.label}</div>
              </div>
            ))}
          </div>
          <div className="testimonials-carousel">
            <div className="carousel-track" id="carouselTrack">
              {[...TESTIMONIALS, ...TESTIMONIALS.slice(0, 3)].map((item, idx) => (
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
                    See more &rarr;
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
              <h3>Hi, Kami Neratix!</h3>
              <p>
                Misi kami adalah memberdayakan generasi inovator teknologi masa depan melalui kurikulum robotik
                dan coding yang kreatif, interaktif, serta aplikatif.
              </p>
              <p>
                Sejak berdiri, kami telah membantu banyak siswa mengembangkan keterampilan berpikir kritis,
                kreativitas, dan problem solving di era digital.
              </p>
            </div>
            <div className="about-image">
              <img src="/asset/img/kids.png" alt="Anak-anak belajar robotik" />
            </div>
          </div>
        </div>
      </section>

      <section id="kursus">
        <div className="container">
          <h2 className="section-title">Belajar Apa di Neratix?</h2>
          <div className="learning-grid">
            <div className="learning-card">
              <i className="fas fa-robot"></i>
              <h4>Robotics</h4>
            </div>
            <div className="learning-card">
              <i className="fas fa-code"></i>
              <h4>Coding</h4>
            </div>
            <div className="learning-card">
              <i className="fas fa-gamepad"></i>
              <h4>Game Development</h4>
            </div>
            <div className="learning-card">
              <i className="fas fa-lightbulb"></i>
              <h4>Creative Thinking</h4>
            </div>
          </div>
        </div>
      </section>

      <section id="program">
        <div className="container">
          <h2 className="section-title">Program Kursus Kami</h2>
          <div className="program-grid">
            <div
              className="program-card"
              onClick={() => {
                setModalVariant("program");
                setModalKey("neratix_roboexplorer");
              }}
            >
              <img src="/asset/img/program-roboexplorer.svg" alt="Ilustrasi Neratix RoboExplorer" />
              <h4>
                Neratix RoboExplorer
                <span>(Usia 6-10 Tahun)</span>
              </h4>
              <ul className="program-list">
                <li>Pengenalan robot & fungsi</li>
                <li>Rakit LEGO + motor (dinamo)</li>
                <li>Gerakan dasar (maju, mundur, putar)</li>
                <li>Sensor sederhana (tilt & motion)</li>
                <li>Coding visual (drag & drop)</li>
                <li>Logika dasar (IF sederhana & LOOP)</li>
              </ul>
            </div>
            <div
              className="program-card"
              onClick={() => {
                setModalVariant("program");
                setModalKey("neratix_robobuilder");
              }}
            >
              <img src="/asset/img/program-robobuilder.svg" alt="Ilustrasi Neratix RoboBuilder" />
              <h4>
                Neratix RoboBuilder
                <span>(Usia 9-14 Tahun)</span>
              </h4>
              <ul className="program-list">
                <li>Pengenalan Arduino berbasis STEM</li>
                <li>Dasar-dasar elektronika</li>
                <li>Kontrol robot via HP (Bluetooth/WiFi)</li>
                <li>Pemrograman dasar (C-like Arduino)</li>
                <li>Proyek line follower sederhana</li>
                <li>Logika kontrol & sensor lanjutan</li>
              </ul>
            </div>
            <div
              className="program-card"
              onClick={() => {
                setModalVariant("program");
                setModalKey("neratix_robengineer");
              }}
            >
              <img src="/asset/img/program-roboengineer.svg" alt="Ilustrasi Neratix RoboEngineer" />
              <h4>
                Neratix RoboEngineer
                <span>(Usia 12-17 Tahun)</span>
              </h4>
              <ul className="program-list">
                <li>Pemrograman Arduino (C/C++)</li>
                <li>Struktur program & manajemen kode</li>
                <li>Penggunaan sensor lanjutan</li>
                <li>Kontrol motor tingkat lanjut</li>
                <li>Serial monitor & teknik debugging</li>
                <li>Proyek: robot pintar & automation system</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="metode" className="metode">
        <div className="container">
          <h2 className="section-title">Metode Belajar Kami</h2>
          <div className="metode-grid">
            <div className="metode-card">
              <i className="fas fa-project-diagram"></i>
              <h4>Project Based Learning</h4>
            </div>
            <div className="metode-card">
              <i className="fas fa-tools"></i>
              <h4>Hands-on Practice</h4>
            </div>
            <div className="metode-card">
              <i className="fas fa-smile"></i>
              <h4>Fun & Interactive Learning</h4>
            </div>
            <div className="metode-card">
              <i className="fas fa-user-graduate"></i>
              <h4>Mentoring Personal</h4>
            </div>
          </div>
        </div>
      </section>

      <section id="faq">
        <div className="container">
          <h2 className="section-title">FAQ</h2>
          {FAQS.map((item, index) => {
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
          <h2 className="section-title white-text">Daftar Sekarang</h2>
          <EnrollmentForm
            submitUrl="https://script.google.com/macros/s/AKfycbwtx4bBX6TugqnZVDIvYgHcLjZ9LdNyqbq0mMmjL-4lguR2_wQ8Gb1YwnboRc9iTJPG/exec"
            buttonText="Daftar Sekarang"
            onSuccess={() => setShowSuccess(true)}
            showHiddenNext
          />
        </div>
      </section>

      <ProgramModal
        data={modalKey ? PROGRAM_DATA[modalKey] : null}
        variant={modalVariant}
        onClose={() => setModalKey(null)}
      />
      <SuccessModal
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
        message="Terima kasih telah mendaftar. Kami akan segera menghubungi Anda."
      />
    </>
  );
}

export default HomePage;
