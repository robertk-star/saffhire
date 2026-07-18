import { NextResponse } from 'next/server';
import { getAdminSession } from '../../../../../lib/adminAuth';
import { updateAppLink } from '../../../../../lib/appLinks';

function redirectToManage(request: Request, params: Record<string, string>) {
  const url = new URL('/apps/add', request.url);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  return NextResponse.redirect(url, { status: 303 });
}

export async function POST(request: Request) {
  const isAdmin = await getAdminSession();
  if (!isAdmin) return redirectToManage(request, { error: 'Admin login required.' });

  try {
    const formData = await request.formData();
    await updateAppLink({
      id: String(formData.get('id') || ''),
      category: String(formData.get('category') || ''),
      name: String(formData.get('name') || ''),
      description: String(formData.get('description') || ''),
      url: String(formData.get('url') || ''),
      sort_order: Number(formData.get('sort_order') || 100),
    });
    return redirectToManage(request, { updated: '1' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Could not update link.';
    return redirectToManage(request, { error: message });
  }
}
