/**
 * ImageOptimizer.ts
 * Utility for optimizing images on the Nodes Plus website
 */

// Interface for responsive image sources
interface ResponsiveImageSrc {
  original: string;
  small: string;
  medium: string;
  large: string;
  webp?: {
    small: string;
    medium: string;
    large: string;
  };
}

// Image format detection
const supportsWebp = (): boolean => {
  // For static sites, it's safe to assume modern browsers support WebP
  // In a more dynamic site, you would use feature detection
  const isModernBrowser = 
    navigator.userAgent.includes('Chrome') || 
    navigator.userAgent.includes('Firefox') || 
    navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome') && parseInt(navigator.userAgent.split('Version/')[1]) >= 14;
  
  return isModernBrowser;
};

// Get optimized image source based on device width and format support
export const getOptimizedImageSrc = (
  imageSrc: string | ResponsiveImageSrc,
  width?: number
): string => {
  // If string is passed, return as is (legacy support)
  if (typeof imageSrc === 'string') {
    return imageSrc;
  }

  // Determine viewport width if not provided
  const viewportWidth = width || window.innerWidth;
  
  // Check WebP support
  const webpSupported = supportsWebp();
  
  // Select size based on viewport width
  let size: 'small' | 'medium' | 'large';
  if (viewportWidth <= 480) {
    size = 'small';
  } else if (viewportWidth <= 1024) {
    size = 'medium';
  } else {
    size = 'large';
  }
  
  // Return WebP if supported and available
  if (webpSupported && imageSrc.webp) {
    return imageSrc.webp[size];
  }
  
  // Fall back to original format
  return imageSrc[size] || imageSrc.original;
};

// Create a responsive image srcset
export const getResponsiveSrcSet = (
  imageSrc: ResponsiveImageSrc
): string => {
  if (supportsWebp() && imageSrc.webp) {
    return `
      ${imageSrc.webp.small} 480w,
      ${imageSrc.webp.medium} 1024w,
      ${imageSrc.webp.large} 1920w
    `;
  }
  
  return `
    ${imageSrc.small} 480w,
    ${imageSrc.medium} 1024w,
    ${imageSrc.large} 1920w
  `;
};

// Preload critical images
export const preloadCriticalImages = (imageSrcs: string[]): void => {
  imageSrcs.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

// Image mapping for the site
export const siteImages = {
  // Hero banner 
  heroBanner: {
    original: './images/branding/Banner.jpg',
    small: './images/branding/Banner.jpg',
    medium: './images/branding/Banner.jpg',
    large: './images/branding/Banner.jpg',
    webp: {
      small: './images/branding/Banner.jpg',
      medium: './images/branding/Banner.jpg',
      large: './images/branding/Banner.jpg',
    }
  },
  
  // Add more optimized images as needed
};

export default {
  getOptimizedImageSrc,
  getResponsiveSrcSet,
  preloadCriticalImages,
  siteImages
}; 