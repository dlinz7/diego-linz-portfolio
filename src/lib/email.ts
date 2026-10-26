import { site } from '@/content/site';

export function getEmailAddress(): string {
  return site.emailParts.join('@');
}

export function buildMailto(subject = 'Hello from your portfolio'): string {
  return `mailto:${getEmailAddress()}?subject=${encodeURIComponent(subject)}`;
}
