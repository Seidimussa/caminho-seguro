const express = require('express');
const Partner = require('../models/Partner');
const { cacheMiddleware, clearCache } = require('../middleware/cache');
const { getOptimizedImageUrl } = require('../config/cloudinary');

const router = express.Router();

// Get all partners grouped by category (cached for 2 hours)
router.get('/', cacheMiddleware(7200), async (req, res) => {
  try {
    const partners = await Partner.find({ active: true })
      .sort({ category: 1, order: 1, createdAt: 1 })
      .lean();

    // Group by category and optimize images
    const groupedPartners = partners.reduce((acc, partner) => {
      const category = partner.category;
      
      if (!acc[category]) {
        acc[category] = [];
      }

      // Add optimized logo URL
      if (partner.logo?.publicId) {
        partner.logo.optimizedUrl = getOptimizedImageUrl(partner.logo.publicId, {
          width: 200,
          height: 100,
          crop: 'fit',
          background: 'transparent',
          format: 'png'
        });
      }

      acc[category].push(partner);
      return acc;
    }, {});

    res.json({
      success: true,
      data: groupedPartners
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get partners by category (cached for 2 hours)
router.get('/category/:category', cacheMiddleware(7200), async (req, res) => {
  try {
    const { category } = req.params;
    const partners = await Partner.find({ 
      category, 
      active: true 
    })
    .sort({ order: 1, createdAt: 1 })
    .lean();

    // Optimize logo URLs
    const optimizedPartners = partners.map(partner => ({
      ...partner,
      logo: {
        ...partner.logo,
        optimizedUrl: partner.logo?.publicId 
          ? getOptimizedImageUrl(partner.logo.publicId, {
              width: 200,
              height: 100,
              crop: 'fit',
              background: 'transparent'
            })
          : partner.logo?.url
      }
    }));

    res.json({
      success: true,
      data: optimizedPartners
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create partner (admin only - simplified for demo)
router.post('/', async (req, res) => {
  try {
    const partner = await Partner.create(req.body);
    
    // Clear cache when data changes
    clearCache('/api/partners');
    
    res.status(201).json({
      success: true,
      data: partner
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;