import ProjectMedia from "../components/ProjectMedia";

const LOGO_PROJECTS = [
  {
    code: "LA-01",
    title: "APPLE PARTICLE ANIMATION",
    description: "Particle-based logo reveal animation for Apple, built in After Effects.",
    tags: ["After Effects", "Motion Graphics", "Logo Animation"],
    video: "/ParticleAnimation.mp4",
    accentBg: "#FF4B26",
    accentText: "#0B0B0C",
    cardBg: "#0B0B0C",
    textColor: "#F4EFE6",
    tagBorder: "rgba(244,239,230,0.3)",
  },
  {
    code: "LA-02",
    title: "GOOGLE ANIMATION",
    description: "Smooth animated Google logo reveal sequence created in After Effects.",
    tags: ["After Effects", "Motion Graphics", "Logo Animation"],
    video: "/GoogleAnimation.mp4",
    accentBg: "#F5C518",
    accentText: "#0B0B0C",
    cardBg: "#F4EFE6",
    textColor: "#0B0B0C",
    tagBorder: "rgba(11,11,12,0.3)",
  },
  {
    code: "LA-03",
    title: "KOREAN TEXT ANIMATION",
    description: "Stylized Korean text kinetic animation — experimental typography motion piece.",
    tags: ["After Effects", "Kinetic Typography", "Motion Design"],
    video: "/LogoAnimation.mp4",
    accentBg: "#1E3FE0",
    accentText: "#F4EFE6",
    cardBg: "#0B0B0C",
    textColor: "#F4EFE6",
    tagBorder: "rgba(244,239,230,0.3)",
  },
];

export default function Logo() {
  return (
    <section
      id="logo-animation-projects"
      className="py-8 md:py-12 lg:py-16"
      style={{ background: "#0B0B0C", borderTop: "3px solid #F4EFE6" }}
      aria-label="Logo animation projects"
    >
      {/* ── Section Header ─────────────────────────────────────── */}
      <div style={{ borderBottom: "3px solid #F4EFE6" }} className="pb-4 mb-8">
        <div className="global-container flex items-center gap-4">
          <span className="font-mono text-paper text-[10px] tracking-widest uppercase opacity-50">
            SECTION 05
          </span>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF4B26" }} />
          <h2 className="font-display text-paper text-2xl sm:text-3xl uppercase tracking-wider">
            LOGO ANIMATIONS
          </h2>
        </div>
      </div>

      {/* ── Animation Cards ────────────────────────────────────── */}
      <div className="global-container flex flex-col gap-12">
        {LOGO_PROJECTS.map((project) => (
          <article
            key={project.code}
            style={{
              background: project.cardBg,
              color: project.textColor,
              border: "3px solid #F4EFE6",
            }}
            className="shadow-[6px_6px_0px_0px_rgba(244,239,230,0.15)]"
            aria-label={`Logo animation: ${project.title}`}
          >
            {/* Color-bar Header */}
            <div
              style={{
                background: project.accentBg,
                color: project.accentText,
                borderBottom: "3px solid #F4EFE6",
                padding: "0.75rem 1.5rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3 className="font-display text-base sm:text-xl uppercase tracking-wider">
                {project.code} — {project.title}
              </h3>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  padding: "2px 8px",
                  background: "#0B0B0C",
                  color: "#F5C518",
                  border: "2px solid #F4EFE6",
                  display: "inline-block",
                }}
              >
                MOTION DESIGN
              </span>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[45%_55%]">
              {/* Left Column: Info */}
              <div className="order-2 md:order-1 p-6 sm:p-8 flex flex-col gap-4 justify-center">
                <p className="font-body text-sm sm:text-base leading-relaxed opacity-90 max-w-[50ch]">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        border: `1.5px solid ${project.tagBorder}`,
                        color: project.textColor,
                      }}
                      className="font-mono text-[9px] uppercase px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Video Clip */}
              <div className="order-1 md:order-2">
                <ProjectMedia
                  src={project.video}
                  type="video"
                  alt={`${project.title} Preview`}
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
