'use client';

import { useRef, type ElementType } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

interface HeroTextProps {
  text: string;
  className?: string;
  delay?: number;
  /** Highlight the given substring with the amber gradient. */
  highlight?: string;
  as?: 'h1' | 'h2' | 'p' | 'div';
}

export function HeroText({
  text,
  className = '',
  delay = 0,
  highlight,
  as = 'div',
}: HeroTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const Tag: ElementType = as;
  const words = text.split(' ');

  useGSAP(
    () => {
      const chars = ref.current?.querySelectorAll('.hero-char');
      if (!chars || chars.length === 0) return;
      gsap.from(chars, {
        yPercent: 120,
        opacity: 0,
        rotateX: -80,
        stagger: 0.02,
        duration: 0.9,
        delay,
        ease: 'power4.out',
      });
    },
    { scope: ref, dependencies: [text] }
  );

  const isHighlighted = (word: string) =>
    highlight ? highlight.toLowerCase().includes(word.toLowerCase()) : false;

  return (
    <Tag ref={ref as never} className={className} style={{ perspective: 800 }}>
      {words.map((word, wi) => (
        <span
          key={wi}
          className={`inline-block mr-[0.25em] overflow-hidden align-bottom ${
            isHighlighted(word) ? 'text-accent' : ''
          }`}
        >
          {word.split('').map((char, ci) => (
            <span key={ci} className="hero-char inline-block">
              {char}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
