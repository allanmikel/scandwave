"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Dict } from "@/lib/i18n";
import Reveal from "@/components/system/Reveal";

export default function SceneResistance({ dict }: { dict: Dict }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const xShift = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.4, 1, 0.4]);

  return (
    <section ref={ref} className="scene relative min-h-[110vh] py-40 md:py-56">
      <div className="mx-auto max-w-[1480px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6">
          <Reveal className="col-span-12 md:col-span-4 lg:col-span-3">
            <p className="mono-label">{dict.resistance.eyebrow}</p>
          </Reveal>
          <motion.div
            style={{ opacity }}
            className="col-span-12 md:col-span-8 lg:col-span-8 lg:col-start-5"
          >
            <Reveal>
              <motion.h2
                style={{ x: xShift }}
                className="display text-[clamp(2rem,5.5vw,4.75rem)] text-ivory"
              >
                {dict.resistance.heading}
              </motion.h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-10 max-w-xl text-lg leading-relaxed text-ivory-dim/80 md:text-xl">
                {dict.resistance.body}
              </p>
            </Reveal>

            <Reveal delay={0.35}>
              <div className="mt-16 grid grid-cols-3 gap-4 border-t border-ivory/10 pt-8">
                <Metric figure="100+" unit="GW" label="EU technical potential" />
                <Metric figure="<1" unit="GW" label="Deployed capacity" />
                <Metric figure="~99" unit="%" label="Untapped" accent />
              </div>
            </Reveal>

            <Reveal delay={0.5}>
              <figure className="mt-16 overflow-hidden border border-ivory/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Pelamis_at_EMEC.jpg/1200px-Pelamis_at_EMEC.jpg"
                  alt="Pelamis wave energy converter under test"
                  className="h-auto w-full object-cover opacity-85"
                />
                <figcaption className="bg-deep/80 px-5 py-3 text-xs text-ivory-dim/80">
                  Pelamis — ett av få vågkraftskoncept som nått havet. ScandWave adresserar nästa steg: kustnära, skalbar och hybridkopplad.
                </figcaption>
              </figure>
            </Reveal>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Metric({ figure, unit, label, accent }: { figure: string; unit: string; label: string; accent?: boolean }) {
  return (
    <div>
      <p className="display text-3xl md:text-5xl">
        <span className={accent ? "text-cyan" : "text-ivory"}>{figure}</span>
        <span className="ml-1 font-sans text-sm tracking-widest text-foam align-top">{unit}</span>
      </p>
      <p className="mt-2 text-xs leading-snug text-mute md:text-sm">{label}</p>
    </div>
  );
}
