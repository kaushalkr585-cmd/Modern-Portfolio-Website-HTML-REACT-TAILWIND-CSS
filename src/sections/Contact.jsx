import { useState } from "react";
import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

const FIELD_STYLE = {
  width: "100%",
  background: "transparent",
  border: "none",
  borderBottom: "2px solid rgba(244,239,230,0.3)",
  padding: "0.6rem 0",
  color: "#F4EFE6",
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: "0.95rem",
  outline: "none",
  transition: "border-color 120ms linear",
};
const FIELD_FOCUS_STYLE = "rgba(255,75,38,0.8)";

function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="font-mono text-[10px] tracking-wider uppercase text-paper/50"
      >
        {label}
      </label>
      {children}
      {error && (
        <span className="font-mono text-[9px] text-orange tracking-wide">
          {error}
        </span>
      )}
    </div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", service: "", budget: "", idea: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "budget" && value && !/^\d+$/.test(value)) return;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validate = () => {
    const required = ["name", "email", "service", "idea"];
    const newErrors = {};
    required.forEach((f) => { if (!formData[f].trim()) newErrors[f] = "REQUIRED"; });
    if (formData.service !== "Others" && !formData.budget.trim()) newErrors.budget = "REQUIRED";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, { ...formData, from_name: formData.name, reply_to: formData.email }, PUBLIC_KEY);
      setStatus("success");
      setFormData({ name: "", email: "", service: "", budget: "", idea: "" });
    } catch (err) {
      console.error("EmailJS Error:", err);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      style={{ background: "#0B0B0C", borderTop: "3px solid #F4EFE6" }}
      className="py-8 md:py-12 lg:py-16"
      aria-label="Contact Kaushal Kumar"
    >
      {/* ── Section Header ─────────────────────────────────────── */}
      <div style={{ borderBottom: "3px solid rgba(244,239,230,0.2)" }} className="pb-4 mb-8">
        <div className="global-container flex items-center gap-4">
          <span className="font-mono text-paper text-[10px] tracking-widest uppercase opacity-50">
            SECTION 08
          </span>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF4B26" }} />
          <h2 className="font-display text-paper text-2xl sm:text-3xl uppercase tracking-wider">
            CONTACT
          </h2>
        </div>
      </div>

      <div className="global-container">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-center">
          {/* Left Column: Headline */}
          <div className="flex flex-col text-center lg:text-left">
            <h3
              className="font-display text-paper leading-[0.9] uppercase"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 5.5rem)" }}
            >
              LET'S BUILD
              <br />
              <span className="text-orange">SOMETHING.</span>
            </h3>
            <p className="font-body text-sm sm:text-base text-paper/60 leading-relaxed max-w-[42ch] mx-auto lg:mx-0 mt-6">
              Have a project in mind, an opportunity to discuss, or just want to say hello?
              Fill in the form and I'll get back to you.
            </p>
          </div>

          {/* Right Column: Form Container */}
          <div className="border-3 border-paper/20 p-6 sm:p-8 bg-[#121214] shadow-[6px_6px_0px_0px_rgba(244,239,230,0.15)]">
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field label="Name *" error={errors.name}>
                  <input
                    type="text"
                    name="name"
                    id="contact-name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    style={{ ...FIELD_STYLE, borderBottomColor: errors.name ? "#FF4B26" : "rgba(244,239,230,0.3)" }}
                    onFocus={(e) => (e.target.style.borderBottomColor = FIELD_FOCUS_STYLE)}
                    onBlur={(e) => (e.target.style.borderBottomColor = errors.name ? "#FF4B26" : "rgba(244,239,230,0.3)")}
                    autoComplete="name"
                  />
                </Field>

                <Field label="Email *" error={errors.email}>
                  <input
                    type="email"
                    name="email"
                    id="contact-email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    style={{ ...FIELD_STYLE, borderBottomColor: errors.email ? "#FF4B26" : "rgba(244,239,230,0.3)" }}
                    onFocus={(e) => (e.target.style.borderBottomColor = FIELD_FOCUS_STYLE)}
                    onBlur={(e) => (e.target.style.borderBottomColor = errors.email ? "#FF4B26" : "rgba(244,239,230,0.3)")}
                    autoComplete="email"
                  />
                </Field>
              </div>

              <Field label="Service Needed *" error={errors.service}>
                <select
                  name="service"
                  id="contact-service"
                  value={formData.service}
                  onChange={handleChange}
                  style={{
                    ...FIELD_STYLE,
                    borderBottomColor: errors.service ? "#FF4B26" : "rgba(244,239,230,0.3)",
                    cursor: "pointer",
                  }}
                >
                  <option value="" disabled style={{ background: "#0B0B0C" }}>Select a service</option>
                  <option value="Web Development" style={{ background: "#0B0B0C" }}>Web Development</option>
                  <option value="Logo Animation" style={{ background: "#0B0B0C" }}>Logo Animation</option>
                  <option value="Music Edit" style={{ background: "#0B0B0C" }}>Music Edit</option>
                  <option value="Others" style={{ background: "#0B0B0C" }}>Others</option>
                </select>
              </Field>

              {formData.service && formData.service !== "Others" && (
                <Field label="Budget (INR) *" error={errors.budget}>
                  <input
                    type="text"
                    name="budget"
                    id="contact-budget"
                    placeholder="Your Budget"
                    value={formData.budget}
                    onChange={handleChange}
                    style={{ ...FIELD_STYLE, borderBottomColor: errors.budget ? "#FF4B26" : "rgba(244,239,230,0.3)" }}
                    onFocus={(e) => (e.target.style.borderBottomColor = FIELD_FOCUS_STYLE)}
                    onBlur={(e) => (e.target.style.borderBottomColor = errors.budget ? "#FF4B26" : "rgba(244,239,230,0.3)")}
                  />
                </Field>
              )}

              <Field label="Your Idea *" error={errors.idea}>
                <textarea
                  name="idea"
                  id="contact-idea"
                  rows={4}
                  placeholder="Describe your idea or project..."
                  value={formData.idea}
                  onChange={handleChange}
                  style={{
                    ...FIELD_STYLE,
                    resize: "vertical",
                    paddingBottom: "0.5rem",
                    borderBottomColor: errors.idea ? "#FF4B26" : "rgba(244,239,230,0.3)",
                  }}
                  onFocus={(e) => (e.target.style.borderBottomColor = FIELD_FOCUS_STYLE)}
                  onBlur={(e) => (e.target.style.borderBottomColor = errors.idea ? "#FF4B26" : "rgba(244,239,230,0.3)")}
                />
              </Field>

              {status && (
                <p
                  className="font-mono text-[10px] tracking-wider uppercase"
                  style={{
                    color: status === "success" ? "#F5C518" : status === "error" ? "#FF4B26" : "rgba(244,239,230,0.6)",
                  }}
                >
                  {status === "sending" ? "SENDING..." : status === "success" ? "MESSAGE SENT ✓" : "SOMETHING WENT WRONG — TRY AGAIN"}
                </p>
              )}

              <div>
                <button
                  type="submit"
                  id="contact-submit"
                  disabled={status === "sending"}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    padding: "12px 28px",
                    background: status === "sending" ? "rgba(255,75,38,0.4)" : "#FF4B26",
                    color: "#0B0B0C",
                    border: "3px solid #FF4B26",
                    cursor: status === "sending" ? "not-allowed" : "pointer",
                    transition: "background 120ms linear, color 120ms linear",
                  }}
                  onMouseEnter={(e) => {
                    if (status !== "sending") {
                      e.currentTarget.style.background = "#F4EFE6";
                      e.currentTarget.style.color = "#0B0B0C";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (status !== "sending") {
                      e.currentTarget.style.background = "#FF4B26";
                      e.currentTarget.style.color = "#0B0B0C";
                    }
                  }}
                >
                  {status === "sending" ? "SENDING..." : "SEND MESSAGE →"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
