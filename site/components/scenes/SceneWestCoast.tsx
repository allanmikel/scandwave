"use client";

import type { Dict } from "@/lib/i18n";
import Reveal, { RevealStagger, staggerItem } from "@/components/system/Reveal";
import { motion } from "framer-motion";

export default function SceneWestCoast({ dict }: { dict: Dict }) {
  return (
    <section className="scene relative py-32 md:py-44">
      <div className="mx-auto max-w-[1480px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-8">
          <Reveal className="col-span-12 md:col-span-5">
            <p className="mono-label">{dict.westCoast.eyebrow}</p>
            <h2 className="display mt-6 text-[clamp(2rem,4.5vw,3.75rem)] text-ivory">
              {dict.westCoast.heading}
            </h2>
          </Reveal>
          <Reveal className="col-span-12 md:col-span-7 md:pt-16" delay={0.15}>
            <p className="max-w-xl text-base leading-relaxed text-ivory-dim md:text-lg">
              {dict.westCoast.body}
            </p>
          </Reveal>
        </div>

        <RevealStagger className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
          {dict.westCoast.places.map((p, i) => (
            <motion.figure
              key={i}
              variants={staggerItem}
              className="group relative overflow-hidden border border-ivory/10 bg-deep"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.src}
                  alt={p.name}
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
              </div>
            </motion.figure>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
