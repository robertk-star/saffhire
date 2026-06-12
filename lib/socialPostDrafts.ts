import { blogPosts } from '@/data/blogPosts';
import { getPublishedDbBlogPosts } from '@/lib/blogDrafts';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export type SocialPlatform = 'facebook' | 'instagram' | 'google_business' | 'linkedin';
export type SocialPostStatus = 'draft' | 'approved' | 'sent_to_publer' | 'scheduled' | 'failed' | 'rejected';

export type SocialPostDraft = {
  id: string;
  blog_slug: string;
  blog_title: string;
  blog_url: string;
  image_url: string | null;
  platform: SocialPlatform;
  post_text: string;
  hashtags: string;
  status: SocialPostStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
  approved_at: string | null;
  sent_at: string | null;
};

export type SocialBlogOption = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  url: string;
  image: string;
};

export const socialPlatforms: Array<{ value: SocialPlatform; label: string }> = [
  { value: 'facebook', label: 'Facebook' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'google_business', label: 'Google Business Profile' },
  { value: 'linkedin', label: 'LinkedIn' },
];

export function platformLabel(platform: string) {
  return socialPlatforms.find((item) => item.value === platform)?.label || platform;
}

export async function getPublishedBlogOptions() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.saffhire.com';
  const dbPosts = await getPublishedDbBlogPosts();
  const allPosts = [...dbPosts, ...blogPosts]
    .filter((post, index, array) => array.findIndex((item) => item.slug === post.slug) === index)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return allPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    date: post.date,
    url: `${siteUrl}/blog/${post.slug}`,
    image: post.image,
  })) as SocialBlogOption[];
}

export async function getSocialPostDrafts() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [] as SocialPostDraft[];

  const { data, error } = await supabase
    .from('social_post_drafts')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error || !data) return [] as SocialPostDraft[];
  return data as SocialPostDraft[];
}

export async function getSocialPostDraftById(id: string) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('social_post_drafts')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return null;
  return data as SocialPostDraft;
}

export async function getPublishedBlogOptionBySlug(slug: string) {
  const options = await getPublishedBlogOptions();
  return options.find((option) => option.slug === slug) || null;
}
