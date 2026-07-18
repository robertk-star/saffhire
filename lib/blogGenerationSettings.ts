import { getSupabaseAdmin } from './supabaseAdmin';

export type BlogGenerationSettings = {
  id: string;
  enabled: boolean;
  timezone: string;
  days_of_week: number[];
  hour_local: number;
  last_run_key: string | null;
  created_at: string;
  updated_at: string;
};

export const defaultBlogGenerationSettings: BlogGenerationSettings = {
  id: 'default',
  enabled: true,
  timezone: 'America/Chicago',
  days_of_week: [1, 4],
  hour_local: 9,
  last_run_key: null,
  created_at: new Date(0).toISOString(),
  updated_at: new Date(0).toISOString(),
};

export const dayOptions = [
  { value: 0, label: 'Sunday' },
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' },
];

export async function getBlogGenerationSettings() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return defaultBlogGenerationSettings;

  const { data, error } = await supabase
    .from('blog_generation_settings')
    .select('*')
    .eq('id', 'default')
    .single();

  if (error || !data) return defaultBlogGenerationSettings;
  return data as BlogGenerationSettings;
}

export function getScheduleParts(date: Date, timezone: string) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    hour12: false,
  }).formatToParts(date);

  const value = (type: string) => parts.find((part) => part.type === type)?.value || '';
  const weekdayLabel = value('weekday');
  const weekdayMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const dayOfWeek = weekdayMap[weekdayLabel] ?? 0;
  const hour = Number(value('hour'));
  const year = value('year');
  const month = value('month');
  const day = value('day');

  return {
    dayOfWeek,
    hour: Number.isNaN(hour) ? 0 : hour,
    runKey: `${year}-${month}-${day}-${Number.isNaN(hour) ? 0 : hour}`,
  };
}

export function shouldRunForSettings(settings: BlogGenerationSettings, now = new Date()) {
  if (!settings.enabled) return { shouldRun: false, reason: 'Blog generation is disabled.' };

  const parts = getScheduleParts(now, settings.timezone || 'America/Chicago');
  if (!settings.days_of_week.includes(parts.dayOfWeek)) {
    return { shouldRun: false, reason: 'Today is not a selected blog generation day.' };
  }

  if (parts.hour !== settings.hour_local) {
    return { shouldRun: false, reason: 'Current hour does not match the selected blog generation hour.' };
  }

  if (settings.last_run_key === parts.runKey) {
    return { shouldRun: false, reason: 'Blog generation already ran for this scheduled hour.' };
  }

  return { shouldRun: true, reason: 'Schedule matched.', runKey: parts.runKey };
}
