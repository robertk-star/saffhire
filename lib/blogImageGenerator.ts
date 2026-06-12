import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

const bucketName = 'blog-images';

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
Post summary: ${input.postText.slice(0, 600)}

Style requirements:
- Clean modern business illustration
- Professional, trustworthy, polished, corporate feel
- Suitable for ${input.platform} social media
- Show abstract business concepts like hiring, teamwork, documents, technology, checklists, dashboards, or professional office work
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

async function generateImageBytes(prompt: string) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY is missing.');

  const model = process.env.OPENAI_IMAGE_MODEL || 'gpt-image-1';
  const size = process.env.OPENAI_IMAGE_SIZE || '1536x1024';

  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      prompt,
      size,
      n: 1,
    }),
  });

  if (!response.ok) {
    const details = await response.text().catch(() => 'Unknown OpenAI image error');
    throw new Error(details);
  }

  const result = await response.json() as { data?: Array<{ b64_json?: string; url?: string }> };
  const image = result.data?.[0];
  if (!image) throw new Error('OpenAI did not return an image.');

  if (image.b64_json) {
    return {
      bytes: Buffer.from(image.b64_json, 'base64'),
      contentType: 'image/png',
      extension: 'png',
    };
  }

  if (image.url) {
    const imageResponse = await fetch(image.url);
    if (!imageResponse.ok) throw new Error('Could not download generated image.');
    const arrayBuffer = await imageResponse.arrayBuffer();
    return {
      bytes: Buffer.from(arrayBuffer),
      contentType: imageResponse.headers.get('content-type') || 'image/png',
      extension: 'png',
    };
  }

  throw new Error('OpenAI image response did not include image data.');
}

async function storeGeneratedImage(input: { prompt: string; slug: string; prefix: string }) {
  const supabase = await ensureBlogImageBucket();
  const generated = await generateImageBytes(input.prompt);
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
  };
}

export async function generateAndStoreBlogImage(input: { title: string; excerpt: string; category: string; slug?: string }) {
  const prompt = buildImagePrompt(input);
  return storeGeneratedImage({
    prompt,
    slug: input.slug || input.title || 'blog-image',
    prefix: 'blog-heroes',
  });
}

export async function generateAndStoreSocialImage(input: { platform: string; blogTitle: string; postText: string; hashtags?: string; slug?: string }) {
  const prompt = buildSocialImagePrompt(input);
  return storeGeneratedImage({
    prompt,
    slug: input.slug || `${input.platform}-${input.blogTitle}`,
    prefix: 'social-posts',
  });
}
