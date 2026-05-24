"use client";

import type { Dict } from "@/lib/i18n";
import Reveal from "@/components/system/Reveal";
import { motion } from "framer-motion";

export default function SceneClosing({ dict }: { dict: Dict }) {
  const c = dict.closing.contact;
  return (
    <section id="contact" className="scene relative overflow-hidden pt-32 pb-28 md:pt-48 md:pb-40">
      <div aria-hidden className="absolute inset-0 -z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/media/westcoast/closing.jpg"
          alt=""
          className="h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-abyss/90 via-abyss/70 to-abyss" />
      </div>
      <div className="relative mx-auto max-w-[1480px] px-6 md:px-10">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="mono-label">{dict.closing.eyebrow}</p>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="display mt-6 max-w-3xl text-xl italic leading-snug text-cyan-soft md:text-2xl">
              {dict.closing.tagline}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <h2 className="display mt-8 text-[clamp(2.5rem,8vw,7rem)] text-ivory">
              {dict.closing.heading}
            </h2>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ivory-dim md:text-xl">
              {dict.closing.body}
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-16 grid grid-cols-1 gap-px bg-ivory/10 md:grid-cols-2">
              <ContactCard
                role={c.projectLead}
                name={c.projectLeadName}
                primary={{ label: c.projectLeadEmail, href: `mailto:${c.projectLeadEmail}` }}
                cta={dict.closing.cta}
              />
              <ContactCard
                role={c.ceo}
                name={c.ceoName}
                primary={{ label: c.ceoEmail, href: `mailto:${c.ceoEmail}` }}
                cta={dict.closing.cta}
              />
            </div>
          </Reveal>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.6 }}
            className="mt-24 flex items-center gap-4"
          >
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-cyan" />
            <div className="hairline flex-1" />
            <span className="mono-label text-mute">Scand Wave Energy AB · 559532-7338</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  role,
  name,
  primary,
  cta,
}: {
  role: string;
  name: string;
  primary: { label: string; href: string };
  cta?: string;
}) {
  return (
    <article className="group relative overflow-hidden bg-abyss/80 p-8 transition-colors hover:bg-deep/80 md:p-10">
      <p className="mono-label">{role}</p>
      <p className="display mt-6 text-2xl text-ivory md:text-3xl">{name}</p>
      <a
        href={primary.href}
        className="mt-8 inline-flex items-center gap-3 text-base text-cyan transition-colors hover:text-cyan-soft md:text-lg"
      >
        {primary.label}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="transition-transform group-hover:translate-x-1">
          <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </a>
      {cta && <p className="mt-4 text-xs text-mute">{cta}</p>}
    </article>
  );
}
