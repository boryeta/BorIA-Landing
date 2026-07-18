/**
 * Señales compartidas entre el DOM (GSAP/eventos) y el loop de render de
 * react-three-fiber. Usamos un objeto mutable en vez de estado de React para
 * no re-renderizar en cada frame: el canvas lee estos valores dentro de
 * `useFrame`, y GSAP/eventos los escriben.
 */
export const heroSignals = {
  /** Progreso de ensamblaje 0 (boceto/caos) → 1 (pieza sólida). */
  assemble: 0,
  /** Posición del ratón normalizada [-1, 1] para el parallax. */
  pointerX: 0,
  pointerY: 0,
  /** En táctil/reduced-motion pilotamos la rotación con el scroll global. */
  autoDrift: 0,
};

export type HeroSignals = typeof heroSignals;
