"use client";

import { motion } from "framer-motion";
import type { Dict, Locale } from "@/lib/i18n";
import BrandMark from "@/components/ui/BrandMark";

export default function SceneEntry({ dict }: { dict: Dict; locale: Locale }) {
  return (
    <section className="scene relative flex min-h-[100svh] items-center overflow-hidden" id="top">
      <div aria-hidden className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/D81_2326_%2828497035462%29.jpg/1600px-D81_2326_%2828497035462%29.jpg"
          alt=""
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-abyss/70 via-abyss/55 to-abyss" />
        <div className="absolute inset-0 bg-gradient-to-r from-abyss/80 via-transparent to-abyss/70" />
      </div>
      <div className="relative mx-auto w-full max-w-[1480px] px-6 md:px-10">
        <div className="relative z-10 grid grid-cols-12 items-end gap-6 pt-32 md:pt-40">
          <div className="col-span-12 lg:col-span-9">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1], delay: 0.2 }}
              className="mono-label flex items-center gap-3"
            >
              <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-cyan" />
              {dict.hero.eyebrow}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.4, ease: [0.2, 0.7, 0.2, 1], delay: 0.35 }}
              className="display mt-6 text-[clamp(2.75rem,8vw,7.5rem)] text-ivory"
            >
              {dict.hero.title}
              <br />
              <span className="italic text-cyan">{dict.hero.titleAccent}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1], delay: 0.7 }}
              className="mt-8 max-w-xl text-lg leading-relaxed text-ivory-dim md:text-xl"
            >
              {dict.hero.lead}
            </motion.p>
          </div>

          <div className="col-span-12 mt-12 lg:col-span-3 lg:mt-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.9 }}
              className="grid grid-cols-2 gap-x-6 gap-y-5 lg:grid-cols-1"
            >
              <Stat label="TRL" value="3 → 5" />
              <Stat label="Source" value="Polish Maritime Research" small />
              <Stat label="Method" value="CFD · validated" />
              <Stat label="Stage" value="Pre-commercial" />
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.2 }}
          className="mt-20 flex items-center gap-4 pb-12 md:mt-32"
        >
          <BrandMark withWordmark={false} className="text-cyan" />
          <div className="hairline flex-1" />
          <span className="mono-label text-mute flex items-center gap-2">
            {dict.hero.scrollHint}
            <svg width="10" height="14" viewBox="0 0 10 14" fill="none" aria-hidden>
              <path d="M5 1v12M1 9l4 4 4-4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            </svg>
          </span>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ label, value, small }: { label: string; value: string; small?: boolean }) {
  return (
    <div>
      <p className="mono-label">{label}</p>
      <p className={`mt-2 text-ivory ${small ? "text-sm" : "text-base"} leading-snug`}>
        {value}
      </p>
    </div>
  );
}
