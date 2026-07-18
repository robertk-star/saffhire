'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';

type AppCategory = 'SaffHire' | 'Ardykay';

type AppLink = {
  id: string;
  category: AppCategory;
  name: string;
  description: string;
  url: string;
};

const storageKey = 'saffhire_apps_page_links_v1';
const categories: AppCategory[] = ['SaffHire', 'Ardykay'];

const defaultLinks: AppLink[] = [
  {
    id: 'monitoring-app',
    category: 'SaffHire',
    name: 'Monitoring App',
    description: 'SaffHire monitoring dashboard and safety performance tools.',
    url: 'https://monitoring-beta-one.vercel.app/',
  },
];

function makeId() {
  return `app-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizeUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  return `https://${trimmed}`;
}

function loadLinks() {
  if (typeof window === 'undefined') return defaultLinks;

  try {
    const saved = window.localStorage.getItem(storageKey);
    if (!saved) return defaultLinks;

    const parsed = JSON.parse(saved) as AppLink[];
    if (!Array.isArray(parsed)) return defaultLinks;

    return parsed.filter((item) => {
      return (
        item &&
        categories.includes(item.category) &&
        typeof item.name === 'string' &&
        typeof item.url === 'string'
      );
    });
  } catch {
    return defaultLinks;
  }
}

export default function AppLinksManager() {
  const [links, setLinks] = useState<AppLink[]>(defaultLinks);
  const [category, setCategory] = useState<AppCategory>('SaffHire');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLinks(loadLinks());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    window.localStorage.setItem(storageKey, JSON.stringify(links));
  }, [links, loaded]);

  const groupedLinks = useMemo(() => {
    return categories.map((item) => ({
      category: item,
      links: links.filter((link) => link.category === item),
    }));
  }, [links]);

  function addLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanName = name.trim();
    const cleanUrl = normalizeUrl(url);
    if (!cleanName || !cleanUrl) return;

    setLinks((current) => [
      ...current,
      {
        id: makeId(),
        category,
        name: cleanName,
        description: description.trim(),
        url: cleanUrl,
      },
    ]);

    setName('');
    setDescription('');
    setUrl('');
  }

  function deleteLink(id: string) {
    const item = links.find((link) => link.id === id);
    if (!item) return;

    const confirmed = window.confirm(`Delete ${item.name}?`);
    if (!confirmed) return;

    setLinks((current) => current.filter((link) => link.id !== id));
  }

  function resetLinks() {
    const confirmed = window.confirm('Reset the app links back to the default list?');
    if (!confirmed) return;
    setLinks(defaultLinks);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-wide text-green-700">Internal Tools</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">App Links</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Quick links for apps being built under SaffHire and Ardykay. This page is set to noindex and nofollow.
          </p>
          <p className="mt-3 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-900 ring-1 ring-amber-200">
            Links added here are saved in this browser. To make links shared across every device, this page will need a database-backed version later.
          </p>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-slate-900">Add a link</h2>
          <form onSubmit={addLink} className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-700">Category</span>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value as AppCategory)}
                className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm focus:border-green-500 focus:outline-none"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-700">App name</span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-md border border-slate-300 px-4 py-3 text-sm focus:border-green-500 focus:outline-none"
                placeholder="Example: Monitoring App"
                required
              />
            </label>

            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm font-bold text-slate-700">URL</span>
              <input
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                className="w-full rounded-md border border-slate-300 px-4 py-3 text-sm focus:border-green-500 focus:outline-none"
                placeholder="https://example.vercel.app"
                required
              />
            </label>

            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm font-bold text-slate-700">Description</span>
              <input
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="w-full rounded-md border border-slate-300 px-4 py-3 text-sm focus:border-green-500 focus:outline-none"
                placeholder="Short note about what this app is for"
              />
            </label>

            <div className="flex flex-wrap gap-3 md:col-span-2">
              <button type="submit" className="rounded-md bg-green-500 px-5 py-3 text-sm font-bold text-white hover:bg-green-600">
                Add link
              </button>
              <button type="button" onClick={resetLinks} className="rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50">
                Reset defaults
              </button>
            </div>
          </form>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          {groupedLinks.map((group) => (
            <div key={group.category} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-4">
                <h2 className="text-2xl font-black text-slate-900">{group.category}</h2>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                  {group.links.length} link{group.links.length === 1 ? '' : 's'}
                </span>
              </div>

              {group.links.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-500">
                  No links added yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {group.links.map((app) => (
                    <div key={app.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-black text-slate-900">{app.name}</h3>
                          {app.description ? <p className="mt-1 text-sm leading-6 text-slate-600">{app.description}</p> : null}
                          <a
                            href={app.url}
                            target="_blank"
                            rel="nofollow noopener noreferrer"
                            className="mt-3 inline-flex text-sm font-bold text-green-700 hover:underline"
                          >
                            Open app →
                          </a>
                        </div>
                        <button
                          type="button"
                          onClick={() => deleteLink(app.id)}
                          className="rounded-md border border-red-200 bg-white px-3 py-2 text-xs font-bold text-red-700 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
