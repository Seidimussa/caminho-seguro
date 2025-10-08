const express = require('express');
const TeamMember = require('../models/TeamMember');
const { cacheMiddleware, clearCache } = require('../middleware/cache');
const { getOptimizedImageUrl } = require('../config/cloudinary');

const router = express.Router();

// Get all team members (cached for 1 hour)
router.get('/', cacheMiddleware(3600), async (req, res) => {
  try {
    const teamMembers = await TeamMember.find({ active: true })
      .sort({ order: 1, createdAt: 1 })
      .lean();

    // Add optimized image URLs
    const optimizedMembers = teamMembers.map(member => ({
      ...member,
      photo: {
        ...member.photo,
        optimizedUrl: member.photo?.publicId 
          ? getOptimizedImageUrl(member.photo.publicId, { 
              width: 400, 
              height: 400, 
              crop: 'fill',
              gravity: 'face'
            })
          : member.photo?.url
      }
    }));

    res.json({
      success: true,
      data: optimizedMembers
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single team member (cached for 1 hour)
router.get('/:id', cacheMiddleware(3600), async (req, res) => {
  try {
    const member = await TeamMember.findById(req.params.id).lean();
    
    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    // Add optimized image URL
    if (member.photo?.publicId) {
      member.photo.optimizedUrl = getOptimizedImageUrl(member.photo.publicId, {
        width: 800,
        height: 800,
        crop: 'fill',
        gravity: 'face'
      });
    }

    res.json({
      success: true,
      data: member
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create team member (admin only - simplified for demo)
router.post('/', async (req, res) => {
  try {
    const member = await TeamMember.create(req.body);
    
    // Clear cache when data changes
    clearCache('/api/team');
    
    res.status(201).json({
      success: true,
      data: member
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;