import { useEffect } from 'react';
import { imageCache } from '@/utils/imageCache';

export const ImagePreloader = ({ images = [], priority = false }) => {
  useEffect(() => {
    const preloadImages = async () => {
      if (images.length === 0) return;

      try {
        if (priority) {
          // Preload immediately for critical images
          await imageCache.preloadBatch(images);
        } else {
          // Preload after a delay for non-critical images
          setTimeout(() => {
            imageCache.preloadBatch(images);
          }, 1000);
        }
      } catch (error) {
        console.warn('Image preload failed:', error);
      }
    };

    preloadImages();
  }, [images, priority]);

  return null; // This component doesn't render anything
};

// Hook for preloading images
export const useImagePreloader = (images, priority = false) => {
  useEffect(() => {
    if (!images || images.length === 0) return;

    const preload = async () => {
      try {
        if (priority) {
          await imageCache.preloadBatch(images);
        } else {
          setTimeout(() => {
            imageCache.preloadBatch(images);
          }, 500);
        }
      } catch (error) {
        console.warn('Image preload failed:', error);
      }
    };

    preload();
  }, [images, priority]);
};