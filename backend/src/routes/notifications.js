const express = require('express');
const Notification = require('../models/Notification');
const NotificationService = require('../services/notificationService');
const { authenticate } = require('../middleware/auth');
const { cacheMiddleware } = require('../middleware/cache');

const router = express.Router();

// Get user notifications
router.get('/', 
  authenticate,
  async (req, res) => {
    try {
      const { page = 1, limit = 20, unreadOnly } = req.query;
      
      const notifications = await NotificationService.getUserNotifications(
        req.user._id,
        { page: parseInt(page), limit: parseInt(limit), unreadOnly: unreadOnly === 'true' }
      );

      const total = await Notification.countDocuments({
        recipient: req.user._id,
        ...(unreadOnly === 'true' && { read: false })
      });

      res.json({
        success: true,
        data: notifications,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Get unread count
router.get('/unread-count', 
  authenticate,
  cacheMiddleware(300), // 5 min cache
  async (req, res) => {
    try {
      const count = await NotificationService.getUnreadCount(req.user._id);
      
      res.json({
        success: true,
        data: { count }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Mark notification as read
router.put('/:id/read', 
  authenticate,
  async (req, res) => {
    try {
      const notification = await Notification.markAsRead(req.params.id, req.user._id);
      
      if (!notification) {
        return res.status(404).json({ message: 'Notification not found' });
      }

      res.json({
        success: true,
        data: notification
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Mark all as read
router.put('/mark-all-read', 
  authenticate,
  async (req, res) => {
    try {
      await Notification.markAllAsRead(req.user._id);
      
      res.json({
        success: true,
        message: 'All notifications marked as read'
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;