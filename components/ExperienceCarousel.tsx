'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useRef, useState, type WheelEvent } from 'react';
import type { Experience } from '@/lib/data';

type ExperienceCarouselProps = {
  experiences: Experience[];
};

export function ExperienceCarousel({ experiences }: ExperienceCarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const lastWheelAtRef = useRef<number>(0);

  if (experiences.length === 0) return null;

  const paginate = useCallback(
    (dir: 1 | -1) => {
      setDirection(dir);
      setIndex((prev) => {
        const next = prev + dir;
        if (next < 0) return 0;
        if (next > experiences.length - 1) return experiences.length - 1;
        return next;
      });
    },
    [experiences.length]
  );

  const onWheel = useCallback(
    (e: WheelEvent<HTMLDivElement>) => {
      if (experiences.length <= 1) return;

      const now = Date.now();
      if (now - lastWheelAtRef.current < 650) return;

      if (Math.abs(e.deltaY) < 6) return;

      if (e.deltaY > 0) {
        if (index < experiences.length - 1) {
          e.preventDefault();
          paginate(1);
          lastWheelAtRef.current = now;
        }
        return;
      }

      if (index > 0) {
        e.preventDefault();
        paginate(-1);
        lastWheelAtRef.current = now;
      }
    },
    [experiences.length, index, paginate]
  );

  const cardVariants = {
    enter: (dir: 1 | -1) => ({
      x: dir === 1 ? -180 : 180,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
    exit: (dir: 1 | -1) => ({
      x: dir === 1 ? 180 : -180,
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const exp = experiences[index];

  return (
    <div className="relative" onWheel={onWheel}>
      <div className="relative overflow-hidden rounded-2xl">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={index}
            custom={direction}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="bg-card border border-border rounded-2xl p-8"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2 text-foreground">{exp.role}</h3>
                <p className="text-accent font-semibold mb-2">{exp.company}</p>
                <p className="text-sm text-muted-foreground mb-4">{exp.period}</p>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => paginate(-1)}
                  disabled={index === 0}
                  className="p-2 rounded-lg bg-secondary text-foreground hover:text-accent disabled:opacity-40 disabled:hover:text-foreground transition-colors"
                  aria-label="Previous experience"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => paginate(1)}
                  disabled={index === experiences.length - 1}
                  className="p-2 rounded-lg bg-secondary text-foreground hover:text-accent disabled:opacity-40 disabled:hover:text-foreground transition-colors"
                  aria-label="Next experience"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">{exp.description}</p>

            <ul className="space-y-2">
              {exp.highlights.map((highlight, i) => (
                <li key={i} className="text-muted-foreground flex items-start gap-3">
                  <span className="text-accent mt-1.5">›</span>
                  {highlight}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-center gap-3 text-sm text-muted-foreground">
        <span className="tabular-nums">{index + 1}</span>
        <span>/</span>
        <span className="tabular-nums">{experiences.length}</span>
        <span className="hidden sm:inline">Scroll to navigate</span>
      </div>
    </div>
  );
}
