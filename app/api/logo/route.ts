import { NextResponse } from 'next/server';

const LOGO_URL =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663368468239/Ge2emXXoKVgq4kYU9oXE74/saffhire-logo_fe0fac3a.png';

export async function GET() {
  try {
    const response = await fetch(LOGO_URL, {
      // Cache at the edge / server so PDF generation stays fast
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      return new NextResponse('Logo not found', { status: 404 });
    }

    const buffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/png';

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
      },
    });
  } catch (error) {
    console.error('Unable to proxy SaffHire logo', error);
    return new NextResponse('Unable to load logo', { status: 502 });
  }
}
