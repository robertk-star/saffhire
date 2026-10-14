import { NextResponse } from 'next/server';
import { getAdminSessionDetails, hasAdminPermission } from '@/lib/adminAuth';
import { createProposalDraft, DraftsUnavailableError, listProposalDrafts } from '@/lib/proposalDrafts';

function failure(error: unknown, fallback: string) {
  if (error instanceof DraftsUnavailableError) return NextResponse.json({ error: error.message, unavailable: true }, { status: 503 });
  return NextResponse.json({ error: error instanceof Error ? error.message : fallback }, { status: 400 });
}

export async function GET() {
  if (!(await hasAdminPermission('proposals'))) return NextResponse.json({ error: 'Not logged in' }, { status: 401 });
  try {
    return NextResponse.json({ drafts: await listProposalDrafts() });
  } catch (error) {
    return failure(error, 'Unable to load drafts.');
  }
}

export async function POST(request: Request) {
  if (!(await hasAdminPermission('proposals'))) return NextResponse.json({ error: 'Not logged in' }, { status: 401 });
  try {
    const session = await getAdminSessionDetails();
    const body = await request.json();
    const draft = await createProposalDraft({ name: body.name, clientName: body.clientName, data: body.data, user: session?.username || session?.role || null });
    return NextResponse.json({ draft });
  } catch (error) {
    return failure(error, 'Unable to save draft.');
  }
}
