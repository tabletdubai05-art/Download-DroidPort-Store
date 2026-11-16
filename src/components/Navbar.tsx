import { DiscordIcon } from './Icons';

interface NavbarProps {
  discordLink: string | null;
  isLoading: boolean;
  onRetry: () => void;
}

export function Navbar({ discordLink, isLoading, onRetry }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-indigo-950/80 bg-[#060913]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:gap-8 sm:px-6">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#inicio"
          className="font-display text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-500"
        >
          DroidPort Store
        </a>

        {/* Zone 2: Concise Single-Line Navigation Links */}
        <nav
          aria-label="Navegação principal"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300"
        >
          <a
            href="#recursos"
            className="whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-white hover:underline hover:underline-offset-8 hover:decoration-violet-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-500"
          >
            Recursos
          </a>
          <a
            href="#por-dentro"
            className="whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-white hover:underline hover:underline-offset-8 hover:decoration-violet-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-500"
          >
            O Aplicativo
          </a>
          <a
            href="#como-instalar"
            className="whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-white hover:underline hover:underline-offset-8 hover:decoration-violet-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-500"
          >
            Como Instalar
          </a>
          <a
            href="#faq"
            className="whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-white hover:underline hover:underline-offset-8 hover:decoration-violet-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-500"
          >
            FAQ
          </a>
        </nav>

        {/* Zone 3: Primary Header Action (Discord Oficial) */}
        <div className="flex items-center shrink-0">
          {discordLink ? (
            <a
              href={discordLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-[#1E2952] px-4 py-2 text-sm font-semibold text-white border border-indigo-500/30 whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-violet-600 hover:border-violet-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
            >
              <DiscordIcon className="h-4 w-4 shrink-0" />
              <span>Discord Oficial</span>
            </a>
          ) : (
            <button
              type="button"
              onClick={onRetry}
              disabled={isLoading}
              className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-[#111A33] px-4 py-2 text-sm font-semibold text-slate-200 border border-indigo-900/70 whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#1A264A] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
            >
              <DiscordIcon className="h-4 w-4 shrink-0" />
              <span>{isLoading ? 'Conectando...' : 'Discord Oficial'}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
