import { FaXTwitter, FaLinkedinIn, FaInstagram, FaGithub } from "react-icons/fa6";

const SOCIAL_LINKS = [
  { label: "GITHUB", Icon: FaGithub, href: "https://github.com/kaushalkr585-cmd" },
  { label: "INSTAGRAM", Icon: FaInstagram, href: "https://www.instagram.com/_mystryslayer_/" },
  { label: "LINKEDIN", Icon: FaLinkedinIn, href: "https://www.linkedin.com/in/kaushal-kumar-1a0370377/" },
  { label: "X", Icon: FaXTwitter, href: "https://x.com/kushal21175731" },
];

const LINK_STYLE = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: "0.65rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "rgba(244,239,230,0.5)",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: "0.4rem",
  transition: "color 120ms linear",
};

export default function Footer() {
  return (
    <footer style={{ background: "#0B0B0C", borderTop: "3px solid rgba(244,239,230,0.15)" }} aria-label="Footer">
      {/* ── Big name display ─────────────────────────────────── */}
      <div
        style={{
          borderBottom: "3px solid rgba(244,239,230,0.15)",
        }}
        className="py-8 md:py-12"
      >
        <div className="global-container">
          <h2
            className="font-display text-paper"
            style={{
              fontSize: "clamp(3rem, 9vw, 10rem)",
              lineHeight: 0.9,
              textTransform: "uppercase",
              letterSpacing: "0.01em",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            aria-label="Kaushal Kumar"
          >
            KAUSHAL KUMAR
          </h2>
          {/* Orange rule */}
          <div style={{ width: "6rem", height: 3, background: "#FF4B26", marginTop: "1rem" }} />
        </div>
      </div>

      {/* ── Bottom utility row ───────────────────────────────── */}
      <div className="py-6">
        <div
          className="global-container"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1.5rem",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Social links */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", alignItems: "center" }}>
            {SOCIAL_LINKS.map(({ label, Icon, href }, i) => (
              <span key={label} style={{ display: "inline-flex", alignItems: "center", gap: "1.5rem" }}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={LINK_STYLE}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FF4B26")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(244,239,230,0.5)")}
                >
                  <Icon size={12} />
                  {label}
                </a>
                {i < SOCIAL_LINKS.length - 1 && (
                  <span style={{ color: "rgba(244,239,230,0.2)", fontSize: "0.6rem", userSelect: "none" }} aria-hidden="true">·</span>
                )}
              </span>
            ))}
          </div>

          {/* Copyright */}
          <p
            className="font-mono text-paper"
            style={{ fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.3 }}
          >
            © {new Date().getFullYear()} Kaushal Kumar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
