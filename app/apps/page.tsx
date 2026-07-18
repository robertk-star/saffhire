import type { Metadata } from 'next';
import AppLinksManager from '../../components/AppLinksManager';

export const metadata: Metadata = {
  title: 'App Links',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AppsPage() {
  return <AppLinksManager />;
}
