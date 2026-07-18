import { getSupabaseAdmin } from './supabaseAdmin';

export type BlogGenerationTopicRecord = {
  id: string;
  slug: string;
  topic: string;
  angle: string;
  category: string;
  keywords: string[];
  sort_order: number;
  active: boolean;
  created_at?: string;
  updated_at?: string;
};

const fallbackTopics: BlogGenerationTopicRecord[] = [];

export async function getBlogGenerationTopicRecords() {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return {
      topics: fallbackTopics,
      usingFallback: true,
      errorMessage: 'Supabase is not configured.',
    };
  }

  const { data, error } = await supabase
    .from('blog_generation_topics')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error || !data) {
    return {
      topics: fallbackTopics,
      usingFallback: true,
      errorMessage: error?.message || 'Could not load blog generation topics.',
    };
  }

  return {
    topics: data as BlogGenerationTopicRecord[],
    usingFallback: false,
    errorMessage: null,
  };
}


export async function getActiveBlogGenerationTopics() {
  const result = await getBlogGenerationTopicRecords();
  return result.topics
    .filter((topic) => topic.active)
    .sort((a, b) => a.sort_order - b.sort_order);
}
