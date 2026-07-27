import { NextResponse } from 'next/server';
import { hasAdminPermission } from '@/lib/adminAuth';
import {
  deleteProposalPricingPage,
  updateProposalPricingPage,
} from '@/lib/proposalPricingPages';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  const canView = await hasAdminPermission('proposals');
  if (!canView) return NextResponse.json({ error: 'Not logged in' }, { status: 401 });

  try {
    const { id } = await context.params;
    const body = await request.json();
    const page = await updateProposalPricingPage(id, {
      name: body.name !== undefined ? String(body.name) : undefined,
      description: body.description !== undefined ? String(body.description) : undefined,
      minimum_package: Array.isArray(body.minimum_package) ? body.minimum_package : undefined,
      individual_pricing: Array.isArray(body.individual_pricing) ? body.individual_pricing : undefined,
      sort_order: body.sort_order !== undefined ? Number(body.sort_order) : undefined,
    });
    return NextResponse.json({ page });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to update pricing page.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const canView = await hasAdminPermission('proposals');
  if (!canView) return NextResponse.json({ error: 'Not logged in' }, { status: 401 });

  try {
    const { id } = await context.params;
    await deleteProposalPricingPage(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to delete pricing page.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
