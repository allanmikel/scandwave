"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { setOceanProgress } from "./Ocean";

const Ocean = dynamic(() => import("./Ocean"), { ssr: false });

/**
 * Fixed fullscreen ocean backdrop that reacts to scroll progress.
 * Reads scrollY, maps it against page height, and drives three signals:
 *  - progress: 0..1 overall
 *  - chaos:    peaks in "resistance" scene
 *  - flow:     rises during "innovation"/"roadmap" scenes
 */
export default function OceanBackdrop() {
  const raf = useRef(0);

  useEffect(() => {
    const tick = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const y = Math.max(0, window.scrollY);
      const p = max > 0 ? y / max : 0;

      // chaos curve: bell around 0.12..0.28
      const bell = (x: number, c: number, w: number) =>
        Math.exp(-((x - c) ** 2) / (2 * w * w));
      const chaos = bell(p, 0.18, 0.09);

      // flow rises 0.32→0.72, then decays
      const flow =
        Math.max(0, Math.min(1, (p - 0.32) / 0.25)) *
        (1 - Math.max(0, Math.min(1, (p - 0.75) / 0.15)));

      setOceanProgress(p, chaos, flow);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <Ocean className="absolute inset-0 h-full w-full" />
      {/* Gradient masks for scene legibility */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(3,7,13,0.55) 0%, rgba(3,7,13,0.15) 35%, rgba(3,7,13,0.25) 60%, rgba(3,7,13,0.85) 100%)",
        }}
      />
    </div>
  );
}
