import { useState } from "react";

export default function ProjectMedia({ src, type = "image", alt = "Project preview" }) {
  const [aspectRatio, setAspectRatio] = useState("16/9");

  const determineRatio = (w, h) => {
    if (!w || !h) return;
    const ratio = w / h;
    if (Math.abs(ratio - 16 / 9) < 0.15) {
      setAspectRatio("16/9");
    } else if (Math.abs(ratio - 9 / 16) < 0.15) {
      setAspectRatio("9/16");
    } else if (Math.abs(ratio - 1) < 0.15) {
      setAspectRatio("1/1");
    } else {
      setAspectRatio(w > h ? "16/9" : "9/16");
    }
  };

  const handleImageLoad = (e) => {
    const w = e.target.naturalWidth;
    const h = e.target.naturalHeight;
    determineRatio(w, h);
  };

  const handleVideoMetadata = (e) => {
    const w = e.target.videoWidth;
    const h = e.target.videoHeight;
    determineRatio(w, h);
  };

  const isVideo = type === "video" || src.endsWith(".mp4") || src.endsWith(".webm");

  return (
    <div
      className="project-media-wrapper w-full mx-auto overflow-hidden bg-ink border-3 border-ink relative"
      style={{
        aspectRatio: aspectRatio,
        maxHeight: "var(--media-max-height, 500px)",
      }}
    >
      {isVideo ? (
        <video
          src={src}
          onLoadedMetadata={handleVideoMetadata}
          className="w-full h-full object-contain block bg-black"
          autoPlay
          muted
          loop
          playsInline
          controls
          preload="metadata"
          aria-label={alt}
        />
      ) : (
        <img
          src={src}
          alt={alt}
          onLoad={handleImageLoad}
          className="w-full h-full object-contain block bg-black"
          loading="lazy"
        />
      )}
    </div>
  );
}
