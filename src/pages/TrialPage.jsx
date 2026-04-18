import { useState } from "react";
import EnrollmentForm from "../components/EnrollmentForm";
import SuccessModal from "../components/SuccessModal";

function TrialPage() {
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <>
      <section id="form" className="trial-section">
        <div className="container trial-container">
          <div className="trial-grid">
            <div className="trial-content">
              <p className="trial-kicker">Free Trial Class</p>
              <h1 className="trial-title">
                Coba Kelas Robotik Gratis untuk Anak Anda
              </h1>
              <p className="trial-subtitle">
                Sesi pengenalan interaktif bersama mentor Neratix agar anak
                merasakan belajar coding dan robotik dengan cara yang
                menyenangkan.
              </p>
              <div className="trial-points">
                <div className="trial-point">
                  <i className="fas fa-clock"></i>
                  <span>Durasi 55 Menit</span>
                </div>
                <div className="trial-point">
                  <i className="fas fa-chalkboard-teacher"></i>
                  <span>Mentor Berpengalaman</span>
                </div>
                <div className="trial-point">
                  <i className="fas fa-laptop-code"></i>
                  <span>Hands-on Mini Project</span>
                </div>
              </div>

              <div className="trial-image">
                <img
                  src="/asset/img/cobagratis.png"
                  alt="Anak-anak belajar robotik"
                />
              </div>
            </div>
            <div className="trial-form-wrap">
              <div className="trial-form">
                <h2 className="section-title white-text">
                  Coba Gratis Sekarang
                </h2>
                <p className="trial-form-note">
                  Isi data di bawah, tim kami akan menghubungi Anda secepatnya.
                </p>
                <EnrollmentForm
                  submitUrl="https://script.google.com/macros/s/AKfycbyd9q1yiQZTaBTS5wps_OqUcjcJ_aMFmfAhoVLrLDUdwgc4XaIxCN0idHR2rtS7mjHC/exec"
                  buttonText="Kirim Permintaan"
                  onSuccess={() => setShowSuccess(true)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <SuccessModal
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
        message="Terima kasih telah mengirim permintaan coba gratis. Kami akan segera menghubungi Anda."
      />
    </>
  );
}

export default TrialPage;
