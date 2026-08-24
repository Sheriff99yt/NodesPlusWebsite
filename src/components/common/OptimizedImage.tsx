import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  webpSrc?: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  loading?: 'lazy' | 'eager';
  onClick?: () => void;
  isBanner?: boolean;
}

const OptimizedImage = ({
  src,
  webpSrc,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  onClick,
  isBanner = false,
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  const bannerStyles = isBanner
    ? {
        position: 'absolute' as const,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: '100%',
        minHeight: '100%',
        width: 'auto',
        height: 'auto',
        maxWidth: 'none',
        objectFit: 'cover' as const,
      }
    : {};

  const img = (
    <img
      src={src}
      alt={alt}
      width={isBanner ? undefined : width}
      height={isBanner ? undefined : height}
      loading={loading}
      onLoad={() => setIsLoaded(true)}
      onError={() => {
        setError(true);
      }}
      onClick={onClick}
      style={{
        opacity: isLoaded || error ? 1 : 0,
        transition: 'opacity 0.3s ease',
        ...bannerStyles,
      }}
      className={`optimized-image ${isLoaded ? 'loaded' : ''}`}
    />
  );

  return (
    <div
      className={`optimized-image-container ${className}`}
      style={{
        position: 'relative',
        width: isBanner ? '100%' : undefined,
        height: isBanner ? '100%' : undefined,
        overflow: isBanner ? 'hidden' : undefined,
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
            borderRadius: 'inherit',
          }}
        />
      )}
      {webpSrc ? (
        <picture>
          <source srcSet={webpSrc} type="image/webp" />
          {img}
        </picture>
      ) : (
        img
      )}
    </div>
  );
};

export default OptimizedImage;
