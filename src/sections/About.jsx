export default function About() {
  return (
    <section
      id="about"
      style={{ background: "#F4EFE6", borderTop: "3px solid #0B0B0C" }}
      className="py-8 md:py-12 lg:py-16"
      aria-label="About Kaushal Kumar"
    >
      {/* ── Section Header ─────────────────────────────────────── */}
      <div style={{ borderBottom: "3px solid #0B0B0C" }} className="pb-4 mb-8">
        <div className="global-container flex items-center gap-4">
          <span className="font-mono text-ink text-[10px] tracking-widest uppercase opacity-50">
            SECTION 02
          </span>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF4B26" }} />
          <h2 className="font-display text-ink text-2xl sm:text-3xl uppercase tracking-wider">
            ABOUT
          </h2>
        </div>
      </div>

      <div className="global-container">
        {/* Top: Biography (Text-only layout) */}
        <div className="border-b-3 border-ink pb-10 mb-10 text-ink">
          <p className="font-mono text-orange text-[10px] tracking-widest uppercase mb-2">
            EST. 2025
          </p>
          <h3 className="font-display text-2xl sm:text-3xl uppercase mb-3">
            Kaushal Kumar — Full Stack Developer
          </h3>
          <p className="font-body text-base leading-relaxed max-w-[80ch] mb-4">
            I am a Full Stack Developer passionate about building fast, reliable web
            applications with clean code and strong performance. I specialize in the MERN
            Stack, and I also work as a Motion Graphics Designer and Video Editor using After
            Effects and Premiere Pro.
          </p>
          <p className="font-body text-sm leading-relaxed max-w-[80ch] text-ink/75">
            I love turning ideas into scalable, user-friendly products that make an impact.
            Always looking to push boundaries and build clean, intentional interfaces.
          </p>
        </div>

        {/* Bottom Details Grid (No Profile Image) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 text-ink">
          {/* Education Block */}
          <div className="border-3 border-ink p-6 bg-paper flex flex-col gap-3 shadow-[4px_4px_0px_0px_#0B0B0C]">
            <h4 className="font-display text-xl uppercase border-b-2 border-ink pb-2 text-orange">
              EDUCATION
            </h4>
            <div className="font-body text-sm flex flex-col gap-1.5">
              <span className="font-bold">B.TECH CSE</span>
              <span className="font-mono text-xs text-ink/70">NIST UNIVERSITY · 2022–2026</span>
              <span className="font-mono text-xs text-ink/70">CGPA: 8.5</span>
            </div>
          </div>

          {/* Core Stack Block */}
          <div className="border-3 border-ink p-6 bg-paper flex flex-col gap-3 shadow-[4px_4px_0px_0px_#0B0B0C]">
            <h4 className="font-display text-xl uppercase border-b-2 border-ink pb-2 text-blue">
              CORE STACK
            </h4>
            <ul className="font-mono text-xs flex flex-col gap-2 uppercase tracking-wide">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue" />
                <span>MERN (MongoDB, Express, React, Node)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue" />
                <span>TypeScript</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue" />
                <span>Docker & Dev Tools</span>
              </li>
            </ul>
          </div>

          {/* Interests Block */}
          <div className="border-3 border-ink p-6 bg-paper flex flex-col gap-3 shadow-[4px_4px_0px_0px_#0B0B0C]">
            <h4 className="font-display text-xl uppercase border-b-2 border-ink pb-2 text-ink">
              INTERESTS
            </h4>
            <ul className="font-mono text-xs flex flex-col gap-2 uppercase tracking-wide">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-orange" />
                <span>Video Editing</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-orange" />
                <span>Motion Design</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-orange" />
                <span>AI Integration</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-orange" />
                <span>Web Development</span>
              </li>
            </ul>
          </div>

          {/* Work Philosophy Block */}
          <div className="border-3 border-ink p-6 bg-paper flex flex-col gap-3 shadow-[4px_4px_0px_0px_#0B0B0C]">
            <h4 className="font-display text-xl uppercase border-b-2 border-ink pb-2 text-ink">
              WORK PHILOSOPHY
            </h4>
            <ul className="font-mono text-xs flex flex-col gap-2 uppercase tracking-wide">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-ink" />
                <span>Build scalable & lightning-fast apps</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-ink" />
                <span>Focus on clean design & performance</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-ink" />
                <span>Open to remote & full-stack roles</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
