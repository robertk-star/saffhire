import { blogGenerationTopics, type BlogGenerationTopic } from '@/data/blogGenerationTopics';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export type BlogGenerationTopicRecord = BlogGenerationTopic & {
  id: string;
  slug: string;
  sort_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export type BlogGenerationTopicListResult = {
  topics: BlogGenerationTopicRecord[];
  usingFallback: boolean;
  errorMessage: string | null;
};

function fallbackTopicRecords(): BlogGenerationTopicRecord[] {
  return blogGenerationTopics.map((topic, index) => ({
    ...topic,
    id: `fallback-${index}`,
    slug: topic.topic.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
    sort_order: (index + 1) * 10,
    active: true,
    created_at: new Date(0).toISOString(),
    updated_at: new Date(0).toISOString(),
  }));
}

function normalizeTopicRecord(row: Record<string, unknown>): BlogGenerationTopicRecord {
  const keywords = Array.isArray(row.keywords) ? row.keywords.map((keyword) => String(keyword)) : [];

  return {
    id: String(row.id || ''),
    slug: String(row.slug || ''),
    topic: String(row.topic || ''),
    angle: String(row.angle || ''),
    category: String(row.category || ''),
    keywords,
    sort_order: Number(row.sort_order || 0),
    active: Boolean(row.active),
    created_at: String(row.created_at || new Date(0).toISOString()),
    updated_at: String(row.updated_at || new Date(0).toISOString()),
  };
}

export async function getBlogGenerationTopicRecords(): Promise<BlogGenerationTopicListResult> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return {
      topics: fallbackTopicRecords(),
      usingFallback: true,
      errorMessage: 'Database is not configured. Showing built-in fallback topics.',
    };
  }

  const { data, error } = await supabase
    .from('blog_generation_topics')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });

  if (error) {
    return {
      topics: fallbackTopicRecords(),
      usingFallback: true,
      errorMessage: error.message,
    };
  }

  const topics = (data || []).map((row) => normalizeTopicRecord(row as Record<string, unknown>));

  return {
    topics: topics.length ? topics : fallbackTopicRecords(),
    usingFallback: topics.length === 0,
    errorMessage: topics.length === 0 ? 'No admin-managed topics found. Showing built-in fallback topics.' : null,
  };
}

export async function getActiveBlogGenerationTopics(): Promise<BlogGenerationTopic[]> {
  const result = await getBlogGenerationTopicRecords();
  const activeTopics = result.topics
    .filter((topic) => topic.active)
    .map((topic) => ({
      topic: topic.topic,
      angle: topic.angle,
      category: topic.category,
      keywords: topic.keywords,
    }));

  return activeTopics.length ? activeTopics : blogGenerationTopics;
}
