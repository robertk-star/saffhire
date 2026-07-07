import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/adminAuth';
import { getPricingItems } from '@/lib/pricingItems';

export async function GET() {
  const isLoggedIn = await getAdminSession();
  if (!isLoggedIn) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const items = await getPricingItems();
  return NextResponse.json({ items });
}
