'use client';

import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import type { Experience } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  experiences: Experience[];
};

export function ExperienceTimelineScroller({ experiences }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const activeRef = useRef(0);

  useGSAP(
    () => {
      if (experiences.length === 0) return;

      const st = ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const next = Math.min(
            experiences.length - 1,
            Math.floor(self.progress * experiences.length)
          );
          if (next !== activeRef.current) {
            activeRef.current = next;
            setIndex(next);
            // Re-animate the card whenever the active entry changes.
            gsap.fromTo(
              cardRef.current,
              { autoAlpha: 0, y: 30, filter: 'blur(6px)' },
              {
                autoAlpha: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 0.5,
                ease: 'power3.out',
                overwrite: true,
              }
            );
          }
        },
      });

      return () => st.kill();
    },
    { scope: rootRef, dependencies: [experiences.length] }
  );

  if (experiences.length === 0) return null;
  const exp = experiences[index];

  return (
    <div
      ref={rootRef}
      className="relative"
      style={{ height: `${Math.max(1, experiences.length) * 90}vh` }}
    >
      <div className="sticky top-24 flex h-[calc(100vh-6rem)] items-center py-10">
        <div className="w-full">
          {/* progress rail */}
          <div className="mb-8 flex items-center gap-2">
            {experiences.map((_, i) => (
              <span
                key={i}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === index ? 'w-10 bg-accent' : 'w-4 bg-border'
                }`}
              />
            ))}
            <span className="ml-3 font-mono text-sm text-muted-foreground">
              {String(index + 1).padStart(2, '0')} /{' '}
              {String(experiences.length).padStart(2, '0')}
            </span>
          </div>

          <div
            ref={cardRef}
            className="relative border-l-2 border-accent/40 pb-4 pl-8"
          >
            <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-accent shadow-[0_0_20px_rgb(var(--glow)/0.7)]" />
            <p className="mb-3 font-mono text-sm uppercase tracking-widest text-accent">
              {exp.period}
            </p>
            <h3 className="mb-2 font-display text-3xl font-bold md:text-5xl">
              {exp.role}
            </h3>
            <p className="mb-4 text-lg font-semibold text-muted-foreground md:text-xl">
              {exp.company}
            </p>
            <p className="mb-6 max-w-2xl leading-relaxed text-muted-foreground">
              {exp.description}
            </p>
            <ul className="space-y-3">
              {exp.highlights.map((highlight, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 leading-relaxed text-muted-foreground"
                >
                  <span className="mt-1.5 text-accent">›</span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
