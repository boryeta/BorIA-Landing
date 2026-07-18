interface WordmarkProps {
  className?: string;
  /** En claro para fondos oscuros; en grafito para fondos claros. */
  tone?: 'light' | 'dark';
}

/**
 * El logotipo BorIA. "Bor" en serif con cursiva cálida (lo humano) e "IA" en
 * monoespaciada técnica (la IA). Las dos familias son la firma visual de la
 * dualidad. Terracota para lo humano, índigo para lo técnico.
 */
export function Wordmark({ className = '', tone = 'dark' }: WordmarkProps) {
  const base = tone === 'light' ? 'text-paper' : 'text-graphite';
  return (
    <span
      className={`inline-flex items-baseline leading-none select-none ${base} ${className}`}
    >
      <span className="font-serif italic font-semibold tracking-tightest text-terracotta">
        Bor
      </span>
      <span className="font-mono font-semibold tracking-tight text-indigo">
        IA
      </span>
    </span>
  );
}
