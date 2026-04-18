"use client";

import type { Dict } from "@/lib/i18n";
import Reveal, { RevealStagger, staggerItem } from "@/components/system/Reveal";
import { motion } from "framer-motion";

export default function SceneResources({ dict }: { dict: Dict }) {
  return (
    <section id="resources" className="scene relative py-32 md:py-40">
      <div className="mx-auto max-w-[1480px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-8">
          <Reveal className="col-span-12 md:col-span-4">
            <p className="mono-label">{dict.resources.eyebrow}</p>
            <h2 className="display mt-6 text-[clamp(1.75rem,3.5vw,3rem)] text-ivory">
              {dict.resources.heading}
            </h2>
          </Reveal>

          <RevealStagger className="col-span-12 md:col-span-8">
            <ul className="divide-y divide-ivory/8 border-y border-ivory/8">
              {dict.resources.items.map((item, i) => (
                <motion.li key={i} variants={staggerItem}>
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-6 py-6 transition-colors hover:bg-deep/40"
                  >
                    <span className="mono-label w-8 shrink-0 text-foam">0{i + 1}</span>
                    <div className="flex-1">
                      <p className="text-base text-ivory md:text-lg">{item.label}</p>
                      <p className="mt-1 text-sm text-ivory-dim/70">{item.description}</p>
                    </div>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden
                      className="shrink-0 text-foam transition-all group-hover:translate-x-1 group-hover:text-cyan"
                    >
                      {item.external ? (
                        <path d="M3 13L13 3M13 3H5M13 3v8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                      ) : (
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                      )}
                    </svg>
                  </a>
                </motion.li>
              ))}
            </ul>
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}
