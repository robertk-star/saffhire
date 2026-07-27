import { NextResponse } from 'next/server';
import { hasAdminPermission } from '@/lib/adminAuth';
import {
  createProposalPricingPage,
  getProposalPricingPages,
} from '@/lib/proposalPricingPages';

export async function GET() {
  const canView = await hasAdminPermission('proposals');
  if (!canView) return NextResponse.json({ error: 'Not logged in' }, { status: 401 });

  const pages = await getProposalPricingPages();
  return NextResponse.json({ pages });
}

export async function POST(request: Request) {
  const canView = await hasAdminPermission('proposals');
  if (!canView) return NextResponse.json({ error: 'Not logged in' }, { status: 401 });

  try {
    const body = await request.json();
    const page = await createProposalPricingPage({
      name: String(body.name || ''),
      description: String(body.description || ''),
      minimum_package: Array.isArray(body.minimum_package) ? body.minimum_package : [],
      individual_pricing: Array.isArray(body.individual_pricing) ? body.individual_pricing : [],
      sort_order: body.sort_order !== undefined ? Number(body.sort_order) : undefined,
    });
    return NextResponse.json({ page });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to create pricing page.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
