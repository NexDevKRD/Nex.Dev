import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { morphStages } from "../data/content";
import { AndroidFrame, Cursor, DesktopFrame, Keyboard, LaptopFrame, Mouse, PhoneFrame } from "./Devices";
import "./morph.css";

// Real product screenshot staged inside a hardware frame.
function Shot({ src, alt }: { src: string; alt: string }) {
  return <img className="shot" src={src} alt={alt} loading="lazy" decoding="async" />;
}

function baseScale(stage: number) {
  const mobile = window.innerWidth < 680;
  const tablet = window.innerWidth < 1080;
  if (stage === 0) return mobile ? 0.5 : tablet ? 0.64 : 0.8;
  if (stage === 1) return mobile ? 0.42 : tablet ? 0.6 : 0.72;
  return mobile ? 0.32 : tablet ? 0.44 : 0.54;
}

export function DeviceMorph() {
  const rootRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const reduced =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduced || !rootRef.current || !pinRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const groups = gsap.utils.toArray<HTMLElement>(".morph-group");
      if (groups.length < 3) return;

      groups.forEach((g, i) => {
        gsap.set(g, { xPercent: -50, yPercent: -50, scale: baseScale(i), force3D: true });
      });
      gsap.set(groups[0], { opacity: 1 });
      gsap.set(groups[1], { opacity: 0 });
      gsap.set(groups[2], { opacity: 0 });
      gsap.set(".stage-web .laptop-lid", { rotateX: 84, transformOrigin: "50% 100%" });
      gsap.set(".stage-desk .desk-monitor", { y: -260, opacity: 0 });
      gsap.set(".stage-desk .desk-kb", { x: -360, opacity: 0 });
      gsap.set(".stage-desk .desk-mouse", { x: 360, opacity: 0 });

      const tl = gsap.timeline();
      // 1 — phones glide apart, iPhone left, Android right (smooth, no flip)
      tl.fromTo(".twin-ios", { x: 0 }, { x: -170, duration: 1, ease: "power2.out" }, 0)
        .fromTo(".twin-android", { x: 0 }, { x: 170, duration: 1, ease: "power2.out" }, 0);
      // 2 — phones out, MacBook appears + opens
      tl.to(groups[0], { opacity: 0, duration: 0.3 }, 1.15)
        .set(groups[1], { opacity: 1 }, 1.22)
        .fromTo(".stage-web .laptop", { scale: 0.9 }, { scale: 1, duration: 0.5, ease: "power3.out" }, 1.22)
        .to(".stage-web .laptop-lid", { rotateX: 0, duration: 0.6, ease: "power3.out" }, 1.28);
      // 3 — MacBook closes, then monitor + keyboard + mouse fly in from the sides and stay
      tl.to(".stage-web .laptop-lid", { rotateX: 84, duration: 0.5, ease: "power2.in" }, 2.15)
        .to(groups[1], { opacity: 0, duration: 0.25 }, 2.55)
        .set(groups[2], { opacity: 1 }, 2.6)
        .to(".stage-desk .desk-monitor", { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 2.6)
        .to(".stage-desk .desk-kb", { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 2.78)
        .to(".stage-desk .desk-mouse", { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 2.92);

      ScrollTrigger.create({
        trigger: rootRef.current,
        pin: pinRef.current,
        start: "top top",
        end: "+=380%",
        scrub: 0.4,
        animation: tl,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onRefresh: () => groups.forEach((g, i) => gsap.set(g, { scale: baseScale(i) })),
        onUpdate: (self) => {
          const next = self.progress < 0.34 ? 0 : self.progress < 0.68 ? 1 : 2;
          setActive((cur) => (cur === next ? cur : next));
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  if (reduced) {
    return (
      <section className="morph morph-static" id="platform" ref={rootRef}>
        <div className="container morph-static-inner">
          <div className="morph-top">
            <span>Built once</span>
            <span>Runs everywhere</span>
          </div>
          {morphStages.map((stage) => (
            <article className="morph-static-row" key={stage.no}>
              <div className="morph-static-visual">
                {stage.scene === "mobile" && (
                  <PhoneFrame>
                    <Shot src={stage.shot} alt={stage.headline} />
                  </PhoneFrame>
                )}
                {stage.scene === "web" && (
                  <LaptopFrame>
                    <Shot src={stage.shot} alt={stage.headline} />
                  </LaptopFrame>
                )}
                {stage.scene === "dash" && (
                  <DesktopFrame>
                    <Shot src={stage.shot} alt={stage.headline} />
                  </DesktopFrame>
                )}
              </div>
              <div>
                <span className="morph-kicker">{stage.kicker}</span>
                <h2>{stage.headline}</h2>
                <p>{stage.sub}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  const stage = morphStages[active];

  return (
    <section className="morph" id="platform" ref={rootRef}>
      <div className="morph-pin" ref={pinRef}>
        <div className="container morph-shell">
          <div className="morph-top">
            <span>Built once</span>
            <span>Runs everywhere</span>
          </div>

          <div className="morph-count" aria-label="Platform stage">
            {morphStages.map((s, i) => (
              <span className={i === active ? "active" : ""} key={s.no}>
                {s.no}
              </span>
            ))}
          </div>

          <div className="morph-stage" aria-hidden>
            <div className="morph-group stage-mobile">
              <div className="twin twin-ios">
                <PhoneFrame>
                  <Shot src={morphStages[0].shot} alt="" />
                </PhoneFrame>
              </div>
              <div className="twin twin-android">
                <AndroidFrame>
                  <Shot src={morphStages[0].shotB ?? morphStages[0].shot} alt="" />
                </AndroidFrame>
              </div>
            </div>

            <div className="morph-group stage-web">
              <LaptopFrame>
                <Shot src={morphStages[1].shot} alt="" />
              </LaptopFrame>
            </div>

            <div className="morph-group stage-desk">
              <div className="desk-monitor">
                <DesktopFrame>
                  <>
                    <Shot src={morphStages[2].shot} alt="" />
                    <Cursor />
                  </>
                </DesktopFrame>
              </div>
              <div className="desk-input">
                <div className="desk-kb">
                  <Keyboard />
                </div>
                <div className="desk-mouse">
                  <Mouse />
                </div>
              </div>
            </div>
          </div>

          <div className="morph-caption" aria-live="polite">
            <span className="morph-kicker">{stage.kicker}</span>
            <h2>{stage.headline}</h2>
            <p>{stage.sub}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
