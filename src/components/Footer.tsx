import { formatVersionLabel } from '../hooks/useDroidPortData';

interface FooterProps {
  versaoAtual: string | null;
  discordLink: string | null;
}

export function Footer({ versaoAtual, discordLink }: FooterProps) {
  const formattedVersion = versaoAtual ? formatVersionLabel(versaoAtual) : null;

  return (
    <footer className="border-t border-indigo-950/80 bg-[#050811] py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6">
        <div>
          <a
            href="#inicio"
            className="font-display text-base font-bold tracking-tight text-white"
          >
            DroidPort Store
          </a>
          <p className="mt-1 text-xs text-slate-400">
            Catálogo de ports da comunidade e jogos indies para Android ·{' '}
            {formattedVersion ? (
              <span className="font-mono text-slate-300 tabular-nums">
                {formattedVersion}
              </span>
            ) : (
              <span>Aplicativo Oficial</span>
            )}
          </p>
        </div>

        <nav
          aria-label="Links do rodapé"
          className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-slate-400"
        >
          <a href="#recursos" className="transition-colors hover:text-white">
            Recursos
          </a>
          <a href="#por-dentro" className="transition-colors hover:text-white">
            O Aplicativo
          </a>
          <a href="#como-instalar" className="transition-colors hover:text-white">
            Como Instalar
          </a>
          <a href="#faq" className="transition-colors hover:text-white">
            FAQ
          </a>
          {discordLink && (
            <a
              href={discordLink}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-violet-300"
            >
              Discord Oficial
            </a>
          )}
        </nav>
      </div>
    </footer>
  );
}
