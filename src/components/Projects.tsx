import { useRef } from "react";
import { projects, type Project } from "../data/content";
import { Frame } from "./Devices";
import { Reveal, useReveal } from "./Reveal";
import "./sections.css";

function Card({ delay, children }: { delay: number; children: React.ReactNode }) {
  const ref = useReveal<HTMLElement>(delay);
  return (
    <article className="work-card reveal-md" ref={ref}>
      {children}
    </article>
  );
}

export function Projects({ onOpen }: { onOpen: (p: Project) => void }) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  // drag-to-scroll for the horizontal carousel.
  // Listeners go on window, not a captured pointer: capturing the pointer on the
  // track retargets the click and the card buttons never fire.
  function onPointerDown(e: React.PointerEvent) {
    const el = trackRef.current;
    if (!el || e.button !== 0) return;
    const startX = e.clientX;
    const startScroll = el.scrollLeft;
    let moved = false;
    const move = (ev: PointerEvent) => {
      const dx = ev.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      if (!moved) return;
      el.classList.add("dragging");
      el.scrollLeft = startScroll - dx;
    };
    const up = () => {
      el.classList.remove("dragging");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      if (moved) el.dataset.dragged = "1";
      else delete el.dataset.dragged;
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  }

  return (
    <section className="section section-work" id="work">
      <div className="container">
        <Reveal className="section-head work-head">
          <div>
            <span className="eyebrow">Selected work</span>
            <h2 className="section-title">What we build, up close.</h2>
          </div>
          <span className="work-hint mono">Drag to explore →</span>
        </Reveal>
      </div>

      <div className="work-track" ref={trackRef} onPointerDown={onPointerDown} aria-label="Selected work">
        {projects.map((p, i) => (
          <Card key={p.id} delay={(i % 3) * 0.08}>
            <div className="work-media">
              <div className={`work-stage work-stage-${p.device}`}>
                <Frame kind={p.device}>
                  <img className="shot" src={p.shots[0].src} alt={`${p.name}: ${p.shots[0].label}`} loading="lazy" />
                </Frame>
              </div>
            </div>
            <div className="work-text">
              <span className="work-no">
                {p.no} · {p.category.split(" · ")[0]} · {p.year}
              </span>
              <h3>{p.name}</h3>
              <p>{p.tagline}</p>
              <div className="work-tags">
                {p.pillars.slice(0, 3).map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <button
                type="button"
                className="work-btn"
                onClick={(e) => {
                  if ((e.currentTarget.closest(".work-track") as HTMLElement)?.dataset.dragged) return;
                  onOpen(p);
                }}
              >
                View <span aria-hidden>→</span>
              </button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
