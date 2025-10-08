import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { generateCloudinaryUrl, getBestFormat, generateSrcSet } from '@/utils/imageOptimizer';

export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  placeholder = 'blur',
  quality = 'auto',
  format = 'auto',
  lazy = true,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const [error, setError] = useState(false);
  const imgRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, isInView]);

  // Generate optimized URL
  const getOptimizedUrl = (originalSrc) => {
    if (!originalSrc) return '';
    
    return generateCloudinaryUrl(originalSrc, {
      width,
      height,
      quality,
      format
    });
  };

  // Generate placeholder (low quality version)
  const getPlaceholderUrl = (originalSrc) => {
    if (!originalSrc) return '';
    
    return generateCloudinaryUrl(originalSrc, {
      width: 50,
      height: 50,
      quality: 10,
      format: 'auto',
      crop: 'fill'
    }) + ',e_blur:300';
  };

  const optimizedSrc = getBestFormat(getOptimizedUrl(src));
  const placeholderSrc = getPlaceholderUrl(src);
  const srcSet = generateSrcSet(src);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setError(true);
  };

  if (error) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-400 text-sm">Imagem não encontrada</span>
      </div>
    );
  }

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Placeholder */}
      {placeholder === 'blur' && placeholderSrc && !isLoaded && (
        <img
          src={placeholderSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'blur(5px)' }}
        />
      )}
      
      {placeholder === 'skeleton' && !isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}

      {/* Main image */}
      {isInView && (
        <motion.img
          src={optimizedSrc}
          srcSet={srcSet}
          sizes={width ? `${width}px` : '100vw'}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          loading={lazy ? 'lazy' : 'eager'}
          decoding="async"
          {...props}
        />
      )}

      {/* Loading indicator */}
      {!isLoaded && isInView && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-primary rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};