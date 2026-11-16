import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = 'https://mfwzkzywxvbbonsshjgh.supabase.co';
export const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1md3prenl3eHZiYm9uc3NoamdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ1MjIyMTgsImV4cCI6MjExMDA5ODIxOH0.GC7FJFhSVjKaKJsackBMjLXIf4eLUnY8H2J3kDBbi6M';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface AppConfig {
  id?: number;
  versao_atual: string;
  link_apk: string;
}

export interface DiscordInfo {
  id?: number;
  link: string;
}

export async function fetchLatestConfig(): Promise<AppConfig | null> {
  const normalize = (row: AppConfig | null): AppConfig | null => {
    if (!row) return null;
    return {
      ...row,
      versao_atual: String(row.versao_atual ?? '').trim(),
      link_apk: String(row.link_apk ?? '').trim(),
    };
  };

  // First attempt: fetch the most recent record ordered by id descending
  const latestById = await supabase
    .from('config')
    .select('id, versao_atual, link_apk')
    .order('id', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!latestById.error && latestById.data) {
    return normalize(latestById.data as AppConfig);
  }

  // Fallback: explicitly look up id = 1
  const byIdOne = await supabase
    .from('config')
    .select('id, versao_atual, link_apk')
    .eq('id', 1)
    .maybeSingle();

  if (!byIdOne.error && byIdOne.data) {
    return normalize(byIdOne.data as AppConfig);
  }

  // Final fallback: select single row without explicit id ordering
  const anyRow = await supabase
    .from('config')
    .select('*')
    .limit(1)
    .maybeSingle();

  if (anyRow.error) {
    throw anyRow.error;
  }

  return normalize((anyRow.data as AppConfig | null) ?? null);
}

export async function fetchLatestDiscord(): Promise<DiscordInfo | null> {
  const normalize = (row: DiscordInfo | null): DiscordInfo | null => {
    if (!row) return null;
    return {
      ...row,
      link: String(row.link ?? '').trim(),
    };
  };

  // First attempt: order by id descending to get the latest record
  const latestById = await supabase
    .from('discord')
    .select('*')
    .order('id', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!latestById.error && latestById.data) {
    return normalize(latestById.data as DiscordInfo);
  }

  // Fallback: order by created_at descending if table uses created_at
  const latestByCreatedAt = await supabase
    .from('discord')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!latestByCreatedAt.error && latestByCreatedAt.data) {
    return normalize(latestByCreatedAt.data as DiscordInfo);
  }

  // Final fallback: select first available row
  const anyRow = await supabase
    .from('discord')
    .select('*')
    .limit(1)
    .maybeSingle();

  if (anyRow.error) {
    throw anyRow.error;
  }

  return normalize((anyRow.data as DiscordInfo | null) ?? null);
}
