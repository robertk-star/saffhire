import { NextResponse } from 'next/server';
import { getAdminSessionDetails, hasAdminPermission } from '@/lib/adminAuth';
import { DraftsUnavailableError, getProposalDraft, updateProposalDraft } from '@/lib/proposalDrafts';

type RouteContext = { params: Promise<{ id: string }> };

function failure(error: unknown, fallback: string) {
  if (error instanceof DraftsUnavailableError) return NextResponse.json({ error: error.message, unavailable: true }, { status: 503 });
  return NextResponse.json({ error: error instanceof Error ? error.message : fallback }, { status: 400 });
}

export async function GET(_request: Request, context: RouteContext) {
  if (!(await hasAdminPermission('proposals'))) return NextResponse.json({ error: 'Not logged in' }, { status: 401 });
  try {
    const { id } = await context.params;
    return NextResponse.json({ draft: await getProposalDraft(id) });
  } catch (error) {
    return failure(error, 'Unable to load draft.');
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  if (!(await hasAdminPermission('proposals'))) return NextResponse.json({ error: 'Not logged in' }, { status: 401 });
  try {
    const { id } = await context.params;
    const session = await getAdminSessionDetails();
    const body = await request.json();
    const draft = await updateProposalDraft(id, { name: body.name, clientName: body.clientName, data: body.data, user: session?.username || session?.role || null });
    return NextResponse.json({ draft });
  } catch (error) {
    return failure(error, 'Unable to update draft.');
  }
}
