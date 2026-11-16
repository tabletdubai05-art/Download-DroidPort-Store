import { useState } from 'react';
import { Smartphone } from 'lucide-react';

interface ScreenItem {
  id: string;
  tabLabel: string;
  title: string;
  description: string;
  images: { path: string; alt: string }[];
}

const APP_SCREENS: ScreenItem[] = [
  {
    id: 'catalogo',
    tabLabel: 'Catálogo e Filtros',
    title: 'Busca rápida, categorias e organização clara',
    description:
      'Pesquise jogos pelo nome, filtre por categoria ou ordenação e alterne entre lista e grade. Você também acompanha seus jogos favoritos e o histórico de downloads direto na barra inferior.',
    images: [
      {
        path: './assets/showcase/app_catalogo.jpg',
        alt: 'Tela Todos os jogos da DroidPort Store exibindo barra de pesquisa, filtros por categoria e lista de jogos',
      },
    ],
  },
  {
    id: 'downloads',
    tabLabel: 'Direto e P2P',
    title: 'Download direto ou P2P com LibreTorrent',
    description:
      'Na seção Arquivos Disponíveis de cada jogo, você escolhe baixar diretamente pelo gerenciador do dispositivo ou usar o botão Baixar P2P para abrir o download direto em um cliente como o LibreTorrent. Caso o sistema bloqueie a abertura automática, há também um botão dedicado caso queira copiar o link manualmente.',
    images: [
      {
        path: './assets/showcase/app_downloads.jpg',
        alt: 'Tela Arquivos Disponíveis mostrando opções de download direto e Baixar P2P com recomendação do LibreTorrent',
      },
    ],
  },
  {
    id: 'relatos',
    tabLabel: 'Roda no seu celular?',
    title: 'Relatos reais enviados pelos próprios usuários',
    description:
      'Cada página de jogo reúne a nota geral, média de FPS informada pela comunidade e a contagem de avaliações divididas em Bom, Jogável ou Ruim — com campo de busca para filtrar por aparelho, marca ou processador.',
    images: [
      {
        path: './assets/showcase/app_relatos.jpg',
        alt: 'Tela Roda no seu celular mostrando botão Relatar meu aparelho, nota geral, média de FPS e distribuição entre Bom, Jogável e Ruim',
      },
    ],
  },
  {
    id: 'atualizacao',
    tabLabel: 'Atualização Automática',
    title: 'Aviso de Atualização Automática',
    description:
      'O aplicativo avisa automaticamente na tela inicial quando uma nova atualização é criada, exibindo o botão "Atualizar Agora" para baixar a versão mais recente sem precisar voltar ao site.',
    images: [
      {
        path: './assets/showcase/app_atualizacao.jpg',
        alt: 'Tela inicial do aplicativo exibindo o aviso Nova Atualização Disponível com o botão Atualizar Agora',
      },
    ],
  },
  {
    id: 'configuracoes',
    tabLabel: 'Configurações',
    title: 'Configurações completas de conta, tema, idioma e atualizações',
    description:
      'Na aba Configurações você gerencia sua conta Google para relatos, acessa o Discord Oficial, escolhe tema e idioma, instala o LibreTorrent e controla as atualizações — podendo tocar em "Verificar agora" para conferir se o app está atualizado ou desativar o aviso automático ao abrir o aplicativo.',
    images: [
      {
        path: './assets/showcase/app_config_1.jpg',
        alt: 'Parte superior da tela Configurações mostrando conta Google, botão do Discord Oficial, tema do aplicativo e idioma',
      },
      {
        path: './assets/showcase/app_config_2.jpg',
        alt: 'Parte inferior da tela Configurações mostrando idioma, controle de atualizações automáticas, Verificar agora, cliente LibreTorrent e limpeza de histórico',
      },
    ],
  },
];

export function AppShowcase() {
  const [activeId, setActiveId] = useState<string>(APP_SCREENS[0].id);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const activeScreen =
    APP_SCREENS.find((screen) => screen.id === activeId) ?? APP_SCREENS[0];

  const isMultiImage = activeScreen.images.length > 1;

  return (
    <section
      id="por-dentro"
      className="border-y border-indigo-950/80 bg-[#080D1B] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Honest Interactive Screen Switcher */}
          <div className="lg:col-span-6">
            <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl [text-wrap:balance]">
              Por dentro da DroidPort Store
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
              Veja as telas reais do aplicativo e como o catálogo, os downloads,
              os relatos da comunidade e as configurações funcionam na prática.
            </p>

            {/* Interactive Tab Buttons */}
            <div
              role="tablist"
              aria-label="Telas do aplicativo DroidPort Store"
              className="mt-7 flex flex-wrap gap-2"
            >
              {APP_SCREENS.map((screen) => {
                const isActive = screen.id === activeScreen.id;
                return (
                  <button
                    key={screen.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveId(screen.id)}
                    className={`min-h-[40px] rounded-lg border px-4 py-2 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 ${
                      isActive
                        ? 'border-violet-500 bg-violet-600 text-white'
                        : 'border-indigo-900/80 bg-[#0C1224] text-slate-300 hover:border-indigo-700 hover:text-white'
                    }`}
                  >
                    {screen.tabLabel}
                  </button>
                );
              })}
            </div>

            {/* Active Screen Explanation */}
            <div className="mt-6 rounded-2xl border border-indigo-950/90 bg-[#0C1224] p-6">
              <h3 className="font-display text-xl font-bold text-white">
                {activeScreen.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-300 sm:text-base">
                {activeScreen.description}
              </p>
            </div>
          </div>

          {/* Right Column: Real App Screenshots (1 frame or 2 side-by-side for full Configurações) */}
          <div className="flex justify-center lg:col-span-6">
            <div
              className={
                isMultiImage
                  ? 'grid w-full max-w-[500px] grid-cols-1 gap-4 sm:grid-cols-2'
                  : 'flex w-full justify-center'
              }
            >
              {activeScreen.images.map((imgItem) => (
                <div
                  key={imgItem.path}
                  className={
                    isMultiImage
                      ? 'mx-auto w-full max-w-[240px] overflow-hidden rounded-[22px] border-[4px] border-[#1E2749] bg-[#120A24] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.85)]'
                      : 'w-full max-w-[260px] overflow-hidden rounded-[26px] border-[5px] border-[#1E2749] bg-[#120A24] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.85)]'
                  }
                >
                  {!failedImages[imgItem.path] ? (
                    <img
                      src={imgItem.path}
                      alt={imgItem.alt}
                      onError={() =>
                        setFailedImages((prev) => ({
                          ...prev,
                          [imgItem.path]: true,
                        }))
                      }
                      className="block h-auto w-full"
                    />
                  ) : (
                    <div className="flex aspect-[9/19] flex-col items-center justify-center p-6 text-center">
                      <Smartphone className="mb-3 h-7 w-7 text-violet-300" />
                      <p className="font-display text-sm font-semibold text-white">
                        {activeScreen.tabLabel}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        {activeScreen.title}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
