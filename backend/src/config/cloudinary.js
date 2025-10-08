const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Optimized image URLs with CDN cache
const getOptimizedImageUrl = (publicId, options = {}) => {
  const defaultOptions = {
    quality: 'auto',
    fetch_format: 'auto',
    crop: 'fill',
    gravity: 'auto',
    ...options
  };
  
  return cloudinary.url(publicId, defaultOptions);
};

module.exports = { cloudinary, getOptimizedImageUrl };