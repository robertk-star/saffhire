import { NextResponse } from 'next/server';
import { hasDriverPipelineSession } from '@/lib/driverPipelinePortal';
import { getAuthorization } from '@/lib/driverPipelineAuthorization';
import { buildAuthorizationPdf } from '@/lib/driverPipelinePdf';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await hasDriverPipelineSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await context.params;
  const row = await getAuthorization(id);
  if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const lang = new URL(request.url).searchParams.get('lang') === 'es' ? 'es' : 'en';
  if (lang === 'es' && row.locale !== 'es') return NextResponse.json({ error: 'Spanish copy is only available for Spanish submissions.' }, { status: 404 });
  const pdf = buildAuthorizationPdf(row, lang);
  return new NextResponse(pdf.bytes, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${pdf.filename}"`,
      'Cache-Control': 'no-store',
    },
  });
}
