import { describe, expect, it } from 'vitest';
import { buildPersonJsonLd, serializeJsonLd } from './jsonLd';
import { resume } from './resume';

describe('Person JSON-LD', () => {
  it('describes Diego from the resume content', () => {
    const data = buildPersonJsonLd();
    expect(data).toMatchObject({
      '@type': 'Person',
      name: resume.name,
      jobTitle: resume.title,
      address: { addressLocality: 'Austin', addressRegion: 'TX' },
    });
  });

  it('never includes the email address', () => {
    expect(JSON.stringify(buildPersonJsonLd())).not.toMatch(/@gmail|Linzdiegoa/i);
  });

  it('escapes "<" so the JSON cannot close its script tag', () => {
    expect(serializeJsonLd({ text: '</script><script>alert(1)</script>' })).not.toContain(
      '</script>',
    );
  });
});
