function SuccessModal({ show, onClose, message, title, closeLabel }) {
  return (
    <div id="successModal" className={`success-modal ${show ? "show" : ""}`}>
      <div className="success-modal-content">
        <div className="success-icon">&#10003;</div>
        <h3>{title}</h3>
        <p>{message}</p>
        <button onClick={onClose} className="success-btn" type="button">
          {closeLabel}
        </button>
      </div>
    </div>
  );
}

export default SuccessModal;
