import { resume } from './resume';
import { site } from './site';

export function buildPersonJsonLd() {
  const sameAs = [site.linkedInUrl, site.githubUrl].filter((url): url is string => Boolean(url));
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: resume.name,
    jobTitle: resume.title,
    description: resume.summary,
    url: site.url,
    address: {
      '@type': 'PostalAddress',
      addressLocality: resume.location.city,
      addressRegion: resume.location.region,
      addressCountry: 'US',
    },
    knowsAbout: resume.skillGroups[0]?.skills ?? [],
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

/** Safe to inline in a <script> tag: escapes "<" so the JSON can't close the tag early. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
