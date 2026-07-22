'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * A soft amber glow that trails the cursor with easing, plus a crisp dot
 * that tracks it precisely. Hidden on touch / coarse-pointer devices.
 */
export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine) return;

    const glow = glowRef.current;
    const dot = dotRef.current;
    if (!glow || !dot) return;

    document.documentElement.classList.add('has-custom-cursor');

    gsap.set([glow, dot], { xPercent: -50, yPercent: -50 });

    // Trailing glow uses a slower quickTo for a laggy, liquid feel.
    const glowX = gsap.quickTo(glow, 'x', { duration: 0.9, ease: 'power3' });
    const glowY = gsap.quickTo(glow, 'y', { duration: 0.9, ease: 'power3' });
    // Dot is nearly instant.
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power2' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power2' });

    const onMove = (e: PointerEvent) => {
      glowX(e.clientX);
      glowY(e.clientY);
      dotX(e.clientX);
      dotY(e.clientY);
    };

    const grow = () =>
      gsap.to(glow, { scale: 1.9, duration: 0.4, ease: 'power3' });
    const shrink = () =>
      gsap.to(glow, { scale: 1, duration: 0.4, ease: 'power3' });

    const onOver = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('a, button, [data-cursor-hover]')) grow();
    };
    const onOut = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('a, button, [data-cursor-hover]')) shrink();
    };

    const onEnter = () => gsap.to([glow, dot], { opacity: 1, duration: 0.3 });
    const onLeave = () => gsap.to([glow, dot], { opacity: 0, duration: 0.3 });

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerover', onOver);
    window.addEventListener('pointerout', onOut);
    document.addEventListener('pointerenter', onEnter);
    document.addEventListener('pointerleave', onLeave);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerout', onOut);
      document.removeEventListener('pointerenter', onEnter);
      document.removeEventListener('pointerleave', onLeave);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      <div
        ref={glowRef}
        className="absolute left-0 top-0 h-16 w-16 rounded-full opacity-0 blur-2xl"
        style={{
          background:
            'radial-gradient(circle, rgb(var(--glow) / 0.55) 0%, rgb(var(--glow) / 0) 70%)',
        }}
      />
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-2 w-2 rounded-full bg-accent opacity-0 mix-blend-screen"
      />
    </div>
  );
}
