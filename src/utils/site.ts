export const SITE_BASE = '/NodesPlusWebsite';
export const SITE_ORIGIN = 'https://sheriff99yt.github.io';
export const SITE_URL = `${SITE_ORIGIN}${SITE_BASE}`;
export const OG_IMAGE = `${SITE_URL}/images/branding/og-image.png`;
export const LOGO_URL = `${SITE_URL}/images/branding/Logo.png`;

export function publicAsset(path: string): string {
  const base = import.meta.env.BASE_URL || "/";
  const clean = path.replace(/^\//, "");
  return `${base.endsWith("/") ? base : `${base}/`}${clean}`;
}

export const LOGO_SRC = publicAsset("images/branding/Logo.png");
export const BANNER_SRC = publicAsset("images/branding/Banner.jpg");
export const FAB_URL = 'https://www.fab.com/sellers/Sherif%20Hany';
export const DISCORD_URL = 'https://discord.gg/2Pu9ywaptN';
export const GITHUB_URL = 'https://github.com/Sheriff99yt/NodesPlusWebsite';
export const AUTHOR_NAME = 'Sherif Hany';
export const ORG_NAME = '99 Studios';
export const SITE_NAME = 'Nodes Plus';
export const SITE_TAGLINE = 'Blueprint node library for Unreal Engine';
export const SITE_DESCRIPTION =
  'Nodes Plus is a Blueprint function library for Unreal Engine. Browse the documentation in your browser, get the plugin on Fab, and ask questions on Discord.';

export function absoluteUrl(path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (clean === '/') return `${SITE_URL}/`;
  return `${SITE_URL}${clean.endsWith('/') ? clean : `${clean}/`}`;
}
