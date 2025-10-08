const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Optimized image URLs with aggressive caching
const getOptimizedImageUrl = (publicId, options = {}) => {
  const defaultOptions = {
    quality: 'auto:good',
    fetch_format: 'auto',
    crop: 'fill',
    gravity: 'auto',
    dpr: 'auto',
    flags: 'progressive',
    ...options
  };
  
  return cloudinary.url(publicId, defaultOptions);
};

// Generate responsive image URLs
const getResponsiveImageUrls = (publicId, options = {}) => {
  const baseOptions = {
    quality: 'auto:good',
    fetch_format: 'auto',
    crop: 'fill',
    gravity: 'auto',
    flags: 'progressive',
    ...options
  };

  return {
    thumbnail: cloudinary.url(publicId, { ...baseOptions, width: 150, height: 150 }),
    small: cloudinary.url(publicId, { ...baseOptions, width: 300, height: 300 }),
    medium: cloudinary.url(publicId, { ...baseOptions, width: 600, height: 600 }),
    large: cloudinary.url(publicId, { ...baseOptions, width: 1200, height: 1200 }),
    webp: cloudinary.url(publicId, { ...baseOptions, format: 'webp' }),
    avif: cloudinary.url(publicId, { ...baseOptions, format: 'avif' })
  };
};

// Generate placeholder (ultra low quality)
const getPlaceholderUrl = (publicId) => {
  return cloudinary.url(publicId, {
    quality: 10,
    width: 50,
    height: 50,
    crop: 'fill',
    effect: 'blur:300',
    fetch_format: 'auto'
  });
};

// Preload critical images
const preloadImage = async (publicId, options = {}) => {
  const url = getOptimizedImageUrl(publicId, options);
  
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(url);
    img.onerror = reject;
    img.src = url;
  });
};

module.exports = { 
  cloudinary, 
  getOptimizedImageUrl, 
  getResponsiveImageUrls,
  getPlaceholderUrl,
  preloadImage
};