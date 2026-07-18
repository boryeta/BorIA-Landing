interface DualGlyphProps {
  size?: number;
  className?: string;
}

/**
 * Motivo visual de la dualidad boceto→sólido: media circunferencia en índigo
 * discontinuo (el boceto, en construcción) y media en terracota sólido (lo
 * terminado). Se reutiliza como acento en varias secciones.
 */
export function DualGlyph({ size = 40, className = '' }: DualGlyphProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Mitad izquierda: boceto índigo discontinuo */}
      <path
        d="M20 3 A17 17 0 0 0 20 37"
        stroke="#4b52e6"
        strokeWidth="1.5"
        strokeDasharray="2.5 3"
        strokeLinecap="round"
      />
      {/* Mitad derecha: terminado, terracota sólido */}
      <path d="M20 3 A17 17 0 0 1 20 37 Z" fill="#c65f3c" />
      {/* Junta central */}
      <line x1="20" y1="3" x2="20" y2="37" stroke="#1c1a17" strokeWidth="1" strokeOpacity="0.15" />
    </svg>
  );
}
