import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/adminAuth';
import { getSafeSocialPostingSettings } from '@/lib/socialPostingSettings';

export const metadata: Metadata = {
  title: 'Social Posting Settings',
  robots: { index: false, follow: false },
};

export default async function SocialPostingSettingsPage() {
  const isLoggedIn = await getAdminSession();
  if (!isLoggedIn) redirect('/admin/login');

  const settings = await getSafeSocialPostingSettings();

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <a href="/admin/social" className="text-sm font-bold text-green-700 hover:underline">Back to Social Posts</a>

        <div className="mt-4 mb-8">
          <p className="text-sm font-bold uppercase tracking-wider text-green-600 mb-2">SaffHire Admin</p>
          <h1 className="text-4xl font-black text-slate-900">Social Posting Settings</h1>
          <p className="text-gray-600 mt-2">Prepare the Publer connection for approved social post drafts.</p>
        </div>

        <form action="/api/admin/social/settings" method="post" className="space-y-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 text-sm text-blue-900">
            Phase 16B-1 only saves settings. It does not send anything to Publer yet.
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Provider</label>
              <input value="Publer" readOnly className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Publer Workspace ID</label>
              <input name="publer_workspace_id" defaultValue={settings.publer_workspace_id || ''} className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Publer API Token</label>
            <input name="publer_api_token" type="password" placeholder={settings.has_publer_api_token ? 'Token saved. Leave blank to keep current token.' : 'Paste Publer API token here'} className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm" />
            <p className="text-xs text-gray-500 mt-2">
              {settings.has_publer_api_token ? 'A token is saved. For safety, it is not displayed here.' : 'No Publer token is saved yet.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Default Schedule Delay</label>
              <input name="default_schedule_delay_minutes" type="number" min="0" defaultValue={settings.default_schedule_delay_minutes} className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm" />
              <p className="text-xs text-gray-500 mt-2">Minutes after sending to Publer.</p>
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
              <label className="block text-sm font-bold text-gray-700 mb-2">Approval Rule</label>
              <label className="flex items-center gap-3 rounded-md border border-gray-300 px-4 py-3 text-sm">
                <input type="checkbox" name="require_approval" value="true" defaultChecked={settings.require_approval} />
                Require approval
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Default Hashtags</label>
            <textarea name="default_hashtags" rows={3} defaultValue={settings.default_hashtags || ''} className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm" />
            <p className="text-xs text-gray-500 mt-2">These can be added to posts in the Publer phase.</p>
          </div>

          <div>
            <p className="block text-sm font-bold text-gray-700 mb-3">Active Platforms</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 text-sm">
                <input type="checkbox" name="facebook_enabled" value="true" defaultChecked={settings.facebook_enabled} />
                Facebook
              </label>
              <label className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 text-sm">
                <input type="checkbox" name="instagram_enabled" value="true" defaultChecked={settings.instagram_enabled} />
                Instagram
              </label>
              <label className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 text-sm">
                <input type="checkbox" name="google_business_enabled" value="true" defaultChecked={settings.google_business_enabled} />
                Google Business Profile
              </label>
              <label className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 text-sm">
                <input type="checkbox" name="linkedin_enabled" value="true" defaultChecked={settings.linkedin_enabled} />
                LinkedIn
              </label>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-700">
            <p><strong>Token saved:</strong> {settings.has_publer_api_token ? 'Yes' : 'No'}</p>
            <p><strong>Last updated:</strong> {settings.updated_at ? new Date(settings.updated_at).toLocaleString() : 'Not saved yet'}</p>
          </div>

          <button className="rounded-md bg-green-500 px-5 py-3 text-sm font-bold text-white hover:bg-green-600">
            Save Social Posting Settings
          </button>
        </form>
      </div>
    </main>
  );
}
