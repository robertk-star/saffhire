import type { SocialPostDraft } from '@/lib/socialPostDrafts';
import { platformLabel } from '@/lib/socialPostDrafts';
import type { SocialPostingSettings } from '@/lib/socialPostingSettings';
import { publerAccountIdForPlatform } from '@/lib/socialPostingSettings';

function buildScheduledAt(delayMinutes: number) {
  return new Date(Date.now() + Math.max(0, delayMinutes) * 60 * 1000).toISOString();
}

export function buildPublerPayload(input: { draft: SocialPostDraft; settings: SocialPostingSettings }) {
  const accountId = publerAccountIdForPlatform(input.settings, input.draft.platform);
  const text = [input.draft.post_text, input.draft.hashtags].filter(Boolean).join('\n\n').trim();

  return {
    workspace_id: input.settings.publer_workspace_id,
    account_id: accountId,
    platform: input.draft.platform,
    platform_label: platformLabel(input.draft.platform),
    text,
    media: input.draft.image_url ? [{ type: 'image', url: input.draft.image_url }] : [],
    link: input.draft.blog_url,
    schedule: {
      timezone: input.settings.timezone,
      scheduled_at: buildScheduledAt(input.settings.default_schedule_delay_minutes),
      delay_minutes: input.settings.default_schedule_delay_minutes,
    },
    metadata: {
      source: 'saffhire_admin',
      blog_slug: input.draft.blog_slug,
      blog_title: input.draft.blog_title,
      social_draft_id: input.draft.id,
    },
  };
}

export async function sendDraftToPubler(input: { draft: SocialPostDraft; settings: SocialPostingSettings }) {
  if (!input.settings.publer_api_token) throw new Error('Publer API token is missing in Social Posting Settings.');
  if (!input.settings.publer_api_endpoint) throw new Error('Publer API endpoint is missing in Social Posting Settings.');

  const accountId = publerAccountIdForPlatform(input.settings, input.draft.platform);
  if (!accountId) throw new Error(`Publer account ID is missing for ${platformLabel(input.draft.platform)}.`);

  const payload = buildPublerPayload(input);
  const response = await fetch(input.settings.publer_api_endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${input.settings.publer_api_token}`,
      'Content-Type': 'application/json',
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
  };
}

export function getPublerPostId(response: unknown) {
  if (!response || typeof response !== 'object') return null;
  const data = response as Record<string, unknown>;
  const direct = data.id || data.post_id || data.publer_post_id;
  if (typeof direct === 'string' || typeof direct === 'number') return String(direct);

  const nested = data.data;
  if (nested && typeof nested === 'object') {
    const nestedData = nested as Record<string, unknown>;
    const nestedId = nestedData.id || nestedData.post_id || nestedData.publer_post_id;
    if (typeof nestedId === 'string' || typeof nestedId === 'number') return String(nestedId);
  }

  return null;
}
