import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

const bucketName = 'blog-images';

type ImageKind = 'blog' | 'social';

type ImageAttempt = {
  model: string;
  size: string;
  label: string;
};

function cleanSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function buildImagePrompt(input: { title: string; excerpt: string; category: string }) {
  return `Create a professional blog hero image for a background screening company.

Blog title: ${input.title}
Category: ${input.category}
Summary: ${input.excerpt}

Style requirements:
- Clean modern business illustration or realistic business-style image
- Professional, trustworthy, corporate, polished
- Suitable for an employment background screening website
- No text, no letters, no numbers, no logos, no watermarks
- No identifiable real people or close-up faces
- Use themes related to hiring, compliance, verification, records, security, or workforce risk
- Horizontal hero image composition
- High quality website blog image`;
}

function buildSocialImagePrompt(input: { platform: string; blogTitle: string; postText: string; hashtags?: string }) {
  return `Create a professional social media image for a business services company.

Platform: ${input.platform}
Topic: ${input.blogTitle}
Post summary: ${input.postText.slice(0, 500)}

Style requirements:
- Clean modern business illustration
- Professional, trustworthy, polished, corporate feel
- Suitable for business social media
- Show abstract business concepts like teamwork, documents, technology, checklists, dashboards, or professional office work
- No text, no letters, no numbers, no logos, no watermarks
- Avoid close-up faces and avoid identifiable real people
- Bright, clean, high quality social post image`;
}

async function ensureBlogImageBucket() {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error('Database is not configured.');

  const { data: buckets } = await supabase.storage.listBuckets();
  const exists = buckets?.some((bucket) => bucket.name === bucketName);

  if (!exists) {
    const { error } = await supabase.storage.createBucket(bucketName, { public: true });
    if (error && !error.message.toLowerCase().includes('already exists')) throw error;
  } else {
    await supabase.storage.updateBucket(bucketName, { public: true }).catch(() => null);
  }

  return supabase;
}

function uniqueAttempts(attempts: ImageAttempt[]) {
  const seen = new Set<string>();
  return attempts.filter((attempt) => {
    const key = `${attempt.model}|${attempt.size}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function resolveImageAttempts(kind: ImageKind): ImageAttempt[] {
  if (kind === 'social') {
    const configuredSocialModel = process.env.OPENAI_SOCIAL_IMAGE_MODEL;
    const configuredGeneralModel = process.env.OPENAI_IMAGE_MODEL;
    const configuredSocialSize = process.env.OPENAI_SOCIAL_IMAGE_SIZE || '1024x1024';

    return uniqueAttempts([
      ...(configuredSocialModel ? [{ model: configuredSocialModel, size: configuredSocialSize, label: 'configured social model' }] : []),
      ...(configuredGeneralModel ? [{ model: configuredGeneralModel, size: configuredSocialSize, label: 'configured general image model' }] : []),
      { model: 'dall-e-3', size: '1024x1024', label: 'dall-e-3 fallback' },
      { model: 'gpt-image-1', size: '1024x1024', label: 'gpt-image-1 fallback' },
    ]);
  }

  const configuredBlogModel = process.env.OPENAI_IMAGE_MODEL;
  const configuredBlogSize = process.env.OPENAI_IMAGE_SIZE || '1536x1024';

  return uniqueAttempts([
    ...(configuredBlogModel ? [{ model: configuredBlogModel, size: configuredBlogSize, label: 'configured blog image model' }] : []),
    { model: 'gpt-image-1', size: '1536x1024', label: 'gpt-image-1 fallback' },
    { model: 'dall-e-3', size: '1792x1024', label: 'dall-e-3 fallback' },
  ]);
}

function buildImageBody(attempt: ImageAttempt, prompt: string) {
  const body: Record<string, unknown> = {
    model: attempt.model,
    prompt,
    size: attempt.size,
    n: 1,
  };

  if (attempt.model.startsWith('dall-e')) {
    body.response_format = 'b64_json';
  }

  return body;
}

async function runImageAttempt(prompt: string, attempt: ImageAttempt) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY is missing.');

  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(buildImageBody(attempt, prompt)),
  });

  if (!response.ok) {
    const details = await response.text().catch(() => 'Unknown OpenAI image error');
    throw new Error(`${attempt.label} failed using ${attempt.model} ${attempt.size}: ${details}`);
  }

  const result = await response.json() as { data?: Array<{ b64_json?: string; url?: string }> };
  const image = result.data?.[0];
  if (!image) throw new Error(`${attempt.label} did not return an image using ${attempt.model} ${attempt.size}.`);

  if (image.b64_json) {
    return {
      bytes: Buffer.from(image.b64_json, 'base64'),
      contentType: 'image/png',
      extension: 'png',
      attempt,
    };
  }

  if (image.url) {
    const imageResponse = await fetch(image.url);
    if (!imageResponse.ok) throw new Error(`${attempt.label} returned a URL, but the image could not be downloaded.`);
    const arrayBuffer = await imageResponse.arrayBuffer();
    return {
      bytes: Buffer.from(arrayBuffer),
      contentType: imageResponse.headers.get('content-type') || 'image/png',
      extension: 'png',
      attempt,
    };
  }

  throw new Error(`${attempt.label} response did not include image data.`);
}

async function generateImageBytes(prompt: string, kind: ImageKind) {
  const attempts = resolveImageAttempts(kind);
  const errors: string[] = [];

  for (const attempt of attempts) {
    try {
      return await runImageAttempt(prompt, attempt);
    } catch (error) {
      errors.push(error instanceof Error ? error.message : String(error));
    }
  }

  throw new Error(`All image generation attempts failed. ${errors.join(' | ')}`);
}

async function storeGeneratedImage(input: { prompt: string; slug: string; prefix: string; kind: ImageKind }) {
  const supabase = await ensureBlogImageBucket();
  const generated = await generateImageBytes(input.prompt, input.kind);
  const slug = cleanSlug(input.slug || 'generated-image');
  const path = `${input.prefix}/${slug}-${Date.now()}.${generated.extension}`;

  const { error } = await supabase.storage.from(bucketName).upload(path, generated.bytes, {
    contentType: generated.contentType,
    upsert: true,
  });

  if (error) throw error;

  const { data } = supabase.storage.from(bucketName).getPublicUrl(path);
  if (!data.publicUrl) throw new Error('Could not create public image URL.');

  return {
    imageUrl: data.publicUrl,
    prompt: input.prompt,
    storagePath: path,
    model: generated.attempt.model,
    size: generated.attempt.size,
  };
}

export async function generateAndStoreBlogImage(input: { title: string; excerpt: string; category: string; slug?: string }) {
  const prompt = buildImagePrompt(input);
  return storeGeneratedImage({
    prompt,
    slug: input.slug || input.title || 'blog-image',
    prefix: 'blog-heroes',
    kind: 'blog',
  });
}

export async function generateAndStoreSocialImage(input: { platform: string; blogTitle: string; postText: string; hashtags?: string; slug?: string }) {
  const prompt = buildSocialImagePrompt(input);
  return storeGeneratedImage({
    prompt,
    slug: input.slug || `${input.platform}-${input.blogTitle}`,
    prefix: 'social-posts',
    kind: 'social',
  });
}
