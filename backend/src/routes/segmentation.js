const express = require('express');
const { protect } = require('../middleware/auth');
const User = require('../models/User');
const RecommendationService = require('../services/recommendationService');

const router = express.Router();

// Update user profile
router.put('/profile', protect, async (req, res) => {
  try {
    const { userType, profile } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { userType, profile },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: {
        user,
        recommendations: RecommendationService.getPersonalizedRecommendations(user),
        content: RecommendationService.getTargetedContent(user)
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Get personalized recommendations
router.get('/recommendations', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const recommendations = RecommendationService.getPersonalizedRecommendations(user);
    
    res.json({
      success: true,
      data: recommendations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get user segment analytics (admin only)
router.get('/analytics', protect, async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'super-admin') {
      return res.status(403).json({
        success: false,
        message: 'Acesso negado'
      });
    }

    const analytics = await User.aggregate([
      {
        $group: {
          _id: '$userType',
          count: { $sum: 1 },
          visualImpairment: {
            $push: '$profile.visualImpairment'
          },
          primaryConcerns: {
            $push: '$profile.primaryConcerns'
          }
        }
      }
    ]);

    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;