import { useState } from 'react';
import {
  BookOpen,
  Gamepad2,
  HardDriveDownload,
  MessageSquareText,
  RefreshCw,
  Users,
} from 'lucide-react';
import { DiscordIcon } from './Icons';
import p2pVisual from '../assets/images/bento_p2p_downloads_1794786000663.jpg';

interface FeaturesBentoProps {
  discordLink: string | null;
}

const P2P_VISUAL = p2pVisual;

export function FeaturesBento({ discordLink }: FeaturesBentoProps) {
  const [p2pImageFailed, setP2pImageFailed] = useState(false);

  return (
    <section id="recursos" className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-4xl [text-wrap:balance]">
            O que o aplicativo oferece
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-300">
            Conheça as funções reais da DroidPort Store para encontrar ports da
            comunidade, escolher como baixar e conferir relatos de outros
            jogadores.
          </p>
        </div>

        {/* Asymmetric 12-Column Bento Grid covering the 5 real features */}
        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* 01. Catálogo de Ports e Jogos Indies */}
          <article className="flex flex-col justify-between rounded-2xl border border-indigo-950/90 bg-[#0C1224] p-6 sm:p-8 lg:col-span-7">
            <div>
              <div className="mb-4 flex items-center gap-2.5 text-violet-300">
                <Gamepad2 className="h-5 w-5 shrink-0" />
                <span className="font-mono text-xs font-medium text-violet-300">
                  Organização do Catálogo
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                01. Catálogo de Ports e Jogos Indies
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-300 sm:text-base">
                O aplicativo reúne e organiza ports criados pela comunidade e
                jogos indies para Android, separando com clareza o que já é um
                projeto pronto e o que ainda está em desenvolvimento. Os jogos
                não são produzidos pela loja — nós centralizamos e organizamos
                os lançamentos para facilitar a busca.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 border-t border-indigo-950/80 pt-5 text-sm text-slate-300 sm:grid-cols-3">
              <div>
                <p className="font-semibold text-white">Busca e Filtros</p>
                <p className="mt-0.5 text-xs text-slate-400">
                  Pesquise por nome, categoria e mais recentes
                </p>
              </div>
              <div>
                <p className="font-semibold text-white">Status do Projeto</p>
                <p className="mt-0.5 text-xs text-slate-400">
                  Separação entre projetos prontos e em desenvolvimento
                </p>
              </div>
              <div>
                <p className="font-semibold text-white">Favoritos e Histórico</p>
                <p className="mt-0.5 text-xs text-slate-400">
                  Salve jogos e acesse downloads anteriores
                </p>
              </div>
            </div>
          </article>

          {/* 02. Download Direto e P2P */}
          <article className="relative flex min-h-[290px] flex-col justify-end overflow-hidden rounded-2xl border border-indigo-950/90 bg-[#0C1224] lg:col-span-5">
            {!p2pImageFailed ? (
              <img
                src={P2P_VISUAL}
                alt="Representação visual de downloads diretos e rede P2P"
                referrerPolicy="no-referrer"
                onError={() => setP2pImageFailed(true)}
                className="absolute inset-0 h-full w-full object-cover opacity-70"
              />
            ) : (
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#111A33] to-violet-950/60"
              />
            )}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#060913] via-[#060913]/90 to-[#060913]/30"
            />

            <div className="relative z-10 p-6 sm:p-8">
              <div className="mb-3 flex items-center gap-2.5 text-violet-300">
                <HardDriveDownload className="h-5 w-5 shrink-0" />
                <span className="font-mono text-xs font-medium text-violet-300">
                  Direto ou LibreTorrent
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                02. Download Direto e P2P
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-300 sm:text-base">
                Baixe os arquivos diretamente pelo gerenciador do aparelho ou
                escolha a opção P2P (com suporte a aplicativos como o
                LibreTorrent), ideal para pausar e retomar arquivos pesados.
              </p>
            </div>
          </article>

          {/* 03. Relatos de Desempenho da Comunidade */}
          <article className="flex flex-col justify-between rounded-2xl border border-indigo-950/90 bg-[#0C1224] p-6 sm:p-8 lg:col-span-6">
            <div>
              <div className="mb-4 flex items-center gap-2.5 text-indigo-300">
                <MessageSquareText className="h-5 w-5 shrink-0" />
                <span className="font-mono text-xs font-medium text-indigo-300">
                  Roda no seu celular?
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                03. Relatos de Desempenho da Comunidade
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-300 sm:text-base">
                Os próprios usuários avaliam e compartilham como cada jogo rodou
                no modelo do seu celular, classificando a experiência como{' '}
                <strong className="font-semibold text-emerald-300">Bom</strong>,{' '}
                <strong className="font-semibold text-amber-300">Jogável</strong>{' '}
                ou{' '}
                <strong className="font-semibold text-rose-300">Ruim</strong>.
                Assim você descobre se o port funciona bem em aparelhos
                parecidos com o seu antes de baixar.
              </p>
            </div>

            <div className="mt-6 border-t border-indigo-950/80 pt-4 text-xs leading-relaxed text-slate-400">
              Nota: O aplicativo não altera o sistema nem melhora o FPS do seu
              aparelho — os dados exibidos são relatos reais enviados pelos
              usuários.
            </div>
          </article>

          {/* 04. Tutoriais de Instalação */}
          <article className="flex flex-col justify-between rounded-2xl border border-indigo-950/90 bg-[#0C1224] p-6 sm:p-8 lg:col-span-6">
            <div>
              <div className="mb-4 flex items-center gap-2.5 text-violet-300">
                <BookOpen className="h-5 w-5 shrink-0" />
                <span className="font-mono text-xs font-medium text-violet-300">
                  Guias e Vídeos
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                04. Tutoriais de Instalação
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-300 sm:text-base">
                Guias e vídeos explicativos ensinando passo a passo como
                instalar os jogos e extrair arquivos nas pastas corretas do
                Android, evitando erros comuns com arquivos compactados, pastas{' '}
                <span className="font-mono text-slate-200">OBB</span> e pastas{' '}
                <span className="font-mono text-slate-200">Data</span>.
              </p>
            </div>

            <ul className="mt-6 space-y-2 border-t border-indigo-950/80 pt-4 text-xs text-slate-300 sm:text-sm">
              <li className="flex items-baseline justify-between gap-4">
                <span>Extração e movimentação de pastas OBB e Data</span>
                <span className="font-mono text-xs text-slate-400">Guias e vídeos</span>
              </li>
              <li className="flex items-baseline justify-between gap-4">
                <span>Passo a passo para abrir links P2P no LibreTorrent</span>
                <span className="font-mono text-xs text-slate-400">No próprio app</span>
              </li>
            </ul>
          </article>

          {/* 05. Comunidade no Discord */}
          <article className="flex flex-col justify-between gap-6 rounded-2xl border border-indigo-950/90 bg-gradient-to-br from-[#0C1224] via-[#0F1733] to-[#1A133A] p-6 sm:p-8 lg:col-span-7">
            <div>
              <div className="mb-3 flex items-center gap-2.5 text-violet-300">
                <Users className="h-5 w-5 shrink-0" />
                <span className="font-mono text-xs font-medium text-violet-300">
                  Suporte e Envios
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                05. Comunidade no Discord
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-300 sm:text-base">
                Use o servidor oficial no Discord para tirar dúvidas de
                instalação, avisar sobre links quebrados e enviar ports ou jogos
                indies próprios para serem avaliados e adicionados ao catálogo
                do aplicativo.
              </p>
            </div>

            <div className="border-t border-indigo-900/50 pt-5">
              {discordLink ? (
                <a
                  href={discordLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
                >
                  <DiscordIcon className="h-4 w-4 shrink-0" />
                  <span>Entrar no Discord Oficial</span>
                </a>
              ) : (
                <a
                  href="#comunidade"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-indigo-800/60 bg-indigo-950/90 px-5 py-3 text-sm font-semibold text-slate-200 whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-indigo-900"
                >
                  <DiscordIcon className="h-4 w-4 shrink-0" />
                  <span>Ver link do Discord</span>
                </a>
              )}
            </div>
          </article>

          {/* 06. Aviso de Atualização Automática e Configurações */}
          <article className="flex flex-col justify-between rounded-2xl border border-indigo-950/90 bg-[#0C1224] p-6 sm:p-8 lg:col-span-5">
            <div>
              <div className="mb-3 flex items-center gap-2.5 text-violet-300">
                <RefreshCw className="h-5 w-5 shrink-0" />
                <span className="font-mono text-xs font-medium text-violet-300">
                  Atualização e Controle
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                06. Atualização Automática no App
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-300 sm:text-base">
                O DroidPort Store avisa automaticamente na tela inicial quando
                uma nova versão é lançada com o botão{' '}
                <strong className="font-semibold text-white">
                  Atualizar Agora
                </strong>
                . Nas <strong className="font-semibold text-white">Configurações</strong>,
                você também pode tocar em{' '}
                <strong className="font-semibold text-white">
                  Verificar agora
                </strong>{' '}
                para checar se seu app está atualizado ou desativar o aviso ao
                abrir o app se preferir não atualizar no momento.
              </p>
            </div>

            <div className="mt-6 border-t border-indigo-950/80 pt-4 text-xs leading-relaxed text-slate-400">
              Você escolhe se quer receber o aviso automático ao entrar ou
              verificar manualmente quando quiser.
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
