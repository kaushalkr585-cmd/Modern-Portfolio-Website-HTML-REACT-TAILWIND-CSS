import React from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";

const MH3 = motion.h3;

// 🔹 Custom Hook: Detects if screen size matches "mobile"
const useIsMobile = (query = "(max-width: 639px)") => {
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== "undefined" && window.matchMedia(query).matches
  );

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);

    mql.addEventListener?.("change", handler) || mql.addListener(handler);
    setIsMobile(mql.matches);

    return () =>
      mql.removeEventListener?.("change", handler) || mql.removeListener(handler);
  }, [query]);

  return isMobile;
};

export default function MusicVideoEdit() {
  const isMobile = useIsMobile();

  //  Background colors selected by me (premium dark tones)
  const edits = React.useMemo(
    () => [
      {
        title: "Sadie Sink Edit",
        bgColor: "#070A0F", // deep midnight
        video: "/Sadie.mp4",
      },
      {
        title: "Vecna Edit",
        bgColor: "#0B0B0B", // pure dark
        video: "/Vecna.mp4",
      },
      {
        title: "Will Edit",
        bgColor: "#0A1220", // bluish dark
        video: "/Will_Buyers.mp4",
      },
    ],
    []
  );

  const sceneRef = React.useRef(null);

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const thresholds = edits.map((_, i) => (i + 1) / edits.length);
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((v) => {
      const idx = thresholds.findIndex((t) => v <= t);
      setActiveIndex(idx === -1 ? thresholds.length - 1 : idx);
    });

    return () => unsubscribe();
  }, [scrollYProgress, thresholds]);

  const activeEdit = edits[activeIndex];

  return (
    <section
      id="music-video-edit"
      ref={sceneRef}
      className="relative"
      style={{
        height: `${100 * edits.length}vh`,
        backgroundColor: activeEdit.bgColor,
        transition: "background-color 450ms ease",
      }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-4">
        {/* Section Title */}
        <h2
          className={`text-3xl font-semibold z-10 text-center ${
            isMobile ? "mt-4" : "mt-8"
          } text-white`}
        >
          Music Video Edit
        </h2>

        {/* Main Display */}
        <div
          className={`relative w-full flex-1 flex items-center justify-center ${
            isMobile ? "mt-6" : "mt-10"
          }`}
        >
          {edits.map((edit, idx) => (
            <div
              key={edit.title}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                activeIndex === idx ? "opacity-100 z-20" : "opacity-0 z-0"
              }`}
              style={{ width: "100%", maxWidth: "1200px" }}
            >
              {/* Animated title */}
              <AnimatePresence mode="wait">
                {activeIndex === idx && (
                  <MH3
                    key={edit.title}
                    initial={{ opacity: 0, y: -25 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 25 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`block text-center text-[clamp(1.6rem,4.5vw,3.5rem)] font-bangers italic font-semibold text-white ${
                      isMobile ? "-mt-6" : "-mt-8"
                    }`}
                    style={{ zIndex: 5 }}
                  >
                    {edit.title}
                  </MH3>
                )}
              </AnimatePresence>

              {/*  1080x1080 Wrapper (Square on both Mobile + Desktop) */}
              <div className="w-full flex justify-center mt-6">
                <div
                  className="relative overflow-hidden rounded-2xl shadow-2xl bg-black/30"
                  style={{
                    width: isMobile ? "92vw" : "520px",
                    maxWidth: "520px",
                    aspectRatio: "1 / 1", // 🔥 ALWAYS 1080x1080 square
                    zIndex: 10,
                    border: "1px solid rgba(255,255,255,0.10)",
                  }}
                >
                  <video
                    src={edit.video}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls={isMobile}
                    preload="metadata"
                  />

                  {/* subtle glossy overlay */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.35) 100%)",
                    }}
                  />
                </div>
              </div>

              {/* Subtitle */}
              <p className="text-center text-white/60 mt-6 text-sm">
                Scroll down to view next edit ⬇️
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
