import { useEffect, useRef, type ElementType, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/lib/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface AssembleTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  /** 'mount' anima al montar (hero); 'inview' al entrar en viewport. */
  trigger?: 'mount' | 'inview';
  delay?: number;
  stagger?: number;
  /** Nodo opcional para marcar partes con otra tipografía (p. ej. el logo). */
  children?: ReactNode;
}

/**
 * Titular con animación de "ensamblaje": cada letra empieza desviada, borrosa
 * y transparente, y se asienta en su posición final. Coherente con el concepto
 * boceto → precisión. Divide el texto en caracteres sin plugins de pago.
 */
export function AssembleText({
  text,
  as: Tag = 'span',
  className = '',
  trigger = 'inview',
  delay = 0,
  stagger = 0.022,
}: AssembleTextProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const chars = Array.from(el.querySelectorAll<HTMLElement>('[data-char]'));
    if (chars.length === 0) return;

    if (reduced) {
      // Versión reducida: fundido suave, sin desplazamientos bruscos.
      gsap.fromTo(
        chars,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.006,
          delay,
          scrollTrigger:
            trigger === 'inview'
              ? { trigger: el, start: 'top 85%', once: true }
              : undefined,
        },
      );
      return;
    }

    const tween = gsap.fromTo(
      chars,
      {
        yPercent: () => gsap.utils.random(-120, 120),
        xPercent: () => gsap.utils.random(-30, 30),
        rotate: () => gsap.utils.random(-18, 18),
        filter: 'blur(12px)',
        autoAlpha: 0,
      },
      {
        yPercent: 0,
        xPercent: 0,
        rotate: 0,
        filter: 'blur(0px)',
        autoAlpha: 1,
        duration: 1.1,
        ease: 'expo.out',
        stagger: { each: stagger, from: 'start' },
        delay,
        scrollTrigger:
          trigger === 'inview'
            ? { trigger: el, start: 'top 82%', once: true }
            : undefined,
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduced, trigger, delay, stagger, text]);

  // Partimos en palabras (para no romper el wrap) y luego en caracteres.
  const words = text.split(' ');

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span
          key={wi}
          className="inline-block whitespace-nowrap"
          aria-hidden="true"
        >
          {Array.from(word).map((ch, ci) => (
            <span
              key={ci}
              data-char
              className="inline-block will-change-transform"
            >
              {ch}
            </span>
          ))}
          {wi < words.length - 1 && <span data-char>&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
}
