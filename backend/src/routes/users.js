const express = require('express');
const User = require('../models/User');
const { authenticate, authorize, requireRole } = require('../middleware/auth');
const { cacheMiddleware, clearCache } = require('../middleware/cache');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Get all users (admin+ only)
router.get('/', 
  authenticate, 
  authorize('users', 'view'),
  cacheMiddleware(1800), // 30 min cache
  async (req, res) => {
    try {
      const { role, status, department, page = 1, limit = 20 } = req.query;
      
      const filter = {};
      if (role) filter.role = role;
      if (status) filter.status = status;
      if (department) filter.department = department;

      const users = await User.find(filter)
        .select('-password')
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .lean();

      const total = await User.countDocuments(filter);

      res.json({
        success: true,
        data: users,
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

// Get user by ID
router.get('/:id', 
  authenticate, 
  authorize('users', 'view'),
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select('-password');
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Create user (admin+ only)
router.post('/', 
  authenticate,
  authorize('users', 'create'),
  [
    body('name').trim().isLength({ min: 2 }),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('role').isIn(['super-admin', 'admin', 'funcionario', 'cliente'])
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Only super-admin can create super-admin
      if (req.body.role === 'super-admin' && req.user.role !== 'super-admin') {
        return res.status(403).json({ message: 'Only super-admin can create super-admin users' });
      }

      const user = await User.create(req.body);
      clearCache('/api/users');

      res.status(201).json({
        success: true,
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          permissions: user.permissions
        }
      });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      res.status(500).json({ message: error.message });
    }
  }
);

// Update user
router.put('/:id', 
  authenticate,
  authorize('users', 'edit'),
  async (req, res) => {
    try {
      const { password, role, permissions, ...updateData } = req.body;
      
      // Only super-admin can change roles and permissions
      if ((role || permissions) && req.user.role !== 'super-admin') {
        return res.status(403).json({ message: 'Only super-admin can modify roles and permissions' });
      }

      if (role) updateData.role = role;
      if (permissions) updateData.permissions = permissions;

      const user = await User.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true }
      ).select('-password');

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      clearCache('/api/users');

      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Delete user (super-admin only)
router.delete('/:id', 
  authenticate,
  requireRole(['super-admin']),
  authorize('users', 'delete'),
  async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      clearCache('/api/users');

      res.json({
        success: true,
        message: 'User deleted successfully'
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Get user statistics
router.get('/stats/overview', 
  authenticate,
  authorize('users', 'view'),
  cacheMiddleware(3600), // 1 hour cache
  async (req, res) => {
    try {
      const stats = await User.aggregate([
        {
          $group: {
            _id: '$role',
            count: { $sum: 1 }
          }
        }
      ]);

      const statusStats = await User.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 }
          }
        }
      ]);

      res.json({
        success: true,
        data: {
          byRole: stats,
          byStatus: statusStats,
          total: await User.countDocuments()
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;