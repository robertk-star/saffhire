import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/adminAuth';
import { generateAndStoreSocialImage } from '@/lib/blogImageGenerator';
import { platformLabel } from '@/lib/socialPostDrafts';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export const dynamic = 'force-dynamic';

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const isLoggedIn = await getAdminSession();
  if (!isLoggedIn) return NextResponse.json({ error: 'Not logged in' }, { status: 401 });

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: 'Database is not configured.' }, { status: 503 });

  const { id } = await params;
  const { data: draft, error: draftError } = await supabase
    .from('social_post_drafts')
    .select('id, blog_slug, blog_title, platform, post_text, hashtags, notes')
    .eq('id', id)
    .single();

  if (draftError || !draft) {
    return NextResponse.json({ error: draftError?.message || 'Social draft not found.' }, { status: 404 });
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
      `AI social image regenerated. Storage path: ${generatedImage.storagePath}`,
      `Image model used: ${generatedImage.model || 'unknown'} ${generatedImage.size || ''}`.trim(),
    ].filter(Boolean).join('\n\n');

    const baseUpdate = await supabase
      .from('social_post_drafts')
      .update({ image_url: generatedImage.imageUrl, notes })
      .eq('id', id);

    if (baseUpdate.error) throw baseUpdate.error;

    await supabase
      .from('social_post_drafts')
      .update({
        image_source: 'ai_generated',
        image_generation_error: null,
        image_generated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .then(() => null);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Could not generate social image.';
    const notes = [
      draft.notes || '',
      `AI social image regeneration failed. Existing image was kept. Error: ${message}`,
    ].filter(Boolean).join('\n\n');

    await supabase
      .from('social_post_drafts')
      .update({ notes })
      .eq('id', id);

    await supabase
      .from('social_post_drafts')
      .update({ image_generation_error: message })
      .eq('id', id)
      .then(() => null);
  }

  return NextResponse.redirect(new URL(`/admin/social/${id}`, request.url), { status: 303 });
}
