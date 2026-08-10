import { whatWeDo } from "../data/content";
import { Reveal, useReveal } from "./Reveal";
import "./sections.css";

function Tile({ delay, children }: { delay: number; children: React.ReactNode }) {
  const ref = useReveal<HTMLDivElement>(delay);
  return (
    <div className="wd-tile reveal-sm" ref={ref}>
      {children}
    </div>
  );
}

export function Services() {
  return (
    <section className="section section--light" id="services">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">What we do</span>
          <h2 className="section-title">Six layers. One team.</h2>
        </Reveal>

        <div className="wd-grid">
          {whatWeDo.map((w, i) => (
            <Tile key={w.title} delay={(i % 3) * 0.06 + Math.floor(i / 3) * 0.04}>
              <h3>{w.title}</h3>
              <p>{w.line}</p>
              <div className="wd-tools">
                {w.tools.map((tool) => (
                  <img
                    key={tool.slug}
                    className="tech-ic"
                    width={22}
                    height={22}
                    src={`/icons/${tool.slug}.svg`}
                    alt={tool.name}
                    title={tool.name}
                    loading="lazy"
                  />
                ))}
              </div>
            </Tile>
          ))}
        </div>
      </div>
    </section>
  );
}
