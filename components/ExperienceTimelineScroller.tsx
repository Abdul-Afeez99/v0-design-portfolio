'use client';

import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import type { Experience } from '@/lib/data';

type ExperienceTimelineScrollerProps = {
  experiences: Experience[];
};

export function ExperienceTimelineScroller({
  experiences,
}: ExperienceTimelineScrollerProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    if (experiences.length <= 1) return;

    const unsubscribe = scrollYProgress.on('change', (p) => {
      const clamped = Math.min(0.999999, Math.max(0, p));
      const nextIndex = Math.min(
        experiences.length - 1,
        Math.max(0, Math.floor(clamped * experiences.length))
      );

      setIndex((prev) => {
        if (prev === nextIndex) return prev;
        setDirection(nextIndex > prev ? 1 : -1);
        return nextIndex;
      });
    });

    return () => unsubscribe();
  }, [experiences.length, scrollYProgress]);

  if (experiences.length === 0) return null;

  const exp = experiences[index];

  const variants = {
    enter: (dir: 1 | -1) => ({
      y: dir === 1 ? 32 : -32,
      opacity: 0,
      scale: 0.98,
      filter: 'blur(6px)',
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
    exit: (dir: 1 | -1) => ({
      y: dir === 1 ? -32 : 32,
      opacity: 0,
      scale: 0.98,
      filter: 'blur(6px)',
      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <div
      ref={rootRef}
      className="relative"
      style={{ height: `${Math.max(1, experiences.length) * 100}vh` }}
    >
      <div className="sticky top-24 h-[calc(100vh-6rem)] flex items-center py-10">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="relative w-full pl-8 pb-4 border-l-2 border-accent/30 hover:border-accent transition-colors"
          >
            <div className="absolute -left-4 top-0 w-6 h-6 bg-accent rounded-full border-4 border-background" />
            <h3 className="text-3xl md:text-4xl font-bold mb-3">{exp.role}</h3>
            <p className="text-accent text-lg md:text-xl font-semibold mb-3">{exp.company}</p>
            <p className="text-base md:text-lg text-muted-foreground mb-5">{exp.period}</p>
            <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">{exp.description}</p>
            <ul className="space-y-3">
              {exp.highlights.map((highlight, i) => (
                <li key={i} className="text-base md:text-lg text-muted-foreground flex items-start gap-3 leading-relaxed">
                  <span className="text-accent mt-1.5">›</span>
                  {highlight}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
