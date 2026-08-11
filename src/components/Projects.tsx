import { projects, type Project } from "../data/content";
import { Frame } from "./Devices";
import { Reveal, useReveal } from "./Reveal";
import "./sections.css";

function Row({ project, index, onOpen }: { project: Project; index: number; onOpen: (p: Project) => void }) {
  const ref = useReveal<HTMLElement>(0);
  const shot = project.shots[0];

  return (
    <article
      className={`work-row reveal-md${index % 2 ? " work-row-flip" : ""}`}
      ref={ref}
      onClick={() => onOpen(project)}
    >
      <div className="work-visual">
        <div className={`work-stage work-stage-${project.device}`}>
          <Frame kind={project.device}>
            <img className="shot" src={shot.src} alt={`${project.name}: ${shot.label}`} loading="lazy" />
          </Frame>
        </div>
      </div>

      <div className="work-body">
        <span className="work-no">
          {project.no} · {project.category.split(" · ")[0]} · {project.year}
        </span>
        <h3>{project.name}</h3>
        <p className="work-tagline">{project.tagline}</p>
        <div className="work-tags">
          {project.pillars.slice(0, 3).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        {/* The whole row is the click target; this button carries the keyboard
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

        <div className="work-rows">
          {projects.map((p, i) => (
            <Row key={p.id} project={p} index={i} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </section>
  );
}
