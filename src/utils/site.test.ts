import { describe, expect, it } from 'vitest';
import { SITE_NAME, SITE_URL, absoluteUrl } from './site';

describe('site constants and path helpers', () => {
  it('keeps the published origin and site name', () => {
    expect(SITE_NAME).toBe('Nodes Plus');
    expect(SITE_URL).toBe('https://sheriff99yt.github.io/NodesPlusWebsite');
  });

  it('absoluteUrl joins paths under the GitHub Pages base', () => {
    expect(absoluteUrl('/')).toBe('https://sheriff99yt.github.io/NodesPlusWebsite/');
    expect(absoluteUrl('architecture')).toBe('https://sheriff99yt.github.io/NodesPlusWebsite/architecture/');
    expect(absoluteUrl('/documentation/')).toBe('https://sheriff99yt.github.io/NodesPlusWebsite/documentation/');
  });
});
