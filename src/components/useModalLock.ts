import { useEffect } from "react";

type LenisLike = { stop: () => void; start: () => void };

// Escape to close + lock the page while a modal is open.
// Lenis ignores body overflow, so it has to be stopped too.
export function useModalLock(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey, true);

    const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
    lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey, true);
      lenis?.start();
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);
}
