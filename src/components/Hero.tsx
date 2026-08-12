import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { hero } from "../data/content";
import { LaptopFrame, PhoneFrame } from "./Devices";
import "./reveal.css";
import "./hero.css";

// Plays a looping video inside a device screen; the real product shot sits
// underneath and carries the frame until the clip is decoded — or if it fails.
function MediaScreen({
  src,
  poster,
  children,
  fit = "cover",
}: {
  src: string;
  poster: string;
  children: ReactNode;
  fit?: "cover" | "contain";
}) {
  const [ok, setOk] = useState(false);
  const ref = useRef<HTMLVideoElement | null>(null);

  // Two clips decoding forever costs real battery once the hero has scrolled
  // away. Play only while the frame is on screen.
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) void el.play().catch(() => {});
      else el.pause();
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="media-screen">
      {children}
      <video
        ref={ref}
        className={`media-vid media-vid-${fit}`}
        src={src}
        poster={poster}
        preload="metadata"
        autoPlay
        muted
        loop
        playsInline
        style={{ opacity: ok ? 1 : 0 }}
        onLoadedData={() => setOk(true)}
        onError={() => setOk(false)}
      />
    </div>
  );
}

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-inner container">
        <div className="hero-copy">
          <h1 className="hero-h1">
            <span className="hero-rise" style={{ animationDelay: "0.06s" }}>
              {hero.h1a}
            </span>
            <span className="hero-rise" style={{ animationDelay: "0.15s" }}>
              {hero.h1b}
            </span>
          </h1>
          <p className="hero-sub hero-rise" style={{ animationDelay: "0.26s" }}>
            {hero.sub}
          </p>
          <div className="hero-cta hero-rise" style={{ animationDelay: "0.34s" }}>
            <a className="btn-primary" href="#contact">
              {hero.ctaPrimary} <span>→</span>
            </a>
            <a className="btn-ghost" href="#work">
              {hero.ctaGhost} <span>→</span>
            </a>
          </div>
        </div>

        {/* Two nested boxes per device on purpose: the outer one carries the
            entrance animation (which resets transform), the inner one carries
            the scale. One element could not hold both. */}
        <div className="hero-scene" aria-hidden>
          <div className="hero-slot hero-laptop hero-piece" style={{ animationDelay: "0.4s" }}>
            <div className="hero-fit hero-fit-laptop">
              <LaptopFrame>
                <MediaScreen src="/media/hero-web.mp4" poster="/media/hero-web-poster.jpg">
                  <img className="shot" src="/media/work/pace-dashboard.webp" alt="" fetchPriority="high" />
                </MediaScreen>
              </LaptopFrame>
            </div>
          </div>

          <div className="hero-slot hero-phone hero-piece" style={{ animationDelay: "0.54s" }}>
            <div className="hero-fit hero-fit-phone">
              <PhoneFrame>
                <MediaScreen src="/media/hero-app.mp4" poster="/media/hero-app-poster.jpg">
                  <img
                    className="shot shot--status"
                    src="/media/work/countcal-diary.webp"
                    alt=""
                    fetchPriority="high"
                  />
                </MediaScreen>
              </PhoneFrame>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
