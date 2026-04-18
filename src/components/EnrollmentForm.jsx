import { useEffect, useRef, useState } from "react";
function EnrollmentForm({ submitUrl, buttonText, onSuccess, showHiddenNext = false }) {
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState(0);
  const formRef = useRef(null);

  useEffect(() => {
    if (!loading) return undefined;

    const timer = setInterval(() => {
      setDots((value) => (value + 1) % 4);
    }, 400);

    return () => clearInterval(timer);
  }, [loading]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formRef.current) return;

    setLoading(true);

    try {
      const formData = new FormData(formRef.current);
      const response = await fetch(submitUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      formRef.current.reset();
      onSuccess();
    } catch (error) {
      alert("Gagal kirim data");
      console.error(error);
    } finally {
      setLoading(false);
      setDots(0);
    }
  };

  return (
    <form className="form-kirim" onSubmit={handleSubmit} ref={formRef}>
      {showHiddenNext && <input type="hidden" name="_next" value="thanks.html" />}
      <div className="form-group">
        <label htmlFor="nama">Nama</label>
        <input name="nama" type="text" placeholder="Nama lengkap" required />
      </div>
      <div className="form-group">
        <label htmlFor="umur">Umur</label>
        <input name="umur" type="number" placeholder="Umur" required />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input name="email" type="email" placeholder="Email" required />
      </div>
      <div className="form-group">
        <label htmlFor="hp">No HP/WA</label>
        <input name="hp" type="tel" placeholder="Nomor HP/WA" required />
      </div>
      <div className="form-group">
        <label htmlFor="program">Program Kursus</label>
        <select name="program" required defaultValue="">
          <option value="" disabled>
            Pilih program kursus
          </option>
          <option value="neratix_roboexplorer">Neratix RoboExplorer</option>
          <option value="neratix_robobuilder">Neratix RoboBuilder</option>
          <option value="neratix_robengineer">Neratix RoboEngineer</option>
        </select>
      </div>
      <button type="submit" className="submit-btn" disabled={loading}>
        {loading ? `Mengirim${".".repeat(dots)}` : buttonText}
      </button>
    </form>
  );
}

export default EnrollmentForm;
