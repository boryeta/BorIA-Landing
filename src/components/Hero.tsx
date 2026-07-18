import { Suspense, lazy, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AssembleText } from './AssembleText';
import { heroSignals } from '@/lib/heroSignals';
import { useReducedMotion } from '@/lib/useReducedMotion';

const HeroCanvas = lazy(() => import('@/three/HeroCanvas'));

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Pilotamos el ensamblaje del 3D con el progreso de scroll del hero.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        heroSignals.assemble = self.progress;
        heroSignals.autoDrift = self.progress;
      },
    });

    return () => st.kill();
  }, []);

  // Parallax por puntero (desactivado en táctil/reduced-motion).
  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      heroSignals.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      heroSignals.pointerY = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduced]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative bg-graphite-900 text-paper"
      style={{ height: '240vh' }}
      aria-label="Presentación"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        {/* Fondo: gradiente cálido-frío + grid técnico, visible mientras carga el 3D */}
        <div className="absolute inset-0 bg-graphite-900" />
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              'radial-gradient(120% 90% at 70% 20%, rgba(75,82,230,0.16), transparent 55%), radial-gradient(90% 80% at 20% 90%, rgba(198,95,60,0.14), transparent 55%)',
          }}
        />
        <div className="tech-grid absolute inset-0 opacity-40" />

        {/* Canvas 3D — protagonista, carga diferida */}
        <div className="absolute inset-0">
          <Suspense fallback={<CanvasFallback />}>
            <HeroCanvas />
          </Suspense>
        </div>

        {/* Capa de contenido */}
        <div className="relative z-10 mx-auto flex h-full max-w-content flex-col justify-center px-6 md:px-10">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="eyebrow text-indigo-glow mb-6"
          >
            Borja · Alicante · diseño web + IA
          </motion.p>

          <h1 className="max-w-4xl text-balance font-serif font-light leading-[0.95] tracking-tightest text-5xl sm:text-6xl md:text-7xl lg:text-[5.4rem]">
            <AssembleText
              text="Del boceto"
              as="span"
              className="block"
              trigger="mount"
              delay={0.5}
            />
            <span className="block">
              <AssembleText
                text="a la "
                as="span"
                className="inline"
                trigger="mount"
                delay={0.7}
              />
              <span className="italic text-terracotta-light">
                <AssembleText
                  text="producción."
                  as="span"
                  className="inline"
                  trigger="mount"
                  delay={0.85}
                />
              </span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-xl text-pretty font-serif text-lg text-paper/70 md:text-xl"
          >
            Diseño y construyo webs para negocios reales. Prototipo rápido con
            IA y las refino a mano hasta la precisión — con la exigencia de quien
            ha estado al otro lado del mostrador.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#trabajo"
              className="group relative overflow-hidden rounded-full bg-terracotta px-7 py-3 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-transform duration-300 hover:-translate-y-0.5"
            >
              <span className="relative z-10">Ver el trabajo</span>
              <span className="absolute inset-0 -translate-x-full bg-terracotta-deep transition-transform duration-500 ease-assemble group-hover:translate-x-0" />
            </a>
            <a
              href="#proceso"
              className="link-underline font-mono text-xs uppercase tracking-[0.2em] text-paper/70 hover:text-paper"
            >
              Cómo trabajo →
            </a>
          </motion.div>
        </div>

        {/* Indicador de scroll + leyenda de la metáfora */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-center"
        >
          <div className="mx-auto mb-2 h-9 w-5 rounded-full border border-paper/25">
            <motion.div
              animate={{ y: [3, 14, 3] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="mx-auto mt-1 h-1.5 w-1 rounded-full bg-terracotta-light"
            />
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-paper/40">
            desplaza para ensamblar
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function CanvasFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-40 w-40 animate-pulse rounded-full bg-indigo/20 blur-2xl" />
    </div>
  );
}
