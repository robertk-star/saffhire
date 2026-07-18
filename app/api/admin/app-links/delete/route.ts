import { NextResponse } from 'next/server';
import { getAdminSession } from '../../../../../lib/adminAuth';
import { deleteAppLink } from '../../../../../lib/appLinks';

function redirectToApps(request: Request, params?: Record<string, string>) {
  const url = new URL('/apps', request.url);
  Object.entries(params || {}).forEach(([key, value]) => url.searchParams.set(key, value));
  return NextResponse.redirect(url, { status: 303 });
}

export async function POST(request: Request) {
  const isLoggedIn = await getAdminSession();
  if (!isLoggedIn) return redirectToApps(request, { error: 'Please log in before deleting app links.' });

  try {
    const formData = await request.formData();
    await deleteAppLink(String(formData.get('id') || ''));
    return redirectToApps(request, { deleted: '1' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Could not delete link.';
    return redirectToApps(request, { error: message });
  }
}
