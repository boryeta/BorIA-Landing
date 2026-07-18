import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Story } from './components/Story';
import { Process } from './components/Process';
import { Portfolio } from './components/Portfolio';
import { Philosophy } from './components/Philosophy';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { useSmoothScroll } from './lib/useSmoothScroll';
import { useReducedMotion } from './lib/useReducedMotion';

export default function App() {
  const reduced = useReducedMotion();
  // Con reduced-motion usamos scroll nativo (más predecible), sin Lenis.
  useSmoothScroll(!reduced);

  // Recalcular ScrollTriggers cuando las fuentes/imágenes cambian el layout.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts?.ready) {
      document.fonts.ready.then(refresh);
    }
    window.addEventListener('load', refresh);
    const t = window.setTimeout(refresh, 600);
    return () => {
      window.removeEventListener('load', refresh);
      window.clearTimeout(t);
    };
  }, []);

  return (
    <>
      <a
        href="#historia"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-graphite focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:text-paper"
      >
        Saltar al contenido
      </a>

      <Nav />
      <main id="main">
        <Hero />
        <Story />
        <Process />
        <Portfolio />
        <Philosophy />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
