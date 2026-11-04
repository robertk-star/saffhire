import type { Metadata } from 'next';

const SITE_URL = 'https://saffhire.com';

/** Absolute https URL for a post image; relative paths get the site origin, absolute URLs pass through. */
export function absoluteImageUrl(image?: string | null) {
  if (!image) return undefined;
  if (/^https?:\/\//i.test(image)) return image;
  return `${SITE_URL}${image.startsWith('/') ? '' : '/'}${image}`;
}

/** Open Graph + Twitter card tags so link scrapers see og:image / twitter:image in server HTML. */
export function blogSocialMetadata(opts: { slug: string; title: string; description: string; image?: string | null }): Pick<Metadata, 'openGraph' | 'twitter'> {
  const url = `${SITE_URL}/blog/${opts.slug}`;
  const imageUrl = absoluteImageUrl(opts.image);
  const images = imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: opts.title }] : undefined;
  return {
    openGraph: { title: opts.title, description: opts.description, url, type: 'article', images },
    twitter: { card: 'summary_large_image', title: opts.title, description: opts.description, images: imageUrl ? [imageUrl] : undefined },
  };
}
