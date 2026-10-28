import img4 from "../assets/img4.png"; // Thumblify
import img2 from "../assets/img2.png"; // Chatbot
import img3 from "../assets/img3.png"; // Clothsy
import ProjectMedia from "../components/ProjectMedia";

const PROJECTS = [
  {
    code: "BSD-01",
    title: "THUMBLIFY",
    description:
      "Thumblify — YouTube Thumbnail Generator: A React-based web application that enables content creators to design professional YouTube thumbnails in minutes. Features include template selection, text customization, and one-click export. Built with React, JavaScript, and CSS. Deployed on Vercel.",
    tags: ["React", "Vercel", "JavaScript", "CSS"],
    liveUrl: "https://thumblify-lake-xi.vercel.app/",
    codeUrl: "https://github.com/kaushalkr585-cmd/Thumblify",
    deployed: true,
    image: img4,
    accentBg: "#FF4B26",
    accentText: "#0B0B0C",
    cardBg: "#0B0B0C",
    textColor: "#F4EFE6",
    tagBorder: "rgba(244,239,230,0.3)",
  },
  {
    code: "BSD-02",
    title: "CHATBOT",
    description:
      "AI Chatbot — LLM-Powered Conversational Interface: An intelligent chatbot built with React and integrated with a Large Language Model API (Google Gemini). Features real-time streaming responses, conversation history, and a clean, accessible chat interface. Built with React, Tailwind CSS, and RESTful APIs.",
    tags: ["React", "API", "JavaScript", "Tailwind CSS"],
    liveUrl: "https://chatbot-tawny-five-68.vercel.app/",
    codeUrl: "https://github.com/kaushalkr585-cmd/Chatbot-HTML-CSS-REACT-JS",
    deployed: true,
    image: img2,
    accentBg: "#1E3FE0",
    accentText: "#F4EFE6",
    cardBg: "#F4EFE6",
    textColor: "#0B0B0C",
    tagBorder: "rgba(11,11,12,0.3)",
  },
  {
    code: "BSD-03",
    title: "CLOTHSY",
    description:
      "Clothsy — Full-Stack E-Commerce Platform: A comprehensive e-commerce web application featuring product catalog, filtering, shopping cart with state management, and checkout flow. Built with React for the frontend and designed for the MERN stack architecture. Deployed on Vercel with responsive design for mobile and desktop.",
    tags: ["React", "HTML", "CSS", "JavaScript", "E-Commerce"],
    liveUrl: "https://ecommerce-website-html-css-js-react.vercel.app/",
    codeUrl: "https://github.com/kaushalkr585-cmd/Ecommerce-Website-HTML-CSS-JS-REACT-NODE-EXPRESS-MONGODB",
    deployed: true,
    image: img3,
    accentBg: "#0B0B0C",
    accentText: "#F4EFE6",
    cardBg: "#FF4B26",
    textColor: "#0B0B0C",
    tagBorder: "rgba(11,11,12,0.3)",
  },
];

export default function Projects() {
  return (
    <section
      id="web-development-projects"
      className="py-8 md:py-12 lg:py-16"
      style={{ background: "#F4EFE6", borderTop: "3px solid #0B0B0C" }}
      aria-label="Web development projects"
    >
      {/* ── Section Header ─────────────────────────────────────── */}
      <div style={{ borderBottom: "3px solid #0B0B0C" }} className="pb-4 mb-8">
        <div className="global-container flex items-center gap-4">
          <span className="font-mono text-ink text-[10px] tracking-widest uppercase opacity-50">
            SECTION 04
          </span>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF4B26" }} />
          <h2 className="font-display text-ink text-2xl sm:text-3xl uppercase tracking-wider">
            WORK — PROJECTS
          </h2>
        </div>
      </div>

      {/* ── Projects List ───────────────────────────────────────── */}
      <div className="global-container flex flex-col gap-12">
        {PROJECTS.map((project) => (
          <article
            key={project.code}
            style={{
              background: project.cardBg,
              color: project.textColor,
              border: "3px solid #0B0B0C",
            }}
            className="shadow-[6px_6px_0px_0px_#0B0B0C]"
            aria-label={`Project: ${project.title}`}
          >
            {/* Color-bar Header */}
            <div
              style={{
                background: project.accentBg,
                color: project.accentText,
                borderBottom: "3px solid #0B0B0C",
                padding: "0.75rem 1.5rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3 className="font-display text-base sm:text-xl uppercase tracking-wider">
                {project.code} — {project.title}
              </h3>
              {project.deployed && (
                <span className="badge-live text-[9px] sm:text-xs">DEPLOYED ✓</span>
              )}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[45%_55%]">
              {/* Left Column: Project Info */}
              <div className="order-2 md:order-1 p-6 sm:p-8 flex flex-col gap-4 justify-center">
                <p className="font-body text-sm sm:text-base leading-relaxed opacity-90 max-w-[50ch]">
                  {project.description}
                </p>

                {/* Tech Tags */}
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

                {/* Action Links */}
                <div className="flex gap-4 mt-2">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`${project.code.toLowerCase()}-live`}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      padding: "8px 16px",
                      background: "#FF4B26",
                      color: "#0B0B0C",
                      border: "3px solid #FF4B26",
                      textDecoration: "none",
                      display: "inline-block",
                      transition: "background 120ms linear, color 120ms linear",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#0B0B0C";
                      e.currentTarget.style.color = "#FF4B26";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#FF4B26";
                      e.currentTarget.style.color = "#0B0B0C";
                    }}
                  >
                    VIEW LIVE →
                  </a>
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`${project.code.toLowerCase()}-code`}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      padding: "8px 16px",
                      background: "transparent",
                      color: project.textColor,
                      border: `3px solid ${project.textColor}`,
                      textDecoration: "none",
                      display: "inline-block",
                      transition: "background 120ms linear, color 120ms linear",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = project.textColor;
                      e.currentTarget.style.color = project.cardBg;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = project.textColor;
                    }}
                  >
                    VIEW CODE →
                  </a>
                </div>
              </div>

              {/* Right Column: Media Preview */}
              <div className="order-1 md:order-2">
                <ProjectMedia
                  src={project.image}
                  type="image"
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
