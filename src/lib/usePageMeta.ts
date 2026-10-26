import { useEffect } from 'react';
import type { PageMeta } from '@/content/pageMeta';

/** Keeps the tab title and meta description in sync during client-side navigation. */
export function usePageMeta({ title, description }: PageMeta) {
  useEffect(() => {
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  }, [title, description]);
}
