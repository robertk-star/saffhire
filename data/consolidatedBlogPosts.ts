/**
 * Overlapping blog posts consolidated into one stronger post each (2026-10-17).
 * Key = retired slug, value = winning slug. Retired posts 301 to the winner (see next.config.js)
 * and are hidden from the blog listing, RSS, sitemap and social drafts. The Supabase rows are untouched.
 */
export const consolidatedBlogSlugs: Record<string, string> = {
  'background-check-delays-reduce-hiring-time': 'background-check-delays-how-employers-can-reduce-them',
  'reduce-background-check-delays-hiring-efficiency': 'background-check-delays-how-employers-can-reduce-them',
  'staffing-background-checks-speed-consistency-client-protection': 'staffing-background-checks-speed-consistency-compliance',
};

export function isConsolidatedBlogSlug(slug: string) {
  return Object.prototype.hasOwnProperty.call(consolidatedBlogSlugs, slug);
}
