import { useState } from "react";
import type { ReactNode } from "react";
import { hero } from "../data/content";
import { LaptopFrame, PhoneFrame } from "./Devices";
import "./reveal.css";
import "./hero.css";

// Plays a looping video inside a device screen; the real product shot sits
// underneath and carries the frame until the clip is decoded — or if it fails.
// Both clips run continuously: they are the hero, so they never pause.
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
        preload="auto"
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

        {/* The slot carries the original scale and its corner origin; the inner
            box carries the entrance, whose keyframes end at transform:none and
            would otherwise wipe that scale. */}
        <div className="hero-scene" aria-hidden>
          <div className="hero-laptop">
            <div className="hero-piece" style={{ animationDelay: "0.4s" }}>
              <LaptopFrame>
                <MediaScreen src="/media/hero-web.mp4" poster="/media/hero-web-poster.jpg">
                  <img className="shot" src="/media/work/pace-dashboard.webp" alt="" fetchPriority="high" />
                </MediaScreen>
              </LaptopFrame>
            </div>
          </div>

          <div className="hero-phone">
            <div className="hero-piece" style={{ animationDelay: "0.54s" }}>
              <PhoneFrame>
                <MediaScreen src="/media/hero-app.mp4" poster="/media/hero-app-poster.jpg">
                  <img className="shot" src="/media/work/countcal-diary.webp" alt="" fetchPriority="high" />
                </MediaScreen>
              </PhoneFrame>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
