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

export default function Logo() {
  const isMobile = useIsMobile();

  const projects = React.useMemo(
    () => [
      {
        title: "Apple Particle Animation",
        bgColor: "#ff7a18",
        video: "/videos/Apple%20Particle%20Animation.mp4",
      },
      {
        title: "Google Animation",
        bgColor: "#2a0f3f",
        video: "/videos/Google%20Animation.mp4",
      },
      {
        title: "Korean Text Animation",
        bgColor: "#ffffff",
        video: "/videos/Korean%20text%20animation.mp4",
      },
    ],
    []
  );

  const sceneRef = React.useRef(null);

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const thresholds = projects.map((_, i) => (i + 1) / projects.length);
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((v) => {
      const idx = thresholds.findIndex((t) => v <= t);
      setActiveIndex(idx === -1 ? thresholds.length - 1 : idx);
    });

    return () => unsubscribe();
  }, [scrollYProgress, thresholds]);

  const activeProject = projects[activeIndex];

  return (
    <section
      id="logo-animation-projects"
      ref={sceneRef}
      className="relative"
      style={{
        height: `${100 * projects.length}vh`,
        backgroundColor: activeProject.bgColor,
        transition: "background-color 400ms ease",
      }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
        <h2
          className={`text-3xl font-semibold z-10 text-center ${
            isMobile ? "mt-4" : "mt-8"
          } ${activeProject.bgColor === "#ffffff" ? "text-black" : "text-white"}`}
        >
          Logo Animation Projects
        </h2>

        <div
          className={`relative w-full flex-1 flex items-center justify-center ${
            isMobile ? "mt-4" : ""
          }`}
        >
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                activeIndex === idx ? "opacity-100 z-20" : "opacity-0 z-0 sm:z-10"
              }`}
              style={{ width: "85%", maxWidth: "1200px" }}
            >
              <AnimatePresence mode="wait">
                {activeIndex === idx && (
                  <MH3
                    key={project.title}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`block text-center text-[clamp(1.6rem,5vw,4rem)] sm:absolute sm:-top-21 sm:left-[35%] lg:left-[-5%] sm:mb-0 font-bangers italic font-semibold ${
                      isMobile ? "-mt-10" : ""
                    } ${project.bgColor === "#ffffff" ? "text-black" : "text-white"}`}
                    style={{
                      zIndex: 5,
                      textAlign: isMobile ? "center" : "left",
                    }}
                  >
                    {project.title}
                  </MH3>
                )}
              </AnimatePresence>

              <div
                className={`relative w-full overflow-hidden shadow-2xl md:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] ${
                  isMobile
                    ? "mb-6 rounded-xl aspect-video bg-black/30"
                    : "mb-10 sm:mb-12 rounded-2xl h-[62vh] sm:h-[66vh] bg-black/20"
                }`}
                style={{
                  zIndex: 10,
                  transition: "box-shadow 250ms ease",
                }}
              >
                <video
                  src={project.video}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls={isMobile}
                  preload="metadata"
                />

                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    zIndex: 11,
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0) 45%)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
