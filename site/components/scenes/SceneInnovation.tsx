"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import type { Dict } from "@/lib/i18n";
import Reveal, { RevealStagger, staggerItem } from "@/components/system/Reveal";

const VIDEOS = [
  { id: "wave", src: "/media/symmetrywave.mp4", label: "Hydrodynamic field · CFD" },
  { id: "p", src: "/media/p-field.mp4", label: "Pressure distribution" },
  { id: "v", src: "/media/v-field.mp4", label: "Velocity profile" },
  { id: "tunnel", src: "/media/p-tunnel.mp4", label: "Tunnel section" },
];

export default function SceneInnovation({ dict }: { dict: Dict }) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const panelY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} id="concept" className="scene relative py-40 md:py-56">
      <div className="mx-auto max-w-[1480px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-8">
          <Reveal className="col-span-12 md:col-span-5">
            <p className="mono-label">{dict.innovation.eyebrow}</p>
            <h2 className="display mt-6 text-[clamp(2rem,4.8vw,4.25rem)] text-ivory">
              {dict.innovation.heading}
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-ivory-dim md:text-lg">
              {dict.innovation.body}
            </p>
          </Reveal>

          <motion.div
            style={{ y: panelY }}
            className="col-span-12 md:col-span-7"
          >
            <Reveal>
              <div className="relative aspect-[16/10] overflow-hidden border border-ivory/10 bg-deep">
                {VIDEOS.map((v, i) => (
                  <video
                    key={v.id}
                    src={v.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                      i === active ? "opacity-85" : "opacity-0"
                    }`}
                    style={{ mixBlendMode: "screen" }}
                  />
                ))}
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(3,7,13,0.55), rgba(3,7,13,0) 40%, rgba(3,7,13,0) 60%, rgba(3,7,13,0.35))",
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 px-5 py-4">
                  <span className="mono-label text-cyan">
                    {VIDEOS[active].label}
                  </span>
                  <div className="flex gap-1.5">
                    {VIDEOS.map((v, i) => (
                      <button
                        key={v.id}
                        onClick={() => setActive(i)}
                        aria-label={v.label}
                        className={`h-1 w-6 transition-all ${
                          i === active ? "bg-cyan" : "bg-ivory/25 hover:bg-ivory/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="absolute left-5 top-5 flex items-center gap-2 text-xs text-foam">
                  <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-cyan" />
                  <span className="mono-label text-[10px]">CFD simulation</span>
                </div>
              </div>
            </Reveal>
          </motion.div>
        </div>

        <RevealStagger className="mt-28 grid grid-cols-1 gap-px bg-ivory/10 md:grid-cols-3">
          {dict.innovation.pillars.map((p) => (
            <motion.div
              key={p.label}
              variants={staggerItem}
              className="group relative bg-abyss/80 p-8 md:p-10 transition-colors hover:bg-abyss/95"
            >
              <span className="mono-label text-cyan">{p.label}</span>
              <h3 className="display mt-6 text-2xl text-ivory md:text-3xl">{p.title}</h3>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory-dim/80 md:text-base">
                {p.body}
              </p>
              <div className="absolute bottom-0 left-0 h-px w-0 bg-cyan transition-all duration-700 group-hover:w-full" />
            </motion.div>
          ))}
        </RevealStagger>

        <div className="relative mt-32 overflow-hidden border border-ivory/10 bg-deep/40 backdrop-blur-sm md:mt-44">
          <div aria-hidden className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/westcoast/hybrid-backdrop.jpg"
              alt=""
              className="h-full w-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-deep/90 via-deep/70 to-deep/30" />
          </div>

          <div className="relative grid grid-cols-12 gap-8 p-8 md:p-14">
            <Reveal className="col-span-12 md:col-span-5">
              <p className="mono-label text-cyan">{dict.innovation.hybrid.eyebrow}</p>
              <h3 className="display mt-6 text-[clamp(1.75rem,3.6vw,3rem)] text-ivory">
                {dict.innovation.hybrid.heading}
              </h3>
              <p className="mt-8 max-w-md text-base leading-relaxed text-ivory-dim md:text-lg">
                {dict.innovation.hybrid.body}
              </p>
            </Reveal>

            <RevealStagger className="col-span-12 md:col-span-7">
              <ul className="divide-y divide-ivory/10 border-y border-ivory/10">
                {dict.innovation.hybrid.sectors.map((s, i) => (
                  <motion.li
                    key={i}
                    variants={staggerItem}
                    className="py-6 md:py-8"
                  >
                    <div className="flex items-start gap-6">
                      <span className="mono-label mt-2 w-8 shrink-0 text-foam">0{i + 1}</span>
                      <div className="flex-1">
                        <h4 className="text-lg text-ivory md:text-xl">{s.title}</h4>
                        <p className="mt-2 max-w-xl text-sm leading-relaxed text-ivory-dim/85 md:text-base">
                          {s.body}
                        </p>
                        <div className="mt-4 border-l border-cyan/50 pl-4">
                          <p className="mono-label text-[10px] text-cyan">ScandWave</p>
                          <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-ivory-dim/90">
                            {s.differentiator}
                          </p>
                        </div>
                        {s.link && (
                          <a
                            href={s.link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group mt-4 inline-flex items-center gap-2 text-xs text-cyan transition-colors hover:text-cyan-soft md:text-sm"
                          >
                            {s.link.label}
                            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden className="transition-transform group-hover:translate-x-0.5">
                              <path d="M1 10L10 1M10 1H3M10 1v7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </RevealStagger>
          </div>
        </div>
      </div>
    </section>
  );
}
