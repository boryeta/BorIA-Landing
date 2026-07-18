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
            <ValueLine key={i} lead={v.lead} rest={v.rest} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ValueLine({ lead, rest }: { lead: string; rest: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
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
    <p
      ref={ref}
      className="value-line max-w-4xl text-balance font-serif text-3xl font-light leading-tight tracking-tightest transition-colors sm:text-4xl md:text-6xl"
      style={
        {
          '--hl': '0',
          color: 'rgb(132 123 110 / calc(0.55 + var(--hl) * 0.45))',
        } as React.CSSProperties
      }
    >
      <span
        style={{
          color: 'rgb(244 239 230 / calc(0.4 + var(--hl) * 0.6))',
        }}
      >
        {lead}
      </span>{' '}
      <span
        className="italic"
        style={{
          color:
            'color-mix(in srgb, #e08a63 calc(var(--hl) * 100%), #847b6e)',
        }}
      >
        {rest}
      </span>
    </p>
  );
}
