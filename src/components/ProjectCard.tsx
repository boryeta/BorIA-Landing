import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import type { Project } from './portfolioData';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useDeviceCapability } from '@/lib/useDeviceCapability';

/**
 * Tarjeta de proyecto con tilt 3D real (rotateX/rotateY ligados a la posición
 * del cursor dentro de la tarjeta). En táctil no dependemos de hover: la
 * tarjeta se anima sola con una leve oscilación. El proyecto en curso (WIP)
 * recibe un tratamiento de «construcción» honesto en vez de miniatura pulida.
 */
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { isTouch } = useDeviceCapability();

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const springRx = useSpring(rx, { stiffness: 150, damping: 18 });
  const springRy = useSpring(ry, { stiffness: 150, damping: 18 });
  const rotateX = useTransform(springRx, (v) => `${v}deg`);
  const rotateY = useTransform(springRy, (v) => `${v}deg`);

  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowBg = useTransform(
    [glowX, glowY],
    ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, ${project.accentSoft}, transparent 60%)`,
  );

  const handlePointer = (e: React.PointerEvent<HTMLElement>) => {
    if (reduced || isTouch) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 14);
    rx.set(-(py - 0.5) * 14);
    glowX.set(px * 100);
    glowY.set(py * 100);
  };

  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
    glowX.set(50);
    glowY.set(50);
  };

  const isWip = project.status === 'wip';

  const CardInner = (
    <motion.article
      ref={ref}
      onPointerMove={handlePointer}
      onPointerLeave={handleLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{
        rotateX: reduced || isTouch ? 0 : rotateX,
        rotateY: reduced || isTouch ? 0 : rotateY,
        transformPerspective: 1000,
      }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-graphite-800/10 bg-paper-50 [transform-style:preserve-3d]"
    >
      {/* Preview: banda de acento distintiva del proyecto (sin capturas inventadas) */}
      <div
        className="relative aspect-[16/10] w-full overflow-hidden"
        style={{ background: isWip ? '#f0ebe0' : project.accentSoft }}
      >
        {isWip ? (
          // Tratamiento honesto «en construcción»: trama índigo, no miniatura pulida.
          <div className="construction-hatch absolute inset-0 opacity-90" />
        ) : (
          <PreviewGlyph accent={project.accent} auto={isTouch || reduced} />
        )}

        {/* Halo que sigue al cursor (solo en no-táctil) */}
        {!isTouch && !reduced && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: glowBg }}
          />
        )}

        {/* Badge de estado */}
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span
            className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] backdrop-blur-sm ${
              isWip
                ? 'bg-indigo/10 text-indigo-deep'
                : 'bg-graphite-900/80 text-paper'
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isWip ? 'bg-indigo animate-pulse' : 'bg-terracotta-light'
              }`}
            />
            {isWip ? 'En curso' : 'Live'}
          </span>
        </div>
      </div>

      {/* Cuerpo */}
      <div className="flex flex-1 flex-col p-6" style={{ transform: 'translateZ(40px)' }}>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite-400">
          {project.kind}
        </p>
        <h3 className="mt-2 font-serif text-2xl font-light tracking-tight text-graphite">
          {project.name}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-graphite-500">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-graphite-800/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-graphite-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {project.url ? (
          <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-terracotta transition-colors group-hover:text-terracotta-deep">
            Ver demo en vivo
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        ) : (
          <span className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-graphite-400">
            {isWip ? 'Demo en desarrollo' : 'Proyecto en vivo'}
          </span>
        )}
      </div>

      {/* Borde de acento que aparece al hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 0 1.5px ${project.accent}` }}
      />
    </motion.article>
  );

  // El proyecto con URL abre en nueva pestaña; el resto no es enlace.
  if (project.url) {
    return (
      <a
        href={project.url}
        target="_blank"
        rel="noreferrer noopener"
        className="block h-full rounded-2xl focus-visible:outline-offset-4"
        aria-label={`${project.name} — abrir demo en vivo en una pestaña nueva`}
      >
        {CardInner}
      </a>
    );
  }

  return CardInner;
}

/** Glifo abstracto de preview: un anillo/acento que se anima. Sin capturas falsas. */
function PreviewGlyph({ accent, auto }: { accent: string; auto: boolean }) {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <motion.div
        className="h-24 w-24 rounded-full"
        style={{ border: `1.5px solid ${accent}` }}
        animate={
          auto
            ? { scale: [1, 1.12, 1], rotate: [0, 8, 0] }
            : undefined
        }
        transition={
          auto
            ? { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }
            : undefined
        }
      />
      <div
        className="absolute h-2.5 w-2.5 rounded-full"
        style={{ background: accent }}
      />
    </div>
  );
}
