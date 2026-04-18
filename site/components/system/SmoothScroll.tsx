"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function LenisGsapBridge() {
  const lenis = useLenis();
  useEffect(() => {
    if (!lenis) return;
    const update = (time: number) => {
      // GSAP ticker runs in seconds; Lenis wants ms
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    const refresh = () => ScrollTrigger.refresh();
    lenis.on("scroll", ScrollTrigger.update);
    window.addEventListener("resize", refresh);
    return () => {
      gsap.ticker.remove(update);
      lenis.off("scroll", ScrollTrigger.update);
      window.removeEventListener("resize", refresh);
    };
  }, [lenis]);
  return null;
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.085,
        duration: 1.35,
        smoothWheel: true,
        syncTouch: false,
        autoRaf: false,
      }}
    >
      <LenisGsapBridge />
      {children}
    </ReactLenis>
  );
}
