import { useState } from "react";
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
  return (
    <div className="media-screen">
      {children}
      <video
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
          <span className="hero-eyebrow hero-rise" style={{ animationDelay: "0.05s" }}>
            <span className="hero-eyebrow-dot" /> {hero.badge}
          </span>
          <h1 className="hero-h1">
            <span className="hero-rise" style={{ animationDelay: "0.14s" }}>
              {hero.h1a}
            </span>
            <span className="hero-rise dim" style={{ animationDelay: "0.23s" }}>
              {hero.h1b}
            </span>
          </h1>
        </div>

        <div className="hero-scene" aria-hidden>
          <div className="hero-laptop hero-piece" style={{ animationDelay: "0.4s" }}>
            <LaptopFrame>
              <MediaScreen src="/media/hero-web.mp4" poster="/media/hero-web-poster.jpg">
                <img className="shot" src="/media/work/pace-dashboard.webp" alt="" fetchPriority="high" />
              </MediaScreen>
            </LaptopFrame>
          </div>

          <div className="hero-phone hero-piece" style={{ animationDelay: "0.54s" }}>
            <PhoneFrame>
              <MediaScreen src="/media/hero-app.mp4" poster="/media/hero-app-poster.jpg">
                <img className="shot" src="/media/work/countcal-diary.webp" alt="" fetchPriority="high" />
              </MediaScreen>
            </PhoneFrame>
          </div>
        </div>
      </div>
    </section>
  );
}
