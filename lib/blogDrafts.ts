import { getBlogImageForCategory } from '../data/blogCategoryImages';
import { getSupabaseAdmin } from './supabaseAdmin';

export type BlogStatus = 'draft' | 'pending_review' | 'changes_requested' | 'approved' | 'published' | 'rejected';

export type BlogDraft = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  image_url: string | null;
  read_time: string;
  status: BlogStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
  approved_at: string | null;
  published_at: string | null;
};

export type PublicBlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  image: string;
  readTime: string;
  date: string;
  publishedAt: string | null;
  source: 'database';
};

function getPublicBlogImage(post: BlogDraft) {
  return post.image_url || getBlogImageForCategory(post.category);
}

export function isBlogAdminConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.ADMIN_PASSWORD && process.env.ADMIN_SESSION_SECRET);
}

export async function getBlogDrafts() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [] as BlogDraft[];

  const { data, error } = await supabase
    .from('blog_drafts')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error || !data) return [] as BlogDraft[];
  return data as BlogDraft[];
}

export async function getBlogDraftById(id: string) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('blog_drafts')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return null;
  return data as BlogDraft;
}

export async function getPublishedDbBlogPosts() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [] as PublicBlogPost[];

  const { data, error } = await supabase
    .from('blog_drafts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error || !data) return [] as PublicBlogPost[];

  return (data as BlogDraft[]).map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    category: post.category,
    author: post.author,
    image: getPublicBlogImage(post),
    readTime: post.read_time,
    date: post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : new Date(post.updated_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    publishedAt: post.published_at,
    source: 'database' as const,
  }));
}

export async function getPublishedDbBlogPostBySlug(slug: string) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('blog_drafts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error || !data) return null;
  const post = data as BlogDraft;

  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    category: post.category,
    author: post.author,
    image: getPublicBlogImage(post),
    readTime: post.read_time,
    date: post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : new Date(post.updated_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    publishedAt: post.published_at,
    source: 'database' as const,
  };
}
