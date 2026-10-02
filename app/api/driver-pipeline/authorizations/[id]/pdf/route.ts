import { NextResponse } from 'next/server';
import { getDriverPipelineSession } from '@/lib/driverPipelinePortal';
import { getAuthorization } from '@/lib/driverPipelineAuthorization';
import { buildAuthorizationPdf } from '@/lib/driverPipelinePdf';
import { logPortalAccess } from '@/lib/driverPipelineUsers';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await getDriverPipelineSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await context.params;
  const row = await getAuthorization(id);
  if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const lang = new URL(request.url).searchParams.get('lang') === 'es' ? 'es' : 'en';
  if (lang === 'es' && row.locale !== 'es') return NextResponse.json({ error: 'Spanish copy is only available for Spanish submissions.' }, { status: 404 });
  await logPortalAccess(session, {
    action: lang === 'es' ? 'downloaded_spanish_pdf' : 'downloaded_english_pdf',
    authorizationId: id,
    ipAddress: (request.headers.get('x-forwarded-for') || '').split(',')[0]?.trim() || null,
    userAgent: request.headers.get('user-agent'),
  });
  const pdf = buildAuthorizationPdf(row, lang);
  return new NextResponse(pdf.bytes, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${pdf.filename}"`,
      'Cache-Control': 'no-store',
    },
  });
}
