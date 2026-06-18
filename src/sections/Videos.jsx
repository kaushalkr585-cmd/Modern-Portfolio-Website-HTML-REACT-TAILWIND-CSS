import React from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";

const MH3 = motion.h3;

// ─── helpers ────────────────────────────────────────────────────────────────
const fmt = (s) => {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

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

// ─── SVG Icons ───────────────────────────────────────────────────────────────
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M8 5v14l11-7z" />
  </svg>
);
const PauseIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);
const MuteIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
  </svg>
);
const UnmuteIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
  </svg>
);

// ─── VideoCard ───────────────────────────────────────────────────────────────
function VideoCard({ edit, isActive, isMobile, aspectRatios, onMetaLoaded }) {
  const videoRef = React.useRef(null);
  const progressRef = React.useRef(null);

  const [playing, setPlaying] = React.useState(true);
  const [muted, setMuted] = React.useState(true);
  const [progress, setProgress] = React.useState(0);      // 0–1
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [showControls, setShowControls] = React.useState(false);
  const [dragging, setDragging] = React.useState(false);
  const hideTimer = React.useRef(null);

  // ── auto-play / pause when slide becomes active ──────────────────────────
  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isActive) {
      v.play().catch(() => {});
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }, [isActive]);

  // ── time update ───────────────────────────────────────────────────────────
  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || dragging) return;
    setCurrentTime(v.currentTime);
    setDuration(v.duration || 0);
    setProgress(v.duration ? v.currentTime / v.duration : 0);
  };

  // ── play / pause toggle ──────────────────────────────────────────────────
  const togglePlay = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else           { v.pause(); setPlaying(false); }
    nudgeControls();
  };

  // ── mute toggle ──────────────────────────────────────────────────────────
  const toggleMute = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    nudgeControls();
  };

  // ── progress bar interaction ──────────────────────────────────────────────
  const seekTo = (clientX) => {
    const bar = progressRef.current;
    const v = videoRef.current;
    if (!bar || !v || !v.duration) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    v.currentTime = ratio * v.duration;
    setProgress(ratio);
    setCurrentTime(v.currentTime);
  };

  const onBarMouseDown = (e) => {
    e.stopPropagation();
    setDragging(true);
    seekTo(e.clientX);
  };
  const onBarTouchStart = (e) => {
    e.stopPropagation();
    setDragging(true);
    seekTo(e.touches[0].clientX);
  };

  React.useEffect(() => {
    if (!dragging) return;
    const onMove = (e) => seekTo(e.clientX ?? e.touches?.[0]?.clientX);
    const onUp   = ()  => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup",   onUp);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend",  onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup",   onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend",  onUp);
    };
  }, [dragging]);

  // ── auto-hide controls after 2.5 s of no interaction ─────────────────────
  const nudgeControls = () => {
    setShowControls(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowControls(false), 2500);
  };
  React.useEffect(() => () => clearTimeout(hideTimer.current), []);

  // ── container sizing ──────────────────────────────────────────────────────
  const ratio = aspectRatios[edit.title];
  const isPortrait  = ratio !== undefined && ratio < 1;
  const isLandscape = ratio !== undefined && ratio > 1.2;

  let containerStyle = {};
  if (isPortrait) {
    const maxH = isMobile ? "70vh" : "75vh";
    containerStyle = { height: maxH, aspectRatio: `${ratio}`, maxHeight: maxH };
  } else if (isLandscape) {
    containerStyle = {
      width: isMobile ? "92vw" : "min(900px, 88vw)",
      aspectRatio: `${ratio}`,
      maxWidth: isMobile ? "92vw" : "900px",
    };
  } else {
    containerStyle = {
      width: isMobile ? "92vw" : "520px",
      maxWidth: "520px",
      aspectRatio: ratio ? `${ratio}` : "1 / 1",
    };
  }

  return (
    <div
      className="relative overflow-hidden rounded-2xl shadow-2xl bg-black"
      style={{
        ...containerStyle,
        zIndex: 10,
        border: "1px solid rgba(255,255,255,0.10)",
        transition: "aspect-ratio 0.3s ease, width 0.3s ease, height 0.3s ease",
        cursor: "pointer",
      }}
      onMouseMove={nudgeControls}
      onMouseEnter={nudgeControls}
      onMouseLeave={() => {
        clearTimeout(hideTimer.current);
        hideTimer.current = setTimeout(() => setShowControls(false), 800);
      }}
      onTouchStart={nudgeControls}
      onClick={togglePlay}
    >
      {/* ── Video ── */}
      <video
        ref={videoRef}
        src={edit.video}
        className="w-full h-full object-contain"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedMetadata={(e) => {
          onMetaLoaded(e, edit.title);
          setDuration(e.target.duration || 0);
        }}
        onTimeUpdate={handleTimeUpdate}
      />

      {/* ── Subtle top-to-middle gloss ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* ── Big centre play/pause icon flash ── */}
      <AnimatePresence>
        {!playing && (
          <motion.div
            key="big-play"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "rgba(0,0,0,0.55)",
                backdropFilter: "blur(8px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1.5px solid rgba(255,255,255,0.25)",
              }}
            >
              <PlayIcon />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Controls bar ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "10px 14px 12px",
          background:
            "linear-gradient(0deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.0) 100%)",
          backdropFilter: "blur(4px)",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          opacity: showControls ? 1 : 0,
          transform: showControls ? "translateY(0)" : "translateY(6px)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          pointerEvents: showControls ? "auto" : "none",
          zIndex: 20,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Progress bar ── */}
        <div
          ref={progressRef}
          onMouseDown={onBarMouseDown}
          onTouchStart={onBarTouchStart}
          style={{
            height: 4,
            borderRadius: 9999,
            background: "rgba(255,255,255,0.25)",
            cursor: "pointer",
            position: "relative",
            userSelect: "none",
          }}
        >
          {/* filled track */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              width: `${progress * 100}%`,
              borderRadius: 9999,
              background: "linear-gradient(90deg, #a78bfa, #ec4899)",
              transition: dragging ? "none" : "width 0.1s linear",
            }}
          />
          {/* thumb */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: `${progress * 100}%`,
              transform: "translate(-50%, -50%)",
              width: dragging ? 16 : 12,
              height: dragging ? 16 : 12,
              borderRadius: "50%",
              background: "#fff",
              boxShadow: "0 0 6px rgba(0,0,0,0.5)",
              transition: dragging ? "none" : "width 0.15s, height 0.15s",
              cursor: "pointer",
            }}
          />
        </div>

        {/* ── Bottom row: play | time | mute ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            style={{
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: "50%",
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              cursor: "pointer",
              flexShrink: 0,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.22)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>

          {/* Time */}
          <span
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: 12,
              fontFamily: "monospace",
              letterSpacing: "0.04em",
              flexShrink: 0,
            }}
          >
            {fmt(currentTime)} / {fmt(duration)}
          </span>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Mute */}
          <button
            onClick={toggleMute}
            style={{
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: "50%",
              width: 34,
              height: 34,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              cursor: "pointer",
              flexShrink: 0,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.22)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? <MuteIcon /> : <UnmuteIcon />}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function MusicVideoEdit() {
  const isMobile = useIsMobile();

  const edits = React.useMemo(
    () => [
      { title: "Video 1", bgColor: "#070A0F", video: "/podcast1.mp4" },
      { title: "Video 2", bgColor: "#0B0B0B", video: "/rawshort.mp4" },
      /* { title: "Video 3", bgColor: "#1A0A0A", video: "/Steve.mp4" }, */
    ],
    []
  );

  const [aspectRatios, setAspectRatios] = React.useState({});

  const handleVideoMeta = (e, title) => {
    const { videoWidth, videoHeight } = e.target;
    if (videoWidth && videoHeight) {
      setAspectRatios((prev) => ({ ...prev, [title]: videoWidth / videoHeight }));
    }
  };

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
          Video Edits


          
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
                activeIndex === idx ? "opacity-100 z-20" : "opacity-0 z-0 pointer-events-none"
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

              {/* Video with custom controls */}
              <div className="w-full flex justify-center mt-6">
                <VideoCard
                  edit={edit}
                  isActive={activeIndex === idx}
                  isMobile={isMobile}
                  aspectRatios={aspectRatios}
                  onMetaLoaded={handleVideoMeta}
                />
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
