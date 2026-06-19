const EXPERIENCES = [
  {
    code: "EX-01",
    role: "Self-Taught Web Developer",
    company: "Independent / Personal Projects",
    duration: "2025 — PRESENT",
    description:
      "Learned web development independently and built responsive, modern UI projects using React, Tailwind CSS, and Framer Motion with a focus on clean design and performance.",
    active: true,
  },
  {
    code: "EX-02",
    role: "Database & SQL",
    company: "Learning + Practice",
    duration: "2025 (TILL JUNE)",
    description:
      "Strengthened database fundamentals including SQL queries, normalization, and relational database concepts, with hands-on practice on real-world style datasets.",
    active: false,
  },
  {
    code: "EX-03",
    role: "Computer Vision & Machine Learning",
    company: "Learning + Projects",
    duration: "2024",
    description:
      "Explored CV/ML concepts and implemented beginner-to-intermediate projects to understand model workflows, data handling, and practical applications of machine learning.",
    active: false,
  },
  {
    code: "EX-04",
    role: "Python Intern",
    company: "Internship",
    duration: "2023",
    description:
      "Completed a Python internship where I worked on core programming concepts, problem-solving, and small automation/project tasks, improving my coding fundamentals.",
    active: false,
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-8 md:py-12 lg:py-16"
      aria-label="Experience timeline"
      style={{ background: "#F4EFE6", borderTop: "3px solid #0B0B0C" }}
    >
      {/* ── Section Header ─────────────────────────────────────── */}
      <div style={{ borderBottom: "3px solid #0B0B0C" }} className="pb-4 mb-8">
        <div className="global-container flex items-center gap-4">
          <span className="font-mono text-ink text-[10px] tracking-widest uppercase opacity-50">
            SECTION 07
          </span>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF4B26" }} />
          <h2 className="font-display text-ink text-2xl sm:text-3xl uppercase tracking-wider">
            EXPERIENCE
          </h2>
        </div>
      </div>

      {/* ── Experience Rows ───────────────────────────────────── */}
      <div className="global-container">
        <div style={{ border: "3px solid #0B0B0C" }} className="shadow-[6px_6px_0px_0px_#0B0B0C]">
          {EXPERIENCES.map((exp, idx) => (
            <article
              key={exp.code}
              style={{
                borderBottom: idx < EXPERIENCES.length - 1 ? "3px solid #0B0B0C" : "none",
                background: exp.active ? "#0B0B0C" : "#F4EFE6",
                color: exp.active ? "#F4EFE6" : "#0B0B0C",
              }}
              className="grid grid-cols-1 md:grid-cols-[240px_1fr]"
              aria-label={`Experience: ${exp.role}`}
            >
              {/* Left Metadata Column */}
              <div
                style={{
                  padding: "1.5rem",
                  justifyContent: "center",
                }}
                className="flex flex-col gap-1.5 border-b-3 md:border-b-0 md:border-r-3 border-ink"
              >
                <span
                  className="font-mono text-[10px] tracking-wider uppercase"
                  style={{
                    color: exp.active ? "#FF4B26" : "rgba(11,11,12,0.4)",
                  }}
                >
                  {exp.code}
                </span>
                <span className="font-mono text-xs tracking-wide uppercase opacity-70">
                  {exp.duration}
                </span>
                {exp.active && (
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.55rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      padding: "2px 6px",
                      background: "#FF4B26",
                      color: "#0B0B0C",
                      border: "2px solid #FF4B26",
                      display: "inline-block",
                      width: "fit-content",
                      marginTop: "0.25rem",
                    }}
                  >
                    CURRENT
                  </span>
                )}
              </div>

              {/* Right Content Column */}
              <div
                style={{
                  padding: "1.5rem sm:padding:2rem",
                  justifyContent: "center",
                }}
                className="flex flex-col gap-2 p-6 sm:p-8"
              >
                <h3 className="font-display text-lg sm:text-xl uppercase leading-snug">
                  {exp.role}
                </h3>
                <p className="font-mono text-xs tracking-wider uppercase opacity-60">
                  {exp.company}
                </p>
                <p className="font-body text-sm sm:text-base leading-relaxed opacity-85 max-w-[65ch] mt-1">
                  {exp.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
