import { useState } from "react";
import EnrollmentForm from "../components/EnrollmentForm";
import SuccessModal from "../components/SuccessModal";
import { useLanguage } from "../context/LanguageContext";

function TrialPage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const { t } = useLanguage();
  const trial = t.trial;

  return (
    <>
      <section id="form" className="trial-section">
        <div className="container trial-container">
          <div className="trial-grid">
            <div className="trial-content">
              <p className="trial-kicker">{trial.kicker}</p>
              <h1 className="trial-title">{trial.title}</h1>
              <p className="trial-subtitle">{trial.subtitle}</p>
              <div className="trial-points">
                <div className="trial-point">
                  <i className="fas fa-clock"></i>
                  <span>{trial.points[0]}</span>
                </div>
                <div className="trial-point">
                  <i className="fas fa-chalkboard-teacher"></i>
                  <span>{trial.points[1]}</span>
                </div>
                <div className="trial-point">
                  <i className="fas fa-laptop-code"></i>
                  <span>{trial.points[2]}</span>
                </div>
              </div>

              <div className="trial-image">
                <img
                  src="/asset/img/cobagratis.png"
                  alt={trial.imageAlt}
                />
              </div>
            </div>
            <div className="trial-form-wrap">
              <div className="trial-form">
                <h2 className="section-title white-text">
                  {trial.formTitle}
                </h2>
                <p className="trial-form-note">
                  {trial.formNote}
                </p>
                <EnrollmentForm
                  submitUrl="https://script.google.com/macros/s/AKfycbyd9q1yiQZTaBTS5wps_OqUcjcJ_aMFmfAhoVLrLDUdwgc4XaIxCN0idHR2rtS7mjHC/exec"
                  buttonText={trial.submitButton}
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
        title={t.modal.successTitle}
        closeLabel={t.modal.successClose}
        message={trial.successMessage}
      />
    </>
  );
}

export default TrialPage;
