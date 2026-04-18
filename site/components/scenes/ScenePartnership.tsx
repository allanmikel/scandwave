"use client";

import type { Dict } from "@/lib/i18n";
import Reveal, { RevealStagger, staggerItem } from "@/components/system/Reveal";
import { motion } from "framer-motion";

export default function ScenePartnership({ dict }: { dict: Dict }) {
  return (
    <section id="partnership" className="scene relative py-40 md:py-56">
      <div className="mx-auto max-w-[1480px] px-6 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="mono-label text-center">{dict.partnership.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display mt-8 text-[clamp(2rem,5.5vw,4.75rem)] text-ivory">
              {dict.partnership.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-ivory-dim md:text-lg">
              {dict.partnership.body}
            </p>
          </Reveal>
        </div>

        <RevealStagger className="mt-20 grid grid-cols-1 gap-4 md:grid-cols-3">
          {dict.partnership.slots.map((slot, i) => {
            const isOpen = slot.status.toLowerCase().includes("sök") || slot.status.toLowerCase().includes("seek");
            return (
              <motion.article
                key={i}
                variants={staggerItem}
                className="group relative overflow-hidden border border-ivory/10 bg-deep/50 p-8 backdrop-blur-sm transition-all hover:border-cyan/50 md:p-10"
              >
                <div className="flex items-center justify-between">
                  <span className="mono-label">0{i + 1}</span>
                  {isOpen ? (
                    <span className="inline-flex items-center gap-2 text-xs text-cyan">
                      <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-cyan" />
                      {slot.status}
                    </span>
                  ) : (
                    <span className="text-xs text-foam">{slot.status}</span>
                  )}
                </div>
                <h3 className="display mt-12 text-2xl text-ivory md:text-3xl">
                  {slot.role}
                </h3>
                <div className="mt-8 h-px w-12 bg-cyan/60 transition-all duration-700 group-hover:w-full" />
              </motion.article>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}
