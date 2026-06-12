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
    ].filter(Boolean).join('\n\n');

    const { error: updateError } = await supabase
      .from('social_post_drafts')
      .update({ image_url: generatedImage.imageUrl, notes })
      .eq('id', id);

    if (updateError) throw updateError;

    return NextResponse.redirect(new URL(`/admin/social/${id}`, request.url), { status: 303 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Could not generate social image.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
