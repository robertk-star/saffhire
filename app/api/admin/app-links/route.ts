import { NextResponse } from 'next/server';
import { getAdminSession } from '../../../../lib/adminAuth';
import { createAppLink } from '../../../../lib/appLinks';

function redirectToApps(request: Request, params?: Record<string, string>) {
  const url = new URL('/apps', request.url);
  Object.entries(params || {}).forEach(([key, value]) => url.searchParams.set(key, value));
  return NextResponse.redirect(url, { status: 303 });
}

export async function POST(request: Request) {
  const isLoggedIn = await getAdminSession();
  if (!isLoggedIn) return redirectToApps(request, { error: 'Please log in before adding app links.' });

  try {
    const formData = await request.formData();
    await createAppLink({
      category: String(formData.get('category') || ''),
      name: String(formData.get('name') || ''),
      url: String(formData.get('url') || ''),
      description: String(formData.get('description') || ''),
      sort_order: Number(formData.get('sort_order') || 100),
    });
    return redirectToApps(request, { saved: '1' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Could not save link.';
    return redirectToApps(request, { error: message });
  }
}
