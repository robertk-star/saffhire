import type { SocialPostDraft } from '@/lib/socialPostDrafts';
import { platformLabel } from '@/lib/socialPostDrafts';
import type { SocialPostingSettings } from '@/lib/socialPostingSettings';
import { publerAccountIdForPlatform } from '@/lib/socialPostingSettings';

const PUBLER_BASE_URL = 'https://app.publer.com/api/v1';

function buildScheduledAt(delayMinutes: number) {
  return new Date(Date.now() + Math.max(0, delayMinutes) * 60 * 1000).toISOString();
}

function normalizeEndpoint(endpoint: string | null | undefined) {
  const value = (endpoint || '').trim();
  if (!value) return `${PUBLER_BASE_URL}/posts/schedule`;
  if (value.startsWith('http://') || value.startsWith('https://')) return value;
  return `${PUBLER_BASE_URL}${value.startsWith('/') ? value : `/${value}`}`;
}

function networkKey(platform: string) {
  if (platform === 'google_business') return 'google';
  return platform;
}

function buildPostText(draft: SocialPostDraft) {
  return [draft.post_text, draft.hashtags].filter(Boolean).join('\n\n').trim();
}

export function buildPublerPayload(input: { draft: SocialPostDraft; settings: SocialPostingSettings }) {
  const accountId = publerAccountIdForPlatform(input.settings, input.draft.platform);
  const text = buildPostText(input.draft);
  const scheduledAt = buildScheduledAt(input.settings.default_schedule_delay_minutes);
  const key = networkKey(input.draft.platform);

  return {
    bulk: {
      state: 'scheduled',
      posts: [
        {
          networks: {
            [key]: {
              type: 'link',
              text,
              url: input.draft.blog_url,
            },
          },
          accounts: [
            {
              id: accountId,
              scheduled_at: scheduledAt,
              previewed_media: true,
            },
          ],
        },
      ],
    },
  };
}

export async function sendDraftToPubler(input: { draft: SocialPostDraft; settings: SocialPostingSettings }) {
  if (!input.settings.publer_api_token) throw new Error('Publer API token is missing in Social Posting Settings.');

  const endpoint = normalizeEndpoint(input.settings.publer_api_endpoint);
  const workspaceId = input.settings.publer_workspace_id;
  if (!workspaceId) throw new Error('Publer Workspace ID is missing in Social Posting Settings.');

  const accountId = publerAccountIdForPlatform(input.settings, input.draft.platform);
  if (!accountId) throw new Error(`Publer account ID is missing for ${platformLabel(input.draft.platform)}.`);

  const payload = buildPublerPayload(input);
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer-API ${input.settings.publer_api_token}`,
      'Publer-Workspace-Id': workspaceId,
      'Content-Type': 'application/json',
      Accept: '*/*',
    },
    body: JSON.stringify(payload),
  });

  const raw = await response.text();
  let parsed: unknown = raw;
  try {
    parsed = raw ? JSON.parse(raw) : null;
  } catch {
    parsed = raw;
  }

  if (!response.ok) {
    throw new Error(`Publer request failed with status ${response.status}: ${raw || response.statusText}`);
  }

  return {
    status: response.status,
    response: parsed,
    payload,
    endpoint,
  };
}

export function getPublerPostId(response: unknown) {
  if (!response || typeof response !== 'object') return null;
  const data = response as Record<string, unknown>;
  const direct = data.id || data.post_id || data.publer_post_id || data.job_id;
  if (typeof direct === 'string' || typeof direct === 'number') return String(direct);

  const nested = data.data;
  if (nested && typeof nested === 'object') {
    const nestedData = nested as Record<string, unknown>;
    const nestedId = nestedData.id || nestedData.post_id || nestedData.publer_post_id || nestedData.job_id;
    if (typeof nestedId === 'string' || typeof nestedId === 'number') return String(nestedId);
  }

  return null;
}
