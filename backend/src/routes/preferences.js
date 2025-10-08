const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Get user preferences from cookie
router.get('/', (req, res) => {
  try {
    const preferences = req.cookies.preferences 
      ? JSON.parse(req.cookies.preferences)
      : {
          theme: 'light',
          language: 'pt',
          notifications: true
        };

    res.json({
      success: true,
      data: preferences
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update preferences (works for both authenticated and anonymous users)
router.put('/', async (req, res) => {
  try {
    const { theme, language, notifications } = req.body;
    const preferences = { theme, language, notifications };

    // Set cookie for all users (authenticated or not)
    res.cookie('preferences', JSON.stringify(preferences), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });

    // If user is authenticated, also update database
    const token = req.cookies.token;
    if (token) {
      try {
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        await User.findByIdAndUpdate(
          decoded.userId,
          { preferences },
          { new: true }
        );
      } catch (jwtError) {
        // Token invalid, but still set cookie for anonymous user
        console.log('JWT verification failed, using cookie only');
      }
    }

    res.json({
      success: true,
      data: preferences,
      message: 'Preferences updated successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Reset preferences to default
router.delete('/', (req, res) => {
  try {
    const defaultPreferences = {
      theme: 'light',
      language: 'pt',
      notifications: true
    };

    res.cookie('preferences', JSON.stringify(defaultPreferences), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    res.json({
      success: true,
      data: defaultPreferences,
      message: 'Preferences reset to default'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;