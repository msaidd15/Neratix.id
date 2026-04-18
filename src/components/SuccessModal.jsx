function SuccessModal({ show, onClose, message }) {
  return (
    <div id="successModal" className={`success-modal ${show ? "show" : ""}`}>
      <div className="success-modal-content">
        <div className="success-icon">&#10003;</div>
        <h3>Pendaftaran Berhasil!</h3>
        <p>{message}</p>
        <button onClick={onClose} className="success-btn" type="button">
          Tutup
        </button>
      </div>
    </div>
  );
}

export default SuccessModal;
