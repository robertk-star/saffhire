import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/adminAuth';
import { generateAndStoreSocialImage } from '@/lib/blogImageGenerator';
import { platformLabel } from '@/lib/socialPostDrafts';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const isLoggedIn = await getAdminSession();
  if (!isLoggedIn) return NextResponse.json({ error: 'Not logged in' }, { status: 401 });

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: 'Database is not configured.' }, { status: 503 });

  const { data: draft, error: draftError } = await supabase
    .from('social_post_drafts')
    .select('id, blog_slug, blog_title, platform, post_text, hashtags, notes')
    .eq('status', 'draft')
    .order('updated_at', { ascending: false })
    .limit(1)
    .single();

  if (draftError || !draft) {
    return NextResponse.redirect(new URL('/admin/social', request.url), { status: 303 });
  }

  try {
    const generatedImage = await generateAndStoreSocialImage({
      platform: platformLabel(draft.platform),
      blogTitle: draft.blog_title,
      postText: draft.post_text,
      hashtags: draft.hashtags,
      slug: `${draft.blog_slug}-${draft.platform}`,
    });

    const notes = [
      draft.notes || '',
      `AI social image generated. Storage path: ${generatedImage.storagePath}`,
    ].filter(Boolean).join('\n\n');

    await supabase
      .from('social_post_drafts')
      .update({ image_url: generatedImage.imageUrl, notes })
      .eq('id', draft.id);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Could not generate social image.';
    const notes = [
      draft.notes || '',
      `AI social image generation failed. Existing image was kept. Error: ${message}`,
    ].filter(Boolean).join('\n\n');

    await supabase
      .from('social_post_drafts')
      .update({ notes })
      .eq('id', draft.id);
  }

  return NextResponse.redirect(new URL('/admin/social', request.url), { status: 303 });
}
