import { Reveal } from './Reveal';
import { DrawUnderline } from './DrawUnderline';

/**
 * Historia — sección editorial. Tipografía serif grande, scroll reveal
 * progresivo y una pull quote con subrayado que se dibuja al entrar.
 */
export function Story() {
  return (
    <section
      id="historia"
      className="relative bg-paper py-28 md:py-40"
      aria-label="Historia"
    >
      <div className="mx-auto max-w-content px-6 md:px-10">
        <Reveal>
          <p className="eyebrow mb-10">01 — Quién hay detrás</p>
        </Reveal>

        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <Reveal>
              <h2 className="text-balance font-serif text-3xl font-light leading-tight tracking-tightest md:text-5xl">
                Antes de las webs,
                <br />
                <span className="italic text-terracotta">estuve al otro lado del mostrador.</span>
              </h2>
            </Reveal>

            <div className="mt-10 space-y-6 text-lg leading-relaxed text-graphite-600 md:text-xl">
              <Reveal delay={0.05} as="p">
                Soy Borja. Antes de dedicarme al desarrollo web tuve un
                restaurante, así que sé lo que es la presión real de un negocio:
                el servicio lleno, el proveedor que falla, cada euro contando.
                No lo he leído en un caso de estudio — lo he vivido.
              </Reveal>
              <Reveal delay={0.1} as="p">
                Por eso construyo webs con esa misma exigencia. Cuando hago la
                web de un restaurante, un taller o un servicio local, entiendo
                el negocio que hay detrás, no solo el diseño que va delante.
              </Reveal>
              <Reveal delay={0.15} as="p">
                Hoy trabajo como <span className="font-medium text-graphite">BorIA</span> —
                Borja + IA — y también soy cofundador de{' '}
                <span className="font-medium text-graphite">Llevant Studio</span>.
                Uso la IA como herramienta de construcción, sin esconderla:
                prototipo rápido y luego refino a mano hasta que cada detalle
                está en su sitio.
              </Reveal>
            </div>
          </div>

          {/* Pull quote destacada con subrayado dibujado */}
          <div className="md:col-span-5 md:pl-8">
            <Reveal delay={0.1} as="figure">
              <blockquote className="sticky top-32">
                <p className="font-serif text-2xl font-light italic leading-snug text-graphite md:text-3xl">
                  «La IA me da la velocidad.
                  <br />
                  El{' '}
                  <DrawUnderline>criterio</DrawUnderline> lo pongo yo.»
                </p>
                <figcaption className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-graphite-400">
                  — cómo entiendo mi oficio
                </figcaption>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
