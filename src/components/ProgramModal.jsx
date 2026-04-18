import { useEffect } from "react";
function ProgramModal({ data, onClose, variant = "program" }) {
  useEffect(() => {
    if (!data) return undefined;

    const handleKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [data, onClose]);

  return (
    <div
      id="programModal"
      className={`program-modal ${data ? "show" : ""} ${variant === "testimonial" ? "testimonial-modal" : ""}`}
      onClick={(event) => {
        if (event.target.id === "programModal") onClose();
      }}
    >
      <div className="program-modal-card">
        <button className="program-modal-close" type="button" onClick={onClose} aria-label="Close modal">
          &times;
        </button>
        <div className="program-modal-content">
          <h3 id="modal-title">{data?.title || "Program Title"}</h3>
          <div id="modal-desc">
            {(data?.details || []).map(([label, value]) => (
              <p key={`${label}-${value}`}>
                <strong>{label}:</strong> {value}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgramModal;
