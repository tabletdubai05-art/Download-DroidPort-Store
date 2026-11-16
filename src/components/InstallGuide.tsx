import { useState } from 'react';
import { ChevronDown, Download, RefreshCw, ShieldCheck } from 'lucide-react';
import { type AppConfig } from '../lib/supabase';
import { DiscordIcon } from './Icons';

interface InstallGuideProps {
  config: AppConfig | null;
  discordLink: string | null;
  isLoading: boolean;
  onRetry: () => void;
}

type AndroidFlavor = 'padrao' | 'samsung' | 'xiaomi';

interface FlavorGuide {
  id: AndroidFlavor;
  label: string;
  path: string;
  tip: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

const FLAVOR_GUIDES: FlavorGuide[] = [
  {
    id: 'padrao',
    label: 'Android Padrão',
    path: 'Configurações > Apps > Acesso especial a apps > Instalar apps desconhecidos',
    tip: 'Selecione o navegador usado no download (Chrome, Firefox ou gerenciador de arquivos) e marque "Permitir desta fonte".',
  },
  {
    id: 'samsung',
    label: 'Samsung One UI',
    path: 'Configurações > Aplicativos > Menu (⋮) > Acesso especial > Instalar apps desconhecidos',
    tip: 'Se o "Bloqueador Automático" (Auto Blocker) estiver ativo em Segurança e Privacidade, desative temporariamente para concluir a instalação do APK.',
  },
  {
    id: 'xiaomi',
    label: 'Xiaomi HyperOS / MIUI',
    path: 'Configurações > Proteção de privacidade > Permissões especiais > Instalar apps desconhecidos',
    tip: 'Toque em "Estou ciente dos possíveis riscos" após a contagem regressiva para liberar a instalação pelo seu navegador.',
  },
];

const INSTALL_STEPS = [
  {
    step: '01.',
    title: 'Baixe o APK Oficial',
    description:
      'Toque em "Baixar APK Oficial" nesta página para fazer o download do instalador mais recente da DroidPort Store.',
  },
  {
    step: '02.',
    title: 'Permita fontes desconhecidas',
    description:
      'Ao abrir o arquivo baixado, o Android solicitará autorização. Toque em "Configurações" no aviso e ative "Permitir desta fonte" para o seu navegador ou gerenciador de arquivos.',
  },
  {
    step: '03.',
    title: 'Instale e abra o aplicativo',
    description:
      'Volte à tela anterior, toque em "Instalar" e aguarde finalizar. Se quiser usar downloads via P2P, instale também o aplicativo gratuito LibreTorrent no seu aparelho.',
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question:
      'A DroidPort Store otimiza o celular ou aumenta o FPS dos jogos?',
    answer:
      'Não. A DroidPort Store não possui otimizador de sistema, limpador de memória ou acelerador de FPS. A área "Roda no seu celular?" serve apenas para os próprios usuários compartilharem como cada jogo funcionou no aparelho deles (Bom, Jogável ou Ruim) para ajudar outras pessoas.',
  },
  {
    question:
      'Os ports disponíveis no aplicativo são feitos pela equipe da loja?',
    answer:
      'Não. A DroidPort Store reúne e organiza ports criados pela comunidade e jogos indies para Android, separando claramente projetos prontos e projetos em desenvolvimento. Nós não afirmamos ser os autores dos ports.',
  },
  {
    question: 'Como funcionam o download direto e o P2P via LibreTorrent?',
    answer:
      'Em cada jogo você pode escolher baixar o arquivo diretamente pelo navegador ou optar pelo botão P2P para abrir em um cliente torrent como o LibreTorrent. A opção P2P ajuda principalmente em arquivos grandes, pois permite pausar e continuar depois.',
  },
  {
    question: 'O aplicativo ensina a colocar pastas OBB e Data?',
    answer:
      'Sim. A loja inclui tutoriais em texto e vídeo ensinando como instalar os arquivos e extrair pastas como OBB e Data nos diretórios corretos do Android.',
  },
  {
    question:
      'Como reportar um link quebrado ou enviar meu próprio port ou jogo indie?',
    answer:
      'Entre no servidor oficial pelo botão do Discord Oficial. Lá você pode tirar dúvidas de instalação, avisar sobre qualquer link fora do ar e enviar ports ou jogos indies próprios para serem avaliados e adicionados ao app.',
  },
  {
    question: 'Preciso voltar ao site toda vez que sair uma atualização?',
    answer:
      "Não! O próprio DroidPort Store avisa automaticamente na tela inicial quando uma nova atualização é criada, bastando tocar em 'Atualizar Agora'. Além disso, na aba Configurações você pode tocar em 'Verificar agora' para checar se o seu aplicativo está atualizado ou desativar a opção 'Verificar atualizações automaticamente' caso não queira atualizar no momento e prefira não ver o aviso toda vez que entrar no app.",
  },
];

export function InstallGuide({
  config,
  discordLink,
  isLoading,
  onRetry,
}: InstallGuideProps) {
  const [selectedFlavor, setSelectedFlavor] = useState<AndroidFlavor>('padrao');
  const [openFaqIndex, setOpenFaqIndex] = useState<number>(0);

  const activeGuide =
    FLAVOR_GUIDES.find((item) => item.id === selectedFlavor) ?? FLAVOR_GUIDES[0];

  const apkUrl = config?.link_apk?.trim() || null;

  return (
    <section id="como-instalar" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: 3-Step Installation Instructions */}
          <div className="lg:col-span-7">
            <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-4xl [text-wrap:balance]">
              Como Instalar no Android
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-300">
              Como o aplicativo é distribuído em APK oficial fora da Play Store,
              basta permitir a instalação por fontes desconhecidas uma única vez.
            </p>

            <ol className="mt-8 divide-y divide-indigo-950/80 border-y border-indigo-950/80">
              {INSTALL_STEPS.map((item) => (
                <li key={item.step} className="py-6 first:pt-5 last:pb-5">
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-sm font-semibold text-violet-400 tabular-nums">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-300 sm:text-base">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Right Column: Interactive Android Skin Helper */}
          <div className="flex flex-col justify-between rounded-2xl border border-indigo-950/90 bg-[#0C1224] p-6 sm:p-8 lg:col-span-5">
            <div>
              <div className="mb-4 flex items-center gap-2.5 text-violet-300">
                <ShieldCheck className="h-5 w-5 shrink-0" />
                <span className="font-mono text-xs font-medium text-violet-300">
                  Guia por Fabricante
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-white">
                Onde ativar "Permitir desta fonte"
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Escolha o sistema do seu celular para ver o caminho exato:
              </p>

              {/* Interactive Skin Selector */}
              <div
                role="tablist"
                aria-label="Selecionar sistema Android"
                className="mt-5 flex flex-wrap gap-1.5 rounded-xl border border-indigo-950/90 bg-[#070B17] p-1"
              >
                {FLAVOR_GUIDES.map((flavor) => {
                  const isActive = flavor.id === selectedFlavor;
                  return (
                    <button
                      key={flavor.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setSelectedFlavor(flavor.id)}
                      className={`min-h-[38px] flex-1 rounded-lg px-3 py-2 text-xs font-semibold whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 ${
                        isActive
                          ? 'bg-violet-600 text-white'
                          : 'text-slate-300 hover:bg-[#111A33] hover:text-white'
                      }`}
                    >
                      {flavor.label}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-xs font-medium text-slate-400">
                    Caminho nas configurações
                  </p>
                  <p className="mt-1.5 rounded-xl border border-indigo-900/60 bg-[#070B17] px-4 py-3 font-mono text-xs leading-relaxed text-violet-200">
                    {activeGuide.path}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-400">
                    Observação importante
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
                    {activeGuide.tip}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-indigo-950/80 pt-5 text-xs text-slate-400">
              Para baixar arquivos grandes via P2P, você pode instalar o{' '}
              <span className="font-semibold text-slate-200">LibreTorrent</span>{' '}
              pela Play Store ou F-Droid.
            </div>
          </div>
        </div>

        {/* Truthful FAQ Section */}
        <div id="faq" className="mt-20 border-t border-indigo-950/80 pt-16">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl [text-wrap:balance]">
              Perguntas Frequentes (FAQ)
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-300 sm:text-base">
              Respostas diretas sobre o que o aplicativo faz, como os jogos são
              organizados e como funciona a comunidade.
            </p>
          </div>

          <div className="mt-8 divide-y divide-indigo-950/80 rounded-2xl border border-indigo-950/90 bg-[#0C1224]">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={item.question}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() =>
                      setOpenFaqIndex(isOpen ? -1 : index)
                    }
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-[#111A33]/60 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-violet-400"
                  >
                    <span className="font-display text-base font-semibold text-white sm:text-lg">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-violet-400 transition-transform duration-150 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-sm leading-relaxed text-slate-300 sm:text-base">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Final Conversion Block */}
        <div
          id="comunidade"
          className="mt-16 flex flex-col items-start justify-between gap-6 rounded-2xl border border-violet-500/25 bg-gradient-to-r from-[#0F1733] via-[#12163A] to-[#1D1342] p-7 sm:flex-row sm:items-center sm:p-10"
        >
          <div className="max-w-xl">
            <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl [text-wrap:balance]">
              Baixe o aplicativo ou participe do Discord
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
              Instale o APK oficial da DroidPort Store ou entre no Discord para
              tirar dúvidas de instalação, reportar links e enviar novos jogos.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3.5 shrink-0">
            {apkUrl ? (
              <a
                href={apkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
              >
                <Download className="h-4 w-4 shrink-0" />
                <span>Baixar APK Oficial</span>
              </a>
            ) : (
              <button
                type="button"
                onClick={onRetry}
                disabled={isLoading}
                className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-violet-500 disabled:opacity-70"
              >
                <RefreshCw
                  className={`h-4 w-4 shrink-0 ${isLoading ? 'animate-spin' : ''}`}
                />
                <span>{isLoading ? 'Carregando...' : 'Atualizar Link APK'}</span>
              </button>
            )}

            {discordLink ? (
              <a
                href={discordLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-indigo-400/35 bg-[#0B1120]/80 px-5 py-3 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-violet-400 hover:bg-[#131C3A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
              >
                <DiscordIcon className="h-4 w-4 shrink-0" />
                <span>Discord Oficial</span>
              </a>
            ) : (
              <button
                type="button"
                onClick={onRetry}
                disabled={isLoading}
                className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-indigo-800/70 bg-[#0B1120]/80 px-5 py-3 text-sm font-semibold text-slate-300 whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#131C3A]"
              >
                <DiscordIcon className="h-4 w-4 shrink-0" />
                <span>Discord Oficial</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
