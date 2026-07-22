'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
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
    offset: ['start 85%', 'end 60%'],
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
      {/* Timeline rail (background track) */}
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border sm:left-[11px]" />

      {/* Timeline rail (animated progress fill) */}
      <motion.div
        style={{ scaleY: lineScaleY }}
        className="absolute left-[7px] top-2 bottom-2 w-px origin-top bg-accent sm:left-[11px]"
      />

      <ol className="space-y-10 sm:space-y-14">
        {experiences.map((exp, i) => (
          <TimelineItem key={`${exp.company}-${i}`} exp={exp} index={i} />
        ))}
      </ol>
    </div>
  );
}

function TimelineItem({ exp, index }: { exp: Experience; index: number }) {
  const itemRef = useRef<HTMLLIElement | null>(null);

  return (
    <motion.li
      ref={itemRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: Math.min(index * 0.05, 0.2),
      }}
      className="relative pl-8 sm:pl-12"
    >
      {/* Node dot */}
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.4, ease: 'backOut', delay: 0.1 }}
        className="absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center sm:h-6 sm:w-6"
      >
        <span className="absolute inline-flex h-full w-full rounded-full bg-accent/30" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent ring-4 ring-background sm:h-2.5 sm:w-2.5" />
      </motion.span>

      <div className="group rounded-2xl border border-border bg-card/40 p-6 transition-colors hover:border-accent/50 sm:p-8">
        <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
          <div>
            <h3 className="text-xl font-bold text-foreground sm:text-2xl">
              {exp.role}
            </h3>
            <p className="text-base font-semibold text-accent sm:text-lg">
              {exp.company}
            </p>
          </div>
          <span className="shrink-0 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground sm:text-sm">
            {exp.period}
          </span>
        </div>

        <p className="mb-5 leading-relaxed text-muted-foreground">
          {exp.description}
        </p>

        <ul className="space-y-2.5">
          {exp.highlights.map((highlight, i) => (
            <li
              key={i}
              className="flex items-start gap-3 leading-relaxed text-muted-foreground"
            >
              <span className="mt-1.5 text-accent">›</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.li>
  );
}
