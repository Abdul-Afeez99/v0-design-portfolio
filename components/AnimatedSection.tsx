'use client';

import { useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Direction the content travels in from. */
  from?: 'up' | 'down' | 'left' | 'right';
}

export function AnimatedSection({
  children,
  delay = 0,
  className = '',
  from = 'up',
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const offset = 60;
      const fromVars: gsap.TweenVars = {
        opacity: 0,
        x: from === 'left' ? -offset : from === 'right' ? offset : 0,
        y: from === 'up' ? offset : from === 'down' ? -offset : 0,
        filter: 'blur(8px)',
      };

      gsap.fromTo(
        ref.current,
        fromVars,
        {
          opacity: 1,
          x: 0,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={`gsap-reveal ${className}`}>
      {children}
    </div>
  );
}
