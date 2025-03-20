import React, { useState } from 'react';
import { getOptimizedImageSrc, getResponsiveSrcSet } from '../home/ImageOptimizer';

interface OptimizedImageProps {
  src: any; // Can be a string or a ResponsiveImageSrc object
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  loading?: 'lazy' | 'eager';
  onClick?: () => void;
  isBanner?: boolean; // Special flag for banner images
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  onClick,
  isBanner = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // Handle image load
  const handleLoad = () => {
    setIsLoaded(true);
  };
  
  // Handle image error
  const handleError = () => {
    setError(true);
    console.error(`Failed to load image: ${typeof src === 'string' ? src : src.original}`);
    
    // If this is a banner image, try loading a direct fallback
    if (isBanner) {
      console.log("Trying fallback for banner image");
    }
  };
  
  // Get image source - use original directly for banners
  const imageSrc = isBanner && typeof src !== 'string' 
    ? src.original 
    : typeof src === 'string' 
      ? src 
      : getOptimizedImageSrc(src);
  
  // Get srcset if available and not a banner
  const srcSet = !isBanner && typeof src !== 'string' ? getResponsiveSrcSet(src) : undefined;
  
  // Special styles for banner images
  const bannerStyles = isBanner ? {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '100%',
    minHeight: '100%',
    width: 'auto',
    height: 'auto',
    maxWidth: 'none',
    objectFit: 'cover' as const
  } : {};
  
  return (
    <div 
      className={`optimized-image-container ${className}`} 
      style={{ 
        position: 'relative',
        width: isBanner ? '100%' : undefined,
        height: isBanner ? '100%' : undefined,
        overflow: isBanner ? 'hidden' : undefined
      }}
    >
      {!isLoaded && !error && (
        <div 
          className="image-placeholder" 
          style={{ 
            width: width || '100%', 
            height: height || '100%',
            backgroundColor: 'var(--bg-light)',
            position: 'absolute',
            top: 0,
            left: 0,
            borderRadius: 'inherit'
          }} 
        />
      )}
      
      <img
        src={error ? (typeof src === 'string' ? src : src.original) : imageSrc}
        srcSet={!error ? srcSet : undefined}
        alt={alt}
        width={isBanner ? undefined : width}
        height={isBanner ? undefined : height}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        onClick={onClick}
        style={{ 
          opacity: isLoaded ? 1 : 0, 
          transition: 'opacity 0.3s ease',
          ...bannerStyles
        }}
        className={`optimized-image ${isLoaded ? 'loaded' : ''}`}
      />
    </div>
  );
};

export default OptimizedImage; 