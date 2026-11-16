import { useState } from 'react';
import { ArrowDown, Download, RefreshCw, Smartphone } from 'lucide-react';
import { type AppConfig } from '../lib/supabase';
import { formatVersionLabel } from '../hooks/useDroidPortData';

interface HeroSectionProps {
  config: AppConfig | null;
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}

const HERO_APP_SCREENSHOT = './assets/showcase/app_inicio.jpg';

const STORE_PILLARS = [
  {
    title: 'Ports e Jogos Indies',
    detail: 'Projetos prontos e em desenvolvimento organizados em um só catálogo',
  },
  {
    title: 'Download Direto e P2P',
    detail: 'Baixe diretamente ou via rede P2P usando o LibreTorrent',
  },
  {
    title: 'Relatos da Comunidade',
    detail: 'Avaliações Bom, Jogável ou Ruim feitas por outros jogadores',
  },
  {
    title: 'Tutoriais e Discord',
    detail: 'Guias de pastas OBB/Data, suporte e envio de projetos',
  },
];

export function HeroSection({
  config,
  isLoading,
  error,
  onRetry,
}: HeroSectionProps) {
  const [imageFailed, setImageFailed] = useState(false);

  const versionText = config?.versao_atual
    ? formatVersionLabel(config.versao_atual)
    : null;
  const apkUrl = config?.link_apk?.trim() || null;

  return (
    <section
      id="inicio"
      className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24"
    >
      {/* Subtle dark blue & violet ambient wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(ellipse_75%_60%_at_65%_15%,rgba(109,40,217,0.20),rgba(30,58,138,0.14)_45%,transparent_75%)]"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Copy, Dynamic Version Badge & Primary CTA */}
          <div className="flex flex-col justify-center lg:col-span-7">
            {/* Dynamic Version Badge from public.config */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
              {isLoading ? (
                <span className="inline-flex h-7 w-36 animate-pulse items-center rounded-md border border-violet-500/25 bg-violet-950/40 px-3 text-xs font-mono text-violet-300">
                  Buscando versão...
                </span>
              ) : versionText ? (
                <span className="inline-flex items-center rounded-md border border-violet-500/40 bg-violet-600/15 px-3 py-1 font-mono text-xs font-medium text-violet-200 tabular-nums">
                  {versionText}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={onRetry}
                  className="inline-flex items-center gap-1.5 rounded-md border border-amber-500/40 bg-amber-500/10 px-3 py-1 font-mono text-xs font-medium text-amber-200 transition-colors hover:bg-amber-500/20"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Recarregar versão</span>
                </button>
              )}

              <span className="text-xs font-medium text-slate-400">
                Android{' '}
                <span aria-hidden="true" className="mx-1.5 text-slate-600">
                  ·
                </span>{' '}
                APK Oficial
              </span>
            </div>

            <h1 className="font-display text-[clamp(2.2rem,3.9vw,3.55rem)] font-bold leading-[1.08] tracking-tight text-white [text-wrap:balance]">
              Catálogo de ports da comunidade e jogos indies para Android
            </h1>

            <p className="mt-5 max-w-[62ch] text-base leading-relaxed text-slate-300 sm:text-lg">
              A DroidPort Store reúne e organiza ports feitos pela comunidade e
              jogos independentes — separando projetos prontos e em
              desenvolvimento — com download direto ou P2P via LibreTorrent,
              relatos reais de outros usuários por aparelho e tutoriais de
              instalação.
            </p>

            {/* Primary CTA & Secondary Scroll Anchor */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {apkUrl ? (
                <a
                  href={apkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-xl bg-violet-600 px-7 py-3.5 text-base font-semibold text-white shadow-[0_8px_28px_-6px_rgba(124,58,237,0.55)] whitespace-nowrap shrink-0 transition-all duration-150 hover:bg-violet-500 active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
                >
                  <Download className="h-5 w-5 shrink-0" />
                  <span>Baixar APK Oficial</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={onRetry}
                  disabled={isLoading}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-xl bg-violet-600 px-7 py-3.5 text-base font-semibold text-white whitespace-nowrap shrink-0 transition-all duration-150 hover:bg-violet-500 disabled:cursor-wait disabled:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-5 w-5 shrink-0 animate-spin" />
                      <span>Carregando APK Oficial...</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-5 w-5 shrink-0" />
                      <span>Tentar Carregar APK</span>
                    </>
                  )}
                </button>
              )}

              <a
                href="#como-instalar"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-indigo-900/80 bg-[#0C1224] px-5 py-3.5 text-sm font-semibold text-slate-200 whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-indigo-700 hover:bg-[#111A33] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
              >
                <span>Como instalar</span>
                <ArrowDown className="h-4 w-4 text-violet-400" />
              </a>
            </div>

            {error && (
              <p role="alert" className="mt-4 text-sm text-amber-300">
                {error}
              </p>
            )}
          </div>

          {/* Right Column: Real App Screen Showcase */}
          <div className="lg:col-span-5">
            <div className="relative flex h-full min-h-[360px] items-center justify-center overflow-hidden rounded-2xl border border-indigo-900/60 bg-gradient-to-br from-[#0A0F22] via-[#0D132B] to-[#1A1038] p-6 sm:p-8">
              <div className="relative w-full max-w-[245px] overflow-hidden rounded-[26px] border-[5px] border-[#1E2749] bg-[#120A24] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.85)]">
                {!imageFailed ? (
                  <img
                    src={HERO_APP_SCREENSHOT}
                    alt="Tela inicial do aplicativo DroidPort Store exibindo busca, destaques, filtros e catálogo de jogos"
                    onError={() => setImageFailed(true)}
                    className="block w-full h-auto"
                  />
                ) : (
                  <div className="flex aspect-[9/19] flex-col items-center justify-center p-6 text-center">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-violet-500/30 bg-violet-600/15 text-violet-300">
                      <Smartphone className="h-6 w-6" />
                    </div>
                    <p className="font-display text-base font-semibold text-white">
                      DroidPort Store
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Catálogo organizado de ports da comunidade e jogos indies.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Store Pillars Strip */}
        <div className="mt-14 grid grid-cols-1 divide-y divide-indigo-950/80 border-y border-indigo-950/80 bg-[#090E1C]/70 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {STORE_PILLARS.map((item) => (
            <div key={item.title} className="px-5 py-5">
              <p className="font-display text-sm font-semibold text-white">
                {item.title}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
