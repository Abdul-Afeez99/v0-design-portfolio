'use client';

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useRef } from 'react';
import type { Experience } from '@/lib/data';

type ExperienceTimelineScrollerProps = {
  experiences: Experience[];
};

export function ExperienceTimelineScroller({
  experiences,
}: ExperienceTimelineScrollerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 65%'],
  });

  // Smooth, progress-driven line that "draws" as you scroll through the section.
  const lineScaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  if (experiences.length === 0) return null;

  return (
    <div ref={containerRef} className="relative">
      {/* Center rail (background track) — left on mobile, centered on desktop */}
      <div className="absolute left-[15px] top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-1/2" />

      {/* Center rail (animated progress fill) */}
      <motion.div
        style={{ scaleY: lineScaleY }}
        className="absolute left-[15px] top-0 bottom-0 w-px origin-top bg-accent md:left-1/2 md:-translate-x-1/2"
      />

      <ol className="space-y-12 sm:space-y-16 md:space-y-24">
        {experiences.map((exp, i) => (
          <TimelineItem
            key={`${exp.company}-${i}`}
            exp={exp}
            index={i}
            side={i % 2 === 0 ? 'left' : 'right'}
          />
        ))}
      </ol>
    </div>
  );
}

function TimelineItem({
  exp,
  index,
  side,
}: {
  exp: Experience;
  index: number;
  side: 'left' | 'right';
}) {
  const itemRef = useRef<HTMLLIElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Subtle parallax: card drifts slightly as it passes through the viewport.
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [28, -28],
  );

  const isLeft = side === 'left';

  return (
    <li
      ref={itemRef}
      className={`relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-12 ${
        isLeft ? '' : 'md:[&>*]:col-start-2'
      }`}
    >
      {/* Node dot on the rail */}
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.4, ease: 'backOut', delay: 0.05 }}
        className="absolute left-[8px] top-2 z-10 flex h-4 w-4 items-center justify-center md:left-1/2 md:h-5 md:w-5 md:-translate-x-1/2"
      >
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/25" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-background" />
      </motion.span>

      {/* Card */}
      <motion.div
        style={{ y: parallaxY }}
        initial={{
          opacity: 0,
          x: prefersReducedMotion ? 0 : isLeft ? -48 : 48,
        }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`group rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-accent/60 sm:p-7 ${
          isLeft ? 'md:text-right' : ''
        }`}
      >
        <div
          className={`mb-3 flex flex-col gap-1 ${
            isLeft ? 'md:items-end' : 'md:items-start'
          }`}
        >
          <span className="inline-flex w-fit rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            {exp.period}
          </span>
          <h3 className="mt-2 text-xl font-bold text-foreground sm:text-2xl">
            {exp.role}
          </h3>
          <p className="text-base font-semibold text-accent sm:text-lg">
            {exp.company}
          </p>
        </div>

        <p className="mb-5 leading-relaxed text-muted-foreground">
          {exp.description}
        </p>

        <ul
          className={`flex flex-col gap-2.5 ${
            isLeft ? 'md:items-end' : 'md:items-start'
          }`}
        >
          {exp.highlights.map((highlight, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.4,
                ease: 'easeOut',
                delay: 0.25 + i * 0.08,
              }}
              className={`flex items-start gap-2.5 leading-relaxed text-muted-foreground ${
                isLeft ? 'md:flex-row-reverse md:text-right' : ''
              }`}
            >
              <span className="mt-1.5 shrink-0 text-accent">›</span>
              <span>{highlight}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </li>
  );
}
