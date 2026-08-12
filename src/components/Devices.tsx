import type { ReactNode } from "react";
import type { DeviceKind } from "../data/content";
import "./devices.css";

/* ---------- iPhone ----------
   No island or home-bar overlay: every screenshot we stage is a real device
   capture that already contains its own status bar, Dynamic Island and home
   indicator. Drawing ours on top double-notched the shot. */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="dev phone phone-ios">
      <div className="dev-screen">{children}</div>
    </div>
  );
}

/* ---------- Android ----------
   Design-system hardware: punch-hole camera, gesture navbar, 38px radius.
   The navbar sits on its own opaque strip so it never lands on top of the
   app's tab bar. */
export function AndroidFrame({ children }: { children: ReactNode }) {
  return (
    <div className="dev android">
      <div className="dev-screen">{children}</div>
      <span className="android-punch" aria-hidden />
      <span className="android-navbar" aria-hidden>
        <i />
        <i />
        <i />
      </span>
    </div>
  );
}

/* ---------- Laptop ---------- */
export function LaptopFrame({ children }: { children: ReactNode }) {
  return (
    <div className="dev laptop">
      <div className="laptop-lid">
        <div className="laptop-cam" />
        <div className="dev-screen">{children}</div>
      </div>
      <div className="laptop-base">
        <div className="laptop-notch" />
      </div>
    </div>
  );
}

/* ---------- Desktop monitor ---------- */
export function DesktopFrame({ children }: { children: ReactNode }) {
  return (
    <div className="dev desktop">
      <div className="desktop-monitor">
        <div className="dev-screen">{children}</div>
      </div>
      <div className="desktop-neck" />
      <div className="desktop-foot" />
    </div>
  );
}

/* ---------- Pick hardware by kind ---------- */
export function Frame({ kind, children }: { kind: DeviceKind; children: ReactNode }) {
  if (kind === "phone") return <PhoneFrame>{children}</PhoneFrame>;
  if (kind === "laptop") return <LaptopFrame>{children}</LaptopFrame>;
  return <DesktopFrame>{children}</DesktopFrame>;
}

/* ---------- Peripherals (desktop scene) ---------- */
// realistic keyboard rows; numbers = relative key widths
const KB_ROWS: number[][] = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.6], // fn row + backspace
  [1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.5], // tab … \
  [1.75, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.25], // caps … enter
  [2.25, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.75], // shift … shift
  [1.25, 1.25, 1.25, 6.25, 1.25, 1.25, 1.25], // ctrl … space … ctrl
];

export function Keyboard() {
  return (
    <div className="keyboard" aria-hidden>
      <div className="kb-deck">
        {KB_ROWS.map((row, r) => (
          <div className={`kb-row${r === 0 ? " kb-fn" : ""}`} key={r}>
            {row.map((w, k) => (
              <span className="key" style={{ flexGrow: w }} key={k} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Mouse() {
  return (
    <div className="mouse" aria-hidden>
      <span className="mouse-split" />
      <span className="mouse-wheel" />
    </div>
  );
}

export function Cursor() {
  return (
    <svg className="cursor" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M5 3l14 7-6 1.6L9.6 18 5 3z"
        fill="#fff"
        stroke="#0a0a0a"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
