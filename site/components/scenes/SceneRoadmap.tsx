"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Dict } from "@/lib/i18n";
import Reveal from "@/components/system/Reveal";

export default function SceneRoadmap({ dict }: { dict: Dict }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineFill = useTransform(scrollYProgress, [0.12, 0.88], ["0%", "100%"]);

  return (
    <section ref={ref} id="phase" className="scene relative py-40 md:py-56">
      <div className="mx-auto max-w-[1480px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-8">
          <Reveal className="col-span-12 md:col-span-5">
            <p className="mono-label">{dict.roadmap.eyebrow}</p>
            <h2 className="display mt-6 text-[clamp(2rem,4.8vw,4.25rem)] text-ivory">
              {dict.roadmap.heading}
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-ivory-dim md:text-lg">
              {dict.roadmap.body}
            </p>
          </Reveal>
        </div>

        <div className="relative mt-20">
          {/* Progress rail */}
          <div className="absolute left-4 top-0 h-full w-px bg-ivory/8 md:left-1/2 md:-translate-x-1/2">
            <motion.div
              style={{ height: lineFill }}
              className="w-px bg-gradient-to-b from-cyan via-cyan/60 to-transparent"
            />
          </div>

          <ol className="space-y-12 md:space-y-24">
            {dict.roadmap.stages.map((stage, i) => {
              const leftAligned = i % 2 === 0;
              const isActive = stage.status === "Pågår" || stage.status === "Active";
              return (
                <li key={stage.n} className="relative pl-12 md:pl-0">
                  {/* Dot */}
                  <span
                    className={`absolute left-4 top-2 -translate-x-1/2 md:left-1/2 md:top-1 ${
                      isActive ? "" : ""
                    }`}
                    aria-hidden
                  >
                    <span
                      className={`block h-3 w-3 rounded-full ${
                        isActive ? "bg-cyan pulse-dot" : "bg-foam/40"
                      }`}
                    />
                    {isActive && (
                      <span className="absolute inset-0 -m-2 rounded-full border border-cyan/40" />
                    )}
                  </span>

                  <Reveal>
                    <div
                      className={`md:grid md:grid-cols-2 md:gap-16 ${
                        leftAligned ? "" : "md:[&>*:first-child]:col-start-2"
                      }`}
                    >
                      <div
                        className={`${
                          leftAligned ? "md:text-right md:pr-12" : "md:pl-12"
                        }`}
                      >
                        <div
                          className={`flex items-baseline gap-3 ${
                            leftAligned ? "md:justify-end" : ""
                          }`}
                        >
                          <span className="display text-4xl text-cyan md:text-6xl">
                            {stage.n}
                          </span>
                          <span
                            className={`mono-label ${
                              isActive ? "text-cyan" : "text-foam/70"
                            }`}
                          >
                            {stage.status}
                          </span>
                        </div>
                        <h3 className="display mt-4 text-2xl text-ivory md:text-3xl">
                          {stage.title}
                        </h3>
                        <p
                          className={`mt-4 max-w-md text-sm leading-relaxed text-ivory-dim/80 md:text-base ${
                            leftAligned ? "md:ml-auto" : ""
                          }`}
                        >
                          {stage.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
