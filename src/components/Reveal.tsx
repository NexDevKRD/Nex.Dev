import { useEffect, useRef, type ReactNode } from "react";
import "./reveal.css";

/**
 * Scroll-in reveal: opacity + translateY only, once, per §7 of the design system.
 * One IntersectionObserver shared by every instance — the transition itself is
 * CSS, so nothing runs on the main thread while scrolling.
 */
const io =
  typeof IntersectionObserver === "undefined"
    ? null
    : new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            e.target.classList.add("is-in");
            io?.unobserve(e.target);
          }
        },
        { rootMargin: "-60px 0px" },
      );

export function useReveal<T extends HTMLElement>(delay = 0) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!io) {
      el.classList.add("is-in");
      return;
    }
    if (delay) el.style.transitionDelay = `${delay}s`;
    io.observe(el);
    return () => io.unobserve(el);
  }, [delay]);

  return ref;
}

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useReveal<HTMLDivElement>(delay);
  return (
    <div className={`reveal${className ? ` ${className}` : ""}`} ref={ref}>
      {children}
    </div>
  );
}
