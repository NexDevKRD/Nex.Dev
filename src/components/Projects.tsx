import { projects, type Project } from "../data/content";
import { Frame } from "./Devices";
import { Reveal, useReveal } from "./Reveal";
import "./sections.css";

// Bêrg captures are full phone renders already; framing them again would
// double the hardware. They stage bare, everything else sits in CSS hardware.
const isBare = (p: Project) => p.id === "berg";

function Card({ project, index, onOpen }: { project: Project; index: number; onOpen: (p: Project) => void }) {
  const ref = useReveal<HTMLElement>(Math.min(index % 3, 2) * 0.09);
  const shot = project.shots[0];

  return (
    <article className="work-card reveal-md" ref={ref} onClick={() => onOpen(project)}>
      <div className="work-media">
        <div className={`work-stage work-stage-${project.device}`}>
          {isBare(project) ? (
            <img className="work-bare" src={shot.src} alt={`${project.name}: ${shot.label}`} loading="lazy" />
          ) : (
            <Frame kind={project.device}>
              <img className="shot" src={shot.src} alt={`${project.name}: ${shot.label}`} loading="lazy" />
            </Frame>
          )}
        </div>
      </div>

      <div className="work-text">
        <span className="work-no">
          {project.no} · {project.category.split(" · ")[0]} · {project.year}
        </span>
        <h3>{project.name}</h3>
        <p className="work-tagline">{project.tagline}</p>
        {/* The whole card is the click target; this button carries the keyboard
            focus and the label, so it stays reachable without a tab trap. */}
        <button type="button" className="work-btn" onClick={() => onOpen(project)}>
          Open {project.name} <span aria-hidden>→</span>
        </button>
      </div>
    </article>
  );
}

export function Projects({ onOpen }: { onOpen: (p: Project) => void }) {
  return (
    <section className="section section-work" id="work">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Selected work</span>
          <h2 className="section-title">What we build, up close.</h2>
        </Reveal>

        <div className="work-grid">
          {projects.map((p, i) => (
            <Card key={p.id} project={p} index={i} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </section>
  );
}
