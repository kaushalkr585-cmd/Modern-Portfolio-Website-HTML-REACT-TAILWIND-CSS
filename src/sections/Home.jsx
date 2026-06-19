import { FaXTwitter, FaLinkedinIn, FaGithub, FaInstagram } from "react-icons/fa6";
import p from "../assets/p.jpg";

const SOCIALS = [
  { Icon: FaXTwitter, label: "X / Twitter", href: "https://x.com/kushal21175731" },
  { Icon: FaLinkedinIn, label: "LinkedIn", href: "https://www.linkedin.com/in/kaushal-kumar-1a0370377/" },
  { Icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/_mystryslayer_/" },
  { Icon: FaGithub, label: "GitHub", href: "https://github.com/kaushalkr585-cmd" },
];

const STATS = [
  { value: "3", label: "MAJOR PROJECTS" },
  { value: "MERN", label: "CORE STACK" },
  { value: "2026", label: "GRAD YEAR" },
];

export default function Home() {
  return (
    <section
      id="home"
      style={{
        background: "#0B0B0C",
        position: "relative",
      }}
      className="lg:h-[calc(100vh-105px)] flex flex-col justify-between py-8 lg:py-0 overflow-hidden"
      aria-label="Hero"
    >
      {/* ── Main Content Area ───────────────────────────────────── */}
      <div className="global-container flex-grow flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 w-full items-center">
          {/* Left Column: Text & CTAs */}
          <div className="flex flex-col justify-center">
            {/* Eyebrow */}
            <p className="font-mono text-orange text-[10px] tracking-widest uppercase mb-3">
              FULL STACK DEVELOPER · FRESHER 2026
            </p>

            {/* Giant Stacked Headline */}
            <h1
              className="font-display text-paper leading-[0.85] tracking-tight uppercase"
              style={{
                fontSize: "clamp(3.5rem, 8vw, 7.5rem)",
                marginBottom: "1rem",
              }}
            >
              BUILD.
              <br />
              SHIP.
              <br />
              <span className="text-orange">REPEAT.</span>
            </h1>

            {/* Sub-name / Role */}
            <p className="font-mono text-paper/50 text-[10px] sm:text-xs tracking-wider uppercase mb-2">
              KAUSHAL KUMAR — FULL STACK / MERN DEVELOPER
            </p>

            {/* Paragraph Bio */}
            <p
              className="font-body text-paper/70 leading-relaxed mb-6"
              style={{
                fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)",
                maxWidth: "46ch",
              }}
            >
              I turn complex ideas into seamless, high-impact web experiences —
              building modern, scalable, and lightning-fast applications that make a difference.
            </p>

            {/* CTA buttons */}
            <div className="flex gap-4 flex-wrap mb-6">
              <a href="#web-development-projects" id="hero-view-projects" className="btn-primary">
                VIEW PROJECTS →
              </a>
              <a href="/Resume.pdf" download id="hero-get-resume" className="btn-outline">
                GET RESUME ↗
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-5 items-center">
              {SOCIALS.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "rgba(244,239,230,0.5)",
                    fontSize: "1.2rem",
                    transition: "color 120ms linear",
                    display: "inline-flex",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FF4B26")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(244,239,230,0.5)")}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Profile Image + Sticker */}
          <div className="flex justify-center lg:justify-end items-center relative">
            <div
              style={{
                border: "3px solid #F4EFE6",
                background: "#0B0B0C",
                overflow: "hidden",
              }}
              className="w-[260px] h-[260px] sm:w-[300px] sm:h-[300px] lg:w-[350px] lg:h-[350px]"
            >
              <img
                src={p}
                alt="Kaushal Kumar Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Sticker Badge */}
            <div
              className="sticker-badge absolute -top-6 lg:-right-4 right-4"
              aria-label="Open to work"
            >
              <span style={{ fontSize: "0.55rem", display: "block" }}>●</span>
              OPEN TO
              <br />
              WORK
            </div>
          </div>
        </div>
      </div>

      {/* ── Stat Strip ─────────────────────────────────────────── */}
      <div
        className="w-full"
        style={{
          borderTop: "3px solid rgba(244,239,230,0.2)",
        }}
      >
        <div className="global-container">
          <div className="grid grid-cols-3">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  padding: "1.25rem 0",
                  borderRight: i < STATS.length - 1 ? "2px solid rgba(244,239,230,0.2)" : "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.25rem",
                }}
                className="pl-2 sm:pl-6 lg:pl-10"
              >
                <span
                  className="font-display text-paper"
                  style={{ fontSize: "clamp(1.2rem, 3.5vw, 2.2rem)", lineHeight: 1 }}
                >
                  {stat.value}
                </span>
                <span
                  className="font-mono text-[9px] sm:text-[10px] tracking-wider uppercase text-paper/50"
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
