import ProjectMedia from "../components/ProjectMedia";

const VIDEO_EDITS = [
  {
    code: "VE-01",
    title: "PODCAST EDIT",
    description: "Professional podcast video edit with clean cuts, subtitles, and color grading.",
    tags: ["Premiere Pro", "Color Grading", "Video Edit"],
    video: "/podcast1.mp4",
    accentBg: "#FF4B26",
    accentText: "#0B0B0C",
    cardBg: "#F4EFE6",
    textColor: "#0B0B0C",
    tagBorder: "rgba(11,11,12,0.3)",
  },
  {
    code: "VE-02",
    title: "RAW SHORT",
    description: "Short-form raw footage edit — fast-paced cuts, transitions, and dynamic pacing.",
    tags: ["Premiere Pro", "Short-Form", "Motion"],
    video: "/rawshort.mp4",
    accentBg: "#0B0B0C",
    accentText: "#F4EFE6",
    cardBg: "#0B0B0C",
    textColor: "#F4EFE6",
    tagBorder: "rgba(244,239,230,0.3)",
  },
];

export default function MusicVideoEdit() {
  return (
    <section
      id="music-video-edit"
      className="py-8 md:py-12 lg:py-16"
      style={{ background: "#F4EFE6", borderTop: "3px solid #0B0B0C" }}
      aria-label="Video edits"
    >
      {/* ── Section Header ─────────────────────────────────────── */}
      <div style={{ borderBottom: "3px solid #0B0B0C" }} className="pb-4 mb-8">
        <div className="global-container flex items-center gap-4">
          <span className="font-mono text-ink text-[10px] tracking-widest uppercase opacity-50">
            SECTION 06
          </span>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF4B26" }} />
          <h2 className="font-display text-ink text-2xl sm:text-3xl uppercase tracking-wider">
            VIDEO EDITS
          </h2>
        </div>
      </div>

      {/* ── Video Cards ────────────────────────────────────────── */}
      <div className="global-container flex flex-col gap-12">
        {VIDEO_EDITS.map((edit) => (
          <article
            key={edit.code}
            style={{
              background: edit.cardBg,
              color: edit.textColor,
              border: "3px solid #0B0B0C",
            }}
            className="shadow-[6px_6px_0px_0px_#0B0B0C]"
            aria-label={`Video edit: ${edit.title}`}
          >
            {/* Color-bar Header */}
            <div
              style={{
                background: edit.accentBg,
                color: edit.accentText,
                borderBottom: "3px solid #0B0B0C",
                padding: "0.75rem 1.5rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3 className="font-display text-base sm:text-xl uppercase tracking-wider">
                {edit.code} — {edit.title}
              </h3>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  padding: "2px 8px",
                  background: "#F5C518",
                  color: "#0B0B0C",
                  border: "2px solid #0B0B0C",
                  display: "inline-block",
                }}
              >
                VIDEO EDIT
              </span>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[45%_55%]">
              {/* Left Column: Info */}
              <div className="order-2 md:order-1 p-6 sm:p-8 flex flex-col gap-4 justify-center">
                <p className="font-body text-sm sm:text-base leading-relaxed opacity-90 max-w-[50ch]">
                  {edit.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {edit.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        border: `1.5px solid ${edit.tagBorder}`,
                        color: edit.textColor,
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
                  src={edit.video}
                  type="video"
                  alt={`${edit.title} video preview`}
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
