"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

// Start the scene only after the original logo is decoded, so the first
// visit cannot jump into the middle of the reveal on a cold image cache.
export default function DawnScene({ children, style }: { children: ReactNode; style: CSSProperties }) {
  const scene = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let cancelled = false;
    let frame = 0;
    const logo = scene.current?.querySelector<HTMLImageElement>(".hero-logo");
    const decoded = logo ? logo.decode().catch(() => undefined) : Promise.resolve();
    decoded.then(() => {
      if (cancelled) return;
      frame = requestAnimationFrame(() => {
        if (!cancelled) setReady(true);
      });
    });
    return () => { cancelled = true; cancelAnimationFrame(frame); };
  }, []);
  return <section ref={scene} className="hero" data-ready={ready} style={style} aria-label="새벽을 여는 MNDW">{children}</section>;
}
