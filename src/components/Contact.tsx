import { Reveal } from './Reveal';
import { AssembleText } from './AssembleText';

/**
 * Contacto — CTA final. El botón principal encarna la metáfora: pasa de
 * «boceto» (contorno índigo discontinuo) a «terminado» (relleno terracota
 * sólido) al hacer hover.
 *
 * [PENDIENTE] Sustituir CONTACT.email y CONTACT.whatsapp por los datos reales
 * de Borja antes de publicar.
 */
const CONTACT = {
  // [PENDIENTE: email real de Borja] — placeholder, no publicar sin sustituir.
  email: 'hola@boria.studio',
  // [PENDIENTE: número de WhatsApp real, formato internacional sin signos]
  whatsapp: '34600000000',
};

export function Contact() {
  const waHref = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    'Hola Borja, he visto tu web y me gustaría comentarte un proyecto.',
  )}`;

  return (
    <section
      id="contacto"
      className="relative bg-paper py-28 md:py-40"
      aria-label="Contacto"
    >
      <div className="mx-auto max-w-content px-6 md:px-10">
        <div className="rounded-3xl border border-graphite-800/10 bg-paper-50 px-6 py-16 text-center md:px-16 md:py-24">
          <Reveal>
            <p className="eyebrow mb-8">05 — Hablemos</p>
          </Reveal>

          <h2 className="mx-auto max-w-3xl text-balance font-serif text-4xl font-light leading-[1.02] tracking-tightest md:text-6xl">
            <AssembleText text="¿Tienes un negocio real" as="span" className="block" />
            <span className="italic text-terracotta">
              <AssembleText text="que merece una buena web?" as="span" className="block" delay={0.1} />
            </span>
          </h2>

          <Reveal delay={0.15}>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-graphite-500">
              Cuéntame qué haces y qué necesitas. Te respondo yo, en persona —
              sin formularios eternos ni promesas de agencia.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <SketchToSolidButton href={`mailto:${CONTACT.email}`}>
                Escríbeme un email
              </SketchToSolidButton>
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer noopener"
                className="link-underline font-mono text-xs uppercase tracking-[0.2em] text-graphite-600 hover:text-terracotta"
              >
                o por WhatsApp →
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="mt-8 font-mono text-xs tracking-[0.14em] text-graphite-400">
              {CONTACT.email} · Alicante, España
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/**
 * Botón que va de boceto a sólido: en reposo, contorno índigo discontinuo
 * (en construcción); al hover, relleno terracota que se asienta (terminado).
 */
function SketchToSolidButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] transition-all duration-300"
    >
      {/* Estado boceto: contorno índigo discontinuo */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full border border-dashed border-indigo transition-opacity duration-300 group-hover:opacity-0"
      />
      {/* Estado terminado: relleno terracota que se asienta desde el centro */}
      <span
        aria-hidden
        className="absolute inset-0 origin-center scale-90 rounded-full bg-terracotta opacity-0 transition-all duration-500 ease-assemble group-hover:scale-100 group-hover:opacity-100"
      />
      <span className="relative z-10 text-indigo transition-colors duration-300 group-hover:text-paper">
        {children}
      </span>
    </a>
  );
}
