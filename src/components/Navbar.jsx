import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "WORK", href: "#web-development-projects" },
  { label: "SKILLS", href: "#skills" },
  { label: "ABOUT", href: "#about" },
  { label: "CONTACT", href: "#contact" },
];

const TICKER_TEXT =
  "OPEN TO FULL-STACK ROLES · B.TECH CS '26 · NIST UNIVERSITY · BASED IN INDIA · OPEN TO REMOTE · MERN STACK DEVELOPER · ";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = [
      "web-development-projects",
      "logo-animation-projects",
      "music-video-edit",
      "experience",
      "skills",
      "about",
      "contact",
    ];

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px", // triggers when section occupies center part of screen
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (
            [
              "web-development-projects",
              "logo-animation-projects",
              "music-video-edit",
              "experience",
            ].includes(id)
          ) {
            setActiveSection("WORK");
          } else if (id === "skills") {
            setActiveSection("SKILLS");
          } else if (id === "about") {
            setActiveSection("ABOUT");
          } else if (id === "contact") {
            setActiveSection("CONTACT");
          }
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <>
      {/* ── Utility Bar ─────────────────────────────────────────── */}
      <div
        style={{
          background: "#FF4B26",
          borderBottom: "3px solid #0B0B0C",
          overflow: "hidden",
        }}
        aria-label="Status bar"
      >
        <div className="ticker-track py-1">
          {/* Doubled for seamless loop */}
          {[0, 1].map((n) => (
            <span
              key={n}
              className="font-mono text-ink text-[10px] tracking-widest uppercase font-bold"
              style={{ paddingRight: "4rem" }}
              aria-hidden={n === 1}
            >
              {TICKER_TEXT}
              {TICKER_TEXT}
            </span>
          ))}
        </div>
      </div>

      {/* ── Main Nav ────────────────────────────────────────────── */}
      <nav
        style={{
          background: "#F4EFE6",
          borderBottom: "2px solid #0B0B0C",
          position: "sticky",
          top: 0,
          zIndex: 100,
          height: "75px",
        }}
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between px-4 md:px-8 h-full">
          {/* Logo wordmark */}
          <a
            href="#home"
            aria-label="Kaushal Kumar — home"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 48,
              height: 48,
              background: "#0B0B0C",
              border: "3px solid #0B0B0C",
              color: "#F4EFE6",
              fontFamily: "'Anton', sans-serif",
              fontSize: "1.5rem",
              letterSpacing: "0.02em",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            KK
          </a>

          {/* Desktop/Tablet nav links */}
          <div className="hidden md:flex items-center gap-4 lg:gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="nav-link"
                style={{
                  color: activeSection === label ? "#FF4B26" : "#0B0B0C",
                  borderBottomColor:
                    activeSection === label ? "#FF4B26" : "transparent",
                }}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Name Display on Right */}
          <span
            className="hidden md:inline-block font-display text-ink"
            style={{
              fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              whiteSpace: "nowrap",
            }}
          >
            KAUSHAL KUMAR
          </span>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-9 h-9 focus:outline-none focus-visible:outline-orange-500"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            aria-expanded={drawerOpen}
          >
            <span
              style={{
                display: "block",
                width: 22,
                height: 3,
                background: "#0B0B0C",
              }}
            />
            <span
              style={{
                display: "block",
                width: 22,
                height: 3,
                background: "#0B0B0C",
              }}
            />
            <span
              style={{
                display: "block",
                width: 14,
                height: 3,
                background: "#0B0B0C",
              }}
            />
          </button>
        </div>
      </nav>

      {/* ── Mobile Drawer ───────────────────────────────────────── */}
      {drawerOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#0B0B0C",
            zIndex: 110,
            display: "flex",
            flexDirection: "column",
            padding: "2rem",
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Close */}
          <div className="flex justify-between items-center mb-12">
            <span
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: "1.5rem",
                color: "#F4EFE6",
                letterSpacing: "0.04em",
              }}
            >
              KK
            </span>
            <button
              onClick={() => setDrawerOpen(false)}
              aria-label="Close menu"
              style={{
                color: "#F4EFE6",
                fontSize: "1.5rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'JetBrains Mono', monospace",
                lineHeight: 1,
              }}
            >
              ✕
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-6">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setDrawerOpen(false)}
                style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: "clamp(2.5rem, 8vw, 4rem)",
                  color: activeSection === label ? "#FF4B26" : "#F4EFE6",
                  textDecoration: "none",
                  borderBottom: "2px solid rgba(244,239,230,0.15)",
                  paddingBottom: "0.75rem",
                  display: "block",
                  transition: "color 120ms linear",
                }}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Name in Drawer */}
          <div style={{ marginTop: "auto", paddingTop: "2rem" }}>
            <span
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: "2rem",
                color: "#FF4B26",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              KAUSHAL KUMAR
            </span>
          </div>
        </div>
      )}
    </>
  );
}
