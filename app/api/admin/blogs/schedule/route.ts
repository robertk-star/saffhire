import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/adminAuth';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(request: Request) {
  const isLoggedIn = await getAdminSession();
  if (!isLoggedIn) return NextResponse.json({ error: 'Not logged in' }, { status: 401 });

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: 'Database is not configured.' }, { status: 503 });

  const formData = await request.formData();
  const enabled = formData.get('enabled') === 'true';
  const timezone = String(formData.get('timezone') || 'America/Chicago');
  const hour = Number(formData.get('hour_local') || 9);
  const selectedDays = formData.getAll('days_of_week')
    .map((value) => Number(value))
    .filter((value) => Number.isInteger(value) && value >= 0 && value <= 6);

  const { error } = await supabase
    .from('blog_generation_settings')
    .upsert({
      id: 'default',
      enabled,
      timezone,
      days_of_week: selectedDays.length ? selectedDays : [1, 4],
      hour_local: Number.isInteger(hour) && hour >= 0 && hour <= 23 ? hour : 9,
    }, { onConflict: 'id' });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.redirect(new URL('/admin/blogs/schedule', request.url), { status: 303 });
}
