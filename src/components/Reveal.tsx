import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { useReducedMotion } from '@/lib/useReducedMotion';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Desplazamiento inicial en px. */
  y?: number;
  as?: 'div' | 'span' | 'li' | 'p' | 'section' | 'figure';
}

/**
 * Reveal de scroll con easing cuidado (nada de ease-in-out por defecto).
 * En reduced-motion sólo hace un fundido corto.
 */
export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 28,
  as = 'div',
}: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  const variants: Variants = reduced
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.4, delay: delay * 0.5 } },
      }
    : {
        hidden: { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
        },
      };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
    >
      {children}
    </MotionTag>
  );
}
