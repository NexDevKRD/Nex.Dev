import { useCallback, useEffect, useState } from "react";
import type { Project } from "../data/content";
import { Frame } from "./Devices";
import { TechIcon } from "./TechIcon";
import { useModalLock } from "./useModalLock";
import "./modal.css";

// Panel exit is CSS, so the component has to stay mounted for the length of
// the close animation before it hands control back to the parent.
const EXIT_MS = 300;

export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const [shot, setShot] = useState(0);
  const [closing, setClosing] = useState(false);

  const close = useCallback(() => {
    setClosing(true);
    window.setTimeout(() => {
      setClosing(false);
      onClose();
    }, EXIT_MS);
  }, [onClose]);

  useModalLock(!!project, close);
  useEffect(() => setShot(0), [project?.id]);

  const active = project?.shots[shot] ?? project?.shots[0];

  if (!project || !active) return null;

  return (
    <div
      className={`modal-scrim${closing ? " is-closing" : ""}`}
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label={project.name}
    >
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={close} aria-label="Close">
          ✕
        </button>

        <div className="modal-grid">
          {/* Gallery. First in the DOM so the stacked mobile order leads with
              the product, which is what the row was clicked for. */}
          <div className="pj-gallery">
            <div className={`pj-stage pj-stage-${project.device}`}>
              <Frame kind={project.device}>
                <img
                  className={`shot${project.trim ? ` shot--${project.trim}` : ""}`}
                  src={active.src}
                  alt={`${project.name}: ${active.label}`}
                />
              </Frame>
            </div>

            <p className="pj-cap">{active.cap}</p>

            <div className="pj-rail">
              {project.shots.map((s, i) => (
                <button
                  key={s.src}
                  type="button"
                  className={`pj-thumb${i === shot ? " is-active" : ""}`}
                  onClick={() => setShot(i)}
                  aria-label={s.label}
                  aria-pressed={i === shot}
                >
                  <img
                    className={project.trim === "bezel" ? "pj-thumb-bezel" : undefined}
                    src={s.src}
                    alt=""
                    loading="lazy"
                  />
                  <span className="mono">{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pj-info">
            <span className="modal-eyebrow">
              Project {project.no} · {project.year}
            </span>

            <div className="pj-title-row">
              {project.logo && <img className="pj-logo" src={project.logo} alt="" />}
              <div>
                <h2 className="modal-title">{project.name}</h2>
                <p className="pj-category mono">{project.category}</p>
              </div>
            </div>

            <p className="pj-lead">{project.tagline}</p>
            <p className="pj-desc">{project.desc}</p>

            <ul className="pj-pillars">
              {project.pillars.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>

            <div className="pj-stack">
              {project.stack.map((g) => (
                <div className="pj-stack-group" key={g.group}>
                  <span className="pj-stack-label mono">{g.group}</span>
                  <div className="pj-stack-items">
                    {g.items.map((it) => (
                      <span className="pj-tech" key={it.name}>
                        <TechIcon slug={it.slug} />
                        {it.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <a href="#contact" className="modal-cta" onClick={close}>
              Start a project <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
