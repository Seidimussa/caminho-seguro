// Image optimization utilities
export const generateCloudinaryUrl = (src, options = {}) => {
  if (!src || !src.includes('cloudinary.com')) return src;

  const {
    width,
    height,
    quality = 'auto:good',
    format = 'auto',
    crop = 'fill',
    gravity = 'auto',
    dpr = 'auto'
  } = options;

  const parts = src.split('/upload/');
  if (parts.length !== 2) return src;

  const transformations = [
    `q_${quality}`,
    `f_${format}`,
    width && `w_${width}`,
    height && `h_${height}`,
    `c_${crop}`,
    `g_${gravity}`,
    `dpr_${dpr}`,
    'fl_progressive'
  ].filter(Boolean).join(',');

  return `${parts[0]}/upload/${transformations}/${parts[1]}`;
};

// Generate responsive image srcset
export const generateSrcSet = (src, sizes = [300, 600, 900, 1200]) => {
  if (!src) return '';
  
  return sizes
    .map(size => `${generateCloudinaryUrl(src, { width: size })} ${size}w`)
    .join(', ');
};

// Generate WebP and AVIF versions
export const generateModernFormats = (src) => {
  if (!src) return {};
  
  return {
    webp: generateCloudinaryUrl(src, { format: 'webp' }),
    avif: generateCloudinaryUrl(src, { format: 'avif' })
  };
};

// Check if browser supports modern formats
export const supportsWebP = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
};

export const supportsAVIF = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
};

// Get best format for current browser
export const getBestFormat = (src) => {
  if (!src) return src;
  
  if (supportsAVIF()) {
    return generateCloudinaryUrl(src, { format: 'avif' });
  } else if (supportsWebP()) {
    return generateCloudinaryUrl(src, { format: 'webp' });
  }
  
  return generateCloudinaryUrl(src, { format: 'auto' });
};