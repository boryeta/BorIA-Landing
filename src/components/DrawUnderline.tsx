import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/lib/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface DrawUnderlineProps {
  children: ReactNode;
  className?: string;
  color?: string;
}

/**
 * Subrayado dibujado a mano (trazo SVG) que se traza al entrar en viewport.
 * Se usa para resaltar la pull quote. Color terracota por defecto (lo humano).
 */
export function DrawUnderline({
  children,
  className = '',
  color = '#c65f3c',
}: DrawUnderlineProps) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });

    const tween = gsap.to(path, {
      strokeDashoffset: 0,
      duration: reduced ? 0.4 : 1.1,
      ease: 'power2.inOut',
      scrollTrigger: { trigger: wrapRef.current, start: 'top 78%', once: true },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduced]);

  return (
    <span ref={wrapRef} className={`relative inline-block ${className}`}>
      {children}
      <svg
        className="pointer-events-none absolute -bottom-2 left-0 w-full"
        height="12"
        viewBox="0 0 300 12"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          ref={pathRef}
          d="M2 8 C 60 3, 120 3, 180 6 S 260 10, 298 5"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
