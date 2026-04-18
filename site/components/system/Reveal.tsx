"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.1, ease: [0.2, 0.7, 0.2, 1] },
  },
};

export default function Reveal({
  children,
  delay = 0,
  as: As = "div",
  className,
  once = true,
  amount = 0.35,
}: {
  children: React.ReactNode;
  delay?: number;
  as?: keyof HTMLElementTagNameMap | React.ComponentType<React.PropsWithChildren<{ className?: string }>>;
  className?: string;
  once?: boolean;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount });

  const Component = motion[As as keyof typeof motion] as typeof motion.div;

  return (
    <Component
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}

export function RevealStagger({
  children,
  className,
  stagger = 0.08,
  amount = 0.25,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.2, 0.7, 0.2, 1] },
  },
};
