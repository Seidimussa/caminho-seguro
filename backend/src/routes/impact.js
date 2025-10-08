const express = require('express');
const { ImpactCounter, Story } = require('../models/ImpactCounter');
const { protect } = require('../middleware/auth');
const DonationCalculator = require('../utils/donationCalculator');

const router = express.Router();

// Get public impact data
router.get('/counter', async (req, res) => {
  try {
    let counter = await ImpactCounter.findOne();
    if (!counter) {
      counter = await ImpactCounter.create({});
    }
    
    res.json({
      success: true,
      data: {
        totalSold: counter.totalSold,
        totalDonated: counter.totalDonated,
        totalImpact: counter.totalSold + counter.totalDonated
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get public stories
router.get('/stories', async (req, res) => {
  try {
    const stories = await Story.find({ 
      isPublic: true, 
      consentGiven: true 
    }).sort({ createdAt: -1 });
    
    res.json({ success: true, data: stories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update counter (admin only)
router.put('/counter', protect, async (req, res) => {
  try {
    if (!['admin', 'super-admin'].includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Acesso negado' });
    }

    const { totalSold } = req.body;
    const calculatedData = DonationCalculator.updateDonationCounter(totalSold);
    
    let counter = await ImpactCounter.findOne();
    if (!counter) {
      counter = await ImpactCounter.create(calculatedData);
    } else {
      counter.totalSold = calculatedData.totalSold;
      counter.totalDonated = calculatedData.totalDonated;
      counter.lastUpdated = new Date();
      await counter.save();
    }
    
    res.json({ success: true, data: counter });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Add story (admin only)
router.post('/stories', protect, async (req, res) => {
  try {
    if (!['admin', 'super-admin'].includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Acesso negado' });
    }

    const story = await Story.create(req.body);
    res.status(201).json({ success: true, data: story });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;