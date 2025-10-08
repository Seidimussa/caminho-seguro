const express = require('express');
const multer = require('multer');
const { cloudinary, getOptimizedImageUrl } = require('../config/cloudinary');
const { setBrowserCache } = require('../middleware/cache');

const router = express.Router();

// Multer config for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Upload image to Cloudinary
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'caminho-seguro',
          transformation: [
            { quality: 'auto' },
            { fetch_format: 'auto' }
          ]
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(req.file.buffer);
    });

    // Generate optimized URLs for different sizes
    const optimizedUrls = {
      thumbnail: getOptimizedImageUrl(result.public_id, { width: 150, height: 150, crop: 'fill' }),
      medium: getOptimizedImageUrl(result.public_id, { width: 400, height: 400, crop: 'fill' }),
      large: getOptimizedImageUrl(result.public_id, { width: 800, height: 800, crop: 'fill' }),
      original: result.secure_url
    };

    res.json({
      success: true,
      data: {
        publicId: result.public_id,
        url: result.secure_url,
        optimizedUrls
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get optimized image URL
router.get('/optimize/:publicId', setBrowserCache(86400), (req, res) => {
  try {
    const { publicId } = req.params;
    const { width, height, crop = 'fill', quality = 'auto' } = req.query;

    const optimizedUrl = getOptimizedImageUrl(publicId, {
      width: parseInt(width) || undefined,
      height: parseInt(height) || undefined,
      crop,
      quality
    });

    res.json({
      success: true,
      data: {
        optimizedUrl,
        publicId
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete image from Cloudinary
router.delete('/:publicId', async (req, res) => {
  try {
    const { publicId } = req.params;
    
    await cloudinary.uploader.destroy(publicId);
    
    res.json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;