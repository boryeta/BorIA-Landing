import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll suavizado con Lenis, sincronizado con el ticker de GSAP para que
 * el scroll-scrubbing del 3D no se vea tosco. Se desactiva si el usuario
 * pide movimiento reducido (usa scroll nativo, más predecible).
 */
export function useSmoothScroll(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) {
      // Sin Lenis: ScrollTrigger usa scroll nativo.
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // Anclas internas → scroll suave de Lenis.
    const handleAnchor = (e: Event) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute('href');
      if (!id || id === '#') return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -8, duration: 1.2 });
    };
    document.addEventListener('click', handleAnchor);

    ScrollTrigger.refresh();

    return () => {
      document.removeEventListener('click', handleAnchor);
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, [enabled]);
}
