import { getSupabaseAdmin } from './supabaseAdmin';

export type AppLinkCategory = 'SaffHire' | 'Ardykay';

export type AppLink = {
  id: string;
  category: AppLinkCategory;
  name: string;
  description: string | null;
  url: string;
  sort_order: number;
  created_at?: string;
};

export const appLinkCategories: AppLinkCategory[] = ['SaffHire', 'Ardykay'];

const defaultAppLinks: AppLink[] = [
  {
    id: 'default-monitoring-app',
    category: 'SaffHire',
    name: 'Monitoring App',
    description: 'SaffHire monitoring dashboard and safety performance tools.',
    url: 'https://monitoring-beta-one.vercel.app/',
    sort_order: 10,
  },
];

export function isValidAppLinkCategory(value: string): value is AppLinkCategory {
  return appLinkCategories.includes(value as AppLinkCategory);
}

function cleanUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return '';
  try {
    const parsed = new URL(trimmed);
    if (!['http:', 'https:'].includes(parsed.protocol)) return '';
    return parsed.toString();
  } catch {
    return '';
  }
}

export async function getAppLinks() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return { links: defaultAppLinks, usingFallback: true, errorMessage: 'Supabase is not configured.' };

  const { data, error } = await supabase
    .from('app_links')
    .select('id, category, name, description, url, sort_order, created_at')
    .order('category', { ascending: true })
    .order('sort_order', { ascending: true })
    .order('name', { ascending: true });

  if (error || !data) {
    return {
      links: defaultAppLinks,
      usingFallback: true,
      errorMessage: error?.message || 'Could not load app links.',
    };
  }

  return { links: data as AppLink[], usingFallback: false, errorMessage: null };
}

export async function createAppLink(input: {
  category: string;
  name: string;
  description?: string;
  url: string;
  sort_order?: number;
}) {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error('Supabase is not configured.');

  const category = input.category.trim();
  if (!isValidAppLinkCategory(category)) throw new Error('Invalid category.');

  const name = input.name.trim();
  if (!name) throw new Error('Name is required.');

  const url = cleanUrl(input.url);
  if (!url) throw new Error('A valid http or https URL is required.');

  const sortOrder = Number.isFinite(input.sort_order) ? Number(input.sort_order) : 100;

  const { error } = await supabase.from('app_links').insert({
    category,
    name,
    description: input.description?.trim() || null,
    url,
    sort_order: sortOrder,
  });

  if (error) throw error;
}

export async function deleteAppLink(id: string) {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error('Supabase is not configured.');
  if (!id) throw new Error('Missing link ID.');

  const { error } = await supabase.from('app_links').delete().eq('id', id);
  if (error) throw error;
}
