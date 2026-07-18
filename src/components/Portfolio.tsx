import { Reveal } from './Reveal';
import { ProjectCard } from './ProjectCard';
import { PROJECTS } from './portfolioData';

/**
 * Trabajo — solo proyectos reales, mostrados con orgullo. Nada de inflar con
 * un carrusel de logos: son pocos y buenos.
 */
export function Portfolio() {
  return (
    <section
      id="trabajo"
      className="relative bg-paper py-28 md:py-40"
      aria-label="Trabajo"
    >
      <div className="mx-auto max-w-content px-6 md:px-10">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow mb-6">03 — Trabajo seleccionado</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-balance font-serif text-3xl font-light leading-tight tracking-tightest md:text-5xl">
                Pocos proyectos.
                <span className="italic text-terracotta"> Todos reales.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm leading-relaxed text-graphite-500">
              Prefiero enseñar tres cosas que hago con criterio antes que un muro
              de logos. Pasa el ratón por cada una.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Espacio preparado para prueba social real, sin inventar testimonios */}
        {/* [PENDIENTE: testimonio real de cliente] */}
        <TestimonialPlaceholder />
      </div>
    </section>
  );
}

/**
 * Componente preparado para un testimonio real. No se rellena con contenido
 * inventado: queda visible como hueco intencional hasta tener datos reales.
 */
function TestimonialPlaceholder() {
  // [PENDIENTE: testimonio real de cliente]
  // Sustituir este bloque por una cita real (texto + nombre + negocio) cuando
  // Borja la facilite. Mientras tanto se muestra un marcador honesto.
  return (
    <Reveal delay={0.1}>
      <figure className="mt-10 rounded-2xl border border-dashed border-graphite-800/20 bg-paper-50 p-8 text-center md:p-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-indigo">
          Prueba social · pendiente
        </p>
        <blockquote className="mx-auto mt-4 max-w-2xl font-serif text-xl font-light italic leading-snug text-graphite-400 md:text-2xl">
          «Aquí irá un testimonio real de cliente en cuanto lo tenga. No pongo
          citas inventadas: prefiero un hueco honesto a una mentira bonita.»
        </blockquote>
        <figcaption className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-graphite-400">
          — reservado para un cliente de verdad
        </figcaption>
      </figure>
    </Reveal>
  );
}
