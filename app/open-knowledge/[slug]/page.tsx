import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import { getOpenKnowledgePage, openKnowledgePages } from '@/data/openKnowledgePages';

function renderMarkdown(markdown: string) {
  return markdown.split('\n').map((line, index) => {
    if (line.startsWith('# ')) {
      return (
        <h1 key={index} className="text-4xl font-black tracking-tight text-slate-950">
          {line.replace('# ', '')}
        </h1>
      );
    }
    if (line.startsWith('## ')) {
      return (
        <h2 key={index} className="mt-8 text-2xl font-black text-slate-950">
          {line.replace('## ', '')}
        </h2>
      );
    }
    if (line.startsWith('- ')) {
      return (
        <li key={index} className="ml-5 list-disc leading-7 text-slate-700">
          {line.replace('- ', '')}
        </li>
      );
    }
    if (!line.trim()) return <div key={index} className="h-3" />;
    return (
      <p key={index} className="mt-3 leading-7 text-slate-700">
        {line}
      </p>
    );
  });
}

export function generateStaticParams() {
  return openKnowledgePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getOpenKnowledgePage(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/open-knowledge/${page.slug}` },
    robots: { index: true, follow: true },
  };
}

export default async function OpenKnowledgeArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getOpenKnowledgePage(slug);
  if (!page) notFound();

  return (
    <>
      <main className="bg-white text-slate-900">
        <section className="border-b border-slate-200 bg-slate-50 px-6 py-12">
          <div className="mx-auto max-w-3xl">
            <a href="/open-knowledge" className="text-sm font-bold text-green-700 hover:underline">
              Back to Open Knowledge
            </a>
            <p className="mt-4 text-sm font-bold uppercase tracking-wide text-green-700">Open Knowledge Format</p>
          </div>
        </section>
        <section className="px-6 py-12">
          <article className="mx-auto max-w-3xl">{renderMarkdown(page.markdown)}</article>
        </section>
      </main>
      <Footer />
    </>
  );
}
