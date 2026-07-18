import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Wordmark } from './Wordmark';

const LINKS = [
  { href: '#historia', label: 'Historia' },
  { href: '#proceso', label: 'Cómo trabajo' },
  { href: '#trabajo', label: 'Trabajo' },
  { href: '#filosofia', label: 'Filosofía' },
];

/**
 * Navegación fija. Empieza sobre el hero oscuro (tono claro) y, al pasar el
 * scroll a las secciones de papel, adopta un fondo papel translúcido.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const tone = scrolled ? 'dark' : 'light';

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? 'bg-paper/85 backdrop-blur-md border-b border-graphite-800/10'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-content items-center justify-between px-6 py-4 md:px-10">
        <a href="#top" className="flex items-center gap-2" aria-label="BorIA — inicio">
          <Wordmark tone={tone} className="text-2xl" />
        </a>

        <ul
          className={`hidden items-center gap-8 md:flex ${
            scrolled ? 'text-graphite-600' : 'text-paper/80'
          }`}
        >
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="link-underline font-mono text-xs uppercase tracking-[0.22em] transition-colors hover:text-terracotta"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contacto"
          className={`font-mono text-xs uppercase tracking-[0.2em] rounded-full border px-4 py-2 transition-all duration-300 ${
            scrolled
              ? 'border-graphite-800/20 text-graphite hover:border-terracotta hover:text-terracotta'
              : 'border-paper/30 text-paper hover:border-terracotta hover:bg-terracotta/10'
          }`}
        >
          Hablemos
        </a>
      </nav>
    </motion.header>
  );
}
