import { whatWeDo } from "../data/content";
import { Reveal, useReveal } from "./Reveal";
import { TechIcon } from "./TechIcon";
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
              <ul className="wd-tools">
                {w.tools.map((tool) => (
                  <li className="wd-tool" key={tool.name}>
                    <TechIcon slug={tool.slug} />
                    {tool.name}
                  </li>
                ))}
              </ul>
            </Tile>
          ))}
        </div>
      </div>
    </section>
  );
}
