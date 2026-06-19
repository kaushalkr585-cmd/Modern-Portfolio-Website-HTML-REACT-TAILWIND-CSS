const SKILL_GROUPS = [
  {
    category: "FRONTEND",
    skills: ["React", "Next.js", "Tailwind CSS", "JavaScript", "TypeScript", "HTML & CSS"],
  },
  {
    category: "BACKEND",
    skills: ["Node.js", "Express.js", "RESTful APIs", "Python", "Redux Toolkit"],
  },
  {
    category: "DATABASE",
    skills: ["MongoDB", "PostgreSQL", "MySQL", "Database Normalization", "SQL Queries"],
  },
  {
    category: "AI/ML",
    skills: ["LLM Integrations", "Prompt Engineering", "OpenCV Basics", "Model Workflows"],
  },
  {
    category: "TOOLS & DEVOPS",
    skills: ["Git & GitHub", "Docker", "CI/CD Pipelines", "Vercel Deployment", "Postman API Test"],
  },
  {
    category: "DESIGN & VIDEO",
    skills: ["After Effects", "Premiere Pro", "Photoshop", "Figma", "Motion Graphics"],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      style={{ background: "#F4EFE6", borderTop: "3px solid #0B0B0C" }}
      className="py-8 md:py-12 lg:py-16"
      aria-label="Tech stack catalogue"
    >
      {/* ── Section Header ─────────────────────────────────────── */}
      <div style={{ borderBottom: "3px solid #0B0B0C" }} className="pb-4 mb-8">
        <div className="global-container flex items-center gap-4">
          <span className="font-mono text-ink text-[10px] tracking-widest uppercase opacity-50">
            SECTION 03
          </span>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF4B26" }} />
          <h2 className="font-display text-ink text-2xl sm:text-3xl uppercase tracking-wider">
            CATALOGUE — TECH STACK
          </h2>
        </div>
      </div>

      {/* ── Skills Grid ────────────────────────────────────────── */}
      <div className="global-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILL_GROUPS.map((group, idx) => (
            <div
              key={group.category}
              style={{
                border: "3px solid #0B0B0C",
                background: "#F4EFE6",
              }}
              className="p-6 flex flex-col gap-4 shadow-[4px_4px_0px_0px_#0B0B0C] transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#0B0B0C]"
              role="listitem"
              aria-label={group.category}
            >
              <h3
                className="font-display text-lg tracking-wider uppercase border-b-2 border-ink pb-2"
                style={{
                  color: idx % 3 === 0 ? "#FF4B26" : idx % 3 === 1 ? "#1E3FE0" : "#0B0B0C",
                }}
              >
                {group.category}
              </h3>
              <ul className="flex flex-col gap-2 font-mono text-[11px] sm:text-xs uppercase text-ink">
                {group.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-ink flex-shrink-0" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
