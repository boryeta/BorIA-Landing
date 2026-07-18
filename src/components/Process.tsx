import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Reveal } from './Reveal';

gsap.registerPlugin(ScrollTrigger);

interface Step {
  n: string;
  tool: string;
  title: string;
  body: string;
}

const STEPS: Step[] = [
  {
    n: '01',
    tool: 'Lovable',
    title: 'Boceto rápido',
    body: 'Prototipo la idea con IA en horas, no en semanas. Sirve para ver, tocar y decidir la dirección antes de invertir tiempo en el detalle.',
  },
  {
    n: '02',
    tool: 'Claude Code',
    title: 'Refinamiento a mano',
    body: 'Aquí es donde el boceto se vuelve producto: animación avanzada, rendimiento, accesibilidad y los detalles que separan «una web más» de una web con criterio.',
  },
  {
    n: '03',
    tool: 'GitHub',
    title: 'Versionado y transparencia',
    body: 'Todo queda versionado. Nada de cajas negras: puedes ver cómo evoluciona el proyecto y tienes el código, es tuyo.',
  },
  {
    n: '04',
    tool: 'Entrega',
    title: 'En producción',
    body: 'La web sale a producción lista para el negocio real que la va a usar: rápida, cuidada y pensada para convertir visitas en clientes.',
  },
];

export function Process() {
  return (
    <section
      id="proceso"
      className="relative bg-paper-50 py-28 md:py-40"
      aria-label="Cómo trabajo"
    >
      <div className="mx-auto max-w-content px-6 md:px-10">
        <div className="mb-16 max-w-2xl">
          <Reveal>
            <p className="eyebrow mb-6">02 — Cómo trabajo</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-balance font-serif text-3xl font-light leading-tight tracking-tightest md:text-5xl">
              De la idea a producción,
              <span className="italic text-terracotta"> sin caja negra.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-graphite-500">
              Cada paso empieza en{' '}
              <span className="font-mono text-sm text-indigo">índigo</span> — en
              construcción — y se vuelve{' '}
              <span className="font-mono text-sm text-terracotta">terracota</span>{' '}
              cuando está terminado. Como el resto de esta web.
            </p>
          </Reveal>
        </div>

        <Timeline />
      </div>
    </section>
  );
}

function Timeline() {
  const lineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    const progress = progressRef.current;
    if (!line || !progress) return;

    // La línea de progreso se "dibuja" con el scroll (scrub).
    const tween = gsap.fromTo(
      progress,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: line,
          start: 'top 60%',
          end: 'bottom 70%',
          scrub: true,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div ref={lineRef} className="relative">
      {/* Raíl base + progreso terracota */}
      <div className="absolute left-[22px] top-2 bottom-2 w-px bg-graphite-800/12 md:left-[calc(50%-0.5px)]">
        <div
          ref={progressRef}
          className="absolute inset-0 origin-top bg-gradient-to-b from-indigo via-indigo to-terracotta"
        />
      </div>

      <ol className="space-y-14 md:space-y-24">
        {STEPS.map((step, i) => (
          <ProcessStep key={step.n} step={step} index={i} />
        ))}
      </ol>
    </div>
  );
}

function ProcessStep({ step, index }: { step: Step; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const [active, setActive] = useState(false);
  const left = index % 2 === 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 65%',
      onEnter: () => setActive(true),
      onLeaveBack: () => setActive(false),
    });
    return () => st.kill();
  }, []);

  return (
    <li
      ref={ref}
      className="relative pl-14 md:grid md:grid-cols-2 md:items-center md:gap-16 md:pl-0"
    >
      {/* Nodo */}
      <div className="absolute left-[13px] top-1 z-10 md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
        <div
          className={`relative grid h-[18px] w-[18px] place-items-center rounded-full border-2 transition-all duration-700 ease-assemble ${
            active
              ? 'border-terracotta bg-terracotta'
              : 'border-indigo bg-paper-50 construction-hatch'
          }`}
        >
          {active && <span className="h-1.5 w-1.5 rounded-full bg-paper" />}
        </div>
      </div>

      {/* Contenido */}
      <div
        className={`md:row-start-1 ${
          left ? 'md:col-start-1 md:pr-16 md:text-right' : 'md:col-start-2 md:pl-16'
        }`}
      >
        <div
          className={`inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-700 ${
            active ? 'text-terracotta' : 'text-indigo'
          }`}
        >
          <span>{step.n}</span>
          <span aria-hidden>·</span>
          <span>{step.tool}</span>
        </div>
        <h3 className="mt-3 font-serif text-2xl font-light tracking-tight text-graphite md:text-3xl">
          {step.title}
        </h3>
        <p
          className={`mt-3 max-w-md text-base leading-relaxed text-graphite-500 ${
            left ? 'md:ml-auto' : ''
          }`}
        >
          {step.body}
        </p>
      </div>

      {/* Lado opuesto: número fantasma + estado (solo desktop) */}
      <div
        aria-hidden
        className={`hidden md:row-start-1 md:flex md:items-center md:gap-5 ${
          left
            ? 'md:col-start-2 md:justify-start md:pl-16'
            : 'md:col-start-1 md:flex-row-reverse md:justify-start md:pr-16'
        }`}
      >
        <span
          className={`font-serif text-7xl font-extralight leading-none transition-colors duration-700 lg:text-8xl ${
            active ? 'text-terracotta/15' : 'text-indigo/10'
          }`}
        >
          {step.n}
        </span>
        <span
          className={`font-mono text-[10px] uppercase tracking-[0.22em] transition-colors duration-700 ${
            active ? 'text-terracotta/70' : 'text-indigo/50'
          }`}
        >
          {active ? 'terminado' : 'en construcción'}
        </span>
      </div>
    </li>
  );
}
