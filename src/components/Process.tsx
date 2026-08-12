import { process } from "../data/content";
import { Reveal, useReveal } from "./Reveal";
import "./process.css";

function Step({ step, index }: { step: (typeof process)[number]; index: number }) {
  const ref = useReveal<HTMLLIElement>(index * 0.07);

  return (
    <li className="ps-step reveal-sm" ref={ref}>
      <span className="ps-no mono">{step.no}</span>
      <div className="ps-body">
        <h3>{step.title}</h3>
        <p className="ps-line">{step.line}</p>
        <p className="ps-detail">{step.detail}</p>
      </div>
      <span className="ps-meta mono">{step.meta}</span>
    </li>
  );
}

export function Process() {
  return (
    <section className="section process" id="process">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">How we work</span>
          <h2 className="section-title">What happens after you call.</h2>
          <p className="ps-intro">
            Five steps, every project, no surprises in the middle.
          </p>
        </Reveal>

        <ol className="ps-list">
          {process.map((step, i) => (
            <Step key={step.no} step={step} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}
