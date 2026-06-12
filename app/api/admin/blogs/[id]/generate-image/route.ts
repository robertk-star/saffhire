import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/adminAuth';
import { generateAndStoreBlogImage } from '@/lib/blogImageGenerator';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export const dynamic = 'force-dynamic';

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const isLoggedIn = await getAdminSession();
  if (!isLoggedIn) return NextResponse.json({ error: 'Not logged in' }, { status: 401 });

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: 'Database is not configured.' }, { status: 503 });

  const { id } = await params;
  const { data: draft, error: draftError } = await supabase
    .from('blog_drafts')
    .select('id, title, slug, excerpt, category, notes')
    .eq('id', id)
    .single();

  if (draftError || !draft) {
    return NextResponse.json({ error: draftError?.message || 'Draft not found.' }, { status: 404 });
  }

  try {
    const generated = await generateAndStoreBlogImage({
      title: draft.title,
      slug: draft.slug,
      excerpt: draft.excerpt,
      category: draft.category,
    });

    const notes = [
      draft.notes || '',
      `AI image generated and attached. Storage path: ${generated.storagePath}`,
    ].filter(Boolean).join('\n\n');

    const { error: updateError } = await supabase
      .from('blog_drafts')
      .update({ image_url: generated.imageUrl, notes })
      .eq('id', id);

    if (updateError) throw updateError;

    return NextResponse.redirect(new URL(`/admin/blogs/${id}`, request.url), { status: 303 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Could not generate blog image.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
