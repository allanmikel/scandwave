"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Dict } from "@/lib/i18n";
import Reveal from "@/components/system/Reveal";

export default function SceneShift({ dict }: { dict: Dict }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineScale = useTransform(scrollYProgress, [0.15, 0.55], [0, 1]);

  return (
    <section ref={ref} className="scene relative min-h-[100vh] overflow-hidden py-40 md:py-52">
      <div aria-hidden className="absolute inset-0 -z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/media/westcoast/shift.jpg"
          alt=""
          className="h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-abyss via-abyss/70 to-abyss" />
      </div>
      <div className="relative mx-auto max-w-[1480px] px-6 md:px-10">
        <div className="relative mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="mono-label text-center">{dict.shift.eyebrow}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="display mt-10 text-[clamp(2.25rem,6.5vw,5.75rem)] text-ivory">
              {dict.shift.heading}
              <br />
              <span className="italic text-cyan">{dict.shift.headingAccent}</span>
            </h2>
          </Reveal>

          <motion.div
            style={{ scaleX: lineScale }}
            className="mx-auto mt-14 h-px w-64 origin-center bg-gradient-to-r from-transparent via-cyan to-transparent"
          />

          <Reveal delay={0.3}>
            <p className="mx-auto mt-14 max-w-2xl text-lg leading-relaxed text-ivory-dim md:text-xl">
              {dict.shift.body}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
