import { Wordmark } from './Wordmark';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-graphite-900 text-paper/70">
      <div className="mx-auto flex max-w-content flex-col gap-8 px-6 py-14 md:flex-row md:items-center md:justify-between md:px-10">
        <div>
          <Wordmark tone="light" className="text-2xl" />
          <p className="mt-3 max-w-xs font-serif text-sm italic text-paper/50">
            Borja + IA. Diseño web con criterio, desde Alicante.
          </p>
        </div>

        <div className="flex flex-col gap-2 font-mono text-xs uppercase tracking-[0.18em] text-paper/50 md:items-end">
          <p>
            Cofundador de{' '}
            <span className="text-paper/80">Llevant Studio</span>
          </p>
          <p>
            Hecho con Lovable · Claude Code · GitHub
          </p>
          <p className="text-paper/40">© {year} BorIA — todos los derechos reservados</p>
        </div>
      </div>
    </footer>
  );
}
