import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

function EnrollmentForm({ submitUrl, buttonText, onSuccess, showHiddenNext = false }) {
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState(0);
  const formRef = useRef(null);
  const { t } = useLanguage();
  const form = t.form;

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
      alert(form.failed);
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
        <label htmlFor="nama">{form.labels.name}</label>
        <input name="nama" type="text" placeholder={form.placeholders.name} required />
      </div>
      <div className="form-group">
        <label htmlFor="umur">{form.labels.age}</label>
        <input name="umur" type="number" placeholder={form.placeholders.age} required />
      </div>
      <div className="form-group">
        <label htmlFor="email">{form.labels.email}</label>
        <input name="email" type="email" placeholder={form.placeholders.email} required />
      </div>
      <div className="form-group">
        <label htmlFor="hp">{form.labels.phone}</label>
        <input name="hp" type="tel" placeholder={form.placeholders.phone} required />
      </div>
      <div className="form-group">
        <label htmlFor="program">{form.labels.program}</label>
        <select name="program" required defaultValue="">
          <option value="" disabled>
            {form.placeholders.program}
          </option>
          {form.programOptions.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="submit-btn" disabled={loading}>
        {loading ? `${form.loading}${".".repeat(dots)}` : buttonText}
      </button>
    </form>
  );
}

export default EnrollmentForm;
