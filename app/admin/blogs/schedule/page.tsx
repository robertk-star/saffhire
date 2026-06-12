import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/adminAuth';
import { dayOptions, getBlogGenerationSettings } from '@/lib/blogGenerationSettings';

export const metadata: Metadata = {
  title: 'Blog Generation Schedule',
  robots: { index: false, follow: false },
};

function hourLabel(hour: number) {
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const display = hour % 12 === 0 ? 12 : hour % 12;
  return `${display}:00 ${suffix}`;
}

export default async function BlogSchedulePage() {
  const isLoggedIn = await getAdminSession();
  if (!isLoggedIn) redirect('/admin/login');

  const settings = await getBlogGenerationSettings();

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <a href="/admin/blogs" className="text-sm font-bold text-green-700 hover:underline">Back to drafts</a>
        <div className="mt-4 mb-8">
          <p className="text-sm font-bold uppercase tracking-wider text-green-600 mb-2">SaffHire Admin</p>
          <h1 className="text-4xl font-black text-slate-900">Blog Generation Schedule</h1>
          <p className="text-gray-600 mt-2">Control when AI creates blog drafts for review.</p>
        </div>

        <form action="/api/admin/blogs/schedule" method="post" className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-8">
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 text-sm text-blue-900">
            Vercel checks once every hour. These settings decide whether that hourly check should create a blog draft.
          </div>

          <div>
            <label className="flex items-center gap-3 text-sm font-bold text-gray-800">
              <input type="checkbox" name="enabled" value="true" defaultChecked={settings.enabled} className="h-5 w-5" />
              Turn scheduled blog generation on
            </label>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Time Zone</label>
            <select name="timezone" defaultValue={settings.timezone || 'America/Chicago'} className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm">
              <option value="America/Chicago">Central Time</option>
              <option value="America/New_York">Eastern Time</option>
              <option value="America/Denver">Mountain Time</option>
              <option value="America/Los_Angeles">Pacific Time</option>
              <option value="UTC">UTC</option>
            </select>
          </div>

          <div>
            <p className="block text-sm font-bold text-gray-700 mb-3">Days of the Week</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {dayOptions.map((day) => (
                <label key={day.value} className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 text-sm">
                  <input type="checkbox" name="days_of_week" value={day.value} defaultChecked={settings.days_of_week.includes(day.value)} className="h-4 w-4" />
                  {day.label}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Hour of the Day</label>
            <select name="hour_local" defaultValue={settings.hour_local} className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm">
              {Array.from({ length: 24 }).map((_, hour) => (
                <option key={hour} value={hour}>{hourLabel(hour)}</option>
              ))}
            </select>
          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-700">
            <p><strong>Current setting:</strong> {settings.enabled ? 'On' : 'Off'}</p>
            <p><strong>Time zone:</strong> {settings.timezone}</p>
            <p><strong>Hour:</strong> {hourLabel(settings.hour_local)}</p>
          </div>

          <button className="rounded-md bg-green-500 px-5 py-3 text-sm font-bold text-white hover:bg-green-600">
            Save Schedule Settings
          </button>
        </form>
      </div>
    </main>
  );
}
