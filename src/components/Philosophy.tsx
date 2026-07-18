import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Reveal } from './Reveal';
import { useReducedMotion } from '@/lib/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const VALUES: { lead: string; rest: string }[] = [
  { lead: 'La IA acelera,', rest: 'pero el criterio no se automatiza.' },
  { lead: 'Transparencia:', rest: 'te enseño el proceso, no una caja negra.' },
  { lead: 'Entiendo tu negocio', rest: 'porque he tenido uno.' },
  { lead: 'El detalle', rest: 'es lo que separa una web de una buena web.' },
];

/**
 * Filosofía — fondo oscuro, texto grande. Cada valor se resalta secuencialmente
 * (scroll-linked highlight) a medida que ocupa el centro del viewport: no es un
 * simple fade-in, la intensidad se liga a la posición de scroll.
 */
export function Philosophy() {
  return (
    <section
      id="filosofia"
      className="relative overflow-hidden bg-graphite-900 py-32 text-paper md:py-48"
      aria-label="Filosofía"
    >
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(80% 60% at 80% 10%, rgba(75,82,230,0.12), transparent 60%), radial-gradient(70% 60% at 10% 90%, rgba(198,95,60,0.10), transparent 60%)',
        }}
      />
      <div className="tech-grid absolute inset-0 opacity-[0.12]" />

      <div className="relative mx-auto max-w-content px-6 md:px-10">
        <Reveal>
          <p className="eyebrow mb-16 text-indigo-glow">04 — En qué creo</p>
        </Reveal>

        <div className="space-y-10 md:space-y-16">
          {VALUES.map((v, i) => (
            <ValueLine key={i} index={i} lead={v.lead} rest={v.rest} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ValueLine({
  index,
  lead,
  rest,
}: {
  index: number;
  lead: string;
  rest: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduced) {
      // Reducido: highlight simple al entrar, sin scrubbing.
      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 75%',
        onEnter: () => el.style.setProperty('--hl', '1'),
      });
      return () => st.kill();
    }

    // Highlight ligado al scroll: máximo cuando la línea cruza el centro.
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: () => {
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        const vh = window.innerHeight;
        const dist = Math.abs(elCenter - vh / 2) / (vh / 2);
        const hl = gsap.utils.clamp(0, 1, 1 - dist * 1.15);
        el.style.setProperty('--hl', hl.toFixed(3));
      },
    });
    return () => st.kill();
  }, [reduced]);

  return (
    <div
      ref={ref}
      className="group flex items-start gap-5 md:gap-8"
      style={{ '--hl': '0' } as React.CSSProperties}
    >
      {/* Marcador: índice mono + tick que se enciende con el highlight */}
      <div className="flex shrink-0 select-none flex-col items-center pt-2 md:pt-4">
        <span
          className="font-mono text-xs tracking-[0.1em]"
          style={{ color: 'rgb(154 160 255 / calc(0.3 + var(--hl) * 0.7))' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <span
          className="mt-3 w-px flex-1"
          style={{
            height: '2.5rem',
            background:
              'linear-gradient(to bottom, color-mix(in srgb, #e08a63 calc(var(--hl) * 100%), rgba(132,123,110,0.25)), transparent)',
          }}
        />
      </div>

      <p className="max-w-4xl text-balance font-serif text-3xl font-light leading-tight tracking-tightest transition-colors sm:text-4xl md:text-6xl">
        <span
          style={{ color: 'rgb(244 239 230 / calc(0.4 + var(--hl) * 0.6))' }}
        >
          {lead}
        </span>{' '}
        <span
          className="italic"
          style={{
            color: 'color-mix(in srgb, #e08a63 calc(var(--hl) * 100%), #847b6e)',
          }}
        >
          {rest}
        </span>
      </p>
    </div>
  );
}
