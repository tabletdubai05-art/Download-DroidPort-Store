import { useCallback, useEffect, useState } from 'react';
import {
  type AppConfig,
  fetchLatestConfig,
  fetchLatestDiscord,
} from '../lib/supabase';

export interface DroidPortStoreState {
  config: AppConfig | null;
  discordLink: string | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function formatVersionLabel(rawVersion: string): string {
  const trimmed = rawVersion.trim();
  if (!trimmed) return '';
  if (/^vers[aã]o\s+/i.test(trimmed)) {
    return trimmed;
  }
  return `Versão ${trimmed.replace(/^v(?=\d)/i, '')}`;
}

export function useDroidPortData(): DroidPortStoreState {
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [discordLink, setDiscordLink] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [configResult, discordResult] = await Promise.allSettled([
        fetchLatestConfig(),
        fetchLatestDiscord(),
      ]);

      let hasError = false;

      if (configResult.status === 'fulfilled' && configResult.value) {
        setConfig(configResult.value);
      } else if (configResult.status === 'rejected') {
        hasError = true;
      }

      if (discordResult.status === 'fulfilled' && discordResult.value?.link) {
        setDiscordLink(discordResult.value.link);
      } else if (discordResult.status === 'rejected') {
        hasError = true;
      }

      if (
        hasError &&
        configResult.status === 'rejected' &&
        discordResult.status === 'rejected'
      ) {
        setError('Não foi possível conectar ao servidor da loja no momento.');
      }
    } catch {
      setError('Erro ao carregar informações da DroidPort Store.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  return {
    config,
    discordLink,
    isLoading,
    error,
    refetch: loadData,
  };
}
