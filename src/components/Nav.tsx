import { useEffect, useState } from "react";
import { NexMark } from "./NexMark";
import { ThemeToggle } from "./ThemeToggle";
import "./nav.css";

const LINKS = [
  { id: "platform", label: "Platform" },
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "process", label: "Process" },
];

export function Nav() {
  const [active, setActive] = useState("");

  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      const mid = window.scrollY + window.innerHeight * 0.4;
      let current = "";
      for (const { id } of LINKS) {
        const el = document.getElementById(id);
        if (el && mid >= el.offsetTop) current = id;
      }
      setActive(current);
    };
    const requestCheck = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", requestCheck, { passive: true });
    window.addEventListener("resize", requestCheck);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestCheck);
      window.removeEventListener("resize", requestCheck);
    };
  }, []);

  return (
    <header className="nav">
      <div className="nav-inner container">
        <a className="nav-brand" href="#top">
          <NexMark size={28} />
          <span>Nex</span>
        </a>
        <nav className="nav-links">
          {LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} className={`nav-link${active === l.id ? " active" : ""}`}>
              {l.label}
            </a>
          ))}
          <a href="#contact" className="nav-cta">
            Start a project
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
