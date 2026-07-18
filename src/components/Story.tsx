import { Reveal } from './Reveal';
import { DrawUnderline } from './DrawUnderline';
import { DualGlyph } from './DualGlyph';

// Ficha técnica: datos reales, nada inventado. Etiquetas mono (lo técnico) +
// valores serif (lo humano), la dualidad de la marca en formato "spec sheet".
const FICHA: { label: string; value: string }[] = [
  { label: 'Base', value: 'Alicante, España' },
  { label: 'Estudio', value: 'Llevant Studio · cofundador' },
  { label: 'Antes', value: 'Hostelería · restaurante propio' },
  { label: 'Proceso', value: 'Lovable → Claude Code → GitHub' },
  { label: 'Enfoque', value: 'Webs para negocios reales' },
];

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

          {/* Columna derecha: pull quote + ficha técnica (fija al hacer scroll) */}
          <div className="md:col-span-5 md:pl-8">
            <div className="sticky top-28 space-y-8">
              <Reveal delay={0.1} as="figure">
                <blockquote>
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

              {/* Ficha técnica tipo blueprint */}
              <Reveal delay={0.15}>
                <div className="relative overflow-hidden rounded-2xl border border-graphite-800/12 bg-paper-50 p-6">
                  {/* Esquinas tipo plano técnico */}
                  <Corner className="left-2.5 top-2.5" />
                  <Corner className="right-2.5 top-2.5 rotate-90" />
                  <Corner className="bottom-2.5 left-2.5 -rotate-90" />
                  <Corner className="bottom-2.5 right-2.5 rotate-180" />

                  <div className="mb-5 flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-graphite-400">
                      Ficha técnica
                    </span>
                    <DualGlyph size={22} />
                  </div>

                  <dl className="divide-y divide-graphite-800/8">
                    {FICHA.map((row) => (
                      <div
                        key={row.label}
                        className="flex items-baseline justify-between gap-4 py-3 first:pt-0 last:pb-0"
                      >
                        <dt className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-indigo">
                          {row.label}
                        </dt>
                        <dd className="text-right font-serif text-sm text-graphite md:text-base">
                          {row.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-5 flex items-center gap-2 border-t border-graphite-800/8 pt-4">
                    <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-graphite-400">
                      Disponible para nuevos proyectos
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Marca de esquina estilo plano técnico. */
function Corner({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute h-3 w-3 border-l border-t border-terracotta/40 ${className}`}
    />
  );
}
