"use client";

import Image from "next/image";
import type { Dict } from "@/lib/i18n";
import Reveal, { RevealStagger, staggerItem } from "@/components/system/Reveal";
import { motion } from "framer-motion";

export default function SceneFoundation({ dict }: { dict: Dict }) {
  const c = dict.foundation.citation;

  return (
    <section id="research" className="scene relative py-40 md:py-56">
      <div className="mx-auto max-w-[1480px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-8">
          <Reveal className="col-span-12 md:col-span-5">
            <p className="mono-label">{dict.foundation.eyebrow}</p>
            <h2 className="display mt-6 text-[clamp(2rem,4.8vw,4.25rem)] text-ivory">
              {dict.foundation.heading}
            </h2>

            <RevealStagger className="mt-10 space-y-3" stagger={0.06}>
              {dict.foundation.points.map((p, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="flex items-start gap-3 text-sm text-ivory-dim/85 md:text-base"
                >
                  <span className="mt-2 inline-block h-px w-4 shrink-0 bg-cyan" />
                  <span>{p}</span>
                </motion.div>
              ))}
            </RevealStagger>
          </Reveal>

          <Reveal className="col-span-12 md:col-span-7" delay={0.2}>
            <article className="relative border border-ivory/10 bg-deep/60 p-8 backdrop-blur-sm md:p-12">
              <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan/60 to-transparent" />
              <p className="mono-label text-cyan">{c.access} · {c.year}</p>
              <h3 className="display mt-6 text-[clamp(1.5rem,2.4vw,2.25rem)] leading-tight text-ivory">
                {c.title}
              </h3>
              <p className="mt-5 text-sm text-ivory-dim">{c.authors}</p>
              <p className="mt-1 text-sm text-foam">
                {c.journal} · {c.volume}
              </p>

              <div className="hairline my-8" />

              <dl className="grid grid-cols-2 gap-6 text-sm md:grid-cols-4">
                <Field label="Method" value="CFD" />
                <Field label="Validation" value="Experimental" />
                <Field label="TRL" value="3 → 5" />
                <Field label="Access" value="Open" />
              </dl>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="/scandwave-research.pdf"
                  className="group inline-flex items-center gap-3 border border-ivory/15 px-5 py-3 text-sm transition-colors hover:border-cyan hover:text-cyan"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>PDF</span>
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-foam group-hover:text-cyan">
                    190 kb
                  </span>
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
                    <path d="M1 10L10 1M10 1H3M10 1v7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                </a>
              </div>
            </article>
          </Reveal>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-4 md:grid-cols-3">
          {[1, 2, 3].map((n, i) => (
            <Reveal key={n} delay={i * 0.08}>
              <div className="relative aspect-[4/3] overflow-hidden border border-ivory/8 bg-deep">
                <Image
                  src={`/media/fig-${n}.jpg`}
                  alt={`CFD figure ${n}`}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover opacity-70 mix-blend-luminosity transition-opacity duration-700 hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-abyss/70 via-transparent to-transparent" />
                <p className="mono-label absolute bottom-4 left-4 text-foam">
                  Fig. {n}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="mono-label">{label}</dt>
      <dd className="mt-2 text-sm text-ivory md:text-base">{value}</dd>
    </div>
  );
}
